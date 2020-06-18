import { ActivatedRoute } from '@angular/router';
import { Domicilio } from './../models/domicilio';
import { Component, OnInit, Inject, Optional, Host, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomtableComponent } from '../domtable/domtable.component';


@Component({
  selector: 'app-domdialog',
  templateUrl: './domdialog.component.html',
  styleUrls: ['./domdialog.component.css']
})

export class DomdialogComponent implements OnInit {

  public localData: any;
  public action: string;
  public formDom: FormGroup;


  constructor(public dialogRef: MatDialogRef<DomdialogComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:{ personaRelacionada:number,datos:Domicilio}) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildFormDom();
    this.setAction();
  }

  buildFormDom() {
    this.formDom = this.formBuilder.group({
      id: [this.localData.datos.id],
      calle: [this.localData.datos.calle, [Validators.required]],
      numero: [this.localData.datos.numero, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      localidad: [this.localData.datos.localidad, [Validators.required]],
      piso: [this.localData.datos.piso, [Validators.required]],
      departamento: [this.localData.datos.departamento, [Validators.required]],
      personaRelacionada: [this.localData.personaRelacionada, [Validators.required]],
    });
  }

  setAction() {
    this.action = (this.localData.datos.id) ? 'Editar' : 'Añadir';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.formDom.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.formDom.controls[control].hasError(error);
  }

}



  

  

