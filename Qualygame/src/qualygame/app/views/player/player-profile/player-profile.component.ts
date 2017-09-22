import { Badge } from './../../../entity/badge/Badge';
import { MD_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './../../../service/UserService';
import { User } from './../../../entity/user/User';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';

@Component( {
    selector: 'player-profile',
    templateUrl: 'player-profile.component.html'
} )

export class PlayerProfileComponent implements OnInit 
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    @Input("user") user: User;

    /**
     * 
     */
    private userOnlyRanking: boolean;

    /**
     * 
     */
    private levelPercentage: number;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */ 
    constructor(
        private userService: UserService,
        private afDatabase: AngularFireDatabase,
        @Inject(MD_DIALOG_DATA) data: {user: User, userOnlyRanking: boolean}
    ) 
    {
        if(data.user != null)
        {   
            this.user = data.user;
            this.userOnlyRanking = data.userOnlyRanking;

            this.calculateLevelPercentage();
        }

        this.userService.userChangedEventSource$.subscribe((loggedUser) => {
            this.user = loggedUser;
            this.subscribeFirebaseUserChanges();
            
            this.calculateLevelPercentage();
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
        if(this.user != null)
        {
            this.calculateLevelPercentage();
        }
    }

    /**
     * 
     */
    subscribeFirebaseUserChanges(): void
    {
        this.afDatabase.object("/users/"+this.user.$nickname)
        .subscribe( ( result ) => {
            this.user = new User(
                result.nickname, 
                result.email, 
                result.profile, 
                result.status, 
                result.name, 
                result.totalPontuation, 
                result.photo, 
                result.level
            );
            
            this.calculateLevelPercentage();
        });
    }

    /**
     * 
     */
    calculateLevelPercentage(): void
    {
        let nextLevelPontuation = this.user.$level * 500;
        nextLevelPontuation = nextLevelPontuation - ( ( this.user.$level - 1 ) * 500 );

        let zero = this.user.$totalPontuation - ( ( ( this.user.$level - 1 ) * 500 ) );

        this.levelPercentage = ( zero * 100 ) / nextLevelPontuation;
    }

    addBadge()
    {
        let badge = new Badge("Level 5", 4, "2", "0", "https://cdn.pixabay.com/photo/2013/07/12/16/01/badge-150755_960_720.png");

        this.afDatabase.database.ref("/users/Pigmeo/badges")
        .push(badge.toFirebase());
    
    }

}