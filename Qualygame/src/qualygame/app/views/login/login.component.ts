import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { User } from './../../entity/user/User';
import { UserService } from './../../service/UserService';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserProfile } from './../../entity/user/UserProfile';
import { UserStatus } from './../../entity/user/UserStatus';

@Component( {
    selector: 'login',
    templateUrl: 'login.component.html'
} )

export class LoginComponent implements OnInit 
{
    /**
     * 
     */
    private email: string;

    /**
     * 
     */
    private password: string;

    /**
     * 
     */
    private loading: boolean = false;

    /**
     * 
     */
    constructor(
        private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase,
        private userService: UserService,
        private mdSnackBar: MdSnackBar,
        private translate: TranslateService,
        private router: Router
    ) 
    {

    }

    /**
     * 
     */
    ngOnInit() 
    {

    }

    /**
     * 
     */
    private login()
    {
        if ( this.email == null || this.password == null )
        {
            this.translate.get( "messages.allFields" ).subscribe(( message ) =>
            {
                this.mdSnackBar.open( message, null, { duration: 2500 } );
            } );
            return;
        }
        
        this.loading = true;

        this.afAuth.auth.signInWithEmailAndPassword( this.email, this.password )
            .then(( loggedUser ) =>
            {
                this.afDatabase.database.ref( "users" )
                    .orderByChild( 'email' )
                    .equalTo( loggedUser.email )
                    .once( 'child_added', ( snap ) =>
                    {
                        this.loading = false;

                        let user: User = new User( 
                            snap.val().nickname, 
                            snap.val().email, 
                            snap.val().profile, 
                            snap.val().status, 
                            snap.val().name, 
                            snap.val().totalPontuation, 
                            snap.val().photo, 
                            snap.val().level 
                        );

                        switch ( user.$profile )
                        {
                            case UserProfile.ADMINISTRATOR:
                                console.log( "TODO" );
                                this.afAuth.auth.signOut();
                                break;
                            case UserProfile.PLAYER:
                                this.router.navigate( ["player"] );
                                break;
                            case UserProfile.QUALITY_MANAGER:
                                this.router.navigate( ["manager"] );
                                break;
                        }
                    } );
            } )
            .catch(( exception ) =>
            {
                this.translate.get( "messages.firebase." + exception["code"] ).subscribe(( message ) =>
                {
                    this.mdSnackBar.open( message, null, { duration: 2500 } );
                } );
            } );
    }

    /**
     * 
     */
    private cadastrar()
    {
        let user = new User();

        user.$name = "Manager Teste";
        user.$nickname = "ManagerTeste";
        user.$birthDate = new Date("26/06/1994");
        user.$profile = UserProfile.QUALITY_MANAGER;
        user.$status = UserStatus.ACTIVE;
        user.$email = "manager@email.com";
        user.$totalPontuation = 0;
        user.$photo = null;
        user.$level = 0;

        this.afAuth.auth.
        createUserWithEmailAndPassword("manager@email.com", "teste123");

        this.afDatabase.database.ref("/users/"+user.$nickname)
        .set(user);
    }
}