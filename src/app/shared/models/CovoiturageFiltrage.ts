export class CovoiturageFiltrage {
    filter_VilleDepart_Value:string;
    filter_VilleArrivee_value:string;
    filter_Date_value: Date;
    authorizeFilter_ByVilleArrivee:boolean;
    villeArrivee_liste:string[];
    
    constructor(){
        
        this.filter_VilleDepart_Value = "";
        this.filter_VilleArrivee_value = "";
        this.filter_Date_value = null;
        this.authorizeFilter_ByVilleArrivee = false;
        this.villeArrivee_liste = null;

    }
}