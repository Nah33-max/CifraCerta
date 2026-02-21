// ==================== Constants ====================
const STORAGE_KEY = 'cifracerta_cifras';
const THEME_KEY = 'cifracerta_theme';

// ==================== Chord Transposition ====================
const CHORDS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

// Alternative chord notations
const CHORD_ALTERNATIVES = {
    'Db': 'C#', 'D#': 'Eb', 'Gb': 'F#', 'Ab': 'G#', 'A#': 'Bb',
    'Dbm': 'C#m', 'D#m': 'Ebm', 'Gbm': 'F#m', 'Abm': 'G#m', 'A#m': 'Bbm'
};

// ==================== State ====================
let cifras = [];
let currentCifraId = null;
let currentTranspose = 0;
let editingCifraId = null;

// ==================== DOM Elements ====================
const elements = {
    // Buttons
    btnAddCifra: document.getElementById('btnAddCifra'),
    btnBackup: document.getElementById('btnBackup'),
    btnTheme: document.getElementById('btnTheme'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnCancelModal: document.getElementById('btnCancelModal'),
    btnSaveCifra: document.getElementById('btnSaveCifra'),
    btnCloseViewModal: document.getElementById('btnCloseViewModal'),
    btnFavorite: document.getElementById('btnFavorite'),
    btnPrint: document.getElementById('btnPrint'),
    btnEdit: document.getElementById('btnEdit'),
    btnDelete: document.getElementById('btnDelete'),
    btnTransposeUp: document.getElementById('btnTransposeUp'),
    btnTransposeDown: document.getElementById('btnTransposeDown'),
    btnResetTom: document.getElementById('btnResetTom'),
    btnCloseBackupModal: document.getElementById('btnCloseBackupModal'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    
    // Inputs
    searchInput: document.getElementById('searchInput'),
    filterArtist: document.getElementById('filterArtist'),
    filterFavorite: document.getElementById('filterFavorite'),
    inputTitulo: document.getElementById('inputTitulo'),
    inputArtista: document.getElementById('inputArtista'),
    inputTom: document.getElementById('inputTom'),
    inputLetra: document.getElementById('inputLetra'),
    fileImport: document.getElementById('fileImport'),
    
    // Containers
    cifrasList: document.getElementById('cifrasList'),
    emptyState: document.getElementById('emptyState'),
    cifraCount: document.getElementById('cifraCount'),
    
    // Modals
    modalCifra: document.getElementById('modalCifra'),
    modalViewCifra: document.getElementById('modalViewCifra'),
    modalBackup: document.getElementById('modalBackup'),
    modalTitle: document.getElementById('modalTitle'),
    
    // View Modal Elements
    viewTitulo: document.getElementById('viewTitulo'),
    viewArtista: document.getElementById('viewArtista'),
    viewLetra: document.getElementById('viewLetra'),
    currentTom: document.getElementById('currentTom'),
    
    // Form
    formCifra: document.getElementById('formCifra')
};

// ==================== Initialization ====================
function init() {
    loadCifras();
    loadTheme();
    initializeDefaultCifras();
    renderCifras();
    attachEventListeners();
}

// ==================== Local Storage ====================
function loadCifras() {
    const stored = localStorage.getItem(STORAGE_KEY);
    cifras = stored ? JSON.parse(stored) : [];
}

function saveCifras() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cifras));
}

function loadTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = elements.btnTheme.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ==================== Default Cifras ====================
function initializeDefaultCifras() {
    if (cifras.length === 0) {
        cifras = [
            {
                id: generateId(),
                titulo: 'A Alegria do Senhor',
                artista: 'Fernandinho',
                tom: 'Bb',
                letra: `Intro: |: 4/4 [Cm]/[G]  [Bb]/[G]  [Gm] | [Cm]/[G] [Bb]/[G]  [Gm] | [Cm]/[G]  [Bb]/[G]  [Gm] || [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E]  [Bb]/[F]  [Gm] :|


| [Cm]/[G]  [Bb]/[G]  [Gm] | [Cm]/[G] [Bb]/[G]  [Gm] | [Cm]/[G]  [Bb]/[G]  [Gm] |
       Vento sopra forte
| [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E]  [Bb]/[F]  [Gm] |
As águas não podem me afogar
| [Cm]/[G]  [Bb]/[G]  [Gm] | [Cm]/[G] [Bb]/[G]  [Gm] | [Cm]/[G]  [Bb]/[G]  [Gm] |
Vento sopra forte
| [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E]  [Bb]/[F]  [Gm] |
Em Suas mãos vou segurar
Intro: | [Cm]/[G]  [Bb]/[G]  [Gm] | [Cm]/[G] [Bb]/[G]  [Gm] | [Cm]/[G]  [Bb]/[G]  [Gm] || [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E]  [Bb]/[F]  [Gm] |

[Gm]
   Vento sopra forte

As águas não podem me afogar
[Bb]
   Vento sopra forte
                         [Cm]
Em Suas mãos vou segurar

E não me guio pelo que vejo
[Gm]
   Mas eu sigo pelo que creio
[Cm]
   Eu não olho as circunstâncias
[Eb]                [F]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#] 
   Eu vejo o Teu amor

[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força

Intro: | [Cm]/[G]  [Bb]/[G]  [Gm] | [Cm]/[G] [Bb]/[G]  [Gm] | [Cm]/[G]  [Bb]/[G]  [Gm] || [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E] [Bb]/[F] [A]/[E]  [Bb]/[F]  [Gm]

[Gm]
   Vento sopra forte

As águas não podem me afogar
[Bb]
   Vento sopra forte
                         [Cm]
Em Suas mãos vou segurar

E não me guio pelo que vejo
[Gm]
   Mas eu sigo pelo que creio
[Cm]
   Eu não olho as circunstâncias
[Eb]                [F]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#] 
   Eu vejo o Teu amor

[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força

          [Bb]               [Eb]
Essa alegria não vai mais sair
          [Cm]                [Gm]
Essa alegria não vai mais sair
          [Bb]               [Eb]
Essa alegria não vai mais sair
    [Cm]                [Gm]
De dentro do meu coração

          [Bb]               [Eb]
Essa alegria não vai mais sair
          [Cm]                [Gm]
Essa alegria não vai mais sair
          [Bb]               [Eb]
Essa alegria não vai mais sair
     [F]                [Gm]
De dentro do meu coração

[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força

[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força

[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]              [Eb]  [Cm]
   A alegria do Senhor é a nossa força

Final: [Cm]  [Bb]  [Gm]`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
             {
                id: generateId(),
                titulo: 'A Alegria está no Coração',
                artista: 'Corinhos Evangélicos',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Batalha é do Senhor',
                artista: 'Ademar de Campos',
                tom: 'F',
                letra: `Intro: |4/4 (solo bateria) | [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||
                
           [Dm]     [Am]   [Dm] [Am]  [Bb]     [Am][Gm]
Quando os grandes homens de Judá viram o inimigo
[Dm]     [Am]           [Dm]     [Am]
Deus mandou que eles não temessem
          [Bb]   [Am][Gm] [Bb][Am][Gm] 
Pois daria a vitória
               [Am]              [Bb]   [Bb][Am][Gm]
E chamou a cantar uma nova canção
             [Am]               [Bb]/[C]
Abaixar a espada e levantar o louvor

[F9]            [Am]            [Eb]
 Cantai ao Senhor com alegre som
              [Gm]    [C]/[E] [F9]
 Erga a voz para o Seu louvor
               [Am]          [Eb]
Um canto vencedor na tribulação
                [Gm]    [C]/[E]   [F9]
Crê somente a batalha é do Senhor

Interlúdio: || [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||

       [Dm]    [Am]  [Dm]    [Am]
Quando algum mal te encontrar
   [Bb]    [Am] [Gm]
Confia no Senhor
[Dm]    [Am]               [Dm]   [Am]       
Crê em Deus que não te deixará
     [Bb]   [Bb] [Am]  [Gm]  [Bb][Am][Gm] 
Ele sempre perto está
             [Am]              [Bb]   [Bb][Am][Gm]
Você pode erguer uma nova canção
            [Am]           [Bb]/[C]
Porque a batalha é do Senhor

[F9]            [Am]            [Eb]
 Cantai ao Senhor com alegre som
              [Gm]    [C]/[E] [F9]
 Erga a voz para o Seu louvor
               [Am]          [Eb]
Um canto vencedor na tribulação
                [Gm]    [C]/[E]   [F9]
Crê somente a batalha é do Senhor

      [C]/[Bb]    [Bb]/[D]   [Bbm]           [F]
Porque ele é bom, Seu amor dura para sempre
[C]/[Bb]    [Bb]/[D]   [Bbm]           [F]
Porque ele é bom, Seu amor dura para sempre
            [Bb]/[C]
Pra sempre e sempre

[F9]            [Am]            [Eb]
 Cantai ao Senhor com alegre som
              [Gm]    [C]/[E] [F9]
 Erga a voz para o Seu louvor
               [Am]          [Eb]
Um canto vencedor na tribulação
                [Gm]    [C]/[E]   [F9] Pausa
Crê somente a batalha é do Senhor`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Benção',
                artista: 'Gabriel Guedes',
                tom: 'Bb',
                letra: `Intro: || 4/4 [Gm] | [Eb] | [Bb]/[D] | [F] ||

[Bb]              [Eb]/[G]
   Que o Senhor te      abençoe
[Bb]/[F]       [F]     [F#º]    [Gm]
     E faça brilhar seu rosto em ti
           [Eb]         [Bb]/[D]
Que conceda    Sua graça
 [F]      [Bb]
E te dê a paz

[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,   amém
[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,  amém

[Bb]              [Eb]/[G]
   Que o Senhor te      abençoe
[Bb]/[F]       [F]     [F#º]    [Gm]
     E faça brilhar seu rosto em ti
           [Eb]         [Bb]/[D]
Que conceda    Sua graça
 [F]      [Bb]
E te dê a paz

[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,   amém
[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,  amém

     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos
     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos

     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos
     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos

      [Gm]
Sua presença te acompanhe
       [Eb]
Por detrás e por diante
    [Bb]/[D]
Do teu lado e em ti
     [F]
É contigo, é por ti
     [Gm]
E de dia, e de noite
      [Eb]
Tua entrada e saída
    [Bb]/[D]
Em teu riso, em teu choro
    [F]
É contigo, é por ti

     [Gm]
É contigo, é por ti
      [Eb]
É contigo, é por ti
 [Bb]/[D]
É contigo, é por ti
     [F]
É contigo, é por ti

[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,   amém
[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,  amém

     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos
     [Gm]
Que a bênção se derrame
    [Eb]
Até mil gerações
    [Bb]/[D]
Tua família e teus filhos
     [F]
E os filhos dos teus filhos

      [Gm]
Sua presença te acompanhe
       [Eb]
Por detrás e por diante
    [Bb]/[D]
Do teu lado e em ti
     [F]
É contigo, é por ti
     [Gm]
E de dia, e de noite
      [Eb]
Tua entrada e saída
    [Bb]/[D]
Em teu riso, em teu choro
    [F]
É contigo, é por ti

     [Gm]
É contigo, é por ti
      [Eb]
É contigo, é por ti
 [Bb]/[D]
É contigo, é por ti
     [F]
É contigo, é por ti

[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,   amém
[Gm][Eb] [Bb]/[D] [F]
Am__ém, amém,  amém`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Casa é Sua',
                artista: 'Casa Worship',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Ele à Glória',
                artista: 'Diante do Trono',
                tom: 'G',
                letra: `Intro: || 4/4 [Em] | [C] | [D] | [Em] [Em7(11)] | [Em] | [C] | [D] | [Em]  [D] [Em] |     
    
[Em]                     [C]
       Porque Dele e por Ele     
            [D]              [Em]   [Em7(11)] [Em]
       Para Ele são todas as coisas    
                         [C]    
       Porque Dele e por Ele     
            [D]              [Em]   [Em7(11)] [Em]  (2x)
       Para Ele são todas as coisas    

        [C][D]    
A Ele a Glória    
        [G] [D]/[F#] [Em]    
A Ele a Gló    -     ria    
        [C] [D]    
A Ele a Glória    
            [Em]    [Em7(11)]
Pra sempre, amém    
    
                 [C]
Quão profundas riquezas     
  [D]                  [Em]   [Em7(11)] [Em]
O saber e o conhecer de Deus    
          [C]
Quão insondáveis    
      [D]            [Em]   [Em7(11)] [Em] (2x)
Seus juízos e Seus caminhos`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
                        {
                id: generateId(),
                titulo: 'Abra os olhos do meu coração',
                artista: 'David Quilan',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
                        {
                id: generateId(),
                titulo: 'Abraça-me',
                artista: 'André Valadão',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
                        {
                id: generateId(),
                titulo: 'Acende Outra Vez',
                artista: 'Jefferson e Suellen',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Aclame ao Senhor',
                artista: 'IECP Central',
                tom: 'A',
                letra: `
  [A]       [F#m]       [D]        [E]
Aclame ao Senhor toda a Terra e cantemos
  [A]     [F#m]      [D]       [E]
Poder, majestade e louvores ao Rei
  [F#m]        [F#m/E]  [D]
Montanhas se prostrem e rujam os mares
   [E][D]/[F#][E]/[G#]
Ao som de teu nome
 [A]     [F#m]      [D]          [E]
Alegre Te louvo por Teus grandes feitos
   [A]     [F#m]        [D]   [E]
Firmado estarei, sempre te amarei
[F#m][F#m/E]      [D]         [E]   [A]    [D9] [E] 
Incomparáveis são as promessas do Senhor
                
[A]        [E]
   Meu Jesus, Salvador
[F#m]   [E]     [D]
Outro igual não há
      [A]/[C#][D]    [A]/[E]
Todos os dias quero louvar
  [F#m]      [G][D]/[F#][E]
As maravilhas de Teu amor

[A]      [E]
  Consolo, abrigo
[F#m]    [E]          [D]
Refúgio e Força é o Senhor
             [A]/[C#]
Com todo o meu ser
    [D]      [A]/[E]
Com tudo o que sou 
[F#m]     [G] [D]/[F#] [E]
Sempre te ado  - ra -  rei

  [A]       [F#m]       [D]        [E]
Aclame ao Senhor toda a Terra e cantemos
  [A]     [F#m]      [D]       [E]
Poder, majestade e louvores ao Rei
  [F#m]        [F#m/E]  [D]
Montanhas se prostrem e rujam os mares
   [E][D]/[F#][E]/[G#]
Ao som de teu nome
 [A]     [F#m]      [D]          [E]
Alegre Te louvo por Teus grandes feitos
   [A]     [F#m]        [D]   [E]
Firmado estarei, sempre te amarei
[F#m][F#m/E]      [D]         [E]   [F#m]  [E] [D9] 
Incomparáveis são as promessas do Senhor

  [A]       [F#m]       [D]        [E]
Aclame ao Senhor toda a Terra e cantemos
  [A]     [F#m]      [D]       [E]
Poder, majestade e louvores ao Rei
  [F#m]        [F#m/E]  [D]
Montanhas se prostrem e rujam os mares
   [E][D]/[F#][E]/[G#]
Ao som de teu nome
 [A]     [F#m]      [D]          [E]
Alegre Te louvo por Teus grandes feitos
   [A]     [F#m]        [D]   [E]
Firmado estarei, sempre te amarei
[F#m][F#m/E]      [D]         [E]   [F#m]
Incomparáveis são as promessas do Senhor
     [F#m/E]      [D]         [E]   [F#m]
Incomparáveis são as promessas do Senhor
     [F#m/E]      [D]         [E]   [A]  | [D9] [E] | [A] | [D9] [E] | [A] ||
Incomparáveis são as promessas para mim`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
             {
                id: generateId(),
                titulo: 'Águas Purificadoras',
                artista: 'Diante do Trono',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Agnus Dei',
                artista: 'David Quilan',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ainda que a Figueira',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Algo Novo',
                artista: 'Lukas Agustinho',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Alto Preço',
                artista: 'Harpa Cristã',
                tom: 'A',
                letra: `Intro: |4/4 [F#m] [C#m] | [D] | [F#m] [D]/[E]||

[F#m]                       [C#m]
Eu sei que foi pago um alto preço
[D]             		           [F#m]
Para que contigo eu fosse um meu irmão
[F#m]                    [C#m]
Quando Jesus derramou sua vida
[D]                E			[C#]/[F]
Ele pensava em ti, Ele pensava em mim,
            [F#m]		[D]/[E]
Pensava em nós

[F#m]                       [C#m]
Eu sei que foi pago um alto preço
[D]             		           [F#m]
Para que contigo eu fosse um meu irmão
[F#m]                    [C#m]
Quando Jesus derramou sua vida
[D]                E			[C#]/[F]
Ele pensava em ti, Ele pensava em mim,
            [F#m]		[E]/[G#]
Pensava em nós
      [D]        		  [A]/[C#]
E nos via redimidos por seu sangue
  [D]                    [A]/[C#]
Lutando o bom combate do Senhor
     	[D]                 [B]/[D#]
Lado a lado trabalhando, sua Igreja edificando
    [A]   	    [F#m]         [E]
E rompendo as barreiras pelo amor.

     [A]               [E]      [D]            [A]
E na força do Espírito Santo nós proclamamos aqui
    [D]       [A]/[C#]          [B]/[D#]           [E]
Que pagaremos o preço de sermos um só coração no Senhor
       [A]                  [E]         [D]       [A]
 E por mais que as trevas militem e nos tentem separar
  	 [D]            [A]      [D]    [E]      [F#m]   [A]/[E]
Com nossos olhos em Cristo, unidos iremos andar...
 [D]    [E]     [F#m]   [A]/[E]
Unidos iremos andar...
 [D]    [E]     [A]
Unidos iremos andar`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Anseio',
                artista: 'Diante do Trono',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ao Único',
                artista: 'Aline Barros',
                tom: 'C',
                letra: `Intro: |4/4 [C] [G]/[B] | [Am] [Am]/[G] | [F] [C]/[E] |2/4 [Dm]|4/4 [G] |

   [C]            [G]/[B]      [Am]    [Am]/[G]
Ao único que é digno de receber
   [F]          [C]/[E]
A honra e a glória
[Dm7]         [G]
A força e o poder

    [Gm7]         [C]/[E]
Ao rei, eterno, imortal
[F]/[A]             [Fm]/[G#]
  Invisível, mas real
[C]/[G]     [G]        [C]  [F]/[C]  [G]/[C]
A Ele ministramos o louvor

   [C]            [G]/[B]      [Am]    [Am]/[G]
Ao único que é digno de receber
   [F]          [C]/[E]
A honra e a glória
[Dm7]        [G]
A força e o poder

    [Gm7]         [C]/[E]
Ao rei, eterno, imortal
[F]/[A]             [Fm]/[G#]
  Invisível, mas real
[C]/[G]     [G]        [C]  [B°] [Ealt]
A Ele ministramos o louvor

   [Am][Em]  [F]   [G]   [C]  [G]/[B]
Coroa__mos a Ti, ó rei Jesus
   [Am][Em]  [F]   [G]   [C]  [G]/[C]
Coroa__mos a Ti, ó rei Jesus

   [F]         [G]/[F]
Adoramos o Teu nome
        [E]/[G#]      [Am] [D]/[F#]
Nos rendemos aos Teus pés
    [Dm7]        [G]         [C]
Consagramos todo nosso ser a Ti`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Aos Pés da Cruz',
                artista: 'Oficina G3',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Atos 2',
                artista: 'Gabriela Rocha',
                tom: 'G',
                letra: `Intro: |:6/8 [Em7] | [C9] | [G9] | [Bm7] :| 

     [Em]               [C]
Nós estamos aqui tão sedentos de Ti
        [G]         [Bm7]
Vem óh Deus, vem óh Deus!
      [Em]
Enche este lugar
      [C]                 [G]        [Bm7]
Meu desejo é sentir Teu poder, Teu poder!

Interlúdio: | [Em7] | [C9] | [G9] | [Bm7] |

     [Em]               [C]
Nós estamos aqui tão sedentos de Ti
        [G]         [Bm7]
Vem óh Deus, vem óh Deus!
      [Em]
Enche este lugar
      [C]                 [G]        [D]
Meu desejo é sentir Teu poder, Teu poder!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!

Interlúdio: | [C] | [%] | [Em7] | [%] | [G9] | [C9] | [D9] |   

      [C]
Nós estamos aqui tão sedentos de Ti
        [G]         [Bm7]
Vem óh Deus, vem óh Deus!
      [Em]
Enche este lugar
      [C]                 [G]        [D]
Meu desejo é sentir Teu poder, Teu poder!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!

Interlúdio: | [C] | [%] | [Em7] | [%] | [G9] | [C9] | [D9] |    

         [C]             [Em]
Te damos honra! Te damos glória!
         [G]  [C9]             [D9]    
Teu é o poder,    pra sempre, amém!
         [C]             [Em]
Te damos honra! Te damos glória!
         [G]  [C9]             [D9]    
Teu é o poder,    pra sempre, amém!
         [C]             [Em]
Te damos honra! Te damos glória!
         [G]  [C9]             [D9]    
Teu é o poder,    pra sempre, amém!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!

     [C]         [D][Em7]
Então vem me incendiar 
 [D]/[F#][G]    [C7+] [D]
Meu coração é o Teu altar!
        [C]          [Em]
Quero ouvir o som do céu
[D]/[F#][G] [C7+] [D]
 Tua glória contemplar!`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Basta uma Palavra do meu Deus',
                artista: 'Comunidade Evangélica Internacional da Zona Sul',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Bem-Aventurado',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Bondade de Deus',
                artista: 'Marsena',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Caia Fogo',
                artista: 'Fernandinho',
                tom: 'B',
                letra: `Intro: |4/4 [G#m]  [B] | [F#] :|
   
       [G#m]   [B]   [F#]
Eu não posso ficar de pé 
              [G#m]   [B]   [F#]
Diante da Tua Glória
      [G#m]   [B]   [F#]
Eu não posso ficar de pé 
              [G#m]   [B]   [F#]
Diante da Tua Glória

       [G#m]             [E]
Sou teu templo, teu sacrifício 
        [B]                [F#]
O teu altar vem queimar em mim
       [G#m]             [E]
Sou teu templo, teu sacrifício 
        [B]                [F#]
O teu altar vem queimar em mim
 
Interlúdio: |: [G#m]  [B] | [F#] :|

       [G#m]   [B]   [F#]
Eu não posso ficar de pé 
              [G#m]   [B]   [F#]
Diante da Tua Glória
      [G#m]   [B]   [F#]
Eu não posso ficar de pé 
              [G#m]   [B]   [F#]
Diante da Tua Glória

       [G#m]             [E]
Sou teu templo, teu sacrifício 
        [B]                [F#]
O teu altar vem queimar em mim
       [G#m]             [E]
Sou teu templo, teu sacrifício 
        [B]                [F#]
O teu altar vem queimar em mim

[E]             [B]
  Caia fogo dos céus
            [G#m]
Queima esse altar
                    [F#]
Mostra pra esse povo
                     [E]
   Que há Deus em Israel
                [B]
  Caia fogo dos céus
            [G#m]
Queima esse altar
                    [F#]
Mostra pra esse povo
                     [E]
   Que há Deus em Israel
                 [B]
  Caia fogo dos céus
            [G#m]
Queima esse altar
                    [F#]
Mostra pra esse povo
                   | G#m B | F# | G#m B | F# |
   Que há Deus em Israel`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Caminho de Milagres',
                artista: 'Aline Barros',
                tom: 'C',
                letra: `Intro: |4/4 C  G/B | Am  G | [F] [G/F] | [F] [G/F] | [F] [G] | [Am] ||

        [F]   [G/F]     [F] [G/F]
 Tudo o que eu fiz foi acreditar
     [F]   [G]       [Am7]
Eu ouvi Tua voz e obedeci
     [F]   [G/F]      [F]   [G/F]
Como pude então ter chegado aqui
       [F]   [G]         [Am7]
Eu não posso crer que é o fim

[A#]/[G#] [D#]/[G]  [A#]/[G#] [D#]/[G]
    Di____zem: "onde está o Teu Deus?
   [A#]/[G#] [D#]/[G]      [G]  [F]/[A] [G]/[B]
Me pergun_______tam o que fazer

[C]        [G]/[B] [Am]     [G]       [F] [C]/[E]
Quando o que era difícil se torna impossível
      [Dm]     [G]
Deus começa a agir
[C]    [G]/[B]      [Am]       [G]    [F] [C]/[E]
Ele abre sempre uma porta onde não há saí__da
      [Dm]     [F]/[G]
O impossível faz acontecer

Interlúdio: || [F] [G/F] | [F] [G/F] | [F] [G] | [Am] ||

        [F]   [G/F]     [F] [G/F]
 Tudo o que eu fiz foi acreditar
     [F]   [G]       [Am7]
Eu ouvi Tua voz e obedeci
     [F]   [G/F]      [F]   [G/F]
Como pude então ter chegado aqui
       [F]   [G]         [Am7]
Eu não posso crer que é o fim

[A#]/[G#] [D#]/[G]  [A#]/[G#] [D#]/[G]
    Di____zem: "onde está o Teu Deus?
   [A#]/[G#] [D#]/[G]      [G]  [F]/[A] [G]/[B]
Me pergun_______tam o que fazer

[C]        [G]/[B] [Am]     [G]       [F] [C]/[E]
Quando o que era difícil se torna impossível
      [Dm]     [G]
Deus começa a agir
[C]    [G]/[B]      [Am]       [G]    [F] [C]/[E]
Ele abre sempre uma porta onde não há saí__da
      [Dm]       [G] [F]/[A] [G]/[B]
O impossível Ele faz

[C]        [G]/[B] [Am]     [G]       [F] [C]/[E]
Quando o que era difícil se torna impossível
      [Dm]     [G]
Deus começa a agir
[C]    [G]/[B]      [Am]       [G]    [F] [C]/[E]
Ele abre sempre uma porta onde não há saí__da
      [Dm]       [G]
O impossível Ele faz

[G]/[B] [C] [C]/[E] [D]/[F#] [Em] [D] [C] [G]/[B] [C]      [F] | [G] | [F] [G] | F G | 
  Ele   faz    um      cami___nho de   mi____la__gres pelo mar

[C]        [G]/[B] [Am]     [G]       [F] [C]/[E]
Quando o que era difícil se torna impossível
      [Dm]     [G]
Deus começa a agir
[C]    [G]/[B]      [Am]       [G]    [F] [C]/[E]
Ele abre sempre uma porta onde não há saí__da
      [Dm]       [G] [F]/[A] [G]/[B]
O impossível Ele faz

[C]        [G]/[B] [Am]     [G]       [F] [C]/[E]
Quando o que era difícil se torna impossível
      [Dm]     [G]
Deus começa a agir
[C]    [G]/[B]      [Am]       [G]    [F] [C]/[E]
Ele abre sempre uma porta onde não há saí__da
      [Dm]       [G]   [F] [G/F] | [F] [G/F] | [F] [G] | [Am] || 
O impossível Ele faz`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Canção ao Cordeiro',
                artista: 'Israel Salazar',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Canção do Apocalipse',
                artista: 'Diante do Trono',
                tom: 'G',
                letra: `Intro: |4/4 D | Am7 | C9 | G |

[D]                    [Am7]
   Digno é o Cordeiro,    que foi morto
[C9]                  [G]
   Santo, Santo Ele é
[D]               [Am7]
   Um novo cântico,    ao que se assenta
[C9]             [G]
Sobre o trono do céu

[D]                    [Am7]
   Digno é o Cordeiro,    que foi morto
[C9]                  [G]
   Santo, Santo Ele é
[D]               [Am7]
   Um novo cântico,    ao que se assenta
[C9]             [G]
Sobre o trono do céu

[D]
   Santo, Santo, Santo
[Am7]
   Deus Todo Poderoso
[C9]                   [G]
   Que era e é e há de vir
[D]
   Com a criação eu canto
[Am7]
   Louvores ao Rei dos reis
[C9]                
   És tudo para mim
  [G]             | D | Am7 | C9 | G |
E eu Te adorarei

[D]           [Am7]
  Está vestido,    do arco-íris
[C]                      [G]
   Sons de trovão, luzes, relâmpagos
[D]
  Louvores, honra e glória
[Am7]
  Força e poder pra sempre
[C9]                [G]
  Ao único Rei eternamente

[D]
   Santo, Santo, Santo
[Am7]
   Deus Todo Poderoso
[C9]                   [G]
   Que era e é e há de vir
[D]
   Com a criação eu canto
[Am7]
   Louvores ao Rei dos reis
[C9]                
   És tudo para mim
  [G]             | D | Am7 | C9 | G |
E eu Te adorarei

[D]           [Am7]
   Maravilhado,   extasiado
[C9]                   [G]
   Eu fico ao ouvir Teu nome
[D]           [Am7]
   Maravilhado,   extasiado
[C9]                   [G]
   Eu fico ao ouvir Teu nome
[D]
   Jesus, Teu nome é força
[Am7]
   É fôlego de vida
[C9]              [G]   
   Misteriosa água viva

[D]
   Santo, Santo, Santo
[Am7]
   Deus Todo Poderoso
[C9]                   [G]
   Que era e é e há de vir
[D]
   Com a criação eu canto
[Am7]
   Louvores ao Rei dos reis
[C9]                
   És tudo para mim
  [G]             | D | Am7 | C9 | G |
E eu Te adorarei`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Clamo Jesus',
                artista: 'Paulo Cesar Baruk',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Como eu te amo',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Consagração',
                artista: 'Aline Barros',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Contar meus Segredos',
                artista: 'Aline Barros',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Coração Igual ao Teu',
                artista: 'Diante do Trono',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Cordeiro Santo',
                artista: 'Filhos do Homem',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Corpo e Família',
                artista: 'Eli Soares',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Correr para Deus',
                artista: 'Aline Barros',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Creio que Tu és a Cura',
                artista: 'Gabriela Rocha',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Creio em Ti',
                artista: 'Gabriela Rocha',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Dançar na Chuva',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Eterno',
                artista: 'Oficina G3',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Fiel',
                artista: 'Gateway Worship',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus me Ama',
                artista: 'Thalles Roberto',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus tem o Melhor pra Mim',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Vem Me Socorrer ',
                artista: 'Bruna Karla',
                tom: 'Eb',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus da Minha Vida',
                artista: 'Thalles Roberto',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus de Promessas',
                artista: 'Davi Sacer',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus do impossível',
                artista: 'Ministério Apascentar de Nova Iguaçu',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus é Deus',
                artista: 'Delino Marçal',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Diante da Cruz',
                artista: 'Aline Barros',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Digno é o Senhor',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Diz',
                artista: 'Ana Nóbrega',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Dono do Mundo',
                artista: 'Fernandinho',
                tom: 'B',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'E Ele Vem',
                artista: 'David Quilan',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eis-me Aqui',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ele é Exaltado',
                artista: 'Ademar de Barros',
                tom: 'E',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Em Teus Braços',
                artista: 'Laura Souguellis',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Em Tua Presença',
                artista: 'Nívea Soares',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Em Espírito, Em Verdade',
                artista: 'Lukas Agustinho',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Emanuel',
                artista: 'Isaías Saad',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Emanuel',
                artista: 'Fernandinho',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Enche-me',
                artista: 'Isaías Saad',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Entrega',
                artista: 'Vineyard',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Escape',
                artista: 'Renascer Praise',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Estás Comigo',
                artista: 'Gabriela Rocha',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Estrela da Manhã',
                artista: 'Marcos Góes',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eternidade',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eu me Rendo',
                artista: 'Renascer Praise',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eu Navegarei',
                artista: 'Gabriela Rocha',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eu Quero Ser Santo',
                artista: 'Eyshila',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eu Sou Livre',
                artista: 'Ronaldo Bezerra',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Eu vou Construir',
                artista: 'Juliano Son',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Faz Chover',
                artista: 'Trazendo a Arca',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Faz Chover',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Fidelidade',
                artista: 'Danielle Cristina',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Filho de Davi',
                artista: 'David Quilan',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Fogo consumidor',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Galileu',
                artista: 'Fernandinho',
                tom: 'C#',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Grande é o Senhor',
                artista: 'Adhemar de Campos',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Hosana',
                artista: 'Mariana Valadão',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Há um Lugar',
                artista: 'Heloísa Rosa',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Há um Rio',
                artista: 'Fernandinho',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Incendeia-nos',
                artista: 'Fred Arrais',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Invincível',
                artista: 'Aline Barros',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Isaías 9',
                artista: 'Rodolfo Abrantes',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
             {
                id: generateId(),
                titulo: 'Já Estou Crucificado',
                artista: 'Fernandinho',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
             {
                id: generateId(),
                titulo: 'Jeová Jireh',
                artista: 'Aline Barros',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Jesus em Tua Presença',
                artista: 'Morada',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Leão da Tribo de Judá',
                artista: 'Adhemar de Campos',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Livre acesso',
                artista: 'Ministério Koinonya de Louvor',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Lugar Secreto',
                artista: 'Gabriela Rocha',
                tom: 'Bb',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Lugar Seguro',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Mais Alto',
                artista: 'Fernandinho',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Maranata',
                artista: 'Ministério Avivah',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Marca da Promessa (Bonus Track)',
                artista: 'Trazendo a Arca',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Me Ama',
                artista: 'Diante do Trono',
                tom: 'A',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Me Derramar',
                artista: 'Ministério Vineyard',
                tom: 'G',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
             {
                id: generateId(),
                titulo: 'Meu Alvo',
                artista: 'Kleber Lucas',
                tom: 'Bb',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }, 
            {
                id: generateId(),
                titulo: 'Meu Respirar',
                artista: 'Ministério Vineyard',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Meu Salvador',
                artista: 'Jason Lee Jones',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Milagre',
                artista: 'André Valadão',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Nada Além do Sangue',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Nosso Deus',
                artista: 'Gui Rebustini',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Nosso Deus é Soberano',
                artista: 'Aline Barros',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Não Há Deus Maior',
                artista: 'Comunidade de Nilópolis',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Não Vou Desistir',
                artista: 'Trazendo a Arca',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'O Carpinteiro',
                artista: 'Alessandro Vilas Boas',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'O Grande Eu Sou',
                artista: 'Nazareno Central Music',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'O Nome de Jesus',
                artista: 'Isadora Pompeo',
                tom: 'Bb',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'o Nosso General é Cristo',
                artista: 'Adhemar de Campos',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'O que Tua Glória Fez Comigo',
                artista: 'Fernanda Brum',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Oceanos',
                artista: 'Levi Alves, Pedro Gonçalo Pinto, Tiago Braga, Ana Isabel Rocha',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Oh Quão Lindo esse Nome é',
                artista: 'Ana Nóbrega',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Os que confiam no Senhor',
                artista: 'Marcos Goes',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Os Sonhos de Deus',
                artista: 'Ludmila Feber',
                tom: 'D',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ousado Amor',
                artista: 'FHOP Music',
                tom: 'Bb',
                letra: `Intro: |6/8 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ouve-se um Júbilo',
                artista: 'Ministério Koinonya de Louvor',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Pai Nosso',
                artista: 'Pedras Vivas',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Pela Fé',
                artista: 'André Valadão',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Pode Morar Aqui',
                artista: 'Theo Rubia',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Poder do Teu Amor',
                artista: 'Diante do Trono',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Poderoso Deus',
                artista: 'David Quilan',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Porque Ele Vive',
                artista: 'Harpa Cristã',
                tom: 'A',
                letra: `Intro: |4/4 [A] | [A]/[C#] | [D] | [D7] | [Bm] | [E] | [A] | [D]/[E] |
        [A]             [D]
Deus enviou seu Filho amado
        [A9]           [Bm]  [E]
Pra perdoar, pra me salvar 
          [A9]            [D]
Na cruz morreu por meu pecado
     [A9]  [Bm]        [E]       [A] [E]
Mas ressur_giu e vivo com o Pai está

            [A9]
Porque Ele vive
              [D]
Posso crer no amanhã
            [A9]
Porque Ele vive
           [E]
Temor não há

           [A9][Bm][A]/[C#]
Mas eu bem sei, eu sei
             [D] [Bm]
Que a minha vida
        [A9]    [Bm]   [E]
Está nas mãos do meu Jesus
           [A]  [E]
Que vivo está

           [A]           [D]
E quando enfim, chegar a hora
          [A9]            [Bm]  [E]
Em que a morte enfrentarei
           [A9]           [D]
Sem medo, então, terei vitória
        [A9]       [Bm]   [E]
Verei na Glória, ao meu Jesus
            [A] [E]
Que vivo está

            [A9]
Porque Ele vive
              [D]
Posso crer no amanhã
            [A9]
Porque Ele vive
           [E]
Temor não há

           [A9][Bm][A]/[C#]
Mas eu bem sei, eu sei
             [D] [Bm]
Que a minha vida
        [A9]    [Bm]   [E]
Está nas mãos do meu Jesus
           [A]  [E]
Que vivo está`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Pra Sempre',
                artista: 'Fernandinho',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Preciso de TI',
                artista: 'Diante do Trono',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Quebrantado',
                artista: 'Ministério Vineyard',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Quero Conhecer Jesus',
                artista: 'Alessandro Vilas Boas',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Quão Formoso És',
                artista: 'Ministério Koinonya de Louvor',
                tom: 'G',
                letra: `Intro: ||4/4 [G] | [C]/[G] | [D]/[G] | [C]/[G] [G]/[B] | [C] [D]/[C] | [Bm] [Em] [D] | [C] [G]/[B] [F] | [F] ||
                
 [G]         [G]/[B] [D]  [D]/[C]   [G]/[B]
Quão formoso és Rei do universo
      [C]   [G]/[B]     [Am]
Tua glória enche a terra
[Am]/[G]         [D]	 
  E enche os céus
    
     [C]            [D]/[C]
Tua glória enche a terra
    [Bm]    [B]/[D#]     [Em]
Tua glória enche os céus
    [Am]                [C]/[D]     |[G] [C]/[G] | [D]/[G] [C]/[G] [C]/[D] | 
Tua glória enche minha vida Senhor

 [G]         [G]/[B] [D]  [D]/[C]    [G]/[B]
Quão formoso és Rei do universo
      [C]   [G]/[B]     [Am]
Tua glória enche a terra
[Am]/[G]         [D]	 
  E enche os céus
    
     [C]            [D]/[C]
Tua glória enche a terra
    [Bm]    [B]/[D#]     [Em]
Tua glória enche os céus
    [Am]                [C]/[D]     [G]  [D] 
Tua glória enche minha vida Senhor

      [G]        [G]/[B]            [C]   [E]
Maravilhoso é estar em tua presença
      [Am]       [Am]/[G]       [D]
Maravilhoso é poder te adorar
      [Bm]       [B]/[D#]          [Em]
Maravilhoso é tocar nas tuas vestes
      [Am]         [C]/[D]
Maravilhoso é te contemplar
   [G]	 [D]
Senhor

      [G]        [G]/[B]            [C]   [E]
Maravilhoso é estar em tua presença
      [Am]       [Am]/[G]       [D]
Maravilhoso é poder te adorar
      [Bm]       [B]/[D#]          [Em]
Maravilhoso é tocar nas tuas vestes
      [Am]         [C]/[D]
Maravilhoso é te contemplar
   [G]	 [D]
Senhor
      [G]        [G]/[B]            [C]   [E]
Maravilhoso é estar em tua presença
      [Am]       [Am]/[G]       [D]
Maravilhoso é poder te adorar
      [Bm]       [B]/[D#]          [Em]
Maravilhoso é tocar nas tuas vestes
      [Am]         [C]/[D]
Maravilhoso é te contemplar
   [G]	 [D]/[E] [Em]/[D] 
Senhor

      [Am]         [C]/[D]
Maravilhoso é te contemplar
   [G]	 [D]/[E] [Em]/[D] 
Senhor
      [Am]         [C]/[D]
Maravilhoso é te contemplar
   [G]	 [C]/[G] [D]/[G] [C]/[G] [G]
Senhor`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Rei da Glória',
                artista: 'Aline Barros',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Rei do Meu Coração',
                artista: 'Nívea Soares',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Reina em Mim',
                artista: 'Ministério Vineyard',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Rendido estou',
                artista: 'Aline Barros',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ressuscita',
                artista: 'Ministério Ipiranga',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ressuscita-me',
                artista: 'Aline Barros',
                tom: 'D',
                letra: `Intro: ||4/4 [C6] [C] | [G]/[B] [Bb6] | [D]/[A] [G]/[A] ||

[D]                      [A]/[C#]
  Mestre eu preciso de um milagre
[Bm]                              [G]
   Transforma minha vida, o meu estado
[D]                             [A]/[C#]
  Faz tempo que não vejo a luz do dia
                                [Bm]
Estão tentando sepultar minha alegria
                             [G]    [G][D]/[F#][Em]
Tentando ver meus sonhos cancelados

       [B]/[D#]    [D]               
Lázaro ouviu a Sua voz 
            [A]/[C#]    [G]
Quando aquela pedra removeu
                          [D]    [D][A]/[C#][Bm]
Depois de quatro dias ele reviveu
               [A]               [G]
Mestre, não há outro que possa fazer
                  [D]/[F#]         [Em7]
Aquilo que só o Teu nome tem todo poder
                        [A]
Eu preciso tanto de um milagre

             [D]
Remove minha pedra
            [A]/[C#]
Me chama pelo nome
              [Bm]
Muda minha história
                   [G]
Ressuscita os meus sonhos
               [D]/[F#] [G]
Transforma minha vida
            [A]
Me faz um milagre
             [C]
Me toca nessa hora
            [G]/[B]
Me chama para fora
[G]/[A]      [D]
   Ressuscita-me

[D]                      [A]/[C#]
  Mestre eu preciso de um milagre
[Bm]                              [G]
   Transforma minha vida, o meu estado
[D]                             [A]/[C#]
  Faz tempo que não vejo a luz do dia
                                [Bm]
Estão tentando sepultar minha alegria
                             [G]    [G][D]/[F#][Em]
Tentando ver meus sonhos cancelados

       [B]/[D#]    [D]               
Lázaro ouviu a Sua voz 
            [A]/[C#]    [G]
Quando aquela pedra removeu
                          [D]    [D][A]/[C#][Bm]
Depois de quatro dias ele reviveu
               [A]               [G]
Mestre, não há outro que possa fazer
                  [D]/[F#]         [Em7]
Aquilo que só o Teu nome tem todo poder
                        [A]
Eu preciso tanto de um milagre

             [D]
Remove minha pedra
            [A]/[C#]
Me chama pelo nome
              [Bm]
Muda minha história
                   [G]
Ressuscita os meus sonhos
               [D]/[F#] [G]
Transforma minha vida
            [A]
Me faz um milagre
             [C]
Me toca nessa hora
            [G]/[B]
Me chama para fora
[G]/[A]      [D] [D][A]/[C#][G]/[B][A]/[C#]
   Ressuscita-me!

   [D]
Tu és a própria vida
[A]/[C#]
A força que há em mim
     [Bm]
Tu és o filho de Deus
       [G]
Que me ergue pra vencer
[D]/[F#]             [D]/[F#][Em][D]
Senhor de tudo em mim
 [A]/[C#]
Já ouço a Tua voz
     [Bm]
Me chamando pra viver
      [G]               [A]/[B]
Uma história de poder!

             [E]
Remove minha pedra
            [B]/[D#]
Me chama pelo nome
              [C#m]
Muda minha história
                   [A]
Ressuscita os meus sonhos
               [E]/[G#][F#m][E]/[G#][A]
Transforma minha vida
            [B]
Me faz um milagre
             [D]
Me toca nessa hora
            [A]/[C#]
Me chama para fora
[A]/[B]      [E] [E][B]/[D#][A]/[C#][B]/[D#]
   Ressuscita-me!

   [E]
Tu és a própria vida
[B]/[D#]
A força que há em mim
     [C#m]
Tu és o filho de Deus
       [A]
Que me ergue pra vencer
[E]/[G#]             [E]/[G#][F#m][E]
Senhor de tudo em mim
 [B]/[D#]
Já ouço a Tua voz
     [C#m]
Me chamando pra viver
      [A]               [A]/[B]
Uma história de poder!

             [E]
Remove minha pedra
            [B]/[D#]
Me chama pelo nome
              [C#m]
Muda minha história
                   [A]
Ressuscita os meus sonhos
               [E]/[G#][F#m][E]/[G#][A]
Transforma minha vida
            [B]
Me faz um milagre
             [D]
Me toca nessa hora
            [A]/[C#]
Me chama para fora
[A]/[B]    ||[D6] [D] | [A]/[C#] [C6] | [E]/[B] [A]/[B] ||  [E]
   Ressuscita-me,                                 Ressuscita-me`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Restitui',
                artista: 'Trazendo a Arca',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Rompendo em Fé',
                artista: 'Comunidade Evangélica Internacional da Zona Sul',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ruja o Leão',
                artista: 'Isaías Saad',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Sai da Tua Tenda',
                artista: 'Ministério Sai da Tua Tenda',
                tom: 'Bb',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Santo',
                artista: 'Fernandinho',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Santo Espirito',
                artista: 'Laura Souguellis',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Santo pra Sempre',
                artista: 'Fernandinho',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Santo, Santo, Santo',
                artista: 'Renascer Praise',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Senhor te Quero',
                artista: 'Ministério Vineyard',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Seu Sangue',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Sobre as Águas',
                artista: 'Trazendo a Arca',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Sonda-me',
                artista: 'ALine Barros',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Te Adorar',
                artista: 'Diante do Trono-CTMDT',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
        {
                id: generateId(),
                titulo: 'Te Adorar',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Te Adorar é o Meu Prazer',
                artista: 'Aline Barros',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Te Louvarei',
                artista: 'Trazendo a Arca',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tens Transformado',
                artista: 'David Quilan',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Terceiro dia',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Teu Amor não Falha ',
                artista: 'Jesus Culture',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Teu nome é Santo',
                artista: 'Ministério Vineyard',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Teu Santo nome',
                artista: 'Gabriela Rocha',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tens Todos os Meus Dias',
                artista: 'Gabriel Guedes',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Toma o Meu Coração',
                artista: 'Hillsong Português',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tremenda Graça',
                artista: 'Fred Arrais',
                tom: 'B',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tu És Bom (Deus é Bom o Tempo Todo)',
                artista: 'Adoração e Adoradores',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tu És + Águas Purificadoras',
                artista: 'FHOP Music ',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tua Alegria',
                artista: 'Isadora Pompeo',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tua Graça Me Basta',
                artista: 'Trazendo a Arca',
                tom: 'E',
                letra: `Intro: |: 4/4 [C#m]  [E]/[G#] | [A]  [A]/[B] ||[C#m]  [E]/[G#] | [A]  [A]/[B]
[E]                   
  Eu não preciso ser
           [A9]/[E]         [B]/[E]
Reconhecido por ninguém  
[E]                       
   A minha Glória é fazer
          [A9]/[E]         [C#m7]
Com que conheçam a Ti  
       [B]   [A9]                    
E que diminua eu pra que Tu cresças
[E/G#][F#m]       [B]
 Se___nhor mais e mais  

[E]                       
  E como os serafins que
                [A9]/[E]         [B]/[E]
Encobrem o rosto ante a Ti  
[E]                         
  Escondo o rosto para que
         [A9]/[E]         [C#m7]
Vejam Tua face em mim  
        [B]  [A9]                    
E que diminua eu pra que Tu cresças
[E/G#][F#m]       [B]
 Se___nhor mais e mais 

         [E/G#][A9]    
No santo dos   santos
        [E/G#][F#m]
A fumaça me  esconde 
                 [C#m7]
Só teus olhos me veem
  [B]            [A9]      [E]/[G#]  [F#m]
Debaixo de Tuas asas é meu a___brigo
              [C#m7]
Meu lugar secreto
         [B]       [A9]     
Só Tua graça me basta e
        [B]               [E]
Tua presença é o meu prazer 

Solo 1: |[E]/[G#] [A] [B] | [C#m]  |[A]  [F#m]| [E] [B]/[D#]
[E]                   
  Eu não preciso ser
           [A9]/[E]         [B]/[E]
Reconhecido por ninguém  
[E]                       
   A minha Glória é fazer
          [A9]/[E]         [C#m7]
Com que conheçam a Ti  
       [B]   [A9]                    
E que diminua eu pra que Tu cresças
[E/G#][F#m]       [B]
 Se___nhor mais e mais  

[E]                       
  E como os serafins que
                [A9]/[E]         [B]/[E]
Encobrem o rosto ante a Ti  
[E]                         
  Escondo o rosto para que
         [A9]/[E]         [C#m7]
Vejam Tua face em mim  
        [B]  [A9]                    
E que diminua eu pra que Tu cresças
[E/G#][F#m]       [B]
 Se___nhor mais e mais 

         [E/G#][A9]    
No santo dos   santos
        [E/G#][F#m]
A fumaça me  esconde 
                 [C#m7]
Só teus olhos me veem
  [B]            [A9]      [E]/[G#]  [F#m]
Debaixo de Tuas asas é meu a___brigo
              [C#m7]
Meu lugar secreto
         [B]       [A9]     
Só Tua graça me basta e
        [B]               [E]
Tua presença é o meu prazer 
Solo 2: |[E]/[G#] [A9] [E/G#]|[F#m] | [C#m] [B]| [A] [E/G#]|[F#m] ||[C#m]  [E]/[G#] | [A] [E] | [F#m] |[C#m]  [E]/[G#] | [A] [E] | [F#m] | [B]

         [E/G#][A9]    
No santo dos   santos
        [E/G#][F#m]
A fumaça me  esconde 
                 [C#m7]
Só teus olhos me veem
  [B]            [A9]      [E]/[G#]  [F#m]
Debaixo de Tuas asas é meu a___brigo
              [C#m7]
Meu lugar secreto
         [B]       [A9]     
Só Tua graça me basta e
        [B]               [E]
Tua presença é o meu prazer

     [A]/[C#]   
Tua presença,
      [F#m]
Tua presença é o meu prazer 
       [E]     
Tua presença,
     [B]/[D#]
Tua presença é o meu prazer 
     [A]/[C#]   
Tua presença,
      [F#m]
Tua presença é o meu prazer 
       [E]     
Tua presença,
     [B]/[D#]
Tua presença é o meu prazer 
          
         [E/G#][A9]    
No santo dos   santos
        [E/G#][F#m]
A fumaça me  esconde 
                 [C#m7]
Só teus olhos me veem
  [B]            [A9]      [E]/[G#]  [F#m]
Debaixo de Tuas asas é meu a___brigo
              [C#m7]
Meu lugar secreto
         [B]       [A9]     
Só Tua graça me basta e
        [B]               [C#m]
Tua presença é o meu prazer

         [B]       [A9]   
Só Tua graça me basta e
        [B]               [C#m]
Tua presença é o meu prazer 

         [B]       [A9]
Só Tua graça me basta e
        [B]               [E]
Tua presença é o meu prazer

Final: |: [C#m]  [E]/[G#] | [A]  [F#m][E][B]/[D#] |[E]||`,

                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tua Unção',
                artista: 'Ministério Nova Jerusalém',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Tão Profundo',
                artista: 'Ministério Vineyard',
                tom: 'C#',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Uma Coisa Peço ao Senhor',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Uma Nova História',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Vem com Josué Lutar em Jericó',
                artista: 'Eli Soares',
                tom: 'F',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Vem Essa é a Hora',
                artista: 'Ministério Vineyard',
                tom: 'D',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Vem me Buscar',
                artista: 'Jefferson e Suellen',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Vento que Vem',
                artista: 'Pedras Vivas',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Vim para Adorar-te',
                artista: 'Quatro por Um',
                tom: 'E',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },        
            {
                id: generateId(),
                titulo: 'Vitória no Deserto',
                artista: 'Aline Barros',
                tom: 'G',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Yeshua',
                artista: 'Heloísa Rosa',
                tom: 'A',
                letra: `Intro: |4/4 Yeshua`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Yeshua',
                artista: 'Fernandinho',
                tom: 'C',
                letra: `Intro: |4/4 `,
                favorite: false,
                createdAt: Date.now() - 172200000
            }
        ];
        saveCifras();
    }
}

// ==================== Utility Functions ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function normalizeString(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ==================== Chord Transposition ====================
function transposeChord(chord, semitones) {
    // Extract chord components (root, quality, extensions)
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;
    
    let [, root, quality] = match;
    
    // Convert alternative notations
    if (CHORD_ALTERNATIVES[root]) {
        root = CHORD_ALTERNATIVES[root];
    }
    
    // Find current position
    let index = CHORDS.indexOf(root);
    if (index === -1) return chord;
    
    // Transpose
    index = (index + semitones + CHORDS.length) % CHORDS.length;
    
    return CHORDS[index] + quality;
}

function transposeLetra(letra, semitones) {
    // Find all chords in brackets [chord]
    return letra.replace(/\[([^\]]+)\]/g, (match, chord) => {
        const transposedChord = transposeChord(chord, semitones);
        return `[${transposedChord}]`;
    });
}

function parseLetraWithChords(letra) {
    // Convert [chord] to HTML with span
    return letra.replace(/\[([^\]]+)\]/g, '<span class="chord">$1</span>');
}

// ==================== Render Functions ====================
function renderCifras() {
    const searchTerm = normalizeString(elements.searchInput.value);
    const artistFilter = elements.filterArtist.value;
    const favoriteFilter = elements.filterFavorite.value;
    
    let filtered = cifras.filter(cifra => {
        const matchSearch = normalizeString(cifra.titulo).includes(searchTerm) ||
                          normalizeString(cifra.artista).includes(searchTerm);
        const matchArtist = !artistFilter || cifra.artista === artistFilter;
        const matchFavorite = favoriteFilter !== 'favorites' || cifra.favorite;
        
        return matchSearch && matchArtist && matchFavorite;
    });
    
    // Sort by date (newest first)
    filtered.sort((a, b) => b.createdAt - a.createdAt);
    
    elements.cifraCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'cifra' : 'cifras'}`;
    
    if (filtered.length === 0) {
        elements.cifrasList.style.display = 'none';
        elements.emptyState.style.display = 'block';
    } else {
        elements.cifrasList.style.display = 'grid';
        elements.emptyState.style.display = 'none';
        
        elements.cifrasList.innerHTML = filtered.map(cifra => `
            <div class="cifra-card" onclick="viewCifra('${cifra.id}')">
                ${cifra.favorite ? '<i class="fas fa-heart favorite-badge"></i>' : ''}
                <div class="cifra-card-header">
                    <h3 class="cifra-title">${cifra.titulo}</h3>
                    <p class="cifra-artist">
                        <i class="fas fa-user"></i>
                        ${cifra.artista}
                    </p>
                </div>
                <div class="cifra-meta">
                    <span class="meta-item">
                        <i class="fas fa-music"></i>
                        Tom: ${cifra.tom}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(cifra.createdAt)}
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    updateArtistFilter();
}

function updateArtistFilter() {
    const artists = [...new Set(cifras.map(c => c.artista))].sort();
    const currentValue = elements.filterArtist.value;
    
    elements.filterArtist.innerHTML = '<option value="">Todos os artistas</option>' +
        artists.map(artist => `<option value="${artist}" ${artist === currentValue ? 'selected' : ''}>${artist}</option>`).join('');
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// ==================== Modal Functions ====================
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openAddCifraModal() {
    editingCifraId = null;
    elements.modalTitle.textContent = 'Nova Cifra';
    elements.formCifra.reset();
    openModal(elements.modalCifra);
}

function openEditCifraModal(id) {
    const cifra = cifras.find(c => c.id === id);
    if (!cifra) return;
    
    editingCifraId = id;
    elements.modalTitle.textContent = 'Editar Cifra';
    elements.inputTitulo.value = cifra.titulo;
    elements.inputArtista.value = cifra.artista;
    elements.inputTom.value = cifra.tom;
    elements.inputLetra.value = cifra.letra;
    
    closeModal(elements.modalViewCifra);
    openModal(elements.modalCifra);
}

function viewCifra(id) {
    const cifra = cifras.find(c => c.id === id);
    if (!cifra) return;
    
    currentCifraId = id;
    currentTranspose = 0;
    
    elements.viewTitulo.textContent = cifra.titulo;
    elements.viewArtista.textContent = cifra.artista;
    elements.currentTom.textContent = cifra.tom;
    
    updateViewLetra(cifra);
    updateFavoriteButton(cifra);
    
    openModal(elements.modalViewCifra);
}

function updateViewLetra(cifra) {
    const transposedLetra = transposeLetra(cifra.letra, currentTranspose);
    elements.viewLetra.innerHTML = parseLetraWithChords(transposedLetra);
    
    // Update displayed tom
    const transposedTom = transposeChord(cifra.tom, currentTranspose);
    elements.currentTom.textContent = transposedTom;
}

function updateFavoriteButton(cifra) {
    const icon = elements.btnFavorite.querySelector('i');
    icon.className = cifra.favorite ? 'fas fa-heart' : 'far fa-heart';
}

// ==================== CRUD Operations ====================
function saveCifra(event) {
    event.preventDefault();
    
    const cifraData = {
        titulo: elements.inputTitulo.value.trim(),
        artista: elements.inputArtista.value.trim(),
        tom: elements.inputTom.value,
        letra: elements.inputLetra.value.trim()
    };
    
    if (editingCifraId) {
        // Update existing
        const index = cifras.findIndex(c => c.id === editingCifraId);
        if (index !== -1) {
            cifras[index] = {
                ...cifras[index],
                ...cifraData
            };
        }
    } else {
        // Create new
        cifras.push({
            id: generateId(),
            ...cifraData,
            favorite: false,
            createdAt: Date.now()
        });
    }
    
    saveCifras();
    renderCifras();
    closeModal(elements.modalCifra);
}

function deleteCifra() {
    if (!currentCifraId) return;
    
    if (confirm('Tem certeza que deseja excluir esta cifra?')) {
        cifras = cifras.filter(c => c.id !== currentCifraId);
        saveCifras();
        renderCifras();
        closeModal(elements.modalViewCifra);
    }
}

function toggleFavorite() {
    if (!currentCifraId) return;
    
    const cifra = cifras.find(c => c.id === currentCifraId);
    if (!cifra) return;
    
    cifra.favorite = !cifra.favorite;
    saveCifras();
    renderCifras();
    updateFavoriteButton(cifra);
}

// ==================== Transposition ====================
function transposeUp() {
    if (!currentCifraId) return;
    const cifra = cifras.find(c => c.id === currentCifraId);
    if (!cifra) return;
    
    currentTranspose++;
    updateViewLetra(cifra);
}

function transposeDown() {
    if (!currentCifraId) return;
    const cifra = cifras.find(c => c.id === currentCifraId);
    if (!cifra) return;
    
    currentTranspose--;
    updateViewLetra(cifra);
}

function resetTranspose() {
    if (!currentCifraId) return;
    const cifra = cifras.find(c => c.id === currentCifraId);
    if (!cifra) return;
    
    currentTranspose = 0;
    updateViewLetra(cifra);
}

// ==================== Backup & Import ====================
function exportCifras() {
    const dataStr = JSON.stringify(cifras, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cifracerta_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function importCifras(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedCifras = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedCifras)) {
                alert('Arquivo inválido. Por favor, selecione um arquivo de backup válido.');
                return;
            }
            
            if (confirm(`Isso irá substituir todas as ${cifras.length} cifras atuais por ${importedCifras.length} cifras do arquivo. Deseja continuar?`)) {
                cifras = importedCifras;
                saveCifras();
                renderCifras();
                closeModal(elements.modalBackup);
                alert('Cifras importadas com sucesso!');
            }
        } catch (error) {
            alert('Erro ao ler o arquivo. Verifique se é um arquivo JSON válido.');
        }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
}

function printCifra() {
    window.print();
}

// ==================== Event Listeners ====================
function attachEventListeners() {
    // Theme
    elements.btnTheme.addEventListener('click', toggleTheme);
    
    // Modals
    elements.btnAddCifra.addEventListener('click', openAddCifraModal);
    elements.btnCloseModal.addEventListener('click', () => closeModal(elements.modalCifra));
    elements.btnCancelModal.addEventListener('click', () => closeModal(elements.modalCifra));
    elements.btnCloseViewModal.addEventListener('click', () => closeModal(elements.modalViewCifra));
    elements.btnCloseBackupModal.addEventListener('click', () => closeModal(elements.modalBackup));
    
    // Close modals on backdrop click
    [elements.modalCifra, elements.modalViewCifra, elements.modalBackup].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });
    
    // Form
    elements.formCifra.addEventListener('submit', saveCifra);
    
    // Search and Filters
    elements.searchInput.addEventListener('input', renderCifras);
    elements.filterArtist.addEventListener('change', renderCifras);
    elements.filterFavorite.addEventListener('change', renderCifras);
    
    // View Modal Actions
    elements.btnFavorite.addEventListener('click', toggleFavorite);
    elements.btnEdit.addEventListener('click', () => openEditCifraModal(currentCifraId));
    elements.btnDelete.addEventListener('click', deleteCifra);
    elements.btnPrint.addEventListener('click', printCifra);
    
    // Transposition
    elements.btnTransposeUp.addEventListener('click', transposeUp);
    elements.btnTransposeDown.addEventListener('click', transposeDown);
    elements.btnResetTom.addEventListener('click', resetTranspose);
    
    // Backup
    elements.btnBackup.addEventListener('click', () => openModal(elements.modalBackup));
    elements.btnExport.addEventListener('click', exportCifras);
    elements.btnImport.addEventListener('click', () => elements.fileImport.click());
    elements.fileImport.addEventListener('change', importCifras);
}

// ==================== Initialize App ====================
document.addEventListener('DOMContentLoaded', init);
