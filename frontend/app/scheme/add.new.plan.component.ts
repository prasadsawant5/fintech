import { FixedDeposit } from '../fixedDeposit/fixedDeposit.model';
import { FixedDepositService } from '../fixedDeposit/fixedDeposit.service';
import { NotificationService } from '../notification/notification.service';
import { Scheme } from './scheme.model';
import { ErrorService } from '../error/error.service';
import { NgForm } from '@angular/forms/src/directives';
import { SchemeService } from './scheme.service';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-new-plan',
    templateUrl: './add.new.plan.component.html',
    styleUrls: ['./add.new.plan.component.css', '../app.component.css']
})

export class AddNewPlanComponent implements OnInit {

    constructor(private schemeService: SchemeService, private errorService: ErrorService, private notificationService: NotificationService, private fixedDepositService: FixedDepositService) {}

    schemes: Array<any>;
    interestFlag: boolean;
    loading: boolean;
    schemeId: string;

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

    onSave(newPlanForm: NgForm) {

        var fixedDeposit = new FixedDeposit(
            newPlanForm.value.schemeName.toUpperCase(),
            newPlanForm.value.interestType.toUpperCase(),
            parseFloat(newPlanForm.value.interest),
            parseFloat(newPlanForm.value.specialInterest),
            newPlanForm.value.interestCalculation,
            newPlanForm.value.periodType.toUpperCase(),
            parseInt(newPlanForm.value.to),
            parseInt(newPlanForm.value.from),
            this.schemeId,
            null,
            null,
            null
        );
        
        console.log(fixedDeposit);

        this.fixedDepositService.createFixedDeposit(fixedDeposit)
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.notificationService.handleNotification(data.message);
                    }
                    newPlanForm.reset();
                },
                error => {
                    this.errorService.handleError(error.message);
                    newPlanForm.reset();
                }
            )
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
            )
    }
}