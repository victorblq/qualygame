import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './../../../service/UserService';
import { UserFormComponent } from './user-form/user-form.component';
import { ConfirmDialogComponent } from './../../common/confirm/confirm-dialog.component';
import { MdDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../entity/user/User';
import { UserProfile } from './../../../entity/user/UserProfile';
import { UserStatus } from './../../../entity/user/UserStatus';
import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'manager-users',
    templateUrl: 'manager-users.component.html',
} )

export class ManagerUsersComponent implements OnInit
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private userList: Array<User>;

    /**
     * 
     */
    private UserProfile = UserProfile;

    /**
     * 
     */
    private UserStatus = UserStatus;

    /**
     * 
     */
    private loggedUser: User;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param afDatabase 
     */
    constructor(
        private afDatabase: AngularFireDatabase,
        private mdDialog: MdDialog,
        private userService: UserService
    ) 
    {
        this.userService.userChangedEventSource$.subscribe((loggedUser) => {
            this.loggedUser = loggedUser;
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
    ngOnInit() 
    {
        this.loggedUser = this.userService.$loggedUser;
         
        this.afDatabase.list("users")
        .subscribe( ( userList ) => {
            this.userList = userList;
        });
    }

    /**
     * 
     * @param userStatus 
     */
    changeUserStatus( user: User, userStatus: UserStatus ): void
    {
        let userToSave = new User();

        for( let key in user )
        {
            userToSave[key] = user[key];
        }
     
        userToSave.$status = userStatus;

        this.afDatabase.object("/users/"+userToSave.$nickname)
        .set(userToSave.toFirebase());
    }
    
    /**
     * 
     * @param user 
     */
    public deleteUser(user: {nickname: string}): void
    {
        this.mdDialog.open(ConfirmDialogComponent, {
            data: {
                title: "Tem certeza?",
                message: "Tem certeza que deseja excluir esse usuário? Todos os dados referentes a ele serão perdidos e ele não poderá mais logar na plataforma",
                okButton: "Ok",
                cancelButton: "Cancelar" 
            }
        }).afterClosed().subscribe( ( result ) => {
            if(result == true)
            {
                this.afDatabase.object("/users/"+user.nickname)
                .remove().catch( ( excecption ) => {
                    console.log(excecption);
                });
            }
        });
    }

    /**
     * 
     */
    openUserPopup(): void
    {   
        this.mdDialog.open(UserFormComponent, {

        });
    }   

    /**
     * 
     * @param user 
     */
    showUserDetails(user)
    {
        this.mdDialog.open(UserDetailComponent, {
            data: {
                user: user
            }
        });
    }
}