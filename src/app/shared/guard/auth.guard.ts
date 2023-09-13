import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";


export const authGuard: CanActivateFn =  (route, state):Observable<boolean> => {
  const _authService = inject(AuthentificationService);
  const dataRole = route.data["roles"];
  const router=inject(Router);

  return new Observable<boolean>((observer)=>{
    if (!window.localStorage.getItem(environment.JWT)) {
      router.navigateByUrl("/login");
      observer.next(false);
      observer.complete();
    }
    _authService.verifyJWT().subscribe( res=>{
      if (res.status !=200) {
        window.localStorage.removeItem(environment.JWT);
        router.navigateByUrl("/login");
        observer.next(false);
        observer.complete();
      }else if (res.body.roles.filter(role=> role==dataRole).length==0){
        router.navigateByUrl("");
        observer.next(false);
        observer.complete();
      }else {
        observer.next(true);
        observer.complete();
      }
    })
  });

}

