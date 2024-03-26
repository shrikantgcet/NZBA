import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  private handleError = (error: HttpErrorResponse) : string => {
    switch (error.status) {
      case 404: {
         // return `Not Found: ${error.message}`;
         return this.handleNotFound(error);
      }
      case 400: {
          //return `Access Denied: ${error.message}`;
          return this.handleBadRequest(error);
      }
      case 401: {
          //return `Internal Server Error: ${error.message}`;
          console.log('HTTP 401 error response');
          console.log(error);
          return this.handleUnauthorized(error);
      }
      default: {
          return `Unknown Server Error: ${error.message}`;
      }

    // if(error.status === 404){
    //   return this.handleNotFound(error);
    // }
    // else if(error.status === 400){
    //   return this.handleBadRequest(error);
    // }
    // else if(error.status === 401) {
    //   return this.handleUnauthorized(error);
    // }
  }}

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
   console.log('In handleUnauthorized function');
   console.log(this.router.url);
    if(this.router.url === '/login') {
     console.log('Authentication failed. Wrong Username or Password');
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/login']);
      return error.message;
    }
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/authentication/register'){
      let message = '';
      const values = Object.values(error.error.errors);

      values.map((m) => {
        message += m + '<br>';
      })

      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }
}
