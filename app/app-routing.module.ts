import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Register_Login/login/login.component';
import { RegisterComponent } from './Component/Register_Login/register/register.component';
import { AddFormComponent } from './Component/Employee/add-form/add-form.component';
import { AddEmployeeComponent } from './Component/Employee/Tamplete/add-employee/add-employee.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { AddImageComponent } from './Component/Employee/Image_CV/Image/add-image/add-image.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewEmployeeComponent } from './Component/Admin/view-employee/view-employee.component';

const routes: Routes = [
  
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"apply",
    component:AddFormComponent
  },
  {
    path:"empapply",
    component:AddEmployeeComponent
  },
  {
    path:"admin",
    component:AdminComponent,canActivate:[AuthGuard]
  },
  {
    path:"iamge",
    component:AddImageComponent
  },
  {
    path:"admin/view/:id",//dinamically change the id  "admin/view/:id/:name/:please"
    component:ViewEmployeeComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
