import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarMascotasPageRoutingModule } from './listar-mascotas-routing.module';

import { ListarMascotasPage } from './listar-mascotas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarMascotasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListarMascotasPage]
})
export class ListarMascotasPageModule {}
