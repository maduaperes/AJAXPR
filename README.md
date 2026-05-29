# AJAXPRDB

## Visão Geral

O **AJAXPRDB** é um sistema web desenvolvido com HTML, CSS e JavaScript que simula um ambiente com múltiplos níveis de acesso (cadastro, login, funcionário e supervisor). O projeto utiliza um arquivo JSON como banco de dados simulado e realiza operações de leitura e escrita de dados via AJAX.

O sistema é dividido em páginas independentes e scripts específicos para cada funcionalidade, permitindo uma arquitetura modular e organizada.

---

## Funcionalidades

- Autenticação de usuários (login)
- Cadastro de novos usuários
- Controle de acesso por perfil (funcionário e supervisor)
- Painel de supervisor com maior nível de permissão
- Área de visualização para funcionários
- Sistema de redirecionamento em caso de erro
- Integração com banco de dados simulado (`db.json`)
- Comunicação via AJAX para manipulação de dados

---

## Estrutura de Pastas e Arquivos

```

AJAXPRDB/
│
├── cadastro.html
├── erro.html
├── funcionario.html
├── index.html
├── login.html
├── supervisor.html
│
├── css/
│   ├── cadastro.css
│   ├── erro.css
│   ├── funcionario.css
│   ├── login.css
│   ├── style.css
│   ├── supervisor.css
│
├── js/
│   ├── app.js
│   ├── cadastro.js
│   ├── funcionario.js
│   ├── login.js
│   ├── supervisor.js
│   └── content loaded
│
├── db/
│   └── db.json
│
└── .gitattributes

````

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- AJAX (requisições assíncronas)
- JSON (simulação de banco de dados)

---

## Módulos do Sistema

### Páginas
- **index.html**: Página inicial do sistema  
- **login.html**: Autenticação de usuários  
- **cadastro.html**: Registro de novos usuários  
- **funcionario.html**: Área do funcionário  
- **supervisor.html**: Painel administrativo  
- **erro.html**: Página de erro ou acesso inválido  

---

## JavaScript

- **app.js**: Inicialização geral do sistema  
- **login.js**: Autenticação e validação de login  
- **cadastro.js**: Cadastro de usuários e envio ao `db.json`  
- **funcionario.js**: Lógica da área do funcionário  
- **supervisor.js**: Funções do painel administrativo  
- **content loaded**: Inicialização automática após carregamento da página  

---

## CSS

- **style.css**: Estilos globais  
- **login.css**: Estilização do login  
- **cadastro.css**: Estilização do cadastro  
- **funcionario.css**: Estilização da área do funcionário  
- **supervisor.css**: Estilos do painel supervisor  
- **erro.css**: Estilização da página de erro  

---

## Banco de Dados (Simulado)

O arquivo `db/db.json` funciona como um banco de dados local simulado, armazenando informações como:

- Usuários cadastrados
- Perfis de acesso
- Dados utilizados pelas páginas do sistema

Esse arquivo é manipulado via AJAX para simular operações de backend.

---

## Fluxo do Sistema

1. Usuário acessa `index.html`
2. É redirecionado para `login.html`
3. Após autenticação:
   - Funcionário → `funcionario.html`
   - Supervisor → `supervisor.html`
4. Cadastro pode ser feito via `cadastro.html`
5. Erros levam para `erro.html`

---

## Como Executar

### 1. Clonar o projeto
```bash
git clone <url-do-repositorio>
````

### 2. Abrir em servidor local

Recomendado usar:

* Live Server (VS Code)
* XAMPP / Apache
* Qualquer servidor HTTP local

### 3. Acessar no navegador

Abra o arquivo:

```
index.html
```

---

## Requisitos

* Navegador moderno (Chrome, Opera, Edge, Firefox)
* Servidor local para evitar bloqueio de AJAX (CORS)

---

## Limitações

* Uso de banco de dados simulado (JSON)
* Sem autenticação criptografada
* Sem backend real
* Dependência de execução em servidor local

---

## Possíveis Melhorias

* Implementação de backend real (Node.js, PHP ou Firebase)
* Sistema de autenticação com JWT
* Criptografia de senhas
* Melhor organização de rotas
* Responsividade aprimorada
* Separação em arquitetura MVC
* Uso de framework frontend (React/Vue)

---

## Objetivo do Projeto

O objetivo do **AJAXPRDB** é demonstrar o funcionamento de:

* Requisições AJAX
* Manipulação de JSON como base de dados
* Separação de perfis de usuário
* Estrutura modular de aplicações web puras (Vanilla JS)

---

