import { AngularFireAuth } from 'angularfire2/auth';
import { MdDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../../entity/user/User';
import { UserProfile } from './../../../../entity/user/UserProfile';
import { UserStatus } from './../../../../entity/user/UserStatus';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'user-form',
    templateUrl: 'user-form.component.html'
} )

export class UserFormComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private user: User = new User();

    /**
     * 
     */
    private userProfiles = [];

    /**
     * 
     */
    private UserProfile = UserProfile;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private dialogRef: MdDialogRef<UserFormComponent>
    ) { }

    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    
    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    /**
     * 
     */
    ngOnInit() 
    { 
        for( let key in UserProfile)
        {
            if (typeof UserProfile[key] === 'number') 
            {
                this.userProfiles.push(key);
            }
        }
    }

    /**
     * 
     */
    saveUser(): void
    {
        if(this.user.$name != null && this.user.$nickname != null && this.user.$email != null && this.user.$profile)
        {
            this.user.$level = 0;
            this.user.$totalPontuation = 0;
            this.user.$status = UserStatus.ACTIVE;

            this.afAuth.app.auth().createUserWithEmailAndPassword(this.user.$email, "qualygame")
            .then( ( result ) => {
                this.afDatabase.object("/users/"+this.user.$nickname)
                .set(this.user.toFirebase())
                .then( ( result ) => {
                    this.dialogRef.close();
                });
            })
            .catch( ( exception ) => {
                console.error(exception);
            });


        }
        else
        {

        }
    }

    /**
     * 
     */
    private closePopup(): void
    {
        this.dialogRef.close();
    }
}