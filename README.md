# AJAXPR

## Visão Geral
O **AJAXPR** é um ecossistema web desenvolvido com tecnologias front-end nativas (HTML5, CSS3 e JavaScript) voltado para a simulação de um ambiente de controle de acesso multiperfil (Cadastro, Login, Funcionário e Supervisor). A aplicação implementa o consumo assíncrono de dados através de requisições AJAX, utilizando um arquivo estruturado JSON local como repositório de dados simulado para gerenciar fluxos de validação e permissões de usuários.

---

## Funcionalidades Principais
* **Autenticação Multiperfil:** Mecanismo de validação de credenciais com redirecionamento dinâmico baseado no nível de privilégio (Funcionário ou Supervisor).
* **Comunicação Assíncrona via AJAX:** Atualização parcial de dados e validações estruturais sem a necessidade de recarregamento completo das páginas.
* **Persistência de Dados Simulada:** Simulação de operações de leitura de dados de usuários centralizadas em um arquivo JSON local.
* **Arquitetura Modularizada:** Distribuição isolada de responsabilidades onde cada view possui sua própria folha de estilo e script de comportamento dedicados.
* **Tratamento de Rotas Inválidas:** Filtro básico de segurança que direciona o fluxo de navegação para uma página de erro customizada em caso de exceções ou falhas de autenticação.

---

## Tecnologias e Conceitos Utilizados
* **Estruturação de Views:** HTML5 Semântico
* **Design e Identidade Visual:** CSS3 com estilização modularizada por escopo de tela
* **Programação e Comportamento:** JavaScript Nativo (Vanilla JS) com manipulação ativa da árvore do DOM
* **Protocolo de Comunicação:** AJAX (XMLHttpRequest ou Fetch API) para tráfego assíncrono de requisições
* **Formato de Dados:** JSON (JavaScript Object Notation) para representação de registros

---

## Estrutura do Projeto
Organização dos pacotes, arquivos e diretórios que compõem o repositório:

```text
AJAXPRDB/
├── css/                 # Folhas de estilo segregadas por escopo de interface
│   ├── cadastro.css
│   ├── erro.css
│   ├── funcionario.css
│   ├── login.css
│   ├── style.css
│   └── supervisor.css
├── db/                  # Camada de persistência local simulada
│   └── db.json          # Base de dados estruturada contendo registros de usuários
├── js/                  # Camada de comportamento e regras de validação
│   ├── app.js           # Script de inicialização e configurações globais
│   ├── cadastro.js      # Gerenciamento de eventos de formulário de registro
│   ├── funcionario.js   # Lógica e renderização do painel do funcionário
│   ├── login.js         # Validação de credenciais e controle de sessão local
│   └── supervisor.js    # Controle do painel administrativo de alta permissão
├── cadastro.html        # Interface de registro de novos usuários
├── erro.html            # Tela de tratamento de exceções de acesso
├── funcionario.html     # Painel de operações de nível operacional
├── index.html           # Ponto de entrada e roteador inicial da aplicação
├── login.html           # Interface de autenticação de usuários
└── supervisor.html      # Painel de controle de nível administrativo

```

---

## Fluxo Operacional do Sistema

1. O usuário acessa a raiz da aplicação através do arquivo `index.html`.
2. O sistema executa uma rotina de verificação inicial e redireciona o fluxo para a tela de autenticação (`login.html`).
3. Após a submissão do formulário, uma requisição AJAX valida os dados informados contra o arquivo `db/db.json`:
* Credenciais associadas ao perfil de Operador direcionam o usuário para `funcionario.html`.
* Credenciais associadas ao perfil de Administrador direcionam o usuário para `supervisor.html`.


4. Tentativas de acesso direto a páginas restritas sem tokens de validação ativos disparam o carregamento da view `erro.html`.

---

## Como Executar o Projeto

1. **Clonar o repositório:**
```bash
git clone [https://github.com/maduaperes/AJAXPR.git](https://github.com/maduaperes/AJAXPR.git)

```


2. **Requisito de Inicialização (Servidor Local):**
Devido às restrições de segurança do navegador relacionadas a requisições de arquivos locais (política CORS), este projeto **obrigatoriamente** requer a execução sob um servidor HTTP.
* Utilize a extensão **Live Server** no VS Code, ou configure servidores locais como **Apache (XAMPP)**, ou rode um servidor embutido via terminal:
```bash
# Exemplo utilizando Python
python -m http.server 8000

```




3. **Acesso ao Sistema:**
Abra o navegador e acesse o endereço fornecido pelo seu servidor local (ex: `http://localhost:8000`).

---

## Escopo Técnico e Limitações

Por se tratar de um projeto de caráter estritamente didático focado no comportamento client-side, o sistema possui as seguintes características de escopo:

* A gravação direta de novos registros no arquivo `db.json` via JavaScript puro possui limitações físicas no ecossistema do navegador sem uma API de backend ativa para escrita em disco (I/O).
* O tráfego de informações de autenticação não implementa camadas de criptografia ou tokens de segurança reais (como JWT).

---

## Objetivo Educacional

Este repositório cumpre o propósito de portfólio prático para consolidação de conceitos essenciais de desenvolvimento front-end, tais como:

* O funcionamento do modelo de requisição/resposta assíncrono em arquiteturas web.
* Gerenciamento de fluxo de navegação e proteção básica de telas no lado do cliente.
* Manipulação, leitura e parseamento de estruturas de dados baseadas no formato JSON.
