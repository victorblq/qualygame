import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../entity/user/User';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private loggedUser: User;

    /**
     * 
     */
    private userChangedEventSource = new Subject<User>();
    userChangedEventSource$ =  this.userChangedEventSource.asObservable();

    /**
     * 
     */
    constructor(
        private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase
    )
    {
        afAuth.authState.subscribe( ( loggedUser ) => {
            if(loggedUser)
            {
                if ( loggedUser != null )
                {
                    afDatabase.database.ref( "users" )
                    .orderByChild( 'email' )
                    .equalTo( loggedUser.email )
                    .once( 'child_added', ( snap ) =>
                    {
                        let user: User = new User(
                            snap.val().nickname, 
                            snap.val().email, 
                            snap.val().profile, 
                            snap.val().status, 
                            snap.val().name, 
                            snap.val().totalPontuation, 
                            snap.val().photo, 
                            snap.val().level);
                        this.$loggedUser = user;

                        this.annouceUserChanged(user);
                    });
                }
            }
        });
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/

    /**
     * 
     */
    public get $loggedUser(): User
    {
        return this.loggedUser;
    }

    /**
     * 
     */
    public set $loggedUser( value: User )
    {
        this.loggedUser = value;
    }

    /*===================================================================
     *                              BEHAVIOUR
     *===================================================================*/
    /**
     * 
     * @param user 
     */
    private annouceUserChanged( user: User ): void
    {
        this.userChangedEventSource.next(user);
    }
}