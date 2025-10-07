import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//import 'rxjs/add/observable/of';
import { ISetCfg, IHealthCheck } from '../../../../core/core.interface';
import { Subject } from 'rxjs';

@Injectable()
export class ModalNetService {
    private _modalSubject = new Subject<any>();
    modalState = this._modalSubject.asObservable();
    constructor(public http:HttpClient) { }

    setOverride(config:ISetCfg) {
        //POST /v1/override/add?url="<url_string>"&category="<category>"&storedas="<hint>"
        let body = `url=${config.url}&category=${config.category}&storedas=${config.storeas}`;
        const myHeaders = new HttpHeaders({'X-Operator': config.user, 'Content-Type': 'application/x-www-form-urlencoded'})
        console.log(config);
        /* return this.http
            .post(`${ENV.urleasy}/v1/override/add`, body, {headers: myHeaders})
            .pipe(map(res => res)) */
        return of([{}])
            //.pipe(map(res => res[0]))
    }
    sendCloseModal(msg) {
        this._modalSubject.next(msg);
    }
}
