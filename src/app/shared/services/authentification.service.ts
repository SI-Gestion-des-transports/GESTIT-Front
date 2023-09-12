import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../models/login";
import {UtilisateursService} from "./utilisateurs.service";
import {ReservationVsService} from "./reservation.vs.service";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _baseUrlLogin = environment.urlApi.login;
  private _baseUrlLogout = environment.urlApi.logout;

  private headersSource = new BehaviorSubject<HttpHeaders>(new HttpHeaders());
  private loggedBtnSource = new BehaviorSubject<boolean>(false);

  headers$ = this.headersSource.asObservable();
  loggedBtn$ = this.loggedBtnSource.asObservable();

  headers = new HttpHeaders();
  constructor(private _http: HttpClient) {
  }


  login(tryLog: Login): Observable<any>{
    return this._http.post(this._baseUrlLogin, tryLog);
  }

  logout() {
    window.localStorage.removeItem(`JWT-TOKEN`);
    //console.log("Auth Service — logout");
    this._http.post(this._baseUrlLogout, {},{headers: this.headers});
    this.headers =  this.headers.delete(`JWT-TOKEN`);
    //console.log("Auth Service — Header (this.headers) : ", this.headers);
    //console.log("Auth Service — updateHeaders");
    this.updateHeaders(this.headers);
  }

  checkToken(headers : HttpHeaders){
    //console.log("Auth Service — checkToken");
    if(window.localStorage.getItem("JWT-TOKEN") != null) {
      this.updateHeaders(this.headers);
    }
  }

  updateHeaders(data: Object){
    //console.log("Auth Service — data : ", data);
    this.headers = new HttpHeaders({});
    Object.keys(data).forEach(key => {
      if(data[key] !== null && data[key] !== undefined) {  // Vérification ajoutée ici
        //console.log("Auth Service — Header set : name:", key, "Values:", data[key]);
        this.headers = this.headers.set(key, data[key]);
      }
    });
    //console.log("Auth Service — Header (this.headers) : ", this.headers);
    this.headersSource.next(this.headersToJSON(this.headers));
    //console.log("Auth Service — Header (this.headersSource) : ", this.headersSource.getValue())
/*    if(window.localStorage.getItem("JWT-TOKEN") != null){
      let token = window.localStorage.getItem("JWT-TOKEN");
      console.log("Auth Service — token : ", token)*/
/*      console.log("Auth Service — Header (this.headers JSON) : ", this.headersToJSON(this.headers));
      this.headersSource.next(this.headersToJSON(this.headers));
      */
/*    }*/
  }

  updateLoggedBtn(data){
    this.loggedBtnSource.next(data);
    //console.log("Auth Service — updateLoggedBtn : ", data);
  }

  headersToJSON(headers: HttpHeaders): any {
    //console.log("Auth Service — headersToJSON");
      let result = {};
      if(headers) {
        headers.keys().forEach(key => {
          result[key] = headers.get(key);
        });
        return result;
      }
  }
}
