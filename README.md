# Projeto CRUD de Usuários
Este projeto é um sistema de CRUD de usuários desenvolvido com **Vue.js** no frontend e **Node.js com Express** no backend, utilizando **MariaDB** como banco de dados.
## Tecnologias Utilizadas
### Frontend:
- Vue.js 
- TypeScript
- Pinia (Gerenciamento de Estado)
- Bootstrap

### Backend:
- Node.js
- Express
- TypeScript
- MariaDB (WampServer)
## Instalação e Execução
### Backend
1. Clone o repositório:
   ```bash
   git clone https://github.com/eduardafs/crud.git
   cd backend
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure o banco de dados no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=crud_usuarios
   DB_DIALECT=mariadb
   ```
4. Inicie o servidor:
   ```bash
   pnpm run dev
   ```

### Frontend
1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```
4. Acesse a aplicação no navegador:
   ```
   http://localhost:5173
   ```

## Funcionalidades
- Listagem de usuários cadastrados
- Cadastro de novos usuários
- Edição de usuários
- Exclusão de usuários
- Validações de formulário

## API Endpoints
A API segue o padrão REST e retorna dados em **JSON**. No arquivo **api.http**
- **GET** `/users` - Lista todos os usuários
- **POST** `/users/register` - Cria um novo usuário
- **GET** `/users/:id` - Visualiza um usuário
- **PUT** `/users/:id` - Atualiza um usuário existente
- **DELETE** `/users/:id` - Remove um usuário