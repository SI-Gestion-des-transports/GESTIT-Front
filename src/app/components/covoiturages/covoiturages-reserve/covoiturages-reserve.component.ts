import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageReserveProv } from 'src/app/shared/models/covoiturageReserveProv';

@Component({
  selector: 'app-covoiturages-reserve',
  templateUrl: './covoiturages-reserve.component.html',
  styleUrls: ['./covoiturages-reserve.component.css']
})
export class CovoituragesReserveComponent implements OnInit {
  @Input() covoituragereserve!: CovoiturageReserveProv;

  title!: string;
  showDetailsInProgress!: boolean;


  constructor() { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

  }

  onShowDetails() {
    if (this.showDetailsInProgress)
      this.showDetailsInProgress = false;
    else
      this.showDetailsInProgress = true;
  }
}
