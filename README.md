
## Description

Aplicação para vaga de desenvolvedor NodeJs.

## Considerações Gerais

Foi efetuado tudo que foi solicitado pelos requisitos do teste.
  -> Observação 1: para os testes unitarios, que realizei apenas o do model "Books" (pois preciso entregar hoje o teste, pois não estarei na cidade amanhã)
  -> Observação 2: não foi implementado um tratamento de erros e exceções de forma solida, pois me faltou um pouco de tempo e tambem acredito nao ser tanto o escopo do teste.

## Installation

  * Com docker rodando no host, para setar o DB digitar no folder com o arquivo docker-compose.yml:
		
    docker-compose up -d

	* Para iniciar a aplicação modo dev:

		npm run start:dev

	* Para iniciar os testes unitarios:

		npm run test -- book
	
  * Foi retirado o .env do gitIgnore para facilitar o teste de voces, por isso o arquivo se 			encontra no repositorio remoto.


## Aplicação estruturada em tres modulos principais:

  * modulo de autenticação (path: /authentication/sign-in e /authentication/sign-up)
    * Bearer token (colar no campo Authorizarion no header e Bearer + TOKEN gerado para rota /sign-in)
    * Unicas rotas liberadas da aplicação. O restante segue conforme abaixo:

  * modulo de API (path: /api/v1/books)
    * para integrações com apps de terceiros;
    * acesso total ao CRUD de livros, inclusive alterar para disponivel “isAvailable”, para uma devolução de livro por exemplo;
    * Acesso apenas por role de ADMIN;
      * Criado apenas perfis estaticos de ADMIN, para login como ADMIN 				e ter acesso total a API, utilizar esse password:
			5C9771CCEBE2350F1FE623C2D8A0F7BC80FAE6A36AC909D6CAE3A97A

  * modulo de APP (path: /books)
    * rotas de listagem de livros;
    * rotas para listar um unico livro (por id);
    * rota para alugar livro por id (no caso apenas um patch  alterando o campo available para false;
    * Liberado para usuarios de perfil REGULAR


## Estrutura de pesquisa nas rotas listagem
  * Feita por QueryParams
  * Pode ser utilizado qualquer campo da entidade book para a pesquisa conforme abaixo:
    * _id , title, author, publisher, lengthInPages, publishedIn, topic, format, isAvailable
    * 'page', 'fields', 'limit', 'sort', palavras reservadas da query para paginação, limit, etc
    * exemplo:
      * http://localhost:3000/api/v1/books?lengthInPages=250 (busca livros com 250)
      * http://localhost:3000/api/v1/books?topic=drama (busca livros com topics que contem drama)
      * http://localhost:3000/api/v1/books?limit=1 (retorna um resultado)
      * possivel combinações ex.: ?limit=2&format=pdf


## Qualquer duvida à disposição.

# Obrigado pela oportunidade!