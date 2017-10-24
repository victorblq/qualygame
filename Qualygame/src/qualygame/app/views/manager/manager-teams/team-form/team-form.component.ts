import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User } from './../../../../entity/user/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from './../../../../entity/team/Team';
import { Component, OnInit, Inject } from '@angular/core';

@Component( {
    selector: 'team-form',
    templateUrl: 'team-form.component.html',
    styleUrls: ["team-form.component.css"]
} )

export class TeamFormComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private team: Team = new Team();

    /**
     * 
     */
    private membersWithTeam: Array<string>;

    /**
     * 
     */
    private availableUsers: Array<User>;

    /**
     * 
     */
    private checkboxAvailable: boolean = true;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private dialogRef: MdDialogRef<TeamFormComponent>,
        @Inject(MD_DIALOG_DATA) data: {team?: Team}
    ) 
    { 
        if(data != null && data.team != null)
        {
            this.team = data.team;
        }
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
        this.listUsersWithTeams();
    }

    /**
     * 
     */
    listUsersWithTeams(): void
    {
        this.membersWithTeam = new Array<string>();
        //First pick all the members from all teams
        this.afDatabase.list("/teams/")
        .subscribe( ( result ) => {
            for(let i = 0; i < result.length; i++)
            {
                for(let j = 0; j < result[i].members.length; j++)
                {
                    this.membersWithTeam.push(result[i].members[j]);
                }
            }
            
            this.listAvailableUsers();
        });
    }

    /**
     * 
     */
    listAvailableUsers(): void
    {
        //And than pick all the users excluding the ones that are already in a team
        this.afDatabase.list("/users")
        .subscribe( ( result ) => {
            this.availableUsers = new Array<User>();

            for(let i = 0; i < result.length; i++)
            {
                if(this.membersWithTeam.indexOf(result[i].nickname) == -1
                    && result[i].profile == 1
                    && result[i].status != 1)
                {
                    let user = new User(
                        result[i].nickname,
                        result[i].email,
                        result[i].profile,
                        result[i].status,
                        result[i].name,
                        result[i].totalPontuation,
                        result[i].photo,
                        result[i].level
                    );

                    this.availableUsers.push(user);
                }
            }

            if(this.team.$members != null && this.team.$members.length > 0)
            {
                for(let i = 0; i < this.team.$members.length; i++)
                {   
                    this.availableUsers.push(this.team.$members[i]);
                    this.checkboxAvailable = false;
                }

            }
        }) 
    }

    /**
     * 
     * @param user 
     */
    addUserInTeam(user): void
    {
        if(user.checked == null || user.checked == false)
        {
            if(this.checkboxAvailable)
            {
                if(this.team.$members == null)
                {
                    this.team.$members = new Array<User>();
                }
    
                if(this.team.$members.length < 2)
                {
                    this.team.$members.push(user);
                }
                else
                {
                    this.checkboxAvailable = false;
                }
            }
        }
        else
        {
            if(this.team.$members.indexOf(user) != -1)
            {
                this.team.$members.splice(this.team.$members.indexOf(user), 1);
                this.checkboxAvailable = true;
            }
        }

    }

    /**
     * 
     */
    cleanTeamMembers()
    {
        this.listAvailableUsers();
        this.team.$members = new Array<User>();
        this.checkboxAvailable = true;
    }

    /**
     * 
     * @param this 
     * @param user 
     */
    saveTeam(): void
    {
        if(this.team.$key != null)
        {
            this.updateTeam();
        }
        else
        {
            this.insertTeam();
        }
        
    }

    /**
     * 
     */
    insertTeam(): void
    {
        if(this.team.$name != null && (this.team.$members != null && this.team.$members.length > 0))
        {
            this.afDatabase.list("/teams")
            .push(this.team.toFirebase())
            .then( (result) => {
                this.dialogRef.close();
            });
        }
    }

    /**
     * 
     */
    updateTeam(): void
    {
        if(this.team.$name != null && (this.team.$members != null && this.team.$members.length > 0))
        {
            this.afDatabase.object("/teams/"+this.team.$key)
            .set(this.team.toFirebase())
            .then( (result) => {
                this.dialogRef.close();
            });
        }
    }

    /**
     * 
     * @param user 
     */
    verifyUserTeam(user): string
    {
        if(this.team.$members != null)
        {
            if(this.team.$members.indexOf(user) != -1)
            {
                return "*";
            }
            else
            {
                return "";
            }
        }
        else
        {
            return "";
        }
    }

    /**
     * 
     */
    cancel(): void
    {
        this.dialogRef.close();
    }
}