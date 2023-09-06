import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {ModeleService} from "../../../shared/services/modele.service";
import {CategorieService} from "../../../shared/services/categorie.service";
import {MotorisationService} from "../../../shared/services/motorisation.service";
import {NgForm, NgModel} from "@angular/forms";
import {StatutvsService} from "../../../shared/services/statutvs.service";

@Component({
  selector: 'app-vehicule-service-modify',
  templateUrl: './vehicule-service-modify.component.html',
  styleUrls: ['./vehicule-service-modify.component.css']
})
export class VehiculeServiceModifyComponent implements OnInit {
  selectedVs: VehiculeService = {};
  listMarque: string[] = [];
  listModele: string[] = [];
  listCategorie: string[] = [];
  listMotorisation: string[] = [];
  listStatusVs :string []= [];

  constructor(private _marqueService: MarqueServiceService,
              private _modeleService: ModeleService,
              private _categorieService: CategorieService,
              private _motorisationService: MotorisationService,
              private _vehiculeService: VehiculeServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private _statutVs : StatutvsService
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      this._vehiculeService.findVsById(param.get("id") as string).subscribe(res => {
        this.selectedVs = res;
      });
      this._marqueService.findAll().subscribe(res => {
        this.listMarque = res;
      });
      this._categorieService.findAll().subscribe(res => {
        this.listCategorie = res;
      });
      this._motorisationService.findAll().subscribe(res => {
        this.listMotorisation = res;
      });
      this._statutVs.findAll().subscribe(res=>{
        this.listStatusVs = res;
      })
    });

  }
  modify(f:NgForm){
    this.selectedVs.immatriculation=f.value.immatriculation!=""?f.value.immatriculation:this.selectedVs.immatriculation;
    this.selectedVs.modele=f.value.modele!=""?f.value.modele:this.selectedVs.modele;
    this.selectedVs.nombreDePlaceDisponibles=f.value.place!=""?f.value.place:this.selectedVs.nombreDePlaceDisponibles;
    this.selectedVs.emissionCO2=f.value.co2!=""?f.value.co2:this.selectedVs.emissionCO2;
    this.selectedVs.categorie=f.value.cate!=""?f.value.cate:this.selectedVs.categorie;
    this.selectedVs.motorisation=f.value.motorisation!=""?f.value.motorisation:this.selectedVs.motorisation;
    this.selectedVs.photoURL= f.value.url!=""?f.value.url:this.selectedVs.photoURL;
    this.selectedVs.statut=f.value.statut!=""?f.value.statut:this.selectedVs.statut;

    if (this.selectedVs.statut!="EN_SERVICE") {
      this._vehiculeService.deleteVehiculeService(this.selectedVs.id as number).subscribe(res => {

        if (res.status == 200) this.router.navigateByUrl('/vehiculeService/list');
      });
    }else{
      this._vehiculeService.modifyVehiculeService(this.selectedVs).subscribe(res=>{
        if (res.status==200) this.router.navigateByUrl('/vehiculeService/list');
      })
    }
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
