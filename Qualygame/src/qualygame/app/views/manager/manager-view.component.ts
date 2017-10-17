import { UserService } from './../../service/UserService';
import { User } from './../../entity/user/User';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'manager-view',
    templateUrl: 'manager-view.component.html'
} )

export class ManagerViewComponent implements OnInit
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
    private sideBarMenus = [
        {
            name: "labels.home",
            icon: "home",
            link: "/manager"
        },
        {
            name: "labels.users",
            icon: "account_circle",
            link: "users"
        },
        {
            name: "labels.teams",
            icon: "people",
            link: "teams"
        }
    ]
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    constructor(
        private userService: UserService
    ) 
    { 
        this.userService.userChangedEventSource$.subscribe((loggedUser) => {
            this.loggedUser = loggedUser;
        });
    }

    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    
    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/

    ngOnInit() 
    { 
        this.loggedUser = this.userService.$loggedUser;
    }
}