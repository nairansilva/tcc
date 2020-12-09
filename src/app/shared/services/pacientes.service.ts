import { DocumentoService } from './documento.service';
import { Pessoa } from './../interfaces/pessoa.model';
import { PessoaService } from './pessoa.service';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient, private pessoaService: PessoaService, private documentoService: DocumentoService) { }

  private URL = `http://localhost:3000/paciente`;

  getPacienteId(
    id: number
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

  getPacientes(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.URL}`)
      .pipe(
        switchMap((pessoas) => pessoas),
        mergeMap((paciente) => {
          return this.documentoService.getDocumentoPessoa(paciente.id).pipe(
            map(documentosPessoa => Object.assign(paciente, { documentos: documentosPessoa }))
          );
        }),
        mergeMap(paciente => {
          return this.pessoaService.getPessoaId(paciente.id).pipe(
            map(pessoa => {
              paciente.idPessoa = pessoa.id;
              return Object.assign(paciente, pessoa);
            }),
          );
        }),
        toArray()
      );
  }
}
