import { ConfirmDialogComponent } from './../../../common/confirm/confirm-dialog.component';
import { Iteration } from './../../../../entity/iteration/Iteration';
import { IterationStatus } from './../../../../entity/iteration/IterationStatus';
import { TeamFormComponent } from './../../manager-teams/team-form/team-form.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from './../../../../entity/team/Team';
import { Project } from './../../../../entity/project/Project';
import { ProjectStatus } from './../../../../entity/project/ProjectStatus';
import { Component, OnInit, Inject } from '@angular/core';

@Component( {
    selector: 'projects-form',
    templateUrl: 'projects-form.component.html'
} )

export class ProjectsFormComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private project: Project = new Project();

    /**
     * 
     */
    private team: Team = new Team();

    /**
     * 
     */
    private teams: Array<Team>;

    /**
     * 
     */
    private iterationStatus = [];

    /**
     * 
     */
    private IterationStatus = IterationStatus;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private mdDialogRef: MdDialogRef<TeamFormComponent>,
        @Inject(MD_DIALOG_DATA) data: {project: Project},
        private mdDialog: MdDialog
    ) 
    { 
        if(data != null && data.project != null)
        {
            this.project = data.project;
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
        for( let key in IterationStatus)
        {
            if (typeof IterationStatus[key] === 'number') 
            {
                this.iterationStatus.push(key);
            }
        }

        this.afDatabase.list("/teams")
        .subscribe( ( result ) => {
            this.teams = new Array<Team>();

            for(let i = 0; i < result.length; i++)
            {
                let team = new Team(
                    result[i].$key, 
                    result[i].name, 
                    null, 
                    null);

                this.teams.push(team);
            }

            if(this.project != null && this.project.$key != null)
            {
                this.team = this.teams.find( ( teamToFind ) => {
                    return teamToFind.$key == this.project.$team.$key;
                });
            }
        });
    }

    /**
     * 
     */
    saveProject(): void
    {
        if(this.project.$key != null)
        {
            this.updateProject();
        }
        else
        {
            this.insertProject();
        }
    }

    /**
     * 
     */
    updateProject(): void
    {
        this.afDatabase.object("/teams/"+this.team.$key+"/projects/"+this.project.$key)
        .set(this.project.toFirebase());

        this.mdDialogRef.close();
    }

    /**
     * 
     */
    insertProject(): void
    {
        this.project.$status = ProjectStatus.OPEN;
        
        this.afDatabase.list("/teams/"+this.team.$key+"/projects")
        .push(this.project.toFirebase());

        this.mdDialogRef.close();
    }

    /**
     * 
     */
    addIteration(): void
    {
        this.project.$iterations.push(new Iteration());
    }

    /**
     * 
     * @param iteration 
     */
    saveIteration(iteration: Iteration): void
    {
        if(iteration.$name != null && iteration.$status != null)
        {
            this.afDatabase.list("/teams/"+this.project.$team.$key+"/projects/"+this.project.$key+"/iterations")
            .push(iteration.toFirebase())
            .then( ( result ) => {
                iteration.$key = result.key;
            });
        }
    }

    /**
     * 
     * @param iteration 
     */
    editIteration(iteration: Iteration): void
    {
        if(iteration.$name != null && iteration.$status != null)
        {
            this.afDatabase.object("/teams/"+this.project.$team.$key+"/projects/"+this.project.$key+"/iterations/"+iteration.$key)
            .set(iteration.toFirebase());
        }
    }

    /**
     * 
     * @param iteration 
     */
    removeIteration(iteration: Iteration): void
    {
        if(iteration.$key != null)
        {
            this.mdDialog.open(ConfirmDialogComponent, {
                data: {
                    title: "Tem certeza?",
                    message: "Tem certeza que deseja excluir esse ciclo?",
                    okButton: "Ok",
                    cancelButton: "Cancelar" 
                }
            }).afterClosed().subscribe( ( result ) => {
                if(result == true)
                {
                    this.afDatabase.object("/teams/"+this.project.$team.$key+"/projects/"+this.project.$key+"/iterations/"+iteration.$key)
                    .remove().then( (result) => {
                        this.project.$iterations.splice(this.project.$iterations.indexOf(iteration), 1);
                    } );
                }
            });
        }
        else
        {
            this.project.$iterations.splice(this.project.$iterations.indexOf(iteration), 1);
        }
    }

    /**
     * 
     */
    cancel(): void
    {
        this.mdDialogRef.close();
    }

}