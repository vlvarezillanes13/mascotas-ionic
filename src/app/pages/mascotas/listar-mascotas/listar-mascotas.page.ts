import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { MascotasService } from '../../../services/mascotas/mascotas.service';
import { IMascota } from '../../../interfaces/mascota.interface';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.page.html',
  styleUrls: ['./listar-mascotas.page.scss'],
})
export class ListarMascotasPage implements OnInit {
  listaMascotas: IMascota[] = [];
  loading: boolean = true;
  message: string = '';

  constructor(
    private mascotasService: MascotasService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {

    this.loading=true;
    this.mascotasService.getAllMascotas().subscribe((data: IMascota[]) => {
      this.listaMascotas = data;
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  public addMascota( mascota: IMascota){

    this.mascotasService.postAddMascota( mascota ).subscribe( async (resp: IMascota) => {
      if (resp) {
        this.message = `Se ha agregado la mascota ${resp.nombre} a la lista!`;
      } else {
        this.message = 'No se ha podido agregar la mascota, vuelva a intentar!';
      }
      const toast = await this.toastController.create({
        message: this.message,
        duration: 3000,
        position: 'bottom',
      });

      await toast.present();
      this.loadData();
    });

  }

  public updateMascota( mascota: IMascota){
    console.log(mascota);
    
    this.mascotasService.putUpdateMascota( mascota ).subscribe( async (resp: IMascota) => {
      if (resp) {
        this.message = `Se ha actualizado la mascota ${resp.nombre} en la lista!`;
      } else {
        this.message = 'No se ha podido actualizar la mascota, vuelva a intentar!';
      }
      const toast = await this.toastController.create({
        message: this.message,
        duration: 3000,
        position: 'bottom',
      });

      await toast.present();

      this.loadData();
    });

  }



  public deleteRegister(id: number) {
    this.mascotasService
      .deleteMascotaById(id)
      .subscribe(async (resp: IMascota) => {
        if (resp) {
          this.message = `Se ha eliminado la mascota ${resp.nombre} de la lista!`;
        } else {
          this.message = 'No se ha podido eliminar la mascota, vuelva a intentar!';
        }
        const toast = await this.toastController.create({
          message: this.message,
          duration: 3000,
          position: 'bottom',
        });

        await toast.present();
        
        this.loadData();
      });

  }
}
