import { UserService } from './user.service';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

     errFlag: boolean = false;
     errMessage: string;

     activeMembers: number;
     nonActiveMembers: number;
     totalMembers: number;

    login(loginForm: NgForm) {
        this.errFlag = false;
        const user = new User(loginForm.value.username, loginForm.value.password);               

        this.authService.login(user)
            .subscribe(
                data => {    
                    if (data.token !== null) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('firstName', data.firstName);
                        localStorage.setItem('lastName', data.lastName);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('mobile', data.mobile);
                        localStorage.setItem('accessLevel', data.accessLevel);                
                        // this.router.navigateByUrl('/dashboard');
                    }
                },
                error => {
                    this.errFlag = true;
                    this.errMessage = error.message;
                }
            );

        loginForm.reset();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }


    getDashboardInformation() {

    }

    ngOnInit() {
        this.userService.getDashboardInformation()
            .subscribe(
                data => {
                    if (data.activeCount !== null) {
                        this.activeMembers = parseInt(data.activeCount);
                        this.totalMembers = parseInt(data.totalCount);

                        this.nonActiveMembers = this.totalMembers - this.activeMembers;
                    }
                },
                error => {

                }
            )
    }

}