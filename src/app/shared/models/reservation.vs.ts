import {Adresse} from "./adresse";

export interface ReservationVs {
  resId?: number,
  userId?: number,
  vehiculeServiceId?: number,
  distanceKm?: number,
  dateHeureDepart?: string,
  dateHeureRetour?: string,
}
