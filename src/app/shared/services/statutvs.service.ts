import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatutvsService {
private _baseUrl= environment.urlApi.statusVS;
  constructor(private  _http:HttpClient) { }
  findAll(){
    return this._http.get<string[]>(this._baseUrl);
  }

}
