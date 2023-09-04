import { Component, OnInit } from '@angular/core';
import { Covoiturage_old } from 'src/app/shared/models/covoiturage_old';
import { CovoituragesService } from 'src/app/shared/services/covoiturages.service_old';

@Component({
  selector: 'app-covoiturages-organise',
  templateUrl: './covoiturages-organise.component.html',
  styleUrls: ['./covoiturages-organise.component.css'],
})
export class CovoituragesOrganiseComponent implements OnInit {
  covoiOrgs: Covoiturage_old[] = [];
  covoiOrg: Covoiturage_old = {};

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

  create(covoitOrg: Covoiturage_old) {
    console.log('Création utilisateur :' + covoitOrg.id);
    this._covoitOrgService.create(covoitOrg).subscribe(() => {
      this.reInitCovoitOrg();
      this.ngOnInit();
    });
  }
}
