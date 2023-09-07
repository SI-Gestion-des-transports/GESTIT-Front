import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {environment} from "../../../environments/environment.development";
import {AuthentificationService} from "./authentification.service";


@Injectable({
  providedIn: 'root'
})
export class UtilisateursService implements OnInit{

  private currentUserSource = new BehaviorSubject<Utilisateur>({});
  currentUser$ = this.currentUserSource.asObservable();

  private _baseUrl = environment.urlApi.users;

  constructor(private _http: HttpClient,
              private _authService: AuthentificationService){
  }

  ngOnInit() {

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
    return this._http.delete<Utilisateur>(`${this._baseUrl}/${deletedUser.id}`);
  }

  updateCurrentUser(data: Utilisateur): void {
    this.currentUserSource.next(data);
  }

}
