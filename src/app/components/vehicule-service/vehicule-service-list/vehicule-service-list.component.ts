import {Component, OnInit} from '@angular/core';
import {MarqueServiceService} from "../../../shared/services/marque-service.service";
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicule-service-list',
  templateUrl: './vehicule-service-list.component.html',
  styleUrls: ['./vehicule-service-list.component.css']
})
export class VehiculeServiceListComponent implements OnInit {
  listMarque: string[] = [];
  marqueSelected: string = "all";
  listVehiculeService: VehiculeService[] = [];
  selectedVehiculeService: VehiculeService = {};

  constructor(private _marqueService: MarqueServiceService,
              private _vehiculeServiceService: VehiculeServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._marqueService.findAll().subscribe(res => {
      this.listMarque = res;
    });
    this.initListVs();
    this._vehiculeServiceService.updateVehiculesSrv(this.listVehiculeService);
  }

  initListVs() {
    this._vehiculeServiceService.findAll().subscribe(res => {
      this.listVehiculeService = res.filter(value => value.statut != "HORS_SERVICE");
    });
  }

  marqueChanged() {
    console.log(this.marqueSelected);
  }

  toAdd() {
    this.router.navigateByUrl('/vehiculeService/add');
  }

  toModify(id:number){
    this.router.navigateByUrl(`/vehiculeService/modify/${id}`);
  }

  select(vs: VehiculeService) {
    this.selectedVehiculeService = vs;
  }

  delete(id: number) {
    this._vehiculeServiceService.deleteVehiculeService(id).subscribe(res => {
      console.log(res);
      if (res.status == 200) this.initListVs();
    });
  }
}
