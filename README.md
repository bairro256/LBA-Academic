# LBA Academic — LBA ao Vivo

Plataforma de treino e aprendizagem de xadrez da LBA.

## Publicação

- **Site público:** https://headless-dljbtqrlndj-zmpgsy7snn-140a.wix-site-host.com/
- **Área Premium:** https://headless-dljbtqrlndj-zmpgsy7snn-140a.wix-site-host.com/premium.html
- **Painel Wix:** https://manage.wix.com/dashboard/3a274143-5bfd-4333-afb8-f8b98e378bca
- **Repositório de código:** https://github.com/bairro256/LBA-Academic (privado, separado do site público)
- **Branch:** `main`

## Funcionalidades publicadas

- Página inicial LBA ao Vivo, treino demonstrativo e biblioteca de partidas PGN.
- Alternância global entre tema claro e escuro, com preferência guardada no dispositivo.
- Área Premium com criação de conta, início de sessão e validação de acesso por código.
- Acesso Premium por 30 dias, códigos de activação e controlo de tentativas.
- Sala de aula interactiva **Estruturas de Peões**, com três níveis (1200–1500, 1500–1800 e 1800–2000), teoria, três exercícios guiados, partidas modelo e teste de cinco perguntas por nível.
- Demonstração gratuita da sala de aula.

## Ficheiros principais

- `index.html` — página inicial.
- `app.js` — interacções da página inicial e treino.
- `styles.css` — estilos da página inicial.
- `theme.js` — alternância de tema.
- `premium.html` — autenticação e área Premium.
- `premium.js` — integração com Supabase Auth e Edge Function.
- `premium.css` — estilos da área Premium.
- `curriculum.js` — currículo, salas de aula, exercícios, partidas modelo e avaliações.
- `_wix/pages.json` — configuração das páginas estáticas Wix.

## Estado real do projecto

- O site está publicado no endereço Wix acima.
- A sala **Estruturas de Peões** está desenvolvida; os outros 17 tópicos aparecem como próximos conteúdos e ainda não são cursos completos.
- O progresso curricular é guardado no armazenamento local do navegador; ainda não sincroniza entre dispositivos ou contas.
- O registo de conta actualmente apresenta confirmação por e-mail. A configuração final de autenticação deve ser revista antes da abertura pública a alunos.
- A publicação foi confirmada pelo Wix; ainda falta executar uma bateria completa de testes em navegador real (registo, login, activação, expiração e navegação móvel).
- O domínio personalizado ainda não está ligado.

## Backend e segurança

A área Premium usa Supabase Auth e a Edge Function `premium-access`. A chave publishable no código do navegador é pública por definição; nunca colocar a chave `service_role` no frontend. As tabelas de códigos e acessos ficam no schema privado. As funções RPC Premium têm execução limitada ao papel `service_role`.

## Próximas etapas

1. Rever a configuração de confirmação de e-mail conforme a política de registo pretendida.
2. Testar registo, sessão, activação com código, acesso de 30 dias, bloqueio após tentativas e revogação.
3. Sincronizar o progresso curricular com a conta do aluno, com políticas RLS.
4. Completar e publicar os restantes tópicos do currículo.
5. Ligar um domínio próprio, caso seja pretendido.
