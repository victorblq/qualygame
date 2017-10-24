import { Project } from './../../../../entity/project/Project';
import { User } from './../../../../entity/user/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { MD_DIALOG_DATA } from '@angular/material';
import { Team } from './../../../../entity/team/Team';
import { Component, OnInit, Inject } from '@angular/core';

@Component( {
    selector: 'team-detail',
    templateUrl: 'team-detail.component.html'
} )

export class TeamDetailComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private team: Team;

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
    /**
     * 
     */
    constructor(
        @Inject(MD_DIALOG_DATA) data: { team: Team},
        private afDatabase: AngularFireDatabase
    ) 
    { 
        this.team = data.team;

        this.members = new Array<User>();

        for(let i = 0; i < this.team.$members.length; i++)
        {
            this.afDatabase.database.ref("/users/"+this.team.$members[i].$nickname)
            .once("value", ( result ) => {
                let userFound = result.val();

                let user = new User(
                    userFound.nickname,
                    userFound.email,
                    userFound.profile,
                    userFound.status,
                    userFound.name,
                    userFound.totalPontuation,
                    userFound.photo,
                    userFound.level
                );

                this.members.push(user);
            });
        }

        this.projects = new Array<Project>();

        this.afDatabase.list("/teams/"+this.team.$key+"/projects")
        .subscribe( ( result ) => {
            for( let i = 0; i < result.length; i++)
            {
                let project = new Project(
                    result[i].key,
                    result[i].name, 
                    result[i].description, 
                    result[i].status, 
                    result[i].iterations
                );

                this.projects.push(project);
            }
        });
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
    ngOnInit() { }
}