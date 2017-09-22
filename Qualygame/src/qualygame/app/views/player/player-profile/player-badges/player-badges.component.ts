import { Badge } from './../../../../entity/badge/Badge';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../../entity/user/User';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'player-badges',
    templateUrl: 'player-badges.component.html',
    styleUrls: ['./player-badges.component.css']
} )

export class PlayerBadgesComponent implements OnInit
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
    private badgeList: Array<Badge>;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase
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
        this.afDatabase.list("users/"+this.user.$nickname+"/badges")
        .subscribe( ( badgeList ) => {
            this.badgeList = new Array<Badge>();

            badgeList.forEach( ( badgeToFind ) => {
                let badge = new Badge(badgeToFind.name, badgeToFind.value, badgeToFind.apply, badgeToFind.condition, badgeToFind.icon, badgeToFind.description);

                this.badgeList.push(badge);
            });
        });
    }
}