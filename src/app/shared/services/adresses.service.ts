import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Adresse } from '../models/adresse';
import {HttpHeaderService} from "./http-header.service";

@Injectable({
  providedIn: 'root',
})
export class AdressesService {
  private _baseAdressesUrl = environment.urlApi.adresses;
  constructor(private _http: HttpClient,
              private _httpHeader:HttpHeaderService) {}

  findAll(): Observable<Adresse[]> {
    return this._http.get<Adresse[]>(`${this._baseAdressesUrl}`,{headers:this._httpHeader.getHeaders()});
  }

  findById(adresse: Adresse): Observable<Adresse> {
    return this._http.get<Adresse>(`${this._baseAdressesUrl}/${adresse.id}`,{headers:this._httpHeader.getHeaders()});
  }

  create(createdAdresse: Adresse): Observable<Adresse> {
    return this._http.post<Adresse>(this._baseAdressesUrl, createdAdresse,{headers:this._httpHeader.getHeaders()});
  }

  update(updatedAdresse: Adresse): Observable<Adresse> {
    return this._http.put<Adresse>(
      `${this._baseAdressesUrl}/${updatedAdresse.id}`,
      updatedAdresse,{headers:this._httpHeader.getHeaders()}
    );
  }

  delete(deletedAdresse: Adresse): Observable<Adresse> {
    return this._http.delete<Adresse>(
      `${this._baseAdressesUrl}/${deletedAdresse.id}`,{headers:this._httpHeader.getHeaders()}
    );
  }
}
