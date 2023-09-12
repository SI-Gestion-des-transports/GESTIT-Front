import {Component, OnInit} from '@angular/core';
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {NgForm, NgModel} from "@angular/forms";
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {ModeleService} from "../../../shared/services/modele.service";
import {CategorieService} from "../../../shared/services/categorie.service";
import {MotorisationService} from "../../../shared/services/motorisation.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-vehicule-service-add',
  templateUrl: './vehicule-service-add.component.html',
  styleUrls: ['./vehicule-service-add.component.css']
})
export class VehiculeServiceAddComponent implements OnInit{

  newVehiculeService : VehiculeService={};
  listMarque:string[]=[];
  listModele:string[]=[];
  listCategorie:string[]=[];
  listMotorisation:string[]=[];
  constructor(private _marqueService:MarqueServiceService,
              private _modeleService:ModeleService,
              private _categorieService:CategorieService,
              private _motorisationService:MotorisationService,
              private _vehiculeService:VehiculeServiceService,
              private router:Router) {
  }
  ngOnInit(): void {
    this._marqueService.findAll().subscribe(res=>{
      this.listMarque = res;
    });
  this._categorieService.findAll().subscribe(res=>{
    this.listCategorie = res;
  });
  this._motorisationService.findAll().subscribe(res=>{
    this.listMotorisation=res;
  });

  }



  add(f:NgForm){
    this.newVehiculeService.immatriculation=f.value.immatriculation;
    this.newVehiculeService.modele=f.value.modele;
    this.newVehiculeService.nombreDePlaceDisponibles=f.value.place;
    this.newVehiculeService.emissionCO2=f.value.co2;
    this.newVehiculeService.categorie=f.value.cate;
    this.newVehiculeService.motorisation=f.value.motorisation;
    this.newVehiculeService.photoURL= f.value.url;
    this.newVehiculeService.statut="EN_SERVICE";
    this._vehiculeService.createVehiculeService(this.newVehiculeService).subscribe(res=>{
      if (res.status==200) this.router.navigateByUrl('/vehiculeService/list');
    });
  }
  cancel(){
    this.router.navigateByUrl('/vehiculeService/list');
  }
  marqueSelectChange(marque:NgModel){
    this._modeleService.getModelByMarque(marque.value).subscribe(res=>{
      this.listModele=res;
    });
  }
}
