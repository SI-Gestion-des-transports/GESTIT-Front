import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage } from './shared/models/covoiturage';
import { CovoiturageReserveProv } from './shared/models/covoiturageReserveProv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GESTIT-Front';
  myCovoiturageReserve! : CovoiturageReserveProv;
  

  ngOnInit(): void {
    this.myCovoiturageReserve = new CovoiturageReserveProv(
      1,
      4,
      102,89,
      new Date(),
      "25 rue des Cornouailles 75000 Paris",
      "33 place des vignobles royaux 33000 Bordeaux",
      undefined,undefined,
      undefined);
  }

}
