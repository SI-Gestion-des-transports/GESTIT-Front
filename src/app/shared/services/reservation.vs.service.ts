import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ReservationVs} from "../models/reservation.vs";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";


@Injectable({
  providedIn: 'root'
})
export class ReservationVsService {

  private _baseUrl = environment.urlApi.reservationsvs;

  constructor(private _http: HttpClient) {
  }

  findAll(): Observable<ReservationVs[]> {
    return this._http.get<ReservationVs[]>(this._baseUrl);
  }


  findByVsId(vsIs: number): Observable<ReservationVs> {
    return this._http.get<ReservationVs>(`${this._baseUrl}/${vsIs}`);
  }


  create(resVSCreated: ReservationVs): Observable<ReservationVs> {
    return this._http.post<ReservationVs>(this._baseUrl, resVSCreated);
  }

  update(resVSUpdated: ReservationVs): Observable<ReservationVs> {
    return this._http.put<ReservationVs>(`${this._baseUrl}/${resVSUpdated.resId}`, resVSUpdated);
  }

  delete(resVSDeleted: ReservationVs): Observable<ReservationVs> {
    return this._http.delete<ReservationVs>(`${this._baseUrl}/${resVSDeleted.resId}`);
  }

}
