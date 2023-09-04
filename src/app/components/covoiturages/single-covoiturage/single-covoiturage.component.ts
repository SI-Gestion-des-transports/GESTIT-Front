import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovoiturageReserveProv } from 'src/app/shared/models/covoiturageReserveProv';
import { CovoiturageProvService } from 'src/app/shared/services/covoiturageProv.service';

@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})
export class SingleCovoiturageComponent {
  covoituragereserve!: CovoiturageReserveProv;

  title!: string;
  showDetailsInProgress!: boolean;


  constructor(private covoiturageReserveService: CovoiturageProvService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    /* Nota: le typeCast permet, à l'aide du caractère '+', de transformer
    une chaine de caractères qui contient des nombres en numberAttribute. */
    const covoiturageId = +this.route.snapshot.params['id'];
    this.covoituragereserve = this.covoiturageReserveService.getCovoiturageById(covoiturageId);
  }

  onShowDetails() {
    if (this.showDetailsInProgress) {
      console.log(this.covoiturageReserveService.getCovoiturageById(this.covoituragereserve.id));
    }
    else
      throw new Error('Covoiturage not found!');
  }
}

