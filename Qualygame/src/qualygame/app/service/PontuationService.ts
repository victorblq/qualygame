import { CommitedArtifact } from './../entity/commit/CommitedArtifact';
import { Artifact } from './../entity/artifact/Artifact';
import { User } from './../entity/user/User';
import { Commit } from './../entity/commit/Commit';
import { Action } from './../entity/action/Action';
import { Pontuation } from './../entity/pontuation/Pontuation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class PontuationService
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/

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
     * @param pontuation 
     */
    public insertPontuation( commit: Commit, commitedArtifact: string, actionToFind: string ): void
    {
        this.afDatabase.object("/actions/"+actionToFind)
        .subscribe( ( action ) => {
            let pontuation = new Pontuation(
                null, 
                action.pontuation,
                "0",
                new Action(action.name),
                commit.$hash,
                new Date().getTime(),
                commitedArtifact
            );
           
            this.afDatabase.list("/users/"+commit.$user.$nickname+"/pontuation")
            .push(pontuation.toFirebase());

        } );
    }

}