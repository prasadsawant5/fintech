import { ChangePassword } from './change.password.model';
import { NgForm } from '@angular/forms/src/directives';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-password',
    templateUrl: './user.password.edit.component.html'
})
export class UserPasswordEditComponent implements OnInit {
    constructor(private userService: UserService) {}

     notificationFlag: boolean = false;
     errFlag: boolean = false;
     successFlag: boolean = false;
     successMessage: string;
     errMessage: string;

    onSave(changePasswordForm: NgForm) {
        this.notificationFlag = false;
        this.errFlag = false;
        this.successFlag = false;

        const newPassword = new ChangePassword(
            changePasswordForm.value.oldPassword,
            changePasswordForm.value.newPassword,
            changePasswordForm.value.confirmPassword
            );

        this.userService.changePassword(newPassword)
            .subscribe(
                data => {
                    if (data.token !== null) {
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
            )
        changePasswordForm.reset();
    }

    ngOnInit() {

    }
    
}