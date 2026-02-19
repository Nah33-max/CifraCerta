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
                createdAt: Date.now()
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
                createdAt: Date.now() - 86400000
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
                createdAt: Date.now() - 172800000
            },
            {
                id: generateId(),
                titulo: 'A Batalha é do Senhor',
                artista: 'Ademar de Campos',
                tom: 'F',
                letra: `Intro: |4/4 (solo bateria) | [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||
                
           [Dm]  [Am]   [Dm] [Am][Bb]   [Am][Gm]
Quando os grandes homens de Judá viram o inimigo
 [Dm]  [Am]          [Dm] [Am]
Deus mandou que eles não temessem
     [Bb]   [Am][Gm] [Bb][Am][Gm] 
Pois daria a vitória
            [Am]              [Bb]   [Bb][Am][Gm]
E chamou a cantar uma nova canção
           [Am]              [Bb]/[C]
Abaixar a espada e levantar o louvor

[F9]            [Am]            [Eb]
    Cantai ao Senhor com alegre som
              [Gm]   [C]/[E] [F9]
    Erga a voz para o Seu louvor
                 [Am]          [Eb]
    Um canto vencedor na tribulação
                   [Gm]   [C]/[E] [F9]
    Crê somente a batalha é do Senhor

Interlúdio: || [Dm] [Am] | [Dm] [Am] | [Bb] [Am][Gm] ||

      [Dm]  [Am]   [Dm] [Am]
Quando algum mal te encontrar
   [Bb]  [Am][Gm]
Confia no Senhor
[Dm]  [Am]            [Dm] [Am]       
Crê em Deus que não te deixará
    [Bb]   [Am][Gm][Bb][Am][Gm] 
Ele sempre perto está
            [Am]            [Bb]   [Bb][Am][Gm]
Você pode erguer uma nova canção
          [Am]        [Bb]/[C]
Porque a batalha é do Senhor

[F9]            [Am]            [Eb]
    Cantai ao Senhor com alegre som
              [Gm]   [C]/[E] [F9]
    Erga a voz para o Seu louvor
                 [Am]          [Eb]
    Um canto vencedor na tribulação
                   [Gm]   [C]/[E] [F9]
    Crê somente a batalha é do Senhor

    [C]/[Bb][Bb]/[D]   [Bbm]           [F]
Porque ele é bom, Seu amor dura para sempre
    [C]/[Bb][Bb]/[D]   [Bbm]           [F]
Porque ele é bom, Seu amor dura para sempre
             [Bb]/[C]
Pra sempre e sempre

[F9]            [Am]            [Eb]
    Cantai ao Senhor com alegre som
              [Gm]   [C]/[E] [F9]
    Erga a voz para o Seu louvor
                 [Am]          [Eb]
    Um canto vencedor na tribulação
                   [Gm]   [C]/[E] [F9] Pausa
    Crê somente a batalha é do Senhor`,
                favorite: false,
                createdAt: Date.now() - 172900000
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
                createdAt: Date.now() - 259200000
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
                createdAt: Date.now() - 259300000
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
Incomparáveis são as promessas para mim
`,
                favorite: false,
                createdAt: Date.now() - 259400000
            },
            {
                id: generateId(),
                titulo: 'A Alegria do Senhor',
                artista: 'Fernandinho',
                tom: 'Bb',
                letra: `Intro: |: 4/4 [Cm]  [Bb]  [Gm] | [Cm] [Bb]  [Gm] | [Cm]  [Bb]  [Gm] 
     || [A]/[E]  [Bb]/[F]  [A]/[E]  [Bb]/[F] [A]/[E]  [Bb]/[F]  [A]/[E] :|


| [Cm]  [Bb]  [Gm] | [Cm] [Bb]  [Gm] | [Cm]  [Bb]  [Gm] |
       Vento sopra forte
| [A]/[E]  [Bb]/[F]  [A]/[E]  [Bb]/[F] [A]/[E]  [Bb]/[F]  [A]/[E] |
As águas não podem me afogar
| [Cm]  [Bb]  [Gm] | [Cm] [Bb]  [Gm] | [Cm]  [Bb]  [Gm] | 
Vento sopra forte
| A/E  Bb/F  A/E  Bb/F A/E  Bb/F  A/E |
Em Suas mãos vou segurar
Intro: | [Cm]  [Bb]  [Gm] | [Cm] [Bb]  [Gm] | [Cm]  [Bb]  [Gm] | || [A]/[E]  [Bb]/[F]  [A]/[E]  [Bb]/[F] [A]/[E]  [Bb]/[F]  [A]/[E] |

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
[Eb]               [F]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#] [D]  [D#]
    Eu vejo o Teu amor

[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força

Intro: | [Cm]  [Bb]  [Gm] | [Cm] [Bb]  [Gm] | [Cm]  [Bb]  [Gm] || [A]/[E]  [Bb]/[F]  [A]/[E]  [Bb]/[F] [A]/[E]  [Bb]/[F]  [A]/[E] ||

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
[Eb]               [F]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#]  [D]  [D#] [D]  [D#]
    Eu vejo o Teu amor

[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
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

[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força

[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força

[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força
[Gm]              [Bb]          [Eb]  [Cm]
   A alegria do Senhor é a nossa força

Final: [Cm]  [Bb]  [Gm]`,
                favorite: false,
                createdAt: Date.now() - 172100000
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
