import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  selectedFiles: FileList | null = null;
  productCode: string = '';

  constructor(private employeeServide:EmployeeServiceService) { }

  ngOnInit(): void {
  }

  // onFileChange(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  // uploadImages(): void {
  //   if (!this.selectedFiles || this.selectedFiles.length === 0) {
  //     alert('Please select at least one file.');
  //     return;
  //   }

    // const formData = new FormData();
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   formData.append('fileCollection', this.selectedFiles[i], this.selectedFiles[i].name);
    // }

    // this.employeeServide.uploadImages(formData).subscribe(
    //   response => {
    //     console.log(response);
    //     alert(response.result);
    //   },
    //   error => {
    //     console.error(error);
    //     alert('Image upload failed. Please try again.');
    //   }
    // );
  //}


  // onFileChange(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  // uploadImages(): void {
  //   if (!this.selectedFiles || this.selectedFiles.length === 0) {
  //     alert('Please select at least one file.');
  //     return;
  //   }

  //   if (!this.productCode) {
  //     alert('Please provide a product code.');
  //     return;
  //   }

  //   this.employeeServide.uploadImages(this.selectedFiles, this.productCode).subscribe(
  //     response => {
  //       console.log(response);
  //       alert(response.result);
  //     },
  //     error => {
  //       console.error(error);
  //       alert('Image upload failed. Please try again.');
  //     }
  //   );
  // }




}
