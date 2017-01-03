import { AuthenticationComponent } from '../auth/authentication.component';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [
        'a#logout:hover { cursor: pointer; }'
    ]
})

export class HeaderComponent implements OnInit {
    constructor(private authService: AuthService) {}

    userName: string;

    onLogout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.userName = localStorage.getItem('username');
    } 
}