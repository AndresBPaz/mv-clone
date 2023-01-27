import { Component, OnInit } from '@angular/core'; 
import { SearchService } from '../../../services/search.service'
import { ActivatedRoute, Params, Router } from "@angular/router";
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  throttle = 0;
  distance = 2;
  page = 0; 
  blogs: any[] = [];

  search = '';

  public formsearchGroup = new FormGroup({
    formsearch: new FormControl('')
  });

  constructor(
    private service: SearchService,
    private activateRouter: ActivatedRoute,
    private router: Router,
  ){}
 
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params: Params) => this.search = params['q']);
    this.getData(this.search);
  }

  getData(termino: string): any {
    this.service.getSearch(1,0,termino).subscribe(response => {
      console.log(response)
      this.blogs = response.result.blog; 
    }, error => {
          console.log(error);
    });
  }

  OnSearch(): void {
  }

  OnScrollDown(): void {
    console.log("scroll down");
    this.service
      .getSearch(1,++this.page,this.search)
      .subscribe(response => {
        if(response.blogs.length > 0){
          this.blogs = this.blogs.concat(response.blogs);
        }else --this.page; 
      });
  } 
  OnScrollUp():void{
    console.log("scroll up");
  }

}
