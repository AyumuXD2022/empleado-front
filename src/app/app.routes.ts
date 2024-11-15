import { Routes } from '@angular/router';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';

export const routes: Routes = [
  {path: 'list', component: EmpleadoListComponent},
  {path: 'empleado-create', component: EmpleadoFormComponent},
  {path: 'empleado-edit/:id', component: EmpleadoFormComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'},
];
