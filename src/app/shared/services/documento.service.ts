import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  private URL = `http://localhost:3000/documento`;

  getDocumentoPessoa(
    id: number | string
  ): Observable<any> {
    return this.http.get(`${this.URL}/?idPessoa=${id}`);
  }
}
