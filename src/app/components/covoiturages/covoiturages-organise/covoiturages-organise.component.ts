import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { CovoituragesService } from 'src/app/shared/services/covoiturages.service';

@Component({
  selector: 'app-covoiturages-organise',
  templateUrl: './covoiturages-organise.component.html',
  styleUrls: ['./covoiturages-organise.component.css'],
})
export class CovoituragesOrganiseComponent implements OnInit, OnChanges {
  @Input()
  organisateur: Utilisateur = {};

  covoiOrgs: Covoiturage[] = [];

  covoiOrg: Covoiturage = {};

  constructor(private _covoitOrgService: CovoituragesService) {}
  ngOnInit(): void {
    /*  this._init();
    this.reInitCovoitOrg(); */
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.organisateur);
    /*  if (this.organisateur) {
      this._init();
      this.reInitCovoitOrg();
    } */
  }

  private _init() {
    this._covoitOrgService
      .findAll(this.organisateur)
      .subscribe((covoitOrgs) => {
        this.covoiOrgs = covoitOrgs;
      });
  }

  reInitCovoitOrg() {
    this.covoiOrg = {
      organisateur: this.organisateur,
    };
  }

  create() {
    console.log('AAAA' + this.organisateur);
    this.covoiOrg.organisateur = this.organisateur;
    this._covoitOrgService.create(this.covoiOrg).subscribe(() => {
      //this.reInitCovoitOrg();
      //this._init();
    });
  }
}
