import { Utilisateur } from "./utilisateur";
import { VehiculePerso } from "./vehicule.perso";

export class Covoiturage {
    id!: number;
    nombrePlacesRestantes?: number | undefined;
    dureeTrajet?: number | undefined;
    distanceKm?: number | undefined;
    dateDepart?: Date | undefined;
    adresseDepart?: string | undefined;
    adresseArrivee?: string | undefined;
    organisateur?: Utilisateur | undefined
    passagers?: Utilisateur[] | undefined;
    vehiculePerso?: VehiculePerso | undefined
}