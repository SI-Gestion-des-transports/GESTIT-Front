import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  logoUrl!: string;

  constructor(){
    this.logoUrl= "../assets/logo.png"
  }

 

  

}
