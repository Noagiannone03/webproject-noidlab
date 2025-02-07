  // --- Three.js setup ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'three-canvas';
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 30);

  // Création de la courbe
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(30, 0, 0),
    new THREE.Vector3(15, 7, 0),
    new THREE.Vector3(0, -8, 0),
    new THREE.Vector3(-15, -4, 0),
    new THREE.Vector3(-24, -5, 0),
    new THREE.Vector3(-34, -10, 0),
    new THREE.Vector3(-35, -14, 0)
  ]);
  const tubularSegments = 30000;
  const radius = 0.6;
  const radialSegments = 20;
  const closed = false;
  const tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, closed);
  const totalIndices = tubeGeometry.index.count;
  const minDrawFraction = 0.2;
  const initialDrawCount = Math.floor(totalIndices * minDrawFraction);
  tubeGeometry.setDrawRange(0, initialDrawCount);

  // Couleurs le long du tube
  const colors = [];
  const posAttr = tubeGeometry.attributes.position;
  const startColor = [0, 0, 0.5];
  const endColor = [0, 0.75, 1];
  for (let i = 0, l = posAttr.count; i < l; i++) {
    const t = i / (l - 1);
    const r = startColor[0]*(1-t) + endColor[0]*t;
    const g = startColor[1]*(1-t) + endColor[1]*t;
    const b = startColor[2]*(1-t) + endColor[2]*t;
    colors.push(r, g, b);
  }
  tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const tubeMaterial = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    metalness: 0.1,
    roughness: 0.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1,
    flatShading: true
  });
  const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tubeMesh);

  // Cap arrondi (la "boule")
  const capGeometry = new THREE.SphereGeometry(radius, 16, 16);
  const capMaterial = tubeMaterial.clone();
  const capMesh = new THREE.Mesh(capGeometry, capMaterial);
  scene.add(capMesh);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  function animateScene() {
    requestAnimationFrame(animateScene);
    renderer.render(scene, camera);
  }
  animateScene();

  // --- Gestion du scroll pour la caméra ---
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollable = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = scrollY / scrollable;

    // Accélérer le défilement de la caméra : augmentez les multiplicateurs ici
    const cameraFactor = 1.3; // vous pouvez augmenter cette valeur pour accélérer
    camera.position.y = -30 * scrollRatio * cameraFactor;  // passage de 20 à 30 pour accélérer

    const newCount = initialDrawCount + Math.floor((totalIndices - initialDrawCount) * scrollRatio);
    tubeGeometry.setDrawRange(0, newCount);

    let fraction = scrollRatio <= 0 ? minDrawFraction : minDrawFraction + (1 - minDrawFraction) * scrollRatio;
    const spherePos = curve.getPointAt(fraction);
    capMesh.position.copy(spherePos);
  });

  // GSAP pour animer la caméra avec scrollTrigger (vous pouvez aussi ajuster scrub et duration ici)
  gsap.to(camera.position, {
    y: -15,  // valeur cible (peut être ajustée)
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });


  document.addEventListener("DOMContentLoaded", function() {
    const FORM_ENDPOINT = "https://formspree.io/f/xeoezqea";

    // Animation décryptage pour le titre principal (exécuté dès que #decrypt-title est visible)
    gsap.from("#decrypt-title span", {
      y: -50,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#decrypt-title",
        start: "top 90%",  // commence quand le titre est presque visible
        toggleActions: "play none none reverse"
      }
    });

    // Exemple d'animation pour les bulles (ces animations se déclenchent dès qu'elles entrent dans la zone de vue)
    gsap.utils.toArray(".bubble").forEach(bubble => {
      gsap.to(bubble, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(20, 40)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: bubble,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });
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


  // Gestion de la sélection unique des pillules
document.querySelectorAll('.pill-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.pill-item').forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  });
});


window.onload = function() {
    const horizontalCards = document.querySelector('.horizontal-cards');
    if (horizontalCards) {
      let autoScrollInterval;
  
      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          // Si on atteint la fin, on réinitialise scrollLeft à 0
          if (horizontalCards.scrollLeft + horizontalCards.clientWidth >= horizontalCards.scrollWidth) {
            horizontalCards.scrollLeft = 0;
          } else {
            horizontalCards.scrollLeft += 1; // incrément de 1px (ajustable)
          }
        }, 30); // toutes les 30ms (ajustable pour la vitesse)
      }
  
      function stopAutoScroll() {
        clearInterval(autoScrollInterval);
      }
  
      // Démarrage du défilement automatique
      startAutoScroll();
  
      // Arrêter le défilement lorsque la souris est dans le conteneur, et le reprendre lorsque la souris quitte
      horizontalCards.addEventListener('mouseenter', stopAutoScroll);
      horizontalCards.addEventListener('mouseleave', startAutoScroll);
    }
  };
  
