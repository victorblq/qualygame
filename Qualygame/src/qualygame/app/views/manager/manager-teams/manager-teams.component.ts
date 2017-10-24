import { ConfirmDialogComponent } from './../../common/confirm/confirm-dialog.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { MdDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from './../../../entity/team/Team';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'manager-teams',
    templateUrl: 'manager-teams.component.html'
} )

export class ManagerTeamsComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private teams: Array<Team>;

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
        .subscribe( ( teams ) => {
            this.teams = new Array<Team>();

            for(let i = 0; i < teams.length; i++)
            {
                let team = new Team(
                    teams[i].$key,
                    teams[i].name,
                    teams[i].members,
                    teams[i].projects
                )

                this.teams.push( team );
            }
        });
    }

    /**
     * 
     * @param team 
     */
    openTeamDetail(team): void
    {
        this.mdDialog.open(TeamDetailComponent, {
            data: {
                team: team
            }
        });
    }

    /**
     * 
     */
    openTeamForm(): void
    {
        this.mdDialog.open(TeamFormComponent, {});
    }

    /**
     * 
     * @param team 
     */
    editTeam(team): void
    {
        this.mdDialog.open(TeamFormComponent, {
            data: {
                team: team
            }
        });
    } 

    /**
     * 
     * @param team 
     */
    deleteTeam(team): void
    {
        this.mdDialog.open(ConfirmDialogComponent, {
            data:{
                title: "Tem certeza que deseja excluir esse time?",
                message: "Se você excluir esse time todos os projetos e iterações dele também serão excluídos, tem certeza?",
                okButton: "Sim",
                cancelButton: "Cancelar"
            }
        })
        .afterClosed().subscribe( ( result ) => {
            if(result == true)
            {
                this.afDatabase.object("/teams/"+team.$key)
                .remove();
            }
        })
    }

}