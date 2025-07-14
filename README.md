
# Rilix - Projeto Full Stack

Este projeto é composto por:

- **Backend:** Node.js + Express + PostgreSQL
- **Frontend:** React + Vite
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker + Docker Compose

---

## 🚀 Pré-requisitos

Certifique-se de ter instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Git (opcional, se for clonar o repositório)

---

## ⚙️ Configuração Inicial

### 1. Clone o repositório principal (monorepo)

```bash
git clone https://github.com/joaovitorcorrea06/rilix-teste-completo.git
cd rilix-teste-completo
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```bash
cd backend
cp .env
```

Preencha com:

```env
PORT=4000
DATABASE_URL=postgres://rilix:rilix123@db:5432/rilixdb
```

Volte para a raiz:

```bash
cd ..
```

---

## 🐳 Rodar o Projeto com Docker

Na raiz do projeto (`rilix-teste-completo/`), execute:

```bash
docker-compose up --build
```

O Docker irá:

1. Criar o banco de dados PostgreSQL
2. Subir o backend com Node.js
3. Construir e servir o frontend com Nginx

---

## 🌐 Acessar a Aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Banco de Dados: localhost:5432 (usuário: postgres / senha: postgres)

---

## 🧪 Testes (E2E com TestCafe)

Para rodar os testes de ponta a ponta:

1. Certifique-se que a aplicação está rodando (`docker-compose up`)
2. Em outro terminal, vá até a pasta do frontend:

```bash
cd rilix-frontend
```
3. Instale as dependências (se ainda não fez):

```bash
npm install
```

4. Execute todos os testes e2e com:

```bash
npm run test:e2e
```

---

## 🛠️ Comandos úteis

```bash
# Derrubar os containers
docker-compose down

# Remover tudo e começar do zero
docker-compose down -v --remove-orphans
docker system prune -a

# Rebuild apenas backend
docker-compose build backend

# Ver logs do backend
docker-compose logs -f backend
```

---

## 🧩 Tecnologias Utilizadas

| Camada     | Tecnologias |
|------------|-------------|
| Frontend   | React, Vite, TailwindCSS, TanStack Query, Toastify |
| Backend    | Node.js, Express, PostgreSQL, pg, dotenv |
| Banco      | PostgreSQL |
| Infra      | Docker, Docker Compose, Nginx |
| Testes     | TestCafe |

---

## 📌 Considerações

- A API utiliza o PostgreSQL como persistência e está configurada para iniciar com um banco vazio.
- A criação de tabelas e estruturas é feita automaticamente ao iniciar.
- A aplicação é dividida de forma modular e pronta para ambientes de staging ou produção com pequenos ajustes.
