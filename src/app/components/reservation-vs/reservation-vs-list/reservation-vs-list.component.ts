import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {forkJoin, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {UtilisateursService} from "../../../shared/services/utilisateurs.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";
import {HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "../../../shared/services/authentification.service";

@Component({
  selector: 'app-reservation-vs-list',
  templateUrl: './reservation-vs-list.component.html',
  styleUrls: ['./reservation-vs-list.component.css']
})
export class ReservationVsListComponent implements OnInit{
  @Input()
  user: Utilisateur={};
  /*
  reservationsVs:ReservationVs[]=[];
  featuredResVs: ReservationVs = {};
  */


  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  currentVs: VehiculeService = {};
  vehiculesSrv: VehiculeService [] = [];
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!: boolean;

  upcompingReservations : boolean = true;
  mergedArray = [];


  private _subscription = new Subscription();
  constructor(private _reservationVsService:ReservationVsService,
              private _authService: AuthentificationService,
              private _vehiculeSrvService: VehiculeServiceService,
              private _utilisateurService: UtilisateursService,
              private _router: Router) {
  }

  ngOnInit(): void {
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
    this._subscription.add(
      this._utilisateurService.currentUser$
        .subscribe(data => {
          this.currentUser = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.currentVs$
         .subscribe(data => {
            this.currentVs = data;
          })
        );
    this._subscription.add(
      this._vehiculeSrvService.vehiculesSrv$
        .subscribe(data => {
          this.vehiculesSrv = data
        })
    );
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
    this._init();
  }

  ngOnDestroy(): void {
    console.log("Réservation LIST Destroyed — unsuscribe")
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
    console.log("Réservation Service — onDestroy / this.currentUser :", this.currentUser);
    this.currentUser = {};
    console.log("Réservation Service — onDestroy / this.currentUser :", this.currentUser);
  }


  private _init(){
    console.log("Réservation List — _init");
    console.log("Reservation List — _init / localStorage.getItem : ", window.localStorage.getItem("JWT-TOKEN"))
    if(!window.localStorage.getItem("JWT-TOKEN")){
      console.log("Reservation List — _init / localStorage.getItem : false");
      console.log("Reservation List ——>>>> Login");
      this._router.navigateByUrl('login');
    } else {
      this.getIncomingReservations();
    }
/*    forkJoin({
      reservations: this._reservationVsService.findAll(),
      vehicules: this._vehiculeSrvService.findAllEnService()
    }).subscribe(({ reservations, vehicules }) => {
      console.log("Réservation List — forkJoin");
      console.log("Réservations :", this.allReservationsVs);
      this.allReservationsVs = reservations;
      console.log("Réservations :", this.allReservationsVs);
      console.log("Véhicules :", this.vehiculesSrv);
      this.vehiculesSrv = vehicules;
      console.log("Véhicules :", this.vehiculesSrv);
      console.log("MergedArray :", this.mergedArray);
      this.mergedArray = this.mergeReservationsWithVehicles();
      console.log("MergedArray :", this.mergedArray);
    });

    this.upcompingReservations = true;
    this._reservationVsService.findUpcomingByUserId(this.currentUser.id).subscribe(upcomingRes => this.upcomingReservationsVsByUser = upcomingRes)
    this.mergedArray = this.mergeReservationsWithVehicles();*/
  }

  getPastReservations(){
    console.log("Réservation List — getPastReservations");
    this.upcompingReservations = false;

    forkJoin({
      reservations: this._reservationVsService.findPastByUserId(),
      vehicules : this._vehiculeSrvService.findAllEnService()
    }).subscribe(({reservations, vehicules}) => {
      console.log("Réservation List — getPastReservations / reservations : ", reservations);
      console.log("Réservation List — getPastReservations / vehicules : ", vehicules);
      console.log("Réservation List — getIncomingReservations / forkJoin");
      this._reservationVsService.updateAllReservationsVs(reservations);
      this._vehiculeSrvService.updateVehiculesSrv(vehicules);
      this.mergedArray = this.mergeReservationsWithVehicles();
      console.log("Réservation List — getPastReservations / mergedArray", this.mergedArray);
    });
    //this._reservationVsService.findPastByUserId(this.currentUser.id).subscribe(pastRes => this.pastReservationsVsByUser = pastRes);
  }

  getIncomingReservations(){
    console.log("Réservation List — getIncomingReservations");
    this.upcompingReservations = true;
    forkJoin({
      reservations: this._reservationVsService.findUpcomingByUserId(),
      vehicules: this._vehiculeSrvService.findAllEnService()
    }).subscribe(({reservations, vehicules}) =>{
      console.log("Réservation List — getIncomingReservations / reservations : ", reservations);
      console.log("Réservation List — getIncomingReservations / vehicules : ", vehicules);
      console.log("Réservation List — getIncomingReservations / forkJoin");
      this._reservationVsService.updateAllReservationsVs(reservations);
      this._vehiculeSrvService.updateVehiculesSrv(vehicules);
      this.mergedArray = this.mergeReservationsWithVehicles();
      console.log("Réservation List — getIncomingReservations / mergedArray", this.mergedArray);
    })
    //this._init();
  }

  select(res: ReservationVs) {
    this.currentReservationVs = res;
  }

  newReservation(){
    console.log("Réservation List — newReservation");
    this._reservationVsService.updateReservationVs({})
    this._router.navigateByUrl('reservationsvs/form');
  }

  startUpdateResVs(reservationToEdit:ReservationVs){
    this._reservationVsService.updateModifBtn(false);
    this._reservationVsService.updateCurrentReservationVs(reservationToEdit);
    this._reservationVsService.updateReservationVs(reservationToEdit);
    console.log("Réservation List — startUpdateResVs");
    this._router.navigateByUrl('reservationsvs/form');
  }

  deleteReservationVs(reservationToDelete: ReservationVs){
    console.log("Réservation List — deleteReservationVs");
    this._router.navigateByUrl('reservationsvs/item');
    this._reservationVsService.updateCurrentReservationVs(reservationToDelete);
  }

  mergeReservationsWithVehicles(): any[] {
    return this.allReservationsVs.map(reservation => {
      const vehicule = this.vehiculesSrv.find(veh => veh.id === reservation.vehiculeServiceId);
      if (!vehicule) {
        console.warn(`Aucun véhicule trouvé pour vehiculeServiceId: ${reservation.vehiculeServiceId}`);
        return reservation;
      }
      return {
        ...reservation,
        ...vehicule
      };
    });
  }

}
