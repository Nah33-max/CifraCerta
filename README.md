# Cifra Certa 🎵

**Cifra Certa** é um site completo para compartilhar e gerenciar cifras de músicas cristãs. Desenvolvido com HTML, CSS e JavaScript puro, utilizando localStorage para armazenamento local sem necessidade de banco de dados.

---

## 🌟 Funcionalidades Implementadas

### ✅ Gerenciamento de Cifras
- **Adicionar cifras**: Formulário completo para cadastrar novas cifras com título, artista, tom e letra com acordes
- **Visualizar cifras**: Modal dedicado com visualização formatada e acordes destacados
- **Editar cifras**: Atualizar informações de cifras existentes
- **Excluir cifras**: Remover cifras com confirmação de segurança
- **Listagem em grid**: Exibição das cifras em cartões visuais modernos

### 🎼 Funcionalidades Musicais
- **Transposição de tom**: Alterar a tonalidade da música automaticamente (subir/descer semitons)
- **Reset de tom**: Voltar ao tom original da cifra
- **Suporte a acordes**: Reconhece todos os acordes maiores, menores, sustenidos e bemóis
- **Formatação especial**: Acordes destacados em azul dentro da letra

### 🔍 Busca e Filtros
- **Busca em tempo real**: Pesquisar por título ou nome do artista
- **Filtro por artista**: Listar apenas cifras de um artista específico
- **Filtro de favoritas**: Ver apenas as cifras marcadas como favoritas

### ⭐ Sistema de Favoritos
- **Marcar/desmarcar favoritas**: Um clique para adicionar aos favoritos
- **Badge visual**: Ícone de coração nas cifras favoritas
- **Filtro dedicado**: Acessar rapidamente suas cifras preferidas

### 💾 Backup e Importação
- **Exportar dados**: Baixar todas as cifras em arquivo JSON
- **Importar dados**: Restaurar cifras de um arquivo de backup
- **Nome automático**: Arquivos de backup com data automática

### 🎨 Interface e Design
- **Tema claro/escuro**: Alternância entre modos com persistência
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Cores cristãs**: Paleta de cores em azul, branco e dourado
- **Animações suaves**: Transições e efeitos visuais modernos
- **Tipografia legível**: Fonte monospace para cifras, garantindo alinhamento perfeito

### 🖨️ Modo de Impressão
- **Impressão otimizada**: Layout limpo para imprimir cifras
- **Remoção de elementos desnecessários**: Apenas letra e acordes na impressão

### 📱 Responsividade
- **Mobile-first**: Design otimizado para dispositivos móveis
- **Breakpoints inteligentes**: Layout adaptável para todas as telas
- **Touch-friendly**: Botões e áreas de toque adequadas para mobile

---

## 🎵 Cifras Pré-cadastradas

O site vem com 4 cifras de músicas cristãs populares para demonstração:

1. **Tua Graça Me Basta** - Fernandinho (Tom: G)
2. **Ressuscita-me** - Aline Barros (Tom: C)
3. **Porque Ele Vive** - Cassiane (Tom: D) ⭐ Favorita
4. **Ao Único** - Gabriela Rocha (Tom: E)

---

## 🚀 Como Usar

### Página Principal
1. Acesse o site através do arquivo `index.html`
2. Veja a lista de cifras disponíveis em cartões visuais
3. Use a barra de busca para encontrar músicas específicas
4. Aplique filtros por artista ou favoritas

### Adicionar Nova Cifra
1. Clique no botão **"+ Nova Cifra"** no header
2. Preencha os campos:
   - **Título da Música**: Nome da música
   - **Artista/Banda**: Nome do artista ou banda
   - **Tom Original**: Selecione o tom da música
   - **Letra com Acordes**: Digite a letra colocando os acordes entre colchetes `[G]`
3. Clique em **"Salvar"**

**Exemplo de formatação:**
```
[G]Tua graça me [D]basta
[Em]Tua graça me [C]basta
```

### Visualizar e Editar Cifra
1. Clique em qualquer cifra da lista
2. Modal será aberto com:
   - **Letra formatada** com acordes destacados
   - **Controles de transposição**: Suba ou desça o tom
   - **Botão de favorito**: Marque como favorita
   - **Botão de impressão**: Imprima a cifra
   - **Botão de edição**: Modifique os dados
   - **Botão de exclusão**: Remova a cifra

### Transpor Tom
1. Abra uma cifra
2. Use os botões **"+" e "-"** ao lado do tom atual
3. Os acordes serão ajustados automaticamente
4. Clique em **"↻ Resetar"** para voltar ao tom original

### Fazer Backup
1. Clique no botão **"📥 Backup"** no header
2. Selecione **"Baixar Backup"**
3. Arquivo JSON será baixado automaticamente

### Importar Dados
1. Clique no botão **"📥 Backup"** no header
2. Selecione **"Selecionar Arquivo"**
3. Escolha um arquivo JSON de backup
4. Confirme a importação (isso substituirá as cifras atuais)

### Alternar Tema
1. Clique no ícone de lua/sol no header
2. Tema será alternado entre claro e escuro
3. Preferência será salva automaticamente

---

## 💻 Estrutura do Projeto

```
cifra-certa/
│
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos (tema claro/escuro)
├── js/
│   └── app.js          # Lógica da aplicação
└── README.md           # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Design responsivo com variáveis CSS e temas
- **JavaScript (ES6+)**: Lógica de aplicação e manipulação do DOM
- **LocalStorage API**: Armazenamento persistente no navegador
- **Font Awesome 6**: Ícones modernos
- **Google Fonts**: Tipografia (Inter e Roboto Mono)

---

## 📊 Armazenamento de Dados

### LocalStorage
Os dados são armazenados localmente no navegador usando duas chaves:

1. **`cifracerta_cifras`**: Array JSON com todas as cifras
2. **`cifracerta_theme`**: Tema atual (light/dark)

### Estrutura de uma Cifra
```json
{
  "id": "unique_id",
  "titulo": "Nome da Música",
  "artista": "Nome do Artista",
  "tom": "C",
  "letra": "Letra com [C]acordes",
  "favorite": false,
  "createdAt": 1234567890
}
```

---

## 🎯 Funcionalidades Detalhadas

### Sistema de Transposição
- Reconhece 12 tons: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
- Converte notações alternativas (Db → C#, Eb → D#, etc.)
- Mantém qualidades dos acordes (m, 7, sus4, etc.)
- Transpõe automaticamente todos os acordes da música

### Algoritmo de Busca
- Normaliza texto removendo acentos
- Busca em tempo real (sem necessidade de pressionar Enter)
- Procura em título e artista simultaneamente
- Case-insensitive

### Sistema de Backup
- Exporta em formato JSON legível
- Nome do arquivo com data automática (backup_YYYY-MM-DD.json)
- Importação com validação de formato
- Confirmação antes de substituir dados existentes

---

## 📱 Suporte a Dispositivos

### Desktop
- Resolução otimizada: 1200px+
- Grid de 3-4 colunas
- Modais centralizados

### Tablet
- Resolução: 768px - 1199px
- Grid de 2 colunas
- Navegação adaptada

### Mobile
- Resolução: até 767px
- Grid de 1 coluna
- Header empilhado verticalmente
- Botões touch-friendly

---

## 🎨 Paleta de Cores

### Tema Claro
- **Primária**: Azul (#2563eb)
- **Secundária**: Dourado (#f59e0b)
- **Fundo**: Branco (#ffffff)
- **Texto**: Cinza escuro (#0f172a)

### Tema Escuro
- **Primária**: Azul claro (#3b82f6)
- **Secundária**: Dourado claro (#fbbf24)
- **Fundo**: Cinza escuro (#0f172a)
- **Texto**: Branco (#f1f5f9)

---

## ⚠️ Observações Importantes

### Limitações do LocalStorage
- Capacidade: ~5-10MB (varia por navegador)
- Dados são armazenados apenas no navegador atual
- Limpar cache/dados do navegador apagará as cifras
- **Recomendação**: Faça backups regulares!

### Compatibilidade
- Navegadores modernos (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- JavaScript deve estar habilitado
- Cookies não são necessários

---

## 🚀 Próximos Passos (Funcionalidades Futuras)

### 📋 Sugestões para Expansão
- [ ] Compartilhar cifra via link ou QR Code
- [ ] Modo de apresentação (fullscreen com autoscroll)
- [ ] Biblioteca de acordes (dicionário visual)
- [ ] Cifras em PDF para download
- [ ] Sincronização com nuvem (Google Drive, Dropbox)
- [ ] Playlist de cifras para cultos/ensaios
- [ ] Tags/categorias (louvor, adoração, comunhão, etc.)
- [ ] Histórico de cifras visualizadas
- [ ] Suporte a tablatura
- [ ] Metrônomo integrado
- [ ] Vídeos de YouTube incorporados

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o **Cifra Certa**, utilize o sistema de backup para preservar seus dados importantes.

---

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins pessoais e ministeriais.

---

## 🙏 Créditos

Desenvolvido com ❤️ para a comunidade cristã.

**Cifra Certa** - Sua ferramenta completa para cifras de músicas cristãs!

---

## 🎵 Versão
**v1.0.0** - Janeiro 2024

---

**Que este site possa abençoar seu ministério de música e ajudar na adoração ao Senhor! 🙌**
