import { Project } from './../project/Project';
import { User } from './../user/User';

export class Team
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
    private members: Array<User>;

    /**
     * 
     */
    private projects: Array<Project>;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    public constructor(
        name?: string,
        members?: Array<string>,
        projects?: Array<string>
    )
    {
        this.name = name;
        this.$members = new Array<User>();

        if(members != null && members.length != 0)
        {
            for(let i = 0; i < members.length; i++)
            {
                this.members.push( new User( members[i] ) );
            }
        }

        if(projects != null && projects.length != 0)
        {
            for(let i = 0; i < projects.length; i++)
            {
                this.projects.push( new Project( projects[i] ) );
            }
        }
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
    public get $members(): Array<User>
    {
        return this.members;
    }

    /**
     * 
     */
    public set $members( value: Array<User> )
    {
        this.members = value;
    }

    /**
     * 
     */
    public get $projects(): Array<Project>
    {
        return this.projects;
    }

    /**
     * 
     */
    public set $projects( value: Array<Project> )
    {
        this.projects = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    public toFirebase(): {}
    {
        let team = {
            name: this.name,
            members: [],
            projects: []
        }

        for(let i = 0; i < this.members.length; i++)
        {
            team.members.push(this.members[i].$nickname);
        }

        for(let i = 0; i < this.$projects.length; i++)
        {
            let project = {
                name: this.projects[i].$name,
                description: this.projects[i].$description,
                status: this.projects[i].$status,
                iterations: []
            }

            for( let j = 0; j < this.projects[i].$iterations.length; j++)
            {
                project.iterations.push(
                    {
                        name: this.projects[i].$iterations[j].$name,
                        status: this.projects[i].$iterations[j].$status
                    }
                )
            }
            
            team.projects.push(project);
        }

        return team;
    }
    

}