import { FixedDeposit } from './fixedDeposit.model';
import { FixedDepositService } from './fixedDeposit.service';
import { SchemeService } from '../scheme/scheme.service';
import { NotificationService } from '../notification/notification.service';
import { ErrorService } from '../error/error.service';
import { Member } from '../member/member.model';
import { NgForm } from '@angular/forms/src/directives';
import { MemberService } from '../member/member.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-find-fixed-deposit-plan',
    templateUrl: './find.fixed.deposit.plan.component.html',
    styleUrls: ['../app.component.css']
})

export class FindFixedDepositPlanComponent implements OnInit {
    constructor(private errorService: ErrorService, private notificationService: NotificationService, private schemeService: SchemeService, private fixedDepositService: FixedDepositService) {}

    loading: boolean = false;
    schemes: Array<any>;
    interestFlag: boolean = true;
    schemeId: string;
    fixedDeposits: Array<any>;
    fdFlag: boolean = false;

    onSave(editFixedDepositPlanForm: NgForm) {        

    }


    onChange(scheme) {
        this.loading = true;
        if (scheme === '') {
            this.interestFlag = true;
            this.loading = false;
        } else {
            for (var i = 0; i < this.schemes.length; i++) {
                this.schemeId = this.schemes[i]._id;
            }
            const fixedDeposit = new FixedDeposit(scheme, null, null, null, null, null, null, null, null, null, null, null);

            this.fixedDepositService.getAllFixedDeposit(fixedDeposit)
                .subscribe(
                    data => {
                        if (data.obj !== null) {
                            this.fixedDeposits = data.obj;
                            this.notificationService.handleNotification(data.message);
                            console.log(this.fixedDeposits);

                            this.fdFlag = true;
                        } else {
                            this.errorService.handleError('Not able to find all the Fixed Deposits');
                        }
                        this.loading = false;
                    },
                    error => {
                        this.loading = false;
                        this.errorService.handleError(error.message);
                    }
                )   
        }
    }


    ngOnInit() {
        this.schemeService.getAllSchemes()
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.schemes = data.obj;                   }
                },
                error => {
                    this.errorService.handleError('Unable to find all the schemes at this moment. Please try again later.');
                }
            );
    }
}