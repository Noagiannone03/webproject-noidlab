document.addEventListener("DOMContentLoaded", () => {
    /* --- Navbar Dropdown --- */
    const menuBtn = document.getElementById("menu-btn");
    const dropdown = document.getElementById("dropdown");
    menuBtn.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
  
    /* --- Section Filter (Photos) --- */
    const filterButtons = document.querySelectorAll("#photos .filter-buttons button");
    const photoCards = document.querySelectorAll(".photos-grid .media-card");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        photoCards.forEach(card => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  
    /* --- Modal pour Média --- */
    const mediaModal = document.getElementById("media-modal");
    const modalMedia = document.getElementById("modal-media");
    const modalClose = document.getElementById("modal-close");
    const modalPrev = document.getElementById("modal-prev");
    const modalNext = document.getElementById("modal-next");
    let currentMediaIndex = 0;
    let currentMediaList = [];
  
    const mediaCards = document.querySelectorAll(".media-grid .media-card");
    mediaCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        openModal(index);
      });
    });
  
    function openModal(index) {
      currentMediaIndex = index;
      currentMediaList = Array.from(document.querySelectorAll(".media-grid .media-card"));
      loadModalMedia(currentMediaList[currentMediaIndex]);
      mediaModal.classList.add("active");
    }
  
    function loadModalMedia(card) {
      const img = card.querySelector("img");
      modalMedia.innerHTML = "";
      if (img) {
        const clone = img.cloneNode();
        clone.style.maxWidth = "100%";
        clone.style.maxHeight = "100%";
        modalMedia.appendChild(clone);
      }
    }
  
    modalClose.addEventListener("click", () => {
      mediaModal.classList.remove("active");
    });
    modalPrev.addEventListener("click", () => {
      currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
      loadModalMedia(currentMediaList[currentMediaIndex]);
    });
    modalNext.addEventListener("click", () => {
      currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
      loadModalMedia(currentMediaList[currentMediaIndex]);
    });
  
    /* --- Music Player --- */
    const playPauseBtn = document.getElementById("play-pause");
    let isPlaying = false;
    playPauseBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      playPauseBtn.textContent = isPlaying ? "Pause" : "Play";
      // Ajoutez ici le contrôle réel de l'audio
    });
  
    const playerOverlay = document.getElementById("player-overlay");
    const openPlayerBtn = document.getElementById("open-player");
    openPlayerBtn.addEventListener("click", () => {
      playerOverlay.style.display = "none";
      // Démarrez la lecture audio si nécessaire
    });
  
    /* --- Featured Section Animation (Exemple avec GSAP) --- */
    gsap.from("#featured .featured-cards", {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#featured",
        start: "top 80%"
      }
    });
  
    /* Vous pouvez ajouter d’autres animations GSAP selon vos besoins */
  });
  