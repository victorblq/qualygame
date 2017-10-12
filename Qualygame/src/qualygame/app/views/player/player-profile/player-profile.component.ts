import { Pontuation } from './../../../entity/pontuation/Pontuation';
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

            this.calculateTotalPontuation()
        }

        this.userService.userChangedEventSource$.subscribe((loggedUser) => {
            this.user = loggedUser;
            this.subscribeFirebaseUserChanges();
            
            this.calculateTotalPontuation();
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
            this.calculateTotalPontuation();
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
            
            this.calculateTotalPontuation();
        });
    }

    /**
     * 
     */
    calculateTotalPontuation(): void
    {
        this.afDatabase.list("/users/"+this.user.$nickname+"/pontuation")
        .subscribe( ( pontuations ) => {
            let totalPontuation = 0;
            for( let i = 0; i < pontuations.length; i++ )
            {
                totalPontuation += pontuations[i].value;
            }

            // if( totalPontuation < 100 )
            // {
            //     this.user.$level = 1;
            //     this.user.$totalPontuation = totalPontuation;
            //     multiplier = 100;
            // }
            // else if( totalPontuation >= 100 && totalPontuation < 500)
            // {
            //     this.user.$level = 2;
            //     this.user.$totalPontuation = totalPontuation;
            // }
            // else
            // {
                
            // }
            this.user.$level = Math.floor(+(totalPontuation / 500));
            this.user.$totalPontuation = totalPontuation;

            this.afDatabase.database.ref("/users/"+this.user.$nickname)
            .once("value", ( result ) => {
                let user = result.val();

                user.level = this.user.$level;
                user.totalPontuation = this.user.$totalPontuation;

                this.afDatabase.object("/users/"+this.user.$nickname)
                .set(user);
                this.calculateLevelPercentage();
            });
        });
    }

    /**
     * 
     */
    calculateLevelPercentage(): void
    {
        let nextLevelPontuation = 500;
        let zero = 0;

        if(this.user.$level == 0)
        {
            zero = this.user.$totalPontuation;
            this.levelPercentage = ( zero * 100 ) / nextLevelPontuation;
            return;
        }
        
        if(this.user.$level == 1)
        {
            
            zero = this.user.$totalPontuation - 500;
            this.levelPercentage = ( zero * 100 ) / nextLevelPontuation;
            return;
        }

        zero = this.user.$totalPontuation - ( this.user.$level * 500 );
        this.levelPercentage = ( zero * 100 ) / nextLevelPontuation;
    }

    /**
     * 
     */
    addBadge()
    {
        let badge = new Badge("Level 5", 4, "2", "0", "https://cdn.pixabay.com/photo/2013/07/12/16/01/badge-150755_960_720.png");

        this.afDatabase.database.ref("/users/Pigmeo/badges")
        .push(badge.toFirebase());
    
    }

}