import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MolecularRoutingModule } from './molecular-routing.module';
import { MolecularComponent } from './molecular.component';


@NgModule({
  declarations: [
    MolecularComponent
  ],
  imports: [
    CommonModule,
    MolecularRoutingModule
  ]
})
export class MolecularModule { }
