import { Member } from '../member/member.model';
import { NgForm } from '@angular/forms/src/directives';
import { MemberService } from '../member/member.service';
import { Component, OnInit } from '@angular/core';

const MOBILE_NO = /^\d{10}$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;

@Component({
    selector: 'app-search-member-fixed-deposit',
    templateUrl: './search.member.fixed.deposit.component.html',
    styleUrls: ['../app.component.css']
})


export class SearchMemberFixedDepositComponent implements OnInit {
    constructor(private memberService: MemberService) {}

    loading: boolean = false;
    errFlag: boolean = false;
    successFlag: boolean = false;
    notificationFlag: boolean = false;
    selected: boolean = false;

    errMessage: string;
    successMessage: string;
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

    onSelect(member) {
        console.log(member);
        this.selected = !this.selected;
    }

    ngOnInit() {
        
    }
}