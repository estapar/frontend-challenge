# Estapar B2B - Frontend Challenge

Aplicação frontend para gerenciamento de garagens e planos de mensalistas digitais, desenvolvida como solução para o teste técnico da Estapar.

## Funcionalidades

- Login com as credenciais da API mockada.
- Proteção das páginas internas por sessão.
- Dashboard com acesso às áreas principais.
- Listagem de garagens com código, nome, endereço, cidade/UF e regional.
- Busca de garagens por texto.
- Visualização dos detalhes da garagem em drawer sobreposto à listagem.
- Exibição de total de vagas, vagas ocupadas e vagas disponíveis.
- Listagem de planos com descrição, valor, vagas, ocupação, disponibilidade e status.
- Criação e edição de planos.
- Alteração do status ativo/inativo pelo modal de edição.
- Validação dos campos obrigatórios do formulário de plano.
- Estados de loading, erro e vazio.
- Layout responsivo.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 
- TanStack React Query
- Axios
- React Hook Form
- Zod
- Radix UI
- Lucide React
- Vitest
- Testing Library

## Como Rodar

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=https://mock.apidog.com/m1/1022746-1009361-default
```

Inicie o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

Credenciais:

```txt
Usuário: estapar
Senha: @estapar@
```

## Scripts

```bash
npm run dev
```

Executa o projeto em modo desenvolvimento.

```bash
npm run build
```

Gera a build de produção.

```bash
npm run start
```

Executa a build de produção.

```bash
npm run lint
```

Executa o ESLint.

```bash
npm test
```

Executa os testes unitários.

```bash
npm run test:watch
```

Executa os testes em modo watch.
