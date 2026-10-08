# 🏢 Condominium Management — Frontend

Aplicação web para gerenciamento de condomínios residenciais, desenvolvida com React e TypeScript. O sistema oferece uma interface para interação com a API REST do Condominium Management, permitindo o gerenciamento de condomínios, blocos, unidades habitacionais, moradores e autenticação de usuários.

## 📋 Sobre o projeto

O **Condominium Management** é um projeto acadêmico desenvolvido para aplicar conceitos de desenvolvimento frontend, componentização, integração com APIs REST, gerenciamento de estado e testes automatizados.

A aplicação utiliza uma arquitetura organizada por módulos e componentes reutilizáveis, buscando manter o código legível, modular e de fácil manutenção.

## 🚀 Tecnologias utilizadas

- **React** — construção de interfaces baseadas em componentes.
- **TypeScript** — tipagem estática para maior segurança e previsibilidade do código.
- **Vite** — ferramenta de desenvolvimento e build.
- **React Router** — gerenciamento de rotas e navegação.
- **Axios** — comunicação HTTP com a API REST.
- **Tailwind CSS** — estilização da interface, caso esteja configurado no projeto.
- **Lucide React** — biblioteca de ícones.
- **Jest** — execução de testes automatizados.
- **Git** — controle de versão.

## ✨ Funcionalidades

- **Autenticação:** formulário de login e integração com a API para autenticação de usuários.
- **Gerenciamento de condomínios:** interface para operações relacionadas aos condomínios.
- **Gerenciamento de blocos:** organização dos blocos vinculados aos condomínios.
- **Gerenciamento de unidades:** gerenciamento das unidades habitacionais.
- **Gerenciamento de moradores:** cadastro, consulta e edição de informações dos moradores.
- **Integração com API REST:** comunicação com o backend para envio e recebimento de dados.
- **Feedback visual:** apresentação de mensagens para informar o resultado das operações e possíveis erros.

> As funcionalidades disponíveis na interface dependem das permissões do usuário e dos recursos implementados no backend.

## 🏗️ Organização do projeto

A aplicação é organizada por funcionalidades, com separação entre páginas, componentes, hooks e serviços.

Exemplo conceitual da organização:

```text
src/
├── services/
│   └── tests/
├── shared/
│   └── components/
├── auth/
├── condominiums/
├── blocks/
├── units/
├── residents/
└── ...
```

A estrutura acima é ilustrativa. Os nomes e diretórios devem corresponder à organização efetiva do repositório.

### Componentes reutilizáveis

Os componentes compartilhados permitem reaproveitar elementos da interface em diferentes módulos, reduzindo duplicação e facilitando a manutenção.

### Serviços e integração com a API

Os serviços concentram as chamadas HTTP realizadas pelo frontend, utilizando Axios para se comunicar com o backend.

A URL base da API é configurada por meio de uma variável de ambiente, permitindo utilizar diferentes endereços nos ambientes de desenvolvimento e produção.

### Hooks

Os hooks encapsulam lógica reutilizável da aplicação, facilitando a separação entre comportamento, acesso aos dados e apresentação da interface.

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node.js em uma versão compatível com o projeto.
- npm.
- Git.
- Backend do Condominium Management em execução ou acessível por uma URL.

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta do projeto:

```bash
cd condominium-management
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
```

Substitua a URL pelo endereço em que o backend está disponível.

> No Vite, as variáveis expostas ao código do frontend utilizam o prefixo `VITE_`. Não armazene senhas, chaves privadas ou outros segredos nesse arquivo, pois as variáveis disponibilizadas ao frontend podem ser acessadas pelo navegador.

### 4. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

### 5. Gere a versão de produção

```bash
npm run build
```

Os arquivos gerados estarão no diretório de build configurado pelo Vite, normalmente `dist/`.

Para testar localmente a versão compilada, caso o script esteja configurado:

```bash
npm run preview
```

## 🧪 Testes automatizados

O projeto utiliza Jest para executar testes automatizados dos serviços do frontend.

Entre os serviços contemplados pelos testes estão:

- `authService`
- `residentService`
- `unitService`
- `condominiumService`
- `blockService`

Para executar os testes:

```bash
npm test
```

O comando depende da configuração definida no `package.json`. Caso o script `test` não esteja configurado, execute o Jest diretamente:

```bash
npx jest
```

Os testes ajudam a verificar o comportamento dos serviços e a reduzir regressões durante a evolução da aplicação.

## 🌐 Deploy

O frontend pode ser publicado em uma plataforma de hospedagem compatível com aplicações Vite, como a Vercel.

Para o ambiente de produção:

1. Configure o repositório do frontend na plataforma de hospedagem.
2. Configure o comando de build como `npm run build`.
3. Configure o diretório de saída como `dist`.
4. Defina a variável `VITE_API_URL` com o endereço público do backend.
5. Verifique as configurações de CORS do backend para permitir as requisições originadas do domínio do frontend.

## 🛠️ Boas práticas aplicadas

- Componentização e reutilização de elementos da interface.
- Tipagem estática com TypeScript.
- Separação entre serviços de API, hooks e componentes.
- Centralização da configuração de acesso ao backend.
- Organização modular por funcionalidades.
- Utilização de variáveis de ambiente para configuração.
- Testes automatizados com Jest.

## 🎯 Objetivos de aprendizagem

Este projeto foi desenvolvido para consolidar conhecimentos em:

- Desenvolvimento de interfaces com React.
- TypeScript aplicado a aplicações web.
- Construção de aplicações com Vite.
- Consumo de APIs REST utilizando Axios.
- Organização de código e componentização.
- Testes automatizados com Jest.
- Configuração de aplicações para produção e deploy.

## 👨‍💻 Autor

**Luiz Henrique Carvalho Fontes**

Projeto acadêmico desenvolvido com foco em desenvolvimento frontend, integração com APIs REST e construção de aplicações web.

---

## Orientador
Professor Hudson Neves
