import { Injectable, OnInit } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CovoiturageService implements OnInit {

  private _baseCovoitUrl = environment.urlApi.covoiturages;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  getAllCovoiturages(): Observable<Covoiturage[]> {
    return this.http.get<Covoiturage[]>(this._baseCovoitUrl);
  }

  getCovoiturageById(covoiturageId: number): Observable<Covoiturage> {
    return this.http.get<Covoiturage>(`${this._baseCovoitUrl}/${covoiturageId}`);
  }

  public create(createdCovoiturage: Covoiturage): Observable<Covoiturage> {
    console.log("creation demandee");
    return this.http.post<Covoiturage>(
      this._baseCovoitUrl,
      createdCovoiturage
    );
  }
}

/*    
} */




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
