import { FixedDeposit } from './fixedDeposit.model';
import { NotificationService } from '../notification/notification.service';
import { FixedDepositService } from './fixedDeposit.service';
import { SchemeService } from '../scheme/scheme.service';
import { ErrorService } from '../error/error.service';
import { Member } from '../member/member.model';
import { NgForm } from '@angular/forms/src/directives';
import { MemberService } from '../member/member.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-new-fixed-deposit-plan',
    templateUrl: './add.new.fixed.deposit.plan.component.html',
    styleUrls: ['../app.component.css']
})

export class AddNewFixedDepositPlanComponent implements OnInit {
    constructor(private errorService: ErrorService, private schemeService: SchemeService, private fixedDepositService: FixedDepositService, private notificationService: NotificationService) {}

    loading:boolean = false;
    interestFlag: boolean = false;
    schemes: Array<any>;
    schemeId: string;

    onSave(newFixedDepositPlanForm: NgForm) {
        
        if (parseFloat(newFixedDepositPlanForm.value.interest) < 0) {
            this.errorService.handleError('Please enter a valid Interest Percentage.');
        } else if (parseFloat(newFixedDepositPlanForm.value.specialInterest) < 0) {
            this.errorService.handleError('Please enter a valid Special Interest Percentage.');
        } else if (newFixedDepositPlanForm.value.interestType === null) {
            this.errorService.handleError('Please select a valid Interest Type.');
        }  else if (newFixedDepositPlanForm.value.periodType === null) {
            this.errorService.handleError('Please select a valid Period Type.');
        }  else if (parseInt(newFixedDepositPlanForm.value.start) < 0) {
            this.errorService.handleError('Please enter a valid Start Period.');
        }  else if (parseInt(newFixedDepositPlanForm.value.end) < 0) {
            this.errorService.handleError('Please enter a valid End Interest Percentage.');
        }  else if (parseInt(newFixedDepositPlanForm.value.end) <= parseInt(newFixedDepositPlanForm.value.start)) {
            this.errorService.handleError('Start Period is less than End Period.');
        }else {

            var fixedDeposit = new FixedDeposit(
                newFixedDepositPlanForm.value.schemeName.toUpperCase(),
                newFixedDepositPlanForm.value.interestType.toUpperCase(),
                parseFloat(newFixedDepositPlanForm.value.interest),
                parseFloat(newFixedDepositPlanForm.value.specialInterest),
                newFixedDepositPlanForm.value.periodType.toUpperCase(),
                parseInt(newFixedDepositPlanForm.value.start),
                parseInt(newFixedDepositPlanForm.value.end),
                this.schemeId,
                null,
                null,
                null
            );

            this.fixedDepositService.createFixedDeposit(fixedDeposit)
                .subscribe(
                    data => {
                        if (data.obj !== null) {
                            this.notificationService.handleNotification(data.message);
                        }
                        newFixedDepositPlanForm.reset();
                        this.interestFlag = true;
                    },
                    error => {
                        this.errorService.handleError(error.message);
                    }
                );
        }
    }

    trackScheme(index, item) {

    }

    onChange(scheme) {
        if (scheme === '')
            this.interestFlag = true;
        else {
            for (var i = 0; i < this.schemes.length; i++) {
                if (this.schemes[i].ledgerNature === 'FIXED DEPOSIT' || this.schemes[i].ledgerNature === 'RECURRING DEPOSIT')
                    this.interestFlag = false;
                else
                    this.interestFlag = true;

                this.schemeId = this.schemes[i]._id;
            }
        }
    }

    ngOnInit() {
        this.interestFlag = true;
        this.loading = false;

        this.schemeService.getAllSchemes()
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.schemes = data.obj;
                        console.log(this.schemes);
                    }
                },
                error => {
                    this.errorService.handleError('Unable to find all the schemes at this moment. Please try again later.');
                }
            );
    }
}