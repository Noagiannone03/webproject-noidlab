document.addEventListener("DOMContentLoaded", () => {
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
  const filterButtons = document.querySelectorAll(".filter-buttons button");
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

  /* ----------------- Modal for Media ----------------- */
  const mediaModal = document.getElementById("media-modal");
  const modalMedia = document.getElementById("modal-media");
  const modalClose = document.getElementById("modal-close");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  let currentMediaIndex = 0;
  let currentMediaList = [];

  const mediaCards = document.querySelectorAll(".media-grid .media-card");
  mediaCards.forEach((card, index) => {
    // Pour les sections autres que Audio, ouvrir le modal
    if (card.closest("#audio")) return;
    card.addEventListener("click", () => { 
      currentMediaIndex = index;
      currentMediaList = Array.from(document.querySelectorAll(".media-grid .media-card"));
      loadModalMedia(currentMediaList[currentMediaIndex]);
      mediaModal.classList.add("active");
    });
  });

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

  if (modalClose) {
    modalClose.addEventListener("click", () => { 
      mediaModal.classList.remove("active"); 
    });
  }
  if (modalPrev) {
    modalPrev.addEventListener("click", () => {
      currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
      loadModalMedia(currentMediaList[currentMediaIndex]);
    });
  }
  if (modalNext) {
    modalNext.addEventListener("click", () => {
      currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
      loadModalMedia(currentMediaList[currentMediaIndex]);
    });
  }

  /* ----------------- Image aléatoire pour la section Featured Background ----------------- */
  const bgImages = ["44-event-noid.jpg", "18-event-noid.jpg", "28-event-noid.jpg", "39-event-noid.jpg"];
  const randIndex = Math.floor(Math.random() * bgImages.length);
  const chosenImage = bgImages[randIndex];
  const randomImageElem = document.getElementById("randomImage");
  if (randomImageElem) {
    randomImageElem.src = "../assets/images/" + chosenImage;
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
    { src: "../assets/images/Danslesmurs_A22.jpg", category: "interieur" },
    { src: "../assets/images/Danslesmurs_A21.jpg", category: "exterieur" },
    { src: "../assets/images/Danslesmurs_A29.jpg", category: "interieur" },
    { src: "../assets/images/Danslesmurs_A31.jpg", category: "exterieur" }
  ];
  const additionalVideos = [
    { src: "../assets/images/Danslesmurs_A27.jpg" },
    { src: "../assets/images/Danslesmurs_A28.jpg" },
    { src: "../assets/images/Danslesmurs_A33.jpg" }
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
});



