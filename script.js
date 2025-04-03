    document.addEventListener("DOMContentLoaded", function() {
    const FORM_ENDPOINT = "https://formspree.io/f/xeoezqea";





  
      /* Gestion du slider horizontal */
      const horizontalSlider = document.querySelector('.horizontal-slider');
      const indicators = document.querySelectorAll('.indicator');
      const totalPages = 2; // On définit exactement trois pages toggle
    
      function updateIndicators() {
        const pageWidth = horizontalSlider.offsetWidth;
        let index = Math.round(horizontalSlider.scrollLeft / pageWidth);
        // Forcer l'index à ne jamais dépasser le nombre de pages - 1
        index = Math.min(totalPages -1, index);
        indicators.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    
      horizontalSlider.addEventListener('scroll', updateIndicators);
    
      // Permettre le clic sur les indicateurs pour naviguer
      indicators.forEach(dot => {
        dot.addEventListener('click', function() {
          console.log("Clic détecté sur indicator", dot);
          const index = parseInt(dot.getAttribute('data-index'));
          const pageWidth = horizontalSlider.offsetWidth;
          horizontalSlider.scrollTo({
            left: index * pageWidth,
            behavior: 'smooth'
          });
        });
      });
    
      updateIndicators();
    


// Gestion du flip via clic direct sur la carte
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function(e) {
    flipCard(card);
  });
});

// Exemple d'appel depuis un bouton flip (pour mobile par exemple)
document.querySelector('.prestation-slider-controls .prestation-flip')?.addEventListener('click', function(e) {
  e.stopPropagation();
  // Ici, vous pouvez choisir la carte à flipper, par exemple la première carte visible dans le slider
  const currentCard = document.querySelector('.horizontal-slider .flip-card');
  if (currentCard) {
    flipCard(currentCard);
  } else {
    console.error("Aucune carte trouvée pour effectuer le flip.");
  }
});


  

    document.addEventListener("DOMContentLoaded", function() {
      console.log("DOM entièrement chargé");
      const sections = document.querySelectorAll('section');
      console.log("Nombre de sections détectées :", sections.length);
    
      // Utilisez un seuil plus bas pour tester (0.1) afin de faciliter la détection
      const options = { threshold: 0.1 };
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log("Section :", entry.target.id, "isIntersecting :", entry.isIntersecting);
          const circle = entry.target.querySelector('.circle');
          if (!circle) {
            console.log("Aucun élément .circle trouvé dans", entry.target.id);
            return;
          }
          if (entry.isIntersecting) {
            circle.classList.add('active');
            console.log("Ajout de .active sur", entry.target.id);
          } else {
            circle.classList.remove('active');
            console.log("Retrait de .active sur", entry.target.id);
          }
        });
      }, options);
    
      sections.forEach(section => observer.observe(section));
    });
    
    


    // Animation pour la section fusion Stackée & Détails (titre et sous-titre)
    gsap.from(".stack-card.title h1", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".stack-card.title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".stack-card.subtitle h2", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".stack-card.subtitle h2",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".stack-card.subtitle p", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: ".stack-card.subtitle p",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Animation pour la section "Prestations" (titre aligné à gauche)
    gsap.from("#right-title-section h1", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#right-title-section",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // Animation pour la section Tarifs
    gsap.from("#pricing-section h2", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#pricing-section h2",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".pricing-card", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".pricing-card",
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    });
// Gestion du modal et dropdown
const contactBtn = document.getElementById('contact-btn');
const menuBtn = document.getElementById('menu-btn');
const dropdown = document.getElementById('dropdown');
const modalOverlay = document.getElementById('modal-overlay');
const closeModal = document.getElementById('close-modal');
const dropdownOverlay = document.getElementById('dropdown-overlay');

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Ferme le dropdown s'il est ouvert
  dropdown.classList.remove('active');
  // Ferme le dropdown-overlay s'il est ouvert
  dropdownOverlay.classList.remove('active');
  // Ouvre le modal de contact
  modalOverlay.classList.add('active');
  // Bloque le scroll de la page
  document.body.style.overflow = "hidden";
});

menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (
    !contactBtn.contains(e.target) &&
    !modalOverlay.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !dropdown.contains(e.target)
  ) {
    dropdown.classList.remove('active');
  }
});

closeModal.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  // Rétablit le scroll de la page lors de la fermeture du modal
  document.body.style.overflow = "";
});

// Smooth scroll sur clic sur un lien du menu
document.querySelectorAll('.dropdown .menu-card ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Récupère l'ID de la section cible depuis l'attribut href (ex: "#about")
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const additionalOffset = 55; // décalage de 55px
      // On soustrait l'offset pour faire descendre le scroll un peu plus bas
      const yPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - additionalOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
    // Ferme le dropdown après clic (si désiré)
    dropdown.classList.remove('active');
    document.getElementById('dropdown-overlay').classList.remove('active');
  });
});

// Mise à jour de l'item actif en fonction de la section visible
const sections = document.querySelectorAll('section');
const options = { threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.dropdown .menu-card ul li a').forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});




   // Configuration du toast avec SweetAlert2 (assurez-vous d'avoir inclus SweetAlert2 via CDN)
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end', // en bas à gauche
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  fetch(FORM_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      Toast.fire({
        icon: 'success',
        title: 'Message envoyé avec succès !'
      });
      contactForm.reset();
      modalOverlay.classList.remove('active');
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Une erreur est survenue, veuillez réessayer.'
      });
    }
  })
  .catch(error => {
    Toast.fire({
      icon: 'error',
      title: 'Une erreur est survenue, veuillez réessayer.'
    });
    console.error(error);
  });
});


    // Slider Cards : Changement d'image toutes les 6 secondes
    function initSlider(sliderId) {
      const slider = document.getElementById(sliderId);
      const images = slider.querySelectorAll('img');
      let current = 0;
      images.forEach((img, index) => {
        img.style.opacity = (index === 0) ? 1 : 0;
      });
      setInterval(() => {
        gsap.to(images[current], { opacity: 0, duration: 1 });
        current = (current + 1) % images.length;
        gsap.to(images[current], { opacity: 1, duration: 1 });
      }, 6000);
    }
    initSlider('slider-card-1');
    initSlider('slider-card-2');

    // Animation pour la section Slider Cards
    gsap.from("#slider-section h2", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#slider-section h2",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".slider-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".slider-card",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

  });


// Gestion du filtrage et de l'animation lors du clic sur une pillule
const horizontalCardsContainer = document.querySelector('.horizontal-cards');

document.querySelectorAll('.pill-item').forEach(pill => {
  pill.addEventListener('click', function() {
    const selectedCategory = this.getAttribute('data-category');
    const isAlreadyActive = this.classList.contains('active');

    // Réinitialiser l'état de toutes les pillules
    document.querySelectorAll('.pill-item').forEach(el => el.classList.remove('active'));

    if (isAlreadyActive || selectedCategory === "all") {
      // Cas "Toutes" ou désactivation du filtre : on affiche toutes les cards
      document.querySelectorAll('.card-wrapper').forEach(card => {
        card.style.opacity = 0;
        setTimeout(() => {
          card.style.display = "block";
          void card.offsetWidth;
          card.style.opacity = 1;
        }, 500);
      });
      horizontalCardsContainer.classList.remove('filter-active');
      horizontalCardsContainer.scrollTo({ left: 0, behavior: "smooth" });
      // Active la pillule "Toutes"
      document.querySelector('.pill-item[data-category="all"]').classList.add('active');
    } else {
      // Active la pillule sélectionnée
      this.classList.add('active');

      // Filtrer avec animation
      document.querySelectorAll('.card-wrapper').forEach(card => {
        if (card.getAttribute('data-category') === selectedCategory) {
          card.style.display = "block";
          card.style.opacity = 0;
          void card.offsetWidth;
          card.style.opacity = 1;
        } else {
          card.style.opacity = 0;
          setTimeout(() => { card.style.display = "none"; }, 500);
        }
      });
      horizontalCardsContainer.classList.add('filter-active');

      // Ajuster le scroll pour afficher la première carte filtrée
      const visibleCards = Array.from(document.querySelectorAll('.card-wrapper'))
        .filter(card => card.style.display !== "none");
      if (visibleCards.length) {
        const firstVisible = visibleCards[0];
        const containerRect = horizontalCardsContainer.getBoundingClientRect();
        const cardRect = firstVisible.getBoundingClientRect();
        const offset = cardRect.left - containerRect.left;
        horizontalCardsContainer.scrollTo({ left: horizontalCardsContainer.scrollLeft + offset, behavior: "smooth" });
      }
    }
  });
});





 
// Configuration du toast avec SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end', // Position en bas à gauche
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  
  fetch(FORM_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      Toast.fire({
        icon: 'success',
        title: 'Message envoyé avec succès !'
      });
      contactForm.reset();
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Une erreur est survenue, veuillez réessayer.'
      });
    }
  })
  .catch(error => {
    Toast.fire({
      icon: 'error',
      title: 'Une erreur est survenue, veuillez réessayer.'
    });
    console.error(error);
  });
});




//gestion du formulaire de contact dans la section contact


document.addEventListener('DOMContentLoaded', function() {
  const FORM_ENDPOINT = "https://formspree.io/f/xeoezqea";


  // Sélectionnez tous les formulaires de contact via la classe .contact-form
  const contactForms = document.querySelectorAll('.contact-form');
  if (!contactForms.length) {
    console.error("Aucun formulaire de contact trouvé.");
    return;
  }

  // Configuration du toast avec SweetAlert2
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end', // Affiché en bas à droite
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toastElem) => {
      toastElem.onmouseenter = Swal.stopTimer;
      toastElem.onmouseleave = Swal.resumeTimer;
    }
  });

  // Pour chaque formulaire de contact, attacher un gestionnaire de soumission
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      // Envoi du formulaire via Formspree (ou votre endpoint défini dans FORM_ENDPOINT)
      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          Toast.fire({
            icon: 'success',
            title: 'Message envoyé avec succès !'
          });
          form.reset();
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Une erreur est survenue, veuillez réessayer.'
          });
        }
      })
      .catch(error => {
        Toast.fire({
          icon: 'error',
          title: 'Une erreur est survenue, veuillez réessayer.'
        });
        console.error(error);
      });
    });
  });
});



  document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM entièrement chargé.');
  
    // Sélection des cards
    const cards = document.querySelectorAll('.card-wrapper');
    console.log(`Nombre de cards trouvées : ${cards.length}`);
  
    // Sélection de l'overlay du modal
    const modalOverlay = document.getElementById('unique-modal-overlay');
  
    let modalData = [];
    let currentModalIndex = 0;
  
    // Récupération des données de chaque card
    cards.forEach((card, index) => {
      modalData.push({
        image: card.getAttribute('data-modal-image') || (card.querySelector('img') ? card.querySelector('img').src : ''),
        title: card.getAttribute('data-modal-title') || (card.querySelector('.card-label') ? card.querySelector('.card-label').innerText : ''),
        subtitle: card.getAttribute('data-modal-subtitle') || '',
        description: card.getAttribute('data-modal-description') || '',
        footerList: card.getAttribute('data-modal-footer-list') || ''
      });
      console.log(`Card ${index + 1} :`, modalData[index]);
  
      card.addEventListener('click', () => {
        currentModalIndex = index;
        console.log(`Card ${index + 1} cliquée. Ouverture du modal...`);
        openModal(modalData[currentModalIndex]);
      });
    });
  
    function openModal(data, animationClass = '') {
      console.log('openModal() appelé avec les données :', data);
      // Détecte la version mobile (largeur ≤600px)
      const isMobile = window.innerWidth <= 600;
      
      if (isMobile) {
        // Mise à jour de la version mobile
        const mobileContainer = modalOverlay.querySelector('.modal-mobile');
        const headerTitle = mobileContainer.querySelector('.modal-header .header-left h2');
        const headerSubtitle = mobileContainer.querySelector('.modal-header .header-left h4');
        const scrollableImage = mobileContainer.querySelector('.unique-modal-scrollable .unique-modal-image img');
        const scrollableDescription = mobileContainer.querySelector('.unique-modal-scrollable .unique-modal-text .unique-modal-description');
        const scrollableFooterList = mobileContainer.querySelector('.unique-modal-scrollable .unique-modal-text .unique-modal-footer-text');
  
        headerTitle.innerText = data.title;
        headerSubtitle.innerText = data.subtitle;
        scrollableImage.src = data.image;
        scrollableDescription.innerText = data.description;
  
        if (data.footerList) {
          const items = data.footerList.split(';');
          scrollableFooterList.innerHTML = items.map(item => `<li>${item.trim()}</li>`).join('');
        } else {
          scrollableFooterList.innerHTML = '';
        }
  
        mobileContainer.classList.remove('slide-left', 'slide-right');
        if (animationClass) {
          mobileContainer.classList.add(animationClass);
          console.log(`Animation ${animationClass} ajoutée (mobile).`);
        }
      } else {
        // Mise à jour de la version desktop
        const desktopContainer = modalOverlay.querySelector('.modal-desktop');
        const desktopImage = desktopContainer.querySelector('.unique-modal-image img');
        const desktopTitle = desktopContainer.querySelector('.unique-modal-text .unique-modal-title');
        const desktopSubtitle = desktopContainer.querySelector('.unique-modal-text .unique-modal-subtitle');
        const desktopDescription = desktopContainer.querySelector('.unique-modal-text .unique-modal-description');
        const desktopFooterList = desktopContainer.querySelector('.unique-modal-text .unique-modal-footer-text');
  
        desktopImage.src = data.image;
        desktopTitle.innerText = data.title;
        desktopSubtitle.innerText = data.subtitle;
        desktopDescription.innerText = data.description;
  
        if (data.footerList) {
          const items = data.footerList.split(';');
          desktopFooterList.innerHTML = items.map(item => `<li>${item.trim()}</li>`).join('');
        } else {
          desktopFooterList.innerHTML = '';
        }
  
        desktopContainer.classList.remove('slide-left', 'slide-right');
        if (animationClass) {
          desktopContainer.classList.add(animationClass);
          console.log(`Animation ${animationClass} ajoutée (desktop).`);
        }
      }
  
      modalOverlay.classList.remove('hidden');
      modalOverlay.classList.add('active');
      
      // Bloquer le scroll de la page
      document.body.style.overflow = "hidden";
      
      console.log('Modal affiché.');
    }
  
    function closeModal() {
      console.log('Fermeture du modal.');
      modalOverlay.classList.remove('active');
      
      // Rétablir le scroll de la page
      document.body.style.overflow = "";
    }
  
    // Ajoute l'événement sur tous les boutons de fermeture (mobile et desktop)
    modalOverlay.querySelectorAll('.unique-modal-close').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
  
    const prevBtn = modalOverlay.querySelector('.unique-modal-prev');
    const nextBtn = modalOverlay.querySelector('.unique-modal-next');
  
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentModalIndex > 0) {
        currentModalIndex--;
        console.log(`Navigation vers la card précédente, index : ${currentModalIndex}`);
        openModal(modalData[currentModalIndex], 'slide-right');
      }
    });
  
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentModalIndex < modalData.length - 1) {
        currentModalIndex++;
        console.log(`Navigation vers la card suivante, index : ${currentModalIndex}`);
        openModal(modalData[currentModalIndex], 'slide-left');
      }
    });
  
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        console.log("Clic sur l'overlay, fermeture du modal.");
        closeModal();
      }
    });
  });
  

  
  document.addEventListener("DOMContentLoaded", () => {
    /* Animation des compteurs (stats) */
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const duration = 3000; // Durée totale du comptage (ms)
      const frameRate = 60;
      const totalFrames = Math.round(duration / (1000 / frameRate));
      const increment = target / totalFrames;
      let highlightTriggered = false;
  
      const updateCount = () => {
        count += increment;
        // Affichage formaté avec espace pour séparer les milliers
        let formatted = Math.floor(count).toLocaleString('fr-FR');
        stat.textContent = formatted;
  
        if (!highlightTriggered && count >= target / 2) {
          setTimeout(() => {
            stat.classList.add('highlight');
          }, index * 300);
          highlightTriggered = true;
        }
        if(count < target) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target.toLocaleString('fr-FR');
          if (!highlightTriggered) {
            stat.classList.add('highlight');
          }
        }
      };
      updateCount();
    });
  


    
    /* Slider Flash News avec drag, pause et seuil réduit */
    const slider = document.querySelector('.flash-news-slider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const newsItems = document.querySelectorAll('.flash-news-slider .news-item');
    const totalItems = newsItems.length;
    let currentIndex = 0;
    let autoSlideInterval;
    let index = 0;
    // Variables pour le drag
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
  
    function goToSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
      prevTranslate = -index * slider.offsetWidth;
      currentTranslate = prevTranslate;
    }
  
    // Auto-slide : redémarre le défilement automatique
    function resumeAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % totalItems;
        goToSlide(nextIndex);
      }, 5000);
    }
  
    function pauseAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    resumeAutoSlide();
  
    // Fonctions de gestion du drag
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function touchStart(event) {
      isDragging = true;
      startPos = getPositionX(event);
      pauseAutoSlide();
      slider.classList.add('grabbing');
      animationID = requestAnimationFrame(animation);
    }
  
    function touchMove(event) {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startPos;
      currentTranslate = prevTranslate + diff;
    }
  
    function touchEnd() {
      isDragging = false;
      slider.classList.remove('grabbing');
      cancelAnimationFrame(animationID);
      const movedBy = currentTranslate - prevTranslate;
      // Seuil réduit : par exemple, un sixième de la largeur du slider
      const threshold = slider.offsetWidth / 9;
      if (movedBy < -threshold && currentIndex < totalItems - 1) {
        currentIndex += 1;
      }
      if (movedBy > threshold && currentIndex > 0) {
        currentIndex -= 1;
      }
      goToSlide(currentIndex);
      resumeAutoSlide();
    }
  
    function animation() {
      slider.style.transform = `translateX(${currentTranslate}px)`;
      if (isDragging) requestAnimationFrame(animation);
    }
  
    // Événements souris
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
  
    // Événements tactiles
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);
  
    // Pause auto-slide lors du survol et reprise à la sortie
    slider.addEventListener('mouseenter', pauseAutoSlide);
    slider.addEventListener('mouseleave', resumeAutoSlide);
  
    // Gestion des clics sur les dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
        resumeAutoSlide();
      });
    });
  });
  


 // Déclare index dès le début pour éviter le problème de temporal dead zone



// Carousel et positionnement 3D
const cardElements = document.querySelectorAll(".card-custom");
const totalCards = cardElements.length; // Nombre réel de cartes
const carousel = document.querySelector(".carousel-custom");
const angleIncrement = 360 / totalCards;
const distance = 350;

// Positionner chaque carte dans l'espace 3D
cardElements.forEach((card, i) => {
  card.style.transform = `rotateY(${i * angleIncrement}deg) translateZ(${distance}px)`;
});

function moveCarousel(direction) {
  index += direction;
  if (index < 0) index = totalCards - 1;
  if (index >= totalCards) index = 0;
  updateCarousel();
}

function updateCarousel() {
  const angle = -index * angleIncrement;
  carousel.style.transform = `rotateY(${angle}deg)`;
}

// Fonction pour l'effet flip sur une carte
function flipCard(cardElement) {
  // Si la carte cliquée est déjà retournée, on la déflippe et on quitte la fonction
  if (cardElement.classList.contains('flipped-custom')) {
    cardElement.classList.remove('flipped-custom');
    return;
  }
  // Sinon, on déflippe toutes les cartes puis on retourne celle-ci
  cardElements.forEach(card => card.classList.remove('flipped-custom'));
  cardElement.classList.add('flipped-custom');
}


// Fonctions lightbox (si besoin)
function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox-custom");
  const lightboxImage = document.getElementById("lightbox-img-custom");
  lightboxImage.src = imageSrc;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox-custom");
  lightbox.style.display = "none";
}



//CHANGEMENT DES IMAGES DANS LA PARTIE MEDIA//
console.log("DOM fully loaded and parsed");
  
// Vérifie qu'il y a bien des images dans la grille
const initialImages = document.querySelectorAll('.gallery-card img');
console.log("Found images:", initialImages.length);

// Remplacement aléatoire d'une image toutes les 3 secondes
setInterval(() => {
  console.log("setInterval tick");
  const images = document.querySelectorAll('.gallery-card img');
  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgElement = images[randomIndex];
    
    // Tableau des chemins d'images locales disponibles
    const assetImages = [
      "assets/images/dans-les-murs/Danslesmurs_A12.jpg",
      "assets/images/hors-les-murs/53-event-noid.jpg",
      "assets/images/hors-les-murs/57-event-noid.jpg",
      "assets/images/hors-les-murs/74-event-noid.jpg",
      "assets/images/hors-les-murs/2-event-noid.jpg",
      "assets/images/hors-les-murs/19-event-noid.jpg",
      "assets/images/hors-les-murs/36-event-noid.jpg",
      "assets/images/hors-les-murs/53-event-noid.jpg",
      "assets/images/hors-les-murs/75-event-noid.jpg",
      "assets/images/dans-les-murs/Danslesmurs_4.jpg",
      "assets/images/dans-les-murs/Danslesmurs_A25.jpg",
      "assets/images/dans-les-murs/Danslesmurs_A36.jpg",
      "assets/images/hors-les-murs/1-event-noid.jpg",
"assets/images/hors-les-murs/2-event-noid.jpg",
"assets/images/hors-les-murs/3-event-noid.jpg",
"assets/images/hors-les-murs/4-event-noid.jpg",
"assets/images/hors-les-murs/5-event-noid.jpg",
"assets/images/hors-les-murs/6-event-noid.jpg",
"assets/images/hors-les-murs/7-event-noid.jpg",
"assets/images/hors-les-murs/8-event-noid.jpg",
"assets/images/hors-les-murs/9-event-noid.jpg",
"assets/images/hors-les-murs/10-event-noid.jpg",
"assets/images/hors-les-murs/11-event-noid.jpg",
"assets/images/hors-les-murs/12-event-noid.jpg",
"assets/images/hors-les-murs/13-event-noid.jpg",
"assets/images/hors-les-murs/14-event-noid.jpg",
"assets/images/hors-les-murs/15-event-noid.jpg",
"assets/images/hors-les-murs/16-event-noid.jpg",
"assets/images/hors-les-murs/17-event-noid.jpg",
"assets/images/hors-les-murs/18-event-noid.jpg",
"assets/images/hors-les-murs/19-event-noid.jpg",
"assets/images/hors-les-murs/20-event-noid.jpg",
"assets/images/hors-les-murs/21-event-noid.jpg",
"assets/images/hors-les-murs/22-event-noid.jpg",
"assets/images/hors-les-murs/23-event-noid.jpg",
"assets/images/hors-les-murs/24-event-noid.jpg",
"assets/images/hors-les-murs/25-event-noid.jpg",
"assets/images/hors-les-murs/26-event-noid.jpg",
"assets/images/hors-les-murs/27-event-noid.jpg",
"assets/images/hors-les-murs/28-event-noid.jpg",
"assets/images/hors-les-murs/29-event-noid.jpg",
"assets/images/hors-les-murs/30-event-noid.jpg",
"assets/images/hors-les-murs/31-event-noid.jpg",
"assets/images/hors-les-murs/32-event-noid.jpg",
"assets/images/hors-les-murs/33-event-noid.jpg",
"assets/images/hors-les-murs/34-event-noid.jpg",
"assets/images/hors-les-murs/35-event-noid.jpg",
"assets/images/hors-les-murs/36-event-noid.jpg",
"assets/images/hors-les-murs/37-event-noid.jpg",
"assets/images/hors-les-murs/38-event-noid.jpg",
"assets/images/hors-les-murs/39-event-noid.jpg",
"assets/images/hors-les-murs/40-event-noid.jpg",
"assets/images/hors-les-murs/41-event-noid.jpg",
"assets/images/hors-les-murs/42-event-noid.jpg",
"assets/images/hors-les-murs/43-event-noid.jpg",
"assets/images/hors-les-murs/44-event-noid.jpg",
"assets/images/hors-les-murs/45-event-noid.jpg",
"assets/images/hors-les-murs/46-event-noid.jpg",
"assets/images/hors-les-murs/47-event-noid.jpg",
"assets/images/hors-les-murs/48-event-noid.jpg",
"assets/images/hors-les-murs/49-event-noid.jpg",
"assets/images/hors-les-murs/50-event-noid.jpg",
"assets/images/hors-les-murs/51-event-noid.jpg",
"assets/images/hors-les-murs/52-event-noid.jpg",
"assets/images/hors-les-murs/53-event-noid.jpg",
"assets/images/hors-les-murs/54-event-noid.jpg",
"assets/images/hors-les-murs/55-event-noid.jpg",
"assets/images/hors-les-murs/56-event-noid.jpg",
"assets/images/hors-les-murs/57-event-noid.jpg",
"assets/images/hors-les-murs/58-event-noid.jpg",
"assets/images/hors-les-murs/59-event-noid.jpg",
"assets/images/hors-les-murs/60-event-noid.jpg",
"assets/images/hors-les-murs/61-event-noid.jpg",
"assets/images/hors-les-murs/62-event-noid.jpg",
"assets/images/hors-les-murs/63-event-noid.jpg",
"assets/images/hors-les-murs/64-event-noid.jpg",
"assets/images/hors-les-murs/65-event-noid.jpg",
"assets/images/hors-les-murs/66-event-noid.jpg",
"assets/images/hors-les-murs/67-event-noid.jpg",
"assets/images/hors-les-murs/68-event-noid.jpg",
"assets/images/hors-les-murs/69-event-noid.jpg",
"assets/images/hors-les-murs/70-event-noid.jpg",
"assets/images/hors-les-murs/71-event-noid.jpg",
"assets/images/hors-les-murs/72-event-noid.jpg",
"assets/images/hors-les-murs/73-event-noid.jpg",
"assets/images/hors-les-murs/74-event-noid.jpg",
"assets/images/hors-les-murs/75-event-noid.jpg",
"assets/images/hors-les-murs/76-event-noid.jpg",
"assets/images/hors-les-murs/77-event-noid.jpg",
"assets/images/hors-les-murs/78-event-noid.jpg",
"assets/images/hors-les-murs/79-event-noid.jpg",
"assets/images/hors-les-murs/80-event-noid.jpg",
"assets/images/hors-les-murs/81-event-noid.jpg",
"assets/images/hors-les-murs/82-event-noid.jpg",
"assets/images/hors-les-murs/83-event-noid.jpg",
"assets/images/hors-les-murs/84-event-noid.jpg",
"assets/images/hors-les-murs/85-event-noid.jpg",
"assets/images/hors-les-murs/86-event-noid.jpg",
"assets/images/hors-les-murs/87-event-noid.jpg",
"assets/images/hors-les-murs/88-event-noid.jpg",
"assets/images/hors-les-murs/89-event-noid.jpg",
"assets/images/hors-les-murs/90-event-noid.jpg",
"assets/images/hors-les-murs/91-event-noid.jpg",
"assets/images/hors-les-murs/92-event-noid.jpg",
"assets/images/hors-les-murs/93-event-noid.jpg",
"assets/images/hors-les-murs/94-event-noid.jpg",
"assets/images/hors-les-murs/96-event-noid.jpg",
"assets/images/hors-les-murs/97-event-noid.jpg",
"assets/images/hors-les-murs/98-event-noid.jpg",
"assets/images/hors-les-murs/99-event-noid.jpg"

    ];
    const randomAssetIndex = Math.floor(Math.random() * assetImages.length);
    const newImageSrc = assetImages[randomAssetIndex];

    // Message de débogage pour vérifier le changement
    console.log("Changement de l'image:", imgElement.src, "->", newImageSrc);

    imgElement.classList.add('fade-out');
    setTimeout(() => {
      imgElement.src = newImageSrc;
      imgElement.classList.remove('fade-out');
      imgElement.classList.add('fade-in');
      setTimeout(() => {
        imgElement.classList.remove('fade-in');
      }, 500);
    }, 500);
  } else {
    console.log("Aucune image trouvée dans .gallery-card img");
  }
}, 3000);




//FONCTION INCONNU A REVERIFIER//

var gallerySlider = new Swiper(".mySwiper", {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 1,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 600,
  slideToClickedSlide: true,
  on: {
    click: function () {
      setTimeout(() => {
        this.update(); // Forcer la mise à jour après un clic
      }, 100);
    },
  }
});



document.getElementById('menu-btn').addEventListener('click', function() {
  this.classList.toggle('active');
  document.getElementById('dropdown-overlay').classList.toggle('active');
});


// Fermer le dropdown (par exemple, via un bouton de fermeture ou en cliquant sur l'overlay)
document.getElementById('dropdown-overlay').addEventListener('click', function() {
  document.getElementById('dropdown').classList.remove('active');
  this.classList.remove('active');
});


//FONCTION POUR AFFICHER LES ICONES DANS LES DIFFERENTES SECTIONS QUAND ON SE TROUVE DESSUS//

const sections = document.querySelectorAll('.observed-section');
const options = { threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const circle = entry.target.querySelector('.circle');
    if (!circle) return;
    
    if (entry.isIntersecting) {
      // Lors de l'entrée, on récupère l'URL de l'image et on lance l'animation d'entrée.
      const iconUrl = circle.getAttribute('data-icon');
      circle.style.backgroundImage = `url('${iconUrl}')`;
      // Si l'élément avait déjà une classe bounce-out, on la retire.
      circle.classList.remove('bounce-out');
      circle.classList.add('active');
    } else {
      // Lors de la sortie, on retire la classe active et on ajoute bounce-out.
      if (circle.classList.contains('active')) {
        circle.classList.remove('active');
        circle.classList.add('bounce-out');
        // Au terme de l'animation, on réinitialise le background et on retire bounce-out.
        circle.addEventListener('animationend', function handler() {
          circle.style.backgroundImage = '';
          circle.classList.remove('bounce-out');
          circle.removeEventListener('animationend', handler);
        });
      }
    }
  });
}, options);

sections.forEach(section => observer.observe(section));







function initMap() {
  // Coordonnées des deux points (à adapter selon vos besoins)
  const point1 = { lat: 43.1242, lng: 5.9280 };
  const point2 = { lat: 43.1300, lng: 5.9400 };

  // Création de la carte centrée sur le premier point (la position initiale n'est pas critique ici)
  const map = new google.maps.Map(document.getElementById("map"), {
    center: point1,
    zoom: 13,
    // Style personnalisé pour masquer les points d'intérêt
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      }
    ]
  });

  // Ajout des marqueurs
  new google.maps.Marker({
    position: point1,
    map: map,
    title: "Point 1"
  });
  new google.maps.Marker({
    position: point2,
    map: map,
    title: "Point 2"
  });

  // Ajustement automatique du zoom pour afficher les deux points
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(point1);
  bounds.extend(point2);
  map.fitBounds(bounds);
}
















  const filterToggle = document.querySelector('.filter-toggle');
  const filterOptions = document.querySelector('.filter-options');


  
  if (filterToggle && filterOptions) {
    filterToggle.addEventListener('click', function() {
      // Toggle l'affichage des options
      if (filterOptions.style.display === "block") {
        filterOptions.style.display = "none";
        filterToggle.parentElement.classList.remove("open");
      } else {
        filterOptions.style.display = "block";
        filterToggle.parentElement.classList.add("open");
      }
    });
    
    // Lorsqu'une option est cliquée
    document.querySelectorAll('.filter-option').forEach(option => {
      option.addEventListener('click', function() {
        // Récupérer la catégorie sélectionnée
        const category = this.getAttribute('data-category');
        // Mettre à jour le texte du bouton
        filterToggle.innerHTML = this.textContent + ' <span class="chevron">&#x25BC;</span>';
        // Fermer les options
        filterOptions.style.display = "none";
        filterToggle.parentElement.classList.remove("open");
        // Appliquer le filtre sur vos cartes (vous adapterez ce code à votre logique existante)
        // Par exemple, pour toutes les cartes dans .horizontal-cards :
        const cards = document.querySelectorAll('.horizontal-cards .card-wrapper');
        cards.forEach(card => {
          if (category === "all" || card.getAttribute('data-category') === category) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }



  document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que le conteneur des contrôles de slider mobile est présent
    const mobileSliderControls = document.querySelector('.mobile-slider-controls');
    if (!mobileSliderControls) {
      console.log("Mobile slider controls non trouvés : script de défilement non activé.");
      return;
    }
    
    const sliderContainer = document.querySelector('.horizontal-cards');
    const prevBtn = mobileSliderControls.querySelector('.prev');
    const nextBtn = mobileSliderControls.querySelector('.next');
    
    // Vérifier que les éléments existent bien
    if (!sliderContainer || !prevBtn || !nextBtn) return;
    
    // Calculer la largeur d'une carte (incluant la marge droite)
    const firstCard = sliderContainer.querySelector('.card-wrapper');
    let cardWidth = 0;
    if (firstCard) {
      const cardStyles = window.getComputedStyle(firstCard);
      cardWidth = firstCard.offsetWidth + parseFloat(cardStyles.marginRight || 0);
    }
    console.log("Largeur d'une carte :", cardWidth);
    
    // Attacher l'événement pour défiler vers la gauche
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sliderContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    // Attacher l'événement pour défiler vers la droite
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sliderContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  });





  document.addEventListener('DOMContentLoaded', function() {
    // Pour mobile uniquement (ajustez la condition si nécessaire)
    if (window.innerWidth > 480) return;
  
    const sliderContainer = document.querySelector('.horizontal-slider');
    const prevBtn = document.querySelector('.prestation-slider-controls .prestation-prev');
    const nextBtn = document.querySelector('.prestation-slider-controls .prestation-next');
    const flipBtn = document.querySelector('.prestation-slider-controls .prestation-flip');
  
    if (!sliderContainer || !prevBtn || !nextBtn || !flipBtn) return;
  
    // Calculer la largeur d'une carte
    const firstCard = sliderContainer.querySelector('.flip-card');
    let cardWidth = 0;
    if (firstCard) {
      const cardStyles = window.getComputedStyle(firstCard);
      cardWidth = firstCard.getBoundingClientRect().width + parseFloat(cardStyles.marginRight || 0);
    }
    console.log("Largeur d'une carte :", cardWidth);
  
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sliderContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sliderContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  
    flipBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Sélectionne la carte actuellement visible (ou la première carte du conteneur)
      const currentCard = sliderContainer.querySelector('.flip-card');
      if (currentCard && typeof flipCard === "function") {
        flipCard(currentCard);
      } else {
        console.error("Aucune carte trouvée ou fonction flipCard introuvable");
      }
    });
  });
  
  




  document.addEventListener("DOMContentLoaded", function() {
    // Exécuter uniquement en mobile (≤480px)
    if (window.innerWidth > 480) return;
    
    const sliderContainer = document.querySelector('.horizontal-slider');
    const flipBtn = document.querySelector('.prestation-slider-controls .prestation-flip');
    
    if (!sliderContainer || !flipBtn) return;
    
    // Fonction qui retourne la carte la plus visible dans le slider
    function getCurrentVisibleCard() {
      const cards = sliderContainer.querySelectorAll('.flip-card');
      const containerRect = sliderContainer.getBoundingClientRect();
      let bestCard = null;
      let maxVisible = 0;
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const visibleLeft = Math.max(cardRect.left, containerRect.left);
        const visibleRight = Math.min(cardRect.right, containerRect.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        if (visibleWidth > maxVisible) {
          maxVisible = visibleWidth;
          bestCard = card;
        }
      });
      return bestCard;
    }
    
    // Fonction flipCard qui retire le flip des autres avant d'appliquer sur la carte cible
    function flipCard(card) {
      if (!card.classList.contains('flipped')) {
        // Déflippe toutes les cartes
        sliderContainer.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
        card.classList.add('flipped');
      } else {
        card.classList.remove('flipped');
      }
      console.log("Flip toggled on card:", card);
    }
    
    // Gestion du clic sur chaque carte pour un flip direct
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function(e) {
        e.stopPropagation();
        flipCard(card);
      });
    });
    
    // Bouton flip : retourne la carte la plus visible dans le slider
    flipBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      let currentCard = getCurrentVisibleCard();
      // Si aucune carte n'est détectée, on prend la première
      if (!currentCard) {
        currentCard = sliderContainer.querySelector('.flip-card');
      }
      if (currentCard) {
        flipCard(currentCard);
      } else {
        console.error("Aucune carte trouvée pour effectuer le flip.");
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Exécuter uniquement sur mobile (max-width: 480px)
    if (window.innerWidth > 480) return;
    
    const cardsContainer = document.querySelector('.slider-cards');
    if (!cardsContainer) return;
    
    // Utilisation de la délégation d'événements sur le conteneur des cartes
    cardsContainer.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const card = e.target.closest('.slider-card');
      if (!card) return;
      
      // Si la carte n'est pas déjà active, fermer les autres et activer celle-ci
      if (!card.classList.contains('active')) {
        cardsContainer.querySelectorAll('.slider-card.active').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
      // Si la carte est déjà active, on ne fait rien.
    });
    
    // Fermer les cartes actives si l'utilisateur clique en dehors
    document.addEventListener('click', function() {
      cardsContainer.querySelectorAll('.slider-card.active').forEach(card => {
        card.classList.remove('active');
      });
    });
  });
  
  

  document.addEventListener("DOMContentLoaded", function() {
    // Détecte si l'appareil supporte le touch (mobile)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      // Création d'une balise <style> pour injecter des règles spécifiques
      const style = document.createElement('style');
      style.innerText = `
        /* Désactiver les effets hover sur mobile */
        *:hover {
          transition: none !important;
        }
        
        /* Supprimer le surlignage bleu lors d'un tap sur mobile */
        * {
          -webkit-tap-highlight-color: transparent !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `;
      document.head.appendChild(style);
    }
  });
  