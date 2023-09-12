import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReservationVs } from "../models/reservation.vs";
import { BehaviorSubject, catchError, Observable, Subscription } from "rxjs";
import { Utilisateur } from "../models/utilisateur";
import { VehiculeService } from "../models/vehicule.service";
import { VehiculePerso } from "../models/vehicule.perso";
import { HttpHeaderService } from "./http-header.service";
import { AuthentificationService } from "./authentification.service";


@Injectable({
    providedIn: 'root'
})
export class VehiculePersoService {

    private currentUserSource = new BehaviorSubject<Utilisateur>({});
    private currentVPSource = new BehaviorSubject<VehiculePerso>({});

    /*incrustation mochizuki*/
    headers = new HttpHeaders();
    private subscription = new Subscription();
    /*fin incrustation*/

    private _baseUrl = environment.urlApi.vehiculeperso;
    constructor(private _http: HttpClient,
                private _httpHeader: HttpHeaderService,
                private _authService: AuthentificationService
    ) {
    }

    /*incrustation Mochizuki*/
    ngOnInit(): void {
       
        this.subscription.add(this._authService.headers$.subscribe((data)=>{
          this.headers = data;
        }))
    }
    /*fin incrustation*/

    findAllVP() {
        return this._http.get<VehiculePerso[]>(`${this._baseUrl}/list`, { headers: this._httpHeader.getHeaders() });
    }
    deleteVP(id: number) {
        return this._http.delete<VehiculePerso[]>(`${this._baseUrl}/delete?id=${id}`, { headers: this._httpHeader.getHeaders() });
    }
    createVp(vp: VehiculePerso) {
        return this._http.post<VehiculePerso[]>(`${this._baseUrl}/create`, vp, { headers: this._httpHeader.getHeaders() });
    }

    findVpById(id: string) {
        return this._http.get<VehiculePerso>(`${this._baseUrl}/findById?id=${id}`, { headers: this._httpHeader.getHeaders() });
    }

    /*incrustation Mochizuki*/
    findVpById_Mochizuki(id: string) {
        return this._http.get<VehiculePerso>(`${this._baseUrl}/findById?id=${id}`, {headers:this.headers});
    }
    /*fin incrustation*/
    
    modifyVp(vp: VehiculePerso) {
        return this._http.put(`${this._baseUrl}/modify`, vp, { headers: this._httpHeader.getHeaders() });
    }
}
