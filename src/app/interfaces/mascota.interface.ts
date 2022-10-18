import { IPersona } from './persona.interface';
export interface IMascota {
    id?: number;
    nombre: string;
    edad: number;
    tipo: string;
    persona: IPersona;
}