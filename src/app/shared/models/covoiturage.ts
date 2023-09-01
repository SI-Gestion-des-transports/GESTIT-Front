import {Utilisateur} from "./utilisateur";
import {VehiculePerso} from "./vehicule.perso";

export interface Covoiturage {
  nombrePlacesRestantes: number,
  dureeTrajet: number,
  distanceKm: number,
  dateDepart: Date,
  adresseDepart: string,
  adresseArrivee: string,
  organisateur: Utilisateur;
  passagers: Utilisateur[],
  vehiculePerso: VehiculePerso,
}
