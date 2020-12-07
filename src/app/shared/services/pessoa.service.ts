import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../interfaces/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  private URL = `http://localhost:3000/pessoa`;

  getPessoaId(
    id: number | string
  ): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.URL}/${id}`);
  }
}
