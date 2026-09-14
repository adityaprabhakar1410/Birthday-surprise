/**
 * ====================================================================
 * BIRTHDAY SURPRISE WEBSITE - JAVASCRIPT ENGINE
 * Full Interactive Logic, Particle Systems, Web Audio Synthesizer,
 * GSAP Scroll Animations, Envelope Mechanics & Fireworks.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BIRTHDAY_CONFIG || {};

  /* --------------------------------------------------------------------
   * 1. INITIALIZE DYNAMIC CONTENT FROM CONFIG
   * -------------------------------------------------------------------- */
  function initDynamicContent() {
    // Logo & Names
    const girlName = cfg.girlName || "Angel";
    document.querySelectorAll('#nav-logo-text, #footer-name').forEach(el => el.textContent = girlName);

    // Hero Subtitle
    if (cfg.subtitle) {
      const heroSub = document.getElementById('hero-subtitle');
      if (heroSub) heroSub.textContent = cfg.subtitle;
    }

    // About Her Cards
    const aboutGrid = document.getElementById('about-cards-grid');
    if (aboutGrid && cfg.aboutHer && cfg.aboutHer.cards) {
      aboutGrid.innerHTML = cfg.aboutHer.cards.map(c => `
        <div class="glass-card about-card">
          <div class="about-card-icon"><i class="fa-solid ${c.icon}"></i></div>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      `).join('');
    }

    // Reasons Cards
    const reasonsGrid = document.getElementById('reasons-grid');
    if (reasonsGrid && cfg.reasons) {
      reasonsGrid.innerHTML = cfg.reasons.map((r, i) => `
        <div class="glass-card reason-card">
          <div class="reason-num">${i + 1}</div>
          <div class="reason-text">${r}</div>
        </div>
      `).join('');
    }

    // Timeline Items
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && cfg.timeline) {
      timelineContainer.innerHTML = cfg.timeline.map(t => `
        <div class="timeline-item">
          <div class="timeline-node"><i class="fa-solid ${t.icon}"></i></div>
          <div class="glass-card timeline-content">
            <span class="timeline-year">${t.year}</span>
            <h3>${t.title}</h3>
            <p>${t.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Photo Gallery
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer && cfg.gallery) {
      galleryContainer.innerHTML = cfg.gallery.map((g, i) => `
        <div class="polaroid-card" data-index="${i}">
          <div class="polaroid-img-wrapper">
            <img src="${g.image}" alt="${g.title}" loading="lazy">
          </div>
          <div class="polaroid-caption">${g.title}</div>
        </div>
      `).join('');

      // Add click listener for Lightbox Modal
      document.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = card.getAttribute('data-index');
          const item = cfg.gallery[idx];
          if (item) openGalleryModal(item.image, item.title, item.caption);
        });
      });
    }

    // Love Letter Content
    if (cfg.loveLetter) {
      const sal = document.getElementById('letter-salutation');
      const body = document.getElementById('letter-body');
      const cls = document.getElementById('letter-closing');
      const sign = document.getElementById('letter-signoff');

      if (sal) sal.textContent = cfg.loveLetter.salutation || `Dearest ${girlName},`;
      if (cls) cls.textContent = cfg.loveLetter.closing || "Forever & Always,";
      if (sign) sign.textContent = cfg.loveLetter.signoff || "Your Biggest Admirer ❤️";

      if (body && cfg.loveLetter.paragraphs) {
        body.innerHTML = cfg.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
      }
    }

    // Gift Boxes
    const giftsContainer = document.getElementById('gifts-container');
    if (giftsContainer && cfg.giftBoxes) {
      giftsContainer.innerHTML = cfg.giftBoxes.map(g => `
        <div class="glass-card gift-card" data-gift-id="${g.id}">
          <div class="gift-box-icon"><i class="fa-solid ${g.icon}"></i></div>
          <span class="section-tag">${g.badge}</span>
          <h3>${g.title}</h3>
          <p class="text-muted">${g.desc}</p>
        </div>
      `).join('');

      document.querySelectorAll('.gift-card').forEach(box => {
        box.addEventListener('click', () => {
          const gid = box.getAttribute('data-gift-id');
          const gift = cfg.giftBoxes.find(x => x.id == gid);
          if (gift) openGiftModal(gift);
        });
      });
    }

    // Wishes Board
    const wishesGrid = document.getElementById('wishes-grid');
    if (wishesGrid && cfg.wishes) {
      renderWishes(cfg.wishes);
    }

    // Future Dreams
    const dreamsContainer = document.getElementById('dreams-container');
    if (dreamsContainer && cfg.dreams) {
      dreamsContainer.innerHTML = cfg.dreams.map(d => `
        <div class="glass-card dream-card">
          <div class="dream-icon"><i class="fa-solid ${d.icon}"></i></div>
          <h3>${d.title}</h3>
          <p class="text-muted">${d.desc}</p>
        </div>
      `).join('');
    }
  }

  function renderWishes(wishes) {
    const wishesGrid = document.getElementById('wishes-grid');
    if (!wishesGrid) return;
    wishesGrid.innerHTML = wishes.map(w => `
      <div class="wish-note">
        <i class="fa-solid fa-thumbtack wish-pin"></i>
        <p>"${w.text}"</p>
        <div class="wish-sender">— ${w.name}</div>
      </div>
    `).join('');
  }

  initDynamicContent();

  /* --------------------------------------------------------------------
   * 2. TYPEWRITER EFFECT IN HERO
   * -------------------------------------------------------------------- */
  const typingElement = document.getElementById('hero-typing-text');
  const nicknames = cfg.nicknames || ["Princess 👑", "Angel ✨", "Sissy 🥹", "Baby forever ❤️"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = nicknames[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 80 : 140;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % nicknames.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  /* --------------------------------------------------------------------
   * 3. COUNTDOWN TIMER
   * -------------------------------------------------------------------- */
  function updateCountdown() {
    const targetDate = new Date(cfg.targetDate || "2026-08-05T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = "00";
      document.getElementById('hours').textContent = "00";
      document.getElementById('minutes').textContent = "00";
      document.getElementById('seconds').textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(d).padStart(2, '0');
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* --------------------------------------------------------------------
   * 4. THEME SWITCHER (LIGHT / DARK MODE)
   * -------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  /* --------------------------------------------------------------------
   * 5. WEB AUDIO API ROMANTIC MUSIC SYNTHESIZER
   * -------------------------------------------------------------------- */
  let audioCtx = null;
  let isPlayingMusic = false;
  let synthInterval = null;

  const musicToggleBtn = document.getElementById('music-toggle');
  const musicStatusText = musicToggleBtn.querySelector('.music-status-text');

  // Happy Birthday Melody Note Frequencies (Hz)
  const melodyNotes = [
    261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy birthday to you
    261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy birthday to you
    261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy birthday dear Sophia
    466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy birthday to you
  ];

  function playSynthNote(freq, duration = 0.4) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine'; // Soft, warm acoustic piano sound
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio synth play error:", e);
    }
  }

  function startMusicSynthesizer() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let noteIdx = 0;
    synthInterval = setInterval(() => {
      playSynthNote(melodyNotes[noteIdx], 0.5);
      noteIdx = (noteIdx + 1) % melodyNotes.length;
    }, 450);

    isPlayingMusic = true;
    musicToggleBtn.classList.add('playing');
    musicStatusText.textContent = "Playing Melody";
  }

  function stopMusicSynthesizer() {
    if (synthInterval) clearInterval(synthInterval);
    isPlayingMusic = false;
    musicToggleBtn.classList.remove('playing');
    musicStatusText.textContent = "Play Melody";
  }

  musicToggleBtn.addEventListener('click', () => {
    if (isPlayingMusic) {
      stopMusicSynthesizer();
    } else {
      startMusicSynthesizer();
    }
  });

  /* --------------------------------------------------------------------
   * 6. CANVAS PARTICLE ENGINE (Hearts, Stars & Cursor Trail)
   * -------------------------------------------------------------------- */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(x, y, isCursor = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || canvas.height + Math.random() * 50;
      this.size = Math.random() * (isCursor ? 8 : 14) + 6;
      this.speedY = isCursor ? (Math.random() * -2 - 1) : (-Math.random() * 1.5 - 0.5);
      this.speedX = Math.random() * 1 - 0.5;
      this.opacity = 1;
      this.isCursor = isCursor;
      this.type = Math.random() > 0.4 ? 'heart' : 'star';
      this.color = Math.random() > 0.5 ? '#ff758c' : (Math.random() > 0.5 ? '#e0c3fc' : '#ffd700');
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.isCursor) {
        this.opacity -= 0.025;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(this.opacity, 0);
      ctx.fillStyle = this.color;
      
      if (this.type === 'heart') {
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - d / 2, this.y - d / 2, this.x - d, this.y + d / 3, this.x, this.y + d);
        ctx.bezierCurveTo(this.x + d, this.y + d / 3, this.x + d / 2, this.y - d / 2, this.x, this.y);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initParticles() {
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Spawn ambient floating particles
    if (particles.length < 50 && Math.random() < 0.3) {
      particles.push(new Particle());
    }

    particles.forEach((p, idx) => {
      p.update();
      p.draw();

      if (p.opacity <= 0 || p.y < -20) {
        particles.splice(idx, 1);
      }
    });

    requestAnimationFrame(animateParticles);
  }
  initParticles();
  animateParticles();

  // Mouse Cursor Trail
  window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.4) {
      particles.push(new Particle(e.clientX, e.clientY, true));
    }
  });

  /* --------------------------------------------------------------------
   * 7. FIREWORKS ENGINE
   * -------------------------------------------------------------------- */
  const fwCanvas = document.getElementById('fireworks-canvas');
  const fwCtx = fwCanvas.getContext('2d');
  let fireworks = [];

  function resizeFwCanvas() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFwCanvas);
  resizeFwCanvas();

  class FireworkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // gravity
      this.alpha -= this.decay;
    }

    draw() {
      fwCtx.save();
      fwCtx.globalAlpha = Math.max(this.alpha, 0);
      fwCtx.fillStyle = this.color;
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      fwCtx.fill();
      fwCtx.restore();
    }
  }

  function launchFirework(x, y) {
    const colors = ['#ff758c', '#ffd700', '#e0c3fc', '#00f5d4', '#ff4d6d'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 45; i++) {
      fireworks.push(new FireworkParticle(x, y, color));
    }
  }

  function animateFireworks() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fireworks.forEach((fp, idx) => {
      fp.update();
      fp.draw();
      if (fp.alpha <= 0) fireworks.splice(idx, 1);
    });
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();

  /* --------------------------------------------------------------------
   * 8. OPEN SURPRISE & CAKE CANDLE BLOWING
   * -------------------------------------------------------------------- */
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', () => {
      // Trigger music
      if (!isPlayingMusic) startMusicSynthesizer();
      
      // Fire confetti burst
      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // Launch fireworks
      launchFirework(window.innerWidth / 2, window.innerHeight / 3);
      launchFirework(window.innerWidth / 3, window.innerHeight / 2);

      // Smooth scroll to About section
      const target = document.getElementById('about');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Blow Candles Interaction
  const blowBtn = document.getElementById('blow-candles-btn');
  const rekindleBtn = document.getElementById('rekindle-candles-btn');
  const wishStatusMsg = document.getElementById('wish-status-msg');

  if (blowBtn) {
    blowBtn.addEventListener('click', () => {
      document.querySelectorAll('.flame').forEach(f => f.classList.add('blown-out'));
      if (wishStatusMsg) {
        wishStatusMsg.textContent = "✨ Wish Granted! Your year ahead will be full of magic! ✨";
      }

      // Confetti celebration
      if (window.confetti) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.7 }
        });
      }

      blowBtn.style.display = 'none';
      if (rekindleBtn) rekindleBtn.style.display = 'inline-flex';
    });
  }

  if (rekindleBtn) {
    rekindleBtn.addEventListener('click', () => {
      document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown-out'));
      if (wishStatusMsg) wishStatusMsg.textContent = "";
      rekindleBtn.style.display = 'none';
      if (blowBtn) blowBtn.style.display = 'inline-flex';
    });
  }

  /* --------------------------------------------------------------------
   * 9. LOVE LETTER ENVELOPE MECHANICS
   * -------------------------------------------------------------------- */
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
      if (envelope.classList.contains('open') && window.confetti) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    });
  }

  /* --------------------------------------------------------------------
   * 10. MODALS (GALLERY & GIFT BOXES)
   * -------------------------------------------------------------------- */
  const galleryModal = document.getElementById('gallery-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openGalleryModal(imgSrc, title, caption) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = caption;
    galleryModal.classList.add('active');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => galleryModal.classList.remove('active'));
  }

  // Gift Modal
  const giftModal = document.getElementById('gift-modal');
  const giftCloseBtn = document.getElementById('gift-modal-close-btn');

  function openGiftModal(gift) {
    document.getElementById('gift-modal-badge').textContent = gift.badge;
    document.getElementById('gift-modal-title').textContent = gift.title;
    document.getElementById('gift-modal-desc').textContent = gift.desc;
    document.getElementById('gift-modal-code').textContent = `PRINCESS-WISH-${gift.id}00`;
    giftModal.classList.add('active');

    if (window.confetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  }

  if (giftCloseBtn) {
    giftCloseBtn.addEventListener('click', () => giftModal.classList.remove('active'));
  }
  document.getElementById('claim-coupon-btn')?.addEventListener('click', () => {
    giftModal.classList.remove('active');
    alert("❤️ Coupon Claimed Successfully! Enjoy your special treat, Princess!");
  });

  /* --------------------------------------------------------------------
   * 11. BIRTHDAY WISH FORM SUBMISSION
   * -------------------------------------------------------------------- */
  const wishForm = document.getElementById('add-wish-form');
  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('wish-sender').value.trim();
      const text = document.getElementById('wish-text').value.trim();

      if (sender && text) {
        if (!cfg.wishes) cfg.wishes = [];
        cfg.wishes.unshift({ name: sender, text: text });
        renderWishes(cfg.wishes);
        wishForm.reset();

        if (window.confetti) {
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        }
      }
    });
  }

  /* --------------------------------------------------------------------
   * 12. EMOJI REACTION RIVER
   * -------------------------------------------------------------------- */
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.getAttribute('data-emoji');
      for (let i = 0; i < 12; i++) {
        const floatEmoji = document.createElement('div');
        floatEmoji.textContent = emoji;
        floatEmoji.style.position = 'fixed';
        floatEmoji.style.bottom = '20px';
        floatEmoji.style.right = (20 + Math.random() * 80) + 'px';
        floatEmoji.style.fontSize = (24 + Math.random() * 20) + 'px';
        floatEmoji.style.pointerEvents = 'none';
        floatEmoji.style.zIndex = '9999';
        floatEmoji.style.transition = 'all 2s ease-out';
        document.body.appendChild(floatEmoji);

        setTimeout(() => {
          floatEmoji.style.transform = `translateY(-${300 + Math.random() * 200}px) scale(1.5) rotate(${Math.random() * 60 - 30}deg)`;
          floatEmoji.style.opacity = '0';
        }, 50);

        setTimeout(() => floatEmoji.remove(), 2100);
      }
    });
  });

  /* --------------------------------------------------------------------
   * 13. GRAND FINALE BUTTON
   * -------------------------------------------------------------------- */
  const finaleBtn = document.getElementById('grand-fireworks-btn');
  if (finaleBtn) {
    finaleBtn.addEventListener('click', () => {
      let count = 0;
      const interval = setInterval(() => {
        launchFirework(Math.random() * window.innerWidth, Math.random() * (window.innerHeight / 2));
        if (window.confetti) {
          confetti({
            particleCount: 70,
            spread: 90,
            origin: { y: Math.random() * 0.8 }
          });
        }
        count++;
        if (count > 15) clearInterval(interval);
      }, 300);
    });
  }

  /* --------------------------------------------------------------------
   * 14. SCROLL PROGRESS INDICATOR & NAVBAR STYLES
   * -------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + "%";

    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (winScroll > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  });

  /* --------------------------------------------------------------------
   * 15. GSAP SCROLLTRIGGER ANIMATIONS
   * -------------------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.glass-card, .polaroid-card, .timeline-item, .section-header').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }
});
