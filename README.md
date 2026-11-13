# LBA Academic — LBA ao Vivo

Plataforma de treino e aprendizagem de xadrez da LBA.

## Endereços oficiais

- **Site público:** https://headless-dljbtqrlndj-zmpgsy7snn-140a.wix-site-host.com/
- **Área Premium:** https://headless-dljbtqrlndj-zmpgsy7snn-140a.wix-site-host.com/premium.html
- **Painel Wix:** https://manage.wix.com/dashboard/3a274143-5bfd-4333-afb8-f8b98e378bca
- **Repositório público:** https://github.com/bairro256/LBA-Academic

## Estado das versões

- `main` representa a versão de referência do site publicado.
- `premium-v2-implementation` contém a nova experiência Premium e as melhorias de interface e segurança.
- O Pull Request [#1](https://github.com/bairro256/LBA-Academic/pull/1) mantém a integração em revisão; não confundir a branch de desenvolvimento com a versão já publicada no Wix.
- A publicação da nova suite no Wix depende da validação final em Safari/iPhone e da revisão de licenças de terceiros.

## Funcionalidades da versão de referência

- Página inicial LBA ao Vivo, treino demonstrativo e biblioteca de partidas PGN.
- Alternância global entre tema claro e escuro.
- Área Premium com criação de conta, início de sessão e activação por código.
- Acesso Premium com validade de 30 dias.
- Currículo com os módulos Aberturas, Meio-Jogo e Finais; o conteúdo completo de cada tópico é desenvolvido progressivamente.

## Nova experiência Premium — branch de implementação

A branch `premium-v2-implementation` acrescenta:

- Painel do aluno com actividade, sequência de treino e competências calculadas a partir de eventos guardados.
- Academia de Aberturas com repertórios e importação/validação PGN.
- Treino às cegas com tabuleiro interactivo.
- Laboratório de Meio-Jogo com tabuleiro e análise assistida pelo Stockfish.
- Centro de Finais com consulta Syzygy.
- Análise de partidas com importação PGN, gráfico de avaliação e revisão de posições.
- Registo de progresso e relatórios associados à conta autenticada.

A branch tem verificações automáticas de sintaxe JavaScript e tipos TypeScript. O último workflow associado ao commit de referência da branch terminou com sucesso. Isso não substitui testes reais no Safari/iPhone nem validação do alojamento Wix.

## Ficheiros principais

- `index.html`, `app.js`, `styles.css` — página inicial.
- `theme.js` — alternância de tema.
- `premium.html`, `premium.js`, `premium.css` — autenticação e área Premium.
- `premium-experience.js`, `premium-experience.css` — suite avançada na branch de implementação.
- `curriculum.js` — currículo e salas de aula.
- `premium-engine/` — motores e lógica de análise/treino.
- `_wix/pages.json` — configuração de páginas estáticas Wix.

## Backend e segurança

A área Premium utiliza Supabase Auth e a Edge Function `premium-access`. A chave publishable presente no navegador é pública por definição; a chave de serviço permanece no ambiente do servidor e nunca deve ser colocada no frontend ou no repositório.

A função `premium-access` exige JWT válido. Os novos códigos de activação são gerados com 12 caracteres alfanuméricos e apresentados em grupos de quatro; os códigos antigos de quatro dígitos continuam aceites para preservar os códigos já emitidos. A validação usa segredos guardados no Supabase Vault e limites de tentativas por conta e por rede.

As tabelas de códigos, tentativas e acessos ficam no schema privado. As operações administrativas são feitas no servidor e dependem do papel administrativo guardado em `app_metadata`. Não conceder acesso directo às tabelas privadas a alunos.

## Verificações e publicação

Antes de integrar e publicar a nova suite:

1. Confirmar o resultado verde do GitHub Actions no commit final.
2. Testar registo, login, estado de acesso, activação de códigos antigos e novos, expiração, bloqueios e revogação.
3. Testar isolamento de dados entre contas de alunos.
4. Testar tabuleiros, módulos, Stockfish, Syzygy e navegação táctil em Safari/iPhone.
5. Confirmar os cabeçalhos CSP e o carregamento de recursos externos no alojamento Wix.
6. Fechar a revisão de licenças e disponibilização de código-fonte de Chessground e Stockfish antes da distribuição da suite.

## Licenças de terceiros

Chessground e Stockfish estão identificados como componentes GPL. Consultar `docs/THIRD-PARTY-NOTICES.md` e os textos em `LICENSES/`. A publicação comercial da suite deve respeitar as obrigações aplicáveis de avisos e disponibilização do código-fonte correspondente.

## Configuração de autenticação

O registo actual apresenta confirmação por e-mail. Qualquer alteração a essa política deve ser feita na configuração de Supabase Auth e testada com uma conta de aluno antes da publicação.
