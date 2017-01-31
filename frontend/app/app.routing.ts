import { EditSchemeComponent } from './scheme/edit.scheme.component';
import { OpenFixedDepositAccountComponent } from './fixedDeposit/open.fixed.deposit.account.component';
import { SearchMemberFixedDepositComponent } from './fixedDeposit/search.member.fixed.deposit.component';
import { FindFixedDepositPlanComponent } from './fixedDeposit/find.fixed.deposit.plan.component';
import { EditFixedDepositPlanComponent } from './fixedDeposit/edit.fixed.deposit.plan.component';
import { AddNewFixedDepositPlanComponent } from './fixedDeposit/add.new.fixed.deposit.plan.component';
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
    { path: 'scheme/edit', component: EditSchemeComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'fixeddeposit/plan/new', component: AddNewFixedDepositPlanComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'fixeddeposit/plan/new/:id', component: AddNewFixedDepositPlanComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'fixeddeposit/plan/edit', component: FindFixedDepositPlanComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'fixeddeposit/plan/edit/:id', component: EditFixedDepositPlanComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'deposit/fixed/new', component: SearchMemberFixedDepositComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
    { path: 'deposit/fixed/new/:id', component: OpenFixedDepositAccountComponent, canActivate: [CanActivateViaAuthGuard], pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);