import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../models/login";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _baseUrl = environment.urlApi.login;




  private headersSource = new BehaviorSubject<HttpHeaders>(new HttpHeaders());

  headers$ = this.headersSource.asObservable();

  constructor(private _http: HttpClient) {
  }


  login(tryLog: Login): Observable<any>{
    return this._http.post(this._baseUrl, tryLog);
  }

  updateHeaders(data: HttpHeaders){
    data.keys().forEach(k =>
    console.log("FOR EACH K" + data.get(k))
    )
    console.log(data.keys());
    this.headersSource.next(data);
  }
}
