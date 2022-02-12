import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  todos:any = [
    {
      id: '1',
      text: 'First todo',
      isCompleted: true,
    },
    {
      id: '2',
      text: 'Second todo',
      isCompleted: true,
    },
    {
      id: '3',
      text: 'Third todo',
      isCompleted: true,
    }
  ];

  changeText(): void{
     console.log('changeText')
  }

  changeArray(){
    this.todos[0].text = "something";
    this.todos[0] = {...this.todos[0], text: "nothing"};
    console.log(this.todos);
  }

}
