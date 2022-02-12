import { environment } from 'src/environments/environment';
import { UserRoles } from '../enums/user-role.enum';


export const LOG_IN_URL =`${environment.apiUrl}/auth/sign-in`;
export const SIGN_UP_URL = `${environment.apiUrl}/auth/sign-up`;
export const FORGOT_PASSWORD_URL = `${environment.apiUrl}/auth/forgot-password`;
export const USER_ME_URL =  `${environment.apiUrl}/user/me`;
export const LOG_OUT_URL = `${environment.apiUrl}/auth/sign-out`;

export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$/ ;


export const SUCCESS_MESSAGE = {
    login: 'You are now logged in.',
    register: 'Success! Please check your inbox and follow the link...',
    forgotPassword: 'New password has been sent to your email. Please check your inbox.',
};
  
  export const ERROR_MESSAGE = {
    access: 'Access denied.',
    isNotLoggedIn: "Please logg in first...",
    isLoggedIn: "You're already logged in.",
    is400: '400 ERROR. Your client has issued a malformed or illegal request.',
    is401: '401 Unauthorized: Acces is denied due to invalid credentials.',
    is422: '422 ERROR. Check your credentials and try again.',
  };
  
  export const WARNING_MESSAGE = {
    
  };
  
  export const TOASTR_CONFIG = {
    timeOut: 5000,
    positionClass: 'toast-top-left',
    preventDuplicates: true,
    includeTitleDuplicates: true,
    maxOpened: 7,
    newestOnTop: false,
    closeButton: true,
  };
  