# 🧪 Teste Front-end - Estapar

**FIGMA**: [Protótipo](https://www.figma.com/board/CdIGvRXNpxcPyJIze4hYRE/Teste-Front?t=YU8tn1L6rJayH1K8-0)  
**API**: [https://c6wu4yjlku.apidog.io](https://c6wu4yjlku.apidog.io)
**Usuário**: `estapar`  
**Senha**: `@estapar@`  

---

## 🧑‍💼 História do Usuário: Gerenciamento de Garagens para Mensalistas Digitais

**Como** Roberto Freitas, gerente de operações da Estapar,  
**Quero** acessar uma tela que me permita visualizar, buscar e gerenciar garagens habilitadas para mensalistas digitais,  
**Para que** eu possa tomar decisões rápidas e eficazes sobre a ativação ou desativação dessas garagens, garantindo uma operação fluida e alinhada com a estratégia da empresa.

### ✅ Critérios de Aceitação

- A tela deve exibir uma lista de garagens com os seguintes dados:
  - Código
  - Nome
  - Endereço
  - Cidade/UF
  - Regional
- Deve haver uma barra de busca para localizar garagens pelo nome.
- Deve existir um botão de visualização para abrir um drawer com os detalhes da garagem.
- A interface deve ser intuitiva, responsiva e organizada, permitindo uma navegação eficiente.
- O sistema deve exibir o nome do usuário logado (ex: Roberto Freitas) para controle de acesso e rastreabilidade.

### 🧩 Contexto de Uso

O usuário supervisiona dezenas de garagens em diferentes regiões do Brasil. Ele precisa verificar rapidamente quais garagens estão habilitadas para mensalistas digitais, especialmente em momentos de pico ou mudanças operacionais. A funcionalidade de busca e o botão de ativação são essenciais para que ele possa agir com agilidade, sem precisar acessar cada garagem individualmente.

---

## 🧑‍💼 História do Usuário: Gerenciamento de Vagas e Planos de Estacionamento

**Como** Pedro, gerente do estacionamento ACYR DE ANDRADE (GMC PARK),  
**Quero** uma tela que me permita visualizar e gerenciar o total de vagas, ocupações e planos disponíveis,  
**Para que** eu possa otimizar a operação do estacionamento, acompanhar a ocupação em tempo real e ajustar os planos conforme a demanda.

### 🎯 Objetivos da Tela

- Exibir informações gerais do estacionamento:
  - Nome
  - Código
  - Endereço
  - Filial
  - Regional
- Mostrar:
  - Total de vagas
  - Vagas ocupadas
  - Vagas disponíveis
- Listar os planos disponíveis com:
  - Descrição
  - Valor
  - Número de vagas
  - Vagas ocupadas
  - Vagas disponíveis
  - Status (ativo/inativo)
  - Ações (editar, ativar/desativar)

### ✅ Critérios de Aceitação

- A tela deve carregar os dados do estacionamento selecionado.
- Os contadores de vagas devem ser atualizados em tempo real ou com atualização manual.
- A lista de planos deve permitir:
  - Visualização detalhada
  - Edição de planos existentes
  - Criação de novos planos
  - Alteração de status (ativo/inativo)
- A interface deve ser responsiva e intuitiva, com destaque para os dados operacionais.

### 🧩 Contexto de Uso

Pedro gerencia um estacionamento com mais de 500 vagas em uma área de alto fluxo. Ele precisa acompanhar a ocupação em tempo real para tomar decisões rápidas, como liberar mais vagas para determinados planos ou ajustar preços. A tela deve ser sua principal ferramenta de controle operacional.

---

## 🧑‍💼 História do Usuário: Cadastro e Edição de Plano de Mensalista Digital

**Como** Pedro, administrador de um estacionamento digital,  
**Quero** cadastrar e editar planos de mensalista digital com informações detalhadas,  
**Para que** eu possa oferecer opções personalizadas e atualizadas aos clientes, garantindo clareza, controle e competitividade nos serviços.

### 🎯 Objetivos da Funcionalidade

- Criar novos planos de mensalista com:
  - Nome do plano
  - Tipo de veículo (ex: Carro, Moto)
  - Valor mensal
  - Valor diário/rotativo por período
  - Total de vagas disponíveis
  - Período de validade (início e fim)
  - Status (ativo/inativo)
- Editar planos existentes com os mesmos campos
- Salvar ou cancelar alterações com segurança

### ✅ Critérios de Aceitação

- O formulário deve permitir o preenchimento de todos os campos obrigatórios.
- O sistema deve validar os dados (ex: datas, valores, número de vagas).
- O botão “Salvar” deve registrar as alterações e atualizar o plano.
- O botão “Cancelar” deve descartar as alterações e retornar à tela anterior.
- O status do plano deve ser facilmente alterável (ativo/inativo).
- O sistema deve exibir mensagens de sucesso ou erro após a ação.

### 🧩 Contexto de Uso

Pedro gerencia vários planos de mensalistas em seu estacionamento. Ele precisa ajustar valores, datas e vagas com frequência para atender à demanda e manter a competitividade. A tela de cadastro/edição é sua principal ferramenta para garantir que os planos estejam sempre atualizados e alinhados com a estratégia comercial.