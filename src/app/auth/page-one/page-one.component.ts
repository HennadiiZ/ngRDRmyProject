import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRoles } from 'src/app/_core/enums/user-role.enum';
import { User } from 'src/app/_core/models/user.model';
import { ModalService } from 'src/app/_core/services/modal.service';
import { UsersService } from 'src/app/_core/services/users.service';


@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit {

  userRoles = UserRoles;
  user!: User;
  
  subscription: Subscription = new Subscription();
  constructor(private userService: UsersService, private router: Router, private modalService: ModalService){}
  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((user) => (this.user = user))
    );
  }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    
    goToAdminPage(){
      this.router.navigate(['/auth/admin-page']);
    }

}
