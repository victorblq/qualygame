import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';

import { PlayerHomeComponent } from './views/player/player-home.component';
import { ManagerViewComponent } from './views/manager/manager-view.component';
import { ManagerHomeComponent } from './views/manager/manager-home/manager-home.component';
import { ManagerUsersComponent } from './views/manager/manager-users/manager-users.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'player',
        component: PlayerHomeComponent,
    },
    {
        path: 'manager',
        component: ManagerViewComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ManagerHomeComponent
            },
            {
                path: 'users',
                component: ManagerUsersComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot( routes, { useHash: true } );

/**
 *
 */
@NgModule( {
    imports: [
        routing
    ],
    exports: [
        RouterModule
    ]
} )
export class RoutingModule
{
}

export const appRoutingProviders: any[] = [];