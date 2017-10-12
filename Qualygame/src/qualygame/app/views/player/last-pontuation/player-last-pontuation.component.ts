import { Action } from './../../../entity/action/Action';
import { AngularFireDatabase } from 'angularfire2/database';
import { Pontuation } from './../../../entity/pontuation/Pontuation';
import { Commit } from './../../../entity/commit/Commit';
import { User } from './../../../entity/user/User';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'player-last-pontuation',
    templateUrl: 'player-last-pontuation.component.html'
} )

export class PlayerLastPontuationComponent implements OnInit
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
    private lastPontuation: Array<Pontuation> = [];

    /**
     * 
     */
    private actions: Array<Action> = [];

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
        this.afDatabase.list("/actions")
        .subscribe( ( actionList ) => {
            actionList.forEach( ( action ) => {
                this.actions.push( new Action( action.$key, action.name, action.pontuation ) );
            });
            
            this.loadPontuations();
        });
    }

    /**
     * 
     */
    loadPontuations(): void
    {
        this.afDatabase.list("/users/"+this.loggedUser.$nickname+"/pontuation")
        .subscribe( ( pontuationList ) => {
            this.lastPontuation = new Array<Pontuation>();
            pontuationList = pontuationList.sort( (pontuationA, pontuationB) => {
                if(pontuationA.timestamp > pontuationB.timestamp)
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            });
            
            for(let i = 0; i < pontuationList.length; i++)
            {
                this.lastPontuation.push( 
                    new Pontuation( 
                        pontuationList[i].$key, 
                        pontuationList[i].value, 
                        pontuationList[i].status, 
                        this.findAction(pontuationList[i].action), 
                        pontuationList[i].commit, 
                        pontuationList[i].timestamp,
                        pontuationList[i].artifact
                    ) 
                );

                /**
                 * O i tem que começar com 0 e aqui verificar com 4 pq pode ter 1 pontuação apenas
                 */
                if(i > 4)
                {
                    break;
                }
            }
        });

        
    }

    /**
     * 
     * @param action 
     */
    findAction(action): Action
    {
        return this.actions.find( ( actionToFind ) => {
            return actionToFind.$key == action;
        });
    }

    // insertPontuation()
    // {
    //     let pontuation = new Pontuation(null, 50, 0, "adsdsadsaa", "hashteste123");

    //     this.afDatabase.list("/users/"+this.loggedUser.$nickname+"/pontuation/")
    //     .push(pontuation.toFirebase());
         
    // }

    // insertActions()
    // {
    //     let action1 = {
    //         name: "COMMIT",
    //         pontuation: 50
    //     }

    //     let action2 = { 
    //         name: "ARTIFACT_REVIEWED",
    //         pontuation: 100
    //     }

    //     this.afDatabase.list("/actions").push(action1);
    //     this.afDatabase.list("/actions").push(action2);
    // }
}