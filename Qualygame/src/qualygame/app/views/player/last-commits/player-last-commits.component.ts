import { CommitedArtifact } from './../../../entity/commit/CommitedArtifact';
import { AngularFireDatabase } from 'angularfire2/database';
import { Commit } from './../../../entity/commit/Commit';
import { CommitStatus } from './../../../entity/commit/CommitStatus';
import { User } from './../../../entity/user/User';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'player-last-commits',
    templateUrl: 'player-last-commits.component.html'
} )

export class PlayerLastCommitsComponent implements OnInit
{
    /*===================================================================
    *                             ATTRIBUTES
    *===================================================================*/
    /**
     * 
     */
    @Input("loggedUser") loggedUser: User;

    /**
     * 
     */
    private lastCommits: Array<Commit> = [];

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     */
    constructor(
        private afDatabase: AngularFireDatabase
    ){}

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
        this.afDatabase.list("/commits/")
        .subscribe( ( commitList ) => {
            let userCommits = commitList.filter( ( commitToFind ) => {
                if(commitToFind.user == this.loggedUser.$nickname)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });

            this.lastCommits = new Array<Commit>();
            
            userCommits.forEach( ( commit ) => {
                this.lastCommits.push( 
                    new Commit( 
                        commit.hash, 
                        commit.message, 
                        commit.date, 
                        commit.commitedArtifacts, 
                        commit.status,
                        commit.user,
                        commit.iteration 
                    )
                );
            });
        });
    }

    // saveCommits()
    // {
    //     let commitedArtifact = new CommitedArtifact({filePath: "lol.com.br/file"});
        
    //     let commit1 = new Commit(
    //         {
    //             hash: "teste12345teste", 
    //             message: "Testando commit na tela do jogador",
    //             timestamp: new Date().getTime(), 
    //             commitedArtifacts: null,
    //             status: "OPEN"
    //         }
    //     );

    //     console.log(commit1);
    //     this.afDatabase.database.ref("/commits/Pigmeo/"+commit1.$hash)
    //     .set(commit1);
        
    //     this.afDatabase.list("/commits/Pigmeo/"+commit1.$hash+"/commitedArtifacts")
    //     .push(commitedArtifact);
    // }
}