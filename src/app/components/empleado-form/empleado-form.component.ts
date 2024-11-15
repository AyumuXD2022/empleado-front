import { Component, OnInit } from '@angular/core';
import Empleado from '../../core/interfaces/Empleado';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../core/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.scss'
})
export class EmpleadoFormComponent implements OnInit {



  empleado!: Empleado;
  empleadoForm!: FormGroup;
  id: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombre: this.fb.control('', [Validators.required]),
      apellidoPaterno: this.fb.control('', [Validators.required]),
      apellidoMaterno: this.fb.control('', [Validators.required]),
      curp: this.fb.control('', [Validators.required, Validators.pattern("^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z0-9]{2})$")]),
      telefono: this.fb.control('', [Validators.required])
    });

    this.id = this.route.snapshot.paramMap.get('id') as string

    if (this.id) {
      this.getEmpleadoById(this.id)
    }
  }
  crear() {
    if (this.empleadoForm.valid) {
      this.empleado = this.empleadoForm.value;
      if (this.empleado) {
        this.empleadoService.saveEmpleados(this.empleado).subscribe({
          next: (value) => {
            this.router.navigate(['/list'])
            Swal.fire({
              title: "Good job!",
              text: value.message,
              icon: "success"
            });
          },
        })
      }
    }
  }


  private getEmpleadoById(id: string) {
    this.empleadoService.getEmpleadoById(id).subscribe({
      next: (value) => {
        this.empleadoForm.patchValue(value.empleado)
      },
    })
  }
  edit() {
    if (this.empleadoForm.valid && this.id) {
      this.empleado = this.empleadoForm.value;
      if (this.empleado) {
        const idEmpleado = this.id;
        this.empleadoService.editEmpleados(this.empleado, idEmpleado).subscribe({
          next: (value) => {
            this.router.navigate(['/list'])
            Swal.fire({
              title: "Good job!",
              text: value.message,
              icon: "success"
            });
          },
        })
      }
    }
  }
}
