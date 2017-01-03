import { NotificationService } from '../notification/notification.service';
import { ErrorService } from '../error/error.service';
import { Member } from './member.model';
import { NgForm } from '@angular/forms/src/directives';
import { Subscription } from 'rxjs/Rx';
import { MemberService } from './member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-member',
    templateUrl: './edit.member.component.html',
    styleUrls: ['./edit.member.component.css', '../app.component.css']
})

export class EditMemberComponent implements OnInit, OnDestroy {
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private memberService: MemberService, private errorService: ErrorService, private notificationService: NotificationService) {}

     id: string;
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
     subscription: Subscription;
     member: any;

     notificationFlag: boolean = false;
     errFlag: boolean = false;
     successFlag: boolean = false;
     loading: boolean = false;
     others: boolean = false;
     errMessage: string;
     successMessage: string;

     male: string;
     female: string;
     father: string;
     mother: string;
     husband: string;
     wife: string;
     son: string;
     daughter: string;
     brother: string;
     sister: string;
     other: string;

     ages: Array<number>;
     relations: Array<string>;

     nomineeFirstName: string;
     nomineeMiddleName: string;
     nomineeLastName: string;
     nomineeAge: number;
     nomineeRelation: string;


    onSave(editMemberForm: NgForm) {
        this.notificationFlag = false;
        this.errFlag = false;
        this.successFlag = false;

        this.loading = true;

        var member;

        console.log(editMemberForm.value);
        if (this.others) {
            if (editMemberForm.value.nomineeRelation !== null && editMemberForm.value.nomineeRelation !== '')
                this.relation = editMemberForm.value.nomineeRelation.toUpperCase();
        } else {
            this.relation = editMemberForm.value.relation.toUpperCase();
        }

        if (editMemberForm.value.dob !== null && editMemberForm.value.dob !== '')
            this.dob = new Date(editMemberForm.value.dob);
        
        if (editMemberForm.value.gender !== '') {
            member = new Member(
                null, 
                editMemberForm.value.firstName.toUpperCase(),
                editMemberForm.value.middleName.toUpperCase(), 
                editMemberForm.value.lastName.toUpperCase(), 
                this.dob, 
                editMemberForm.value.panNo.toUpperCase(), 
                editMemberForm.value.aadharNo.replace(' ', ''), 
                editMemberForm.value.gender.toUpperCase(), 
                editMemberForm.value.address.toUpperCase(), 
                editMemberForm.value.mobile, 
                editMemberForm.value.email, 
                editMemberForm.value.companyName.toUpperCase(), 
                parseFloat(editMemberForm.value.monthlyIncome), 
                editMemberForm.value.designation.toUpperCase(), 
                editMemberForm.value.department.toUpperCase(), 
                editMemberForm.value.officeAddress.toUpperCase(),
                editMemberForm.value.nomineeFirstName.toUpperCase(),
                editMemberForm.value.nomineeMiddleName.toUpperCase(),
                editMemberForm.value.nomineeLastName.toUpperCase(),
                parseInt(editMemberForm.value.nomineeAge),
                this.relation, 
                null, 
                null 
            );
        } else {
            member = new Member(
                null, 
                editMemberForm.value.firstName.toUpperCase(),
                editMemberForm.value.middleName.toUpperCase(), 
                editMemberForm.value.lastName.toUpperCase(), 
                this.dob, 
                editMemberForm.value.panNo.toUpperCase(), 
                editMemberForm.value.aadharNo.replace(' ', ''), 
                null, 
                editMemberForm.value.address.toUpperCase(), 
                editMemberForm.value.mobile, 
                editMemberForm.value.email, 
                editMemberForm.value.companyName.toUpperCase(), 
                parseFloat(editMemberForm.value.monthlyIncome), 
                editMemberForm.value.designation.toUpperCase(), 
                editMemberForm.value.department.toUpperCase(), 
                editMemberForm.value.officeAddress.toUpperCase(),
                editMemberForm.value.nomineeFirstName.toUpperCase(),
                editMemberForm.value.nomineeMiddleName.toUpperCase(),
                editMemberForm.value.nomineeLastName.toUpperCase(),
                parseInt(editMemberForm.value.nomineeAge),
                this.relation, 
                null, 
                null 
            );
        }

        console.log(member);

        this.memberService.editMember(member, this.id)
            .subscribe(
                data => {
                    this.notificationService.handleNotification(data.message);
                },
                error => {
                    this.errorService.handleError(error.message);
                }
            );

        this.loading = false;

    }

    onClick(relation) {
        if (relation === 'others')
            this.others = true;
        else
            this.others = false;
    }

    ngOnInit() {
        this.ages = [ 
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
                61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
        ];

        this.relations = [ 'FATHER', 'MOTHER', 'HUSBAND', 'WIFE', 'DAUGHTER', 'SON', 'BROTHER', 'SISTER', 'OTHERS' ];

        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                console.log('subscribed');
                this.id = param['id'];
            }
        );

        this.memberService.getMember(this.id)
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.member = data.obj;
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

                        if (this.gender === 'MALE')
                            this.male = 'checked';
                        else
                            this.female = 'checked';

                        if (data.nominee !== null) {
                            this.nomineeFirstName = data.nominee.firstName;
                            this.nomineeMiddleName = data.nominee.middleName;
                            this.nomineeLastName = data.nominee.lastName;
                            this.nomineeAge = data.nominee.age;
                            this.nomineeRelation = data.nominee.relation;

                            if (data.nominee.relation === 'FATHER')
                                this.father = 'checked';
                            else if (data.nominee.relation === 'MOTHER')
                                this.mother = 'checked';
                            else if (data.nominee.relation === 'HUSBAND')
                                this.husband = 'checked';
                            else if (data.nominee.relation === 'WIFE')
                                this.wife = 'checked';
                            else if (data.nominee.relation === 'SON')
                                this.son = 'checked';
                            else if (data.nominee.relation === 'DAUGHTER')
                                this.daughter = 'checked';
                            else if (data.nominee.relation === 'BROTHER')
                                this.brother = 'checked';
                            else if (data.nominee.relation === 'SISTER')
                                this.sister = 'checked';
                            else {
                                this.other = 'checked';
                                this.others = true;
                            }
                        }
                    }
                },
                error => {

                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}