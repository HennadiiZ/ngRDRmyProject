
import { Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from '../enums/user-role.enum';
import { User } from '../models/user.model';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnChanges, OnInit {
  @Input('appHasRole') public userHasRole!: UserRoles;
  @Input() public user!:User; 
 
  constructor(
    private viewContainerRef: ViewContainerRef,
    public templateRef: TemplateRef<any>,
    private router: Router
  ){}

  ngOnChanges() {
    if (!this.user) {
      this.viewContainerRef.clear();
     } else if (this.user[this.userHasRole] === true) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    } 
  }

  ngOnInit(){}
}

