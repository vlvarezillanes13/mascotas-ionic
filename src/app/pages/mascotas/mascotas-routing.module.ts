import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotasPage } from './mascotas.page';
import { ListarMascotasPage } from './listar-mascotas/listar-mascotas.page';

const routes: Routes = [
  {
    path: 'mascotas',
    component: MascotasPage,
    children:[
      { path:'', loadChildren: () => import('./listar-mascotas/listar-mascotas.module').then( m => m.ListarMascotasPageModule) },
      { path:'**', redirectTo:'mascotas/listar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasPageRoutingModule {}
