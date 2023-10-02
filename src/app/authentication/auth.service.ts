import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthInterface{
    idToken	: string,
    email	: string,
    refreshToken	:   string;
    expire :  string
    identifiantlocal : string
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
            catchError(errorRes=>{
                let errorMessage='An unknown error occurred';
                if(!errorRes.error||!errorRes.error.error){
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage='Email address already exists'
                }
                return throwError(errorMessage);
            })
        )
    }
}