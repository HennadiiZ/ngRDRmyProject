import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ERROR_MESSAGE } from "../constants/constants";
import { AlertType } from "../enums/alert-type.enum";
import { AlertService } from "../services/alert.service";
import { AuthService } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router, 
        private alertService: AlertService
    ){}
 
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean {
     
        if (this.authService.isAuthenticated()) {    
            return true;
        } else {
            this.authService.logout();

            this.alertService.showAlert({
                message: ERROR_MESSAGE.isNotLoggedIn,
                type: AlertType.Error,
            });
            this.router.navigate(['/auth/log-in'], {
                queryParams: {
                    returnUrl: state.url
                }
            });

            return false
        }
    }
}
