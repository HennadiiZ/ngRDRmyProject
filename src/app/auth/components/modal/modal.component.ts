import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/_core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  display$!: Observable<'open' | 'close'>;

  constructor( private modalService: ModalService, public router: Router ){}

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
  }

  close(){
    this.router.navigate(['/auth/log-in'])
    this.modalService.close();
  }

}
