import { CommitedArtifact } from './../commit/CommitedArtifact';
import { Commit } from './../commit/Commit';
import { Action } from './../action/Action';
import { PontuationStatus } from './PontuationStatus';

export class Pontuation
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
    private value: number;

    /**
     * 
     */
    private action: Action;

    /**
     * 
     */
    private status: PontuationStatus;

    /**
     * 
     */
    private commit: Commit;

    /**
     * 
     */
    private timestamp: number;

    /**
     * 
     */
    private date: Date;

    /**
     * 
     */
    private commitedArtifact: CommitedArtifact;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    
    /**
     * 
     * @param pontuation 
     */
    constructor(
        key: string,
        value: number,
        status: string,
        action: Action,
        commit: string,
        timestamp: number,
        commitedArtifact: string
    )
    {
        this.key = key;
        this.value = value;
        this.status = PontuationStatus[status];
        this.action = action;
        this.commit = new Commit( commit );
        this.timestamp = timestamp;
        this.date = new Date( timestamp );
        this.commitedArtifact = new CommitedArtifact(commitedArtifact)
    }

    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/

    /**
     * 
     */
    public get $value(): number
    {
        return this.value;
    }

    /**
     * 
     */
    public set $value( value: number )
    {
        this.value = value;
    }

    /**
     * 
     */
    public get $action(): Action
    {
        return this.action;
    }

    /**
     * 
     */
    public set $action( value: Action )
    {
        this.action = value;
    }

    /**
     * 
     */
    public get $status(): PontuationStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: PontuationStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $commit(): Commit
    {
        return this.commit;
    }

    /**
     * 
     */
    public set $commit( value: Commit )
    {
        this.commit = value;
    }

    /**
     * 
     */
    public get $timestamp(): number
    {
        return this.timestamp;
    }

    /**
     * 
     */
    public set $timestamp( value: number )
    {
        this.timestamp = value;
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
    

    /*===================================================================
     *                              BEHAVIOUR
     *===================================================================*/
    public toFirebase(): {}
    {
        return {
            value: this.value,
            status: PontuationStatus[this.status],
            action: this.action.$key,
            commit: this.commit.$hash,
            timestamp: this.date.getTime(),
            commitedArtifact: this.commitedArtifact.$key
        }
    }
}