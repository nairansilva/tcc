import { PessoaService } from './pessoa.service';
import { DocumentoService } from './documento.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../interfaces/pessoa.model';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient, private documentoService: DocumentoService, private pessoaService: PessoaService) { }

  private URL = `http://localhost:3000/funcionario`;

  getFuncionarioId(
    id: number | string
  ): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.URL}/${id}`).pipe(
      mergeMap(paciente => {
        return this.documentoService.getDocumentoPessoa(paciente.id).pipe(
          map(documentosPessoa => Object.assign(paciente, { documentos: documentosPessoa }))
        )
      }),
      mergeMap(paciente => {
        return this.pessoaService.getPessoaId(paciente.id).pipe(
          map(pessoa => {
            paciente.idPessoa = pessoa.id;
            return Object.assign(paciente, pessoa);
          }),
        );
      }),
    );
  }
}
