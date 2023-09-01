import {Adresse} from "./adresse";

export interface ReservationVs {
  resId?: number,
  userId?: number,
  vehiculeServiceId?: number,
  distanceKm?: number,
  dateHeureDepart?: Date,
  dateHeureRetour?: Date,
}
