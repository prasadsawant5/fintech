import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }
}