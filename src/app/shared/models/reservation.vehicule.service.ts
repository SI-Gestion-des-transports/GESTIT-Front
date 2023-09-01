import {Adresse} from "./adresse";

export interface ReservationVehiculeService{
  userId: number,
  vehiculeServiceId: number,
  distanceKm: number,
  dateHeureDepart: Date,
  dateHeureRetour: Date,
}
