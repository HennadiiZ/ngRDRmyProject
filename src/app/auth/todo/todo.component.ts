import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectionStServise } from 'src/app/_core/services/change-detection.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent  {

  @Input('todo') todoProps: any;
  filter$: Observable<string>;

  constructor( private changeDetect: ChangeDetectionStServise){
    this.filter$ = changeDetect.filter$
  }

  checkRender(): boolean {
    console.log('checkRender');
    return true;
  }

  changeText(): void{
    this.todoProps.text = "change from the inside";
  }

  changeFilter():void {
    this.changeDetect.filter$.next('+++active+++');
  }

}
