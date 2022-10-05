import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../services/mascotas.service';
import { mascota } from '../../../interfaces/mascota.interface';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.page.html',
  styleUrls: ['./listar-mascotas.page.scss'],
})
export class ListarMascotasPage implements OnInit {

  listaMascotas:mascota[] = []
  loading:boolean = true
  
  constructor(
    private mascotasService:MascotasService
  ) { }

  ngOnInit() {
    this.mascotasService.getAllMascotas()
      .subscribe(
        (data:mascota[]) => {
          this.listaMascotas = data;
        }
      )
    
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    
  }

}
