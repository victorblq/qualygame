import { User } from './../user/User';
import { CommitedArtifact } from './CommitedArtifact';
import { CommitStatus } from './CommitStatus';
import { Iteration } from './../iteration/Iteration';

export class Commit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private hash: string;

    /**
     * 
     */
    private iteration: Iteration;

    /**
     * 
     */
    private date: Date;

    /**
     * 
     */
    private message: string;

    /**
     * 
     */
    private status: CommitStatus;

    /**
     * 
     */
    private commitedArtifacts: Array<CommitedArtifact>;

    /**
     * 
     */
    private user: User;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param hash 
     * @param message 
     * @param date 
     * @param commitedArtifacts 
     * @param status 
     * @param user 
     * @param iteration 
     */
    constructor(
        hash?: string,
        message?: string,
        date?: number,
        commitedArtifacts?: Array<CommitedArtifact>,
        status?: string,
        user?: string,
        iteration?: string
    )
    {
        this.hash = hash;
        this.message = message;
        this.date = new Date( date );
        this.commitedArtifacts = commitedArtifacts;
        this.status = CommitStatus[status];
        this.user = new User(user);
        this.iteration = new Iteration(iteration);
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/

    /**
     * 
     */
    public get $hash(): string
    {
        return this.hash;
    }

    /**
     * 
     */
    public set $hash( value: string )
    {
        this.hash = value;
    }

    /**
     * 
     */
    public get $iteration(): Iteration
    {
        return this.iteration;
    }

    /**
     * 
     */
    public set $iteration( value: Iteration )
    {
        this.iteration = value;
    }

    /**
     * 
     */
    public get $date(): Date
    {
        return this.date;
    }

    /**
     * 
     */
    public set $date( value: Date )
    {
        this.date = value;
    }

    /**
     * 
     */
    public get $message(): string
    {
        return this.message;
    }

    /**
     * 
     */
    public set $message( value: string )
    {
        this.message = value;
    }

    /**
     * 
     */
    public get $status(): CommitStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: CommitStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $commitedArtifacts(): Array<CommitedArtifact>
    {
        return this.commitedArtifacts;
    }

    /**
     * 
     */
    public set $commitedArtifacts( value: Array<CommitedArtifact> )
    {
        this.commitedArtifacts = value;
    }

    /**
     * 
     */
    public get $user(): User 
    {
		return this.user;
	}

    /**
     * 
     */
    public set $user(value: User) 
    {
		this.user = value;
    }
    
    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    public toFirebase(): {}
    {
        return {
            hash: this.hash,
            message: this.message,
            date: this.date.getTime(),
            status: CommitStatus[this.status],
            user: this.user.$nickname,
            iteration: this.iteration.$key
        }
    }
}