import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getPosts(url: string): Observable <any> {
    return this.http.get<any>(url, {responseType: 'json'});
  }
}
