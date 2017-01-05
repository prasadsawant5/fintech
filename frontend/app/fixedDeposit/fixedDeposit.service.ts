import { FixedDeposit } from './fixedDeposit.model';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FixedDepositService {
    public constructor(public http: Http) {}

    HOST: string = 'http://localhost:3000';

    createFixedDeposit(fixedDeposit: FixedDeposit) {
        const body = JSON.stringify(fixedDeposit);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.post(this.HOST + '/fixedDeposits/', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }

    getAllFixedDeposit(fixedDeposit: FixedDeposit) {
        const body = JSON.stringify(fixedDeposit);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        return this.http.patch(this.HOST + '/fixedDeposits/', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }


    getPlan(id: string) {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'id': id });
        return this.http.get(this.HOST + '/fixedDeposits/plan', { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }


    getFixedDeposit(name: string) {
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'fdname': name });
        return this.http.get(this.HOST + '/fixedDeposits/', { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }


    editPlan(id: string, fixedDeposit: FixedDeposit) {
        const body = JSON.stringify(fixedDeposit);
        const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'id': id });
        return this.http.patch(this.HOST + '/fixedDeposits/plan', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) =>  {
                return Observable.throw(error.json()) 
            });
    }
}