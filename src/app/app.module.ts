
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';

import { MaterialModule } from './material/material.module';
import { JwtInterceptor } from './_core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_core/interceptors/error.interceptor';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ForAdminsComponent } from './shared/hasRoleComponents/for-admins/for-admins.component';
import { ForUsersComponent } from './shared/hasRoleComponents/for-users/for-users.component';

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
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    AdminComponent,
    // ForAdminsComponent,
    // ForUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({      
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    })
  ],
  providers: [
    INTERCEPTOR_ERRORS,
    INTERCEPTOR_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
