import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialesRoutingModule } from './testimoniales-routing.module';
import { TestimonialesComponent } from './testimoniales.component';


@NgModule({
  declarations: [
    TestimonialesComponent
  ],
  imports: [
    CommonModule,
    TestimonialesRoutingModule
  ]
})
export class TestimonialesModule { }
