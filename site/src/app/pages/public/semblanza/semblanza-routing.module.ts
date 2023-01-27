import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemblanzaComponent } from './semblanza.component';

const routes: Routes = [{ path: '', component: SemblanzaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemblanzaRoutingModule { }
