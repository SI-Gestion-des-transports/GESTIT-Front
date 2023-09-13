import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {UtilisateursService} from "../../../shared/services/utilisateurs.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";

@Component({
  selector: 'app-reservation-vs-form',
  templateUrl: './reservation-vs-form.component.html',
  styleUrls: ['./reservation-vs-form.component.css']
})
export class ReservationVsFormComponent implements OnInit, OnChanges{

  resasVs:ReservationVs[]=[];
  resaVs: ReservationVs = {};
  currentUserId: number;

  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  currentVs: VehiculeService = {};
  currentIndex:number = 0;
  vehiculesSrv: VehiculeService [] = [];
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!: boolean;

  private _subscription = new Subscription();

  constructor(private _reservationVsService:ReservationVsService,
              private _utilisateurService: UtilisateursService,
              private _vehiculeSrvService: VehiculeServiceService,
              private _router: Router) {
  }

  ngOnInit() {
    this._subscription.add(
      this._reservationVsService.reservationVs$.
      subscribe(data => {
        this.reservationVs = data;
      })
    );
    this._subscription.add(
      this._reservationVsService.allReservationsVs$
        .subscribe(data => {
          this.allReservationsVs = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.upcomingReservationsVsByUser$
        .subscribe(data => {
          this.upcomingReservationsVsByUser = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.pastReservationsVsByUser$
        .subscribe(data => {
          this.pastReservationsVsByUser = data;
        })
    );
    //console.log("Réservation Form — Before SUBSCRIPTION / this.currentUser.id : " + this.currentUser.id);
    this._subscription.add(
      this._utilisateurService.currentUser$
        .subscribe(data => {
          this.currentUser = data;
        })
    );
    //console.log("Réservation Form — After SUBSCRIPTION / this.currentUser.id : " + this.currentUser.id);
    this._subscription.add(
      this._reservationVsService.currentVs$
        .subscribe(data => {
          this.currentVs = data;
        })
    );
    this._subscription.add(
      this._vehiculeSrvService.vehiculesSrv$
        .subscribe(data => {
          this.vehiculesSrv = data;
          if (this.vehiculesSrv.length !=0) {
            this.currentVs = this.vehiculesSrv[0];
            this.currentIndex=0;
          }
        });
    this._vehiculeSrvService.findAllEnService().subscribe(data => this.vehiculesSrv = data);
    this._subscription.add(
      this._reservationVsService.currentReservationVs$
        .subscribe(data => {
          this.currentReservationVs = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.editedReservationVs$
        .subscribe(data => {
          this.editedReservationVs = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.modifBtn$
        .subscribe(data => {
          this.modifBtn = data;
        })
    );
    this.currentUserId = this._utilisateurService.getSharedCurrentUserId();
    this._init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentUser){
      this._init();
      //console.log(this.currentUser.nom)
      //console.log("Réservation Form — ngOnChanges : currentUser");
    }
    if (this.reservationVs){
      //console.log("Réservation Form — ngOnChanges : reservationVs");
    }
    if (this.reservationVs.vehiculeServiceId){
      //console.log("Réservation Form — ngOnChanges : resVs.vehiculeServiceId")
    }
  }

  ngOnDestroy(): void {
    this.reInitResVs();
    //console.log("Réservation FORM Destroyed — unsuscribe")
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  private _init(){
    //console.log("Réservation Form — _init");
    if(!window.localStorage.getItem("JWT-TOKEN")) {
      //console.log("Reservation Form — _init / localStorage.getItem : false");
      //console.log("Reservation Form ——>>>> Login");
      this._router.navigateByUrl('login');
    }
    /*
    this._reservationVsService
      .findAll()
      .subscribe(reservations => {
        this.resasVs = reservations;
      });
    */
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    //console.log("Réservation Form — OnSubmit");
    if(!this.reservationVs.vehiculeServiceId){
      this.reservationVs.userId = this.currentUserId;
      this.reservationVs.vehiculeServiceId = this.vehiculesSrv[0].id;
    }
    if(this.currentReservationVs.id){
      this.update(this.reservationVs);
    } else if (!this.currentReservationVs.id){
      this.create(this.reservationVs);
    }
  }

  cancel(){
    //console.log("Réservation Form — CANCEL");
    this.reInitResVs();
    this._router.navigateByUrl('reservationsvs/list');
  }

  create(reservationVs:ReservationVs){
    
    //console.log("Réservation Form — CREATE / currentUser.id : " + this.currentUser.id)
    console.log(this.currentUserId)
    reservationVs.userId = this.currentUserId;
    //console.log("Réservation Form — CREATE / reservation.user.id : " + reservationVs.userId);
    this._reservationVsService
      .create(this.addSecondsToDate(reservationVs))
      .subscribe(() =>{
        //console.log("Created")
        this.reInitResVs();
        this._init();
        this._router.navigateByUrl('reservationsvs/list');
      });
  }

  update(updatedReservation : ReservationVs){
    //console.log("Réservation Form — UPDATE / reservation.user.id : " + updatedReservation.userId);
    this._reservationVsService.update(this.addSecondsToDate(updatedReservation)).subscribe((data) => {
      //console.log("Réservation Form — UPDATED ResVS : ",data)
    });
    this.reInitResVs();
    this._router.navigateByUrl('reservationsvs/list');
  }

  reInitResVs(){
    //console.log("Réservation Form — ReInitVs");
    this.currentVs = {};
    this._reservationVsService.updateCurrentReservationVs({});
    this._reservationVsService.updateModifBtn(true);
  }

  private addSecondsToDate(reservationVs: ReservationVs): ReservationVs {
    reservationVs.dateHeureDepart = `${reservationVs.dateHeureDepart.slice(0, 16)}:00`;
    reservationVs.dateHeureRetour = `${reservationVs.dateHeureRetour.slice(0, 16)}:00`;
    return reservationVs;
  }

  select(vs: VehiculeService) {
    //console.log("Réservation Form — Select vs")
    this.currentVs = vs;
  }

  previous(){
    this.currentIndex= (this.vehiculesSrv.length+this.currentIndex-1)%this.vehiculesSrv.length;
    this.currentVs=this.vehiculesSrv[this.currentIndex];
    console.log(this.currentVs);
    this.reservationVs.vehiculeServiceId = this.currentVs.id;
  }
  next(){
    this.currentIndex= (this.currentIndex+1)%this.vehiculesSrv.length;
    this.currentVs=this.vehiculesSrv[this.currentIndex];
    console.log(this.currentVs);
    this.reservationVs.vehiculeServiceId = this.currentVs.id;
  }
}
