import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProxyService<T> {

  constructor(private http: Http) {
  }

  public get(url: String): Observable<T> {
    return this.http.post('http://localhost:8080/proxy', {url}).map((res) => res.json());
  }
}
