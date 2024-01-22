import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import formValidate from '../../Helper/FormValidate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private employeeService:EmployeeServiceService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:[' ',Validators.required],
      password:[' ',Validators.required],
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
console.log(this.loginForm.value);
this.employeeService.login(this.loginForm.value)

.subscribe({next:(res)=>{
  //this.employeeService.StoreToken(res.token)
  //alert(res.message);

  this.loginForm.reset();
  this.employeeService.StoreToken(res.token);
  let tokenPayload=this.employeeService.decodeToken();
  this.employeeService.setEmailFromStore(tokenPayload.email);
  this.router.navigate(['empapply'])
},
error:(err)=>{alert(err.error.message)}
})

    }
    
    else{
      console.log("form is not valid");
    //formValidate.validateFormFields(this.loginForm);
    formValidate.validateFormFields(this.loginForm);
  alert("your form is invalid");

    }
 }










 

}
