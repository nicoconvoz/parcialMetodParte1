import { Common } from './common';

export interface Domicilio extends Common {
    calle: string;
    numero: number;
    localidad: string;
    departamento: string;
    piso: string;
    personaRelacionada: number;
}