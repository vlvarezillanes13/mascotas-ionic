import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPersona } from 'src/app/interfaces/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  baseUrl:string = "http://localhost:8080/api/persona";
  constructor(
    private http:HttpClient
  ) { }

  public getAllPersonas(){
    return this.http.get<IPersona[]>(`${this.baseUrl}/getAllPersonas`);
  }

  public getPersonaById(id: number){
    return this.http.get<IPersona>(`${this.baseUrl}/getPersona/${id}`);
  }
}
