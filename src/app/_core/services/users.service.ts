import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({ providedIn: 'root'})
  
export class UsersService {

    userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
 
    constructor( private http: HttpClient){}

    getUser(): Observable<User> { 
        return this.userSubject.getValue() ? this.userSubject : this.getUserData();
    }

    getUserData(): Observable<User> {  
        return this.http.get(`${environment.apiUrl}/user/me`)
        .pipe(
            map((value) => {
                const user = new User(value);     
                this.userSubject.next(user);
                return user;
            }) 
        );
    }

}
  

