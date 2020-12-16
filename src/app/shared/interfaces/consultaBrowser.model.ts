export interface ConsultaBrowser {
  id: string;
  diaDaSemana: number | string;
  dataAtendimento: string;
  horaAtendimento: string;
  dataHoraEntrada: Date;
  dataHoraSaida: Date;
  disponivel: boolean;
  idPaciente: number;
  idUnidadeAtendimento: number;
  idFuncionario: number;
  nomePaciente: string;
  nomeFuncionario: string;
  procedimento: string;
  status: number;
  dadosPaciente: Object;
  dadosFuncionario: Object;
}
