import { Member } from './member.model';
import { MemberService } from './member.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';

const MOBILE_NO = /^\d{10}$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;

@Component({
    selector: 'app-list-member',
    templateUrl: './list.member.component.html',
    styleUrls: ['./list.member.component.css', '../app.component.css']
})

export class ListMemberComponent {
    constructor(private memberService: MemberService) {}

     errFlag: boolean = false;
     notificationFlag: boolean = false;
     successFlag: boolean = false;
     loading: boolean = false;
     errMessage: string;
     successMessage: string; 
     email: string = ''; 
     members: any;   

    onSearch(searchMemberForm: NgForm) {
        this.errFlag = false;
        this.successFlag = false;
        this.notificationFlag = false;

        this.loading = true;

        if (searchMemberForm.value.lastName === '') {
            this.notificationFlag = true;
            this.errFlag = true;
            this.errMessage = 'Please enter a Last Name.';
        } else {
            var member;
            if (MOBILE_NO.test(searchMemberForm.value.query)) {
                member = new Member(
                    null, null, null, searchMemberForm.value.lastName.toUpperCase(), null, null, null, null, null, searchMemberForm.value.query, null, null, null, null, null, null, null, null 
                );
            } else if (PAN.test(searchMemberForm.value.query)) {
                member = new Member(
                    null, null, null, searchMemberForm.value.lastName.toUpperCase(), null, searchMemberForm.value.query, null, null, null, null, null, null, null, null, null, null, null, null 
                );
            } else if (searchMemberForm.value.query !== '') {
                member = new Member(
                    null, null, null, searchMemberForm.value.lastName.toUpperCase(), null, null, searchMemberForm.value.query, null, null, null, null, null, null, null, null, null, null, null 
                );
            } else {
                member = new Member(
                    null, null, null, searchMemberForm.value.lastName.toUpperCase(), null, null, null, null, null, null, null, null, null, null, null, null, null, null 
                );
            }

            this.memberService.search(member)
                .subscribe(
                    data => {
                        this.notificationFlag = true;
                        this.successFlag = true;
                        this.successMessage = data.message;

                        this.members = data.obj;
                    },
                    error => {
                        this.notificationFlag = true;
                        this.errFlag = true;
                        this.errMessage = error.message;
                    }
                );
        }

        this.loading = false;
        searchMemberForm.reset();
        
    }


    getEmail(member: any) {
        if (member.json().email !== null && member.json().email !== '')
            this.email = member.json().email;
    }
}