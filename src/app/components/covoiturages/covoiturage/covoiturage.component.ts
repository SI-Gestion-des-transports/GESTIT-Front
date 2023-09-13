import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';


@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {
  @Input() covoituragereserve!: Covoiturage;

  title!: string;
  showDetailsInProgress!: boolean;


  constructor(private covoiturageReserveService: CovoiturageService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("quel est le covoit recu?:", this.covoituragereserve);

    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;
  }


  onViewCovoiturage() {
    this.router.navigateByUrl(`covoiturages/${this.covoituragereserve.id}`);
  }
}
