import { Domicilio } from './../models/domicilio';
import { DomService } from './../../services/domicilio.service';
import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DomdialogComponent } from '../domdialog/domdialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domtable',
  templateUrl: './domtable.component.html',
  styleUrls: ['./domtable.component.css']
})

export class DomtableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  index = 0;
  displayedColumns: string[] = ['id', 'calle', 'numero', 'piso', 'departamento', 'localidad', 'actions'];
  public dataSource: MatTableDataSource<Domicilio> = new MatTableDataSource();
  public page = 0;
  public personaRel;
  public localData:number;

  constructor(private service: DomService, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, @Optional() @Inject(MAT_DIALOG_DATA) public data:number) {
      this.localData = data;
     }

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
      this.service.getAllDomicilios(this.page, this.localData).subscribe(response => {
        this.service.getAllDomicilios(this.page,  this.localData).subscribe(response => {
          if (response.length !== 0) {
            this.dataSource.data = response;
            console.log(this.dataSource.data);
          }else{
            this.page -= 1;
          }
        })
      })
  }

  onSubmit(object: any) {
    this.activatedRoute.params.subscribe(data => {
      let id = data['id'];
      this.dialog.open(DomdialogComponent, { disableClose: true, data: {personaRelacionada:this.localData,datos:object} })
        .afterClosed().subscribe(result => {
          if (result.event === 'Añadir') {
            this.create(result.data);
            alert('Registro agregado correctamente');
          } else if (result.event === 'Editar') {
            this.update(result.data);
            alert('Registro actualizado');
          }
        });
    });
  }

  create(dom: Domicilio) {
    this.service.post(dom).subscribe((result) => {
      this.dataSource.data.push(result);
      this.notifyTable();
    });
  }

  update(dom: Domicilio) {
    this.service.put(dom.id, dom).subscribe(() => {
      this.dataSource.data.filter((value) => {
        if (value.id === dom.id) {
          const index = this.dataSource.data.indexOf(value);
          this.dataSource.data[index] = dom;
          
        }
      });
      this.notifyTable();
    });
  }

  onDelete(dom: Domicilio) {
    console.log("Eliminar", dom);
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
        this.service.delete(dom.id).subscribe(() => {
          Swal.fire('¡Eliminado!', "Tu registo ha sido eliminado.", "success");
          const index = this.dataSource.data.indexOf(dom);
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

  anterior() {
    if (this.page !== 0) {
      this.page = this.page - 1;
      this.getAll();
    } else {
      alert('No hay más páginas anteriores.');
    }
  }

  siguiente() {
    this.page = this.page + 1;
    this.getAll();
  }

}









