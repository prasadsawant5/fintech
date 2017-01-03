import { Scheme } from './scheme.model';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SchemeService {
    public constructor(private http: Http) {}

    getAllLedgers() {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.get('http://localhost:3000/ledgers', { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }


    getAllSchemes() {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.get('http://localhost:3000/schemes', { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }


    createScheme(scheme: Scheme) {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        const body = JSON.stringify(scheme);
        return this.http.post('http://localhost:3000/schemes', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  { 
                return Observable.throw(error.json()) 
            });
    }
}