import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaDto } from '../models/pessoa.dto';

@Injectable({
  providedIn: 'root'
})
export class GridDataService {
  private apiUrl = 'https://localhost:7256/api/Pessoas'; 

  constructor(private http: HttpClient) {}

  listarPessoas(filtro: 'Todas' | 'Idosas' | 'NaoIdosas' = 'Todas'): Observable<PessoaDto[]> {
    const url = `${this.apiUrl}/ListarPessoas?filtro=${filtro}`;
    return this.http.get<PessoaDto[]>(url);
  }

  buscarPessoa(id: number): Observable<PessoaDto> {
    return this.http.get<PessoaDto>(`${this.apiUrl}/BuscarPessoaPorId?id=${id}`);
  }

  adicionarPessoa(novaPessoa: PessoaDto): Observable<PessoaDto> {
    return this.http.post<PessoaDto>(`${this.apiUrl}/AdicionarPessoa`, novaPessoa);
  }

  atualizarPessoa(id: number, pessoa: PessoaDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/AtualizarPessoa/${id}`, pessoa);
  }

  deletarPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeletarPessoa/${id}`);
  }
}
