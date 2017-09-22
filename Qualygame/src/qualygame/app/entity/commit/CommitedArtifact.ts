import { Artifact } from './../artifact/Artifact';
import { CommitedArtifactError } from './CommitedArtifactError';
import { CommitedArtifactStatus } from './CommitedArtifactStatus';

export class CommitedArtifact
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private artifact: Artifact;

    /**
     * 
     */
    private filePath: string;

    /**
     * 
     */
    private status: CommitedArtifactStatus;

    /**
     * 
     */
    private errors: Array<CommitedArtifactError>;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    constructor(
        filePath: string,
        status: string,
        artifact: Artifact
    )
    {
        this.filePath = filePath;
        this.status = CommitedArtifactStatus[status];
        this.artifact = artifact;
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    /**
     * 
     */
    public get $artifact(): Artifact
    {
        return this.artifact;
    }

    /**
     * 
     */
    public set $artifact( value: Artifact )
    {
        this.artifact = value;
    }

    /**
     * 
     */
    public get $filePath(): string
    {
        return this.filePath;
    }

    /**
     * 
     */
    public set $filePath( value: string )
    {
        this.filePath = value;
    }

    /**
     * 
     */
    public get $status(): CommitedArtifactStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: CommitedArtifactStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $errors(): Array<CommitedArtifactError>
    {
        return this.errors;
    }

    /**
     * 
     */
    public set $errors( value: Array<CommitedArtifactError> )
    {
        this.errors = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/

}