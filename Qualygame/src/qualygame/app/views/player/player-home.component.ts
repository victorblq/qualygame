import { Component, OnInit } from '@angular/core';
import { StringService } from './../../service/StringService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../entity/user/User';
import { UserService } from './../../service/UserService';
import { TranslateService } from '@ngx-translate/core';

@Component( {
    selector: 'player-home',
    templateUrl: 'player-home.component.html'
} )

export class PlayerHomeComponent implements OnInit
{

    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private loggedUser: User;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
     constructor(
        private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase,
        private userService: UserService,
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
    /**
     * 
     */
    ngOnInit() 
    {
        this.loggedUser = this.userService.$loggedUser;
    }

}