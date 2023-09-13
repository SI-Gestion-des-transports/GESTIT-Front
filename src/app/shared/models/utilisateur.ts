import {Covoiturage} from "./covoiturage";

export interface Utilisateur {
  id?: number;
  nom?: string,
  motDePasse?: string,
  email?: string,
  covoituragesOrganises?: Covoiturage[],
  roles?:string[]
}
