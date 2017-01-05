import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'app-edit-fixed-deposit-plan',
    templateUrl: './edit.fixed.deposit.plan.component.html',
    styleUrls: ['../app.component.css']
})

export class EditFixedDepositPlanComponent implements OnInit {

    constructor(private errorService: ErrorService, private notificationService: NotificationService, private fixedDepositeService: FixedDepositService, private activatedRoute: ActivatedRoute) {}

    loading: boolean = false;
    id: string;
    subscription: Subscription;
    fd: any;
    name: string;
    simple: boolean = false;
    compound: boolean = false;
    interest: number;
    specialInterest: number;
    days: boolean = false;
    months: boolean = false;
    start: number; 
    end:number;

    onSave(editFixedDepositPlanForm: NgForm) {
        console.log(editFixedDepositPlanForm.value);
        this.loading = true;

        const fixedDeposit = new FixedDeposit(
            this.name.toUpperCase(),
            editFixedDepositPlanForm.value.interestType.toUpperCase(),
            parseFloat(editFixedDepositPlanForm.value.interest),
            parseFloat(editFixedDepositPlanForm.value.specialInterest),
            editFixedDepositPlanForm.value.periodType.toUpperCase(),
            parseInt(editFixedDepositPlanForm.value.start),
            parseInt(editFixedDepositPlanForm.value.end),
            null,
            null,
            null,
            null,
            null
        );

        this.fixedDepositeService.editPlan(this.id, fixedDeposit)
            .subscribe(
                data => {
                    this.loading = false;
                    if (data.obj !== null) {
                        this.notificationService.handleNotification(data.message);
                    } else {
                        this.errorService.handleError('Unable to save the plan.');
                    }
                },
                error => {
                    this.loading = false;
                    this.errorService.handleError(error.message);
                }
            )
    }

    ngOnInit() {

        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.id = param['id'];
            }
        );


        this.fixedDepositeService.getPlan(this.id)
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.fd = data.obj;
                        this.name = this.fd.name;
                        this.interest = this.fd.interest;
                        this.specialInterest = this.fd.specialInterest;
                        this.start = this.fd.start;
                        this.end = this.fd.end;
                        
                        if (this.fd.interestType === 'SIMPLE') {
                            this.simple = true;
                            this.compound = false;
                        } else {
                            this.simple = false;
                            this.compound = true;
                        }

                        if (this.fd.periodType === 'DAYS') {
                            this.days = true;
                            this.months = false;
                        } else {
                            this.days = false;
                            this.months = true;
                        }


                    }
                },
                error => {

                }
            )

    }
    
}