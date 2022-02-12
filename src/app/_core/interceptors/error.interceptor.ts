import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { AlertService } from "../services/alert.service";
import { ERROR_MESSAGE } from "../constants/constants";
import { AlertType } from "../enums/alert-type.enum";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private alertService: AlertService){}

    intercept(request: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
      return next.handle(request)
      .pipe(
        catchError((error) => {
            switch(error.status){
                case +'400':
                    console.log('400 ERROR. Your client has issued a malformed or illegal request.');
                    //this.toastr.error('400 ERROR. Your client has issued a malformed or illegal request.');
                    this.alertService.showAlert({
                        message: ERROR_MESSAGE.is400,
                        type: AlertType.Error,
                    });
                    break;
                case +'401':
                    console.log('401 Unauthorized: Acces is denied due to invalid credentials.');
                    //this.toastr.error('401 Unauthorized: Acces is denied due to invalid credentials.');
                    this.alertService.showAlert({
                        message: ERROR_MESSAGE.is401,
                        type: AlertType.Error,
                    });
                    break;
                case +'422':
                    console.log('422 ERROR. Check your credentials and try again.');
                    // this.toastr.error('422 ERROR. Check your credentials and try again.');
                    this.alertService.showAlert({
                        message: ERROR_MESSAGE.is422,
                        type: AlertType.Error,
                    });
                    break;    
            }

            return throwError(error)
        })
      );
    }
}
  