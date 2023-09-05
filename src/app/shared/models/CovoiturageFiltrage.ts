export class CovoiturageFiltrage {
    isFilteringByVilleDepart:boolean;
    isFilteringByVilleArrivee:boolean;
    isFilteringByDate:boolean;
    
    constructor(){
        this.isFilteringByDate = false;
        this.isFilteringByVilleDepart = false;
        this.isFilteringByVilleArrivee = false;
    }

    getStateFilter_villeDepart():boolean
    {
        return this.isFilteringByVilleDepart;
    }

    setStateFilter_villeDepart(state:boolean):void
    {
        this.isFilteringByVilleDepart = state;
    }

    getStateFilter_villeArrivee():boolean
    {
        return this.isFilteringByVilleArrivee;
    }

    setStateFilter_villeArrivee(state:boolean):void
    {
        this.isFilteringByVilleArrivee = state;
    }

    getStateFilter_date():boolean
    {
        return this.isFilteringByDate;
    }

    setStateFilter_date(state:boolean):void
    {
        this.isFilteringByDate = state;
    }
}