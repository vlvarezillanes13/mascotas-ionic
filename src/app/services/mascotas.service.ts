import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mascota } from '../interfaces/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  baseUrl:string = "http://localhost:8080/api/mascota";

  constructor(
    private htpp:HttpClient
  ) { }

    public getAllMascotas(){
      return this.htpp.get<mascota[]>(`${this.baseUrl}/getAllMascotas`);
    }

}
