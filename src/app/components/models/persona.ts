import { Common } from './common';

export interface Persona extends Common {
    nombre: string;
    apellido: string;
    dni: number;
    edad: number;
}