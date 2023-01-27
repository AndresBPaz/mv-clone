import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.sass'],

  animations: [
    trigger('fade',  [

      transition('void => *', [
        style({backgroundColor: 'yellow', opacity:0}),
        animate(2000, style({backgroundColor: 'cyan', opacity: 1}))
      ])
    ])
  ]
})
export class AnimationsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
