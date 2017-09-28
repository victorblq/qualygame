import { Artifact } from './../../../entity/artifact/Artifact';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommitedArtifactError } from './../../../entity/commit/CommitedArtifactError';
import { CommitedArtifactStatus } from './../../../entity/commit/CommitedArtifactStatus';
import { CommitedArtifact } from './../../../entity/commit/CommitedArtifact';
import { MD_DIALOG_DATA } from '@angular/material';
import { Commit } from './../../../entity/commit/Commit';
import { Component, OnInit, Inject } from '@angular/core';

@Component( {
    selector: 'analyze-commit-popup',
    templateUrl: 'analyze-commit-popup.component.html',
} )

export class AnalyzeCommitPopupComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private commit: Commit;

    /**
     * 
     */
    private CommitedArtifactStatus = CommitedArtifactStatus;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        @Inject(MD_DIALOG_DATA) data: {commit: Commit}
    ) 
    { 
        this.commit = data.commit;
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
        console.log(this.commit);
    }

    /**
     * 
     * @param commitedArtifact 
     */
    addCommitedArtifactError(commitedArtifact: CommitedArtifact): void
    {
        if( commitedArtifact.$errors == null )
        {
            commitedArtifact.$errors = new Array<CommitedArtifactError>();
        }

        let commitedArtifactError = new CommitedArtifactError(null, null, null);
        commitedArtifact.$errors.push(commitedArtifactError);
    }

    /**
     * 
     * @param commitedArtifact 
     * @param commitedArtifactError 
     */
    removeCommitedArtifactError(commitedArtifact: CommitedArtifact, commitedArtifactError: CommitedArtifactError): void
    {
        if(commitedArtifactError.$key != null)
        {
            this.afDatabase.object("/commits/"+this.commit.$hash+"/commitedArtifacts/"+commitedArtifact.$key+"/errors/"+commitedArtifactError.$key)
            .remove();
            commitedArtifact.$errors.splice(commitedArtifact.$errors.indexOf(commitedArtifactError), 1);
        }
        else
        {
            commitedArtifact.$errors.splice(commitedArtifact.$errors.indexOf(commitedArtifactError), 1);
        }
    }

    /**
     * 
     * @param commitedArtifact 
     * @param commitedArtifactError 
     */
    saveCommitedArtifactError(commitedArtifact: CommitedArtifact, commitedArtifactError: CommitedArtifactError): void
    {
        this.afDatabase.list("/commits/"+this.commit.$hash+"/commitedArtifacts/"+commitedArtifact.$key+"/errors")
        .push(commitedArtifactError)
        .then( ( commitedArtifactErrorInserted ) => {
            commitedArtifactError.$key = commitedArtifactErrorInserted.key;
        });
    }

    /**
     * 
     * @param commitedArtifact 
     */
    setCommitedArtifactCorrect(commitedArtifact): void
    {
        commitedArtifact.$status = CommitedArtifactStatus.CORRECT;
        commitedArtifact.$errors = [];

        this.afDatabase.object("/commits/"+this.commit.$hash+"/commitedArtifacts/"+commitedArtifact.$key)
        .set(commitedArtifact.toFirebase())
        .then( () => {
            commitedArtifact.$status = CommitedArtifactStatus[CommitedArtifactStatus.CORRECT];
        } );
    }

    /**
     * 
     * @param commitedArtifact 
     */
    editCommitedArtifact(commitedArtifact): void
    {
        commitedArtifact.$status = CommitedArtifactStatus.OPEN;

        this.afDatabase.object("/commits/"+this.commit.$hash+"/commitedArtifacts/"+commitedArtifact.$key)
        .set(commitedArtifact.toFirebase())
        .then( () => {
            commitedArtifact.$status = CommitedArtifactStatus[CommitedArtifactStatus.OPEN];
        });
    }
}