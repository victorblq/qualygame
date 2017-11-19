import { PontuationService } from './service/PontuationService';
/*=========================================================================
*=                          ANGULAR MODULES                              =
*=========================================================================*/
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, 
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/*=========================================================================
*=                          MATERIAL MODULES                             =
*=========================================================================*/
import { 
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdExpansionModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    MdSidenavModule,
    MD_DIALOG_DATA
} from '@angular/material';

import { RtProgressBarComponent } from 'rt-progress-bar';

/*=========================================================================
*=                          COVALENT MODULES                             =
*=========================================================================*/
import { 
    CovalentDataTableModule,
    CovalentDialogsModule
} from '@covalent/core';

/*=========================================================================
*=                          FIREBASE MODULES                             =
*=========================================================================*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/*=========================================================================
*=                             APP MODULES                               =
*=========================================================================*/
import { RoutingModule, appRoutingProviders } from './routing.module';
import { environment } from './../../environments/environment';

/*=========================================================================
*=                           APP COMPONENTS                              =
*=========================================================================*/
import { AnalyzeCommitPopupComponent } from './views/manager/analyze-commit-popup/analyze-commit-popup.component';
import { CommonToolbarComponent } from './views/common/toolbar/common-toolbar.component';
import { ConfirmDialogComponent } from './views/common/confirm/confirm-dialog.component';
import { LoginComponent } from './views/login/login.component';
import { LevelSummaryComponent } from './views/player/level-summary/level-summary.component';
import { ManagerHomeComponent } from './views/manager/manager-home/manager-home.component';
import { ManagerProjectsComponent } from './views/manager/manager-projects/manager-projects.component';
import { ManagerTeamsComponent } from './views/manager/manager-teams/manager-teams.component';
import { ManagerUsersComponent } from './views/manager/manager-users/manager-users.component';
import { ManagerViewComponent } from './views/manager/manager-view.component';
import { QualygameViewComponent } from './views/qualygame-view.component';
import { QuickRankingComponent } from './views/player/player-profile/quick-ranking/quick-ranking.component';
import { PlayerBadgesComponent } from './views/player/player-profile/player-badges/player-badges.component';
import { PlayerHomeComponent } from './views/player/player-home.component';
import { PlayerLastCommitsComponent } from './views/player/last-commits/player-last-commits.component';
import { PlayerLastPontuationComponent } from './views/player/last-pontuation/player-last-pontuation.component';
import { PlayerProfileComponent } from './views/player/player-profile/player-profile.component';
import { ProjectsFormComponent } from './views/manager/manager-projects/projects-form/projects-form.component';
import { TeamDetailComponent } from './views/manager/manager-teams/team-detail/team-detail.component';
import { TeamFormComponent } from './views/manager/manager-teams/team-form/team-form.component';
import { TeamSummaryComponent } from './views/player/team-summary/team-summary.component';
import { UserFormComponent } from './views/manager/manager-users/user-form/user-form.component';
import { UserDetailComponent } from './views/manager/manager-users/user-detail/user-detail.component';


/*=========================================================================
*=                            APP SERVICES                                =
*=========================================================================*/
import { StringService } from './service/StringService';
import { UserService } from './service/UserService';

//NGX-TRANSLATE LOADER
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AnalyzeCommitPopupComponent,
        CommonToolbarComponent,
        ConfirmDialogComponent,
        LoginComponent,
        LevelSummaryComponent,
        ManagerHomeComponent,
        ManagerProjectsComponent,
        ManagerTeamsComponent,
        ManagerUsersComponent,
        ManagerViewComponent,
        QualygameViewComponent,
        QuickRankingComponent,
        PlayerBadgesComponent,
        PlayerHomeComponent,
        PlayerLastCommitsComponent,
        PlayerLastPontuationComponent,
        PlayerProfileComponent,
        ProjectsFormComponent,
        RtProgressBarComponent,
        TeamDetailComponent,
        TeamFormComponent,
        TeamSummaryComponent,
        UserFormComponent,
        UserDetailComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        CovalentDataTableModule,
        CovalentDialogsModule,
        FormsModule,
        HttpClientModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdDialogModule,
        MdExpansionModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdToolbarModule,
        MdTooltipModule,
        MdSelectModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdProgressBarModule,
        NgxChartsModule,
        RoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AngularFireAuth,
        AngularFireDatabase,
        appRoutingProviders,
        PontuationService,
        StringService,
        UserService,
        {provide: MD_DIALOG_DATA, useValue: {} }
    ],
    bootstrap: [QualygameViewComponent],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        AnalyzeCommitPopupComponent,
        ConfirmDialogComponent,
        PlayerProfileComponent,
        ProjectsFormComponent,
        TeamDetailComponent,
        TeamFormComponent,
        UserFormComponent,
        UserDetailComponent
    ]
})
export class Module { }
