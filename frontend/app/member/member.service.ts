import { ErrorService } from '../error/error.service';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Member } from './member.model';
import { Injectable } from '@angular/core';


@Injectable()
export class MemberService {
    constructor(private http: Http, private errorService: ErrorService) {}

    HOST: string = 'http://localhost:3000';

    addMember(member: Member) {
        const body = JSON.stringify(member);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.post(this.HOST + '/members/new', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }

    search(member: Member) {
        const body = JSON.stringify(member);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.post(this.HOST + '/members/search', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }

    getMember(id: string) {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'id': id });
        return this.http.get(this.HOST + '/members/', {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }

    editMember(member: Member, id: string) {
        const body = JSON.stringify(member);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'id': id  });
        return this.http.patch(this.HOST + '/members/', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }
}