import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemblanzaRoutingModule } from './semblanza-routing.module';
import { SemblanzaComponent } from './semblanza.component';


@NgModule({
  declarations: [
    SemblanzaComponent
  ],
  imports: [
    CommonModule,
    SemblanzaRoutingModule
  ]
})
export class SemblanzaModule { }
