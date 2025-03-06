    document.addEventListener("DOMContentLoaded", function() {
    const FORM_ENDPOINT = "https://formspree.io/f/xeoezqea";

  



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

    // Gestion du modal et dropdown (reste inchangée)
    const contactBtn = document.getElementById('contact-btn');
    const menuBtn = document.getElementById('menu-btn');
    const dropdown = document.getElementById('dropdown');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('close-modal');

    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });

    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!contactBtn.contains(e.target) && !modalOverlay.contains(e.target) && !menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });



    // Smooth scroll sur clic sur un lien du menu
document.querySelectorAll('.dropdown .menu-card ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Récupère l'ID de la section cible depuis l'attribut href (ex: "#about")
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Ferme le dropdown après clic (si désiré)
    dropdown.classList.remove('active');
  });
});

// Mise à jour de l'item actif en fonction de la section visible
// Assurez-vous que vos sections ont des IDs correspondant aux hrefs
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





    // Envoi du formulaire via Formspree
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert("Message envoyé avec succès !");
          contactForm.reset();
          modalOverlay.classList.remove('active');
        } else {
          alert("Une erreur est survenue, veuillez réessayer.");
        }
      }).catch(error => {
        alert("Une erreur est survenue, veuillez réessayer.");
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

    if (isAlreadyActive) {
      // Désactivation du filtre : réinitialisation de toutes les cards et du conteneur
      document.querySelectorAll('.card-wrapper').forEach(card => {
        card.classList.remove('filtered', 'emphasized');
      });
      horizontalCardsContainer.classList.remove('filter-active');
      // Optionnel : on peut aussi réinitialiser le scroll du container
      horizontalCardsContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Active la pillule sélectionnée
      this.classList.add('active');

      // Appliquer le filtre sur les cards
      document.querySelectorAll('.card-wrapper').forEach(card => {
        if (card.getAttribute('data-category') === selectedCategory) {
          card.classList.remove('filtered');
          card.classList.add('emphasized');
        } else {
          card.classList.remove('emphasized');
          card.classList.add('filtered');
        }
      });

      // Modifier l'alignement du conteneur pour que les éléments filtrés soient à gauche
      horizontalCardsContainer.classList.add('filter-active');

      // Récupérer le premier élément filtré (mis en avant)
      const firstEmphasized = document.querySelector('.card-wrapper.emphasized');
      if (firstEmphasized) {
        // Calcul de la position relative de l'élément par rapport au conteneur
        const containerRect = horizontalCardsContainer.getBoundingClientRect();
        const cardRect = firstEmphasized.getBoundingClientRect();
        // Calcul de la nouvelle position de scroll souhaitée
        const offset = cardRect.left - containerRect.left;
        horizontalCardsContainer.scrollTo({ left: horizontalCardsContainer.scrollLeft + offset, behavior: "smooth" });
      }
    }
  });
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
        alert("Message envoyé avec succès !");
        contactForm.reset();
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    })
    .catch(error => {
      alert("Une erreur est survenue, veuillez réessayer.");
      console.error(error);
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
  
    // Sélection des éléments du modal
    const modalOverlay = document.getElementById('unique-modal-overlay');
    const modalContainer = modalOverlay.querySelector('.unique-modal-container');
    const modalImage = modalOverlay.querySelector('.unique-modal-image img');
    const modalTitle = modalOverlay.querySelector('.unique-modal-title');
    const modalSubtitle = modalOverlay.querySelector('.unique-modal-subtitle');
    const modalDescription = modalOverlay.querySelector('.unique-modal-description');
    const closeModalBtn = modalOverlay.querySelector('.unique-modal-close');
    const prevBtn = modalOverlay.querySelector('.unique-modal-prev');
    const nextBtn = modalOverlay.querySelector('.unique-modal-next');
  
    let modalData = [];
    let currentModalIndex = 0;
  
    cards.forEach((card, index) => {
      modalData.push({
        image: card.getAttribute('data-modal-image') || (card.querySelector('img') ? card.querySelector('img').src : ''),
        title: card.getAttribute('data-modal-title') || (card.querySelector('.card-label') ? card.querySelector('.card-label').innerText : ''),
        subtitle: card.getAttribute('data-modal-subtitle') || '',
        description: card.getAttribute('data-modal-description') || ''
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
  
      modalImage.src = data.image;
      modalTitle.innerText = data.title;
      modalSubtitle.innerText = data.subtitle;
      modalDescription.innerText = data.description;
  
      modalContainer.classList.remove('slide-left', 'slide-right');
      if (animationClass) {
        modalContainer.classList.add(animationClass);
        console.log(`Animation ${animationClass} ajoutée.`);
      }
  
      modalOverlay.classList.remove('hidden');
      modalOverlay.classList.add('active');
      console.log('Modal affiché.');
    }
  
    function closeModal() {
      console.log('Fermeture du modal.');
      modalOverlay.classList.remove('active');
    }
  
    closeModalBtn.addEventListener('click', closeModal);
  
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
      if(e.target === modalOverlay) {
        console.log('Clic sur l\'overlay, fermeture du modal.');
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
let index = 0;



restartAnimation();
setInterval(restartAnimation, 10000);

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
  cardElement.classList.toggle('flipped-custom');
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






// partie pour l'animation des cercles//

