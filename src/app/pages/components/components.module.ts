import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { AddMascotaComponent } from './add-mascota/add-mascota.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMascotaComponent } from './edit-mascota/edit-mascota.component';



@NgModule({
  declarations: [
    LoadingComponent,
    AddMascotaComponent,
    EditMascotaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[
    LoadingComponent,
    AddMascotaComponent,
    EditMascotaComponent
  ]
})
export class ComponentsModule { }
