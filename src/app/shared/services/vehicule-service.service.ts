import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {VehiculeService} from "../models/vehicule.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService implements OnInit {
private _baseUrl:string = environment.urlApi.vehiculeService;

  private vehiculesSrvSource = new BehaviorSubject<VehiculeService[]>([{}]);
  vehiculesSrv$ = this.vehiculesSrvSource.asObservable();


  ngOnInit() {
    this.findAllEnService().subscribe(data => {
      this.updateVehiculesSrv(data);
    })
  }

  constructor(private _http:HttpClient) { }

  findAll(){
    return this._http.get<VehiculeService[]>(`${this._baseUrl}/listall`);
  }

  findAllEnService(){
    return this._http.get<VehiculeService[]>(`${this._baseUrl}/list`);
  }

  createVehiculeService(vs:VehiculeService){

    return this._http.post<any>(`${this._baseUrl}/create`,vs,{observe:'response'});
  }

  deleteVehiculeService(id:number){
    return this._http.delete(`${this._baseUrl}/delete?id=${id}`,{observe:"response"});
  }
  findVsById(id:string){
    return this._http.get<VehiculeService>(`${this._baseUrl}/getbyid?id=${id}`);
  }
  modifyVehiculeService(vs:VehiculeService){
    return this._http.put<any>(`${this._baseUrl}/modify`,vs,{observe:"response"});
  }

  updateVehiculesSrv(data: VehiculeService[]){
    this.vehiculesSrvSource.next(data);
  }


}
