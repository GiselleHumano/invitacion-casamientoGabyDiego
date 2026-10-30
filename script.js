// ==========================================
// 1. CONTADOR REGRESIVO
// ==========================================
const targetDate = new Date("January 16, 2027 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, "0");
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// 2. MANEJO DE MÚSICA Y MODAL
// ==========================================
const bgMusic = document.getElementById('bg-music');
const musicModal = document.getElementById('music-modal');
const btnPlay = document.getElementById('btn-play-music');
const btnSkip = document.getElementById('btn-skip-music');
const musicToggle = document.getElementById('music-toggle');

let isPlaying = false;

if (btnPlay && bgMusic && musicModal && musicToggle) {
  btnPlay.addEventListener('click', () => {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('is-playing');
    }).catch(err => console.log("Error al reproducir audio:", err));

    musicModal.style.display = 'none';
    musicToggle.style.display = 'flex';
  });
}

if (btnSkip && musicModal && musicToggle) {
  btnSkip.addEventListener('click', () => {
    musicModal.style.display = 'none';
    musicToggle.style.display = 'flex';
  });
}

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicToggle.classList.remove('is-playing');
      musicToggle.style.opacity = '0.7';
    } else {
      bgMusic.play();
      isPlaying = true;
      musicToggle.classList.add('is-playing');
      musicToggle.style.opacity = '1';
    }
  });
}

// ==========================================
// 3. COPIAR ALIAS AL PORTAPAPELES
// ==========================================
const copyButtons = document.querySelectorAll('.btn-copy');
const copyMessage = document.getElementById('copy-message');

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const alias = button.getAttribute('data-alias');
    
    navigator.clipboard.writeText(alias).then(() => {
      // Muestra el mensaje
      copyMessage.style.display = 'block';
      
      // Lo oculta a los 2 segundos
      setTimeout(() => {
        copyMessage.style.display = 'none';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  });
});
// ==========================================
// 4. CARRUSEL DE INSTAGRAM
// ==========================================
const track = document.getElementById('carousel-track');
if (track) {
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('next-slide');
  const prevButton = document.getElementById('prev-slide');
  const dotsNav = document.getElementById('carousel-dots');
  const dots = dotsNav ? Array.from(dotsNav.children) : [];

  let currentIndex = 0;

  function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel(currentIndex);
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(currentIndex);
    });
  }
}

// ==========================================
// 5. BOTÓN VOLVER AL INICIO
// ==========================================
const btnBackToTop = document.getElementById('btn-back-to-top');

if (btnBackToTop) {
  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos los elementos principales de toda la web que querés que aparezcan con scroll
  // (Podés agregar o quitar etiquetas de esta lista según lo que tenga tu HTML)
  const elementosAGuiar = document.querySelectorAll('section, article, .gifts-card, .bank-details-box, h2, img');

  // Les agregamos la clase 'reveal' de forma automática a todos
  elementosAGuiar.forEach(el => {
    el.classList.add('reveal');
  });

  // Configuramos el observador
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se dispara cuando el 15% del elemento es visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Dejamos de observarlo una vez que ya apareció para optimizar rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Ponemos a observar cada elemento
  elementosAGuiar.forEach(el => {
    observer.observe(el);
  });
});