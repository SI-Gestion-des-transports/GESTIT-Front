

export class CovoiturageFiltrage {
    isFilteringByVilleDepart:boolean;
    isFilteringByVilleArrivee:boolean;
    isFilteringByDate:boolean;
    
    constructor(){
        this.isFilteringByDate = false;
        this.isFilteringByVilleDepart = false;
        this.isFilteringByVilleArrivee = false;
    }
}