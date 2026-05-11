# Obrigado por revisarem o trabalho.

**Onde ver:** https://estapar-frontend-challenge.vercel.app/

**Link do projeto:** https://github.com/damiaofranca/estapar-frontend-challenge

**Observação sobre o repositório:** 

Só depois de reler o enunciado reparei que a entrega aparentemente previa trabalhar a partir do fork oficial (estapar/frontend-challenge). O desenvolvimento foi feito num repositório próprio (damiaofranca/estapar-frontend-challenge). Peço desculpa pela divergência em relação ao fluxo indicado; o conteúdo e o link da aplicação publicada seguem as instruções do desafio.

credenciais do mock: `estapar` / `@estapar@`. Para apontar para o Apidog de vocês, use **`VITE_API_URL`** (exemplo no `.env.example`).

**Figma:** o material de referência é sobretudo **imagem no FigJam**, o que limita fidelidade milimétrica no inspetor. Priorizei **organização da tela, leitura e responsivo**, alinhado ao espírito do protótipo, com Tailwind e tokens no tema, sem prometer pixel-perfect em cima de raster.

**API e tipos:** integrando com o mock, apareceram **pequenas diferenças** em relação ao schema do Apidog (nomes, tipos ou “formato” do JSON). Ajustei **tipos e cliente** ao que **realmente volta na rede**, com a ressalva de que a doc e o contrato podem divergir até o backend fechar isso.

**Busca por nome na lista de garagens:** o front envia o parâmetro conforme a documentação (`garageName` no `GET` paginado), mas **no mock o filtro não surte efeito**, a lista volta igual com ou sem o termo. Vale checar do lado da API/mock se o query param está ligado à query; do lado da UI o valor é debounced e repassado corretamente.

**Plano / edição:** o fluxo de **editar** está na UI e dispara **PUT** como esperado num produto. No mock da apidog, esse **endpoint não está disponível de fato**, então a chamada pode responder **404**; mantive o comportamento para quando existir rota real.

**Testes:** subi **E2E com Playwright** (`yarn test:e2e`): fluxos principais, POM e API simulada. Comandos e detalhes de build/preview estão no **README** desta branch.

**README:** além de comandos e links, o ficheiro inclui **observações sobre decisões técnicas** (Figma, contrato da API, mock, E2E e uso de IA com revisão humana) para quem for avaliar o contexto por trás do código.