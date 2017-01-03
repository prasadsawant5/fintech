import { FixedDeposit } from './fixedDeposit.model';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FixedDepositService {
    public constructor(public http: Http) {}

    createFixedDeposit(fixedDeposit: FixedDeposit) {
        const body = JSON.stringify(fixedDeposit);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.post('http://localhost:3000/fixedDeposits/', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }
}