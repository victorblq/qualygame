import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from './../../../entity/team/Team';
import { User } from './../../../entity/user/User';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'team-summary',
    templateUrl: 'team-summary.component.html'
} )

export class TeamSummaryComponent implements OnInit
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
    private coworker: User;

    /**
     * 
     */
    private team: Team;
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
        this.afDatabase.list("teams")
        .subscribe( ( teams ) => {
            for(let i = 0; i < teams.length; i++)
            {
                for(let j = 0; j < teams[i].members.length; j++)
                { 
                    if(teams[i].members[j] == this.loggedUser.$nickname)
                    {
                        this.team = new Team(teams[i].name, teams[i].members, null);

                        if( teams[i].members.indexOf( teams[i].members[j]) == 1 )
                        {
                            this.findCoworker(teams[i].members[j-1]);
                        }
                        else
                        {
                            this.findCoworker(teams[i].members[j+1]);
                        }
                    }
                }
            }
        });
    }

    /**
     * 
     */
    findCoworker( coworkerNickname: string ): void
    {
        this.afDatabase.object("/users/"+coworkerNickname)
        .subscribe( ( result ) => {
            this.coworker = new User(
                result.nickname,
                result.email, 
                result.profile, 
                result.status, 
                result.name, 
                result.totalPontuation, 
                result.photo, 
                result.level
            );
        });
    }

    /**
     * 
     */
    calculateMedia(): number
    {
        return (this.loggedUser.$totalPontuation + this.coworker.$totalPontuation) / this.team.$members.length;
    };

    // cadastrarTime()
    // {
        
    //     let coworker = this.afDatabase.object("/users/Teste").subscribe( ( result ) => {
    //         let team: Team = new Team();
    
    //         team.$name = "Teste Team";
    //         team.$members = new Array<User>();
    
    //         team.$members.push(this.loggedUser);
    //         team.$members.push(new User(
    //             result.nickname,
    //             result.email,
    //             result.profile,
    //             result.status,
    //             result.name,
    //             result.totalPontuation,
    //             result.photo,
    //             result.level
    //         ));

    //         this.afDatabase.list("teams")
    //         .push(team.toFirebase());
    //     });
    // }
}