Gerenciamento de Pessoas - Grid AG Grid

📌 Descrição

Este é um projeto desenvolvido em Angular 19.2.4 utilizando AG Grid para gerenciamento de pessoas. A aplicação permite visualizar, adicionar, editar, excluir e filtrar registros diretamente na grid.

🚀 Tecnologias Utilizadas

Angular 19.2.4

AG Grid

TypeScript

CSS

RxJS (para chamadas assíncronas ao backend)

📂 Estrutura do Projeto

/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   ├── models/
│   │   │   ├── pessoa.dto.ts
│   │   ├── services/
│   │   │   ├── grid-data.service.ts
│   ├── assets/
│   ├── environments/
│   ├── main.ts
│   ├── index.html

🛠️ Instalação e Configuração

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Acesse a pasta do projeto:

cd seu-repositorio

Instale as dependências:

npm install

Execute o projeto:

ng serve

Acesse no navegador:

http://localhost:4200

✨ Funcionalidades

📋 Visualizar Pessoas: Lista todas as pessoas cadastradas.

➕ Adicionar Pessoa: Cria uma linha em branco na grid para preenchimento.

✏️ Editar Pessoa: Clique diretamente na célula da grid para modificar os valores.

❌ Excluir Pessoa: Clique no botão "Deletar" na coluna de ações para remover um registro.

🔍 Filtrar Pessoas: Utilize os filtros para exibir apenas registros específicos.

📝 Como Editar uma Pessoa?

Para editar uma pessoa, basta clicar diretamente na célula da grid e alterar o valor desejado. Após editar, a alteração será salva automaticamente ao sair do campo editado.

🎨 Estilização da Grid

A grid está estilizada com AG Grid Alpine Theme, com ajustes responsivos e cores diferenciadas para idades maiores ou iguais a 60 anos.

📌 Melhorias Futuras

Implementar paginação dinâmica.

Melhorar a validação dos campos editáveis.

Adicionar mensagens de confirmação antes de excluir um registro.

📜 Licença

Este projeto está sob a licença MIT.
