import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoituragesService } from 'src/app/shared/services/covoiturages.service';

@Component({
  selector: 'app-covoiturages-organise',
  templateUrl: './covoiturages-organise.component.html',
  styleUrls: ['./covoiturages-organise.component.css'],
})
export class CovoituragesOrganiseComponent implements OnInit {
  covoiOrgs: Covoiturage[] = [];
  covoiOrg: Covoiturage = {};

  constructor(private _covoitOrgService: CovoituragesService) {}
  ngOnInit(): void {
    this.ngOnInit();
  }

  private_init() {
    this._covoitOrgService.findAll().subscribe((covoitOrgs) => {
      this.covoiOrgs = covoitOrgs;
    });
  }

  reInitCovoitOrg() {
    this.covoiOrg = {};
  }

  create(covoitOrg: Covoiturage) {
    console.log('Création utilisateur :' + covoitOrg.id);
    this._covoitOrgService.create(covoitOrg).subscribe(() => {
      this.reInitCovoitOrg();
      this.ngOnInit();
    });
  }
}
