This is my project and I moved it from GitLab.


1. Pull the main branch from the repository ✅  
2. Create your own branch using this name mask: "feature/your-name-home-work". Replace "your-name" with your short name ✅  
3. Create the main module and connect it to the main module. Look at the screenshots of what structure you need to have. The main module should have a root route. ✅  (app-routing.module.ts) ✅
4. Create your auth module and connect it to the main module. Look to the screenshots of what structure you need to have  ✅ 
5. Add correct routing for auth module from the main module. { path: 'auth' } ✅ 
6. Create components login, forgot-password, register. See screenshot  ✅ 
7. Try to use lazy loading mode for this module by using loadChildren: attribute Read about lazy loading here: https://angular.io/guide/lazy-loading-ngmodules https://www.freecodecamp.org/news/lazy-loading-in-angular-intro-to-ngmodules/ ✅ 
8. Create separate child routing for each component as part of auth module ✅ 
9. Using material library https://material.angular.io/ create forms for each component. Use reactive forms for it in angular. ✅ 
10. Submit button to each form should be disabled until the required fields are valid. After all validation passed, please unblock the button  ✅ 
11. Every field of the form should be required and not empty  ✅ 
12. Min length of each field should be 2 symbols ✅ 
13. Max length of each field should be 100 symbols ✅ 
14. Email fields should be validated for email data ✅ 
15. Register form should have next fields: "firstname", "lastname", "email", "password", "confirm_password",  ✅ 
16. Values of password and confirm_password should be the same. If they are not the same, please display an error about it.  ✅ 
17. Login form should have fields: "email", "password"  ✅ 
18. Forgot-password form should have fields:  "email"✅ 
19. Try to connect the Register form to API. You need to collect information from the form, add it to object "stack_id": 1, "level_id": 1 and send to API using HTTP API link to use POST method: http://t.js.com/auth/sign-up Documentation: http://t.js.com/docs#/![auth_components](/uploads/856a775177a3ea5cb1aadab030cacfb4/auth_components.png) ✅ 


1. Create a separate Auth service and move here all requests to the back-end that are related to Auth API, if there isn’t.  ✅  
2. Create _core folder, create folder “services" inside, and move all services inside ✅  
3. Next one is to create folder “guards” inside _core. And create your own auth.guard to protect MAIN route from unauthorized users. So the approach needs to be the next: if the user tries to get access to the main route, and he is still not logged in - your application should redirect him to auth/login route.✅  
4. Add checkbox with label "remember me” in Login Component.  ✅  You should use one formGroup for the login form, and another form group for rememberMeForm.  ✅  Your rememberMeForm should include only one remember me checkbox. ✅ After the login request, you should save the token into storage after the success request. So create another storageService that needs two methods: setLocalItem and setSessionItem. ✅ So if remember me = true, you should add the token to localStorage, if remember me = false to sessionStorage  ✅
5. After the login request, you need to send the next request to http://t.js.com/user/me using GET method. To do this, you need to add a user token into the header of the request to validate it. So create another folder calls “interceptors” into _core folder✅   and create here your own jwt.interceptor ✅  to add token to all requests from your app to all protected API. Don’t forget to connect it to your modules. ✅ 
6. After a successful request about all user information, you should receive all information about the user and can check if the user is admin or not. So create in _core folder another one folder “directives”. And create here your own directive - has-role.directive.ts.✅  This directive should check if user has role ADMIN or not. And related to this directive, you should display some simple divs on the main mage for admin, and hide one of them for not admin.✅ 


1. Create Error Interceptor that will handle errors during http requests and responses. It should display in console log message and type of error. For example, if you will try login with wrong credentials or if you try sing up user with existing email in the system ✅
2. Create Admin Guard that will check if user has Admin role one not. Create blank route in your main module, attach to this route empty component and add protection with AdminGuard. If user has admin route he can open this route, if user is not admin you need redirect user to page and display “You don’t have access here”. Also if user will try to activate this route directly by typing route address in browser, user also should be redirected to page and display “You don’t have access here”. ✅ 
3. Create Logout button and method in your components that should delete all user tokens from storage and redirect to login page. This button user should see only in main component after success redirection after login page  ✅  
4. Finish Role Based Directive from previous Homework ✅


1. Redirect to Previous URL after Login with Auth Guard (works fine)✅
2. refresh token jwt angular ✅
3. Forgot password ✅ 
4. Spinner / loader  ✅ 


1. Add toast to project and use it for login. Success, when login successfully. Danger, when bad login or password and show message. ✅
2. Use change detection strategy OnPush for main component.✅
3. Add modal for email sent info. Message for modal: "Email was send to your email address. Please verify your email and then you can login on system." Redirect to login page after close modal. ✅
4. Add unsubscribe when it needed.  ✅ 


