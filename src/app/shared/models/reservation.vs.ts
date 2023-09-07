import {Adresse} from "./adresse";

export interface ReservationVs {
  id?: number,
  userId?: number,
  vehiculeServiceId?: number,
  dateHeureDepart?: string,
  dateHeureRetour?: string,
}
