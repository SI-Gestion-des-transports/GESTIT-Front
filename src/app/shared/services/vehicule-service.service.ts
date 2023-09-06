import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {VehiculeService} from "../models/vehicule.service";

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {
private _baseUrl:string = environment.urlApi.vehiculeService;

  constructor(private _http:HttpClient) { }

  findAll(){
    return this._http.get<VehiculeService[]>(`${this._baseUrl}/listall`);
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
}
