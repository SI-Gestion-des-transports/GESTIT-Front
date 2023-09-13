import { Injectable, OnInit } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { Adresse } from '../models/adresse';
import { AdressesService } from './adresses.service';
import { VehiculePerso } from "../models/vehicule.perso";
import { AuthentificationService } from './authentification.service';
import { HttpHeaderService } from './http-header.service';
import { UtilisateursService } from './utilisateurs.service';
import {CovoiturageCreate} from "../models/covoiturageCreate";


@Injectable({providedIn: 'root',})
export class CovoiturageService implements OnInit {
  user!: Utilisateur;
  headers = new HttpHeaders();

  currentUserId : number;


  private _baseCovoitUrl = environment.urlApi.covoiturages;
  private _realBaseUrl = environment.urlApi.covoituragesReserves;

  private _listOfAllCovoiturages$!: Observable<Covoiturage[]>;

  private adresseDepartSource = new BehaviorSubject<Adresse>({});
  private adresseArriveeSource = new BehaviorSubject<Adresse>({});
  private currentCovoitOrgSource = new BehaviorSubject<Covoiturage>({});
  private covoitOrgSource = new BehaviorSubject<Covoiturage>({});
  private covoitByOrganisateurSource = new BehaviorSubject<Covoiturage[]>([]);
  private currentUserSource = new BehaviorSubject({});
  private vehiculesPersoCurrentUserSource = new BehaviorSubject<VehiculePerso[]>([]);
  private modifBtnSource = new BehaviorSubject<boolean>(true);

  covoiturage$ = this.covoitOrgSource.asObservable() ;
  adresseDepart$ = this.adresseDepartSource.asObservable();
  adresseArrivee$ = this.adresseArriveeSource.asObservable();
  currentCovoiturage$ = this.currentCovoitOrgSource.asObservable();
  currentUser$ = this.currentUserSource.asObservable();
  covoitByOrganisateur$ = this.covoitByOrganisateurSource.asObservable();
  vehiculesPersoCurrentUser$ = this.vehiculesPersoCurrentUserSource.asObservable();


  private _subscription = new Subscription();

  /*  covoit:Covoiturage = {
    adresseDepart: {},
    adresseArrivee: {},
  };
  adresseDepart = this.adresseDepartSource.value;
  adresseArrivee = this.adresseArriveeSource.value;*/

  ngOnInit(): void {

    //console.log("covoit onInit")
    /*
    this._listOfAllCovoiturages$.subscribe(value => console.log(value));
    */
    /*
    this._subscription.add(this._authService.headers$.subscribe(data => {
      console.log("data :", data)
      this.headers = data;
      console.log("this.headers :", this.headers);
    }));
    */
    this.currentUserId = this._utilisateurService.getSharedCurrentUserId();
    //console.log("Cov Srv — ngOnInit / getSharedCurrentUserId() : " + this._utilisateurService.getSharedCurrentUserId());
    this.headers = this._httpHeaderService.getHeaders();
    //this.updateCovoitOrg(this.covoit);
  }

  ngOnDestroy(){
    //console.log("destroyed")
    this._subscription.unsubscribe();
  }

  constructor(
    private _http: HttpClient,
    private _adresseService: AdressesService,
    private _authService: AuthentificationService,
    private _httpHeaderService: HttpHeaderService,
    private _utilisateurService: UtilisateursService
  ) {}


  public getAllCovoiturages(): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(`${this._baseCovoitUrl}/listall`, {headers: this._httpHeaderService.getHeaders()});
  }

  public getCovoituragesByOrganisateur(
    organisateur: Utilisateur
  ): Observable<Covoiturage[]> {
    this.user = organisateur;
    return this._http.get<Covoiturage[]>(
      this._baseCovoitUrl + '?organisateurId=' + this.user.id,{headers: this._httpHeaderService.getHeaders()}
    );
  }

  getCovoiturageById(covoiturageId: number): Observable<Covoiturage> {
    return this._http.get<Covoiturage>(
      `${this._baseCovoitUrl}/${covoiturageId}`, {headers: this._httpHeaderService.getHeaders()}
    );
  }

  findUpcomingCovoituragesByUserId(userId?: number): Observable<Covoiturage[]>{
    this.ngOnInit();
    //console.log(this.headers);
    return this._http.get<Covoiturage[]>(`${this._baseCovoitUrl}/upcoming`, {headers: this._httpHeaderService.getHeaders()})
  }
  // getFilteredbyUsersCovoit(idUtilisateur: number): Observable<Covoiturage[]> {
  //   return this._http.get<Covoiturage[]>(this._baseCovoitUrl)
  //     .pipe(map(res => res.filter(res => res.organisateur?.id === idUtilisateur)));

  // }

  findPastCovoituragesByUserId(userId?: number): Observable<Covoiturage[]>{
    this.ngOnInit();
    //console.log(this.headers);
    return this._http.get<Covoiturage[]>(`${this._baseCovoitUrl}/past`, {headers: this._httpHeaderService.getHeaders()})
  }

  updateCovoiturageOrganise(covoiturage: Covoiturage){
    return this._http.put<Covoiturage>(`${this._baseCovoitUrl}/co${covoiturage.id}`,{covoiturage}, {headers: this._httpHeaderService.getHeaders()})
  }

  updateCovoituragePassager(covoiturage: Covoiturage){
    //console.log("Covoiturage Service — updateCovoituragePassager");
    return this._http.put<Covoiturage>(`${this._baseCovoitUrl}/cp${covoiturage.id}`,{covoiturage}, {headers: this._httpHeaderService.getHeaders()})
  }


  getFilteredbyUsersCovoit(idUtilisateur: number): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl)
      .pipe(map(res => res.filter(res => res.organisateurId === idUtilisateur)));
  }

  createArrayFrom(newArray: Covoiturage[], oldArray: Covoiturage[]): void {
    newArray = JSON.parse(JSON.stringify(oldArray));

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













  public create(createdCovoiturage: CovoiturageCreate): Observable<CovoiturageCreate> {
    //console.log('Cov Srv — Create / covoit : ', createdCovoiturage);
/*    console.log("createdCovoiturage.adresseDepart",createdCovoiturage.adresseDepart);
    console.log("createdCovoiturage.adresseArrivee",createdCovoiturage.adresseArrivee);
    const covoiturageCreated: Covoiturage = createdCovoiturage;
    if (createdCovoiturage.adresseDepart && createdCovoiturage.adresseArrivee) {
      this._adresseService
        .create(createdCovoiturage.adresseDepart)
        .subscribe((adresse) => {
          console.log("adresseDepart", adresse);
          covoiturageCreated.adresseDepart = adresse;
          console.log("covoiturageCreated.adresseDepart : ", covoiturageCreated.adresseDepart);
        });
      this._adresseService
        .create(createdCovoiturage.adresseArrivee)
        .subscribe((adresse) => {
          console.log("adresseArrivee", adresse);
          covoiturageCreated.adresseArrivee = adresse;
          console.log("covoiturageCreated.adresseArrivee : ", covoiturageCreated.adresseArrivee);
        });
    createdCovoiturage.organisateurId = parseInt(String(this._utilisateurService.getSharedCurrentUserId()), 10);
    console.log("covoiturageCreated : ", covoiturageCreated)*/
    return this._http.post<CovoiturageCreate>(
      `${this._baseCovoitUrl}/create`, createdCovoiturage, {headers: this._httpHeaderService.getHeaders()}
    );
/*    } else {
      console.log("ERROR ADRESSE")
      return null;
    }*/
    //console.log("Cov Srv — Create / organisateurId : ", createdCovoiturage.organisateurId);
    //console.log("Cov Srv — Create / organisateurId : ", createdCovoiturage.organisateurId);
   // console.log("Cov Srv — Create / createdCovoiturage : ", createdCovoiturage)
  }

  public update(updatedCovoitOrg: Covoiturage) {
    return this._http.put<Covoiturage>(
      `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
      updatedCovoitOrg, {headers: this._httpHeaderService.getHeaders()}
    );
  }

  public delete(deletedCovoitOrg: Covoiturage) {
    //console.log("ADRESSE DELETE : "+`${this._baseCovoitUrl}/${deletedCovoitOrg.id}`)
    return this._http.delete<Covoiturage>(
      `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`, {headers : this._httpHeaderService.getHeaders()}
    );
  }

  updateAdresseDepart(data: Adresse) {
    this.adresseDepartSource.next(data);
  }
  updateAdresseArrivee(data: Adresse) {
    this.adresseArriveeSource.next(data);
  }
  updateCurrentCovoitOrg(data: Covoiturage) {
    this.currentCovoitOrgSource.next(data);
  }

  updateCovoitOrg(data: Covoiturage) {
    this.covoitOrgSource.next(data);
  }

  updateCurrentUser(data: Utilisateur){
    this.currentUserSource.next(data);
  }

  updatevehiculesPersoCurrentUser(data: VehiculePerso[]){
    this.vehiculesPersoCurrentUserSource.next(data);
  }

  updateCovoitByOrganisateur(data : Covoiturage[]){
    this.covoitByOrganisateurSource.next(data);
  }

  updateModifBtn(data: boolean): void {
    this.modifBtnSource.next(data);
  }

}
