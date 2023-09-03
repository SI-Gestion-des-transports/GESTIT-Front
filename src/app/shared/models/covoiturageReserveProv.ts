import { Utilisateur } from "./utilisateur";
import { VehiculePerso } from "./vehicule.perso";

export class CovoiturageReserveProv {
    constructor(
        public id: number|undefined,
        public nombrePlacesRestantes?: number|undefined,
        public dureeTrajet?: number|undefined,
        public distanceKm?: number|undefined,
        public dateDepart?: Date|undefined,
        public adresseDepart?: string|undefined,
        public adresseArrivee?: string|undefined,
        public organisateur?: Utilisateur|undefined,
        public passagers?: Utilisateur[]|undefined,
        public vehiculePerso?: VehiculePerso|undefined,
    ){ }
      
}