import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {HttpHeaderService} from "./http-header.service";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
private _baseUrl:string = environment.urlApi.categorie;

  constructor(private _http:HttpClient,
              private _httpHeader:HttpHeaderService) { }

  findAll(){
    return this._http.get<string[]>(this._baseUrl,{headers:this._httpHeader.getHeaders()});
  }
}
