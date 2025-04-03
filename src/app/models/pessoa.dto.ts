export interface PessoaDto{
    id: number;
    nome: string;
    idade: number;
    sexo: string;
    peso: number;
    altura: number;
    idoso: boolean;
    [key: string]: any; 
}