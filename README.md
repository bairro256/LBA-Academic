# LBA Academic

Plataforma digital da LBA Academia de Xadrez.

## Objetivo

Centralizar o desenvolvimento e a manutenção da plataforma LBA Academic / LBA ao Vivo, mantendo este projeto separado do repositório Angola Chess LBA.

## Funcionalidades previstas

- Área de alunos e autenticação por conta registada.
- Área Premium com acesso concedido por código individual de 4 dígitos, após pagamento confirmado pelo administrador.
- Validade Premium de 30 dias por código resgatado.
- Painel administrativo para gerar, consultar e revogar códigos.
- Alternância entre tema claro e escuro, sem recarregar a página, com preferência guardada no dispositivo.
- Interface responsiva para telemóveis e computadores.

## Regras importantes

1. O código Premium não cria contas e não substitui o login.
2. O aluno cria a conta, confirma o email e inicia sessão normalmente.
3. Depois da confirmação do pagamento, o administrador fornece um código Premium único.
4. O resgate válido ativa 30 dias de Premium para a conta autenticada.
5. A validação e a gestão de acessos devem permanecer no servidor; nunca colocar chaves secretas no frontend.

## Estado do repositório

Este repositório foi inicializado com documentação. O código-fonte atual do site Wix ainda precisa ser exportado ou disponibilizado antes de implementar alterações na aplicação. Não substituir nem reconstruir a aplicação de produção sem primeiro identificar e preservar a autenticação, a integração Supabase e os fluxos Premium existentes.
