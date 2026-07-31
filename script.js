// Happy Girlfriend's Day - Ndagire Agatha

document.addEventListener('DOMContentLoaded', () => {
  // Background Photo Cross-Fade Slideshow Engine
  const bgSlides = document.querySelectorAll('.bg-slide');
  let currentBgIdx = 0;

  function cycleBackgroundSlides() {
    if (bgSlides.length === 0) return;
    bgSlides[currentBgIdx].classList.remove('active');
    currentBgIdx = (currentBgIdx + 1) % bgSlides.length;
    bgSlides[currentBgIdx].classList.add('active');
  }

  setInterval(cycleBackgroundSlides, 5000);

  // Canvas Heart & Sparkle Particle Engine
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    fwWidth = fwCanvas.width = window.innerWidth;
    fwHeight = fwCanvas.height = window.innerHeight;
  });

  class HeartParticle {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height - height;
      this.size = Math.random() * 14 + 6;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 4 + 2;
      this.color = `hsl(${Math.random() * 40 + 330}, 100%, 65%)`;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 6 - 3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      if (this.y > height + 20) {
        this.y = -20;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
      ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  let particles = Array.from({ length: 75 }, () => new HeartParticle());

  function animateConfetti() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateConfetti);
  }
  animateConfetti();

  function triggerBurst(x = width / 2, y = height / 2) {
    playPopSound();
    for (let i = 0; i < 35; i++) {
      particles.push(new HeartParticle(x, y));
    }
    if (particles.length > 220) particles.splice(0, 35);
  }

  // Web Audio Context for popping sound effects
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPopSound() {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(261.63, audioCtx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  }

  // YouTube Background Audio Player Controls
  const btnMusic = document.getElementById('btn-music');
  const ytIframe = document.getElementById('yt-player');
  let isYtPlaying = true;

  function playYtSong() {
    if (ytIframe && ytIframe.contentWindow) {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    isYtPlaying = true;
    btnMusic.innerHTML = '🎵 Music: Playing 💕';
    btnMusic.style.background = 'linear-gradient(135deg, #ff2a6d, #ffd700)';
  }

  function pauseYtSong() {
    if (ytIframe && ytIframe.contentWindow) {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    isYtPlaying = false;
    btnMusic.innerHTML = '⏸️ Pause Music';
    btnMusic.style.background = '';
  }

  btnMusic.addEventListener('click', () => {
    if (!isYtPlaying) {
      playYtSong();
    } else {
      pauseYtSong();
    }
  });

  document.body.addEventListener('click', () => {
    playYtSong();
  }, { once: true });

  // Live Relationship Time Counter Engine
  const startDate = new Date("2024-01-01T00:00:00");
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMins = document.getElementById('count-mins');
  const countSecs = document.getElementById('count-secs');

  function updateLoveCounter() {
    const now = new Date();
    const diff = Math.abs(now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (countDays) countDays.textContent = days;
    if (countHours) countHours.textContent = hours < 10 ? '0' + hours : hours;
    if (countMins) countMins.textContent = mins < 10 ? '0' + mins : mins;
    if (countSecs) countSecs.textContent = secs < 10 ? '0' + secs : secs;
  }
  setInterval(updateLoveCounter, 1000);
  updateLoveCounter();

  // Wax Sealed Secret Love Letter Modal
  const waxEnvelopeBtn = document.getElementById('wax-envelope-btn');
  const letterModal = document.getElementById('letter-modal');
  const btnCloseLetter = document.getElementById('btn-close-letter');

  waxEnvelopeBtn.addEventListener('click', (e) => {
    letterModal.classList.add('active');
    triggerBurst(e.clientX, e.clientY);
  });

  btnCloseLetter.addEventListener('click', () => {
    letterModal.classList.remove('active');
    triggerBurst();
  });

  // Romantic Fireworks Engine
  const fwCanvas = document.getElementById('fireworks-canvas');
  const fwCtx = fwCanvas.getContext('2d');
  let fwWidth = fwCanvas.width = window.innerWidth;
  let fwHeight = fwCanvas.height = window.innerHeight;
  let fireworks = [];
  let isFireworksActive = false;

  class Firework {
    constructor() {
      this.x = Math.random() * fwWidth;
      this.y = fwHeight;
      this.targetY = Math.random() * (fwHeight * 0.5) + 50;
      this.speed = Math.random() * 5 + 7;
      this.angle = Math.atan2(this.targetY - this.y, 0);
      this.particles = [];
      this.exploded = false;
      this.color = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;
    }

    update() {
      if (!this.exploded) {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.exploded = true;
          this.explode();
        }
      } else {
        this.particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.alpha -= 0.015;
          if (p.alpha <= 0) this.particles.splice(i, 1);
        });
      }
    }

    explode() {
      playPopSound();
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.particles.push({
          x: this.x,
          y: this.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: this.color
        });
      }
    }

    draw() {
      if (!this.exploded) {
        fwCtx.fillStyle = this.color;
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        fwCtx.fill();
      } else {
        this.particles.forEach(p => {
          fwCtx.save();
          fwCtx.globalAlpha = p.alpha;
          fwCtx.fillStyle = p.color;
          fwCtx.beginPath();
          fwCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          fwCtx.fill();
          fwCtx.restore();
        });
      }
    }
  }

  function loopFireworks() {
    if (!isFireworksActive) {
      fwCtx.clearRect(0, 0, fwWidth, fwHeight);
      return;
    }
    fwCtx.clearRect(0, 0, fwWidth, fwHeight);

    if (Math.random() < 0.15) {
      fireworks.push(new Firework());
    }

    fireworks.forEach((fw, index) => {
      fw.update();
      fw.draw();
      if (fw.exploded && fw.particles.length === 0) {
        fireworks.splice(index, 1);
      }
    });

    requestAnimationFrame(loopFireworks);
  }

  const btnFireworks = document.getElementById('btn-fireworks');
  btnFireworks.addEventListener('click', () => {
    isFireworksActive = !isFireworksActive;
    if (isFireworksActive) {
      btnFireworks.innerHTML = '🎆 Fireworks: ACTIVE ✨';
      btnFireworks.style.background = 'linear-gradient(135deg, #ff007f, #00f0ff)';
      loopFireworks();
    } else {
      btnFireworks.innerHTML = '🎆 Romantic Fireworks';
      btnFireworks.style.background = '';
    }
  });

  // Floating Heart Game Mechanics
  const heartIcons = ['💖', '💕', '❤️', '🌹', '✨', '💗', '🥰'];

  function spawnBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const x = Math.random() * 80 + 5;
    balloon.style.left = `${x}vw`;
    balloon.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    balloon.style.animationDuration = `${Math.random() * 5 + 6}s`;

    balloon.addEventListener('click', (e) => {
      triggerBurst(e.clientX, e.clientY);
      balloon.remove();
    });

    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 11000);
  }

  setInterval(spawnBalloon, 1400);
  for (let i = 0; i < 6; i++) spawnBalloon();

  // Theme Switcher
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      if (theme === 'midnight') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', theme);
      }
      triggerBurst();
    });
  });

  // Specialized Romantic Messages for Ndagire Agatha
  const wishes = [
    "To my dearest <strong>Ndagire Agatha</strong> — you bring endless warmth, beauty, and sunshine into my world. Thank you for being my constant joy, my sweetest smile, and my favorite person every single day. Loving you is the most wonderful part of my life! 👑🌹✨",
    "<strong>Ndagire Agatha</strong>, you are my favorite notification, my happiest thought, and my favorite part of every single day! 💖",
    "Happy Girlfriend's Day to the sweetest, most gorgeous girl — <strong>Ndagire Agatha</strong>! Loving you is the easiest thing in the world! 🥰🌹",
    "You make my heart skip a beat every time I look at you, <strong>Ndagire Agatha</strong>. I am so blessed to have you in my life! 💕✨",
    "Every moment spent with you, <strong>Ndagire Agatha</strong>, feels like a dream come true. Here's to us, today and forever! 🥂❤️"
  ];
  let wishIndex = 0;
  const cardText = document.getElementById('card-text');
  const cardElement = document.getElementById('birthday-card');

  function nextWish() {
    wishIndex = (wishIndex + 1) % wishes.length;
    cardText.style.opacity = 0;
    setTimeout(() => {
      cardText.innerHTML = wishes[wishIndex];
      cardText.style.opacity = 1;
    }, 200);
    triggerBurst();
  }

  cardElement.addEventListener('click', nextWish);
  document.getElementById('btn-confetti').addEventListener('click', () => triggerBurst());

  // Heart Cake Flame Candle Interactivity
  const cake = document.getElementById('cake-element');
  const flame = document.getElementById('flame-element');
  let candleLit = true;

  cake.addEventListener('click', () => {
    candleLit = !candleLit;
    if (!candleLit) {
      flame.classList.add('off');
      triggerBurst(width / 2, height / 2);
    } else {
      flame.classList.remove('off');
    }
  });

  // Surprise Gift Boxes Unwrapping & Photo Modal Reveal Logic
  const giftBoxes = document.querySelectorAll('.gift-box');
  const giftModal = document.getElementById('gift-reveal-modal');
  const giftModalTitle = document.getElementById('gift-modal-title');
  const giftModalBody = document.getElementById('gift-modal-body');
  const giftModalPhoto = document.getElementById('gift-modal-photo');
  const btnCloseGift = document.getElementById('btn-close-gift');

  giftBoxes.forEach(selectedBox => {
    selectedBox.addEventListener('click', (e) => {
      const giftTitle = selectedBox.getAttribute('data-title') || 'Surprise Gift Unwrapped!';
      const giftMessage = selectedBox.getAttribute('data-gift');
      const giftPhoto = selectedBox.getAttribute('data-photo');

      // Make all OTHER unselected gift boxes DISAPPEAR!
      giftBoxes.forEach(box => {
        if (box !== selectedBox) {
          box.classList.add('hidden');
        }
      });

      selectedBox.classList.add('unwrapped');
      setTimeout(() => selectedBox.classList.remove('unwrapped'), 500);

      triggerBurst(e.clientX, e.clientY);

      if (giftPhoto) {
        giftModalPhoto.src = giftPhoto;
      }
      giftModalTitle.textContent = giftTitle;
      giftModalBody.innerHTML = `For my beloved <strong>Ndagire Agatha</strong>:<br><br>${giftMessage}`;

      cardText.innerHTML = `🎁 UNWRAPPED GIFT FOR NDAGIRE AGATHA:<br><strong>${giftMessage}</strong>`;

      giftModal.classList.add('active');
    });
  });

  function resetGifts() {
    giftModal.classList.remove('active');
    giftBoxes.forEach(box => {
      box.classList.remove('hidden');
    });
    triggerBurst();
  }

  btnCloseGift.addEventListener('click', resetGifts);
  giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal) resetGifts();
  });

  // Photo Memory Carousel featuring Ndagire Agatha's Real Photos
  const carouselImages = [
    { src: 'images/agatha_2.jpg', caption: 'Ndagire Agatha in Stunning Red Lace Dress 🌹' },
    { src: 'images/agatha_5.jpg', caption: 'Elegance & Grace Personified ✨' },
    { src: 'images/agatha_4.jpg', caption: 'Mirror Reflection of My Queen 👑' },
    { src: 'images/agatha_3.jpg', caption: 'Her Sweetest Smile & Kiss Marks 💕' },
    { src: 'images/agatha_1.jpg', caption: 'Radiant Happiness & Sunshine 🥰' }
  ];
  let carouselIdx = 0;

  const carouselImg = document.getElementById('carousel-img');
  const carouselCaption = document.getElementById('carousel-caption');

  function updateCarousel(idx) {
    carouselIdx = (idx + carouselImages.length) % carouselImages.length;
    carouselImg.style.opacity = 0;
    setTimeout(() => {
      carouselImg.src = carouselImages[carouselIdx].src;
      carouselCaption.textContent = carouselImages[carouselIdx].caption;
      carouselImg.style.opacity = 1;
    }, 200);
  }

  document.getElementById('carousel-prev').addEventListener('click', () => updateCarousel(carouselIdx - 1));
  document.getElementById('carousel-next').addEventListener('click', () => updateCarousel(carouselIdx + 1));
});
