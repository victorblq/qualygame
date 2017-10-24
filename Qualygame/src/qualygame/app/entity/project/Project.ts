import { Team } from './../team/Team';
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
    private key: string;

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

    /**
     * Transient
     */
    private team: Team;

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
        key?: string,
        name?: string,
        description?: string,
        status?: number,
        iterations?: any,
        team?: Team
    )
    {
        this.key = key;
        this.name = name;
        this.description = description;
        this.status = ProjectStatus[ProjectStatus[status]];
        
        this.iterations = new Array<Iteration>();
        
        for(let key in iterations)
        {
            let iteration = new Iteration(key, iterations[key].name, iterations[key].status);

            this.iterations.push(iteration);
        }

        this.team = team;
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

    /**
     * 
     */
    public get $team(): Team 
    {
		return this.team;
	}

    /**
     * 
     */
    public set $team(value: Team) 
    {
		this.team = value;
	}
    

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    toFirebase(): {}
    {
        let project = {
            name: this.name,
            description: this.description,
            status: ProjectStatus[ProjectStatus[this.status]],
            iterations: []
        };

        if(this.iterations != null && this.iterations.length > 0)
        {
            for(let i = 0; i < this.iterations.length; i++)
            {
                project.iterations[this.iterations[i].$key] = this.iterations[i].toFirebase()
            }
        }
        else
        {
            delete(project.iterations);
        }

        return project;
    }
}