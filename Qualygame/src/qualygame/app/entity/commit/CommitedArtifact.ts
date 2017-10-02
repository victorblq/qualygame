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
    private key: string;

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
    /**
     * 
     * @param filePath 
     * @param status 
     * @param artifact 
     */
    constructor(
        key?: string,
        filePath?: string,
        status?: string,
        artifact?: Artifact,
        errors?: any
    )
    {
        this.key = key;
        this.filePath = filePath;
        this.status = CommitedArtifactStatus[status];
        this.artifact = artifact;

        this.errors = new Array<CommitedArtifactError>();

        for(let key in errors)
        {
            let commitedArtifactError = new CommitedArtifactError(
                key,
                errors[key].code,
                errors[key].message
            );
            this.errors.push(commitedArtifactError);
        }
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    /**
     * 
     */ 
    public get $key(): string 
    {
		return this.key;
	}

    /**
     * 
     */
    public set $key(value: string) 
    {
		this.key = value;
	}
    
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
    public toFirebase()
    {
        return{
            artifact: this.artifact.$code,
            status: CommitedArtifactStatus[CommitedArtifactStatus[this.status]],
            errors: this.errors,
            filePath: this.filePath
        }
    }
}