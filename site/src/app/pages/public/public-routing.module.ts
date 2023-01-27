import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        title: "Mascotas Virtuales"
      },
      {
        path: 'blog',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        title: "Mascotas Virtuales / Comunicados"
      },
      {
        path: 'blog/:blog',
        loadChildren: () => import('./new/new.module').then(m => m.NewModule),
        title: "Mascotas Virtuales / Comunicado"
      },
      {
        path: 'contacto',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
        title: "Mascotas Virtuales / Contacto"
      },
      {
        path: 'aviso-de-privacidad',
        loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule),
        title: "Mascotas Virtuales / Aviso de privacidad"
      },
      {
        path: 'busqueda/:q',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        title: "Busqueda"
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
