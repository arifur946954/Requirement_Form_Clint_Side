import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Component/Register_Login/register/register.component';
import { LoginComponent } from './Component/Register_Login/login/login.component';
import { AddFormComponent } from './Component/Employee/add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './Component/Employee/Tamplete/add-employee/add-employee.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { AddImageComponent } from './Component/Employee/Image_CV/Image/add-image/add-image.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ViewEmployeeComponent } from './Component/Admin/view-employee/view-employee.component';
import { HomeComponent } from './Component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddFormComponent,
    AddEmployeeComponent,
    AdminComponent,
    AddImageComponent,
    ViewEmployeeComponent,
    HomeComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true,
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
