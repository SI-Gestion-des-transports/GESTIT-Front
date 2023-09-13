import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  tokenName:string = environment.JWT;
  /*
  headers:HttpHeaders = new HttpHeaders();
  jwt:string= window.localStorage.getItem(this.tokenName);
  */
  constructor() { }
  getHeaders():HttpHeaders{
    let headers:HttpHeaders = new HttpHeaders();
    let jwt:string = window.localStorage.getItem(this.tokenName);
    console.log(jwt);
    headers= headers.set(this.tokenName,jwt);
    return headers;
  }
}
