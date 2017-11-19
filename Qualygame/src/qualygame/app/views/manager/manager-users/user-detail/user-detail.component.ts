import { UserProfile } from './../../../../entity/user/UserProfile';
import { User } from './../../../../entity/user/User';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component( {
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html'
} )

export class UserDetailComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private user: User;

    /**
     * 
     */
    private UserProfile = UserProfile;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/

    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    
    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        @Inject(MD_DIALOG_DATA) data: any,
        private mdDialogRef: MdDialogRef<UserDetailComponent>
    )
    { 
        this.user = data.user;
    }

    /**
     * 
     */
    ngOnInit() { }

    /**
     * 
     */
    closeDialog()
    {
        this.mdDialogRef.close();
    }
}