import { Component, OnInit, ViewChild } from '@angular/core';
import { GridDataService } from './services/grid-data.service';
import { AgGridAngular } from "ag-grid-angular";
import { PessoaDto } from './models/pessoa.dto';
import { FormsModule } from '@angular/forms';
import {
  AllCommunityModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  imports: [AgGridAngular, FormsModule],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  rowData: PessoaDto[] = [];
  colDefs: ColDef[] = [
    { field: 'nome', headerName: 'Nome', editable: true },
    { 
      field: 'idade',
      headerName: 'Idade',
      editable: true,
      cellClassRules: {
        'idade-idoso': (params) => {
          return params.data && params.data?.idade >= 60;
        }
      },
      cellStyle: (params) => {
        if (params.data && params.data.idade >= 60) {
          return { color: 'red', fontWeight: 'bold' };
        }
        return null;
      }    
    },
    { field: 'sexo', headerName: 'Sexo', editable: true },
    { field: 'peso', headerName: 'Peso', editable: true },
    { field: 'altura', headerName: 'Altura', editable: true },
    { field: 'idoso', headerName: 'Idoso', editable: false},
    {
      field: 'acoes',
      headerName: 'Ações',
      cellRenderer: (params: any) => `
        <button class="btn-excluir" style="background-color: lightcoral;
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            transition: background-color 0.2s;" data-id="${params.data.id}">Deletar
        </button>
      `,
      width: 200
    }
  ];
  
  defaultColDef: ColDef = { flex: 1 };

  filtroNome: string = '';
  filtroIdade: string = '';
  filtroIdoso: string = 'todos';
  gridApi: any;

  constructor(private gridDataService: GridDataService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.gridDataService.listarPessoas().subscribe(
      (data) => {
        this.rowData = data;
        setTimeout(() => {
          if (this.gridApi) {
            this.gridApi.refreshCells({ force: true });
          }
        }, 100);
      },
      (error) => console.error('Erro ao buscar pessoas:', error)
    );
  }

  adicionarPessoa(): void {
    const novaPessoa: PessoaDto = {
      id: 0, 
      nome: '',
      idade: 0,
      sexo: '',
      peso: 0,
      altura: 0,
      idoso: false
    };

    this.rowData = [...this.rowData, novaPessoa];
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit()
    params.api.addEventListener('cellEditingStopped', (event: any) => {
      const pessoaEditada: PessoaDto = event.data;
      
      if (pessoaEditada.id === 0) {
        this.gridDataService.adicionarPessoa(pessoaEditada).subscribe(
          (novaPessoa) => {
            pessoaEditada.id = novaPessoa.id;
          },
          (error) => console.error('Erro ao adicionar pessoa:', error)
        );
      } else {
        this.gridDataService.atualizarPessoa(pessoaEditada.id, pessoaEditada).subscribe(
          () => console.log('Pessoa atualizada com sucesso!'),
          (error) => console.error('Erro ao editar pessoa:', error)
        );
      }
    });
  
    params.api.addEventListener('cellClicked', (event: any) => {
      const id = Number(event.event.target.dataset.id);
      if (event.event.target.classList.contains('btn-excluir')) {
        this.excluirPessoa(id);
      }
    });
  }

  excluirPessoa(id: number): void {
    if (confirm('Deseja excluir essa pessoa?')) {
      this.gridDataService.deletarPessoa(id).subscribe(
        () => this.carregarPessoas(),
        (error) => console.error('Erro ao excluir pessoa:', error)
      );
    }
  }

  filtrarPessoas(): void {
    this.gridDataService.listarPessoas().subscribe((data) => {
      let pessoasFiltradas = data;
      
      if (this.filtroNome) {
        pessoasFiltradas = pessoasFiltradas.filter(p => 
          p.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
        );
      }
      
      if (this.filtroIdade) {
        pessoasFiltradas = pessoasFiltradas.filter(p => 
          p.idade === Number(this.filtroIdade)
        );
      }
      
      if (this.filtroIdoso === 'idosos') {
        pessoasFiltradas = pessoasFiltradas.filter(p => p.idade >= 60);
      } else if (this.filtroIdoso === 'nao-idosos') {
        pessoasFiltradas = pessoasFiltradas.filter(p => p.idade < 60);
      }
      
      this.rowData = pessoasFiltradas;
    });
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroIdade = '';
    this.filtroIdoso = 'todos';
    this.carregarPessoas();
  }

  onCellClicked(event: any): void {
    console.log('Célula clicada:', event);
  }

  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
}
