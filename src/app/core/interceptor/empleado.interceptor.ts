import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const empleadoInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      if(error.status === 404){
        console.log(error.error.message)
        Swal.fire({
          title: "Error!",
          text: error.error.message,
          icon: "error"
        });
        router.navigate(['/list'])
        return throwError(() => error)
      }
      return throwError(() => error)
    })
  );


};
