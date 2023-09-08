import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../models/login";


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

  logout(): Observable<any>{
    return this._http.post(this._baseUrlLogout, {headers: this.headers});
  }
  updateHeaders(data: Object){
    Object.keys(data).forEach(key => {
      console.log("Auth Service — Header set : name:", key, "Values:", data[key]);
      this.headers = this.headers.set(key, data[key]);
    });
    console.log("Auth Service — Header (this.headers) : ", this.headers);
    console.log("Auth Service — Header (this.headers) : ", this.headersToJSON(this.headers));
    this.headersSource.next(this.headersToJSON(this.headers));
    console.log("Auth Service — Header (this.headersSource) : ", this.headersSource.getValue())
  }

  updateLoggedBtn(data){
    this.loggedBtnSource.next(data);
  }

  headersToJSON(headers: HttpHeaders): any {
    let result = {};
    headers.keys().forEach(key => {
      result[key] = headers.get(key);
    });
    return result;
  }

}
