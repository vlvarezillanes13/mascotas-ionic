import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMascota } from '../../interfaces/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  baseUrl:string = "http://localhost:8080/api/mascota";

  constructor(
    private http:HttpClient
  ) { }

    public getAllMascotas(){
      return this.http.get<IMascota[]>(`${this.baseUrl}/getAllMascotas`);
    }

    public postAddMascota( mascota:IMascota ){
      return this.http.post<IMascota>(`${this.baseUrl}/addMascota`, mascota);
    }

    public putUpdateMascota( mascota: IMascota){
      return this.http.put<IMascota>(`${this.baseUrl}/updateMascota`, mascota)
    }

    public deleteMascotaById( id:number){
      return this.http.delete<IMascota>(`${this.baseUrl}/deleteMascota/${id}`);
    }

}
