import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {HttpHeaderService} from "./http-header.service";

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  private _baseUrl =environment.urlApi.modele;

  constructor(private _http:HttpClient,
              private _httpHeader:HttpHeaderService) { }

   getModelByMarque(marque:string){
      return this._http.get<string[]>(`${this._baseUrl}?marque=${marque}`,{headers:this._httpHeader.getHeaders()});
   }
}
