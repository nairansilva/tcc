import { ConsultaBrowser } from './../interfaces/consultaBrowser.model';
import { FuncionariosService } from './funcionarios.service';
import { PacientesService } from './pacientes.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, take, pluck, switchMap, mergeMap, toArray, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient, private pacienteService: PacientesService, private funcionariosService: FuncionariosService) { }

  private URL = `http://localhost:3000/agenda`;
  private teste = {};
  private consultaBrowser: ConsultaBrowser[];

  getConsultasAgendadas(
    page = 1, limit = 10
  ): Observable<ConsultaBrowser[]> {

    const filter = `?disponivel=false&_page=${page}&_limit=${limit}`;
    console.log(`${this.URL}${filter}`)
    return this.http.get<ConsultaBrowser[]>(`${this.URL}${filter}`);
  }

  getConsultasBrowser(
    page = 1,
    limit = 10
  ): Observable<ConsultaBrowser[]> {
    return this.getConsultasAgendadas(page, limit)
      .pipe(
        switchMap((agendas) => agendas),
        mergeMap(agenda => {
          return this.pacienteService.getPacienteId(agenda.idPaciente).pipe(
            map(paciente => {
              agenda.dadosPaciente = paciente;
              agenda.nomePaciente = paciente.nome;
              return agenda;
            })
          );
        }),
        mergeMap(agenda => {
          return this.funcionariosService.getFuncionarioId(agenda.idFuncionario).pipe(
            map(funcionario => {
              agenda.dadosFuncionario = funcionario;
              agenda.nomeFuncionario = funcionario.nome;
              return agenda;
            })
          );
        })
        , toArray()
      );
  }

  getDataAtendimento(ìdFuncionario = ''): Observable<ConsultaBrowser[]> {
    const filter = `?disponivel=true&idFuncionario=${ìdFuncionario}`
    return this.http.get<ConsultaBrowser[]>(`${this.URL}${filter}`);
  }

  getHoraAtendimento(ìdFuncionario = '', dataAtendimento = ''): Observable<ConsultaBrowser[]> {
    const filter = `?disponivel=true&idFuncionario=${ìdFuncionario}&dataAtendimento=${dataAtendimento}`
    return this.http.get<ConsultaBrowser[]>(`${this.URL}${filter}`);
  }

  patchAgenda(id='', formulario):Observable<any>{
    return this.http.patch(`${this.URL}${id}`, formulario);
  }
}
