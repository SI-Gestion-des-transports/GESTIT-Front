import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageReserveProv } from 'src/app/shared/models/covoiturageReserveProv';
import { CovoiturageProvService } from 'src/app/shared/services/covoiturageProv.service';

@Component({
  selector: 'app-covoiturages-reserve',
  templateUrl: './covoiturages-reserve.component.html',
  styleUrls: ['./covoiturages-reserve.component.css']
})
export class CovoituragesReserveComponent implements OnInit {
  @Input() covoituragereserve!: CovoiturageReserveProv;

  title!: string;
  showDetailsInProgress!: boolean;


  constructor(private covoiturageReserveService : CovoiturageProvService) { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;
    

  }

  onShowDetails() {
    if (this.showDetailsInProgress){
      console.log(this.covoiturageReserveService.getCovoiturageById(this.covoituragereserve.id));
    }
      else
      throw new Error('Covoiturage not found!');
  }
}
