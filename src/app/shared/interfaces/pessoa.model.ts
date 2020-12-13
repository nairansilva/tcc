
export interface Pessoa {
  id: string;
  idPessoa: number | string;
  status: boolean;
  tipo: 1;
  nome: string;
  idDocumento: number;
  nomeDocumento: string;
  numeroDocumento: string;
  dataNascimento: Date;
  email: string;
  idFuncionario?: number | string
}
