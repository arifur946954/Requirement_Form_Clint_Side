import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { Division } from '../model/address/Division';
import { District } from '../model/address/District';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Thana } from '../model/address/Thana';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private RegisterIn = false;
  private key = 'registrationData';
  private email$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");


 
  

 
emailUrl:string="https://localhost:7099/api/Employee/"
addressUrl:string="https://localhost:7099/api/Address/"
ThanaUrl:string="https://localhost:7099/api/Address/Dis?name="


  baseApiUrl:string="https://localhost:7099/api/"//for login
  adminApiUrl:string="https://localhost:7099/api/Admin"//get all employee
  //https://localhost:7099/api/Employee/1
  imageAPI:string="https://localhost:7099/api/Image"
  
  retriveImageAPi:string="https://localhost:7099/api/Image/DbDownloadImages/"

  
  private userpayload:any;
  constructor(private http:HttpClient,private router:Router) {

    this.userpayload=this.decodeToken();
   }
  //dashboard for token
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromToken(Role:string){
    this.role$.next(Role)
  }

  public getEmailFromStore(){

    return this.email$.asObservable();
  }

  public setEmailFromStore(email:string){
   
    this.email$.next(email)
  }
   

  login(loginObj:any){
    return this.http.post<any>(`${this.baseApiUrl}Register/login`,loginObj)
   }

   signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
   }

   register(registerObj:any){
    return this.http.post<any>(`${this.baseApiUrl}Register/Register`,registerObj)
   }

   //templete form
   TempEmployeeForm(employeeObj:any){
    return this.http.post<any>(`${this.baseApiUrl}Employee`,employeeObj)
   }


  //  GetAllEmployee(employeeObj:any){
  //   return this.http.post<any>(`${this.adminApiUrl}`,employeeObj)
  //  }

   GetAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.adminApiUrl);
}



GetEmpById(id:number):Observable<any>{
  return this.http.get <any> (this.baseApiUrl + 'Employee/'+id);
 }

 //get email by id
 GetEmpByemail(email:string):Observable<any>{
 
  return this.http.get <any> (this.emailUrl+email);
 }



// DeleteById(id:number){
//    this.http.post(this.baseApiUrl + 'Employee/'+id);
// }



   EmployeeForm(employeeObj:any){
    return this.http.post<any>(`${this.baseApiUrl}Employee`,employeeObj)
   }

   //addAddress
   OnAddress(employeeObj:any){
    return this.http.get<any>(`${this.addressUrl}`,employeeObj)
   }

   //test
   GetAllAddress():Observable<Division[]>{
    return this.http.get<Division[]>(this.addressUrl);
}
//for district
GetAllDistrict(id:string):Observable<District[]>{
  return this.http.get<District[]>(this.addressUrl+id);
}

GetAllParDistrict(id:string):Observable<District[]>{
  return this.http.get<District[]>(this.addressUrl+id);
}

GetAllThana(id:string):Observable<Thana[]>{
  return this.http.get<Thana[]>(this.ThanaUrl+id);
}

//upload image
// uploadImages(formData: FormData): Observable<any> {
//   return this.http.post<any>(`${this.imageAPI}/DBUploadImages`, formData);
// }

uploadImages(fileCollection: FileList, productCode: string): Observable<any> {
  const formData = new FormData();
  for (let i = 0; i < fileCollection.length; i++) {
    formData.append('fileCollection', fileCollection[i], fileCollection[i].name);
  }

  return this.http.post<any>(`${this.imageAPI}/DBUploadImages?productCode=${productCode}`, formData);
}

//retrive image 
getImageIds(mobile:any): Observable<any[]> {
  return this.http.get<any[]>(this.retriveImageAPi+mobile);
}
//return this.http.get<any[]>(`${this.retriveImageAPi}GetImageIds`);



//jwt token start from here 
StoreToken(tokenValue:string){
  localStorage.setItem('token',tokenValue)
}

getToken(){
 
  return localStorage.getItem('token')
}

islogin():boolean{
  return !!localStorage.getItem('token')
}



//token decoding
decodeToken(){
  const jwtHelper=new JwtHelperService();
  const token=this.getToken()!;
   let x=jwtHelper.decodeToken(token);
  
   console.log(x);
 
  return jwtHelper.decodeToken(token);
 

}

getEmailnamefromToken(){
  if(this.userpayload)
 //debugger
  return this.userpayload.email;
}

getRolefromToken(){
  if(this.userpayload)
   //debugger
  return this.userpayload.role;
}


//register sesson data

storeRegistrationData(data: any): void {
  sessionStorage.setItem(this.key, JSON.stringify(data));
}

getRegistrationData(): any {
  const storedData = sessionStorage.getItem(this.key);
  return storedData ? JSON.parse(storedData) : null;
}

clearRegistrationData(): void {
  sessionStorage.removeItem(this.key);
}

getEmail(): string | null {
  const registrationData = this.getRegistrationData();
  return registrationData ? registrationData.email : null;
}










}
