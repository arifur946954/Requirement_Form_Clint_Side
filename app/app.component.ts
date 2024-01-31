import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeServiceService } from './service/employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public role:string='';
 
  constructor(private employeeService: EmployeeServiceService) { }
  onSubmit(form: NgForm) {
    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
}
//this is for test
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
 