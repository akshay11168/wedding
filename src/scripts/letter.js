const letter = document.querySelector('#letter .letter');
const mouth = document.querySelector('.env-body');
const seal = document.querySelector('.seal-hit');
const view = document.querySelector('#letter-view');
const back = document.querySelector('.letter-back');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const flapMs = 850;
const riseMs = 800;
const zoomMs = 900;

let savedScroll = 0;
let animating = false;
let open = false;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function frame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function placed(cx, cy, scale) {
  const dx = cx - window.innerWidth / 2;
  const dy = cy - window.innerHeight / 2;
  return `translate(${dx}px, ${dy}px) scale(${scale})`;
}

function mouthSpots() {
  const rect = mouth.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const scaleIn = (rect.width * 0.58) / window.innerWidth;
  const scaleUp = (rect.width * 0.86) / window.innerWidth;
  return {
    inside: placed(cx, rect.top + rect.height * 0.62, scaleIn),
    raised: placed(cx, rect.top - rect.height * 0.35, scaleUp),
  };
}

function lockScroll() {
  savedScroll = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScroll}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, savedScroll);
}

function finishOpen(target) {
  view.style.transform = 'none';
  view.classList.add('is-settled');
  animating = false;
  open = true;
  seal.setAttribute('aria-expanded', 'true');
  back.focus();
  if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

async function openLetter(target) {
  if (open) {
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (animating) return;
  animating = true;
  letter.classList.add('is-opening');

  if (reduceMotion) {
    lockScroll();
    view.hidden = false;
    finishOpen(target);
    return;
  }

  await wait(flapMs);
  const spots = mouthSpots();
  lockScroll();
  view.hidden = false;
  view.classList.remove('is-settled');
  view.style.transform = spots.inside;
  await frame();

  const rise = view.animate(
    [{ transform: spots.inside }, { transform: spots.raised }],
    { duration: riseMs, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
  );
  await rise.finished;

  const zoom = view.animate(
    [{ transform: spots.raised }, { transform: 'none' }],
    { duration: zoomMs, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
  );
  await zoom.finished;
  rise.cancel();
  zoom.cancel();
  finishOpen(target);
}

async function closeLetter() {
  if (!open || animating) return;
  animating = true;
  view.classList.remove('is-settled');
  view.scrollTo(0, 0);

  if (reduceMotion) {
    view.hidden = true;
    view.style.transform = '';
    letter.classList.remove('is-opening');
    unlockScroll();
    animating = false;
    open = false;
    seal.setAttribute('aria-expanded', 'false');
    seal.focus();
    return;
  }

  const spots = mouthSpots();
  const zoomOut = view.animate(
    [{ transform: 'none' }, { transform: spots.raised }],
    { duration: zoomMs, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
  );
  await zoomOut.finished;

  const sink = view.animate(
    [{ transform: spots.raised }, { transform: spots.inside }],
    { duration: riseMs, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
  );
  await sink.finished;
  zoomOut.cancel();
  sink.cancel();

  view.hidden = true;
  view.style.transform = '';
  letter.classList.remove('is-opening');
  await wait(flapMs);
  unlockScroll();
  animating = false;
  open = false;
  seal.setAttribute('aria-expanded', 'false');
  seal.focus();
}

seal.addEventListener('click', () => openLetter());
back.addEventListener('click', closeLetter);

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target || !view.contains(target)) return;
  event.preventDefault();
  openLetter(target);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && open) closeLetter();
});
