import { Component } from '@angular/core';
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {ModeleService} from "../../../shared/services/modele.service";
import {CategorieService} from "../../../shared/services/categorie.service";
import {MotorisationService} from "../../../shared/services/motorisation.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StatutvsService} from "../../../shared/services/statutvs.service";
import {NgForm, NgModel} from "@angular/forms";
import {VehiculePersoService} from "../../../shared/services/vehicule.perso.service";

@Component({
  selector: 'app-vehicule-perso-modify',
  templateUrl: './vehicule-perso-modify.component.html',
  styleUrls: ['./vehicule-perso-modify.component.css']
})
export class VehiculePersoModifyComponent {
  selectedVp: VehiculeService = {};
  listMarque: string[] = [];
  listModele: string[] = [];
  listCategorie: string[] = [];
  listMotorisation: string[] = [];
  listStatusVs :string []= [];

  constructor(private _marqueService: MarqueServiceService,
              private _modeleService: ModeleService,

              private _vehiculePerso: VehiculePersoService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      this._vehiculePerso.findVpById(param.get("id") as string).subscribe(res => {
        this.selectedVp = res;
      });
      this._marqueService.findAll().subscribe(res => {
        this.listMarque = res;
      });

    });

  }
  modify(f:NgForm){
    this.selectedVp.immatriculation=f.value.immatriculation!=""?f.value.immatriculation:this.selectedVp.immatriculation;
    this.selectedVp.modele=f.value.modele!=""?f.value.modele:this.selectedVp.modele;
    this.selectedVp.nombreDePlaceDisponibles=f.value.place!=""?f.value.place:this.selectedVp.nombreDePlaceDisponibles;


      this._vehiculePerso.modifyVp(this.selectedVp).subscribe(res=>{
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
