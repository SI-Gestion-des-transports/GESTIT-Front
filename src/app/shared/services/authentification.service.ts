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

  headers = new HttpHeaders();
  constructor(private _http: HttpClient) {
  }


  login(tryLog: Login): Observable<any>{
    return this._http.post(this._baseUrl, tryLog);
  }

  updateHeaders(data: Object){
    Object.keys(data).forEach(key => {
      console.log("Header name:", key, "Values:", data[key]);
      this.headers = this.headers.set(key, data[key]);
    });
    this.headersSource.next(this.headers);
  }
}
