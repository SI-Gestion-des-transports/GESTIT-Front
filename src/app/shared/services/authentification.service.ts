import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Login} from "../models/login";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _baseUrl = environment.urlApi.login;

  constructor(private _http: HttpClient) {
  }


  login(tryLog: Login): Observable<Login>{
    return this._http.post<Login>(this._baseUrl, tryLog);
  }
}
