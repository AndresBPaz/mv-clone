import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MolecularComponent } from './molecular.component';

const routes: Routes = [{ path: '', component: MolecularComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularRoutingModule { }
