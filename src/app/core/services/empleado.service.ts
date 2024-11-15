import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Empleado from '../interfaces/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url = "http://localhost:9000/api/v1/"
  constructor(private http:HttpClient) { }

  getAllEmpleados():Observable<any>{
    return this.http.get(`${this.url}list-empleado`);
  }

  getEmpleadoById(id:string):Observable<any>{
    return this.http.get(`${this.url}empleado/${id}`);
  }

  saveEmpleados(empleado:Empleado):Observable<any>{
    return this.http.post(`${this.url}empleado`,empleado);
  }

  editEmpleados(empleado:Empleado,id:string):Observable<any>{
    return this.http.put(`${this.url}empleado/${id}`,empleado);
  }

  deleteEmpleados(id:string):Observable<any>{
    return this.http.delete(`${this.url}empleado/${id}`);
  }
}
