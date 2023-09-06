import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ReservationVs} from "../models/reservation.vs";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {VehiculeService} from "../models/vehicule.service";
import {VehiculePerso} from "../models/vehicule.perso";


@Injectable({
  providedIn: 'root'
})
export class VehiculePersoService {

  private currentUserSource = new BehaviorSubject<Utilisateur> ({});
  private currentVPSource= new BehaviorSubject<VehiculePerso>({});




  private _baseUrl = environment.urlApi.vehiculeperso;
  constructor(private _http: HttpClient) {
  }

}
