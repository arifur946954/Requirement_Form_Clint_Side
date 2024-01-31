import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { Register } from 'src/app/model/Register';
import { Division } from 'src/app/model/address/Division';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import {HttpClient} from '@angular/common/http';
import { District } from 'src/app/model/address/District';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  qualificationType = ['SSC', 'HSC Or Diploma ', 'Bachelor or Degree ', 'Master', 'PhD or Other '];
  //for image upload
  selectedFiles: FileList | null = null;
  useSameAddress: boolean = false;
 
  
  productCode: string = '';
  EmailLength:number=0;
  mobile:any;

  //test
  employeList:Division[]=[];
  paremployeList:Division[]=[];
  retrievedData: any;
  emails:any;
  names:any

 
  districts:any[]=[];
  //Districts:District[]=[];
  d:any[]=[];
  ParD:any[]=[];
  t:any[]=[];
  PThana:any[]=[];
  
  // Dst:District[]=[
  //   {DisId:0,DivId:0,Name:'',BnName:'',Lat:'',Ion:'',Url:'',
  // Thana:{  ThanaId:0,   DisId:0, Name:'',  BnName:'', Url:'' } }]
    
  Dst:any;
  parDst:any
  thn:any;
  Parthn:any;
    
    

    
   
     
    
     


  Distrcts:any=[{}];

  //AllDistricts:AllDistrict[]=[];
Address:Division={
  DivId:0,
    name:'',
    BnName:'',
    Url:'',

    District:[{

    DisId:0,
    DivId:0,
    Name:'',
    BnName:'',
    Lat:'',
    Ion:'',
    Url:'',

    Thana:{
      ThanaId:0,
      DisId:0,
      Name:'',
      BnName:'',
      Url:''
    } 
    }]
}


addReg:Register={
  registerId:0,
    mobilenumber:'',
    name:'',
    email:'',
    password:'',
}

email:string='';
mobilenumber:any;
name:string='';
role:string='';

  addEmployeeRequest:Employee={
    employeeId:0,
    mobilenumber:'',
    name:'',
    fathername:'',
    mothername:'',
    nid:'',
    dateofbirthd:null,
    birthplace:'',
    religion:'',
    bloodgroup:'',
    gender:'',
    maritalstatus:'',
    spousename:'',
    email:'',
    interviewdate:null,
    appliedpost:'',
    probablyjoiningdate:null,
    expectedselery:null,
    appliedby:'',
   



  accademicqulifications:[
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:null,passingyear:null,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:null,passingyear:null,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:null,passingyear:null,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:null,passingyear:null,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:null,passingyear:null,employeeId:0},

  ],
  experiences:[
    {expId:0, post:'',organization:'',joblocation:'',selery:null,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:'',organization:'',joblocation:'',selery:null,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:' ',organization:' ',joblocation:' ',selery:null,reportingto:' ',defaultproduct:' ',employeeId:0},
     {expId:0, post:' ',organization:' ',joblocation:' ',selery:null,reportingto:' ',defaultproduct:' ',employeeId:0},
    //  {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
  ],
  presentaddresses:[
     {presentAddId:0, division:'',district:'',thana:'',postoffice:'',village:'',password:'',employeeId:0},
  ],
  parmanentaddresses:[
    {parmanentAddId:0, division:'',district:'',thana:'',postoffice:'',village:'',password:'',employeeId:0},
 ],
   


  }

  autoFillupAdderss(  ){
    this.useSameAddress = true;
    
  
    this.addEmployeeRequest.parmanentaddresses[0].division=  this.addEmployeeRequest.presentaddresses[0].division;
    
    this.addEmployeeRequest.parmanentaddresses[0].district=  this.addEmployeeRequest.presentaddresses[0].district;
    this.addEmployeeRequest.parmanentaddresses[0].thana=  this.addEmployeeRequest.presentaddresses[0].thana;
    this.addEmployeeRequest.parmanentaddresses[0].postoffice=  this.addEmployeeRequest.presentaddresses[0].postoffice;
    this.addEmployeeRequest.parmanentaddresses[0].village= this.addEmployeeRequest.presentaddresses[0].village;
    

  }

  SameAsEmail(){
    this.productCode=this.addEmployeeRequest.mobilenumber
  }
  // sameAsEmail(){
  //   this.addEmployeeRequest.email=this.email;
  //   console.log("tsr",  this.addEmployeeRequest.email);
  // }

  constructor(private fb:FormBuilder,private http:HttpClient, private employeeService:EmployeeServiceService, private router:Router) {
    // this.emails = this.employeeService.getEmail();
   
    
   }

  ngOnInit(): void {
  
  
   
    //test

    this.employeeService.GetAllAddress()
    .subscribe({
     next:(employees)=>{
       console.log(employees)
       this.employeList=employees
     },
     error:(response)=>{console.log(response)}
    })
   
    // this.addAddress();
  
    this.employeeService.getEmailFromStore().subscribe(val=>{
    let emailFromToken=this.employeeService.getEmailnamefromToken();
      this.email=val || emailFromToken
      //call getEmployee for data
      this.getEmployeeByEmail(this.email)
      console.log("before", this.email)
      //extra
      this.addEmployeeRequest.email=this.email
      console.log("after", this.addEmployeeRequest.email)
    })
    //MobileNumber
    this.employeeService.getMobileFromStore().subscribe(mob=>{
  
      let name=this.employeeService.getNamefromToken();
      this.name=mob || name
    
      this.addEmployeeRequest.name=this.name
      console.log("Mobile", this.addEmployeeRequest.name)
    })

     //Role
     this.employeeService.getRoleFromStore().subscribe(rol=>{
  
      let role=this.employeeService.getRolefromToken();
      this.role=rol || role
    
      //this.addEmployeeRequest.name=this.name
      console.log("Role", this.role)
    })

      //Role
      this.employeeService.getMobileFromStore().subscribe(mob=>{
  
        let mobileNum=this.employeeService.getMobileNumberfromToken();
        console.log("mobile number is",mobileNum)
        this.mobilenumber=mob || mobileNum
        this.addEmployeeRequest.mobilenumber=this.mobilenumber
      
       
      })





  }

  // addEmployee(){
  //   debugger
  //   this.employeeService.TempEmployeeForm(this.addEmployeeRequest).subscribe({
  //     next:(employee)=>{
        
  //       console.log(employee);
  //       this.router.navigate(['']);
  //     },error:(employee)=>{alert(employee.error.message)}
  //   }
  //   )
  // }

  //get email details
  
  getEmployeeByEmail(email:string){
    this.employeeService.GetEmpByemail(email).subscribe({
      next:(employee)=>{
        this.email=employee.email
        this.EmailLength=email.length
        console.log("Employee base data",this.EmailLength);
        //this.router.navigate(['']);
      }
    }
    )
  }


  testAddress(){

  }

  addName(){
    this.employeeService.OnAddress(this.addReg).subscribe({
      next:(employee)=>{
        console.log(employee);
        this.router.navigate(['employees']);
      }
    })
  }

//address
GetDistrict(id:string){
  this.employeeService.GetAllDistrict(id).subscribe({
       next:(employee)=>{
       
        this.Dst=employee
      this.d= this.Dst.districts;
      console.log(this.d);
   for(let i=0;i<this.d.length;i++ ){ } } })}

 ParDistrict(id:string){
  this.employeeService.GetAllParDistrict(id).subscribe({
       next:(employees)=>{

        this.parDst=employees
      this.ParD= this.parDst.districts;
      console.log(this.ParD);
   for(let i=0;i<this.ParD.length;i++ ){ } } })}


   GetThana(id:string){
    this.employeeService.GetAllThana(id).subscribe({
        next:(employees)=>{
       this.thn=employees
      this.t= this.thn.thanas;
        console.log(this.t);
        for(let i=0;i<this.t.length;i++ ){
        console.log(this.t[i].name) ;  }    }  })}

     GetparThana(id:string){
      this.employeeService.GetAllThana(id).subscribe({
          next:(employees)=>{
         this.Parthn=employees
        this.PThana= this.Parthn.thanas;
          console.log(this.PThana);
          for(let i=0;i<this.PThana.length;i++ ){
          console.log(this.PThana[i].name) ;  }    }  })}
   

 
          onFileChange(event: any): void {
            this.selectedFiles = event.target.files;
          }
 uploadImages(): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      alert('Please Upload Image.');
      return;
    }

    if (!this.productCode) {
      alert('Please provide a product code.');
      return;
    }

    this.employeeService.uploadImages(this.selectedFiles, this.productCode).subscribe(
      response => {
        console.log(response);
        //alert(response.result);
      },
      error => {
        console.error(error);
        alert('Image upload failed. Please try again.');
      }
    );
  }



//form validation

onSubmit(form: NgForm) {
   if (form.invalid) {
    console.log("form is invalid")
     return;
 }
  this.employeeService.TempEmployeeForm(this.addEmployeeRequest).subscribe({
    next:(employee)=>{
      
      console.log(employee);
      this.router.navigate(['']);
    },error:(employee)=>{alert(employee.error.message)}
  }
  )


 
 
}












}