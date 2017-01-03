import { AuthenticationComponent } from './authentication.component';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user.model';

@Injectable()
export class AuthService {
    constructor(private http: Http, private router: Router) {}

    HOST: string = 'http://104.199.223.132/:3000';    

    login(user: User) {
        var headers = new Headers({'Content-Type': 'application/json', 'username': user.username, 'password': user.password});
        return this.http.get(this.HOST + '/users/login', {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('/');
    }


    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}