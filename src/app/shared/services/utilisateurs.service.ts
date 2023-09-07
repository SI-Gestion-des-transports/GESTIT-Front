import {Injectable, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {environment} from "../../../environments/environment.development";
import {AuthentificationService} from "./authentification.service";


@Injectable({
  providedIn: 'root'
})
export class UtilisateursService implements OnInit, OnChanges{

  headers = new HttpHeaders();


  private currentUserSource = new BehaviorSubject<Utilisateur>({});
  private currentUserIdSource = new BehaviorSubject<number>(undefined);
  currentUser$ = this.currentUserSource.asObservable();
  currentIdUser$ = this.currentUserIdSource.asObservable();

  private _baseUrl = environment.urlApi.users;
  private _realBaseUrl = environment.urlApi.utilisateur;


  private _subscription = new Subscription();

  constructor(private _http: HttpClient,
              private _authService: AuthentificationService){
  }

  ngOnInit() {
    this._subscription
      .add(this._authService.headers$
        .subscribe(data => {
          this.headers = data
        })
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.currentIdUser$){

    }
  }

  findAll(): Observable<Utilisateur[]>{
    return this._http.get<Utilisateur[]>(`${this._baseUrl}`);
  }

  findById(userId: number): Observable<Utilisateur>{
    return this._http.get<Utilisateur>(`${this._realBaseUrl}/${userId}`, {headers: this.headers});
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

  updateCurrentUser(): void {
    this.currentIdUser$.subscribe(userId => {
      console.log("UserSrv — updateCurrentUser / CurrentUserId : " + userId);
      this.findById(userId).subscribe(user =>{
        console.log("UserSrv — updateCurrentUser / currentUser.nom : " + user.nom);
        this.currentUserSource.next(user);
      });
    })
  }

  updateCurrentUserDevTest(user: Utilisateur): void {
    this.currentUserSource.next(user);
  }

  updateCurrentUserId(userId: number): void {
    console.log("UserSrv — updateCurrentUserId / CurrentUserId : " + userId);
    this.currentUserIdSource.next(userId);
    this.updateCurrentUser();
  }

}
