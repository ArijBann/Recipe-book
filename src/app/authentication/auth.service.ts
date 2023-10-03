import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthInterface{
    idToken	: string,
    email	: string,
    refreshToken	:   string;
    expire :  string
    identifiantlocal : string
    inscrit?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http:HttpClient){}

    signup(email:string,password:string){
       return this.http.post<AuthInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt5ihC-dYn5BBqI8LrTpSe86kmhY9hx2k',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(
            catchError(this.ErrorHandler)
        )
    }

    signIn(email: string, password: string) {
  return this.http.post<AuthInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt5ihC-dYn5BBqI8LrTpSe86kmhY9hx2k', {
    email: email,
    password: password,
    returnSecureToken: true
  }).pipe(
    catchError(this.ErrorHandler)
  )
}
private ErrorHandler(errorRes:HttpErrorResponse){
    console.log(errorRes);
    
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
        case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'Email or password not correct'; // Updated error message
        break; 
        case 'EMAIL_EXISTS':
            errorMessage='Email address already exists'
        break;
    }
    return throwError(errorMessage);
  
}
}