import { Artifact } from './../../../entity/artifact/Artifact';
import { AnalyzeCommitPopupComponent } from './../analyze-commit-popup/analyze-commit-popup.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Iteration } from './../../../entity/iteration/Iteration';
import { Project } from './../../../entity/project/Project';
import { Team } from './../../../entity/team/Team';
import { CommitedArtifact } from './../../../entity/commit/CommitedArtifact';
import { Commit } from './../../../entity/commit/Commit';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './../../../service/UserService';
import { User } from './../../../entity/user/User';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'manager-home',
    templateUrl: 'manager-home.component.html'
} )

export class ManagerHomeComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private commits: Array<Commit>;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private router: Router,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar
    ) {}

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
        this.afDatabase.list("commits")
        .subscribe( ( commits ) => {
            this.commits = new Array<Commit>();
            commits.forEach( ( commitToFind ) => {
                let commit = new Commit(
                    commitToFind.hash, 
                    commitToFind.message, 
                    commitToFind.date, 
                    null, 
                    commitToFind.status, 
                    commitToFind.user, 
                    commitToFind.iteration
                );

                this.commits.push( commit );
                this.findCommitProject( commit );
                this.setCommitedArtifacts(commit, commitToFind.commitedArtifacts);
            });
        });
    }

    /**
     * 
     * @param commit 
     */
    private findCommitProject( commit: Commit ): void
    {
        this.afDatabase.list("teams")
        .subscribe( ( teams ) => {
            let team = teams.find( ( teamToFind ) => {
                return teamToFind.members.indexOf(commit.$user.$nickname) != -1
            });

            for(let key in team.projects)
            {
                for(let iterationKey in team.projects[key].iterations)
                {
                    if(iterationKey == commit.$iteration.$key)
                    {
                        commit.$iteration = new Iteration(
                            iterationKey,
                            team.projects[key].iterations[iterationKey].name,
                            team.projects[key].iterations[iterationKey].status,
                            team.projects[key].name
                        );
                    }
                }
            }
        });
    }

    /**
     * 
     * @param commit 
     * @param commitedArtifacts 
     */
    private setCommitedArtifacts(commit: Commit, commitedArtifacts: {}): void
    {
        commit.$commitedArtifacts = new Array<CommitedArtifact>();

        for(let key in commitedArtifacts)
        {
            this.afDatabase.list("/artifacts")
            .subscribe( ( artifacts ) => {
                let artifactFound = artifacts.find( ( artifactToFind ) => {
                    return artifactToFind.code == commitedArtifacts[key].artifact;
                });

                if( artifactFound != null)
                {
                    let artifact = new Artifact(artifactFound.code, artifactFound.name, artifactFound.weight);
    
                    let commitedArtifact = new CommitedArtifact(
                        key,
                        commitedArtifacts[key].filePath, 
                        commitedArtifacts[key].status,
                        artifact,
                        commitedArtifacts[key].errors
                    );
    
                    commit.$commitedArtifacts.push(commitedArtifact);
                }
            });
        }
    }

    /**
     * 
     * @param comimt 
     */
    analyzeCommit(commit: Commit): void
    {
        let mdDialogRef = this.mdDialog.open( AnalyzeCommitPopupComponent,{
            width: "70%",
            data: {
                commit: commit
            }
        });

    }

    /**
     * 
     */
    saveCommits()
    {
        let commitedArtifact = new CommitedArtifact("sadasdsa", "lol.com.br/file", "0", new Artifact("CCQB"), null);
        let commitedArtifact2 = new CommitedArtifact("sadasdsadsadsa", "teste.com.br/file", "0", new Artifact("CCQPT"), null);
        
        let commit1 = new Commit(
                "teste1234", 
                "Teste commit projeto 2",
                new Date().getTime(), 
                null,
                "0",
                "Pigmeo",
                "-KuMZeOrCc1LzYNFffgS"
        );

        this.afDatabase.database.ref("/commits/"+commit1.$hash)
        .set(commit1.toFirebase());
        
        this.afDatabase.list("/commits/"+commit1.$hash+"/commitedArtifacts")
        .push(commitedArtifact);

        this.afDatabase.list("/commits/"+commit1.$hash+"/commitedArtifacts")
        .push(commitedArtifact2);
    }

    saveTeam()
    {
        // let team = new Team("Time 002");

        // let members = new Array<User>();
        // members.push(new User("Teste123"));
        // members.push(new User("Teste4"));

        // team.$members = members;

        let iteration1 = new Iteration(null, "Sprint 02", 0);
        
        // let projects = new Array<Project>();

        // let project = new Project("Projeto 01", "Esse projeto é loko", "0");
        // project.$iterations = new Array<Iteration>();
        // project.$iterations.push(iteration1);

        // team.$projects = new Array<Project>();
        // team.$projects.push(project);

        // this.afDatabase.list("teams")
        // .push(team.toFirebase());

        this.afDatabase.list("teams/-KuMQVgAK0mTMHtT0kix/projects/0/iterations")
        .push(iteration1.toFirebase());
    }

}