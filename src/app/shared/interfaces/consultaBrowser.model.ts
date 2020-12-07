export interface ConsultaBrowser {
  id: string;
  diaDaSemana: number | string;
  dataHoraAtendimento: Date;
  dataHoraEntrada: Date;
  dataHoraSaida: Date;
  disponivel: boolean;
  idPaciente: number;
  idUnidadeAtendimento: number;
  idFuncionario: number;
  nomePaciente: string;
  nomeFuncionario: string;
  status: number;
  dadosPaciente: Object;
}
