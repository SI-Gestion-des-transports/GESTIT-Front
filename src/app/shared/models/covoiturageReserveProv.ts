import { Utilisateur } from "./utilisateur";
import { VehiculePerso } from "./vehicule.perso";

export class CovoiturageReserveProv {
    constructor(
        public id: number,
        nombrePlacesRestantes?: number,
        dureeTrajet?: number,
        distanceKm?: number,
        dateDepart?: Date,
        adresseDepart?: string,
        adresseArrivee?: string,
        organisateur?: Utilisateur,
        passagers?: Utilisateur[],
        vehiculePerso?: VehiculePerso
    ){ }
      
}