import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  tokenName:string = environment.JWT;

  constructor() { }
  getHeaders():HttpHeaders{
    let headers:HttpHeaders = new HttpHeaders();
    let jwt:string= window.localStorage.getItem(this.tokenName);
   headers= headers.set(this.tokenName,jwt);
   return headers;
  }
}
