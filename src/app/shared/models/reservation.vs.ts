import {Adresse} from "./adresse";

export interface ReservationVs {
  userId: number,
  vehiculeServiceId: number,
  distanceKm: number,
  dateHeureDepart: Date,
  dateHeureRetour: Date,
}
