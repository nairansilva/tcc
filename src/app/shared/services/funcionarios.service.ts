import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient) { }

  private URL = `http://localhost:3000/funcionario`;

  getFuncionarioId(
    id: number
  ): Observable<any> {
    return this.http.get(`${this.URL}/${id}`);
  }
}
