import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public role:string='';
 
  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeService.getRoleFromStore().subscribe(rol=>{
  
      let role=this.employeeService.getRolefromToken();
      this.role=rol || role
    
      //this.addEmployeeRequest.name=this.name
      console.log("Role", this.role)
    })
  }


  AdminForm(): void {

    this.employeeService.getRoleFromStore().subscribe(rol=>{
    
      let role=this.employeeService.getRolefromToken();
      this.role=rol || role
    
      //this.addEmployeeRequest.name=this.name
      console.log("Role", this.role)
    })
  }
  





  logout(){
    this.employeeService.signOut();
   }
    title = 'Requirement';
  }




