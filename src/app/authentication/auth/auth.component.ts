import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AuthInterface, AuthService } from '../auth.service';
import { Observable } from 'rxjs';

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
    if (!form.valid){
      return
    }
    let authObs : Observable<AuthInterface>
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;
    if (this.isLoggedIn){
     authObs= this.authService.signIn(email,password)
    }
    else{
      authObs=this.authService.signup(email,password)
    }

    authObs.subscribe(
      data=>{
        console.log(data);
        this.isLoading=false;
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error=errorMessage
        this.isLoading=false;
      }
    )
    form.reset()
  }
}
