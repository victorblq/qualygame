import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../entity/user/User';
import { UserProfile } from './../../../entity/user/UserProfile';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'level-summary',
    templateUrl: 'level-summary.component.html'
} )

export class LevelSummaryComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    @Input("loggedUser") loggedUser: User;

    private levels: Array<any>;
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
        let levels = [];
        this.afDatabase.list("/users").subscribe( ( users ) => {
            for(let i = 0; i < users.length; i++)
            {
                if(users[i].profile == UserProfile.PLAYER)
                {
                    if( levels.length == 0 )
                    {
                        levels.push({"name": users[i].level, "value": 1});
                    }
                    else
                    {
                        let create = false;
    
                        for( let j = 0; j < levels.length; j++ )
                        {
                            if( levels[j].name != users[i].level )
                            {
                                create = true;
                            }
                            else
                            {
                                levels[j].value += 1;
                            }
                        }
    
                        if(create)
                        {
                            levels.push({"name": users[i].level, "value": 1});
                        }
                    }
                }
            }
            this.levels = levels;
        });
    }
}