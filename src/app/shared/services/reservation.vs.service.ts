import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ReservationVs} from "../models/reservation.vs";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {VehiculeService} from "../models/vehicule.service";


@Injectable({
  providedIn: 'root'
})
export class ReservationVsService {

  private _reservationVs: ReservationVs = {};

  private _allReservationsVs: ReservationVs [] = [];

  private _reservationsVsByUser: ReservationVs [] = [];

  private _currentUser: Utilisateur = {};

  //currentVs: VehiculeService = {};

  private _currentReservationVs: ReservationVs = {};


  private _baseUrl = environment.urlApi.reservationsvs;

  constructor(private _http: HttpClient) {
  }


  findAll(): Observable<ReservationVs[]> {
    this._http
      .get<ReservationVs[]>(this._baseUrl)
      .subscribe(reservationsVs => {
      this._allReservationsVs = reservationsVs
    });
    return this._http.get<ReservationVs[]>(this._baseUrl);
  }

  findById(id: number): Observable<ReservationVs[]> {
    return this._http.get<ReservationVs[]>(`${this._baseUrl}/${id}`);
  }

  findByVsId(vsId: number): Observable<ReservationVs> {
    return this._http.get<ReservationVs>(`${this._baseUrl}/?vehiculeServiceId=${vsId}`);
  }

  findByUserId(userId: number): Observable<ReservationVs[]>{
    return this._http.get<ReservationVs[]>(`${this._baseUrl}/?userId=${userId}`)
  }

  create(resVSCreated: ReservationVs): Observable<ReservationVs> {
    this._http.post<ReservationVs>(this._baseUrl, resVSCreated).subscribe(() =>
    this.findAll())
    return this._http.post<ReservationVs>(this._baseUrl, resVSCreated);
  }

  update(resVSUpdated: ReservationVs): Observable<ReservationVs> {
    return this._http.put<ReservationVs>(`${this._baseUrl}/${resVSUpdated.resId}`, resVSUpdated);
  }

  delete(resVSDeleted: ReservationVs): Observable<ReservationVs> {
    return this._http.delete<ReservationVs>(`${this._baseUrl}/${resVSDeleted.resId}`);
  }


  get reservationVs(): ReservationVs {
    return this._reservationVs;
  }

  set reservationVs(value: ReservationVs) {
    this._reservationVs = value;
  }

  get allReservationsVs(): ReservationVs[] {
    return this._allReservationsVs;
  }

  set allReservationsVs(value: ReservationVs[]) {
    this._allReservationsVs = value;
  }

  get reservationsVsByUser(): ReservationVs[] {
    return this._reservationsVsByUser;
  }

  set reservationsVsByUser(value: ReservationVs[]) {
    this._reservationsVsByUser = value;
  }

  get currentUser(): Utilisateur {
    return this._currentUser;
  }

  set currentUser(value: Utilisateur) {
    this._currentUser = value;
  }

  get currentReservationVs(): ReservationVs {
    return this._currentReservationVs;
  }

  set currentReservationVs(value: ReservationVs) {
    this._currentReservationVs = value;
  }
}
