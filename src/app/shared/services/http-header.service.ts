import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  tokenName:string = "JWT-TOKEN";
  headers:HttpHeaders = new HttpHeaders();
  jwt:string= window.localStorage.getItem(this.tokenName);
  constructor() { }
  getHeaders():HttpHeaders{
    console.log(this.jwt);
   this.headers= this.headers.set(this.tokenName,this.jwt);
   return this.headers;
  }
}
