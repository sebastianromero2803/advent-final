import { Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get<T>(endPoint: string, params: any) {
    return this.http
      .get<T>(endPoint, { params })
      .pipe(catchError(this.handleError));
  }

  public post<t>(endPoint: string, param: any) {
    return this.http
      .post<t>(endPoint, param)
      .pipe(catchError(this.handleError));
  }

  public put<t>(endPoint: string, param: any) {
    return this.http
      .put<t>(endPoint, param)
      .pipe(catchError(this.handleError));
  }

  public delete<t>(
    endPoint: string,
    param: {
      headers?:
        | HttpHeaders
        | { [header: string]: string | string[] }
        | undefined;
      observe: "events";
      context?: HttpContext | undefined;
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | (string | number | boolean)[];
          }
        | undefined;
      reportProgress?: boolean | undefined;
      responseType?: "json" | undefined;
      withCredentials?: boolean | undefined;
      body?: any;
    }
  ) {
    return this.http
      .delete<t>(endPoint, param)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any) {
    let errorMessage = "";
    // console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.statusHttp}; Message: ${error.message}`;
    }

    if (error.status === 404) {
      Swal.fire("¡Error!", "Error in model to save information", "error");
    } else if (error.status !== 500 && error.status !== 0) {
      Swal.fire("¡Error!", error.message, "error");
    } else {
      console.log(error);
      Swal.fire("¡Error!", errorMessage, "error");
    }
    return throwError(errorMessage);
  }
}
