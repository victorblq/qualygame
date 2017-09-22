import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../../entity/user/User';
import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'quick-ranking',
    templateUrl: 'quick-ranking.component.html',
    styleUrls: ['quick-ranking.component.css']
} )

export class QuickRankingComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    @Input("user") user: User;

    /**
     * 
     */
    @Input("userOnly") userOnly: boolean = false;

    /**
     * 
     */
    private quickRankingList: Array<{user: User, position: number}>;
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
        //Estudar se rola fazer isso no firebase functions
        this.afDatabase.list("users")
        .subscribe( ( users ) => {
            let userList = new Array<User>();

            for(let i = 0; i < users.length; i++)
            {
                userList.push( new User(
                    users[i].nickname,
                    users[i].email,
                    users[i].profile,
                    users[i].status,
                    users[i].name,
                    users[i].totalPontuation,
                    users[i].photo,
                    users[i].level
                ) );
            }

            userList.sort( ( userToFind1, userToFind2 ) => {
                return userToFind1.$totalPontuation > userToFind2.$totalPontuation ? -1 : 1;
            });

            this.quickRankingList = new Array<{user: User, position: number}>();

            for(let i = 0; i < userList.length; i++)
            {
                if(i < 3 && this.quickRankingList.length < 6)
                {
                    this.quickRankingList.push({user: userList[i], position: i});

                    if(userList[i].$nickname == this.user.$nickname)
                    {
                        let left = ( 6 - this.quickRankingList.length );
                        for( let j = i + 1; j <= left; j++ )
                        {
                            this.quickRankingList.push({user: userList[j], position: j});
                            
                            i = j;

                            if(i == 2)
                            {
                                break;
                            }
                        }
                    }
                }
                else
                {
                    if( this.quickRankingList.length <= 6 )
                    {
                        if(userList[i].$nickname == this.user.$nickname)
                        {
                            if(i + 1 == userList.length )
                            {
                                this.quickRankingList.push({user: userList[i-2], position: i-2});
                            }
                            
                            this.quickRankingList.push({user: userList[i-1], position: i-1});
                            this.quickRankingList.push({user: userList[i], position: i});
                            
                            if(i + 1 != userList.length)
                            {
                                this.quickRankingList.push({user: userList[i+1], position: i + 1});
                            }


                            if( i == 3)
                            {
                                this.quickRankingList.splice(3, 1);
                                this.quickRankingList.push({user: userList[i+2], position: i+2});
                            }
                        }
                    }
                }
            }

            if(this.quickRankingList.length < 6)
            {
                let last = this.quickRankingList[this.quickRankingList.length - 1].position;
                let left = 6 - this.quickRankingList.length;

                for( let i = 0 + 1; i <= left; i++)
                {
                    last++;
                    this.quickRankingList.push({user: userList[last], position: last});
                }
                
            }

        });
    }
}