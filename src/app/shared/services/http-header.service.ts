import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  /*
  tokenName:string = "JWT-TOKEN";
  headers:HttpHeaders = new HttpHeaders();
  jwt:string= window.localStorage.getItem(this.tokenName);
  */
  constructor() { }
  getHeaders():HttpHeaders{
    let tokenName:string = "JWT-TOKEN";
    let headers:HttpHeaders = new HttpHeaders();
    let jwt:string= window.localStorage.getItem(tokenName);
    console.log(jwt);
    headers= headers.set(tokenName,jwt);
    return headers;
  }
}
