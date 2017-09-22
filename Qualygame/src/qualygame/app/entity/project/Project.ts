import { ProjectStatus } from './ProjectStatus';
import { Iteration } from './../iteration/Iteration';

export class Project
{
    /*===================================================================
    *                             ATTRIBUTES
    *===================================================================*/
    /**
     * 
     */
    private name: string;

    /**
     * 
     */
    private description: string;

    /**
     * 
     */
    private status: ProjectStatus;

    /**
     * 
     */
    private iterations: Array<Iteration>;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param name 
     * @param description 
     * @param status 
     * @param iterations 
     */
    constructor(
        name?: string,
        description?: string,
        status?: string,
        iterations?: Array<Iteration>
    )
    {
        this.name = name;
        this.description = description;
        this.status = ProjectStatus[status];
        this.iterations = iterations;
    }

    /*===================================================================
    *                         GETTERS AND SETTERS
    *===================================================================*/
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
    public get $description(): string
    {
        return this.description;
    }

    /**
     * 
     */
    public set $description( value: string )
    {
        this.description = value;
    }

    /**
     * 
     */
    public get $status(): ProjectStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: ProjectStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $iterations(): Array<Iteration>
    {
        return this.iterations;
    }

    /**
     * 
     */
    public set $iterations( value: Array<Iteration> )
    {
        this.iterations = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
}