import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MotorisationService {
  private _baseUrl = environment.urlApi.motorisation;

  constructor(private _http:HttpClient) { }
  findAll(){
    return this._http.get<string[]>(this._baseUrl);
  }
}
