import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root',
})
export class AdressesService {
  private _baseAdressesUrl = environment.urlApi.adresses;
  constructor(private _http: HttpClient) {}

  findAll(): Observable<Adresse[]> {
    return this._http.get<Adresse[]>(`${this._baseAdressesUrl}`);
  }

  findById(adresse: Adresse): Observable<Adresse> {
    return this._http.get<Adresse>(`${this._baseAdressesUrl}/${adresse.id}`);
  }

  create(createdAdresse: Adresse): Observable<Adresse> {
    return this._http.post<Adresse>(this._baseAdressesUrl, createdAdresse);
  }

  update(updatedAdresse: Adresse): Observable<Adresse> {
    return this._http.put<Adresse>(
      `${this._baseAdressesUrl}/${updatedAdresse.id}`,
      updatedAdresse
    );
  }

  delete(deletedAdresse: Adresse): Observable<Adresse> {
    return this._http.delete<Adresse>(
      `${this._baseAdressesUrl}/${deletedAdresse.id}`
    );
  }
}
