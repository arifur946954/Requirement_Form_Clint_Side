import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {jsPDF} from "jspdf"
import * as jspdf from 'jspdf'
import 'jspdf-autotable';

import autoTable,{Column, UserOptions} from 'jspdf-autotable';
import { Employee } from 'src/app/model/Employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  qualificationTypes = ['SSC', 'HSC', 'Bachelor', 'Master', 'PhD'];
  course:any;
  imageIds: any[] = [];
  baseUrl = 'https://localhost:7099/api/Image/DbDownloadImages/';
  presentAddress:any=[];
  WorkExperience:any=[];
  parmanentAddress:any=[];
  AccademicQulification:any[]=[];
  courseId:any;
  mobile:any={
    size: 'small'
  };
  addEmployeeRequest:Employee={
    employeeId:0,
    mobilenumber:'',
    name:'',
    fathername:' ',
    mothername:'',
    nid:'',
    dateofbirthd:new Date,
    birthplace:'',
    religion:'',
    bloodgroup:'',
    gender:'',
    maritalstatus:'',
    spousename:'',
    email:'',
    interviewdate:new Date,
    appliedpost:'',
    probablyjoiningdate:new Date,
    expectedselery:0,
    appliedby:'',
   



  accademicqulifications:[
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:0,passingyear:0,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:0,passingyear:0,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:0,passingyear:0,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:0,passingyear:0,employeeId:0},
  {accQlfId:0, degree:'',  board:'', instution:'',major:'',result:0,passingyear:0,employeeId:0},

  ],
  experiences:[
    {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
     {expId:0, post:'',organization:'',joblocation:'',selery:0,reportingto:'',defaultproduct:'',employeeId:0},
  ],
  presentaddresses:[
     {presentAddId:0, division:'',district:'',thana:'',postoffice:'',village:'',password:'',employeeId:0},
  ],
  parmanentaddresses:[
    {parmanentAddId:0, division:'',district:'',thana:'',postoffice:'',village:'',password:'',employeeId:0},
 ],
   


  }

  constructor(private employeeServide:EmployeeServiceService,private router:ActivatedRoute) { }
  @ViewChild('content',{static:false})el!:ElementRef


    makePDF(){
      // present address

      for(let i=0;i<this.addEmployeeRequest.presentaddresses.length;i++){
      
        const presentAddress = this.addEmployeeRequest.presentaddresses[i];
        this.presentAddress=[],
        this.presentAddress.push(
          
         "Present Address",
          presentAddress.division,
          presentAddress.district,
          presentAddress.thana,
          presentAddress.postoffice,
          presentAddress.village,
        );
        console.log( "test", this.presentAddress);
}

//Parmanent address 
for(let i=0;i<this.addEmployeeRequest.parmanentaddresses.length;i++){

const parmanentAddress = this.addEmployeeRequest.parmanentaddresses[i];
this.parmanentAddress.push(
"Parmanent Address",
parmanentAddress.division,
parmanentAddress.district,
parmanentAddress.thana,
parmanentAddress.postoffice,
parmanentAddress.village,
);
}

//accademic Qulification
for (let i = 0; i < this.addEmployeeRequest.accademicqulifications.length; i++) {
  
  const accQlf = this.addEmployeeRequest.accademicqulifications[i];
 this.AccademicQulification.push([
   this.qualificationTypes[i],
    accQlf.degree,
    accQlf.board,
    accQlf.instution,
    accQlf.major,
    accQlf.result,
    accQlf.passingyear,
  ]);

}
//work experience start here
for (let i = 0; i < this.addEmployeeRequest.experiences.length; i++) {
  const WorkExperience = this.addEmployeeRequest.experiences[i];
  this.WorkExperience.push([
   WorkExperience.post,
   WorkExperience.organization,
   WorkExperience.joblocation,
   WorkExperience.selery,
   WorkExperience.reportingto,
   WorkExperience.defaultproduct,
  ]);

}



      this.courseId=this.router.snapshot.paramMap.get('id');
      //retrive mobile number 
      this.mobile=this.router.snapshot.paramMap.get('mobile');
   
      this.employeeServide.GetEmpById(this.courseId)
      .subscribe({
        next:(employees)=>{
       this.addEmployeeRequest=employees
          console.log(this.addEmployeeRequest)
        },
        error:(response)=>{console.log(response)}
       })
       //retrive iumage
       this.employeeServide.getImageIds(this.mobile)







      let pdf=new jsPDF('p','pt','a4');
      autoTable(pdf, {
        body:[
          [ {content: "Resume Of\n"+this.addEmployeeRequest.name,  styles: { halign: 'center',cellWidth: 'wrap', fontSize: 20,fontStyle: 'bold'} }],
          [ {content: "Name: "+this.addEmployeeRequest.name,  styles: { halign: 'left',cellWidth: 'wrap'} },
          
          // {content:this.addEmployeeRequest.accademicqulifications[0].board}
        
        ],

          [ {content: "Mobile Number :"+this.addEmployeeRequest.mobilenumber,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Father Name: "+this.addEmployeeRequest.fathername,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Mother Name: "+this.addEmployeeRequest.mothername,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "NID: "+this.addEmployeeRequest.nid,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Date Of Birth: "+this.addEmployeeRequest.dateofbirthd,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "MBirth Place: "+this.addEmployeeRequest.birthplace,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Religion: "+this.addEmployeeRequest.religion,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Blood Group: "+this.addEmployeeRequest.bloodgroup,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Gender: "+this.addEmployeeRequest.gender,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Maritial Status: "+this.addEmployeeRequest.maritalstatus,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Spouse Number: "+this.addEmployeeRequest.spousename,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Email: "+this.addEmployeeRequest.email,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Interview Date: "+this.addEmployeeRequest.interviewdate,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Applied Post: "+this.addEmployeeRequest.appliedpost,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Probably Joining Date: "+this.addEmployeeRequest.probablyjoiningdate,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Expected Selery: "+this.addEmployeeRequest.expectedselery,  styles: { halign: 'left',cellWidth: 'wrap'} }],
          [ {content: "Applied by: "+this.addEmployeeRequest.appliedby,  styles: { halign: 'left',cellWidth: 'wrap'} }],
 ],})
       


// 2nd table start Present Address
autoTable(pdf,{
  head:[["Address Details"]],
})
        autoTable(pdf, {
       
          head: [['Address','Division','District','Thana','Post Office','Village']],
          body:[this.presentAddress,this.parmanentAddress],
          
          

          headStyles: {
            lineWidth: 0.3,
            lineColor: [0, 0, 0],
        
           
            fontSize: 12,
            halign: 'center',
            cellPadding: 5,
          },

          bodyStyles:{
           
            lineWidth: 0.3,
            lineColor: [0, 0, 0],
            fontSize: 8,
            halign: 'center'
          },
    
          theme: 'plain',
          margin: {
            top: 2,
            left: 40
          },
      
         
 })





 autoTable(pdf,{
  head:[["Accademic Qulification"]],
})
// Accademic Qulificatio table end
autoTable(pdf, {
  head: [['Accademic','Degree','Board','Instition','Major','Result','passing Year']],
  body:this.AccademicQulification,
  

  headStyles: {
    lineWidth: 0.3,
    lineColor: [0, 0, 0],
     fontSize: 12,
    halign: 'center',
    cellPadding: 5,
  },

  bodyStyles:{
   lineWidth: 0.3,
    lineColor: [0, 0, 0],
    fontSize: 8,
    halign: 'center'
  },

  theme: 'plain',
  margin: {
    top: 2,
    left: 40
  },

 
})

autoTable(pdf,{
  head:[["Work Experience"]],
})
//work experience added here
autoTable(pdf, {
  head: [['Post','Organization','Job Location','Selery','Reporting To','Default Product']],
  body:this.WorkExperience,
  

  headStyles: {
    lineWidth: 0.3,
    lineColor: [0, 0, 0],
     fontSize: 12,
    halign: 'center',
    cellPadding: 5,
  },

  bodyStyles:{
   lineWidth: 0.3,
    lineColor: [0, 0, 0],
    fontSize: 8,
    halign: 'center'
  },

  theme: 'plain',
  margin: {
    top: 2,
    left: 40
  },

 
})


        autoTable(pdf, {
            bodyStyles: {
              lineWidth: 0.3,
              lineColor: [0, 0, 0],
              fontSize: 12,
              cellPadding: 0.5,
              overflow: 'visible',
              // cellWidth: 'wrap',
              // cellWidth:'auto'
      
      
            },
            // startY: 432,
            startY: 400,
            theme: 'plain',
            margin: {
      
              left: 2,
              right: 2
            },
      
          })




        pdf.output('dataurlnewwindow')
        pdf.save(`${this.addEmployeeRequest.name}.pdf`)
    
      }



  ngOnInit(): void {
    this.loadImageIds();
    this.courseId=this.router.snapshot.paramMap.get('id');
    this.mobile=this.router.snapshot.paramMap.get('mobile');
    
    
  
    this.employeeServide.GetEmpById(this.courseId)
    .subscribe({
      next:(employees)=>{
       
        this.addEmployeeRequest=employees
        console.log(this.addEmployeeRequest)
      },
      error:(response)=>{console.log(response)}
     })
    
  }



  loadImageIds(): void {
 

    // Assuming your API provides an endpoint to get a list of image ids
    this.mobile=this.router.snapshot.paramMap.get('mobile');
 
    this.employeeServide.getImageIds(this.mobile).subscribe(
      {
        next:(employees)=>{
         this.mobile=employees
         console.log("test")
         
        },
        error:(response)=>{console.log(response)}
       }
    );
  }

  getImageUrl(mobile: any): string {
    debugger
    return `${this.baseUrl}${mobile}`;
   
  
  }












}
