// ==================== Constants ====================
const STORAGE_KEY = 'cifracerta_cifras';
const THEME_KEY = 'cifracerta_theme';

// ==================== Chord Transposition ====================
const CHORDS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Alternative chord notations
const CHORD_ALTERNATIVES = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'C#m': 'C#m', 'D#m': 'D#m', 'F#m': 'F#m', 'G#m': 'G#m', 'A#m': 'A#m'
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
                letra: `Intro: |: [C#m]  [E]/[G#] | [A]  [A]/[B] ||[C#m]  [E]/[G#] | [A]  [A]/[B]  |
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
                tom: 'C',
                letra: `[C]Eu me rendo a Ti, ó Mestre
[G]Quebrantado estou
[Am]Toma os cacos da minha [F]vida
E refaz o meu [C]viver

[C]Quero ser moldado em Tuas [G]mãos
Como o barro nas [Am]mãos do oleiro [F]sou
[C]Quebra a minha vida e [G]faz de novo
[Am]Como tu [F]quiser

[C]Ressuscita-me, [G]Sara-me
[Am]Torna a me fazer um vaso [F]novo em Tuas [C]mãos
Ressuscita-me, [G]Sara-me
[Am]Quero ser do [F]jeito que Tu [C]queres, Senhor

[F]E se for preciso [C]quebra minha vida
[G]E molda outra [Am]vez
[F]Quero estar [C]sempre em Tuas [G]mãos`,
                favorite: false,
                createdAt: Date.now() - 86400000
            },
            {
                id: generateId(),
                titulo: 'Porque Ele Vive',
                artista: 'Cassiane',
                tom: 'D',
                letra: `[D]Deus enviou [A]seu Filho amado
[Bm]Para morrer em [F#m]meu lugar
[G]Na cruz sofreu [D]por meus pecados
[Em]Mas ressurgiu e [A]vivo está

[D]Porque Ele vive, [A]posso crer no amanhã
[Bm]Porque Ele vive, [F#m]temor não há
[G]Mas eu bem sei, [D]eu sei
[Em]Que a minha vida está [A]nas mãos
Do meu [D]Jesus, que vivo está

[D]E quando, enfim, [A]chegar a hora
[Bm]Em que a morte [F#m]enfrentarei
[G]Sem medo, então, [D]terei vitória
[Em]Verei nas nuvens o [A]meu Jesus

[D]Porque Ele vive, [A]posso crer no amanhã
[Bm]Porque Ele vive, [F#m]temor não há
[G]Mas eu bem sei, [D]eu sei
[Em]Que a minha vida está [A]nas mãos
Do meu [D]Jesus, que vivo está`,
                favorite: true,
                createdAt: Date.now() - 172800000
            },
            {
                id: generateId(),
                titulo: 'Ao Único',
                artista: 'Gabriela Rocha',
                tom: 'E',
                letra: `[E]Ao único que é digno de [B]receber
[C#m]A honra e a [A]glória
A [E]força e o poder
[B]Coroamos [C#m]neste [A]lugar

[E]Tu és santo, [B]santo, santo
[C#m]Tu és santo, [A]santo, santo

[E]Ao único que venceu a [B]morte
[C#m]E que hoje [A]vivo está
[E]Ao único amigo [B]mais leal
[C#m]Jesus, o Leão de [A]Judá

[E]Caia fogo, [B]caia fogo
[C#m]Caia fogo [A]neste lugar
[E]Caia fogo, [B]caia fogo
[C#m]Caia fogo [A]agora

[E]Santo [B]Espírito
[C#m]Vem como o [A]vento
[E]Sopra em [B]nós
Aviva os [C#m]corações [A]mais uma vez`,
                favorite: false,
                createdAt: Date.now() - 259200000
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
