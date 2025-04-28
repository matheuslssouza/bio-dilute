## 📦 Back-end - Java/Spring
### 🛠️ Tecnologias Utilizadas
- Java.
- Spring Boot (construção da API REST).
- Spring Security (filtros de segurança — autenticação e autorização).
- JWT (JSON Web Token — autenticação baseada em tokens). 
- PostgreSQL (banco de dados relacional)

### 📂 Distribuição de pastas
- **/auth** - Arquivos referentes a autenticação e autorização.
- **/user** - Arquivos referentes ao usuário.
- **/config** - Configurações de CORS e dos filtros do Spring Security.
- **/auth/security** - Contém as classes responsáveis pela autenticação e segurança da aplicação, incluindo recuperação do token, validação, implementação do UserDetailsService e persistência dos filtros de segurança do Spring Security.

Em ambos os diretórios de /auth e /user foram utilizados o padrão de pastas exemplificado abaixo:
- **controller** - Responsável por receber as requisições, repassar para o service e retornar as respostas.
- **service** - Contém a lógica de negócio da aplicação.
- **repository** - Responsável pela comunicação com o banco de dados.
- **entity** - Representa as entidades/tabelas da aplicação, geralmente mapeadas para o banco de dados.
- **dto** - Objetos usados para transferir dados entre camadas, normalmente entre o controller e o service.

*Configurações necessárias:*
- Criar o arquivo application.properties no diretório back-end/biodilute/src/main/resources com as seguintes configurações abaixo.
```yaml
spring.application.name=BioDilute
spring.datasource.url=jdbc {url do postgresql}
spring.datasource.username= {Usuário do banco de dados}
spring.datasource.password= {Senha do banco de dados}
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

api.security.token.secret= {Token de segurança aqui}
```

### 📝 Diagrama da aplicação
![App Screenshot](./src/main/resources/static/fluxo_app.jpeg)


### 📍 API Rotas
### Descrição
#### 🔑 Rotas de Autenticação (com.biodilute.biodilute.auth):
| rota             | descrição                                     
|----------------------|-----------------------------------------------------
POST /auth | Realiza o login do usuário e retorna o token JWT. [Veja detalhes da req/res](#)
GET /auth/verify | Verifica a validade do token JWT e retorna o estado de autenticação do usuário. [Veja detalhes da req/res](#)

#### 👥 Rotas do usuário (com.biodilute.biodilute.user):

**Públicas**:

| rota             | descrição                                          
|----------------------|-----------------------------------------------------
| GET /register     | Registra um novo usuário [Veja detalhes da req/res](#)

**Privadas (Necessitam autenticação):**
| rota             | descrição                                          
|----------------------|-----------------------------------------------------
| GET /experiments     | Retorna todos os experimentos do usuário autenticado. [Veja detalhes da req/res](#)
| POST /experiment    | Adiciona um novo experimento para o usuário autenticado. [Veja detalhes da req/res](#)
| POST /experiments/update    | Atualiza um experimento existente para o usuário autenticado. [Veja detalhes da req/res](#)
| POST /experiments/delete     | Deleta um experimento para o usuário autenticado.[Veja detalhes da req/res](#)
-----------------------------------------------------
### Descrição da requisição ou resposta - Rotas de Autenticação (biodilute.auth)

### 📩 POST /auth

**Requisição**
```json
{
  "username": "usuario",
  "password": "senha"
}
```

**Resposta**
```json
{
  "token": "exEmpLoiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW9fZG9lIiwiZXhwIjoxNjM4NzYwNDA2fQ.QZvwQ9H2L1sdzjOFAK9cXK-QkFJZ8R5RVfnuyV0Tfow"
}
```

### GET /auth/verify

**Resposta**
```json
{
  "authenticated": true
}
```
-----------------------------------------------------
### Descrição da requisição ou resposta - Rotas do usuário (biodilute.user)
** Em todas rotas privadas são necessários o envio do JWT token para autorização. **


### 📩 POST /register

**Requisição**
```json
{
  "username": "usuario",
  "password": "senha",
  "email": "teste@exemplo.com"
}
```

**Resposta**
```json
{
  "message": "Usuário registrado com sucesso"
}
```

### 📩 GET /experiments
Utilização de header com 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

**Resposta**
```json
[
  {
    "id": 1,
    "experimentName": "Experimento 1",
    "ingredient": "Descrição do Experimento 1",
    "date": "21/04/2025",
    "weight": "10.36",
    "volume": "10.0",
    "solvent": "text",
    "methodDilution": "text",
    "observations": "text",
    "userId": "1"
  },
  {
    "id": 2,
    "experimentName": "Experimento 2",
    "ingredient": "Descrição do Experimento 2",
    "date": "21/04/2025",
    "weight": "10.36",
    "volume": "10.0",
    "solvent": "text",
    "methodDilution": "text",
    "observations": "text",
    "userId": "1"
  }
]
```

### 📩 POST /experiments
Utilização de header com 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

**Requisição**
```json
 {
    "id": 3,
    "experimentName": "Experimento 3",
    "ingredient": "Descrição do Experimento 3",
    "date": "21/04/2025",
    "weight": "10.36",
    "volume": "10.0",
    "solvent": "text",
    "methodDilution": "text",
    "observations": "text",
  }
```

**Resposta**
```json
{
  "message": "Experimento criado com sucesso!"
}
```

### 📩 POST /experiments/update
Utilização de header com 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

**Requisição**
```json
{
    "id": 3,
    "experimentName": "Experimento 5",
    "ingredient": "Descrição do Experimento 3",
    "date": "21/04/2025",
    "weight": "10.36",
    "volume": "10.0",
    "solvent": "text",
    "methodDilution": "text",
    "observations": "text",
  }
```

**Resposta**
```json
{
  "message": "Experimento atualizado com sucesso!"
}
```

### 📩 POST /experiments/delete
Utilização de header com 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

**Requisição**
``` json
{
  "id": 1,
}
```

**Resposta**
```json
{
  "status": "Deletado com sucesso!"
}
```

## 📝 Lições Aprendidas
Durante o desenvolvimento deste projeto, adquiri experiência prática com uma série de tecnologias e práticas recomendadas. Abaixo estão as principais lições aprendidas:

### 1. Autenticação e Autorização com JWT
Aprendizado: Aprendi a implementar autenticação e autorização em uma API utilizando JSON Web Tokens (JWT). Compreendi como gerar, validar e proteger endpoints com tokens, garantindo que apenas usuários autenticados possam acessar recursos privados.

Tecnologias Utilizadas:

Spring Security: Gerenciamento da segurança da aplicação e configuração de filtros de autenticação.

JWT (JSON Web Token): Geração e verificação de tokens JWT para autenticação.

### 2. Configuração de Segurança no Spring Boot
Aprendizado: Explorei como o Spring Security facilita a configuração de filtros de segurança e a proteção das rotas de uma aplicação. Além disso, configurei o CORS para permitir requisições de origens externas. O processo de autenticação e validação de tokens JWT foi integrado de forma a garantir segurança e controle no acesso à API.

Abaixo está o resumo básico do funcionamento dos filtros aplicados na minha aplicação:

**Requisição de Login**
1. Controller recebe login

2. Cria UsernamePasswordAuthenticationToken (não autenticado)

3. authenticationManager.authenticate(token)

       └─> ProviderManager

       └─> DaoAuthenticationProvider

       ├─> loadUserByUsername() → busca no banco

       ├─> passwordEncoder.matches()

       └─> retorna UsernamePasswordAuthenticationToken (autenticado)

5. Controller gera JWT com base no Authentication

**Validação do Token**
1. Cliente envia requisição com cabeçalho:

   Authorization: Bearer <jwt_token>

2. A requisição entra na SecurityFilterChain

    └─> Antes do UsernamePasswordAuthenticationFilter,
       entra seu SecurityFilter (OncePerRequestFilter)

4. SecurityFilter.doFilterInternal(...)

       ├─> recoverToken(request)

       └─> authService.validateToken(token)

         ├─> JWT é decodificado (normalmente usando a chave secreta)

         └─> login extraído do payload

6. Se o token é válido:

       ├─> Busca usuário no banco: usersRepository.findByUsername(login)

       └─> Cria novo UsernamePasswordAuthenticationToken:

      principal = Users (objeto do banco)

      credentials = null

      authorities = ["ROLE_USER"]

       └─> Seta no SecurityContextHolder

8. O Spring agora considera a requisição autenticada

       └─> O Controller pode acessar o usuário autenticado via:

   SecurityContextHolder.getContext().getAuthentication()

Tecnologias Utilizadas:

Spring Security: Para segurança da API e validação de tokens.

CORS: Configuração para permitir acesso a APIs de diferentes domínios.

### 3. Gerenciamento de Sessões com Tokens JWT
Aprendizado: Entendi como os tokens JWT podem ser usados para gerenciar sessões de usuário de maneira segura, sem a necessidade de armazenar dados de sessão no servidor. Isso garante escalabilidade, pois os tokens são autossuficientes.

Tecnologias Utilizadas:

localStorage: Armazenamento do token JWT no navegador para persistência entre as requisições.

Authorization Header: Envio do token no cabeçalho de autorização nas requisições para endpoints protegidos.

### 4. Padrões de Arquitetura para Manutenção e Escalabilidade
Aprendizado: Aprendi a aplicar a arquitetura em camadas em minhas aplicações, utilizando as camadas de controller, service, repository e dto para separar responsabilidades e tornar o código mais modular e de fácil manutenção.

Tecnologias Utilizadas:

Spring Boot: Estrutura para organizar o projeto em camadas.

Spring Data JPA: Para simplificar a comunicação com o banco de dados.

### 5. Validação de Tokens e Segurança de API
Aprendizado: Entendi a importância de validar tokens em cada requisição para garantir que apenas usuários autenticados possam acessar os recursos. A validação é feita no backend para verificar se o token é válido e não expirou.

Tecnologias Utilizadas:

Spring Security: Implementação de filtros para validar tokens JWT.

JWT: Manipulação e validação de tokens no backend.

### 6. Integração de Banco de Dados com PostgreSQL
Aprendizado: Aprendi a integrar o Spring Boot com o PostgreSQL, usando JPA e Spring Data para realizar operações de CRUD e garantir a persistência dos dados.

Tecnologias Utilizadas:

PostgreSQL: Banco de dados relacional utilizado para persistir as informações.

Spring Data JPA: Facilita a comunicação entre o Spring Boot e o banco de dados.

### 7. Desenvolvimento de API RESTful
Aprendizado: Melhorei minhas habilidades em criar APIs RESTful seguindo as melhores práticas, incluindo a definição clara de rotas, utilização adequada dos HTTP verbs (GET, POST, PUT, DELETE) e retorno adequado de status HTTP.

Tecnologias Utilizadas:

Spring Boot: Framework principal utilizado para criar os endpoints RESTful.

Spring Web: Para construir a estrutura da API.


