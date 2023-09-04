import { Injectable } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';



@Injectable({
    providedIn: 'root'
})
export class CovoiturageService {
    covoituragesReserves: Covoiturage[] = [
        {
            id: 1,
            nombrePlacesRestantes: 2,
            dureeTrajet: 102,
            distanceKm: 91,
            dateDepart: new Date(),
            adresseDepart: "25 rue des Cornouailles 75000 Paris",
            adresseArrivee: "45 place des vignobles royaux 33000 Bordeaux",
            organisateur: undefined,
            passagers: undefined,
            vehiculePerso: undefined
        },
        {
            id: 2,
            nombrePlacesRestantes: 4,
            dureeTrajet: 450,
            distanceKm: 800,
            dateDepart: new Date(),
            adresseDepart: "11 passage des Abesses 63000 Clermont-ferrand",
            adresseArrivee: "1035 chemin du poullailler ancien 11000 Narbonne",
            organisateur: undefined,
            passagers: undefined,
            vehiculePerso: undefined
        },
        {
            id: 3,
            nombrePlacesRestantes: 1,
            dureeTrajet: 45,
            distanceKm: 99,
            dateDepart: new Date(),
            adresseDepart: "1 place du menuet dansant 78350 Noisy les ardillons",
            adresseArrivee: "87 avenue de Maupassant 23000 Guéret",
            organisateur: undefined,
            passagers: undefined,
            vehiculePerso: undefined
        }
    ];

    getAllCovoiturages(): Covoiturage[] {
        return this.covoituragesReserves;
    }

    getCovoiturageById(covoiturageId: number): Covoiturage {
        const covoiturageReserve = this.covoituragesReserves.find(covoiturage => covoiturage.id === covoiturageId);
        
        if (!covoiturageReserve)
            throw new Error('Covoiturage not found');
        else
            return covoiturageReserve;
    }
}