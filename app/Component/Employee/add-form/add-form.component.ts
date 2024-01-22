import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import formValidate from '../../Helper/FormValidate';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  EmployeeForm!: FormGroup;
  submitted = false;
  maritalStatusOptions: any = ['Married', 'Unmarried']

  constructor(private fb:FormBuilder, private employeeService:EmployeeServiceService, private router:Router) { }

  ngOnInit(): void {
    this.EmployeeForm=this.fb.group({
      mobilenumber:['', [Validators.required, Validators.minLength(11)]],
      name:['', [Validators.required]],
      fathername:['', [Validators.required]],
      mothername:['', [Validators.required]],
      nid:['', [Validators.required]],
      dateofbirthd:['', [Validators.required]],
      birthplace:['', [Validators.required]],
      religion:['', [Validators.required]],
      bloodgroup:['', [Validators.required]],
      gender:['', [Validators.required]],
      maritalstatus:['', [Validators.required]],
      spousename:['', [Validators.required]],
      email:['', [Validators.required]],
      // interviewdate:['', [Validators.required]],
      // appliedpost:['', [Validators.required]],
      // probablyjoiningdate:['', [Validators.required]],
      // expectedselery:['', [Validators.required]],
      // appliedby:['', [Validators.required]],

      //accademicqulifications: this.fb.array([this.createAcademicQualification()]),
      //experiences: this.fb.array([this.createExperience()]),
      //parmanentaddresses: this.fb.array([this.createParmanentAddress()]),
      presentaddresses: this.fb.array([this.createPresentAddress()])
     


     






      // accademicqulifications:this.fb.group({
      //   degree:['', [Validators.required]],
      //   board:['', [Validators.required]],
      //   instution:['', [Validators.required]],
      //   major:['', [Validators.required]],
      //   result:['', [Validators.required]],
      //   passingyear:['', [Validators.required]]
     

      // }),

      // experiences:this.fb.group({
      //   post:['', [Validators.required]],
      //   organization:['', [Validators.required]],
      //   joblocation:['', [Validators.required]],
      //   selery:['', [Validators.required]],
      //   reportingto:['', [Validators.required]],
      //   defaultproduct:['', [Validators.required]],
      //  }),

      //  parmanentaddresses:this.fb.group({
      //   division:['', [Validators.required]],
      //   district:['', [Validators.required]],
      //   thana:['', [Validators.required]],
      //   postoffice:['', [Validators.required]],
      //   village:['', [Validators.required]]
      //  }),

       //presentaddresses:this.fb.group({
        //ivision:['', [Validators.required]],
        // district:['', [Validators.required]],
        // thana:['', [Validators.required]],
        // postoffice:['', [Validators.required]],
        // village:['', [Validators.required]]
       //}),
   
      
    })
  }

 
  // Access formcontrols getter
 

  createPresentAddress(): FormGroup {
    return this.fb.group({
      division: ['', Validators.required],
      district: ['', Validators.required]
    });
  }
 

  

  


  AddEmployee(){
    if(this.EmployeeForm.valid){
      const registerData:Employee=this.EmployeeForm.value
console.log(registerData);
this.employeeService.EmployeeForm(registerData)
.subscribe({next:(res)=>{
  alert(res.message)
  //this.router.navigate(['employees/register'])
},
error:(err)=>{alert(err.error.message)}
})

    }
    
    else{
      console.log("form is not valid");
    //formValidate.validateFormFields(this.loginForm);
    formValidate.validateFormFields(this.EmployeeForm);
  alert("your form is invalid");

    }
 }


//  addPresentAddress() {
//   const presentaddresses = this.EmployeeForm.get('presentaddresses') as FormArray;
//   presentaddresses.push(this.createPresentAddress());
// }



}
