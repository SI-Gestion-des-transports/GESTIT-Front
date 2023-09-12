import {Component} from '@angular/core';
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {Router} from "@angular/router";
import {HttpHeaderService} from "../../../shared/services/http-header.service";
import {VehiculePersoService} from "../../../shared/services/vehicule.perso.service";
import {VehiculePerso} from "../../../shared/models/vehicule.perso";

@Component({
  selector: 'app-vehicule-perso-list',
  templateUrl: './vehicule-perso-list.component.html',
  styleUrls: ['./vehicule-perso-list.component.css']
})
export class VehiculePersoListComponent {


  listVehiculePerso: VehiculePerso[] = [];
  selectedVehiculePerso: VehiculeService = {};

  constructor(
              private router: Router,
              private _httpHeader: HttpHeaderService,
              private _vehiculePersoService:VehiculePersoService
  ) {
  }

  ngOnInit(): void {
    this.initListPerso();

  }

  initListPerso() {
    this._vehiculePersoService.findAllVP().subscribe(res=>{
      this.listVehiculePerso =res;
    });
  }



  toAdd() {
    this.router.navigateByUrl('/vehiculeperso/add');
  }

  toModify(id: number) {
    this.router.navigateByUrl(`/vehiculeperso/modify/${id}`);
  }

  select(vp: VehiculeService) {
    this.selectedVehiculePerso = vp;
  }

  delete(id: number) {
    this._vehiculePersoService.deleteVP(id).subscribe(res => {
      this.listVehiculePerso=res;
      this.selectedVehiculePerso={};
    });
  }
}
