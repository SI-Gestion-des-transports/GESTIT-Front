import { Adresse } from './adresse';
import { Utilisateur } from './utilisateur';
import { VehiculePerso } from './vehicule.perso';

export interface CovoiturageCreate {
  id?: number;
  nombrePlacesRestantes?: number;
  dureeTrajet?: number;
  distanceKm?: number;
  dateDepart?: Date|string;
  adresseDepartId?: number;
  adresseArriveeId?: number;
  organisateurId?: number;
  vehiculePersoId?: number;
  passagersId?: number[];
}
