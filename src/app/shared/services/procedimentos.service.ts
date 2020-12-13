import { FuncionariosService } from './funcionarios.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { ProcedimentoXFuncionario } from '../interfaces/procedimentoxFuncionario.model';
import { Pessoa } from '../interfaces/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentosService {

  constructor(private http: HttpClient, private funcionariosService: FuncionariosService) { }

  private URLProcedimento = `http://localhost:3000/procedimento`;
  private URLProcedimentoxFuncionario = `http://localhost:3000/procedimentoxfuncionario`;

  getProcedimentos(
  ): Observable<any> {
    return this.http.get(`${this.URLProcedimento}`);
  }

  getFuncionarioProcedimento(idProcedimento = ''): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.URLProcedimentoxFuncionario}?idProcedimento=${idProcedimento}`).pipe(
      switchMap((procedimentosxFuncionarios) => procedimentosxFuncionarios),
      mergeMap((procedimentoFuncionario) => {
        return this.funcionariosService.getFuncionarioId(procedimentoFuncionario.idFuncionario).pipe(
          map(medico => {
            return medico
          })
        );
      }),
      toArray()
    );
  }


  // getPacientes(): Observable<Pessoa[]> {
  //   return this.http.get<Pessoa[]>(`${this.URL}`)
  //     .pipe(
  //       switchMap((pessoas) => pessoas),
  //       mergeMap((paciente) => {
  //         return this.documentoService.getDocumentoPessoa(paciente.id).pipe(
  //           map(documentosPessoa => Object.assign(paciente, { documentos: documentosPessoa }))
  //         );
  //       }),
  //       mergeMap(paciente => {
  //         return this.pessoaService.getPessoaId(paciente.id).pipe(
  //           map(pessoa => {
  //             paciente.idPessoa = pessoa.id;
  //             return Object.assign(paciente, pessoa);
  //           }),
  //         );
  //       }),
  //       toArray()
  //     );
  // }

}
