import { Adresse } from './adresse';
import { Utilisateur } from './utilisateur';
import { VehiculePerso } from './vehicule.perso';

export interface Covoiturage {
  id?: number;
  nombrePlacesRestantes?: number;
  dureeTrajet?: number;
  distanceKm?: number;
  dateDepart?: Date;
  adresseDepart?: Adresse;
  adresseArrivee?: Adresse;
  organisateur?: Utilisateur;
  passagers?: Utilisateur[];
  vehiculePerso?: VehiculePerso;
}

