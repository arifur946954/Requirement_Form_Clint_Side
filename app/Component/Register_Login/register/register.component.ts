import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import formValidate from '../../Helper/FormValidate';
import { Register } from 'src/app/model/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  // registerForm: FormGroup = new FormGroup({
  //   password: new FormControl(''),
  //   mobilenumber:new FormControl('')
  // })
    submitted = false;
    registrationData: any = {};

  constructor(private fb:FormBuilder, 
    //private registerDataService: RegisterDataService,
    private employeeService:EmployeeServiceService,
     private router:Router) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      mobilenumber:['', [Validators.required, Validators.minLength(11)]],
      name:['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    })
  }

  

  get f():{[key: string]: AbstractControl} { return this.registerForm.controls; }

  onRegister(){
    // if(this.registerForm.valid){}
    if(this.registerForm){
      const registerData:Register=this.registerForm.value
      //this.registerDataService.setRegisterData(registerData);//exttra

console.log(registerData);
this.employeeService.register(registerData)
.subscribe({next:(res)=>{
  //alert(res.message)
  this.router.navigate(['login'])
},
error:(err)=>{alert(err.error.message)}
})

    }
    
    else{
      console.log("form is not valid");
    //formValidate.validateFormFields(this.loginForm);
    formValidate.validateFormFields(this.registerForm);
  alert("your form is invalid");

    }
 }

//extra
submitRegistration(): void {
  // Handle registration logic
  this.employeeService.storeRegistrationData(this.registrationData);
}


 














}
