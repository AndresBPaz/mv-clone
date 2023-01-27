import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    SearchComponent, 
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule, 
    FormsModule, 
    ReactiveFormsModule,
    PipesModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
