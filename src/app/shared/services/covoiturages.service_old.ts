import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Covoiturage_old } from '../models/covoiturage_old';

@Injectable({
  providedIn: 'root',
})
export class CovoituragesService {
  private _baseCovoitUrl = environment.urlApi.covoiturages;
  constructor(private _http: HttpClient) {}

  public findAll() {
    return this._http.get<Covoiturage_old[]>(this._baseCovoitUrl);
  }

  public findById(covoitOrg: Covoiturage_old) {
    return this._http.get<Covoiturage_old>(
      `${this._baseCovoitUrl}/${covoitOrg.id}`
    );
  }

  public create(createdCovoitOrg: Covoiturage_old) {
    return this._http.post<Covoiturage_old>(
      this._baseCovoitUrl,
      createdCovoitOrg
    );
  }

  public update(updatedCovoitOrg: Covoiturage_old) {
    return this._http.put<Covoiturage_old>(
      `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
      updatedCovoitOrg
    );
  }

  public delete(deletedCovoitOrg: Covoiturage_old) {
    return this._http.delete<Covoiturage_old>(
      `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`
    );
  }
}
