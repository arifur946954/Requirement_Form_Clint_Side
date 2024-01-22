import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeServiceService } from '../service/employee-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:EmployeeServiceService, private router:Router){}
  canActivate():boolean{
  if(this.auth.islogin()){
      return true;
    }

    else{
      this.router.navigate(['login'])
     return false;
    }

  }
   
   
  }
  

