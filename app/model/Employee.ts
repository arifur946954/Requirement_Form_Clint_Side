import { ParmanentAddress } from "./ParmanentAddress";
import { accademicQualification } from "./accademicQulification";
import { experience } from "./experience";
import { presentAddress } from "./presentAddress";

export interface Employee{
    employeeId:number;
    mobilenumber:string;
    name:string;
    fathername:string;
    mothername:string;
    nid:string;
    dateofbirthd:any;
    birthplace:string;
    religion:string;
    bloodgroup:string;
    gender:string;

    maritalstatus:string;
    spousename:string;
    email:string;
    interviewdate:any;
    appliedpost:string;
    probablyjoiningdate:any;
    expectedselery:any;
    appliedby:string;

    accademicqulifications:accademicQualification[];

    experiences:experience[];
    presentaddresses:presentAddress[];
    parmanentaddresses:ParmanentAddress[];

 
}