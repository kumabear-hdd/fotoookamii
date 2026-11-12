/* ═══════════════════════════════════════════
   Album Kenangan Kita — script (lucu & romantis)
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────
     ⚙️  PENGATURAN — ubah sesuai keinginan
     ───────────────────────────────────────── */
  const CONFIG = {
    // Tanggal jadian kalian: 17 Agustus 2025
    startDate: new Date(2025, 7, 17, 0, 0, 0),

    // Nomor WhatsApp tujuan tombol "Kirim Peluk Virtual" (format: 62 + nomor tanpa 0)
    // 081585134544 -> 6281585134544
    whatsappNumber: '6281585134544',

    // Musik latar. Diputar OTOMATIS begitu website dibuka.
    // Isi null kalau tidak ingin ada musik.
    music: 'assets/music/lagu.mp3',
    musicVolume: 0.45,

    // Caption foto (urutan sesuai file)
    captions: {
      sekolah: [
        'Hari biasa yang jadi luar biasa',
        'Seragam kita, cerita kita',
        'Ketawa sampai lupa waktu',
        'Jeda di tengah pelajaran',
        'Momen yang selalu bikin kangen',
        'Foto favoritku',
        'Sepulang sekolah',
        'Sore di sekolah',
        'Tempat kita sering nongkrong',
        'Pagi sebelum bel masuk',
        'Diam-diam saling cari',
        'Senyum yang bikin semangat',
        'Kelas yang selalu berisik',
        'Sudut favorit di sekolah',
        'Kenangan yang tak akan terlupa'
      ],
      dirumah: [
        'Sore santai di rumah',
        'Senyum paling manis',
        'Waktu yang terasa terlalu cepat',
        'Tenang, tapi hangat',
        'Rumah bukan tempatnya, tapi orangnya'
      ]
    },

    // Pesan manis acak (tombol note)
    sweetNotes: [
      'lalaa itu bagian favorit dari hari-hariku 💗',
      'Kalau kangen, buka album ini ya~ 🌸',
      'Terima kasih sudah bertahan sejauh ini 🥺',
      'aa suka cara lalaa ketawa 😄',
      'lalaa rumah, bukan sekadar tempat singgah 🏡',
      'Satu tahun ini terasa cepat karena ada lalaa ⏳',
      'Jangan lupa makan, kesayangan aa 🍜',
      'Tidur yang cukup ya, aa jaga mimpi lalaa 🌙',
      'Tiap foto di sini aa simpan baik-baik 📸',
      'aa bangga punya lalaa 💐'
    ],

    // Kata-kata lucu saat love meter jalan
    meterNotes: [
      'Waduh… jangan dipencet terus, nanti aa makin sayang 🥰',
      'Eh, angkanya nggak bisa penuh, sayangnya nggak ada batasnya 💞',
      'lalaa nanya? Jelas sayang banget lah 😆',
      'Ini udah maksimal… tapi bohong, sebenernya lebih dari ini 💘'
    ]
  };

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════ PRELOADER ═══════ */
  document.body.classList.add('locked');
  const plTexts = ['Menyiapkan kenangan kita…', 'Ngumpulin foto-foto lucu…', 'Dikit lagi ya sayang…', 'Siap! 💗'];
  let pli = 0;
  const plTimer = setInterval(() => {
    pli = (pli + 1) % plTexts.length;
    const el = $('#plText'); if (el) el.textContent = plTexts[pli];
  }, 600);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(plTimer);
      $('#preloader').classList.add('done');
      document.body.classList.remove('locked');
    }, 1100);
  });

  /* ═══════ YEAR ═══════ */
  $('#year').textContent = '© ' + new Date().getFullYear() + ' • dibuat penuh cinta';

  /* ═══════ NAV ═══════ */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('.nav-links');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-links a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  const sections = $$('main section[id], header[id]');
  const linkMap = {};
  $$('.nav-links a').forEach(a => (linkMap[a.getAttribute('href').slice(1)] = a));
  const navObs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting && linkMap[e.target.id]) {
          $$('.nav-links a').forEach(x => x.classList.remove('active'));
          linkMap[e.target.id].classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach(s => navObs.observe(s));

  /* ═══════ REVEAL ═══════ */
  const revealObs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ═══════ SCROLL PROGRESS + BACK TO TOP ═══════ */
  const progressBar = $('#progress span');
  const toTop = $('#toTop');
  const updateProgress = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    progressBar.style.width = (p * 100).toFixed(2) + '%';
    toTop.classList.toggle('show', h.scrollTop > 600);
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════ FALLING PETALS / EMOJI ═══════ */
  (function petals() {
    if (reduced) return;
    const host = $('#petals');
    const glyphs = ['♡', '🌸', '✿', '💗', '🌷', '❀', '💞', '🎀', '🩷'];
    const count = window.innerWidth < 640 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = glyphs[i % glyphs.length];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.fontSize = 11 + Math.random() * 16 + 'px';
      p.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
      p.style.animationDuration = 11 + Math.random() * 13 + 's';
      p.style.animationDelay = -Math.random() * 20 + 's';
      p.style.opacity = 0.35 + Math.random() * 0.45;
      host.appendChild(p);
    }
  })();

  /* ═══════ CURSOR HEART TRAIL ═══════ */
  (function trail() {
    if (reduced || window.matchMedia('(hover: none)').matches) return;
    const host = $('#trail');
    const glyphs = ['💗', '♡', '🌸', '✨', '💕'];
    let last = 0;
    document.addEventListener('mousemove', e => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const s = document.createElement('span');
      s.className = 'trail-dot';
      s.textContent = pick(glyphs);
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      s.style.fontSize = rand(12, 20) + 'px';
      host.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    });
  })();

  /* ═══════ CLICK HEART BURST ═══════ */
  function burstAt(x, y, count = 8) {
    if (reduced) return;
    const glyphs = ['💗', '♡', '💕', '✨', '🌸', '💞'];
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'burst';
      s.textContent = pick(glyphs);
      const ang = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
      const dist = rand(50, 130);
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.setProperty('--bx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--by', Math.sin(ang) * dist + 'px');
      s.style.setProperty('--br', rand(-120, 120) + 'deg');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1050);
    }
  }
  document.addEventListener('click', e => {
    if (e.target.closest('a, button, video, .lb-stage, input, textarea')) return;
    burstAt(e.clientX, e.clientY);
  });

  /* ═══════ HERO sparkles + word animation ═══════ */
  (function heroFX() {
    const title = $('#heroTitle');
    if (title && !title.dataset.split) {
      title.dataset.split = '1';
      const words = title.textContent.trim().split(/\s+/);
      title.textContent = '';
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'hw' + (w.toLowerCase() === 'kita' ? ' cute' : '');
        span.textContent = w;
        span.style.animationDelay = (0.25 + i * 0.16) + 's';
        title.appendChild(span);
        if (i < words.length - 1) title.appendChild(document.createTextNode(' '));
      });
    }
    const host = $('#heroSparkles');
    if (!host || reduced) return;
    const glyphs = ['✨', '💗', '🌸', '⭐', '💫'];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.textContent = pick(glyphs);
      s.style.left = rand(4, 96) + '%';
      s.style.top = rand(8, 92) + '%';
      s.style.animationDelay = rand(0, 3.4) + 's';
      s.style.fontSize = rand(12, 24) + 'px';
      host.appendChild(s);
    }
  })();

  /* ═══════ COUNTER + TODAY + FLIP CARD ═══════ */
  (function initCounter() {
    const start = CONFIG.startDate;
    const now = new Date();
    const diffMs = Math.max(0, now - start);
    const days = Math.floor(diffMs / 86400000);
    const hours = Math.floor(diffMs / 3600000);
    const photoCount = 20;
    const videoCount = 1;

    const fmt = d => d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    $('#sinceText').textContent = 'Bersama sejak ' + fmt(start) + ' — dan masih terus berjalan.';
    $('#todayText').textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    const animate = (el, target) => {
      const dur = 1600, t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('id-ID');
      };
      requestAnimationFrame(tick);
    };

    const map = { days, hours, photos: photoCount, videos: videoCount };
    const cObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target, map[e.target.dataset.count] || 0); cObs.unobserve(e.target); }
      }),
      { threshold: 0.5 }
    );
    $$('.count-num').forEach(el => cObs.observe(el));

    // flip card
    const flip = $('#flipCard');
    flip.addEventListener('click', () => {
      flip.classList.toggle('flipped');
      if (flip.classList.contains('flipped')) {
        burstAt(flip.getBoundingClientRect().left + flip.offsetWidth / 2,
                flip.getBoundingClientRect().top + 20, 10);
      }
    });
  })();

  /* ═══════ LOVE O METER ═══════ */
  (function loveMeter() {
    const btn = $('#meterBtn'), fill = $('#meterFill'), pct = $('#meterPct'),
          heart = $('#meterHeart'), note = $('#meterNote');
    let busy = false;
    btn.addEventListener('click', () => {
      if (busy) return;
      busy = true;
      heart.classList.add('pump');
      fill.style.width = '0%'; pct.textContent = '0%';
      note.textContent = 'Menghitung… 💭';
      let cur = 0, target = 100;
      const dur = 1800, t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 2.2);
        cur = Math.round(eased * target);
        fill.style.width = cur + '%';
        pct.textContent = cur + '%';
        if (p < 1) requestAnimationFrame(tick);
        else {
          pct.textContent = '∞%';
          fill.style.width = '100%';
          note.textContent = pick(CONFIG.meterNotes);
          heart.classList.remove('pump');
          rayConfetti(18);
          busy = false;
        }
      };
      requestAnimationFrame(tick);
    });
  })();

  /* ═══════ GALLERY ═══════ */
  const ALL = [];
  const laminates = ['Hari biasa yang jadi luar biasa', 'aa suka momen ini 💗', 'Simpan baik-baik ya 📸'];
  const layoutPattern = ['big', 'tall', 'wide', '', 'tall', '', 'wide', 'tall', '', 'big', 'tall', '', '', 'tall', 'wide'];
  const notesSekolah = ['Ketawa bareng lalaa itu obat paling murah 😄', 'Sekolah jadi seru gara-gara ada lalaa 🏫'];
  const notesRumah = ['Momen sederhana yang aa paling suka 🏡'];

  function buildGallery(mountId, folder, prefix, count, captions, notes) {
    const mount = $('#' + mountId);
    if (!mount) return;
    for (let i = 1; i <= count; i++) {
      const num = String(i).padStart(2, '0');
      const full = `assets/img/${folder}/${prefix}-${num}.jpg`;
      const thumb = `assets/img/${folder}/${prefix}-${num}-thumb.jpg`;
      const cap = (captions && captions[i - 1]) || 'Kenangan kita';

      // sisipkan catatan manis tiap 5 foto
      if (notes && i > 1 && (i - 1) % 5 === 0) {
        const n = document.createElement('div');
        n.className = 'g-note reveal';
        n.textContent = notes[Math.floor((i - 1) / 5 - 1) % notes.length] || pick(notes);
        mount.appendChild(n);
      }

      const fig = document.createElement('figure');
      fig.className = 'g-item ' + (layoutPattern[(i - 1) % layoutPattern.length] || '');
      fig.style.setProperty('--rot', rand(-7, 7).toFixed(1) + 'deg');
      fig.setAttribute('role', 'button');
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('aria-label', 'Buka foto: ' + cap);

      const inner = document.createElement('div');
      inner.className = 'g-inner';
      const img = document.createElement('img');
      img.src = thumb; img.loading = 'lazy'; img.decoding = 'async'; img.alt = cap;
      const zoom = document.createElement('span'); zoom.className = 'g-zoom'; zoom.textContent = '⤢';
      const heart = document.createElement('span'); heart.className = 'g-heart'; heart.textContent = '♥';
      inner.appendChild(img); inner.appendChild(zoom); inner.appendChild(heart);

      const capEl = document.createElement('span');
      capEl.className = 'g-cap';
      capEl.textContent = cap;

      fig.appendChild(inner);
      fig.appendChild(capEl);
      mount.appendChild(fig);

      ALL.push({ full, thumb, cap, index: ALL.length });
      toLightbox(fig, ALL.length - 1);
    }
  }

  buildGallery('gallerySekolah', 'sekolah', 'sekolah', 15, CONFIG.captions.sekolah, notesSekolah);
  buildGallery('galleryRumah', 'dirumah', 'dirumah', 5, CONFIG.captions.dirumah, notesRumah);

  // gallery staggered reveal
  const gObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.style.transitionDelay = (el.dataset.d || 0) + 'ms';
        el.classList.add('in');
        gObs.unobserve(el);
      }
    }),
    { threshold: 0.15 }
  );
  $$('.gallery .g-item, .gallery .g-note').forEach((el, i) => {
    el.dataset.d = (i % 5) * 70;
    gObs.observe(el);
  });

  /* ═══════ LIGHTBOX ═══════ */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  const lbCounter = $('#lbCounter');
  let current = 0, lastFocus = null;

  function show(index) {
    current = (index + ALL.length) % ALL.length;
    const item = ALL[current];
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbImg.src = item.full;
    lbImg.alt = item.cap;
    lbCap.textContent = item.cap;
    lbCounter.textContent = (current + 1) + ' / ' + ALL.length;
  }
  function openLb(index) {
    lastFocus = document.activeElement;
    show(index);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    $('.lb-close').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
    if (lastFocus) lastFocus.focus();
  }
  function toLightbox(el, index) {
    el.addEventListener('click', () => openLb(index));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(index); }
    });
  }
  $('.lb-close').addEventListener('click', closeLb);
  $('.lb-prev').addEventListener('click', () => show(current - 1));
  $('.lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  let touchX = null;
  lb.addEventListener('touchstart', e => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ═══════ SWEET NOTE CARD ═══════ */
  (function sweetNote() {
    const card = $('#noteCard'), txt = $('#noteText'), emo = $('#noteEmoji');
    const emojis = ['💌', '💗', '🌸', '🩷', '✨', '🧸'];
    card.addEventListener('click', () => {
      txt.textContent = pick(CONFIG.sweetNotes);
      emo.textContent = pick(emojis);
      card.classList.remove('note-pop'); void card.offsetWidth; card.classList.add('note-pop');
      burstAt(window.innerWidth / 2, card.getBoundingClientRect().top, 6);
    });
  })();

  /* ═══════ HUG BUTTON → WHATSAPP ═══════ */
  (function hug() {
    const b = $('#hugBtn');
    b.addEventListener('click', () => {
      const pesan =
        'Hai aa! 🤗 Aku baru buka website kenangan kita dan udah kirim peluk virtual buat aa. ' +
        'Makasih ya udah bikin album ini, aku sayang aa 💗';
      const url = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(pesan);
      toast('Pelukan terkirim ke WhatsApp aa! 🤗💗');
      rayConfetti(24);
      burstAt(window.innerWidth / 2, b.getBoundingClientRect().top + 20, 12);
      setTimeout(() => window.open(url, '_blank', 'noopener'), 450);
    });
  })();

  /* ═══════ TOAST + CONFETTI ═══════ */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function rayConfetti(count) {
    if (reduced) return;
    const host = $('#confetti');
    const glyphs = ['💗', '🌸', '✨', '💕', '🎀', '⭐', '💞'];
    for (let i = 0; i < count; i++) {
      const c = document.createElement('span');
      c.className = 'conf';
      c.textContent = pick(glyphs);
      c.style.left = Math.random() * 100 + 'vw';
      c.style.fontSize = rand(16, 30) + 'px';
      c.style.animationDuration = rand(2.4, 4.2) + 's';
      c.style.animationDelay = rand(0, 0.5) + 's';
      host.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  }

  /* ═══════ SIGNATURE DRAW ON REVEAL ═══════ */
  (function signDraw() {
    const sign = $('.sign-name');
    if (!sign) return;
    const o = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { sign.classList.add('draw'); o.unobserve(e.target); }
    }), { threshold: 0.6 });
    o.observe(sign);
  })();

  /* ═══════ MUSIC (autoplay) ═══════ */
  (function initMusic() {
    if (!CONFIG.music) return;
    const audio = new Audio(CONFIG.music);
    audio.loop = true; audio.volume = 0; audio.preload = 'auto';
    let unlocked = false;

    function fadeTo(target, ms) {
      const from = audio.volume, t0 = performance.now();
      const step = t => {
        const p = Math.min(1, (t - t0) / ms);
        audio.volume = Math.min(1, Math.max(0, from + (target - from) * p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    function unlock() {
      if (unlocked) return;
      unlocked = true;
      EVENTS.forEach(ev => window.removeEventListener(ev, onFirst, true));
    }
    function onFirst() { if (audio.paused) start(); else unlock(); }
    function start() {
      audio.play().then(() => { fadeTo(CONFIG.musicVolume, 2000); unlock(); }).catch(() => {});
    }
    const EVENTS = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);
    EVENTS.forEach(ev => window.addEventListener(ev, onFirst, { capture: true, passive: true }));
  })();

  /* ═══════ PAUSE VIDEO OFFSCREEN ═══════ */
  (function videoControl() {
    const v = $('#mainVideo');
    if (!v) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (!e.isIntersecting && !v.paused) v.pause(); }),
      { threshold: 0.15 }
    );
    obs.observe(v);
  })();
})();
