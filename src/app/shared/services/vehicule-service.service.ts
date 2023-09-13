import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {VehiculeService} from "../models/vehicule.service";
import {BehaviorSubject} from "rxjs";
import {HttpHeaderService} from "./http-header.service";

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

  constructor(private _http:HttpClient,
              private _httpHeader:HttpHeaderService) { }

  findAll(){
    return this._http.get<VehiculeService[]>(`${this._baseUrl}/listall`,{headers:this._httpHeader.getHeaders()});
  }

  findAllEnService(){
    return this._http.get<VehiculeService[]>(`${this._baseUrl}/list`,{headers:this._httpHeader.getHeaders()});
  }

  createVehiculeService(vs:VehiculeService){

    return this._http.post<any>(`${this._baseUrl}/create`,vs,{headers:this._httpHeader.getHeaders(),observe:'response'});
  }

  deleteVehiculeService(id:number){
    return this._http.delete(`${this._baseUrl}/delete?id=${id}`,{headers:this._httpHeader.getHeaders(),observe:"response"});
  }
  findVsById(id:string){
    return this._http.get<VehiculeService>(`${this._baseUrl}/getbyid?id=${id}`,{headers:this._httpHeader.getHeaders()});
  }
  modifyVehiculeService(vs:VehiculeService){
    return this._http.put<any>(`${this._baseUrl}/modify`,vs,{headers:this._httpHeader.getHeaders(),observe:"response"});
  }

  updateVehiculesSrv(data: VehiculeService[]){
    this.vehiculesSrvSource.next(data);
  }


}
