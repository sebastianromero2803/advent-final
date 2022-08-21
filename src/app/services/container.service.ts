import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Container } from '@app-models/container.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class ContainerService {

  constructor(private http: HttpClient) {}

  public getContainersList(): Observable<Container[]> {
    const url = `${environment.URL_CONTAINERS}EDI`;
    return this.http.get<any>(url).pipe(
      map((result: any) => {
        result.content.map((container: any) => {
          return Object.assign(container, { booked: false });
        });
        return result;
        }
      )
    );
  }
}