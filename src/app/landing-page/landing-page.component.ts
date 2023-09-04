import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  /*Nota : la navigation se fait ici programmatiquement
  à l'aide du router*/
  constructor(private router: Router) {

  }

  onContinue(): void {
    this.router.navigateByUrl('covoiturages');
  }

}
