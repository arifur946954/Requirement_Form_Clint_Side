import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //ApiUser:string="https://localhost:7099/api/Admin"
  constructor(private http:HttpClient,private router:Router) { }

// getUser(){
// return this.http.get<any>(this.ApiUser);

// }
  

}
