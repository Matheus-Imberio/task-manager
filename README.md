# 📋 Task Manager API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Uma API RESTful moderna para gerenciamento de tarefas com autenticação JWT**

[Features](#-features) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Uso](#-uso) • [API](#-api)

</div>

---

## 📖 Sobre o Projeto

Task Manager é uma API RESTful completa desenvolvida com **NestJS** e **TypeScript** para gerenciamento de tarefas pessoais. O projeto implementa autenticação JWT, criptografia de senhas com bcrypt, e integração com PostgreSQL usando Kysely como query builder type-safe.

### ✨ Destaques

- 🔐 **Autenticação JWT** completa com guards personalizados
- 🔒 **Criptografia de senhas** com bcrypt
- 📊 **Type-safe database queries** com Kysely
- 🐳 **Docker Compose** para ambiente de desenvolvimento
- 🎯 **Arquitetura modular** seguindo padrões NestJS
- 📝 **Sistema de migrations** para versionamento do banco
- 🎁 **Dicas motivacionais** integradas via API externa

---

## 🚀 Features

- ✅ **Autenticação e Autorização**
  - Registro de usuários
  - Login com JWT
  - Proteção de rotas com Guards
  - Validação de tokens

- 📝 **Gerenciamento de Tarefas**
  - Criar, listar, atualizar e deletar tarefas
  - Status de tarefas (pending, in-progress, done)
  - Tarefas vinculadas ao usuário autenticado
  - Dicas motivacionais automáticas

- 🗄️ **Banco de Dados**
  - PostgreSQL com Docker
  - Migrations versionadas
  - Queries type-safe com Kysely
  - Relacionamentos entre tabelas

- 🛠️ **Developer Experience**
  - TypeScript para type safety
  - ESLint e Prettier configurados
  - Hot reload em desenvolvimento
  - Interceptors para transformação de dados

---

## 🛠️ Tecnologias

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Kysely](https://kysely.dev/)** - Query builder type-safe para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Criptografia de senhas
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação

### Ferramentas
- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers
- **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código

---

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [pnpm](https://pnpm.io/) instalado globalmente
- [Docker](https://www.docker.com/) e Docker Compose

### Passo a passo

1. **Clone o repositório**
```bash
git clone <repository-url>
cd task-manager
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/task_manager
SECRET_KEY=sua-chave-secreta-super-segura-aqui
PORT=3000
```

4. **Inicie o banco de dados com Docker**
```bash
docker-compose up -d
```

5. **Execute as migrations**
```bash
pnpm run migrate
```

6. **Inicie o servidor de desenvolvimento**
```bash
pnpm run start:dev
```

A API estará disponível em `http://localhost:3000`

---

## 🎯 Uso

### Autenticação

#### 1. Registrar um novo usuário
```http
POST /users/sign-up
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2025-11-28T10:00:00.000Z"
}
```

#### 2. Fazer login
```http
POST /users/sign-in
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tarefas

Todas as rotas de tarefas requerem autenticação. Inclua o token no header:

```http
Authorization: Bearer <seu-token-jwt>
```

#### Criar uma tarefa
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "id": "uuid-da-tarefa",
  "title": "Implementar feature X",
  "description": "Descrição detalhada da tarefa",
  "status": "pending"
}
```

#### Listar todas as tarefas do usuário
```http
GET /tasks
Authorization: Bearer <token>
```

#### Buscar uma tarefa específica
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Atualizar uma tarefa
```http
PATCH /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título atualizado",
  "status": "in-progress"
}
```

#### Deletar uma tarefa
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

---

## 📚 Estrutura do Projeto

```
task-manager/
├── src/
│   ├── auth/              # Módulo de autenticação
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── auth.module.ts
│   ├── users/              # Módulo de usuários
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── tasks/              # Módulo de tarefas
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks.module.ts
│   │   └── dto/
│   ├── database/           # Configuração do banco
│   │   ├── database.module.ts
│   │   ├── database.provider.ts
│   │   ├── database.schema.ts
│   │   └── migrate.ts
│   ├── common/             # Utilitários compartilhados
│   │   └── interceptors/
│   │       └── bigint.interceptor.ts
│   ├── app.module.ts       # Módulo raiz
│   └── main.ts             # Entry point
├── migrations/             # SQL migrations
│   └── 001_initial_schema.sql
├── docker-compose.yml      # Configuração Docker
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/users/sign-up` | Registrar novo usuário | ❌ |
| POST | `/users/sign-in` | Fazer login | ❌ |

### Tarefas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/tasks` | Criar nova tarefa | ✅ |
| GET | `/tasks` | Listar tarefas do usuário | ✅ |
| GET | `/tasks/:id` | Buscar tarefa específica | ✅ |
| PATCH | `/tasks/:id` | Atualizar tarefa | ✅ |
| DELETE | `/tasks/:id` | Deletar tarefa | ✅ |

### Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/users/:id` | Buscar usuário por ID | ❌ |

---

## 🗄️ Banco de Dados

### Schema

#### Tabela `users`
- `id` (UUID) - Primary Key
- `name` (VARCHAR) - Nome do usuário
- `email` (VARCHAR) - Email único
- `password` (VARCHAR) - Senha criptografada
- `createdAt` (TIMESTAMP) - Data de criação

#### Tabela `tasks`
- `id` (UUID) - Primary Key
- `title` (VARCHAR) - Título da tarefa
- `description` (TEXT) - Descrição opcional
- `status` (VARCHAR) - Status: 'pending', 'in-progress', 'done'
- `tip` (TEXT) - Dica motivacional
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização
- `user_id` (UUID) - Foreign Key para users

### Migrations

Execute as migrations com:
```bash
pnpm run migrate
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run start:dev      # Inicia com hot reload
pnpm run start:debug    # Inicia em modo debug

# Produção
pnpm run build          # Compila o projeto
pnpm run start:prod     # Inicia em produção

# Qualidade de código
pnpm run lint           # Executa o linter
pnpm run format         # Formata o código

# Testes
pnpm run test           # Executa testes unitários
pnpm run test:watch     # Executa testes em watch mode
pnpm run test:cov       # Gera relatório de cobertura
pnpm run test:e2e       # Executa testes end-to-end

# Banco de dados
pnpm run migrate        # Executa migrations
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/task_manager

# JWT
SECRET_KEY=sua-chave-secreta-super-segura-aqui

# Server
PORT=3000
```

**⚠️ Importante:** Nunca commite o arquivo `.env` no repositório!

---

## 🧪 Testes

```bash
# Executar todos os testes
pnpm run test

# Executar testes em watch mode
pnpm run test:watch

# Executar testes com cobertura
pnpm run test:cov

# Executar testes e2e
pnpm run test:e2e
```

---

## 🐳 Docker

### Iniciar o banco de dados
```bash
docker-compose up -d
```

### Parar o banco de dados
```bash
docker-compose down
```

### Ver logs do banco
```bash
docker-compose logs -f postgres
```

### Acessar o banco via psql
```bash
docker exec -it task-manager-postgres psql -U postgres -d task_manager
```

---

## 🏗️ Arquitetura

O projeto segue a arquitetura modular do NestJS:

- **Módulos**: Organizam funcionalidades relacionadas
- **Controllers**: Lidam com requisições HTTP
- **Services**: Contêm a lógica de negócio
- **Guards**: Protegem rotas e validam autenticação
- **Interceptors**: Transformam dados de requisições/respostas
- **DTOs**: Validam e tipam dados de entrada

### Fluxo de Autenticação

1. Usuário faz login → `AuthService` valida credenciais
2. JWT token é gerado → Retornado ao cliente
3. Cliente envia token → `AuthGuard` valida token
4. Token válido → Usuário autenticado, acesso permitido

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela! ⭐**

</div>
