import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Persona } from '../components/models/persona';

@Injectable({
  providedIn: 'root'
})

export class PersonaDomService extends CommonService<Persona> {

  protected miUrl = 'http://localhost:9000/api/v1/persona/';

}
