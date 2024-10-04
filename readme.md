# DOCUMENTACAO PROJETO ECOMERCE

## BIBLIOTECAS DEV
@TYPES/BCRYPT, @TYPES/EXPRESS, @TYPES/PG, NODEMON, TS-NODE, TYPESCRIPT

## BIBLIOTECA DEP
@TYPES/JSONWEBTOKEN, @TYPES/UUID, AXIOS, BCRYPT, DOTENV, EXPRESS, JSONWEBTOKEN, PG, UUID 

## EXPLICACAO
Estou desenvolvendo uma API para meus estudos, e aplicando todo conhecimento que possuo de aprendizado da cubos, pretendo usar essa API tambem para esse proximo modulo que sera HTML, CSS, assim terei uma API funcional assim que o curso concluir, pretendo me aperfeicoar totalmente no backend.

## COMO USAR A API?
Primeiramente va ate o local onde fez o `git clone`, apos isso abra o Terminal por la, assim voce estara no local do arquivo e ficara facil executar esses comandos:

o primeiro vai ser `npm i` ou `npm install` da no mesmo, assim vai ser instalado toda a dependencia do projeto.

vou tambem deixar vario um arquivo APAGAR.env para que seja configurado para acessar a API.. Dentro do APAGAR.env coloque - ```json lembrando que precisa editar o nome do arquivo e remover o APAGAR```
 
```ts
PORT=             // Geralmente usamos a porta 3000/3001 etc para testes

PG_USER=postgres       // Estou deixando tudo padrao para teste
PG_PASSWORD=postgres      // Estou deixando tudo padrao para teste
PG_HOST=localhost                // Estou deixando tudo padrao para teste
PG_PORT=5432                      // Estou deixando tudo padrao para teste
PG_DATABASE= ecommerce_db           // Estou deixando tudo padrao para teste

SECRET_JWT=1pOGVe9nhQ6LUDtARnGKo // Senha para poder criar o token 
```

tambem vou deixar vazio um arquivo chamado APAGAR.docker-compose.yml - ```json lembrando que precisa editar o nome do arquivo e remover o APAGAR```

```ts
services:
  db:
    container_name: ecommerce_db
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=postgres  // Estou deixando tudo padrao para teste
      - POSTGRES_USER=postgres      // Estou deixando tudo padrao para teste
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports: 
      - 5432:5432    // Estou deixando tudo padrao para teste

```

para rodar o docker-compose usar o comando no terminal da pasta onde se encontra os arquivos, comando: `docker compose up -d` e quando quiser desligar o conteiner `docker compose down` lembrando que precisa do Docker aberto no Desktop

para inicializar a API digite o comando `npm run dev` e fica a sua escolha, usar o Postman ou Insonia para testar a API


## DESENVOLVIMENTO

1. Criar com Navicat toda estrutuda de banco de dados para poder estiliza-la na API.

2. criar uma pagina de login, quem tiver acesso a essa parte podera manipular todo o sistema

3. vamos cadastrar um banco de dados para usuario e tambem para produtos

4. vamos desenvolver a rota da api para login, cadastro de produto, remover produto, venda, desconto do produto

5. vamos por uma integracao a outra api que faz pagamento
