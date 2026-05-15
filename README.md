# 🧪 Teste Técnico - Frontend Estapar

Este projeto é um desafio técnico com foco em **desenvolvimento de interfaces administrativas** para o gerenciamento de garagens, vagas e planos destinados a mensalistas digitais.

> Para uma explicação mais detalhada das regras de negócio e histórias de usuário, acesse o [PROJECT-STORY.md](./PROJECT-STORY.md).

## 🎯 Objetivo

Criar uma interface funcional e responsiva baseada nos requisitos fornecidos em design e API mockada. O objetivo é simular a operação real de um sistema usado por gestores da Estapar.

---

## 📦 Funcionalidades

### 1. Lista de Garagens
- Exibição de garagens com: Código, Nome, Endereço, Cidade/UF e Regional.
- Campo de busca por nome.
- Drawer para visualização dos detalhes da garagem.

### 2. Gestão de Vagas e Planos
- Exibe: Nome do estacionamento, total de vagas, ocupadas e disponíveis.
- Lista de planos com descrição, valor, número de vagas, status e ações.
- Permite criar, editar e ativar/desativar planos.

### 3. Cadastro e Edição de Planos
- Formulário com:
  - Nome do plano
  - Tipo de veículo
  - Valores (mensal e diário)
  - Período de validade
  - Total de vagas e status
- Validações obrigatórias e feedback visual para ações (sucesso/erro).

---

## 🖼️ Layout

- [Acesse o Figma do projeto](https://www.figma.com/design/cwvQ8KyQNAu2eiXsSfok73/Figma-basics?node-id=1669-162202&p=f&t=OMR6MUhsita16qja-0)
- Utilize o modo de inspeção para seguir espaçamentos, tamanhos, cores, fontes e comportamento esperados.

---

## 🔐 Autenticação

Utilize as credenciais a seguir para autenticar na API mockada (quando necessário):

- Usuário: `estapar`
- Senha: `@estapar@`
- URL API mocada: [https://mock.apidog.com/m1/1022746-1009361-default](https://mock.apidog.com/m1/1022746-1009361-default)
- Documentação da API: [https://c6wu4yjlku.apidog.io](https://c6wu4yjlku.apidog.io)

Ao autenticar, será devolvido um token que deverá ser enviado nas demais requisições aos endpoints. O token deve ser enviado como Bearer Token.

---

## ✅ O que será avaliado

- Estrutura e organização do código
- Usabilidade
- Componentização e reutilização
- Fluxo de estados e validações
- Clareza dos commits
- Cobertura de testes (quando aplicável)
- Justificativa das escolhas técnicas

---

## 🚀 Entrega

1. Publique o projeto em alguma plataforma (Vercel, Netlify, etc).
2. Crie um **Pull Request** para este repositório com:
   - O link da aplicação publicada
   - Eventuais observações no corpo da PR

---

**Boa sorte! Estamos ansiosos para ver seu código.** 💼✨
