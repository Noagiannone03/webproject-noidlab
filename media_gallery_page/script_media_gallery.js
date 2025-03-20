
  AOS.init({ duration: 800 });

  /* ----------------- Navbar Dropdown ----------------- */
  const menuBtn = document.getElementById("menu-btn");
  const dropdown = document.getElementById("dropdown");
  if (menuBtn && dropdown) {
    menuBtn.addEventListener("click", () => { 
      dropdown.classList.toggle("active"); 
    });
  }

  /* ----------------- Filter Photos ----------------- */
// Sélection des éléments du DOM
const filterButtons = document.querySelectorAll(".filter-buttons button");
const photoGrid = document.querySelector(".photos-grid");
const initialPhotoCards = Array.from(document.querySelectorAll(".photos-grid .media-card"));
const voirPlusBtn = document.querySelector(".see-more button");

let extraLoaded = false;

// Liste des photos supplémentaires à ajouter (adaptez les chemins, alt et catégories)
const extraPhotos = [
  // Exterieur photos
  { src: "../assets/images/dans-les-murs/Danslesmurs_A12.jpg", alt: "Exterieur Photo 1", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/53-event-noid.jpg", alt: "Exterieur Photo 2", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/57-event-noid.jpg", alt: "Exterieur Photo 3", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/74-event-noid.jpg", alt: "Exterieur Photo 4", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/2-event-noid.jpg", alt: "Exterieur Photo 5", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/19-event-noid.jpg", alt: "Exterieur Photo 6", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/36-event-noid.jpg", alt: "Exterieur Photo 7", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/53-event-noid.jpg", alt: "Exterieur Photo 8", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/75-event-noid.jpg", alt: "Exterieur Photo 9", category: "exterieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_4.jpg", alt: "Exterieur Photo 10", category: "exterieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A25.jpg", alt: "Exterieur Photo 11", category: "exterieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A36.jpg", alt: "Exterieur Photo 12", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/1-event-noid.jpg", alt: "Exterieur Photo 13", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/2-event-noid.jpg", alt: "Exterieur Photo 14", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/3-event-noid.jpg", alt: "Exterieur Photo 15", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/4-event-noid.jpg", alt: "Exterieur Photo 16", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/5-event-noid.jpg", alt: "Exterieur Photo 17", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/6-event-noid.jpg", alt: "Exterieur Photo 18", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/7-event-noid.jpg", alt: "Exterieur Photo 19", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/8-event-noid.jpg", alt: "Exterieur Photo 20", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/9-event-noid.jpg", alt: "Exterieur Photo 21", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/10-event-noid.jpg", alt: "Exterieur Photo 22", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/11-event-noid.jpg", alt: "Exterieur Photo 23", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/12-event-noid.jpg", alt: "Exterieur Photo 24", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/13-event-noid.jpg", alt: "Exterieur Photo 25", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/14-event-noid.jpg", alt: "Exterieur Photo 26", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/15-event-noid.jpg", alt: "Exterieur Photo 27", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/16-event-noid.jpg", alt: "Exterieur Photo 28", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/17-event-noid.jpg", alt: "Exterieur Photo 29", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/18-event-noid.jpg", alt: "Exterieur Photo 30", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/19-event-noid.jpg", alt: "Exterieur Photo 31", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/20-event-noid.jpg", alt: "Exterieur Photo 32", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/21-event-noid.jpg", alt: "Exterieur Photo 33", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/22-event-noid.jpg", alt: "Exterieur Photo 34", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/23-event-noid.jpg", alt: "Exterieur Photo 35", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/24-event-noid.jpg", alt: "Exterieur Photo 36", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/25-event-noid.jpg", alt: "Exterieur Photo 37", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/26-event-noid.jpg", alt: "Exterieur Photo 38", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/27-event-noid.jpg", alt: "Exterieur Photo 39", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/28-event-noid.jpg", alt: "Exterieur Photo 40", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/29-event-noid.jpg", alt: "Exterieur Photo 41", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/30-event-noid.jpg", alt: "Exterieur Photo 42", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/31-event-noid.jpg", alt: "Exterieur Photo 43", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/32-event-noid.jpg", alt: "Exterieur Photo 44", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/33-event-noid.jpg", alt: "Exterieur Photo 45", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/34-event-noid.jpg", alt: "Exterieur Photo 46", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/35-event-noid.jpg", alt: "Exterieur Photo 47", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/36-event-noid.jpg", alt: "Exterieur Photo 48", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/37-event-noid.jpg", alt: "Exterieur Photo 49", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/38-event-noid.jpg", alt: "Exterieur Photo 50", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/39-event-noid.jpg", alt: "Exterieur Photo 51", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/40-event-noid.jpg", alt: "Exterieur Photo 52", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/41-event-noid.jpg", alt: "Exterieur Photo 53", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/42-event-noid.jpg", alt: "Exterieur Photo 54", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/43-event-noid.jpg", alt: "Exterieur Photo 55", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/44-event-noid.jpg", alt: "Exterieur Photo 56", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/45-event-noid.jpg", alt: "Exterieur Photo 57", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/46-event-noid.jpg", alt: "Exterieur Photo 58", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/47-event-noid.jpg", alt: "Exterieur Photo 59", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/48-event-noid.jpg", alt: "Exterieur Photo 60", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/49-event-noid.jpg", alt: "Exterieur Photo 61", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/50-event-noid.jpg", alt: "Exterieur Photo 62", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/51-event-noid.jpg", alt: "Exterieur Photo 63", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/52-event-noid.jpg", alt: "Exterieur Photo 64", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/53-event-noid.jpg", alt: "Exterieur Photo 65", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/54-event-noid.jpg", alt: "Exterieur Photo 66", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/55-event-noid.jpg", alt: "Exterieur Photo 67", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/56-event-noid.jpg", alt: "Exterieur Photo 68", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/57-event-noid.jpg", alt: "Exterieur Photo 69", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/58-event-noid.jpg", alt: "Exterieur Photo 70", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/59-event-noid.jpg", alt: "Exterieur Photo 71", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/60-event-noid.jpg", alt: "Exterieur Photo 72", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/61-event-noid.jpg", alt: "Exterieur Photo 73", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/62-event-noid.jpg", alt: "Exterieur Photo 74", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/63-event-noid.jpg", alt: "Exterieur Photo 75", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/64-event-noid.jpg", alt: "Exterieur Photo 76", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/65-event-noid.jpg", alt: "Exterieur Photo 77", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/66-event-noid.jpg", alt: "Exterieur Photo 78", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/67-event-noid.jpg", alt: "Exterieur Photo 79", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/68-event-noid.jpg", alt: "Exterieur Photo 80", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/69-event-noid.jpg", alt: "Exterieur Photo 81", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/70-event-noid.jpg", alt: "Exterieur Photo 82", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/71-event-noid.jpg", alt: "Exterieur Photo 83", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/72-event-noid.jpg", alt: "Exterieur Photo 84", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/73-event-noid.jpg", alt: "Exterieur Photo 85", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/74-event-noid.jpg", alt: "Exterieur Photo 86", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/75-event-noid.jpg", alt: "Exterieur Photo 87", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/76-event-noid.jpg", alt: "Exterieur Photo 88", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/77-event-noid.jpg", alt: "Exterieur Photo 89", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/78-event-noid.jpg", alt: "Exterieur Photo 90", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/79-event-noid.jpg", alt: "Exterieur Photo 91", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/80-event-noid.jpg", alt: "Exterieur Photo 92", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/81-event-noid.jpg", alt: "Exterieur Photo 93", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/82-event-noid.jpg", alt: "Exterieur Photo 94", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/83-event-noid.jpg", alt: "Exterieur Photo 95", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/84-event-noid.jpg", alt: "Exterieur Photo 96", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/85-event-noid.jpg", alt: "Exterieur Photo 97", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/86-event-noid.jpg", alt: "Exterieur Photo 98", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/87-event-noid.jpg", alt: "Exterieur Photo 99", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/88-event-noid.jpg", alt: "Exterieur Photo 100", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/89-event-noid.jpg", alt: "Exterieur Photo 101", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/90-event-noid.jpg", alt: "Exterieur Photo 102", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/91-event-noid.jpg", alt: "Exterieur Photo 103", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/92-event-noid.jpg", alt: "Exterieur Photo 104", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/93-event-noid.jpg", alt: "Exterieur Photo 105", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/94-event-noid.jpg", alt: "Exterieur Photo 106", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/96-event-noid.jpg", alt: "Exterieur Photo 107", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/97-event-noid.jpg", alt: "Exterieur Photo 108", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/98-event-noid.jpg", alt: "Exterieur Photo 109", category: "exterieur" },
  { src: "../assets/images/hors-les-murs/99-event-noid.jpg", alt: "Exterieur Photo 110", category: "exterieur" },
  
  // Interieur photos
  { src: "../assets/images/dans-les-murs/Danslesmurs_1.jpg", alt: "Interieur Photo 1", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_2.jpg", alt: "Interieur Photo 2", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_3.jpg", alt: "Interieur Photo 3", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_4.jpg", alt: "Interieur Photo 4", category: "interieur" },
  { src: "../assets/images/dans-les-murs/danslesmurs_5.jpg", alt: "Interieur Photo 5", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A1.jpg", alt: "Interieur Photo 6", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A2.jpg", alt: "Interieur Photo 7", category: "interieur" },
  { src: "../assets/images/dans-les-murs/danslesmurs_A4.jpg", alt: "Interieur Photo 8", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A9.jpg", alt: "Interieur Photo 9", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A10.jpg", alt: "Interieur Photo 10", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A12.jpg", alt: "Interieur Photo 11", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A15.jpg", alt: "Interieur Photo 12", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A18.jpg", alt: "Interieur Photo 13", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A20.jpg", alt: "Interieur Photo 14", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A21.jpg", alt: "Interieur Photo 15", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A22.jpg", alt: "Interieur Photo 16", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A23.jpg", alt: "Interieur Photo 17", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A24.jpg", alt: "Interieur Photo 18", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A25.jpg", alt: "Interieur Photo 19", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A27.jpg", alt: "Interieur Photo 20", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A28.jpg", alt: "Interieur Photo 21", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A29.jpg", alt: "Interieur Photo 22", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A30.jpg", alt: "Interieur Photo 23", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A31.jpg", alt: "Interieur Photo 24", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A33.jpg", alt: "Interieur Photo 25", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A34.jpg", alt: "Interieur Photo 26", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A35.jpg", alt: "Interieur Photo 27", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A36.jpg", alt: "Interieur Photo 28", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A37.jpg", alt: "Interieur Photo 29", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A38.jpg", alt: "Interieur Photo 30", category: "interieur" },
  { src: "../assets/images/dans-les-murs/Danslesmurs_A39.jpg", alt: "Interieur Photo 31", category: "interieur" }
];


// Fonction qui ajoute les photos supplémentaires
function loadExtraPhotos() {
  extraPhotos.forEach(photo => {
    const card = document.createElement("div");
    // On ajoute une classe supplémentaire pour pouvoir les cibler facilement lors du retrait
    card.classList.add("media-card", "extra-photo");
    card.setAttribute("data-category", photo.category);
    card.style.display = "block";
    
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    
    card.appendChild(img);
    photoGrid.appendChild(card);
  });
}

// Fonction qui supprime uniquement les photos supplémentaires
function removeExtraPhotos() {
  const extraCards = document.querySelectorAll(".photos-grid .media-card.extra-photo");
  extraCards.forEach(card => card.remove());
}

// Fonctions pour mettre à jour le texte du bouton "Voir plus/moins"
function setVoirMoinsButton() {
  voirPlusBtn.innerHTML = 'Voir moins <span class="arrow">➔</span>';
}

function setVoirPlusButton() {
  voirPlusBtn.innerHTML = 'Voir plus <span class="arrow">➔</span>';
}

// Gestion du clic sur le bouton "Voir plus"/"Voir moins"
voirPlusBtn.addEventListener("click", () => {
  if (!extraLoaded) {
    // Charger les photos supplémentaires
    loadExtraPhotos();
    extraLoaded = true;
    setVoirMoinsButton();
  } else {
    // Supprimer les photos supplémentaires et réinitialiser le filtre
    removeExtraPhotos();
    extraLoaded = false;
    // Réinitialiser l'état actif du filtre en remettant "Toutes"
    filterButtons.forEach(btn => btn.classList.remove("active"));
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) { allBtn.classList.add("active"); }
    // Afficher uniquement les cartes initiales
    initialPhotoCards.forEach(card => card.style.display = "block");
    setVoirPlusButton();
  }
});

// Gestion des clics sur les boutons de filtrage
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Si les photos supplémentaires ne sont pas chargées, on les ajoute
    if (!extraLoaded) {
      loadExtraPhotos();
      extraLoaded = true;
      setVoirMoinsButton();
    }
    // Mettre à jour l'état actif du filtre
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const filter = btn.getAttribute("data-filter");
    // Appliquer le filtre sur toutes les cartes (initiales et supplémentaires)
    const allCards = document.querySelectorAll(".photos-grid .media-card");
    allCards.forEach(card => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Sélection des éléments du modal
const mediaModal = document.getElementById("media-modal");
const modalMedia = document.getElementById("modal-media");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let currentMediaIndex = 0;
let currentMediaList = [];

// Sélection de toutes les cartes des grilles (images et vidéos)
const mediaCards = document.querySelectorAll(".media-grid .media-card");
mediaCards.forEach((card, index) => {
  // Pour la section audio, on ne gère pas le modal
  if (card.closest("#audio")) return;
  card.addEventListener("click", () => {
    currentMediaIndex = index;
    currentMediaList = Array.from(document.querySelectorAll(".media-grid .media-card"));
    loadModalContent(currentMediaList[currentMediaIndex]);
    mediaModal.classList.add("active");
  });
});

// Fonction qui charge le contenu dans le modal selon le type de média
function loadModalContent(card) {
  modalMedia.innerHTML = "";
  const type = card.getAttribute("data-type");
  if (type === "video") {
    // Récupérer l'URL de la vidéo depuis l'attribut data-video
    const videoSrc = card.getAttribute("data-video");
    if (videoSrc) {
      // Si l'URL semble pointer vers YouTube
      if (videoSrc.includes("youtube") || videoSrc.includes("youtu.be")) {
        const iframe = document.createElement("iframe");
        iframe.src = videoSrc; // On attend ici que l'URL soit au format embed (ex: "https://www.youtube.com/embed/VIDEO_ID")
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        modalMedia.appendChild(iframe);
      } else {
        // Sinon, on considère qu'il s'agit d'une vidéo locale
        const video = document.createElement("video");
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";
        modalMedia.appendChild(video);
      }
    }
  } else {
    // Par défaut, on gère le cas image
    const img = card.querySelector("img");
    if (img) {
      const clone = img.cloneNode();
      clone.style.maxWidth = "100%";
      clone.style.maxHeight = "100%";
      modalMedia.appendChild(clone);
    }
  }
}

// Fermeture du modal
if (modalClose) {
  modalClose.addEventListener("click", () => {
    mediaModal.classList.remove("active");
  });
}

// Navigation "Précédent" et "Suivant" dans le modal
if (modalPrev) {
  modalPrev.addEventListener("click", () => {
    currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
    loadModalContent(currentMediaList[currentMediaIndex]);
  });
}
if (modalNext) {
  modalNext.addEventListener("click", () => {
    currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
    loadModalContent(currentMediaList[currentMediaIndex]);
  });
}


  /* ----------------- Image aléatoire pour la section Featured Background ----------------- */
  const bgImages = ["46-event-noid.jpg", "18-event-noid.jpg", "28-event-noid.jpg", "39-event-noid.jpg"];
  const randIndex = Math.floor(Math.random() * bgImages.length);
  const chosenImage = bgImages[randIndex];
  const randomImageElem = document.getElementById("randomImage");
  if (randomImageElem) {
    randomImageElem.src = "../assets/images/hors-les-murs/" + chosenImage;
  } else {
    console.error("Élément randomImage introuvable.");
  }

  /* ----------------- Player (mise à jour de l'iframe) ----------------- */
  const audioSection = document.getElementById("audio");
  const iframeContainer = document.querySelector(".iframe-container");
  if (audioSection && iframeContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.75) {
          iframeContainer.classList.add("visible");
        } else {
          iframeContainer.classList.remove("visible");
        }
      });
    }, { threshold: [0, 0.75, 1] });
    observer.observe(audioSection);
  } else {
    console.error("Section audio ou conteneur iframe introuvable.");
  }
  
  /* Mise à jour du src de l'iframe du player sans recréer l'iframe */
  const audioCards = document.querySelectorAll("#audio .media-card");
  audioCards.forEach(card => {
    card.addEventListener("click", () => {
      const newSrc = card.getAttribute("data-audio");
      console.log("Audio card clicked, newSrc:", newSrc);
      if (!iframeContainer) {
        console.error("Aucun conteneur iframe trouvé!");
        return;
      }
      const iframe = iframeContainer.querySelector("iframe");
      if (iframe) {
        iframe.src = newSrc;
        console.log("iframe src mis à jour:", newSrc);
      } else {
        console.error("Aucun iframe existant dans le conteneur.");
      }
    });
  });

  /* ----------------- Audio Player Controls ----------------- */
  const playPauseBtn = document.getElementById("play-pause");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const prevTrackBtn = document.getElementById("prev-track");
  const nextTrackBtn = document.getElementById("next-track");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const albumArt = document.querySelector(".album-art img");
  const volumeSlider = document.getElementById("volume-slider");
  const discoverSounds = document.getElementById("discover-sounds");

  const audioPlaylist = [
    { src: "../assets/audio/sample.mp3", title: "Titre 1", artist: "Artiste 1", cover: "../assets/images/Danslesmurs_A27.jpg" },
    { src: "../assets/audio/sample.mp3", title: "Titre 2", artist: "Artiste 2", cover: "../assets/images/Danslesmurs_A27.jpg" },
    { src: "../assets/audio/sample.mp3", title: "Titre 3", artist: "Artiste 3", cover: "../assets/images/Danslesmurs_A27.jpg" }
  ];
  let currentTrackIndex = 0;
  const audioPlayer = new Audio();
  
  function loadTrack(index) {
    const track = audioPlaylist[index];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    albumArt.src = track.cover;
  }
  
  loadTrack(currentTrackIndex);
  
  function startAudio() {
    audioPlayer.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    // Animation pour faire disparaître le bouton Discover en douceur
    discoverSounds.classList.add("hide");
    setTimeout(() => { discoverSounds.style.display = "none"; }, 400);
    // Masquer l'overlay sur toutes les cards audio
    document.querySelectorAll("#audio .audio-overlay").forEach(el => el.style.opacity = "0");
  }
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (audioPlayer.paused) {
        startAudio();
      } else {
        audioPlayer.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });
  }
  
  if (prevTrackBtn) {
    prevTrackBtn.addEventListener("click", () => {
      currentTrackIndex = (currentTrackIndex - 1 + audioPlaylist.length) % audioPlaylist.length;
      loadTrack(currentTrackIndex);
      startAudio();
    });
  }
  
  if (nextTrackBtn) {
    nextTrackBtn.addEventListener("click", () => {
      currentTrackIndex = (currentTrackIndex + 1) % audioPlaylist.length;
      loadTrack(currentTrackIndex);
      startAudio();
    });
  }
  
  audioPlayer.addEventListener("timeupdate", () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById("progress-bar").style.width = progressPercent + "%";
  });
  
  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
  });
  
  // Pour lancer directement la piste au clic sur une card audio
  const directAudioCards = document.querySelectorAll("#audio .media-card");
  directAudioCards.forEach(card => {
    card.addEventListener("click", () => {
      const audioSrc = card.getAttribute("data-audio");
      currentTrackIndex = 0;
      audioPlaylist[0].src = audioSrc;
      loadTrack(currentTrackIndex);
      startAudio();
    });
  });
  
  /* ----------------- Toggle "Voir plus" pour chaque section ----------------- */
  function setupToggle(sectionId, additionalItems, gridSelector, buttonSelector) {
    const section = document.getElementById(sectionId);
    const grid = section.querySelector(gridSelector);
    const button = section.querySelector(buttonSelector);
    let expanded = false;
    // On stocke le nombre d'items initialement affichés
    const initialCount = parseInt(grid.getAttribute("data-initial-count")) || grid.children.length;
    // Optionnel : mélanger aléatoirement la liste supplémentaire
    additionalItems.sort(() => Math.random() - 0.5);
    button.addEventListener("click", () => {
      if (!expanded) {
        additionalItems.forEach(item => {
          const card = document.createElement("div");
          card.classList.add("media-card");
          // Pour la section audio, ajouter data-audio
          if (sectionId === "audio") {
            card.setAttribute("data-audio", item.src);
          }
          if (item.category) {
            card.setAttribute("data-category", item.category);
          }
          const img = document.createElement("img");
          img.src = item.src;
          img.alt = sectionId === "audio" ? "Audio" : sectionId === "videos" ? "Vidéo" : "Photo";
          card.appendChild(img);
          // Appliquer une animation d'apparition
          card.style.opacity = 0;
          grid.appendChild(card);
          setTimeout(() => {
            card.style.transition = "opacity 0.5s";
            card.style.opacity = 1;
          }, 50);
        });
        button.textContent = "Voir moins";
        expanded = true;
      } else {
        const cards = grid.querySelectorAll(".media-card");
        for (let i = cards.length - 1; i >= initialCount; i--) {
          const card = cards[i];
          card.style.transition = "opacity 0.5s";
          card.style.opacity = 0;
          setTimeout(() => { card.remove(); }, 500);
        }
        button.textContent = "Voir plus";
        expanded = false;
      }
    });
  }
  
  // Définissez des tableaux supplémentaires pour chaque section
  const additionalPhotos = [
    { src: "../assets/images/dans-les-murs/Danslesmurs_A22.jpg", category: "interieur" },
    { src: "../assets/images/dans-les-murs/Danslesmurs_A21.jpg", category: "exterieur" },
    { src: "../assets/images/dans-les-murs/Danslesmurs_A29.jpg", category: "interieur" },
    { src: "../assets/images/dans-les-murs/Danslesmurs_A31.jpg", category: "exterieur" }
  ];
  const additionalVideos = [
    { src: "../assets/images/dans-les-murs/Danslesmurs_A27.jpg" },
    { src: "../assets/images/dans-les-murs/Danslesmurs_A28.jpg" },
    { src: "../assets/images/dans-les-murs/Danslesmurs_A33.jpg" }
  ];
  const additionalAudios = [
    { src: "../assets/audio/sample.mp3" },
    { src: "../assets/audio/sample.mp3" },
    { src: "../assets/audio/sample.mp3" }
  ];
  
  // Assurez-vous que dans le HTML, les grilles ont un attribut data-initial-count,
  // par exemple, pour la section Photos :
  // <div class="media-grid photos-grid" data-initial-count="8" ...>
  setupToggle("photos", additionalPhotos, ".photos-grid", "#photos .see-more button");
  setupToggle("videos", additionalVideos, ".videos-grid", "#videos .see-more button");
  setupToggle("audio", additionalAudios, ".audio-grid", "#audio .see-more button");
  
  /* ----------------- GSAP Featured Animation (optionnel) ----------------- */
  gsap.from("#featured .featured-carousel", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: { trigger: "#featured", start: "top 80%" }
  });




