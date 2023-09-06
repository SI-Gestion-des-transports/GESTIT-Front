import { Injectable, OnInit } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CovoiturageService implements OnInit {

  private _baseCovoitUrl = environment.urlApi.covoiturages;
  private _listOfAllCovoiturages$!: Observable<Covoiturage[]>;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._listOfAllCovoiturages$.subscribe(value => console.log(value));
  }

  getAllCovoiturages(): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl);
  }

  getCovoiturageById(covoiturageId: number): Observable<Covoiturage> {
    return this._http.get<Covoiturage>(`${this._baseCovoitUrl}/${covoiturageId}`);
  }

  getFilteredbyUsersCovoit(idUtilisateur: number): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl)
      .pipe(map(res => res.filter(res => res.organisateur?.id === idUtilisateur)));
  }

  getFilteredbyVilleDepart(nomVille: string): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl)
      .pipe(map(res => res.filter(res => res.adresseDepart === nomVille)));
  }

  createArrayFrom(newArray: Covoiturage[], oldArray: Covoiturage[]): void {
    newArray = JSON.parse(JSON.stringify(oldArray));

  }

  recupListCovoiturageFromServer(): Array<Covoiturage> {
    /* console.log("récupération de la liste");
    let listeToReturn: Array<Covoiturage> = [];
    this.getAllCovoiturages();
    this.getAllCovoiturages().subscribe(
      response=>response.forEach(val=>listeToReturn.push(Object.assign({},val))))
      return listeToReturn; */
    console.log("récupération de la liste");
    let listeToReturn: Array<Covoiturage> = [];
    this.getAllCovoiturages().subscribe(
      response => response.forEach(val => {
        // listeToReturn.push(Object.assign({},JSON.parse(JSON.stringify(val))))
        listeToReturn.push(Object.assign({}, val))
      }));


    return listeToReturn;



  }

  /**
   * Récupère la liste des covoiturages enregistrés sur
   * le serveur.
   * @Author Atsuhiko Mochizuki
   * @returns Une promesse comportant la liste
   */
  recupListeCovoituragesOnServer():Promise<Covoiturage[]>{
    return new Promise<Covoiturage[]>(resolve => {
      let listeComplete: Array<Covoiturage> = [];
      this.getAllCovoiturages()
        .subscribe((tableau)=>{
          listeComplete = tableau;
          resolve(listeComplete);
        })
    })
  }













  public create(createdCovoiturage: Covoiturage): Observable<Covoiturage> {
    return this._http.post<Covoiturage>(
      this._baseCovoitUrl,
      createdCovoiturage
    );
  }

  public update(updatedCovoitOrg: Covoiturage) {
    return this._http.put<Covoiturage>(
      `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
      updatedCovoitOrg
    );
  }

  public delete(deletedCovoitOrg: Covoiturage) {
    return this._http.delete<Covoiturage>(
      `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`
    );
  }
}




