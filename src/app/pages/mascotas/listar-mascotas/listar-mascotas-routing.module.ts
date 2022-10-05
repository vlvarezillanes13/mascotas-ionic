import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarMascotasPage } from './listar-mascotas.page';

const routes: Routes = [
  { path: 'listar', component: ListarMascotasPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarMascotasPageRoutingModule {}
