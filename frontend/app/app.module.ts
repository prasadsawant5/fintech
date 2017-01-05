import { OpenFixedDepositAccountComponent } from './fixedDeposit/open.fixed.deposit.account.component';
import { SearchMemberFixedDepositComponent } from './fixedDeposit/search.member.fixed.deposit.component';
import { FindFixedDepositPlanComponent } from './fixedDeposit/find.fixed.deposit.plan.component';
import { EditFixedDepositPlanComponent } from './fixedDeposit/edit.fixed.deposit.plan.component';
import { AddNewFixedDepositPlanComponent } from './fixedDeposit/add.new.fixed.deposit.plan.component';
import { FixedDepositService } from './fixedDeposit/fixedDeposit.service';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { AddNewPlanComponent } from './scheme/add.new.plan.component';
import { ViewMemberComponent } from './member/view.member.component';
import { ErrorService } from './error/error.service';
import { ErrorComponent } from './error/error.component';
import { SchemeService } from './scheme/scheme.service';
import { AddNewSchemeComponent } from './scheme/add.new.scheme.component';
import { EditMemberComponent } from './member/edit.member.component';
import { ListMemberComponent } from './member/list.member.component';
import { MemberService } from './member/member.service';
import { UserPasswordEditComponent } from './auth/user.password.edit.component';
import { UserService } from './auth/user.service';
import { UserProfileEditComponent } from './auth/user.profile.edit.component';
import { RouterModule } from '@angular/router';
import { AddNewMemberComponent } from './member/add.new.member.component';
import { HeaderComponent } from './header/header.component';
import { CanActivateViaAuthGuard } from './auth/can.activate.via.auth.guard';
import { AUTH_ROUTES } from './auth/auth.routes';
import { DashboardComponent } from './auth/dashboard.component';
import { AuthService } from './auth/auth.service';
import { AuthenticationComponent } from './auth/authentication.component';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        DashboardComponent,
        HeaderComponent,
        UserProfileEditComponent,
        UserPasswordEditComponent,
        AddNewMemberComponent,
        ListMemberComponent,
        EditMemberComponent,
        ViewMemberComponent,
        AddNewSchemeComponent,
        AddNewPlanComponent,
        SearchMemberFixedDepositComponent,
        OpenFixedDepositAccountComponent,
        AddNewFixedDepositPlanComponent,
        FindFixedDepositPlanComponent,
        EditFixedDepositPlanComponent,
        ErrorComponent,
        NotificationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
    ],
    providers: [AuthService, CanActivateViaAuthGuard, UserService, MemberService, SchemeService, ErrorService, NotificationService, FixedDepositService],
    bootstrap: [AppComponent]
})

export class AppModule {

}