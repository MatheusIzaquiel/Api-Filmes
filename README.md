Api-Filmes
Uma API RESTful para gerenciamento de filmes, construída com Node.js, Express e Prisma. Permite operações CRUD (Create, Read, Update, Delete) para filmes, com campos como título, descrição e banner.
Tecnologias Utilizadas

Node.js: Ambiente de execução JavaScript.
Express: Framework para construção da API.
Prisma: ORM para interação com o banco de dados.
PostgreSQL/MySQL: Banco de dados relacional (ajuste conforme usado).
Git: Controle de versão.

Pré-requisitos

Node.js (v16 ou superior) instalado. Baixe aqui.
Git instalado. Baixe aqui.
Um banco de dados configurado (ex.: PostgreSQL ou MySQL).
Ferramenta para testar APIs (ex.: Postman ou cURL).

Instalação

Clone o repositório:
git clone https://github.com/MatheusIzaquiel/Api-Filmes.git
cd Api-Filmes


Instale as dependências:
npm install


Configure o banco de dados:

Crie um arquivo .env na raiz do projeto com a URL do banco de dados:DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

(Ajuste para MySQL ou outro banco, se necessário.)
Sincronize o schema do Prisma:npx prisma db push


Opcional: Use o Prisma Studio para visualizar os dados:npx prisma studio




Inicie o servidor:
npm start

O servidor rodará em http://localhost:3344.


Endpoints da API
A API oferece as seguintes rotas para gerenciar filmes:



Método
Endpoint
Descrição



GET
/films
Lista todos os filmes.


POST
/films
Cria um novo filme.


PUT
/films/:id
Atualiza um filme pelo ID.


DELETE
/films/:id
Deleta um filme pelo ID.


Exemplos de Requisições
1. Listar todos os filmes (GET)
curl http://localhost:3344/films

Resposta:
{
  "films": [
    {
      "id": 1,
      "title": "Superman",
      "description": "Um herói movido pela crença...",
      "banner": "data:image/jpeg;base64,..."
    }
  ]
}

2. Criar um filme (POST)
curl -X POST http://localhost:3344/films \
-H "Content-Type: application/json" \
-d '{"title":"Novo Filme","description":"Descrição do filme","banner":"url_do_banner"}'

Resposta:
{
  "message": "O filme Novo Filme foi adicionado com sucesso",
  "data": {
    "id": 2,
    "title": "Novo Filme",
    "description": "Descrição do filme",
    "banner": "url_do_banner"
  }
}

3. Atualizar um filme (PUT)
curl -X PUT http://localhost:3344/films/1 \
-H "Content-Type: application/json" \
-d '{"title":"Superman Atualizado","description":"Nova descrição"}'

Resposta:
{
  "message": "O filme Superman Atualizado foi atualizado com sucesso!",
  "data": {
    "id": 1,
    "title": "Superman Atualizado",
    "description": "Nova descrição",
    "banner": "url_do_banner"
  }
}

4. Deletar um filme (DELETE)
curl -X DELETE http://localhost:3344/films/1

Resposta:
{
  "message": "O filme foi apagado do banco de dados!",
  "data": {
    "id": 1,
    "title": "Superman",
    "description": "Um herói movido pela crença...",
    "banner": "url_do_banner"
  }
}

Estrutura do Projeto
Api-Filmes/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── routes/
│   └── films.js
├── utils/
│   └── prisma.js
├── .gitignore
├── index.js
├── package.json
└── README.md

Resolução de Problemas

Erro 500 ao atualizar/deletar: Verifique se o ID é válido e se o banco está sincronizado (npx prisma db push).
Erro de conexão com o banco: Confirme a variável DATABASE_URL no .env.
Erro de módulo não encontrado: Rode npm install para instalar dependências.

Contribuição

Faça um fork do repositório.
Crie um branch para sua feature: git checkout -b minha-feature.
Commit suas mudanças: git commit -m "Adiciona minha feature".
Envie para o repositório remoto: git push origin minha-feature.
Abra um Pull Request.

Licença
Este projeto é licenciado sob a MIT License.
