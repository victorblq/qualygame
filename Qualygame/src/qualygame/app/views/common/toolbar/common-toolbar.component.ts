import { PlayerProfileComponent } from './../../player/player-profile/player-profile.component';
import { StringService } from './../../../service/StringService';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../../entity/user/User';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UserProfile } from  './../../../entity/user/UserProfile';

@Component( {
    selector: 'common-toolbar',
    templateUrl: 'common-toolbar.component.html'
} )

export class CommonToolbarComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    @Input("loggedUser") loggedUser: User;

    /**
     * 
     */
    @ViewChild("inputPlayerSearch") inputPlayerSearch: ElementRef;
    
    /**
     * 
     */
    private playersOfSearch: Array<User>;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase,
        private router: Router,
        private mdDialog: MdDialog,
        private stringService: StringService
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
    ngOnInit() { }

    /**
     * 
     */
    isPlayer( userProfile: UserProfile ): boolean
    {
        return userProfile == UserProfile.PLAYER;
    }

    /**
     * 
     * @param inputPlayerSearch 
     */
    searchPlayer(inputPlayerSearch): void
    {
        if( inputPlayerSearch.value != null && inputPlayerSearch.value != "" )
        {
            this.afDatabase.list("users").forEach( ( users ) => {
                this.playersOfSearch = new Array<User>();
                users.forEach( ( user ) => {
                    if(user.profile == UserProfile.PLAYER && 
                        this.stringService.unaccent( user.nickname.toLowerCase() ).indexOf( this.stringService.unaccent( inputPlayerSearch.value.toLowerCase() ) ) != -1)
                    {
                        this.playersOfSearch.push(
                            new User(
                                user.nickname, 
                                user.email, 
                                user.profile, 
                                user.status, 
                                user.name, 
                                user.totalPontuation, 
                                user.photo, 
                                user.level
                            )
                        );
                    }
                });
            });
        }
        else
        {
            this.playersOfSearch = new Array<User>();
        }
    }

    /**
     * 
     */
    openPlayerProfilePopup(player: User): void
    {
        this.playersOfSearch = new Array<User>();

        let dialogRef = this.mdDialog.open(PlayerProfileComponent, {
            width: "30%",
            data: {
                user: player,
                userOnlyRanking: true
            }
        });
    }

    /**
     * 
     * @param user 
     */
    displayPlayerSearchAutocomplete(user: User)
    {
        return user.$nickname;
    }

    /**
     * 
     */
    logout(): void
    {
        this.afAuth.auth.signOut();
        this.router.navigate(["/"]);
    }
}