import { ChangePassword } from './change.password.model';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    HOST: string = 'http://104.199.223.132:3000';

    editProfile(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
        return this.http.patch(this.HOST + '/edit/profile', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }

    changePassword(newPassword: ChangePassword) {
        const body = JSON.stringify(newPassword);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
        return this.http.patch(this.HOST + '/users/edit/password', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });       
    }

    getDashboardInformation() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.HOST + '/users/dashboard', { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }
}