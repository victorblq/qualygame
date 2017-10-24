import { Team } from './../../../entity/team/Team';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { MdDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Project } from './../../../entity/project/Project';
import { ProjectStatus } from './../../../entity/project/ProjectStatus';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'manager-projects',
    templateUrl: 'manager-projects.component.html'
} )

export class ManagerProjectsComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private projects: Array<Project>;

    /**
     * 
     */
    private ProjectStatus = ProjectStatus;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private mdDialog: MdDialog
    ) { }
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
        this.afDatabase.list("/teams")
        .subscribe( ( result ) => {
            this.projects = new Array<Project>();
            for(let i = 0; i < result.length; i++)
            {
                let projects = result[i].projects;
                if(projects != null)
                {
                    for(let key in projects)
                    {
                        let project = new Project(
                            key,
                            projects[key].name,
                            projects[key].description,
                            projects[key].status,
                            projects[key].iterations,
                            new Team(
                                result[i].$key,
                                result[i].name,
                                null,
                                null
                            )
                        );

                        this.projects.push(project);
                    }
                }
            }
        })
    }

    /**
     * 
     */
    openProjectForm(project: Project)
    {
        let dialogRef = this.mdDialog.open(ProjectsFormComponent, {
            width: "70%",
            data:{
                project: project,
            }
        });

        if(project != null)
        {
            dialogRef.afterClosed().subscribe( ( result ) => {
                this.ngOnInit();
            })
        }
    }
}