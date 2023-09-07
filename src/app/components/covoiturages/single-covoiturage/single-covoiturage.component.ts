import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';


@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})
export class SingleCovoiturageComponent {

  title!: string;
  showDetailsInProgress!: boolean;

  covoiturage$!: Observable<Covoiturage>;

  constructor(private covoiturageService: CovoiturageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    /* Nota: le typeCast permet, à l'aide du caractère '+', de transformer
    une chaine de caractères qui contient des nombres en numberAttribute. */
    const covoiturageId = +this.route.snapshot.params['id'];
    this.covoiturage$ = this.covoiturageService.getCovoiturageById(covoiturageId);
  }

  onShowDetails() {
    if (this.showDetailsInProgress) {
    }
    else
      throw new Error('Covoiturage not found!');
  }
}

