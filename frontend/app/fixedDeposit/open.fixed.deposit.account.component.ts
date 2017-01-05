import { SchemeService } from '../scheme/scheme.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FixedDepositService } from './fixedDeposit.service';
import { NotificationService } from '../notification/notification.service';
import { ErrorService } from '../error/error.service';
import { Member } from '../member/member.model';
import { NgForm } from '@angular/forms/src/directives';
import { MemberService } from '../member/member.service';
import { Component, OnInit } from '@angular/core';

const MOBILE_NO = /^\d{10}$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;

@Component({
    selector: 'app-open-fixed-deposit-account',
    templateUrl: './open.fixed.deposit.account.component.html',
    styleUrls: ['../app.component.css']
})

export class OpenFixedDepositAccountComponent implements OnInit {

    constructor(private errorService: ErrorService, private notificationService: NotificationService, private fixedDepositService: FixedDepositService, private activatedRoute: ActivatedRoute, private memberService: MemberService, private schemeService: SchemeService) {}

    loading: boolean = false;
    memberId: string;
    subscription: Subscription;
    member: any;
    fullName: string;
    memId: string;
    fdSchemes: Array<any>;
    details: boolean = false;
    ledgerName: string;
    selectedFd: any;
    interestArray: Array<number> = [];
    fds: Array<any>;
    periods: Array<any> = [];


    onChange(scheme) {
        this.loading = true;
        this.ledgerName = scheme;

        console.log(scheme);

        if (scheme === '') {
            this.details = false;
            return;
        }

        for (var i = 0; i < this.fdSchemes.length; i++) {
            if (this.fdSchemes[i].ledgerName === scheme) {
                this.fixedDepositService.getFixedDeposit(scheme)
                    .subscribe(
                        data => {
                            this.loading = false;
                            if (data.obj !== null) {
                                this.fds = data.obj;

                                for (var i = 0; i < this.fds.length; i++) {
                                    this.periods.push({ interest: this.fds[i].interest, specialInterest: this.fds[i].specialInterest });

                                }
                                this.details = true;

                            } else {
                                this.errorService.handleError('Unable to find ' + scheme + ' plans.');
                                this.details = false;
                            }

                        },
                        error => {
                            this.loading = false;
                            this.errorService.handleError('Unable to find ' + scheme + ' plans.');
                            this.details = false;                            
                        }
                    )
                // this.selectedFd = this.fdSchemes[i];
                // this.interestArray.push(this.selectedFd.interest);
                // this.interestArray.push(this.selectedFd.specialINterest);

                break;
            }
        }
    }


    onSave(openFixedDepositAccount: NgForm) {

    }


    ngOnInit() {
        this.loading = true;

        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.memberId = param['id'];
            }
        );

        this.memberService.getMember(this.memberId)
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.member = data.obj;
                        this.fullName = data.obj.firstName + ' ' + data.obj.middleName + ' ' + data.obj.lastName;
                        this.memId = data.obj.memberId;
                    } else {
                        this.errorService.handleError('Cannot find Member information at this point. Please try again later.');
                    }
                },
                error => {
                    this.errorService.handleError(error.message);
                }
            );

        
        this.schemeService.getAllFdSchemes()
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.fdSchemes = data.obj;
                    } else {
                        this.errorService.handleError('Cannot find all the Fixed Deposit Schemes at this point.');
                    }
                },
                error => {
                    this.errorService.handleError(error.message);
                }
            );

        this.loading = false;
    }

}