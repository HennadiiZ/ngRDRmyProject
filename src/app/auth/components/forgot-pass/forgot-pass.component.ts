import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SUCCESS_MESSAGE } from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';
import { AlertService } from 'src/app/_core/services/alert.service';
import { AuthService } from '../../../_core/services/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'] 
})
export class ForgotPassComponent implements OnInit, OnDestroy {
 
  forgotPassForm!: FormGroup;
  subscription!: Subscription;
  isLoading: boolean = false;

  constructor( private authService: AuthService, public router: Router, private alertService: AlertService ){}

    ngOnInit() {
          this.forgotPassForm = new FormGroup({
              email: new FormControl('', [
                  Validators.email, 
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(100)
              ]),
          })
    }

    get email(){return this.forgotPassForm.get('email')}

    ngOnDestroy(){
        if(this.subscription) {
            this.subscription.unsubscribe()
        }
    }

    submit(){

      this.isLoading = true; 

      if(this.forgotPassForm.valid){
        const forgotPassFormData = this.forgotPassForm.value;
        console.log('forgotPassFormData = this.forgotPassForm.value:' ,forgotPassFormData)
          this.subscription = this.authService.forgotPassword(forgotPassFormData).subscribe(
            () => {
                this.router.navigate(['/auth/log-in']);
                this.isLoading = false;
                this.alertService.showAlert({
                  message: SUCCESS_MESSAGE.forgotPassword,
                  type: AlertType.Success,
                });
      
            },
            error => {
                this.isLoading = false;
                console.warn(error);
            }
        )
        this.forgotPassForm.reset()
      }  
    }

  goToLogInPage(){
      this.router.navigate(['/auth/log-in']);
  }
}