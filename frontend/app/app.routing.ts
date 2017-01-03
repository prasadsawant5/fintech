import { AddNewPlanComponent } from './scheme/add.new.plan.component';
import { ViewMemberComponent } from './member/view.member.component';
import { AddNewSchemeComponent } from './scheme/add.new.scheme.component';
import { EditMemberComponent } from './member/edit.member.component';
import { ListMemberComponent } from './member/list.member.component';
import { UserPasswordEditComponent } from './auth/user.password.edit.component';
import { UserProfileEditComponent } from './auth/user.profile.edit.component';
import { AddNewMemberComponent } from './member/add.new.member.component';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';
import { CanActivateViaAuthGuard } from './auth/can.activate.via.auth.guard';
import { AuthenticationComponent } from './auth/authentication.component';
import { DashboardComponent } from './auth/dashboard.component';

const APP_ROUTES: Routes = [
    { path: '', component: AuthenticationComponent, pathMatch: 'full' },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'edit/profile', component: UserProfileEditComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'edit/password', component: UserPasswordEditComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'member/new', component: AddNewMemberComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'member/list', component: ListMemberComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'member/edit/:id', component: EditMemberComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'member/view/:id', component: ViewMemberComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'scheme/new', component: AddNewSchemeComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'plan/new', component: AddNewPlanComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);