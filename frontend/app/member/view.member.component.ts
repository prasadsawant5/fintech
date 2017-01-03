import { OnDestroy, OnInit, Component } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Member } from './member.model';
import { Subscription } from 'rxjs/Rx';
import { MemberService } from './member.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-view-member',
    templateUrl: './view.member.component.html',
    styles: ['../app.component.css']
})

export class ViewMemberComponent implements OnInit, OnDestroy {
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private memberService: MemberService, private errorService: ErrorService) {}

     id: string;
     subscription: Subscription;
     member: any;
     memberId: string;
     firstName: string;
     middleName: string;
     lastName: string;
     panNo: string;
     aadharNo: string;
     mobile: string;
     email: string;
     gender: string;
     address: string;
     dob: Date;
     company: string;
     designation: string;
     department: string;
     income: string;
     officeAddress: string;
     relation: string;

     nomineeFirstName: string;
     nomineeMiddleName: string;
     nomineeLastName: string;
     nomineeAge: number;
     nomineeRelation: string;

     loading: boolean = true;

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.id = param['id'];
            }
        );


        this.memberService.getMember(this.id)
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.member = data.obj;
                        this.memberId = data.obj.memberId;
                        this.firstName = data.obj.firstName;
                        this.middleName = data.obj.middleName;
                        this.lastName = data.obj.lastName;
                        this.mobile = data.obj.mobile;
                        this.email = data.obj.email;
                        this.panNo = data.obj.panNo;
                        this.aadharNo = data.obj.aadharNo;
                        this.gender = data.obj.gender;
                        this.address = data.obj.address;
                        this.dob = new Date(data.obj.dob);
                        this.company = data.obj.companyName;
                        this.income = data.obj.monthlyIncome;
                        this.designation = data.obj.designation;
                        this.department = data.obj.department;
                        this.officeAddress = data.obj.officeAddress;
                        
                        this.loading = false;

                        if (data.nominee !== null) {
                            this.nomineeFirstName = data.nominee.firstName;
                            this.nomineeMiddleName = data.nominee.middleName;
                            this.nomineeLastName = data.nominee.lastName;
                            this.nomineeAge = data.nominee.age;
                            this.nomineeRelation = data.nominee.relation;
                        }
                    }
                },
                error => {
                    this.loading = false;
                    this.errorService.handleError(error.message);
                }
            );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}