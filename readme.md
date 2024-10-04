# DOCUMENTAÇÃO DO PROJETO E-COMMERCE

## BIBLIOTECAS DE DESENVOLVIMENTO
@TYPES/BCRYPT, @TYPES/EXPRESS, @TYPES/PG, NODEMON, TS-NODE, TYPESCRIPT

## BIBLIOTECAS DE DEPENDÊNCIA
@TYPES/JSONWEBTOKEN, @TYPES/UUID, AXIOS, BCRYPT, DOTENV, EXPRESS, JSONWEBTOKEN, PG, UUID 

## EXPLICAÇÃO
Estou desenvolvendo uma API para meus estudos e aplicando todo o conhecimento que possuo adquirido no curso da Cubos. Pretendo usar essa API também neste próximo módulo, que será de HTML e CSS, assim terei uma API funcional assim que o curso for concluído. Meu objetivo é me aperfeiçoar totalmente no backend.

## COMO USAR A API?
Primeiramente, vá até o local onde você fez o `git clone`. Após isso, abra o terminal lá, assim você estará no local do arquivo e ficará fácil executar os comandos:

O primeiro comando será `npm i` ou `npm install`, ambos funcionam da mesma forma, e assim serão instaladas todas as dependências do projeto.

Vou também deixar um arquivo chamado `APAGAR.env`, que deve ser configurado para acessar a API. Dentro do `APAGAR.env`, coloque:

```json 
lembrando que é necessário editar o nome do arquivo e remover o "APAGAR"
```
 
```ts
PORT=             // Geralmente usamos a porta 3000/3001 etc para testes

PG_USER=postgres       // Estou deixando tudo padrao para teste
PG_PASSWORD=postgres      // Estou deixando tudo padrao para teste
PG_HOST=localhost                // Estou deixando tudo padrao para teste
PG_PORT=5432                      // Estou deixando tudo padrao para teste
PG_DATABASE= ecommerce_db           // Estou deixando tudo padrao para teste

SECRET_JWT=1pOGVe9nhQ6LUDtARnGKo // Senha para poder criar o token 
```

Também vou deixar um arquivo vazio chamado APAGAR.docker-compose.yml:

```json 
lembrando que é necessário editar o nome do arquivo e remover o "APAGAR"
```

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

Para rodar o Docker Compose, use o comando no terminal da pasta onde se encontram os arquivos: `docker compose up -d`.  Quando quiser desligar o contêiner, use `docker compose down`. Lembre-se de que o Docker precisa estar aberto no desktop.

para inicializar a API digite o comando `npm run dev` e fica a sua escolha, usar o Postman ou Insonia para testar a API


## DESENVOLVIMENTO

1. Criar, com o Navicat, toda a estrutura do banco de dados para poder estilizá-la na API.

2. Criar uma página de login. Quem tiver acesso a essa parte poderá manipular todo o sistema.

3. Criar um middleware para proteger a roda depois do longin.

4. Vamos desenvolver as rotas da API para login, cadastro de produto, remoção de produto, venda e desconto de produto.

5. Vamos implementar uma integração com outra API que realiza pagamentos.
