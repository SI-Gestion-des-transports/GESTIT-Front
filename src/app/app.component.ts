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

  ngOnInit(): void {

  }
}
