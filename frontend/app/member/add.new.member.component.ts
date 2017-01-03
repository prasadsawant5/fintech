import { NotificationService } from '../notification/notification.service';
import { ErrorService } from '../error/error.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from './member.service';
import { Member } from './member.model';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-add-new-member',
    templateUrl: './add.new.member.component.html',
    styleUrls: ['./add.new.member.component.css', '../app.component.css']
})

export class AddNewMemberComponent implements OnInit {
    constructor(private memberService: MemberService, private router: Router, private errorService: ErrorService, private notificationService: NotificationService) {}

     MOBILE_NO = /^\d{10}$/;
     EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;

     notificationFlag: boolean = false;
     errFlag: boolean = false;
     successFlag: boolean = false;
     loading: boolean = false;
     others: boolean = false;
     relation: string;
     successMessage: string;
     errMessage: string;

     firstName: string;
     middleName: string;
     lastName: string;
     email: string;
     mobile: string;
     panNo: string;
     aadharNo: string;
     dob: string;
     gender: string;
     address: string;
     companyName: string;
     designation: string;
     department: string;
     monthlyIncome: string;
     officeAddress: string;

     ages: Array<number>;
     relations: Array<string>;


    onSave(newMemberForm: NgForm) {
        this.notificationFlag = false;
        this.errFlag = false;
        this.successFlag = false;

        this.loading = true;

        if (!this.validateInput(this.MOBILE_NO, newMemberForm.value.mobile)) {
            this.errorService.handleError('Please enter a valid mobile number.');
        } else if (!this.validateInput(this.PAN, newMemberForm.value.panNo.toUpperCase())) {
            this.errorService.handleError('Please enter a valid PAN number.');
        // } else if (newMemberForm.value.email !== '' && newMemberForm.value.email !== null) {
        //     if (!this.validateInput(this.EMAIL, newMemberForm.value.email)) {
        //         this.errorService.handleError('Please enter a valid email.');
        //     }
        } else if (newMemberForm.value.firstName === null || newMemberForm.value.firstName === '') {
            this.errorService.handleError('Please enter a valid First Name.'); 
        } else if (newMemberForm.value.middleName === null || newMemberForm.value.middleName === '') {
            this.errorService.handleError('Please enter a valid Middle Name.');             
        } else if (newMemberForm.value.lastName === null || newMemberForm.value.lastName === '') {
            this.errorService.handleError('Please enter a valid Last Name.'); 
        } else {
            if (this.others) {
                if (newMemberForm.value.nomineeRelation !== null && newMemberForm.value.nomineeRelation !== '')
                    this.relation = newMemberForm.value.nomineeRelation.toUpperCase();
            } else {
                this.relation = newMemberForm.value.relation.toUpperCase();
            }
            const member = new Member(
                null,
                newMemberForm.value.firstName.toUpperCase(),
                newMemberForm.value.middleName.toUpperCase(),
                newMemberForm.value.lastName.toUpperCase(),
                new Date(newMemberForm.value.dob),
                newMemberForm.value.panNo.toUpperCase(),
                newMemberForm.value.aadharNo.replace(' ', ''),
                newMemberForm.value.gender.toUpperCase(),
                newMemberForm.value.address.toUpperCase(),
                newMemberForm.value.mobile,
                newMemberForm.value.email,
                newMemberForm.value.companyName.toUpperCase(),
                parseFloat(newMemberForm.value.monthlyIncome),
                newMemberForm.value.designation.toUpperCase(),
                newMemberForm.value.department.toUpperCase(),
                newMemberForm.value.officeAddress.toUpperCase(),
                newMemberForm.value.nomineeFirstName.toUpperCase(),
                newMemberForm.value.nomineeMiddleName.toUpperCase(),
                newMemberForm.value.nomineeLastName.toUpperCase(),
                parseInt(newMemberForm.value.nomineeAge),
                this.relation,
                null,
                null
            );

            this.memberService.addMember(member)
                .subscribe(
                    data => {
                        if (data.obj !== null) {
                            // this.notificationFlag = true;
                            // this.successFlag = true;
                            // this.successMessage = data.message;
                            newMemberForm.reset();
                            this.notificationService.handleNotification(data.message);
                        }

                    },
                    error => {
                        this.errorService.handleError(error.message);
                    }
                );
        }      
        this.loading = false;  
    }

     onClick(relation) {
        if (relation === 'others')
            this.others = true;
        else
            this.others = false;
    }

    onChange(relation) {
        console.log(relation);
        if (relation.includes('OTHERS'))
            this.others = true;
        else
            this.others = false;
    }


    validateInput(regEx, input) {
        return regEx.test(input);
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
    }
}