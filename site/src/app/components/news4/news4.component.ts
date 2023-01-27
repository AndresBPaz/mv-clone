import {Component, HostListener, OnInit, Inject} from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-news4',
  templateUrl: './news4.component.html',
  styleUrls: ['./news4.component.sass']
})

export class News4Component implements OnInit {

  blogs: any[]= [];


  constructor(@Inject(DOCUMENT) private document: Document,
            private service: NewsService) { }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getNews4().subscribe(response => {

      this.blogs= response.blogsLimit;
      //console.log(this.blogs);

    }, error => {
      console.log(error);
    });



  }


  showButton = false;
  private scrollHeight = 500;


  @HostListener('window:scroll')
  onWindowScroll():void{

    const yOffSet = window.pageXOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop ) > this.scrollHeight;
  }

  onScrollTop():void{
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown():void{
    console.log('Down!!');
  }

}
