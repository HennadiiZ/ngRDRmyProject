import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {  RegisterUser, ResetPassword, ResponseBody, LoginUser } from 'src/app/shared/interfaces'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { catchError, map, tap } from 'rxjs/operators'
import { StorageService } from './storage.service'
import { Router } from '@angular/router'
import { UsersService } from './users.service'
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class AuthService {

    private accountSubject!: BehaviorSubject<ResponseBody>; 
    public account!: Observable<ResponseBody>; 

    constructor( 
        private http: HttpClient, 
        private storageService: StorageService, 
        private router: Router,
        private userService: UsersService, 
        private toastr: ToastrService,
    ){
        this.accountSubject = new BehaviorSubject<ResponseBody>(null as any);  
        this.account = this.accountSubject.asObservable(); 
    }

    isAuthenticated(): boolean {
        return !!this.storageService.getTokenValue();
    }

    signUp(registerUser: RegisterUser): Observable<RegisterUser[]>{
        return this.http.post<any>(`${environment.apiUrl}/auth/sign-up`, registerUser)
        .pipe(map(account => {
            //this.toastr.success('Success! Please check your inbox and follow the link...');
                return account;
            }));
    }
    forgotPassword(email: ResetPassword): Observable<null>{
        //this.toastr.success('New password has been sent to your email. Please check your inbox.');
        return this.http.post<null>(`${environment.apiUrl}/auth/forgot-password`, email);
    }
    logout(): Observable<any>{
        this.storageService.removeToken();
        this.accountSubject.next(null as any);
        this.stopRefreshTokenTimer();
        return this.http.get<string>(`${environment.apiUrl}/auth/sign-out`);
    }

    login(user: LoginUser, rememberMe: boolean): Observable<any>{ 
        return this.http.post<any>(`${environment.apiUrl}/auth/sign-in`, user, )
        .pipe( 
            map(account => {
                // this.toastr.success('You are now logged in.');
                    this.accountSubject.next(account); 
                    this.startRefreshTokenTimer();
                    return account;
                }),    
            tap((data: any) => {
                  const { access_token: tokenValue, toke_type: tokenType } = data;
                
                if (rememberMe) {
                    this.storageService.setLocalItem({ tokenValue, tokenType });    
                } else {
                    this.storageService.setSessionItem({ tokenValue, tokenType });
                }

            })
        );
    } 

    public get tokenValue(): ResponseBody {
         return this.accountSubject.getValue();
    }

    refreshToken(): Observable<ResponseBody>{
        console.log(this.tokenValue)
        return this.http.post<ResponseBody>(`${environment.apiUrl}/auth/refresh`, 
        {}, 
           { params: {r_token: this.tokenValue.refresh_token}})
            .pipe(
                map((val) => {

                    val = {...this.tokenValue, ...val}

                    this.userService.userSubject.next(val);
                    
                    if(localStorage.getItem('token')){
                        this.storageService.setLocalItem(val)
                    }
                    if(sessionStorage.getItem('token')){
                        this.storageService.setSessionItem(val)
                    }

                    this.accountSubject.next(val);
                    this.startRefreshTokenTimer();
                    return val;
                },
                catchError((error: HttpErrorResponse)=>{
                    console.log(error)
                    return throwError(error)
                })
            ));
    }

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        const jwtToken: ResponseBody = this.tokenValue;
        const timeout = +jwtToken.expires_in * 1000 - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(),timeout);
    }
    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}
