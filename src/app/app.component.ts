import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage_old } from './shared/models/covoiturage_old';
import { Covoiturage } from './shared/models/covoiturage';

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
