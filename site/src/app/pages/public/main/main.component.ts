import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],

  animations: [
    trigger('fade',  [

      transition('void => *', [
        style({backgroundColor: 'yellow', opacity:0}),
        animate(2000, style({backgroundColor: 'cyan', opacity: 1}))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {

  constructor() { }
  throttle = 0;
  distance = 2;
  page = 0; 
  blogs: any[] = [];

  ngOnInit(): void {

  }
  OnScrollDown(): void {
    console.log("scroll down");
  } 
  OnScrollUp():void{
    console.log("scroll up");
  }

}
