import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISetCfg } from './core.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class NetReqService {

  constructor(public http:HttpClient) { }
  
   getUrlRating(url) {
    let exePath = 'v1/rate?url=';
    let fullUrl = `${ENV.urleasy}/${exePath}${url}`;
    const myHeaders = new HttpHeaders({'X-Operator': 'kris', 'Content-Type': 'application/x-www-form-urlencoded'})
    return this.http.get('assets/mockRating.json', {headers: myHeaders})
      .pipe(map(res => res))
  }

  setOverride(config:ISetCfg) {
    //
    let body = `url=${config.url}&category=${config.category}&storedas=${config.storeas}`;
    const myHeaders = new HttpHeaders({'X-Operator': config.user, 'Content-Type': 'application/x-www-form-urlencoded'})
    /*this.http
        .post(`${ENV.speakeasy}/v1/override/add`, body, {headers: myHeaders})
        .pipe(map(res => res)) */

    return of([{}])
    //.pipe(map(res => res[0]))
  }

  deleteOverride(url) {
    //DELETE /v1/override/delete?url='<url_string>'
    this.http.delete(`${ENV.urleasy}/v1/override/delete?url=${url}`)
      //.map(res => res.json())
    return of([{}])
    //.map(res => res[0])
  }

  viewOverride(config:ISetCfg) {
    //GET /v1/override/view?url="<url_string>"
    const myHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-Operator': config.user
    });
    let myParams = new HttpParams();
    myParams = myParams.append('id','1');

    return this.http 
      .get( 'assets/mockRating.json'/* `${ENV.speakeasy}/v1/override/view?url=${config.url}` */, {headers: myHeaders, params: myParams})
      .pipe(map(res => res))
  }

  viewAllOverrides() {
    // GET /v1/override/viewall
    const myHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-Operator': 'Kris'
    });
    return this.http
      .get('assets/mockData/mockOverrides.json'/* `${ENV.speakeasy}/v1/override/viewall` */, {headers: myHeaders})
      .pipe(map(res => res))
  }

  healthCheck() {
    //GET /v1/healthcheck

    return this.http
      .get(`${ENV.urleasy}/v1/healthcheck`)
      .pipe(map(res => res))

    /* return Observable.of([ 
      {
        name:"speakeasy-service",
        version:"0.0.20170901204505",
        host:"kmj-us-speakeasy-7-15",
        build:"20170901-2045",
        uptime:602212016,
        startTime:"2017-09-13T22:34:10Z"
      }
    ])
    .map(res => res[0]) */
  }

}
