import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Domicilio } from '../components/models/domicilio';

@Injectable({
  providedIn: 'root'
})

export class DomService extends CommonService<Domicilio> {

  protected miUrl = 'http://localhost:9000/api/v1/domicilio/';

}