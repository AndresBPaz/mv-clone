import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html', 
  styleUrls: ['./news.component.sass']
})

export class NewsComponent implements OnInit {

  throttle = 0;
  distance = 2;
  page = 0; 
  blogs: any[] = [];

  constructor(private service: NewsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
      this.service.getComunicados(1,0).subscribe(response => {

        this.blogs = response.blogs; //solo mientras paginamos
        //console.log(response);

      }, error => {
            console.log(error);
      });
  }

  onScrollDown(): void {
    console.log("scroll down");
    this.service
      .getComunicados(1,++this.page)
      .subscribe(response => {
        //console.log(response);
        if(response.blogs.length > 0){
          this.blogs = this.blogs.concat(response.blogs);
        }else --this.page;
        //console.log(this.blogs);
      });
  } 
  onScrollUp():void{
    console.log("scroll up");
  }

}
