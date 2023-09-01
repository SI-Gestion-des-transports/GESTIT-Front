import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private _baseUrl = environment.urlApi.users;

  constructor(private _http: HttpClient){
  }

  findAll(): Observable<Utilisateur[]>{
    return this._http.get<Utilisateur[]>(`${this._baseUrl}`);
  }

  findById(user: Utilisateur): Observable<Utilisateur>{
    return this._http.get<Utilisateur>(`${this._baseUrl}/${user.id}`);
  }

  create(createdUser:Utilisateur): Observable<Utilisateur>{
    return this._http.post<Utilisateur>(this._baseUrl, createdUser);
  }

  update(updatedUser:Utilisateur): Observable<Utilisateur>{
    return this._http.put<Utilisateur>(`${this._baseUrl}/${updatedUser.id}`, updatedUser);
  }

  delete(deletedUser:Utilisateur): Observable<Utilisateur>{
    console.log("Entrée delete SERVICE" + deletedUser.id);
    return this._http.delete<Utilisateur>(`${this._baseUrl}/${deletedUser.id}`);
  }

}
