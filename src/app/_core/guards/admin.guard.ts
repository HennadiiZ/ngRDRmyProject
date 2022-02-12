
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { ToastrService } from 'ngx-toastr';
import { AlertService } from "../services/alert.service";
import { ERROR_MESSAGE } from "../constants/constants";
import { AlertType } from "../enums/alert-type.enum";

@Injectable({providedIn: 'root'})

export class AdminGuard implements CanActivate{

    constructor(
        private router: Router,
        private userIdentity: UsersService, 
        private authService: AuthService,
        private toastr: ToastrService,
        private alertService: AlertService
    ){}
 
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean {

        return this.userIdentity.getUser().pipe(
            map((user: User) => {

                if (!user.isAdmin) {
                  this.router.navigate(['/auth/error-page'], {
                    queryParams: { returnUrl: state.url },
                });
                //this.toastr.error('You don’t have access here');
                this.alertService.showAlert({
                    message: ERROR_MESSAGE.access,
                    type: AlertType.Error,
                });
                }

                if (!user.isActive) {
                    this.router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: state.url },
                    });
                }

                if (!user) {
                    this.router.navigate(['/auth/login'], {
                        queryParams: { returnUrl: state.url },
                    });
                }

                if (!this.authService.isAuthenticated()) {
                    this.router.navigate(['/auth/login'], {
                        queryParams: { returnUrl: state.url },
                    });
                }
        
                return user.isAdmin;
            })
        )
    
    }
}