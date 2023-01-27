import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})


export class HeaderComponent implements OnInit {
  navbarOpen = false;
  public formsearchGroup = new FormGroup({
    formsearch: new FormControl('')
  });

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 992) {
      this.displayMenu = false;
    } else if(window.innerWidth > 992) {
      this.displayMenu = true;
    }
  };
  open:boolean=false;
  displayMenu:boolean=false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.displayMenu = false;
    } else if(window.innerWidth > 992) {
      this.displayMenu = true;
    }
  }

  openMenu(){
    if (this.open){
      this.open = false;
    } else {
      this.open = true;
    }
  }

  OnSearch(): void {
    console.log("route busqueda");
   this.router.navigate(["busqueda", this.formsearchGroup.value.formsearch] );
  
  }

}
