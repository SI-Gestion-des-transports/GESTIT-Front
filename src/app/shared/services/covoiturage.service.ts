import { Injectable } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class CovoiturageService {
    listeCovoiturages!: Covoiturage[]
    private _baseCovoitUrl = environment.urlApi.covoiturages;
    constructor(private _http: HttpClient) { }

    public findAll(): Observable<Covoiturage[]> {
        return this._http.get<Covoiturage[]>(this._baseCovoitUrl);
    }

    public findById(covoiturageId: number) {
        return this._http.get<Covoiturage>(`${this._baseCovoitUrl}/${covoiturageId}`);

    }

    public create(createdCovoiturage: Covoiturage):Observable<Covoiturage>{
        console.log("creation demandee");
        return this._http.post<Covoiturage>(
            this._baseCovoitUrl,
            createdCovoiturage
        );
    }
}




/* public update(updatedCovoitOrg: Covoiturage_old) {
   return this._http.put<Covoiturage_old>(
     `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
     updatedCovoitOrg
   );
 }
 
 public delete(deletedCovoitOrg: Covoiturage_old) {
   return this._http.delete<Covoiturage_old>(
     `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`
   );
 } */
