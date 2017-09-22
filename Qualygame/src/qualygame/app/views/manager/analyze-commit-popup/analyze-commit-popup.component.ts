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

        let commitedArtifactError = new CommitedArtifactError(null, null);
        commitedArtifact.$errors.push(commitedArtifactError);
    }
}