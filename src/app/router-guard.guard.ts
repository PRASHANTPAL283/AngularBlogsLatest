import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Toast, ToastrService } from 'ngx-toastr';



export const routerGuardGuard: CanActivateFn = ( route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
   
    
 
  const router = inject(Router);
  const toast=inject(ToastrService);
  let user:any=sessionStorage.getItem("user");
  user=JSON.parse(user);
  console.log(user)
  if(user?.username=='guest'||user?.username==null||user?.username==undefined||user?.username==''){
    toast.warning('you are not authorize to view this page kindly login and try!')
    
    let data:any={username:"guest",password:"@EZAKMi90"}
    data=JSON.stringify(data);
    sessionStorage.setItem("user",data);
   router.navigate(['login'])
    
    return false;
    
  }
  else{
    return true;
  }


 
 
 
};
