import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


export const routerGuardGuard: CanActivateFn = ( route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const router = inject(Router);
 
  let user:any=sessionStorage.getItem("user");
  user=JSON.parse(user);
  if(user.username=='guest'||user.username==null||user.username==undefined||user.username==''){
    alert("you are not authorize to view this page kindly login and try!")
   router.navigate(['login'])
    
    return false;
    
  }
  else{
    return true;
  }

 
};
