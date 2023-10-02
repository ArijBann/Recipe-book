import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthService){}
  isLoggedIn: boolean = true;
  isLoading: boolean = false;
  error:string=null;

  switchMode(){
    this.isLoggedIn=!this.isLoggedIn;
  }

  authSubmit(form : NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;
    if (this.isLoggedIn){}else{
      
      this.authService.signup(email,password).subscribe(
        data=>{
          console.log(data);
          this.isLoading=false;
        },
        errorMessage=>{
          this.error=errorMessage;
          this.isLoading=false;
        }
      )
    }
    form.reset()
  }
}
