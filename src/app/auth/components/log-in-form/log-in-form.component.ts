import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser } from 'src/app/shared/interfaces';
import { StorageService } from 'src/app/_core/services/storage.service';
import { AuthService } from '../../../_core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/_core/services/alert.service';
import { SUCCESS_MESSAGE } from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit, OnDestroy {

  logInForm!: FormGroup;
  rememberMeForm!: FormGroup;
  subscription!: Subscription;
  user!: LoginUser;
  rememberMe!: any
  returnUrl: any;
  isLoading: boolean = false;
  
  constructor(
      private route: ActivatedRoute,
      public auth: AuthService,
      public storageService: StorageService, 
      private router: Router,
      private toastr: ToastrService,
      private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      username: new FormControl('', [
        Validators.email, 
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(100)
      ]), 
    });

    this.rememberMeForm = new FormGroup({
      checkbox: new FormControl(true)
    });
 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/page-one';
  }
    
  get username() {return this.logInForm.get('username')}
  get password() {return this.logInForm.get('password')}
  get checkbox() {return this.rememberMeForm.get('checkbox')}
  
  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  submit(){
    this.isLoading = true;

    if(this.logInForm.value){ 
      this.user = this.logInForm.value;
      this.rememberMe = this.rememberMeForm.value.checkbox;
      this.subscription = this.auth.login(
          this.user,
          this.rememberMe
      ).subscribe(
        ()=>{
          this.router.navigateByUrl(this.returnUrl)
          this.isLoading = false;

          this.alertService.showAlert({
            message: SUCCESS_MESSAGE.login,
            type: AlertType.Success,
          });

      },
        (error: any) => {
          this.isLoading = false;
          console.error("THE Error is", error);
        }
      )
      this.logInForm.reset()
    } 
  }

  goToForgotPass(){
    this.router.navigate(['/auth/forgot-pass']);
  }
  goToSignUpPage(){
    this.router.navigate(['/auth/sign-up']);
  }

}
