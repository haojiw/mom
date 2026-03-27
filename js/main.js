// ╔══════════════════════════════════════════════════════════════════╗
// ║  SLIDES — edit this array to set your content                   ║
// ║                                                                  ║
// ║  Text slide:  { type: 'text', text: 'Your message.' }           ║
// ║  Photo slide: { type: 'photo', src: 'photos/x.jpg',             ║
// ║                 caption: 'What this photo is about.' }           ║
// ╚══════════════════════════════════════════════════════════════════╝

const sections = [
  {
    photos: [
      { src: 'photos/0.jpg', caption: '献给妈妈的生日礼物' },
    ],
  },
  {
    text: '生日快乐，妈妈！\n\n今年我们都长大了一岁，我想给你一些不一样的惊喜。\n\n来看看儿子记忆里，我们一起走过的点点滴滴 :)',
    photos: [
      { src: 'photos/1.2.JPG', caption: '朋友都说我长得像妈妈' },
      { src: 'photos/1.1.jpg', caption: '在美国大街上，戴着眼镜随手自拍' },
      { src: 'photos/1.3.jpg', caption: '妈妈的快乐常常很简单' },
      { src: 'photos/1.4.jpg', fit: 'contain', caption: '约书亚国家公园，与仙人掌亲密接触' },
      { src: 'photos/1.5.jpg', caption: '喜欢看妈妈像花一样绽放的笑容' },
      { src: 'photos/1.6.JPG', caption: '每年母亲节，我和妈妈的约定' },
      { src: 'photos/1.7.jpg', caption: '永远年轻！' },
    ],
  },
  {
    text: '这一次你们千里迢迢来到美国看我，与我一起度过了两个多星期温暖又幸福的时光。\n\n每一年和你们相聚的日子，都会带给我很多力量，也总会让我重新想起生活里最珍贵的美好。',
    photos: [
      { src: 'photos/2.1.JPG', caption: '在UCLA拍张合影' },
      { src: 'photos/2.2.jpg', caption: '摩天轮上看大海' },
      { src: 'photos/2.3.jpg', caption: '一家人来看比赛' },
      { src: 'photos/2.4.jpg', caption: '整个洛杉矶尽收眼底' },
      { src: 'photos/2.5.jpg', fit: 'contain', caption: '偷拍一张吃饭' },
      { src: 'photos/2.6.jpg', caption: '父母爱情，非常甜蜜' },
      { src: 'photos/2.7.jpg', caption: '去年回家时，我感到很温暖的一幕' },
      { src: 'photos/2.8.JPG', caption: '情人节的晚上，最漂亮的天空' },
    ],
  },
  {
    text: '翻看这些照片的时候，仿佛又一次走进了岁月的长廊，许多过去的时光都在眼前慢慢亮起来。\n\n我相信，接下来的日子里，我们一定还会一起创造更多美好的回忆！',
    photos: [
      { src: 'photos/3.1.JPG', caption: '快十年以前了！我长大了，妈妈没怎么变' },
      { src: 'photos/3.2.jpg', caption: '其乐融融的一家人' },
      { src: 'photos/3.3.JPG', caption: '我度过了很幸福的童年' },
      { src: 'photos/3.4.jpg', caption: '学做泰国菜！妈妈做饭一直很好吃' },
      { src: 'photos/3.5.jpg', caption: '最喜欢一家人出去旅游' },
      { src: 'photos/3.6.JPG', caption: '还记得这是什么时候吗' },
      { src: 'photos/3.7.JPG', caption: '去年出发前去的温州肯恩大学' },
      { src: 'photos/3.8.jpg', caption: '每年都能拍好几张全家福' },
    ],
  },
  {
    text: '在我心里，妈妈一直都是最漂亮的！\n\n你会永远年轻，笑容常驻\n\n祝妈妈生日快乐！\n\n -- 爱你的儿子',
    photos: [
      { src: 'photos/closing.JPG', caption: '生日快乐，妈妈！' },
    ],
  },
];

const slides = sections.flatMap((section, sectionIndex) => {
  const sectionSlides = section.photos.map(photo => ({
    type: 'photo',
    src: typeof photo === 'string' ? photo : photo.src,
    fit: typeof photo === 'string' ? 'cover' : (photo.fit || 'cover'),
    caption: typeof photo === 'string' ? '' : (photo.caption || ''),
  }));

  if (sectionIndex === 0) return sectionSlides;

  return [
    {
      type: 'text',
      text: section.text,
    },
    ...sectionSlides,
  ];
});

// ─── Constants ──────────────────────────────────────────────────
const FADE_MS  = 620;
const FLASH_MS = 320;
const SWIPE_PX = 45;

// ─── DOM References ─────────────────────────────────────────────
const slideshowEl  = document.getElementById('slideshow');
const stripInnerEl = document.getElementById('film-strip-inner');
const flashEl      = document.getElementById('shutter-flash');
const captionText  = document.getElementById('caption-text');
const prevBtn      = document.getElementById('btn-prev');
const nextBtn      = document.getElementById('btn-next');
const muteBtn      = document.getElementById('btn-mute');
const musicEl      = document.getElementById('bg-music');

// ─── DOM Builders ────────────────────────────────────────────────

function buildOrnament(isBottom) {
  const el = document.createElement('div');
  el.className = 'text-ornament' + (isBottom ? ' bottom' : '');
  el.innerHTML = `
    <span class="text-ornament-line"></span>
    <span class="text-ornament-diamond"></span>
    <span class="text-ornament-line"></span>
  `;
  return el;
}

function buildSlide(slide, index) {
  const el = document.createElement('div');
  el.className = 'slide';
  el.dataset.index = index;

  if (slide.type === 'photo') {
    el.classList.add('slide-photo');

    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.caption || '';
    img.draggable = false;
    if (slide.fit === 'contain') {
      img.classList.add('fit-contain');
    }
    el.appendChild(img);

  } else {
    el.classList.add('slide-text');

    const frame = document.createElement('div');
    frame.className = 'text-frame';

    ['tl', 'tr', 'br', 'bl'].forEach(pos => {
      const corner = document.createElement('span');
      corner.className = `text-corner ${pos}`;
      frame.appendChild(corner);
    });

    const inner = document.createElement('div');
    inner.className = 'text-inner';
    inner.appendChild(buildOrnament(false));

    const p = document.createElement('p');
    p.className = 'text-body';
    p.textContent = slide.text;
    inner.appendChild(p);

    inner.appendChild(buildOrnament(true));
    frame.appendChild(inner);
    el.appendChild(frame);
  }

  return el;
}

function buildFilmThumb(slide, index) {
  const thumb = document.createElement('div');
  thumb.className = 'film-thumb';
  thumb.dataset.index = index;

  if (slide.type === 'photo') {
    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = '';
    img.draggable = false;
    thumb.appendChild(img);
  } else {
    const indicator = document.createElement('div');
    indicator.className = 'film-thumb-text';
    indicator.textContent = '—';
    thumb.appendChild(indicator);
  }

  thumb.addEventListener('click', () => goTo(index));
  return thumb;
}

// ─── Initialize DOM ──────────────────────────────────────────────

const slideEls = slides.map((slide, i) => {
  const el = buildSlide(slide, i);
  slideshowEl.appendChild(el);
  return el;
});

const thumbEls = slides.map((slide, i) => {
  const thumb = buildFilmThumb(slide, i);
  stripInnerEl.appendChild(thumb);
  return thumb;
});

// ─── Utilities ───────────────────────────────────────────────────

function triggerFlash() {
  flashEl.classList.remove('flash-active');
  void flashEl.offsetWidth;
  flashEl.classList.add('flash-active');
  setTimeout(() => flashEl.classList.remove('flash-active'), FLASH_MS + 30);
}

function scrollStripTo(index) {
  const thumb = thumbEls[index];
  if (!thumb) return;
  const strip      = stripInnerEl;
  const targetLeft = thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2;
  strip.scrollTo({ left: targetLeft, behavior: 'smooth' });
}

function updateCaption(index) {
  const slide = slides[index];
  if (slide.type === 'photo' && slide.caption) {
    captionText.textContent = slide.caption;
    captionText.classList.remove('empty');
  } else {
    captionText.textContent = '—';
    captionText.classList.add('empty');
  }
}

function updateButtons(index) {
  prevBtn.classList.toggle('inactive', index === 0);
  nextBtn.classList.toggle('inactive', index === slides.length - 1);
}

function updateMuteButton() {
  muteBtn.classList.toggle('muted', musicEl.muted);
  muteBtn.setAttribute('aria-label', musicEl.muted ? 'Unmute music' : 'Mute music');
  muteBtn.setAttribute('aria-pressed', String(musicEl.muted));
}

async function tryPlayMusic() {
  try {
    await musicEl.play();
    removeAutoplayRetryListeners();
  } catch (_) {
    // Ignore autoplay failures and retry on the next user gesture.
  }
}

function handleAutoplayRetry() {
  void tryPlayMusic();
}

function removeAutoplayRetryListeners() {
  window.removeEventListener('pointerdown', handleAutoplayRetry);
  window.removeEventListener('keydown', handleAutoplayRetry);
  window.removeEventListener('touchstart', handleAutoplayRetry);
}

// ─── Core navigation ─────────────────────────────────────────────

let current         = 0;
let isTransitioning = false;

function goTo(n) {
  const next = Math.max(0, Math.min(slides.length - 1, n));
  if (next === current || isTransitioning) return;

  isTransitioning = true;

  slideEls[current].classList.remove('active');
  thumbEls[current].classList.remove('active');

  slideEls[next].classList.add('active');
  thumbEls[next].classList.add('active');

  updateCaption(next);
  updateButtons(next);
  triggerFlash();
  scrollStripTo(next);

  current = next;
  setTimeout(() => { isTransitioning = false; }, FADE_MS);
}

// ─── Initial state ───────────────────────────────────────────────

slideEls[0].classList.add('active');
thumbEls[0].classList.add('active');
updateCaption(0);
updateButtons(0);
musicEl.volume = 1;
musicEl.muted = false;
updateMuteButton();
void tryPlayMusic();
window.addEventListener('pointerdown', handleAutoplayRetry, { passive: true });
window.addEventListener('keydown', handleAutoplayRetry);
window.addEventListener('touchstart', handleAutoplayRetry, { passive: true });

// ─── Events ──────────────────────────────────────────────────────

prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
muteBtn.addEventListener('click', e => {
  e.stopPropagation();
  musicEl.muted = !musicEl.muted;
  updateMuteButton();
  if (!musicEl.muted) {
    void tryPlayMusic();
  }
});

document.addEventListener('keydown', e => {
  if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); goTo(current + 1); }
  if (['ArrowLeft', 'ArrowUp'].includes(e.key))          { e.preventDefault(); goTo(current - 1); }
});

// Click left / right half of viewfinder
slideshowEl.addEventListener('click', e => {
  const rect = slideshowEl.getBoundingClientRect();
  const midpoint = rect.left + rect.width / 2;
  goTo(current + (e.clientX > midpoint ? 1 : -1));
});

// Swipe
let touchX = 0, touchY = 0;
document.addEventListener('touchstart', e => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
    goTo(current + (dx < 0 ? 1 : -1));
  }
}, { passive: true });
