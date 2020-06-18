import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommonService <E> {

  constructor(private http: HttpClient) { }

  protected miUrl;

  getAll(page: number): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl+"get/"+page).pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl + id).pipe(catchError(this.handleError));
  }

  post(entity: E): Observable<E> {
    return this.http.post<E>(this.miUrl, entity).pipe(catchError(this.handleError));
  }

  put(id: number, entity: E) {
    return this.http.put<E>(this.miUrl + id, entity).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id).pipe(catchError(this.handleError));
  }

  getAllDomicilios(page: number, id: number): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl+page+"/consultar/"+id).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    alert(`Codigo de error: ${error.status}` + `\nMensaje: ${error.error}`);
    return throwError(' Por favor, intente de nuevo.');
  }

}