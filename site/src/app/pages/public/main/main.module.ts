import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    InfiniteScrollModule,
  ]
})
export class MainModule { }
