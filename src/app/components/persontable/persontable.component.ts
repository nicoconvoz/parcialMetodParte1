import { DomtableComponent } from './../domtable/domtable.component';
import { personDialog } from '../persondialog/persondialog.component';
import { PersonaDomService } from '../../services/person.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { Persona } from '../models/persona';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DomdialogComponent } from '../domdialog/domdialog.component';
@Component({
  selector: 'app-persontable',
  templateUrl: './persontable.component.html',
  styleUrls: ['./persontable.component.css']
})

export class personTable implements OnInit {

  index = 0;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'edad', 'ver_domicilios', 'actions'];
  public dataSource: MatTableDataSource<Persona> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: PersonaDomService, public dialog: MatDialog, private router : Router) { }

  public page=0;

  ngOnInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.service.getAll(this.page).subscribe(response => {
      if(response.length!==0){
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      }else{
        this.page -= 1;
      }
    },
      error => {
        alert("Error en getAll" + error);
      })
  }

  onSubmit(object: any) {
    this.dialog.open(personDialog, { disableClose: true, data: object })
      .afterClosed().subscribe(result => {
        if (result.event === 'Añadir') {
          this.create(result.data);
          alert('Persona agregada correctamente');
        } else if (result.event === 'Editar') {
          this.update(result.data);
          alert('Persona actualizada correctamente!');
        }
      });
  }

  create(persona: Persona) {
    this.service.post(persona).subscribe((result) => {
      this.dataSource.data.push(result);
      this.notifyTable();
    });
  }

  update(persona: Persona) {
    this.service.put(persona.id, persona).subscribe(() => {
      this.dataSource.data.filter((value) => {
        if (value.id === persona.id) {
          const index = this.dataSource.data.indexOf(value);
          this.dataSource.data[index] = persona;
        }
      });
      this.notifyTable();
    });
  }

  onDelete(person: Persona) {
    console.log("Eliminar", person);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo"
    }).then(result => {
      if (result.value) {
        this.service.delete(person.id).subscribe(() => {
          Swal.fire('¡Eliminado!', "Tu registo ha sido eliminado.", "success");
          const index = this.dataSource.data.indexOf(person);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        },
          error => {
            console.log(error);
            Swal.fire('¡Error!', "Algo salió mal en la operación.", "error");
          })
      }
    })
  }

  notifyTable() {
    this.dataSource.data = [...this.dataSource.data];
  }

  abrirdomtable(id: number){
    this.dialog.open(DomtableComponent, { height: '600px',width: '1000px',disableClose: true, data: id });
  }

  anterior(){
    if(this.page !== 0){
      this.page = this.page-1;
      this.getAll();
    }else{
      alert('No hay más páginas anteriores.');
    }
  }

  siguiente(){
    this.page = this.page+1;
    this.getAll();
  }

}