import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  tokenName:string = "JWT-TOKEN";

  constructor() { }
  getHeaders():HttpHeaders{
    let headers:HttpHeaders = new HttpHeaders();
    let jwt:string= window.localStorage.getItem(this.tokenName);
   headers= headers.set(this.tokenName,jwt);
   return headers;
  }
}
