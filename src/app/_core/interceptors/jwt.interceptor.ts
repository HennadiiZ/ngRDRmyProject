import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router, private storageService: StorageService){}
  
    intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{

    req.url.startsWith(`${environment.apiUrl}/user/me`);

        const token = this.storageService.getTokenValue();
        if (token && token.tokenValue) {
            const { tokenType, tokenValue } = token;
            req = req.clone({
                setHeaders: { 'Authorization': `${tokenType} ${tokenValue}` },
            });
            return next.handle(req)
            .pipe(
            tap(()=>{
                console.log('this is req:',req) 
            }),
            catchError((error: HttpErrorResponse)=>{
                if(error.status === 401){
                    this.authService.logout()
                    this.router.navigate(['/auth', 'log-in'], {
                        queryParams: {
                            authFailed: true
                        }
                    })
                }
                return throwError(error)
            })
            )
        }
        return next.handle(req)
       
    }
}
  
