import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(){}

  setLocalItem(data: any): void {
    localStorage.setItem('token', JSON.stringify(data));
  }

  setSessionItem(data: any): void {
    sessionStorage.setItem('token', JSON.stringify(data));
  }

  removeToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }


  public getTokenValue() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return null ;
  }

}
