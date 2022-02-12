
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor( private router: Router, public authService: AuthService ){}

  ngOnInit(){}

  logout(event: MouseEvent){
      event.preventDefault();
      this.authService.logout();
      this.router.navigate(['/auth', 'log-in']) 
  } 
}

