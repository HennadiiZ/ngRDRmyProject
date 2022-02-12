import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterUser } from 'src/app/shared/interfaces';
import { SUCCESS_MESSAGE } from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';
import { AlertService } from 'src/app/_core/services/alert.service';
import { ModalService } from 'src/app/_core/services/modal.service';
import { AuthService } from '../../../_core/services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription!: Subscription;
  isLoading: boolean = false;

  constructor( public router: Router, private authService: AuthService, private modalService: ModalService, private alertService: AlertService ){}

  ngOnInit() {
      this.form = new FormGroup({
        firstname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]  ),
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$')] ),
        confirm_password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$')]) 
      },
      {
        validators: this.MustMatch('password', 'confirm_password')
      })
  }

  //confirmPassword:
  MustMatch(controlName: string, matchingControlName: string):any{
            return (formGroup: FormGroup)=>{
                const control = formGroup.controls[controlName];
                const matchingControl = formGroup.controls[matchingControlName];
                if(matchingControl.errors && !matchingControl.errors['MustMatch']){
                  return
                }
                if(control.value !== matchingControl.value){
                  matchingControl.setErrors({MustMatch: true})
                }else{
                  matchingControl.setErrors(null);
                }
            }
  }
 
  get firstname () {return this.form.get('firstname')}
  get lastname () {return this.form.get('lastname')}
  get email () {return this.form.get('email')}
  get password() { return this.form.get('password'); }
  get confirm_password() { return this.form.get('confirm_password');}

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  submit(){

    this.isLoading = true;

    if(this.form.valid){
      console.log('formData = this.form.value:',this.form.value)

        const  registerUser: RegisterUser = {
            ...this.form.value,
            stack_id: 1,
            level_id: 1
        }

        this.subscription = this.authService.signUp(registerUser).subscribe(
            () =>{
              this.modalService.open();
              //this.router.navigate(['/auth/page-one'])
              this.alertService.showAlert({
                message: SUCCESS_MESSAGE.register,
                type: AlertType.Success,
              });
    
              this.form.reset()
              this.resetFormControl()
              this.isLoading = false;
            },
            (error: any) => {
              this.isLoading = false;
              console.error("THE Error is", error);
            }
        )
    } 
  }

  private resetFormControl(){
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null)
    })
  }

  goToLogInPage(){
    this.router.navigate(['/auth/log-in']);
  }

}
