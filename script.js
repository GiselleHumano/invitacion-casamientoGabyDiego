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
const btnCopyAlias = document.getElementById('btn-copy-alias');
const copyMessage = document.getElementById('copy-message');

if (btnCopyAlias) {
  btnCopyAlias.addEventListener('click', () => {
    const aliasEl = document.getElementById('alias-text');
    if (aliasEl) {
      const aliasText = aliasEl.innerText;
      navigator.clipboard.writeText(aliasText).then(() => {
        if (copyMessage) copyMessage.classList.add('show');
        setTimeout(() => {
          if (copyMessage) copyMessage.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Error al copiar: ', err);
      });
    }
  });
}

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