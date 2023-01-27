import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule} from "../../../pipes/pipes.module";
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';




@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    PipesModule
  ]
})

export class NewModule { }
