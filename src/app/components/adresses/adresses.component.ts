import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Adresse } from 'src/app/shared/models/adresse';
import { AdressesService } from 'src/app/shared/services/adresses.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css'],
})
export class AdressesComponent implements OnInit {
  adresses: Adresse[] = [];
  adresse: Adresse = {};

  constructor(private _adresseService: AdressesService) {}
  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this._adresseService.findAll().subscribe((adresses) => {
      this.adresses = adresses;
    });
  }

  reInit() {
    this.adresse = {};
  }

  create(adresse: Adresse) {
    this._adresseService.create(adresse).subscribe((createdAdresse) => {
      this.reInit();
      this._init();
    });
  }
  update(adresseUpdated: Adresse) {
    this._adresseService.update(adresseUpdated).subscribe(() => {
      this.reInit();
      this._init();
    });
  }

  delete(adresseDeleted: Adresse) {
    this._adresseService.delete(adresseDeleted).subscribe(() => {
      this.reInit();
      this._init();
    });
  }
}
