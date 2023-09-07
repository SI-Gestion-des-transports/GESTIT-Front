import {Injectable, OnInit} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReservationVs} from "../models/reservation.vs";
import {BehaviorSubject, catchError, Observable, Subscription} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {VehiculeService} from "../models/vehicule.service";
import {AuthentificationService} from "./authentification.service";
import {UtilisateursService} from "./utilisateurs.service";


@Injectable({
  providedIn: 'root'
})
export class ReservationVsService implements OnInit {

/*
  private _reservationVs: ReservationVs = {};
  private _allReservationsVs: ReservationVs [] = [];
  private _reservationsVsByUser: ReservationVs [] = [];
  private _currentUser: Utilisateur = {};
  //currentVs: VehiculeService = {};
  private _currentReservationVs: ReservationVs = {};
*/

  headers = new HttpHeaders();
  currentUser: Utilisateur = {};

  private reservationVsSource = new BehaviorSubject<ReservationVs>({});
  private allReservationsVsSource = new BehaviorSubject<ReservationVs[]>([]);
  private upcomingReservationsVsByUserSource = new BehaviorSubject<ReservationVs[]>([]);
  private pastReservationsVsByUserSource = new BehaviorSubject<ReservationVs[]>([]);
  //private currentUserSource = new BehaviorSubject<Utilisateur>({});
  private currentVsSource = new BehaviorSubject<VehiculeService>({});
  private currentReservationVsSource = new BehaviorSubject<ReservationVs>({});
  private editedReservationVsSource
    = new BehaviorSubject<ReservationVs>({});
  private modifBtnSource = new BehaviorSubject<boolean>(true);

  reservationVs$ = this.reservationVsSource.asObservable();
  allReservationsVs$ = this.allReservationsVsSource.asObservable();
  upcomingReservationsVsByUser$ = this.upcomingReservationsVsByUserSource.asObservable();
  pastReservationsVsByUser$ = this.pastReservationsVsByUserSource.asObservable();
  //currentUser$ = this.currentUserSource.asObservable();
  currentVs$ = this.currentVsSource.asObservable();
  currentReservationVs$ = this.currentReservationVsSource.asObservable();
  editedReservationVs$ = this.editedReservationVsSource.asObservable();
  modifBtn$ = this.modifBtnSource.asObservable();


  private _baseUrl = environment.urlApi.reservationsvs;
  private _realBaseUrl = environment.urlApi.reservation;

  private _subscription = new Subscription();
  constructor(private _http: HttpClient,
              private _authService: AuthentificationService,
              private _utilisateurService: UtilisateursService) {
  }

  ngOnInit(): void {
        this._subscription
          .add(this._authService.headers$
            .subscribe(data => {
              this.headers = data
            }));
        this._subscription
          .add(this._utilisateurService.currentUser$
            .subscribe(data => {this.currentUser = data}));
    }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  findAll(): Observable<ReservationVs[]> {
    this._http
      .get<ReservationVs[]>(this._baseUrl);
    return this._http.get<ReservationVs[]>(this._baseUrl);
  }

  findById(id: number): Observable<ReservationVs[]> {
    return this._http.get<ReservationVs[]>(`${this._baseUrl}/${id}`);
  }

  findByVsId(vsId: number): Observable<ReservationVs> {
    return this._http.get<ReservationVs>(`${this._baseUrl}/?vehiculeServiceId=${vsId}`);
  }

  findUpcomingByUserId(userId?: number): Observable<ReservationVs[]>{
    return this._http.get<ReservationVs[]>(`${this._realBaseUrl}/upcoming`, {headers: this.headers})
  }
  findPastByUserId(userId?: number): Observable<ReservationVs[]>{
    console.log(this.headers.keys())
    return this._http.get<ReservationVs[]>(`${this._realBaseUrl}/past`, {headers: this.headers})
  }

  create(resVSCreated: ReservationVs): Observable<ReservationVs> {
    this.updateReservationVs({});
    this.updateCurrentReservationVs({})
    return this._http.post<ReservationVs>(this._baseUrl, resVSCreated);
  }

  update(resVSUpdated: ReservationVs): Observable<ReservationVs> {
    this.updateReservationVs({});
    this.updateCurrentReservationVs({})
    return this._http.put<ReservationVs>(`${this._baseUrl}/${resVSUpdated.id}`, resVSUpdated);
  }

  delete(resVSDeleted: ReservationVs): Observable<ReservationVs> {
    console.log(`${this._baseUrl}/${resVSDeleted.id}`)
    console.log('Deleting reservation with ID:', resVSDeleted.id);
    return this._http.delete<ReservationVs>(`${this._baseUrl}/${resVSDeleted.id}`);
  }



  updateReservationVs(data: ReservationVs): void {
    this.reservationVsSource.next(data);
  }

  updateAllReservationsVs(data: ReservationVs[]): void {
    this.allReservationsVsSource.next(data);
  }

  updateUpcomingReservationsVsByUser(data: ReservationVs[]): void {
    this.upcomingReservationsVsByUserSource.next(data);
  }

  updatePastReservationsVsByUser(data: ReservationVs[]): void {
    this.pastReservationsVsByUserSource.next(data);
  }

/*  updateCurrentUser(data: Utilisateur): void {
    this.currentUserSource.next(data);
  }*/
  updateCurrentVs(data: VehiculeService): void {
    this.currentVsSource.next(data);
  }
  updateCurrentReservationVs(data: ReservationVs): void {
    this.currentReservationVsSource.next(data);
  }
  updateEditedReservationVs(data: ReservationVs): void {
    this.editedReservationVsSource.next(data);
  }

  updateModifBtn(data: boolean): void {
    this.modifBtnSource.next(data);
  }

}
