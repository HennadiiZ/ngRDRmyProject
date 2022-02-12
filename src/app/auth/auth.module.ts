import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthService } from '../_core/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../_core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_core/interceptors/jwt.interceptor';
import { HasRoleDirective } from '../_core/directives/has-role.directive';
import { ErrorInterceptor } from '../_core/interceptors/error.interceptor';
import { AdminComponent } from '../admin/admin.component';
import { AdminGuard } from '../_core/guards/admin.guard';
import { FormGuard } from '../_core/guards/form.guard';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { TodoComponent } from './todo/todo.component';
import { ForAdminsComponent } from '../shared/hasRoleComponents/for-admins/for-admins.component';
import { ForUsersComponent } from '../shared/hasRoleComponents/for-users/for-users.component';

const INTERCEPTOR_PROVIDERS: Provider = { 
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor, 
    multi: true 
  }
const INTERCEPTOR_ERRORS: Provider = { 
    provide: HTTP_INTERCEPTORS, 
    useClass: ErrorInterceptor, 
    multi: true 
}
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AuthLayoutComponent, children: [
                    {path: '', redirectTo: '/auth/log-in', pathMatch: 'full'}, 
                    {path: 'sign-up', component: SignUpFormComponent, canActivate: [FormGuard]},
                    {path: 'log-in', component: LogInFormComponent, canActivate: [FormGuard]},
                    {path: 'forgot-pass', component: ForgotPassComponent, canActivate: [FormGuard]},
                    {path: 'page-one', component: PageOneComponent, canActivate: [AuthGuard]}, 
                    {path: 'page-two', component: PageTwoComponent, canActivate: [AuthGuard]}, 
                    {path: 'error-page', component: ErrorPageComponent },
                    {path: 'admin-page', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
                    {path: '**', redirectTo: '/error-page' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers:[
        AuthGuard, 
        AuthService, 
        INTERCEPTOR_ERRORS,
        INTERCEPTOR_PROVIDERS
    ],
    declarations: [
    AuthLayoutComponent,
    LogInFormComponent,
    SignUpFormComponent,
    ForgotPassComponent,
    PageOneComponent,
    PageTwoComponent,
    ErrorPageComponent,
    HasRoleDirective,
    LoadingSpinnerComponent,
    ModalComponent,
    TodoComponent,
    ForAdminsComponent,
    ForUsersComponent,
  ]
})

export class AuthModule {}