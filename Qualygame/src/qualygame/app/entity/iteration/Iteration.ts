import { Project } from './../project/Project';
import { IterationStatus } from './IterationStatus';

export class Iteration
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
    private name: string;

    /**
     * 
     */
    private project: Project;

    /**
     * 
     */
    private status: IterationStatus;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    constructor(
        key?: string,
        name?: string,
        status?: string,
        project?: string
    )
    {
        this.key = key;
        this.name = name;
        this.status = IterationStatus[status];
        this.project = new Project( project );
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
    public set $key( value: string )
    {
        this.key = value;
    }

    /**
     * 
     */
    public get $name(): string
    {
        return this.name;
    }

    /**
     * 
     */
    public set $name( value: string )
    {
        this.name = value;
    }

    /**
     * 
     */
    public get $status(): IterationStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: IterationStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $project(): Project
    {
        return this.project;
    }

    /**
     * 
     */
    public set $project( value: Project )
    {
        this.project = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    public toFirebase(): {}
    {
        return {
            name: this.name,
            status: IterationStatus[this.status]
        };
    }
}