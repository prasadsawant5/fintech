import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './user.profile.edit.component.html'
})
export class UserProfileEditComponent implements OnInit {
    constructor(private userService: UserService) {}

     firstName: string;
     lastName: string; 
     username: string;
     mobile: string;

     editProfileForm: FormGroup;
     notificationFlag: boolean = false;
     errFlag: boolean = false;
     successFlag: boolean = false;
     successMessage: string;
     errMessage: string;

    onSave() {
        const user = new User(
            this.editProfileForm.value.username,
            null,
            this.editProfileForm.value.firstName,
            this.editProfileForm.value.lastName,
            this.editProfileForm.value.mobile,
            null,
            null
        );

        this.notificationFlag = false;
        this.errFlag = false;
        this.successFlag = false;

        this.userService.editProfile(user)
            .subscribe(
                data => {
                    if (data.token !== null) {
                        localStorage.setItem('firstName', data.firstName);
                        localStorage.setItem('lastName', data.lastName);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('mobile', data.mobile);
                        localStorage.setItem('token', data.token);

                        this.notificationFlag = true;
                        this.successFlag = true;
                        this.successMessage = data.message;
                    }
                },
                error => {
                    this.notificationFlag = true;
                    this.errFlag = true;
                    this.errMessage = error.message;
                }
            );

    }

    ngOnInit() {
        this.firstName = localStorage.getItem('firstName');
        this.lastName = localStorage.getItem('lastName');
        this.username = localStorage.getItem('username');
        this.mobile = localStorage.getItem('mobile');

        this.editProfileForm = new FormGroup({
            firstName: new FormControl(this.firstName, Validators.required),
            lastName: new FormControl(this.lastName, Validators.required),
            username: new FormControl(this.username, Validators.required),
            mobile: new FormControl(this.mobile, Validators.required),
        });
    }

}