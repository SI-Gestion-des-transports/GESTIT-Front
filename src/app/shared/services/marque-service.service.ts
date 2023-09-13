import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {HttpHeaderService} from "./http-header.service";

@Injectable({
  providedIn: 'root'
})
export class MarqueServiceService {
private _baseUrl:string = environment.urlApi.marque;
  constructor(private _http:HttpClient,
              private _httpHeader:HttpHeaderService) { }

  findAll(){
    return this._http.get<string[]>(`${this._baseUrl}/list`,{headers:this._httpHeader.getHeaders()});
  }
}
