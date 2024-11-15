import { Component, OnInit } from '@angular/core';
import Empleado from '../../core/interfaces/Empleado';
import { EmpleadoService } from '../../core/services/empleado.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.scss'
})
export class EmpleadoListComponent implements OnInit {

  protected empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (value) => {
        this.empleados = value || [];
      }
    })
  }
  eliminar(empleado: Empleado) {
    Swal.fire({
      title: "Esta seguro?",
      text: "Ya no podrea revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimina!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = empleado.id as any;
        this.empleadoService.deleteEmpleados(id).subscribe({
          next:(value) => {
              Swal.fire({
                title: "Eliminado!",
                text: value.message,
                icon: "success"
              });
              this.empleados = this.empleados.filter(emp => emp.id !== id)
          },
        })
      }
    });
  }

}
