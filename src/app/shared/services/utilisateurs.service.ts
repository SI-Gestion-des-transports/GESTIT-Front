import { Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Utilisateur } from "../models/utilisateur";
import { environment } from "../../../environments/environment.development";
import { AuthentificationService } from "./authentification.service";
import {HttpHeaderService} from "./http-header.service";


@Injectable({
  providedIn: 'root'
})
export class UtilisateursService implements OnInit, OnChanges {

  headers = new HttpHeaders();

  /*
  Création d'un BehaviorSubject de type Utilisateur.
  Behavior s'attend à ce que nous lui fournissons une valeur initiale,
  ce que nous faisons en lui assignant un objet vide.
  Le BehaviorSubject emettra toujours la dernière valeur de utilisateur.
  Nous aurions pu utiliser Subject ici, mais l'avantage de BehaviorSubject est que
  les abonnés tardifs recevront toujours le dernier utilisateur immédiatement après l'abonnement.
  Nous n'avons pas besoin d'appeler la méthode next().
  De plus, il est conseillé de ne pas exposer le BehaviorSubject en dehors du service.
  C'est pourquoi nous le convertissons en Observable normal et le retournons.
  En effet, les méthodes telles que next, complete ou error n'existent pas dans un
  observable normal. Cela garantit que l'utilisateur final ne les appellera pas
  accidentellement et qu'il ne s'y trompera pas.
  Pourquoi faisons-cela?
    Créer un behaviorSubject, c'est créer un observable chaud, cad qui va emettre en continu une valeur,
    du type dont nous l'avons assigné, et de la valeur denière valeur que nous lu avons fourni.
    CurrentUserSource va donc, à ce stade, emettre un tableau vide en continu.
    Tous les composants qui y seront abonné pourront accéder à cette valeur en continu, avec par
    exemple le pipe async dans leur template html.
    A chaque fois que currentUser est modifié, ses abonnés en seront donc automatiquement informés,
    et pourront mettre, par exemple, leur affichage à jour
  */

  private _sharedCurrentUser: Utilisateur = {}
  private _sharedCurrentUserId: number;

  private currentUserSource = new BehaviorSubject<Utilisateur>({});
  private currentUserIdSource = new BehaviorSubject<number>(undefined);
  private currentUserNameSource = new BehaviorSubject<string>(undefined);
  private fakeCurrentUserSource = new BehaviorSubject<Utilisateur>({});

  fakeCurrentUser$ = this.fakeCurrentUserSource.asObservable();
  currentUser$ = this.currentUserSource.asObservable();
  currentIdUser$ = this.currentUserIdSource.asObservable();
  //currentNameUser$ = this.currentUserNameSource.asObservable();
  currentUserNameSource$ = this.currentUserNameSource.asObservable();

  private _baseUrl = environment.urlApi.users;
  private _realBaseUrl = environment.urlApi.utilisateur;

  private _subscription = new Subscription();

  constructor(private _http: HttpClient,
              private _authService: AuthentificationService,
              private _httpHeaderService: HttpHeaderService) {
  }

  ngOnInit() {
/*    this._subscription
      .add(this._authService.headers$
        .subscribe(data => {
          this.headers = data
        })
      );*/
    this.headers = this._httpHeaderService.getHeaders();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentIdUser$) {
    }
  }

  findAll(): Observable<Utilisateur[]> {
    return this._http.get<Utilisateur[]>(`${this._baseUrl}`);
  }

  findById(userId: number): Observable<Utilisateur> {
    return this._http.get<Utilisateur>(`${this._realBaseUrl}/${userId}`, { headers: this.headers });
  }

  findbyId2(userId: number): Utilisateur {
    let user: Utilisateur = {};
    this._http.get<Utilisateur>(`${this._realBaseUrl}/${userId}`, { headers: this.headers }).subscribe(u => user = u);
    return user;
  }

  create(createdUser: Utilisateur): Observable<Utilisateur> {
    return this._http.post<Utilisateur>(this._baseUrl, createdUser);
  }

  update(updatedUser: Utilisateur): Observable<Utilisateur> {
    return this._http.put<Utilisateur>(`${this._baseUrl}/${updatedUser.id}`, updatedUser);
  }

  delete(deletedUser: Utilisateur): Observable<Utilisateur> {
    return this._http.delete<Utilisateur>(`${this._baseUrl}/${deletedUser.id}`);
  }

  updateCurrentUser(): void {
    this.currentIdUser$.subscribe(userId => {
      //console.log("UserSrv — updateCurrentUser / CurrentUserId : " + userId);
      this.findById(userId).subscribe(user => {
        //console.log("UserSrv — updateCurrentUser / currentUser.nom : " + user.nom);
        this.currentUserSource.next(user);
        this.currentUserNameSource.next(user.nom);
      });
    })
  }

/*
  updateCurrentUserDevTest(user: Utilisateur): void {
    this.currentUserSource.next(user);

    /!*petite incrustation de Mochizuki
    Pour chaque mise à jour de l'utilisateur courant, le subject informe ses abonnés
    de la mise à jour du nom d'utilisateur. Mochizuki l'utilise ici pour afficher le
    nom de l'utilisateur courant et connecté, dans la navBar*!/
    this.currentUserNameSource.next(user.nom);
  }
  */

  updateCurrentUserId(userId: number): void {
    //console.log("UserSrv — updateCurrentUserId / CurrentUserId : " + userId);
    this.currentUserIdSource.next(userId);
    //console.log("UserSrv — updateCurrentUserId / CurrentUserId : " + userId);
    this.updateCurrentUser();
  }

  updateCurrentUserName(userName: string){
    this.currentUserNameSource.next(userName);
  }

  updateFakeCurrentUser(user: Utilisateur){
    this.fakeCurrentUserSource.next(user);
  }


  get getSharedCurrentUser(): Utilisateur {
    return this._sharedCurrentUser;
  }

  setSharedCurrentUser(value: Utilisateur) {
    this._sharedCurrentUser = value;
  }

  getSharedCurrentUserId(): number {
    return this._sharedCurrentUserId;
  }

  setSharedCurrentUserId(value: number) {
    this._sharedCurrentUserId = value;
  }
}
