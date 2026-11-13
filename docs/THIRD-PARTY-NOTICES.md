# Avisos de software de terceiros — LBA Academia de Xadrez

Este projecto utiliza componentes de terceiros. Os avisos abaixo identificam as dependências que foram confirmadas na implementação actual. Cada componente mantém a sua própria licença; este documento não substitui os textos integrais das licenças nem constitui aconselhamento jurídico.

## Chessground 9.2.1

- **Função:** interface interactiva do tabuleiro de xadrez.
- **Licença declarada pelo projecto:** GNU GPL versão 3 ou posterior (GPL-3.0-or-later).
- **Origem:** https://github.com/lichess-org/chessground/tree/v9.2.1
- **Aviso do titular do projecto:** https://github.com/lichess-org/chessground#license

O projecto oficial declara expressamente que, quando Chessground é utilizado num website, o trabalho combinado só pode ser distribuído sob GPL e o código-fonte deve ser disponibilizado aos utilizadores desse website. A área Premium importa Chessground; por isso, a distribuição desta aplicação deve ser tratada como sujeita a essa exigência, até existir uma avaliação jurídica documentada em sentido diferente.

## Stockfish.js 19.0.1 — Lite Single

- **Função:** motor de análise de xadrez executado num Web Worker/WASM.
- **Licença do motor:** GNU GPL versão 3 (GPL-3.0).
- **Pacote/versionamento utilizado no URL CDN:** `stockfish@19.0.1`.
- **Código-fonte do wrapper e build:** https://github.com/nmrugg/stockfish.js/tree/v19.0.1
- **Texto integral incluído neste repositório:** [`LICENSES/Stockfish-COPYING.txt`](../LICENSES/Stockfish-COPYING.txt)
- **Projecto upstream Stockfish:** https://github.com/official-stockfish/Stockfish
- **Texto integral incluído neste repositório:** [`LICENSES/GPL-3.0.txt`](../LICENSES/GPL-3.0.txt)
- **Texto da GPLv3:** https://www.gnu.org/licenses/gpl-3.0.html

A versão exacta do pacote, os ficheiros JS/WASM efectivamente servidos e o código-fonte/instruções que os produzem devem ser arquivados juntos na preparação da distribuição. Não presumir que executar o motor num Worker ou comunicar por UCI elimina obrigações GPL.

## chess.js 1.4.0

- **Função:** validação de regras, movimentos, FEN e PGN.
- **Licença:** BSD 2-Clause.
- **Origem:** https://github.com/jhlywa/chess.js
- **Texto integral incluído neste repositório:** [`LICENSES/BSD-2-Clause-chessjs.txt`](../LICENSES/BSD-2-Clause-chessjs.txt)
- **Registo do pacote 1.4.0:** https://www.npmjs.com/package/chess.js/v/1.4.0

A distribuição deve conservar o aviso de copyright e o texto da licença BSD-2-Clause aplicável.

## Inventário ainda por fechar

A implementação também carrega o SDK JavaScript do Supabase e recursos CSS/peças do Chessground por CDN. Antes da publicação, confirmar as versões exactas servidas, os avisos de copyright e as licenças dos recursos de peças e de todos os restantes ficheiros de terceiros. Não considerar este inventário completo enquanto essa verificação não estiver concluída.

## Condição de distribuição da LBA

A opção escolhida para este projecto é **manter Chessground e preparar a distribuição em conformidade com as licenças aplicáveis**. Isso significa, no mínimo:

1. disponibilizar aos utilizadores do website o código-fonte correspondente do trabalho combinado que incorpora Chessground, sob os termos GPL aplicáveis;
2. incluir os textos integrais das licenças e os avisos de copyright;
3. disponibilizar o código-fonte correspondente exacto do Stockfish.js 19.0.1 e os materiais necessários para reconstruir os binários JS/WASM distribuídos; os textos GPL foram agora adicionados em `LICENSES/`;
4. manter uma cópia arquivada das versões exactas efectivamente servidas, incluindo os ficheiros WASM e os recursos de peças.

**Bloqueio actual:** o repositório de trabalho está privado. Este documento e os links upstream não tornam, por si só, o código-fonte combinado da LBA publicamente acessível aos utilizadores do website. Antes de distribuir a versão com Chessground, será necessário aprovar e executar uma forma pública de disponibilização do código-fonte (por exemplo, tornar público o repositório/branch de origem ou publicar um arquivo completo equivalente). Nenhuma alteração de visibilidade foi feita.

Este registo é preparação técnica. A interpretação da GPL e a forma final de distribuição devem ser confirmadas por aconselhamento jurídico qualificado.
