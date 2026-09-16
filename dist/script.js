/* ===== 倒计时目标：2026年11月10日 15:00（宾客签到时间） ===== */
const WEDDING_DATE = new Date('2026-11-10T15:00:00+08:00');

/* ===== 倒计时 ===== */
const els = {
  d: document.getElementById('cdDays'),
  h: document.getElementById('cdHours'),
  m: document.getElementById('cdMins'),
  s: document.getElementById('cdSecs'),
  note: document.getElementById('cdNote'),
};
function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const now = new Date();
  let diff = Math.floor((WEDDING_DATE - now) / 1000);
  if (diff <= 0){
    els.d.textContent = '00'; els.h.textContent = '00';
    els.m.textContent = '00'; els.s.textContent = '00';
    els.note.textContent = '签到已开始，欢迎你的到来 ♥';
    return;
  }
  const days = Math.floor(diff / 86400); diff -= days * 86400;
  const hrs  = Math.floor(diff / 3600);  diff -= hrs * 3600;
  const mins = Math.floor(diff / 60);    diff -= mins * 60;
  els.d.textContent = days;
  els.h.textContent = pad(hrs);
  els.m.textContent = pad(mins);
  els.s.textContent = pad(diff);
}
tick();
setInterval(tick, 1000);

/* ===== 滚动渐入 ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== 导航：滚动变实 + 移动端菜单 ===== */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('nav--solid', window.scrollY > 60);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ===== 图片点击放大（同页遮罩，无需新开网页） ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.map-zoom').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
lightbox.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
