import { Component } from '@angular/core';
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {ModeleService} from "../../../shared/services/modele.service";
import {CategorieService} from "../../../shared/services/categorie.service";
import {MotorisationService} from "../../../shared/services/motorisation.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {Router} from "@angular/router";
import {NgForm, NgModel} from "@angular/forms";
import {VehiculePerso} from "../../../shared/models/vehicule.perso";
import {VehiculePersoService} from "../../../shared/services/vehicule.perso.service";

@Component({
  selector: 'app-vehicule-perso-add',
  templateUrl: './vehicule-perso-add.component.html',
  styleUrls: ['./vehicule-perso-add.component.css']
})
export class VehiculePersoAddComponent {
  newVehiculePerso : VehiculePerso={};
  listMarque:string[]=[];
  listModele:string[]=[];

  constructor(private _marqueService:MarqueServiceService,
              private _modeleService:ModeleService,
              private _vehiculePerso:VehiculePersoService,
              private router:Router) {
  }
  ngOnInit(): void {
    if(!window.localStorage.getItem("JWT-TOKEN")) {
      this.router.navigateByUrl('login');
    }
    this._marqueService.findAll().subscribe(res=>{
      this.listMarque = res;
    });
  }



  add(f:NgForm){
    this.newVehiculePerso.immatriculation=f.value.immatriculation;
    this.newVehiculePerso.modele=f.value.modele;
    this.newVehiculePerso.nombreDePlaceDisponibles=f.value.place;
    this._vehiculePerso.createVp(this.newVehiculePerso).subscribe(res=>{
      this.router.navigateByUrl('/vehiculeperso/list');
    });
  }
  cancel(){
    this.router.navigateByUrl('/vehiculeperso/list');
  }
  marqueSelectChange(marque:NgModel){
    this._modeleService.getModelByMarque(marque.value).subscribe(res=>{
      this.listModele=res;
    });
  }
}
