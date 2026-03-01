// ==================== Constants ====================
const STORAGE_KEY = 'cifracerta_cifras';
const THEME_KEY = 'cifracerta_theme';
const APP_VERSION = "1.0.1";

const savedVersion = localStorage.getItem("app_version");

if (savedVersion !== APP_VERSION) {
    localStorage.clear();
        localStorage.setItem("app_version", APP_VERSION);
            location.reload();
            }
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
                letra: `Intro: |4/4 Intro: |4/4 [A] | [D] | [A] [G] [D]|| [A] | [B] [E] | [A] | [A]/[G] | [E] | [F] | [A] [E] | [A] [G] [D] |
   
[A]            
A alegria está no coração
     [D]                  [A]  [G] [D]
De quem já conhece a Jesus
[A]             
A verdadeira paz só tem aquele
     [B]              [E]
Que já conhece a Jesus

[A]                 [A]/[G]               
O sentimento mais precioso
     [D]               [F]
Que vem do nosso Senhor
      [A]          [E]       
É o amor que só tem quem
                [A] | [A] [G] [D] |
Já conhece a Jesus

[A]            
A alegria está no coração
     [D]                  [A]  [G] [D]
De quem já conhece a Jesus
[A]             
A verdadeira paz só tem aquele
     [B]              [E]
Que já conhece a Jesus

[A]                 [A]/[G]               
O sentimento mais precioso
     [D]               [F]
Que vem do nosso Senhor
      [A]          [E]       
É o amor que só tem quem
                [A] 
Já conhece a Jesus

         [A]           
Posso pisar numa tropa
     [A]/[G]
E saltar as muralhas
    [D]        [E]
Aleluia! Aleluia!
         [A]           
Posso pisar numa tropa
     [A]/[G]
E saltar as muralhas
    [D]        [E]
Aleluia! Aleluia!

 [A]                 [A]/[G]               
Cristo é a rocha da minha salvação
    [D]                [B]
Com Ele não há mais condenação
         [A]      
Posso pisar numa tropa
      [E]
E saltar as muralhas
    [A]        [E]
Aleluia! Aleluia! 

    [A]        [D]  [A]
Aleluia! Alelui_a!
             [B]   [E]
Aleluia! Alelui__a!
    [A]        [D]  [A]
Aleluia! Alelui_a!
             [B]   [E]
Aleluia! Alelui__a!

[A]                 [A]/[G]               
O sentimento mais precioso
     [D]               [F]
Que vem do nosso Senhor
      [A]          [E]       
É o amor que só tem quem
                [A] 
Já conhece a Jesus
      [A]          [E]       
É o amor que só tem quem
                [G]  [D] 
Já conhece a Jesus
      [A]          [E]       
É o amor que só tem quem
                [A] 
Já conhece a Jesus`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Batalha é do Senhor',
                artista: 'Ademar de Campos',
                tom: 'F',
                letra: `Intro: |4/4 (solo bateria) | [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||
                
           [Dm]     [Am]     [Dm]  [Am] [Bb]         [Am][Gm]
Quando os grandes homens de Judá viram o inimigo
[Dm]     [Am]           [Dm]     [Am]
Deus mandou que eles não temessem
       [Bb]      [Am][Gm] [Bb][Am][Gm] 
Pois daria a vitória
               [Am]              [Bb]   [Bb][Am][Gm]
E chamou a cantar uma nova canção
             [Am]                 [Bb]/[C]
Abaixar a espada e levantar o louvor

[F9]            [Dm]             [Eb]
 Cantai ao Senhor com alegre som
            [Gm]    [C]/[E]   [F9]
 Erga a voz para o Seu louvor
              [Dm]            [Eb]
Um canto vencedor na tribulação
                [Gm]      [C]/[E]   [F9]
Crê somente a batalha é do Senhor

Interlúdio: || [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||

       [Dm]    [Am]     [Dm]    [Am]
Quando algum mal te encontrar
   [Bb]     [Am] [Gm]
Confia no Senhor
[Dm]     [Am]               [Dm]  [Am]       
Crê em Deus que não te deixará
     [Bb]    [Bb][Am]   [Gm]  [Bb][Am][Gm] 
Ele sempre perto está
             [Am]              [Bb]   [Bb][Am][Gm]
Você pode erguer uma nova canção
          [Am]             [Bb]/[C]
Porque a batalha é do Senhor

[F9]            [Dm]             [Eb]
 Cantai ao Senhor com alegre som
            [Gm]    [C]/[E]   [F9]
 Erga a voz para o Seu louvor
              [Dm]            [Eb]
Um canto vencedor na tribulação
                [Gm]      [C]/[E]   [F9]
Crê somente a batalha é do Senhor

      [C]/[Bb]  [Bb]/[D]   [Bbm]/[C#]         [F]
Porque ele é bom, Seu amor dura para sempre
      [C]/[Bb]  [Bb]/[D]   [Bbm]/[C#]         [F]
Porque ele é bom, Seu amor dura para sempre
             [Bb]/[C]
Pra sempre e sempre

[F9]            [Am]             [Eb]
 Cantai ao Senhor com alegre som
            [Gm]    [C]/[E]   [F9]
 Erga a voz para o Seu louvor
              [Am]            [Eb]
Um canto vencedor na tribulação
                [Gm]      [C]/[E]   [F9] Pausa
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
   Que o Senhor te  abençoe
[Bb]/[F]           [F]       [F#°]      [Gm]
    E faça brilhar seu rosto em ti
           [Eb]         [Bb]/[D]
Que conceda  Sua graça
   [F]      [Bb]
E te dê a paz

[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,   amém
[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,  amém

[Bb]              [Eb]/[G]
   Que o Senhor te  abençoe
[Bb]/[F]           [F]       [F#°]      [Gm]
    E faça brilhar seu rosto em ti
           [Eb]         [Bb]/[D]
Que conceda  Sua graça
   [F]      [Bb]
E te dê a paz

[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,   amém
[Gm]  [Eb]   [Bb]/[D]     [F]
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

[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,   amém
[Gm]  [Eb]   [Bb]/[D]     [F]
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

[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,   amém
[Gm]  [Eb]   [Bb]/[D]     [F]
Am__ém, amém,  amém`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'A Casa é Sua',
                artista: 'Casa Worship',
                tom: 'G',
                letra: `Intro: |4/4 G | C9 | Em7  G/B | C9 |

          G
Seja bem-vindo aqui
          C           Em7
A casa é sua, pode entrar
               C9
Me esvazio de mim
               G  C/G
Me esvazio de mim

             G
Sopra o Teu vento aqui
            C             Em7
Toma o Teu trono, vem reinar
                   C   C9
Nós queremos Te ouvir
                   G  C/G  G/B
Nós queremos Te ouvir

C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus

C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus

C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus
C9
Essa casa é Sua casa
                  D     Em7    Bm7
Nós deixamos ela pro Senhor, Jesus 

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Enche este lugar
              Bm7
Enche este lugar
    C9
Apareça
                 Am7
Que o Teu nome cresça
              G
Vem me incendiar 
              Bm7
Vem me incendiar

C9
Essa casa é Sua casa
                  D     Em7   
Nós deixamos ela pro Senhor `,
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
                letra: `Intro: |4/4  [E] | % | [B]/[D#] | % | [A] | [F#m] | [E] | % |
        
[E]
Abra os olhos do meu coração
[B]/[D#]
Abra os olhos do meu coração
          [A] [F#m]         [E]
Quero Te ver, quero Te ver

[E]
Abra os olhos do meu coração
[B]/[D#]
Abra os olhos do meu coração
          [A] [F#m]         [E]
Quero Te ver, quero Te ver

    [B]          [C#m7]
Exaltado e bem alto
    [A]                   [B]
Brilhando, a luz da Tua glória
   [B]                 [C#m]
Derrame Seu amor e poder
           [F#m]   [E]/[G#] [A]  [B]
Pois Tu és Santo, Santo, Santo

    [B]          [C#m7]
Exaltado e bem alto
    [A]                   [B]
Brilhando, a luz da Tua glória
   [B]                 [C#m]
Derrame Seu amor e poder
           [F#m]   [E]/[G#] [A]  [B]
Pois Tu és Santo, Santo, Santo

[E]
Abra os olhos do meu coração
[B]/[D#]
Abra os olhos do meu coração
          [A] [F#m]         [E]
Quero Te ver, quero Te ver

[E]
Abra os olhos do meu coração
[B]/[D#]
Abra os olhos do meu coração
          [A] [F#m]         [E]
Quero Te ver, quero Te ver

    [B]          [C#m7]
Exaltado e bem alto
    [A]                   [B]
Brilhando, a luz da Tua glória
   [B]                 [C#m]
Derrame Seu amor e poder
           [F#m]   [E]/[G#] [A]  [B]
Pois Tu és Santo, Santo, Santo
    [B]          [C#m7]
Exaltado e bem alto
    [A]                   [B]
Brilhando, a luz da Tua glória
   [B]                 [C#m]
Derrame Seu amor e poder
           [F#m]   [E]/[G#] [A]  [B]
Pois Tu és Santo, Santo, Santo

[E]
Santo, Santo, Santo
[B]/[D#]
Santo, Santo, Santo
[A]             [F#m]
Santo, Santo, Santo
          [E]  
Quero Te ver

[E]
Santo, Santo, Santo
[B]/[D#]
Santo, Santo, Santo
[A]             [F#m]
Santo, Santo, Santo
          [E]  
Quero Te ver

          [E]
Quero Te ver
        [B]/[D#]
Quero Te ver
             [C#m7]
Eu quero Te tocar
                 [A]
Eu quero Te abraçar
          [F#m]  [B]
Quero te ver

          [E]
Quero Te ver
        [B]/[D#]
Quero Te ver
             [C#m7]
Eu quero Te tocar
                 [A]
Eu quero Te abraçar
          [F#m]  [B]
Quero te ver

[E]
Santo, Santo, Santo
[B]/[D#]
Santo, Santo, Santo
[A]             [F#m]
Santo, Santo, Santo
          [E]  
Quero Te ver

[E]
Santo, Santo, Santo
[B]/[D#]
Santo, Santo, Santo
[A]             [F#m]
Santo, Santo, Santo
          [E]  
Quero Te ver`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
                        {
                id: generateId(),
                titulo: 'Abraça-me',
                artista: 'André Valadão',
                tom: 'G',
                letra: `Intro: |4/4 G9 | G | C6(9) | C | Em7(9/13) | Em | D/F# | % |
   G
Ensina-me a sentir Teu coração
   C9
Jesus, quero ouvir Teu respirar
   Em7
Tirar Teu fôlego com minha fé
         D/F#  
E Te adorar

 G
Jesus, Tu és o pão que me alimenta
   C9
O verbo vivo que desceu do céu
    Em7
Vem aquecer meu frio coração
          D9  C/E  D/F#
Com Teu amor

     C9
Abraça-me,abraça-me
      D
Cura-me, Cura-me
      C9
Unge-me,unge-me
      D
Toca-me,toca-me

     G    G/B              Em7
Vem sobre mim com o Teu manto
 C9                    Am  D9
Reina em mim com Tua glória

     G                   Em7
Pois ao Teu lado é o meu lugar
  C9       Am   D9
Aleluia, aleluia `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
                        {
                id: generateId(),
                titulo: 'Acende Outra Vez',
                artista: 'Jefferson e Suellen',
                tom: 'E',
                letra: `Intro: ||:4/4  [C#m7]  [A] | [E]  [B] :|| 

[C#m7]           [A]        [E]  [B] 
     Ouço um barulho diferente
[C#m7]           [A]        [E]  [B] 
     É como um vento veemente
[C#m7]                 [A]            [E]  [B] 
     Eu vejo línguas como o que de fo_go
[C#m7]          [A]           [E] [B]   
     Pousando sobre o ambiente

[A]
  Nós estamos reunidos
[B] 
  A casa está preparada
[C#m7]
   Pode soprar o vento
[G#m]
   Reacender a brasa

[A]
  Nós estamos reunidos
[B] 
  A casa está preparada
[C#m7]
   Pode soprar o vento
[G#m]
   Reacender a brasa
   
[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim

[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim

Intro: | [C#m7]  [A] | [E]  [B] |

[C#m7]            [A]        [E]  [B] 
     Ouço um barulho diferente
[C#m7]            [A]        [E]  [B] 
     É como um vento veemente
[C#m7]                  [A]            [E]  [B] 
     Eu vejo línguas como o que de fo_go
[C#m7]           [A]          [E] [B]   
     Pousando sobre o ambiente

[A]
  Nós estamos reunidos
[B] 
  A casa está preparada
[C#m7]
   Pode soprar o vento
[G#m]
   Reacender a brasa

[A]
  Nós estamos reunidos
[B] 
  A casa está preparada
[C#m7]
   Pode soprar o vento
[B]
   Reacender a brasa

[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim
[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim

Interlúdio: | [A] | [B] | [G#m] | [C#m7] |

  [A]
Acende outra vez
     [B] 
Tua chama em nós
 [G#m]
Aviva outra vez
 [C#m7]
Aviva outra vez

  [A]
Acende outra vez
     [B] 
Tua chama em nós
 [G#m]
Aviva outra vez
 [C#m7]
Aviva outra vez

  [A]
Acende outra vez
     [B] 
Tua chama em nós
 [G#m]
Aviva outra vez
 [C#m7]
Aviva outra vez

  [A]       
A nossa geração
           [B] 
Tem lenha pra queimar
  [G#m]
E pode incendiar
  [C#m7]
E vem nos batizar

  [A]       
A nossa geração
           [B] 
Tem lenha pra queimar
  [G#m]
E pode incendiar
  [C#m7]
E vem nos batizar

  [A]       
A nossa geração
           [B] 
Tem lenha pra queimar
  [G#m]
E pode incendiar
  [C#m7]
E vem nos batizar

  [A]       
A nossa geração
           [B] 
Tem lenha pra queimar
  [G#m]
E pode incendiar
  [C#m7]
E vem nos batizar

[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim
[C#m7]  [A]        [E] 
Me  batiza com fogo
[C#m7] [A]       [E]         [B] 
Rea__cende a chama em mim

Interlúdio: | [A] | [B] | [G#m] | [C#m7] |`,
                favorite: true,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Aclame ao Senhor',
                artista: 'IECP Central',
                tom: 'A',
                letra: `
  A         F#m          D         E
Aclame ao Senhor toda a Terra e cantemos
   A       F#m        D         E
Poder, majestade e louvores ao Rei
   F#m       F#m/E       D
Montanhas se prostrem e rujam os mares
    E  D/F#   E/G#
Ao som de teu nome
  A       F#m       D             E
Alegre Te louvo por Teus grandes feitos
    A       F#m         D      E
Firmado estarei, sempre te amarei
F#m   F#m/E        D            E    A    D9 E 
Incomparáveis são as promessas do Senhor
                
A            E
 Meu Jesus, Salvador
F#m     E       D
Outro igual não há
         A/C#  D       A/E
Todos os dias quero louvar
   F#m        G  D/F#  E
As maravilhas de Teu amor

A        E
 Consolo, abrigo
F#m       E            D
Refúgio e Força é o Senhor
              A/C#
Com todo o meu ser
     D         A/E
Com tudo o que sou 
F#m         G   D/F#    E
Sempre te ado  - ra -  rei

  A         F#m          D         E
Aclame ao Senhor toda a Terra e cantemos
   A       F#m        D         E
Poder, majestade e louvores ao Rei
   F#m       F#m/E       D
Montanhas se prostrem e rujam os mares
    E  D/F#   E/G#
Ao som de teu nome
  A       F#m       D             E
Alegre Te louvo por Teus grandes feitos
    A       F#m         D      E
Firmado estarei, sempre te amarei
F#m   F#m/E        D            E    F#m E  D E
Incomparáveis são as promessas do Senhor

  A         F#m          D         E
Aclame ao Senhor toda a Terra e cantemos
   A       F#m        D         E
Poder, majestade e louvores ao Rei
   F#m       F#m/E       D
Montanhas se prostrem e rujam os mares
    E  D/F#   E/G#
Ao som de teu nome
  A       F#m       D             E
Alegre Te louvo por Teus grandes feitos
    A       F#m         D      E
Firmado estarei, sempre te amarei
F#m   F#m/E        D            E    F#m
Incomparáveis são as promessas do Senhor
      F#m/E        D            E    F#m
Incomparáveis são as promessas do Senhor
      F#m/E        D            E    A  | D9 E | A | D9 E | A ||
Incomparáveis são as promessas para mim`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
             {
                id: generateId(),
                titulo: 'Águas Purificadoras',
                artista: 'Diante do Trono',
                tom: 'D',
                letra: `Intro: |:4/4 [D] | [Em]/[D] :|

[D]                [Em]/[D]
Existe um rio, Senhor
 [D]                      [Em]/[D]
Que flui do Teu grande amor
[G]                   [D]/[F#]
Águas que correm do trono
[G]         [Em]         [A]      [G]/[B] [A]/[C#]
Águas que curam, que limpam

 [D]                [Em]/[D]
Por onde o rio passar
[Bm7]              [A4]  [A]  
Tudo vai transformar
      [G]             [D]/[F#]
Pois leva a vida do próprio Deus
        [G]    [Em7]   
E este rio está  
[A4]         [G]/[B]  [A]/[C#]
Neste lugar

 [D]                  [G]      [D]  [D]/[F#]
Quero beber do Teu rio, Senhor
   [G]        [D]/[F#]         [Em7]       [A]
Sacia minha sede, lava o meu interior
   [Bm7]                 [G]     [A]
Eu quero fluir em Tuas águas
   [Bm7]     [F#m7] Pausa  [G]
Eu quero beber da Tua fonte
               [A4]   [A]
Fonte de águas vivas
        [G]/[A]       [D]
Tu és a fonte, Senhor

Intro: |:4/4 [D] | [Em]/[D] :|

[D]                [Em]/[D]
Existe um rio, Senhor
 [D]                      [Em]/[D]
Que flui do Teu grande amor
[G]                   [D]/[F#]
Águas que correm do trono
[G]         [Em]         [A]      [G]/[B] [A]/[C#]
Águas que curam, que limpam

 [D]                [Em]/[D]
Por onde o rio passar
[Bm7]              [A4]  [A]  
Tudo vai transformar
      [G]             [D]/[F#]
Pois leva a vida do próprio Deus
        [G]    [Em7]   
E este rio está  
[A4]         [G]/[B]  [A]/[C#]
Neste lugar

 [D]                  [G]      [D]  [D]/[F#]
Quero beber do Teu rio, Senhor
   [G]        [D]/[F#]         [Em7]       [A]
Sacia minha sede, lava o meu interior
   [Bm7]                 [G]     [A]
Eu quero fluir em Tuas águas
   [Bm7]     [F#m7] Pausa  [G]
Eu quero beber da Tua fonte
               [A4]   [A]
Fonte de águas vivas
        [G]/[A]       [D]  | [Em]/[D]
Tu és a fonte, Senhor
                  [D]  | [Em]/[D]  
Tu és a fonte, Senhor
                  [D]  | [Em]/[D]
Tu és o rio, Senhor
                  [D]  | [Em]/[D]
Tu és a fonte, Senhor
                  [D]  | [Em]/[D]
Tu és o rio, Senhor
                  [D]  | [Em]/[D]
Tu és a fonte, Senhor
                  [D]  | [Em]/[D]
Tu és o rio, Senhor
                  [D]  | [Em]/[D]
Tu és a fonte, Senhor
                  [D]  | [Em]/[D]
Tu és o rio, Senhor
                 [D] 
Tu és o rio, Senhor`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Agnus Dei',
                artista: 'David Quilan',
                tom: 'C',
                letra: `Intro: |4/4 [C] | [F]/[C] [C] |[C] | [C] [F] [G] | [Am] [G] [F] | [C] | [C] |
                
[C] [F]/[C] [C]     [F]  [G] [Am]
Aleluia, alelu_uia!
    [G]           [F]         [C]
Poderoso é o Senhor nosso Deus

[C] [F]/[C] [C]     [F]  [G] [Am]
Aleluia, alelu_uia!
    [G]           [F]         [C]
Poderoso é o Senhor nosso Deus
[C]  [F]  [G] [Am]
alelu_uia!

[F]/[A] [G]/[B] [C]   [F]/[C]  [C]       [F]   [C]         [Am] [G]
Sa___an_to, santo é o Senhor Deus, poderoso
[Dm]    [Em]     [F]   [Dm]    [Em]     [F] 
Digno de louvor, digno de louvor

[F]/[G]  [G]  [C]  [F]/[C] [C]          [F]  [C]         [Am] [G]
Tu é santo, santo é o Senhor Deus, poderoso
[Dm]    [Em]     [F]   [Dm]    [Em]     [F] 
Digno de louvor, digno de louvor!
[F]/[G]   [C]
A___Amém!`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Ainda que a Figueira',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: |:4/4 F#m | A  E9 :|

F#m            E9
   Tu és a minha porção
Bm7          D
    Tu és a minha herança
F#m         E9
   Tu és o meu socorro
     Bm7            D
Nos dias de tribulação

A                 E9
  Mesmo que meus pais me deixem
Bm7             D
    Mesmo que amigos me traiam
A                      E9
  Eu sei que em Seus braços
      Bm7         D
Eu encontro salvação

 A                   
Ainda que a figueira 
 E9
Não floresça
 Bm7                
Ainda que a videira 
     D
Não dê o seu fruto
 A                     E9
Mesmo que não haja alimento 

Nos campos
        G           D
Eu me alegrarei em Ti

 A                   
Ainda que a figueira 
 E9
Não floresça
 Bm7                
Ainda que a videira 
     D
Não dê o seu fruto
 A                     E9
Mesmo que não haja alimento 

Nos campos
        G           D
Eu me alegrarei em Ti

Intro: |: F#m | A  E9 :|

F#m            E9
   Tu és a minha porção
Bm7          D
    Tu és a minha herança
F#m         E9
   Tu és o meu socorro
     Bm7            D
Nos dias de tribulação

A                 E9
  Mesmo que meus pais me deixem
Bm7             D
    Mesmo que amigos me traiam
A                      E9
  Eu sei que em Seus braços
      Bm7         D
Eu encontro salvação

 A                   
Ainda que a figueira 
 E9
Não floresça
 Bm7                
Ainda que a videira 
     D
Não dê o seu fruto
 A                     E9
Mesmo que não haja alimento 

Nos campos
        G           D
Eu me alegrarei em Ti

 A                   
Ainda que a figueira 
 E9
Não floresça
 Bm7                
Ainda que a videira 
     D
Não dê o seu fruto
 A                     E9
Mesmo que não haja alimento 

Nos campos
        G           D
Eu me alegrarei em Ti`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Algo Novo',
                artista: 'Lukas Agustinho',
                tom: 'C',
                letra: `Intro: |4/4 o] Am7  F  C  G
        Am7  F  C  G

[Primeira Parte]

   C
Vem me visitar hoje aqui

Quero conhecer mais de ti
         Am7            F9
Espírito, vem, Espírito, vem
          C9
Espírito Santo
        Am7            F9
Espírito, vem, Espírito, vem
          C9
Espírito Santo

        Am7            F9
Espírito, vem, Espírito, vem
          C9
Espírito Santo
        Am7            F9
Espírito, vem, Espírito, vem
          C9   G4
Espírito Santo

[Refrão]

Am7             F9       C9
    Eu quero viver algo novo
Am7              F9           C9
    Faz meu coração arder de novo
           Am7          F9
Fazendo todo medo desaparecer
                C9
Trazendo sobre mim um novo amanhecer
Am7             F9       C9
    Eu quero viver algo novo

Am7             F9       C9
    Eu quero viver algo novo
Am7              F9           C9
    Faz meu coração arder de novo
           Am7          F9
Fazendo todo medo desaparecer
                C9
Trazendo sobre mim um novo amanhecer

[Segunda Parte]

( Am7  F9  C9  G4 )

Am7             F9        C9
    Vem me visitar hoje aqui
Am7             F9          C9
    Quero conhecer mais de ti
        Am7            F9
Espírito, vem, Espírito, vem
          C9
Espírito Santo
        Am7            F9
Espírito, vem, Espírito, vem
          C9
Espírito Santo

( Am7  F9  C9)

[Refrão]

Am7             F9       C9
    Eu quero viver algo novo
Am7              F9           C9
    Faz meu coração arder de novo
           Am7          F9
Fazendo todo medo desaparecer
                C9
Trazendo sobre mim um novo amanhecer

Am7             F9       C9
    Eu quero viver algo novo
Am7              F9           C9
    Faz meu coração arder de novo
          Am7          F9
Fazendo todo medo desaparecer
                C9
Trazendo sobre mim um novo amanhecer
Am7                       F
Oh,oh,oh,oh,oh,oh,oh,oh,oh,oh,oh,oh,oh,oh

Am7
    Santo Espírito, desce como fogo
G4
   Santo Espírito, desce como fogo
F9
   Incendeia, incendeia

Am7
    Santo Espírito, desce como fogo
G4
   Santo Espírito, desce como fogo
F9
   Incendeia, incendeia

Am7
    Santo Espírito, desce como fogo
G4
   Santo Espírito, desce como fogo
F9
   Incendeia, incendeia

Am7
    Santo Espírito, desce como fogo
G4
   Santo Espírito, desce como fogo
F9
   Incendeia, incendeia

[Refrão]

Am7             F       C  G
    Eu quero viver algo novo
Am7              F          C
    Faz meu coração arder de novo
   G         Am         F
Fazendo todo medo desaparecer
                C                 G
Trazendo sobre mim um novo amanhecer
Am7             F9       C9
    Eu quero viver algo novo`,
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
                letra: `Intro: |4/4  Bb | % | F | % | Gm | % | Dm | C/E |

 Bb9              F                Gm4            Dm7
Leva-me bem mais perto, em Tua presença, em Tua glória
 Bb9               F             Gm4           Dm7 C/E
Chama-me mais profundo, além do véu, em Tua glória

 Bb9              F               Gm4          Dm7
Espirito desça agora, eu me aproximo de Tua glória
 Bb9                F                  Gm4       Dm7 C/E
Cobre-me com Tua graça, sou filho que ama,Tua glória

 F                 C            Gm               
Anseio por mais de Ti,  com meu respirar, com meu 
Bb
caminhar
 F                    C        Gm                      
Eu queimo de amor por Ti,  com desejo santo, queima um 
Bb
fogo santo

Intro: |4/4  Bb | % | F | % | Gm | % | Dm | C/E |

 Bb9              F              Gm4           Dm7
Espirito desça agora, eu me aproximo de Tua glória
 Bb9               F                   Gm4        Dm7
Cobre-me com Tua graça, sou filho que ama, Tua glória

 F                 C           Gm                 
Anseio por mais de Ti,  com meu respirar, com meu 
Bb
caminhar
   F                  C  C4    C   Gm                  
Eu queimo de amor por Ti,      com desejo santo, queima
    Bb
 um fogo santo

Interlúdio: |4/4  F | % | C | % | Gm | % | Bb | % |

   F                C      Gm              Bb
Tua glória venha, o céu na terra, o céu na terra
   F                C      Gm              Bb
Tua glória venha, o céu na terra, o céu na terra
   F                C      Gm              Bb
Tua glória venha, o céu na terra, o céu na terra
   F                C      Gm              Bb
Tua glória venha, o céu na terra, o céu na terra

 F                 C             Gm               
Anseio por mais de Ti,  com meu respirar, com meu 
Bb
caminhar
   F                  C         Gm                     
Eu queimo de amor por Ti,  com desejo santo, queima um 
Bb
fogo santo

Interlúdio: |4/4  F | % | C | % | Gm | % | Bb | % |`,
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
                titulo: 'Arde Outra Vez',
                artista: 'Thalles Roberto',
                tom: 'F',
                letra: `Intro: |:4/4 Dm7(9) | % | Am7(9) | % :| 

Dm7
Eu não quero mais viver

Longe da tua presença,
        Am7(9)
Meu Senhor hoje quero voltar

Voltar ao início de tudo
     Dm7
De quando eu era feliz

Sentia a Tua presença
      Am7(9)
Caminhava ali, no seu jardim

Te encontrava todo dia
           Dm7
Mas me perdi, Senhor, no caminhar
Tentei andar sozinho na aventura
       Am7(9)
Dessa vida foi só ilusão
Confesso que andei perdido, sim
               Dm7(9)
Mas, hoje, eu Te devolvo um coração
Arrependido de tudo o que fez
          Am7(9)
Quero voltar, Senhor
Para os Teus rios
Voltar, Senhor, para os Teus rios

    F7M(9)    Em7(13-)  Dm7(11)
Me molha, me lava, me ensina
             F7M(9)   Em7(13-)
Me inspira e arde outra vez
        Dm7(11)
No meu coração

    F7M(9)    Em7(13-)  Dm7(11)
Me molha, me lava, me ensina
             F7M(9)   Em7(13-)
Me inspira e arde outra vez
        Am7(9)
No meu coração

            Dm7
De braços abertos, quero Te receber
             Am7(9)
Filho, Eu estava esperando você
                               Dm7
Pra mim você é tudo que Eu sonhei um dia
        Am7(9)
Eu te amo

Intro: | Dm7(9) | % | Am7(9) | % | 

Dm7
Eu não quero mais viver
Longe da tua presença,
        Am7(9)
Meu Senhor hoje quero voltar
Voltar ao início de tudo
     Dm7
De quando eu era feliz
Sentia a Tua presença
      Am7(9)
Caminhava ali, no seu jardim
Te encontrava todo dia
           Dm7
Mas me perdi, Senhor, no caminhar
Tentei andar sozinho na aventura
       Am7(9)
Dessa vida foi só ilusão
Confesso que andei perdido, sim
               Dm7(9)
Mas, hoje, eu Te devolvo um coração
Arrependido de tudo o que fez
          Am7(9)
Quero voltar, Senhor
Para os Teus rios
Voltar, Senhor, para os Teus rios

    F7M(9)   Em7(13-)   Dm7(11)
Me lava, me molha, me ensina
             F7M(9)      Em7(13-)
Me inspira e arde outra vez
        Dm7(11)
No meu coração

    F7M(9)    Em7(13-)  Dm7(11)
Me molha, me lava, me ensina
             F7M(9)      Em7(13-)
Me inspira e arde outra vez
     Dm7(11)
Com fogo, com fogo!

    F7M(9)    Em7(13-)
Me molha, me lava
         Dm7(11)
A glória          da segunda casa Deus

         F7M(9)  Em7(13-)     Dm7(11)
A glória                   me molha

 F7M(9)  Em7(13-)  Dm7(11)
Deus,              Deus

  F7M(9)  Em7(13-)      Dm7(11)
E arde outra vez no meu coração
  F7M(9)  Em7(13-)      Dm7(11)
E arde outra vez no meu coração
  F7M(9)  Em7(13-)      Dm7(11)
E arde outra vez no meu coração
  F7M(9)  Em7(13-)      Am7(9)
E arde outra vez no meu coração`,
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
                letra: `Intro: |4/4 ] F  F/A  A#
        
        F                          A#
Basta uma palavra do meu Deus
 Dm                   C
Para um milagre acontecer
    F                            A#
O tempo e a distância não vão resistir
 Dm                      C
Se Ele falou, Ele vai cumprir ! 2x

A#                               C
Ele falou ao mar e o mar se acalmou
A#                                Dm
"Haja luz !” – E a luz passou a existir!
A#                                     C
"Levanta e anda” – E o paralítico andou !
   Gm             A#              C
E tem falado que o melhor está por vir

F                          A#
Basta uma palavra do meu Deus
 Dm                   C
Para um milagre acontecer
    F                            A#
O tempo e a distância não vão resistir
 Dm                      C
Se Ele falou, Ele vai cumprir ! 2x

A#                                 C
Chamou pelo nome e o morto ressurgiu
   A#                             Dm
"Lançai a rede” e a pesca superabundou
      A#                          C
O que Ele prometeu prá mim e prá você
Gm             A#               C
Pode acreditar que vai acontecer !

F                          A#
Basta uma palavra do meu Deus
 Dm                   C
Para um milagre acontecer
    F                            A#
O tempo e a distância não vão resistir
 Dm                      C
Se Ele falou, Ele vai cumprir !

F                        A#
Basta uma palavra do meu Deus 3x
Dm                    C
Para um milagre acontecer
F                        A#
Basta uma palavra do meu Deus 3x
Dm                    C
Para um milagre acontecer
F                        A#
Basta uma palavra do meu Deus 3x
Dm                       C
Se Ele falou, Ele vai cumprir`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Bem-Aventurado',
                artista: 'Aline Barros',
                tom: 'F',
                letra: `Intro: |:4/4 C/Bb  Bb | C/Bb  Bb | C/F  F | C/F  F :| 

         C/Bb            Bb9  C/Bb Bb
Bem aventurado é o que está
Bb             C/F F  C/F
Firmado em tua ca__sa
F              C/Bb Bb  Gm7
Aqueles que te lou__vam
          C4          C     F
Cujo coração está no nosso Deus

Interlúdio: | F | C | Dm7 | A# | F/A | C | Dm7 | A# |

         C/Bb            Bb9  C/Bb Bb
Bem aventurado é o que está
Bb             C/F F  C/F
Firmado em tua ca__sa
F              C/Bb Bb  Gm7
Aqueles que te lou__vam
          C4          C     F
Cujo coração está no nosso Deus

          C/A#        A# C/A#
Bem aventurado é quem tem
A#           C/F     F   C/F
A sede da Justiça de Deus
F               C/A#      A# Gm7
Aqueles que são filhos da luz
            C            F
Cuja força vem do nosso Deus

                 A#          C
Que o teu reino venha sobre nós
             A#/D          C/E
Queremos tua glória sobre nós

F         C          Dm        A#
Ouve, oh Deus, nossa oração, Altíssimo
F/A              C
    Sara essa nação
        Dm            A#
É o clamor da igreja que te adora

Intro: | C/Bb  Bb | C/Bb  Bb | C/F  F | C/F  F :| 

          C/A#        A# C/A#
Bem aventurado é quem tem
A#           C/F     F   C/F
A sede da Justiça de Deus
F               C/A#      A# Gm7
Aqueles que são filhos da luz
            C            F
Cuja força vem do nosso Deus

                A#           C
Que o teu reino venha sobre nós
             A#/D          C/E
Queremos tua glória sobre nós

F         C          Dm        A#
Ouve, oh Deus, nossa oração, Altíssimo
F/A              C
    Sara essa nação
        Dm            A#      C
É o clamor da igreja que te adora
F         C           Dm          A#
Ouve, oh Deus, nossa o__ração, Altíssimo
F/A              C
    Sara essa nação
        Dm            A#
É o clamor da igreja que te adora

F              C/E
 Só tu és Santo,  só tu és Santo
Dm7                    A#
   Só tu és Santo, Senhor
F              C/E
 Só tu és Santo,  só tu és Santo
Dm7                    A#
   Só tu és Santo, Senhor
F              C/E
 Só tu és Santo,  só tu és Santo
Dm7                    A#
   Só tu és Santo, Senhor
F              C/E
 Só tu és Santo,  só tu és Santo
Dm7                    A#
   Só tu és Santo, Senhor

F         C          Dm        A#
Ouve, oh Deus, nossa oração, Altíssimo
F/A              C
    Sara essa nação
        Dm7           A#      C
É o clamor da igreja que te adora

F         C          Dm        A#
Ouve, oh Deus, nossa oração, Altíssimo
F/A              C
    Sara essa nação
        Dm            A#2
É o clamor da igreja que te adora`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Bondade de Deus',
                artista: 'Marsena',
                tom: 'G',
                letra: `Intro: ||:4/4 [G]  [C] [G] [C] | [G] :|| 
                
         [G9]
Te amo, Deus
      [C]          [G9]   
Tua graça nunca falha
  [D]/[F#] [G]/[B]  [Em]
Todos   os dias
      [C]           [D]
Eu estou em tuas mãos
                  [G]  [C]
Desde quando me levanto
       [G]    [D]/[F#]  [Em]
Até eu me deitar
        [C]  [G]/[B]  [A7]  [D7(4)]       [G]
Eu cantarei    da bondade    de Deus

[C9]                 [G]
  És fiel em todo tempo
[C9]                     [G]   [Em]    [D]
  Em todo tempo tu és tão, tão  bom
[C9]                    [G]  [B7]  [Em]
  Com todo fôlego que tenho
         [C] [G]/[B]      [A7] [D]      [G]
Eu cantarei   da bondade   de Deus

          [G9]
Tua doce voz
        [C]               [G9]
Que me guia em meio ao fogo
   [D]/[F#]      [Em]
Na escu-ri-dão
       [C]           [D]
Tua presença me conforta
               [Em]  [C]
Sei que és meu Pai
       [G]  [D]/[F#]  [Em]
Que amigo és
           [C] [G]/[B]  [A7] [D]     [G]
E eu vivo na   bondade de Deus

[C9]                 [G]
  És fiel em todo tempo
[C9]                     [G]   [Em]    [D]
  Em todo tempo tu és tão, tão  bom
[C9]                    [G]  [B7]  [Em]
  Com todo fôlego que tenho
         [C] [G]/[B]      [A7] [D]      [G]
Eu cantarei   da bondade   de Deus

[C9]                 [G]
  És fiel em todo tempo
[C9]                     [G]   [Em]    [D]
  Em todo tempo tu és tão, tão  bom
[C9]                    [G]  [B7]  [Em]
  Com todo fôlego que tenho
         [C] [G]/[B]      [A7] [D]      [G]
Eu cantarei   da bondade   de Deus


[G]/[B]                [C]
   Tua bondade me seguirá
    [D]        [G]
Me seguirá, Senhor
[G]/[B]                [C]
   Tua bondade me seguirá
    [D]        [G]
Me seguirá, Senhor
       [G]/[B]              [C]
Eu me rendo a Ti, te dou o meu ser
  [F#°]    [B7]     [Em]
Entrego  tudo a ti
[G]/[B]                [C]
   Tua bondade me seguirá
    [D]          [G]
Me seguirá, Senhor
[G]/[B]                [C]
   Tua bondade me seguirá
    [D]          [G]
Me seguirá, Senhor
[G]/[B]                [C]
   Tua bondade me seguirá
    [D]          [G]
Me seguirá, Senhor
      [G]/[B]                [C]   
Eu me rendo a Ti, te dou o meu ser
  [D]/[F#]     [B7]      [Em]
Entrego  tudo a Ti
[G]/[B]         [C]
   Tua bondade me seguirá
   [D]         | [G]  [C] [G] [C] | [G] |
Me seguirá, Senhor

[C9]                 [G]
  És fiel em todo tempo
[C9]                     [G]   [Em]    [D]
  Em todo tempo tu és tão, tão  bom
[C9]                    [G]  [B7]  [Em]
  Com todo fôlego que tenho
         [C] [G]/[B]      [A7] [D]    | [G]  [C] [G] [C] | [G] |
Eu cantarei   da bondade   de Deus`,
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
                letra: `Intro: |:4/4 [C#m7]  [A9] | [E] :|

        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro
        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro

        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro
        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro

 [A9]
Quem é como o Senhor?
 [B9]            [G#m]
Quem é como o Senhor?

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre

Intro: |: [C#m7]  [A9] | [E] :|

        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro
        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro

        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro
        [C#m7]
Vamos cantar
        [A9]        [E]
Uma canção ao cordeiro

 [A9]
Quem é como o Senhor?
 [B9]            [G#m]
Quem é como o Senhor?

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre

Interlúdio: | [A9] | % | [E] | [B9] |

[A9]
Honra, glória, força e poder
 [E]              [B9]
Honra, glória, força e poder
[A9]
Honra, glória, força e poder
 [E]              [B9]
Honra, glória, força e poder

[F#m]
Honra, glória, força e poder
 [C#m]            [B9]
Honra, glória, força e poder
 [F#m]
Honra, glória, força e poder
 [C#m]            [B9]
Honra, glória, força e poder

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre

 [A9]       [B] [C#m]  [B9]
Santo, és incomparável
    [A]  [G#m]   [A9]
Não há outro como Tu
    [B]  [C#m]     [B9]
Reinas sobre a terra e céu
     [G#m]
Pra sempre`,
                favorite: true,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Canção do Apocalipse',
                artista: 'Diante do Trono',
                tom: 'G',
                letra: `Intro: |4/4 [D] | [Am7] | [C9] | [G] |

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
                letra: `Intro: |4/4 [D4] [D] | [D] | [D4] [D] | [G] | [D4] [D] | [D] [D]/[F#| [G] | [A] |

        [D]
És meu tudo
        [D9]
És meu Senhor
         [D]                [A9]
És meu amigo, meu intercessor
           [D]
Meu braço forte
           [D9]
Meu conselheiro
       [D]                   [A9]
Maravilhoso, meu grande eu sou
           [Em7]      [A9]
Eu não sou nada sem Ti
       [Em7]      [A9]
Eu não vivo sem Ti
           [Em7]      [A9]
Sem Tua presença eu morro
           [Em7] [G]    [A9]
Sem Tua presença eu morro

        [D]
És meu tudo
        [D9]
És meu Senhor
         [D]                [A9]
És meu amigo, meu intercessor
           [D]
Meu braço forte
           [D9]
Meu conselheiro
       [D]                   [A9]
Maravilhoso, meu grande eu sou
           [Em7]      [A9]
Eu não sou nada sem Ti
       [Em7]      [A9]
Eu não vivo sem Ti
           [Em7]      [A9]
Sem Tua presença eu morro
           [Em7] [G]    [A9]
Sem Tua presença eu morro

           [G]               [D]/[F#]
Como eu Te amo, como eu Te quero
          [Em7]              [A9]
Sim eu me prostro aos Teus pés
        [G]             [D]/[F#]
A minha vida eu Te consagro
           [Em7]     [G]          [A9]
Tudo o que Tenho é totalmente Teu

           [G]               [D]/[F#]
Como eu Te amo, como eu Te quero
          [Em7]              [A9]
Sim eu me prostro aos Teus pés
        [G]             [D]/[F#]
A minha vida eu Te consagro
           [Em7]                [A9]
Tudo o que Tenho é totalmente Teu
           [Em7]              [A9]
Tudo o que sou é totalmente Teu`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            
            {
                id: generateId(),
                titulo: 'Consagração',
                artista: 'Aline Barros',
                tom: 'A',
                letra: `Intro: ||:4/4 [A] [D]/[A] :||

    [A]             [E]/[G#]  [Em]/[G]        [D]/[F#]
Ao rei dos reis consagro tudo o que sou
   [Dm]/[F]                 [A]/[E]
De gratos louvores transborda
       [E]      
O meu coração
   [A]        [E]/[G#]       [Em]/[G]
A minha vida eu entrego nas Tuas mãos
      [D]/[F#]
Meu Senhor
[Dm]/[F]       [A]/[E]           [E]       [D]/[F#]  [E]/[G#] 
Pra Te exaltar com todo meu amor
[A]          [E]/[G#]          [Em]/[G]   [D]/[F#]
Eu Te louvarei conforme a Tua justiça
 [Dm]/[F]         [A]/[E]            [B7]          
E cantarei louvores, pois Tu és 
                  [E]   
Pois Tu és Altíssimo

[C#m]     [D]    [E]              
Celebrarei a Ti, ó Deus 
    [F#m]       [E]/[F#]  [F#m] 
Com meu viver
      [D]          [E]          [A]      [G]/[B] 
Cantarei e contarei as Tuas obras
[A]/[C#]      [D]        [E]/[D]
Pois por Tuas mãos foram criados
[C#7]          [F#m]    [E]    [D]  
Terra, Céu e mar e todo ser 
 [E]        [F#]
Que neles há

     [Bm]              [E]  
Toda Terra celebra a Ti
    [C#m]         [F#m] [E] 
Com cânticos de júbilo
         [D]     [E]        [F#] 
Pois  Tu és o Deus criador
     [Bm]              [E]  
Toda Terra celebra a Ti
    [C#m]         [F#m] [E] 
Com cânticos de júbilo
         [D]     [E]     | [F#m]  [E] | [D] [E] |
Pois  Tu és o Deus criador

[C#m]     [D]    [E]              
Celebrarei a Ti, ó Deus 
    [F#m]       [E]/[F#]  [F#m] 
Com meu viver
      [D]          [E]          [A]      [G]/[B] 
Cantarei e contarei as Tuas obras
[A]/[C#]      [D]        [E]/[D]
Pois por Tuas mãos foram criados
[C#7]          [F#m]    [E]    [D]  
Terra, Céu e mar e todo ser 
 [E]        [F#]
Que neles há

     [Bm]              [E]  
Toda Terra celebra a Ti
    [C#m]         [F#m] [E] 
Com cânticos de júbilo
         [D]     [E]        [F#] 
Pois  Tu és o Deus criador
     [Bm]              [E]  
Toda Terra celebra a Ti
    [C#m]         [F#m] [E] 
Com cânticos de júbilo
         [D]     [E]       [F#m]  [E]
Pois  Tu és o Deus criador
         [D]     [E]       [F#m]  [E]
Pois  Tu és o Deus criador
         [D]     [E]     | [F#m]  [E] | [D] [E]/[D] [D] [E]/[D] [D7+] |
Pois  Tu és o Deus criador

   [A]       [E]/[G#]      [F#m]    [C#m]               
A honra, a glória, a força e o poder 
          [D]  [A]/[C#]
Ao rei Jesus
        [Bm]  [A]     [G]   [D]/[F#]    [E]
E o louvor,   ao rei,      Jesus

   [A]       [E]/[G#]      [F#m]    [C#m]               
A honra, a glória, a força e o poder 
          [D]  [A]/[C#]
Ao rei Jesus
        [Bm]  [A]     [G]   [D]/[F#]    [E]
E o louvor,   ao rei,      Jesus

   [A]       [E]/[G#]      [F#m]    [C#m]               
A honra, a glória, a força e o poder 
          [D]  [A]/[C#]
Ao rei Jesus
        [Bm]  [A]     [G]   [D]/[F#]    [E]
E o louvor,   ao rei,      Jesus

   [A]       [E]/[G#]      [F#m]    [C#m]               
A honra, a glória, a força e o poder 
          [D]  [A]/[C#]
Ao rei Jesus
        [Bm]  [A]     [G]   [D]/[F#]    [E]
E o louvor,   ao rei,      Jesus`,
                favorite: true,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Contar meus Segredos',
                artista: 'Aline Barros',
                tom: 'G',
                letra: `Intro: ||:4/4 [G] [G7+] [G6] [G7+] :||
                
[G]
  Senhor
Ás vezes sinto
em mim uma vontade
de entrar no quarto
E trancar a porta
                 [C]
E assim falar contigo
              [G] [G7+] [G6] [G7+] 
Contar meus segredos
[G]
 Te confessar os meus pecados
E fraquezas Me quebrantar e ser
achado como alguém
          [C]
Segundo o Teu querer
           [G]
Segundo o Teu coração

[C]
 Tudo que eu quero
é poder Te adorar
[Em]
  Ficar a sós contigo
 [D]/[F#]
E em Teus braços
          [C]
 me encontrar

                [G]  [D]/[F#]
Só quero Te adorar
               [Em]  [C]
Só quero Te adorar
               [G]  [D]/[F#]
Preciso Te adorar
              [Am] [G]/[B] [C]
Permita-me Te a__dorar

[G]
Em Ti eu quero
me perder em adoração
Vem consumir meu coração
                 [C]
Com as chamas do Teu olhar
          [G]
Te amo demais

[C]
 Tudo que eu quero
é poder Te adorar
[Em]
  Ficar a sós contigo
 [D]/[F#]
E em Teus braços
          [C]
 me encontrar

                [G]  [D]/[F#]
Só quero Te adorar
               [Em]  [C]
Só quero Te adorar
               [G]  [D]/[F#]
Preciso Te adorar
              [Am] [G]/[B] [C]
Permita-me Te a__dorar

                [G]  [D]/[F#]
Só quero Te adorar
               [Em]  [C]
Só quero Te adorar
               [G]  [D]/[F#]
Preciso Te adorar
              [Am] [G]/[B] [C]
Permita-me Te a__dorar
              [Am] [G]/[B] [C]
Permita-me Te a__dorar
              [Am] [G]/[B] [C]
Permita-me Te a__dorar
Final: ||: [G] [G7+] [G6] [G7+] :||`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Coração Igual ao Teu',
                artista: 'Diante do Trono',
                tom: 'F',
                letra: `Intro: |4/4 [Bb9]  [F]/[A] | [Dm7]  [Am7] [Bb] | [Dm7]  [C]/[E]  | [F] [F]/[A] |

        [Bb]                         [F]/[A]
Se tu olhares senhor pra dentro de mim
       [Gm7]          [C]  
Nada encontrará de bom
    [Bb]           [C]/[Bb]
Mas um desejo eu tenho
    [F]  [C]/[E]     [Dm7]
De ser transformado
   [Gm7]           [F]/[A]
Preciso tanto do Teu perdão
[Bb]             [C]
Dá-me um novo coração

[F]                  [F]/[A]    [Bb9]      [Gm7]  [C]
Dá-me um coração igual ao teu, meu mes_tre
 [F]           [Eb]/[G]  [F]/[A]    [Bb]
Dá-me um coração igual ao teu
     [C]     [C]/[Bb]     [Am7]  [Dm7]
Coração disposto a obede_cer
    [Am7]               [Dm7]
Cumprir todo o teu querer
[Gm7]           [C]         | [Bb9]  [F]/[A] | [Dm7]  [Am7] [Bb] | [Dm7]  [C]/[E]  | [F] [F]/[A] |
Dá-me um coração igual ao Teu

        [Bb]                         [F]/[A]
Se tu olhares senhor pra dentro de mim
       [Gm7]          [C]  
Nada encontrará de bom
    [Bb]           [C]/[Bb]
Mas um desejo eu tenho
    [F]  [C]/[E]     [Dm7]
De ser transformado
   [Gm7]           [F]/[A]
Preciso tanto do Teu perdão
[Bb]             [C]
Dá-me um novo coração

[F]                  [F]/[A]    [Bb9]      [Gm7]  [C]
Dá-me um coração igual ao teu, meu mes_tre
 [F]           [Eb]/[G]  [F]/[A]    [Bb]
Dá-me um coração igual ao teu
     [C]     [C]/[Bb]     [Am7]  [Dm7]
Coração disposto a obede_cer
    [Am7]               [Dm7]
Cumprir todo o teu querer
[Gm7]           [C]           [F]
Dá-me um coração igual ao Teu

  [C]/[E]                    [Dm7]
Ensina-me a amar o meu irmão
    [C]
A olhar com teus olhos
     [F]                 [F]/[A]
Perdoar com teu perdão
[Bb]          [C]/[Bb]
Enche-me com Teu espírito
[Am7]          [Dm7]
Endireita os meus caminhos
[C]  [Bb]
Oh Deus, dai-me
   [C]     [F]      
Um novo coração


[Bb]          [C]/[Bb]
Enche-me com Teu espírito
[Am7]          [Dm7]
Endireita os meus caminhos
[C]  [Bb]
Oh Deus, dai-me
   [C]     [F] [Bb]/[C]     
Um novo coração

[F]                  [F]/[A]    [Bb9]      [Gm7]  [C]
Dá-me um coração igual ao teu, meu mes_tre
 [F]           [Eb]/[G]  [F]/[A]    [Bb]
Dá-me um coração igual ao teu
     [C]     [C]/[Bb]     [Am7]  [Dm7]
Coração disposto a obede_cer
    [Am7]               [Dm7]
Cumprir todo o teu querer
[Gm7]           [C]           [F]
Dá-me um coração igual ao Teu
     [C]     [C]/[Bb]     [Am7]  [Dm7]
Coração disposto a obede_cer
    [Am7]               [Dm7]
Cumprir todo o teu querer
[Gm7]           [C]           [F]
Dá-me um coração igual ao Teu`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Cordeiro Santo',
                artista: 'Filhos do Homem',
                tom: 'G',
                letra: `Intro: |4/4 G | % | C | % | Em | D | C | % |
                   G        C9
A Tua cruz, o Teu fardo
 Em    D   C
Meu pecado apagou
   G         C9
E hoje tudo novo se fez
      Em
Santidade
     D          C
É a minha adoração
    G               C9
Cordeiro santo, cordeiro de Deus
  Em   D      C
Amado da minh'alma
    G               C9
Cordeiro santo, cordeiro de Deus
  Em   D    C
Amado salvador

    G               C9
Cordeiro santo, cordeiro de Deus
  Em   D      C
Amado da minh'alma
    G               C9
Cordeiro santo, cordeiro de Deus
  Em   D    C
Amado salvador`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Corpo e Família',
                artista: 'Eli Soares',
                tom: 'F',
                letra: `Intro: ||:4/4 [F]  [Bb] | [C] :||
    F
Recebi um novo coração do Pai
    Dm7        Am7
Coração regenerado
    Bb          F/A
Coração transformado
     Eb                        C
Coração que é inspirado por Jesus

     F
Como fruto desse novo coração
     Dm7             Am7
Eu declaro a paz de Cristo
         Bb        F/A
Te abençoo, meu irmão
    Eb                   C
Preciosa é a nossa comunhão

      F                        F7M
Somos corpo, e, assim, bem ajustados
             Bb      Gm       Eb
Totalmente ligados, unidos, vivendo em
  Eb         C
Vivendo em amor

      F                         F7M
Uma família, sem qualquer falsidade
             Bb          Gm
Vivendo a verdade, expressando
   Eb           C
A Glória do Senhor

     F                      F7M
Uma família, vivendo o compromisso
                  Bb
Do grande amor de Cristo
      F/A     Gm     C      F
Eu preciso de ti, querido irmão
     Dm7          Bb     C          Bb
Precioso és para mim, querido irmão

    F
Recebi um novo coração do Pai
    Dm7        Am7
Coração regenerado
    Bb          F/A
Coração transformado
     Eb                        C
Coração que é inspirado por Jesus

     F
Como fruto desse novo coração
     Dm7            Am7
Eu declaro a paz de Cristo
         Bb        F/A
Te abençoo, meu irmão
    Eb                   C
Preciosa é a nossa comunhão

      F                        F7M
Somos corpo, e, assim, bem ajustados
             Bb      Gm       Eb
Totalmente ligados, unidos, vivendo em
  Eb         C
Vivendo em amor

      F                         F7M
Uma família, sem qualquer falsidade
             Bb          Gm
Vivendo a verdade, expressando
   Eb           C
A Glória do Senhor
     F                      F7M
Uma família, vivendo o compromisso
                  Bb
Do grande amor de Cristo
      F/A     Gm     C      F
Eu preciso de ti, querido irmão

     Dm7          Bb     C       F
Precioso és para mim, querido irmão
      Dm7     Bb     C       F
Eu preciso de ti, querido irmão
     Dm7         Bb      C       Bb
Precioso és para mim, querido irmão`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Correr para Deus',
                artista: 'Aline Barros',
                tom: 'E',
                letra: `Intro: |4/4 C#m | C#m | E | B | C#m

 C#m            A B    C#m        A
Descerá sobre mim, a unção do Senhor
          E       B/D#   C#m       F#m
Sinto em mim fogo consumidor, já arder
      C#m          A B        C#m          A
Vou pedir, vou buscar, vou sonhar, conquistar
     E        B/D#       C#m           B
Derramar minha vida no altar, e Te adorar

       E                        A        G#m
Vou correr, para Deus, como um rio corre para o mar
   F#m        B
Eu corro para Ti
       E                      A            G#m
Vou viver, só pra Deus, regressar ao meu lugar
         F#m           B
E ao primeiro amor voltar (2x)

C#m  E  B

C#m            E                B
Descerá sobre ti, descerá sobre ti, descerá sobre ti
C#m            E                B
Descerá sobre ti, descerá sobre ti, descerá sobre ti
C#m            E                B
Descerá sobre ti, descerá sobre ti, descerá sobre ti
C#m            E                B
Descerá sobre ti, descerá sobre ti, descerá sobre ti

       E                        A        G#m
Vou correr, para Deus, como um rio corre para o mar
   F#m        B
Eu corro para Ti
       E                      A            G#m
Vou viver, só pra Deus, regressar ao meu lugar
         F#m           B
E ao primeiro amor voltar`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Creio em Ti',
                artista: 'Gabriela Rocha',
                tom: 'F',
                letra: `Intro: ||:4/4 Dm  C |  A# :| 

     Dm     C             A# 
Teu sangue faz o surdo ouvir agora
     Dm      C          A# 
Teu sangue quebra maldição agora
     Dm     C         A# 
Teu sangue cura toda dor agora
     Dm     C           A#         
Teu sangue liberta o cativo agora

  Gm         A# 
E eu creio que
         F            C/E 
Tu és o mesmo ontem, hoje e para sempre
  Gm         A# 
E eu creio que
                    F         C/E 
Teu sangue é o que basta pra mim

     Dm     C           A# 
Teu sangue sara os corações agora
     Dm        C          A# 
Teu sangue me leva a perdoar agora
     Dm          C             A# 
Teu sangue transforma a minha mente agora
     Dm          C        A#          
Teu sangue faz o morto reviver agora

  Gm         A# 
E eu creio que
         F            C/E 
Tu és o mesmo ontem, hoje e para sempre
  Gm         A# 
E eu creio que
                    F         C/E 
Teu sangue é o que basta pra mim

  Gm         A# 
E eu creio que
         F            C/E 
Tu és o mesmo ontem, hoje e para sempre
  Gm         A# 
E eu creio que
                    F         C/E 
Teu sangue é o que basta pra mim

        A#         C 
Não há nada que resista ao Teu poder
       A#                     C 
Nem pecado, nem o mal, livre sou

        A#         C 
Não há nada que resista ao Teu poder
      A#/D                   C/E 
Nem pecado, nem o mal, livre sou

        A#         C 
Não há nada que resista ao Teu poder
       A#                     C 
Nem pecado, nem o mal, livre sou

        A#         C 
Não há nada que resista ao Teu poder
      A#/D                   C/E 
Nem pecado, nem o mal, livre sou

  A#         C 
Não há nada que resista ao Teu poder
       A#                     C 
Nem pecado, nem o mal, livre sou

  Gm         A# 
E eu creio que
         F            C/E 
Tu és o mesmo ontem, hoje e para sempre
  Gm         A# 
E eu creio que
                    F         C/E 
Teu sangue é o que basta pra mim

  Gm         A# 
E eu creio que
         F            C/E 
Tu és o mesmo ontem, hoje e para sempre
  Gm         A# 
E eu creio que
                    F         C/E 
Teu sangue é o que basta pra mim`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Creio que Tu és a Cura',
                artista: 'Gabriela Rocha',
                tom: 'E',
                letra: `Intro: ||:4/4 E | E A9 | C#m7 | C#m A9 :||

      E
Me escutas quando clamo
    A9      B4     E
E acalma o meu pensar
          B4/D#  C#m7
Me levas pelo   fogo
   A9             B4
Curando todo meu ser
    F#m7(11)  E/G#  A9 
Confio        em   Ti
    F#m7(11)  A9  B4
Confio        em Ti

E
  Creio que Tu és a cura
C#m7                    B4   A9  
     Creio que és tudo para mim
E
  Creio que tu és a vida
C#m7                           B4    A9  B4
     Creio que não há outro igual a Ti
   A9/C#      B/D#    E
Jesus, eu preciso de Ti

      E
Me escutas quando clamo
    A9      B4     E
E acalma o meu pensar
          B4/D#  C#m7
Me levas pelo   fogo
   A9             B4
Curando todo meu ser
    F#m7(11)  E/G#  A9 
Confio        em   Ti
    F#m7(11)  A9  B4
Confio        em Ti

E
  Creio que Tu és a cura
C#m7                    B4   A9  B4  A9/C#  B/D#
     Creio que és tudo para mim
E
  Creio que tu és a vida
C#m7                           B4    A9  B4
     Creio que não há outro igual a Ti
   A9/C#      B/D#    A9  B4 
Jesus, eu preciso de Ti
     A9/C#      B/D#  A9
Não há outro igual a ti

 C#m7  B/D#  E
Nada é impossível para Ti
 C#m7  B/D#  E
Nada é impossível
 C#m7  B/D#  E          A9
Nada é impossível para Ti
                          B4
Tens o meu mundo em tuas mãos     

 C#m7  B/D#  E
Nada é impossível para Ti
 C#m7  B/D#  E
Nada é impossível
 C#m7  B/D#  E     E/G#  A9
Nada é impossível para  Ti   
     C#m                  B
Tens o meu mundo em tuas mãos

E
  Creio que Tu és a cura
C#m7                    B4   A9  B4
     Creio que és tudo para mim
    A9/C#      B/D#
(Jesus, eu preciso de Ti)
E
  Creio que tu és a vida
C#m7                           B4    A9  B9
     Creio que não há outro igual a Ti
   A9/C#      B/D#    A9  B4 
Jesus, eu preciso de Ti
     A9/C#      B/D#  F#m7  E/G#
Não há outro igual a ti
   A9         B4      A9  E
Jesus, eu preciso de Ti`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Dançar na Chuva',
                artista: 'Fernandinho',
                tom: 'D',
                letra: `Intro: |:4/4 [Dm7] | [G#] [G] [Fm] [G] [G#] [G] :||

[D]
 Novo caminho para andar
Um novo sonho pra sonhar
                   [G]       [D]  [D4] [D]
O deserto não é o meu lugar
[D]
 Nova vida, Ele prometeu
A todo aquele que Nele crê
                        [G]
O mar a nossa frente se abrirá

[D]                  [A]/[C#]
 Nova criatura, eu sou
                    [Bm]
O velho homem já morreu
                   [A]
Vou dançar naquela terra
              [G]
Que Ele prometeu
   [D]/[F#]     [Em]  [A]
Eu vou,  eu vou

[D]                  [A]/[C#]
 Nova criatura, eu sou
                    [Bm]
O velho homem já morreu
                   [A]
Vou dançar naquela terra
              [G]
Que Ele prometeu
   [D]/[F#]     [Em]  [A]
Eu vou,  eu vou

                      Riff [B] [B] [C#] [D] [B] [B] [C#] [D]
Eu vou dançar na chuva

Eu vou dançar na chuva
                       
Eu vou dançar na chuva

Intro: |:4/4 [Dm7] | [G#] [G] [Fm] [G] [G#] [G] :||

[D]
 Novo caminho para andar
Um novo sonho pra sonhar
                   [G]       [D]  [D4] [D]
O deserto não é o meu lugar
[D]
 Nova vida, Ele prometeu
A todo aquele que Nele crê
                        [G]
O mar a nossa frente se abrirá

[D]                  [A]/[C#]
 Nova criatura, eu sou
                    [Bm]
O velho homem já morreu
                   [A]
Vou dançar naquela terra
              [G]
Que Ele prometeu
   [D]/[F#]     [Em]  [A]
Eu vou,  eu vou

[D]                  [A]/[C#]
 Nova criatura, eu sou
                    [Bm]
O velho homem já morreu
                   [A]
Vou dançar naquela terra
              [G]
Que Ele prometeu
   [D]/[F#]     [Em]  [A]
Eu vou,  eu vou

                      Riff [B] [B] [C#] [D] [B] [B] [C#] [D]
Eu vou dançar na chuva

Eu vou dançar na chuva
                       
Eu vou dançar na chuva

Intro: |:4/4 [Dm7] | [G#] [G] [Fm] [G] [G#] [G] :||`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Eterno',
                artista: 'Oficina G3',
                tom: 'D',
                letra: `Intro: |4/4 [G7+] [A#°] | [Bm] [Bm7] | [Em] [D]/[F#] [G] [A] | [A#°] | 

   [D]                   [A]/[C#]       [Bm]
Ó Deus tú és o meu Deus forte e a minha fortaleza
                [Em7]     [A]  [Bm]  [A]/[C#] [F#alt]
A minh'alma tem sede de ti Senhor
     [D]         [A]/[C#]      [Bm]          [Bm]/[A]
Com júbilo nos lábios te louvo ó meu rei
                [G7+]  [Bm]/[F#]            [Em7]  [A]  [A]/[C#]
Debaixo de tuas asas    encontro abrigo

   [D]                   [A]/[C#]       [Bm]
Ó Deus tú és o meu Deus forte e a minha fortaleza
                [Em7]     [A]  [Bm]  [A]/[C#] [F#alt]
A minh'alma tem sede de ti Senhor
     [D]         [A]/[C#]      [Bm]          [Bm]/[A]
Com júbilo nos lábios te louvo ó meu rei
                [G7+]  [Bm]/[F#]            [Em7]  [A]  [A]/[C#]
Debaixo de tuas asas    encontro abrigo

[G]            [A]        [F#]/[A#]            [Bm]
 Te louvo e te bendigo,  porque és bendito
[A]    [G]        [A]           [Bm]
Ó Senhor glórias ao Deus eterno

[G]             [A]         [F#]/[A#]           [Bm]
 Te louvo, eu te bendigo,   porque és comigo
[A]     [G]       [A]           [Bm]
Ó Senhor glórias ao Deus eterno

[G]            [A]        [F#]/[A#]            [Bm]
 Te louvo e te bendigo,  porque és bendito
[A]    [G]        [A]           
Ó Senhor glórias ao Deus 

 [D]       [Bm]              [Em7]
Eterno, Eterno, ao Deus eterno
[A]  [Bm]   [A]/[C#]         
Gló____órias ao Deus
  D       Bm              Em7
Eterno, Eterno, ao Deus eterno
A  Bm   A/C#           D
Gló____órias ao Deus eterno`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Fiel',
                artista: 'Gateway Worship',
                tom: 'G',
                letra: `Intro: |4/4  [Em7]   [D]/[F#] |  [G9] || [Em7]   [D]/[F#] | [C9] || 

Em7         D/F#      G
 Vens quando eu Te chamar
Em7   D/F#        G
 Toda vez que eu chorar
Em7     D/F#       G                   C9   D9
 Minhas lágrimas serão colhidas por um Deus fiel
 
Em7       D/F#      G
 Então eu vou Te chamar
Em7      D/F#       G
 Em Teus braços me lançar
Em7    D/F#   G                   C9     D9
 Mesmo sem enxergar, confio em um Deus fiel.

Em7  D/F# G                      C9
 Deus fi__el, minha vida está em Ti
                D9
 meus dias em Tuas mãos
Em7 D/F# G                      C9            D9
 Po_sso crer, meu Deus é o fogo que me defenderá
     Em7 D/F# G Em7  D/F# C
 Deus fiel      Deus fiel.

Em7   D/F#   G   Em7  D/F#      G
 Hoje podes curar e demônios expulsar
Em7     D/F#      G                  C9   D9 D4
 se eu apenas confiar no poder de um Deus fiel

Em7       D/F#    G   Em7    D/F#          G
 Louvarei até chegar o dia que o Senhor virá
Em7   D/F#    G                C9   D9 D4
 o inimigo cairá diante do meu Deus fiel.   Refrão

 C9            Em7          D/F#         G   G/B
  Eu sei Tu és meu e eu sou Teu, eu sou Teu
 C9              Em7         D/F#      Em7 D/F# | G | Em7 D/F# | C |
  Eu sei que és fiel para sempre e sempre      
Em7  D/F# G                      C9
 Deus fi__el, minha vida está em Ti
                D9
 meus dias em Tuas mãos
Em7 D/F# G                      C9            D9
 Po_sso crer, meu Deus é o fogo que me defenderá
      Em7 D/F# G Em7  D/F# C
 Deus fiel   
 
C9            D          Em7         D/F#
 Meu Deus é fiel, Tu és fiel, Tu és fiel  (5x)

Final: || Em7  D/F# | G || Em D/F# | C9||`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus me Ama',
                artista: 'Thalles Roberto',
                tom: 'C',
                letra: `Intro: ||:4/4 C9 |  Bb7+ :||


 C9                             
Mesmo sendo assim pobre e pecador 
     F9
Deus me ama
 C9             
Mesmo sendo falho, mesmo sem merecer 
     F9
Deus me ama
 C9                 
Se eu estou forte, se eu estou de pé 
     F9
Deus me ama
 C9
Se eu estou fraco, se eu estou caído
         F9
Ele não deixa de me amar

 C9
Sem o seu amor, sem o seu perdão
         F9
O que seria de mim
 C9
Deus me amou tanto que entregou seu filho
        F9
Pra morrer em meu lugar

 C9
Deus me ama
        F9
O seu amor é tão grande, incondicional
 C9
Deus me ama
            F9
E ele esta sempre de braços abertos pra mim

Intro: ||:4/4 C9 |  Bb7+ :||

 C9                             
Mesmo sendo assim pobre e pecador 
     F9
Deus me ama
 C9             
Mesmo sendo falho, mesmo sem merecer 
     F9
Deus me ama
 C9                 
Se eu estou forte, se eu estou de pé 
     F9
Deus me ama
 C9
Se eu estou fraco, se eu estou caído
         F9
Ele não deixa de me amar

 C9
Sem o seu amor, sem o seu perdão
         F9
O que seria de mim
 C9
Deus me amou tanto que entregou seu filho
        F9
Pra morrer em meu lugar

 C9
Deus me ama
        F9
O seu amor é tão grande, incondicional
 C9
Deus me ama
            F9
E ele esta sempre de braços abertos pra mim`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus tem o Melhor pra Mim',
                artista: 'Fernandinho',
                tom: 'A',
                letra: `Intro: ||:4/4 [D] [A] | [E] :||
                
[D]             [A]        [E]
Deus tem o melhor pra mim
[D]             [A]        [E]
Deus tem o melhor pra mim
[D]           [A]    [E]
E o que perdido foi
          [D]           [F#m]        [E]
Não se comparam com o que há de vir


[D]             [A]        [E]
Deus tem o melhor pra mim
[D]             [A]        [E]
Deus tem o melhor pra mim
[D]           [A]    [E]
E o que perdido foi
          [D]           [F#m]        [E]
Não se comparam com o que há de vir
          [D]           [F#m]        [E]
Não se comparam com o que há de vir`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus Vem Me Socorrer ',
                artista: 'Bruna Karla',
                tom: 'Eb',
                letra: `Intro: ||4/4  [G#] | [A#] | [G#] | [A#] | [G#] | [A#] || [Fm]  [D#]/[G] | [G#] |

[Cm]            [G#]                [Fm]
  O sol já se pôs, a dor não se foi
               [Cm]
O que é que eu vou fazer
[Cm]             [G#]               [Fm]
  Cansei de chorar, cansei de sofrer
               [D#4]     [D#]    [Bb]/[D]       [Cm]
Eu quero ver o sol brilhar trazendo esperança
[Fm]           [G4]  [G]
Para o meu viver
[Cm]                  [Cm]/[A#]
Deus vem me socorrer, estende a Tua mão
[Fm]                     [G4]       [G]
Derrama azeite em mim, sara meu coração
[Cm]                  [Cm]/[A#]
Deus faz-me reviver, em meio à provação
  [Fm]
Revela o teu poder a mim
    G4              G        || [G#] | [A#] | [G#] | [A#] ||
O milagre que eu preciso está em Ti

[Cm]            [G#]                [Fm]
  O sol já se pôs, a dor não se foi
               [Cm]
O que é que eu vou fazer
[Cm]             [G#]               [Fm]
  Cansei de chorar, cansei de sofrer
               [D#4]     [D#]    [Bb]/[D]       [Cm]
Eu quero ver o sol brilhar trazendo esperança
[Fm]           [G4]  [G]
Para o meu viver
[Cm]                  [Cm]/[A#]
Deus vem me socorrer, estende a Tua mão
[Fm]                     [G4]       [G]
Derrama azeite em mim, sara meu coração
[Cm]                  [Cm]/[A#]
Deus faz-me reviver, em meio à provação
  [Fm]
Revela o teu poder a mim
    G4              G        || [G#] | [A#] | [G#] | [A#] || [A#] [G#] [Gm] [Fm] ||
O milagre que eu preciso está em Ti

        [Fm]                     [D#] [A#]
Sim eu sei que o meu Redentor vi__ve
      [Fm]         [D#]/[G]       [G#]         [G4]      [G]
E por minha causa se levantará, Oh  Oh  Oh  Oh  Oh  Oh

[Cm]
Filho estou aqui
[Cm]/[A#]
Estendo a minha mão
[Fm]
Eu vim cuidar de ti
[G4]        [G]
Sarar teu coração
[Cm]            [Cm]/[A#]
Te faço reviver em meio à provação
[Fm]
Sinta agora o Meu poder
      G4            G          | G# | A# | G# | A# | Cm ||
Se precisas de um milagre estou aqui`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus da Minha Vida',
                artista: 'Thalles Roberto',
                tom: 'F',
                letra: `Intro: |4/4 [Dm7]  [Bb9] | [Dm7]  [Bb9] | [Dm7]  [Bb9] || [Dm7]  [G] ||


[Dm7]  [Bb9]  [Dm7]  [Bb9]
Deus meu  Pai  meu
 [Dm7]  [Bb9]  [Dm7]     [Bb9]
Amor  meu  Tudo, razão de tudo

[Dm7]  [Bb9]  [Dm7]  [Bb9]
Deus meu  Ar  Meu
  [Dm7]            [Bb9]    [Dm7]
Farol O farol que eu preciso
     [Bb9]
Como eu preciso 

      [Dm7]        [C]        [G]
Eu preciso Te sentir todo dia
    [Dm7]          [C]          [G]
E olhar pra Tua luz pra não me perder
      [Dm7]           [C]         [G]
Meu Senhor, Tu és a minha alegria
      [Bb9]
Eu preciso 

             [Bb9]
Deus da minha vida
[C9]     [Dm7]
Fica comigo
         [Bb9]
Sou a sua casa
[C9]      [Dm7]
Mora em mim
            [Bb9]
Deixa eu Te dizer
  [C9]        [Dm7]
O que eu preciso, Pai
      [Bb9]
Eu preciso do Senhor 

Intro: || [Dm7]  [Bb9] | [Dm7]  [Bb9] | [Dm7]  [Bb9] || [Dm7]  [G] ||

[Dm7]  [Bb9]  [Dm7]  [Bb9]
Deus meu  Pai  meu
 [Dm7]  [Bb9]  [Dm7]     [Bb9]
Amor  meu  Tudo, razão de tudo

[Dm7]  [Bb9]  [Dm7]  [Bb9]
Deus meu  Ar  Meu
  [Dm7]            [Bb9]    [Dm7]
Farol O farol que eu preciso
     [Bb9]
Como eu preciso 

      [Dm7]        [C]        [G]
Eu preciso Te sentir todo dia
    [Dm7]          [C]          [G]
E olhar pra Tua luz pra não me perder
      [Dm7]           [C]         [G]
Meu Senhor, Tu és a minha alegria
      [Bb9]
Eu preciso 

             [Bb9]
Deus da minha vida
[C9]     [Dm7]
Fica comigo
         [Bb9]
Sou a sua casa
[C9]      [Dm7]
Mora em mim
            [Bb9]
Deixa eu Te dizer
  [C9]        [Dm7]
O que eu preciso, Pai
      [Bb9]
Eu preciso do Senhor  

             [Bb9]
Deus da minha vida
[C9]     [Dm7]
Fica comigo
         [Bb9]
Sou a sua casa
[C9]      [Dm7]
Mora em mim
            [Bb9]
Deixa eu Te dizer
  [C9]        [Dm7]
O que eu preciso, Pai
      [Bb9]       [C9]
Eu preciso do Senhor 

Interlúdio: | [Bb9]  [C9] | [Dm7] | [Bb9]  [C9] | [Dm7] | [Bb9]  [C9] | [Dm7] | [Bb9]  [C9] | [Dm7] | [Bb9]  ||

             [Bb9]
Deus da minha vida
[C9]     [Dm7]
Fica comigo
         [Bb9]
Sou a sua casa
[C9]      [Dm7]
Mora em mim
            [Bb9]
Deixa eu Te dizer
  [C9]        [Dm7]
O que eu preciso, Pai
      [Bb9]       [C9]
Eu preciso do Senhor `,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus de Promessas',
                artista: 'Davi Sacer',
                tom: 'A',
                letra: `Intro: |4/4 [D]  [A]/[C#] | [Bm7]  [E] | [D]  [A]/[C#] | [Bm7]  [D]/[E] |

[Bm7]              [E]/[G#]
  Sei que os Teus olhos
        [A]/[C#]                 [D]
Sempre atentos permanecem em mim
[Bm7]           [E]/[G#]
  E os Teus ouvidos
        [A]/[C#]                      [D]
Estão sensíveis para ouvir meu clamor
        [Bm7]  [E]/[G#]
 Posso até chorar
        [A9]  [E]/[G#]     [F#m7]
Mas alegria vem de manhã

[D]          [A]/[C#]   [Bm]        [E]
És Deus de perto, Também de longe
 [D]      [A]/[C#]
Nunca mudastes
[Bm]      [G]  [D]/[F#] [E4]
Tu és fiel!

          [A]/[C#]
Deus de aliança
           [F#m]
Deus de promessas
               [Bm7]          [E4]
Deus que não é homem pra mentir
      [A]/[C#]              [F#m]
Tudo pode passar, tudo pode mudar
          [Bm7]              [E4]  [E]
Mas tua palavra vai se cumprir

[Bm7]              [E]/[G#]
  Sei que os Teus olhos
        [A]/[C#]                 [D]
Sempre atentos permanecem em mim
[Bm7]           [E]/[G#]
  E os Teus ouvidos
        [A]/[C#]                      [D]
Estão sensíveis para ouvir meu clamor
        [Bm7]  [E]/[G#]
 Posso até chorar
        [A9]  [E]/[G#]     [F#m7]
Mas alegria vem de manhã

[D]          [A]/[C#]   [Bm]        [E]
És Deus de perto, Também de longe
 [D]      [A]/[C#]
Nunca mudastes
[Bm]      [G]  [D]/[F#] [E4]
Tu és fiel!

[E]/[D]       [A]/[C#]
Deus de aliança
           [F#m]
Deus de promessas
               [Bm7]          [E4]
Deus que não é homem pra mentir
      [A]/[C#]              [F#m]
Tudo pode passar, tudo pode mudar
          [Bm7]              [E4]  [E]
Mas tua palavra vai se cumprir

[E]/[D]       [A]/[C#]
Deus de aliança
           [F#m]
Deus de promessas
               [Bm7]          [E4]
Deus que não é homem pra mentir
      [A]/[C#]              [F#m]
Tudo pode passar, tudo pode mudar
          [Bm7]              [E]  [F°]
Mas tua palavra vai se cumprir

[F#m7]           [E]         [D]
   Posso enfrentar o que for
             [E]       [F#m7]
Eu sei quem luta por mim
           [E]/[G#]        [D] [A]/[C#] [Bm] [A]   [G#°] [A] [G#°] [E]
Seus planos não podem ser frustrados
[F#m7]          [E]      [D]
   Minha esperança está
             [E]        [F#m7]
Nas mãos do grande eu sou
           [E]/[G#]      [G9]     [D]/[F#]
Meus olhos vão ver o impossível
       [E]  
Acontecer

[E]/[D]       [A]/[C#]
Deus de aliança
           [F#m]
Deus de promessas
               [Bm7]          [E4]
Deus que não é homem pra mentir
      [A]/[C#]              [F#m]
Tudo pode passar, tudo pode mudar
          [Bm7]              [E] 
Mas tua palavra vai se cumprir

[E]/[D]       [A]/[C#]
Deus de aliança
           [F#m]
Deus de promessas
[F#m]   [E]/[G#] [A]  [C#m]  [Bm7]          [E4]
 Deus que  não é   homem pra mentir
      [A]/[C#]              [F#m]
Tudo pode passar, tudo pode mudar
          [Bm7]              [E]  
Mas tua palavra vai se cumprir
Intro: || [D]  [A]/[C#] | [Bm7]  [E] | [D]  [A]/[C#] | [Bm7] [A]/[C#] [D] [D]/[E] [E] || A ||`,
                favorite: false,
                createdAt: Date.now() - 172200000
            },
            {
                id: generateId(),
                titulo: 'Deus do impossível',
                artista: 'Ministério Apascentar de Nova Iguaçu',
                tom: 'F',
                letra: `Intro: |4/4 Dm9  Dm7 | Gm7(9) | F | C | Dm9  Dm7 | Gm7(9) | F | C |
        
       Bb9
Quando tudo diz que não
               F            
Sua voz me encoraja a prosseguir
       Bb9
Quando tudo diz que não
                 F             
Ou parece que o mar não vai se abrir

           Gm
Sei que não estou só
        Bb9           
E o que dizes sobre mim
         Dm     
Não pode se frustrar
         Gm
Venha em meu favor
  Bb9                   C
E cumpra em mim teu querer

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer 

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer 

               Bb
O Deus do impossível
               Dm   
O Deus do impossível

       Bb9
Quando tudo diz que não
               F            
Sua voz me encoraja a prosseguir
       Bb9
Quando tudo diz que não
                 F             
Ou parece que o mar não vai se abrir

           Gm
Sei que não estou só
        Bb9           
E o que dizes sobre mim
         Dm     
Não pode se frustrar
         Gm
Venha em meu favor
  Bb9                   C
E cumpra em mim teu querer

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer 

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer

                F
O Deus do impossível
                 C
Não desistiu de mim
                 Gm 
Sua destra me sustenta 
      Bb         C
E me faz prevalecer

               Bb
O Deus do impossível
               Dm 
O Deus do impossível
               Bb
O Deus do impossível
               Dm 
O Deus do impossível`,
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
                tom: 'C',
                letra: `Intro: |4/4 [C] |
                
[C]                          [Am7]
  Minhas lamparinas estão acesas
[C]
  Só estou esperando o barulho
         [Am7]
Dos teus passos em direção à porta
[Em]
  É só bater que eu
[F]                  [C]      [G]
  Vou abrir pro Senhor entrar
[Em]
  É só bater que eu
[F]                  [C] [F] [G]
  Vou abrir pro Senhor entrar

           [F]
Eu já coloquei
                  [C]
As minhas vestes brancas
      [Am7]
Estou só te esperando
 [G]         [Em]  [F]
Vem, vamos dançar
   [Am7] [G]     [F]
Mara___na_ta
  [Am7]  [G]
Mara___nata

[C]                          [Am7]
  Minhas lamparinas estão acesas
[C]
  Só estou esperando o barulho
         [Am7]
Dos teus passos em direção à porta
[Em]
  É só bater que eu
[F]                  [C]      [G]
  Vou abrir pro Senhor entrar
[Em]
  É só bater que eu
[F]                  [C] [F] [G]
  Vou abrir pro Senhor entrar

           [F]
Eu já coloquei
                  [C]
As minhas vestes brancas
      [Am7]
Estou só te esperando
 [G]         [Em]  [F]
Vem, vamos dançar
   [Am7] [G]     [F]
Mara___na_ta
  [Am7]  [G]
Mara___nata

      [C]/[E]  [F]
Eu já coloquei
                  [C]
As minhas vestes brancas
      [Am7]
Estou só te esperando
 [G]         [Em]  [F]
Vem, vamos dançar
   [Am7] [G]     [F]
Mara___na_ta
  [Am7]  [G] | [F] [F7+] [F9] [F7+]|
Mara___nata

[F]
  Tem fogo nos olhos
[G]
  Eu não imaginava
[Am7]
  Que era lindo assim
[Em] 
  Que era lindo assim
[F]
  Meu noivo esperado
[G]
  Eu abro a minha casa
[Am7]
    Pode morar aqui
[Em] 
   Pode morar aqui

[F]
  Tem fogo nos olhos
[G]
  Eu não imaginava
[Am7]
  Que era lindo assim
[Em] 
  Que era lindo assim
[F]
  Meu noivo esperado
[G]
  Eu abro a minha casa
[Am7]
    Pode morar aqui
[Em] 
   Pode morar aqui

Interlúdio: |: [F] | [G] | [Am7] | [Em] :|| 
       
           [F]
Eu já coloquei
                  [C]
As minhas vestes brancas
      [Am7]
Estou só te esperando
 [G]         [Em]  [F]
Vem, vamos dançar
   [Am7] [G]     [F]
Mara___na_ta
  [Am7]  [G]
Mara___nata

      [C]/[E]  [F]
Eu já coloquei
                  [C]
As minhas vestes brancas
      [Am7]
Estou só te esperando
 [G]         [Em]  [F]
Vem, vamos dançar
   [Am7] [G] 
Mara___na_ta

[F]
  Tem fogo nos olhos
[G]
  Eu não imaginava
[Am7]
  Que era lindo assim
[Em] 
  Que era lindo assim
[F]
  Meu noivo esperado
[G]
  Eu abro a minha casa
[Am7]
    Pode morar aqui
[Em] 
   Pode morar aqui

[F]
  Tem fogo nos olhos
[G]
  Eu não imaginava
[Am7]
  Que era lindo assim
[Em] 
  Que era lindo assim
[F]
  Meu noivo esperado
[G]
  Eu abro a minha casa
[Am7]
    Pode morar aqui
[Em] 
   Pode morar aqui`,
                favorite: true,
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
                letra: `Intro: |4/4 [|Em] | [D] | [C] | [Am} |

[Em]                  [D]
  És adorado entre nós
[C]                [Am7]
  Tão desejado aqui
[Em]                   [D]
  Mas nada se comparará
                       [Am7]   [C]    [D]
Com a glória que há de vir, oh oh oh

        [C]                   [D9]    
Eu não sou daqui, pra casa voltarei
         [C]                  [D9]       [G]/[B]
Ele vem me buscar e com Ele eu irei
        [C]                   [D9]    
Eu não sou daqui, pra casa voltarei
         [C]                  [D9]    
Ele vem me buscar e com Ele eu irei

   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar
   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar

Interlúdio: | C6 | Am | Em7 | D |

[Em]                  [D]
  És adorado entre nós
[C]                [Am7]
  Tão desejado aqui
[Em]                   [D]
  Mas nada se comparará
                       [Am7]   [C]    [D]
Com a glória que há de vir, oh oh oh

        [C]                   [D9]    
Eu não sou daqui, pra casa voltarei
         [C]                  [D9] 
Ele vem me buscar e com Ele eu irei
        [C]                   [D9]    
Eu não sou daqui, pra casa voltarei
         [C]                  [D9]    
Ele vem me buscar e com Ele eu irei

   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar
   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar

   [Am7]                         [Bm7] 
Em breve Jesus no céu vai aparecer
                      [Em]
E todo joelho se dobrará
                      [D]
E toda língua confessará

       Am7              Bm7
Mas a igreja será arrebatada
              C             D  
Num piscar de olhos acontecerá
       Am7              Bm7
Mas a igreja será arrebatada
              C             D  
Num piscar de olhos acontecerá

   [C]    [Em]  [D9]
Yeshu___u___a
  Bm       Em
Yeshu___u___a
   [C]    [Em]  [D9]
Yeshu___u___a
  Bm       Em
Yeshu___u___a

        BATERIA 
Mas a igreja será arrebatada
Num piscar de olhos acontecerá
   [Em]   [Am]              [Bm7]
Mas a igreja será arrebatada
              C             D  
Num piscar de olhos acontecerá

   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar
   [C]    [Em]  [D9]
Yeshu___u___a
               [Bm7]                 [Em] 
O Messias aguardado, Ele vem me buscar`,
                favorite: true,
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
