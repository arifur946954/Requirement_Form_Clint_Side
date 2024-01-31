import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 public role:string='';
  employeList:Employee[]=[];
  getEmployeeById:Employee[]=[];
  employeeDelete:any[]=[];
  email:string='';
  


  constructor(private employeeService: EmployeeServiceService,private router:Router) { }

  ngOnInit(): void {
  //   this.employeeService.getUser()
  //   .subscribe({
  //     next:(employees)=>{
  //       console.log(employees)
  //       this.employeList=employees
  // }},)
  
    this.employeeService.GetAllEmployee()
    .subscribe({
     next:(employees)=>{
       console.log(employees)
       this.employeList=employees
     },
     error:(response)=>{console.log(response)}
    })

    this.employeeService.getEmailFromStore().subscribe(val=>{
  
      let emailFromToken=this.employeeService.getEmailnamefromToken();
      this.email=val || emailFromToken
    })

    this.employeeService.getRoleFromStore().subscribe(rol=>{
  
      let role=this.employeeService.getNamefromToken();
      this.role=rol || role
    
      //this.addEmployeeRequest.name=this.name
      console.log("Role", this.role)
    })






   }

   logout(){
    this.employeeService.signOut();
   }


   

   GetById(id: number):void{
    this.employeeService.GetEmpById(id).subscribe({
      next:(employee)=>{
        this.getEmployeeById=employee;
        console.log(employee);
       
        
      }
    })
  }
//need to add service class
  DownLoadById(id: number):void{
    this.employeeService.GetEmpById(id).subscribe({
      next:(employee)=>{
        
        console.log(employee);
        this.router.navigate(['viewEmployee']);
      }
    })
  }






  }


