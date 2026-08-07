const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

window.addEventListener('load', () => setTimeout(() => $('#loader').style.cssText = 'opacity:0;visibility:hidden', 550));
$('#year').textContent = new Date().getFullYear();

const header = $('#header'), progress = $('#progress');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
  progress.style.width = `${window.scrollY / (document.documentElement.scrollHeight - innerHeight) * 100}%`;
}, { passive: true });

const menu = $('.menu-btn'), nav = $('#navbar');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
$$('#navbar a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const themeToggle = $('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
const renderTheme = () => { themeToggle.innerHTML = document.body.classList.contains('dark') ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>'; };
renderTheme();
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); renderTheme(); });

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-visible');
  if (entry.target.classList.contains('skill-card')) $('.skill-line i', entry.target).style.width = `${entry.target.dataset.level}%`;
  revealObserver.unobserve(entry.target);
}), { threshold: .14 });
$$('.reveal').forEach(el => revealObserver.observe(el));

const sections = $$('main section[id]'), links = $$('#navbar a');
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-42% 0px -52% 0px' });
sections.forEach(section => navObserver.observe(section));

if (matchMedia('(pointer:fine)').matches) {
  const dot = $('.cursor-dot'), ring = $('.cursor-ring');
  addEventListener('mousemove', e => { dot.style.left = ring.style.left = `${e.clientX}px`; dot.style.top = ring.style.top = `${e.clientY}px`; });
  $$('a,button,input,textarea').forEach(el => { el.addEventListener('mouseenter', () => ring.classList.add('hover')); el.addEventListener('mouseleave', () => ring.classList.remove('hover')); });
}

const canvas = $('#orb-canvas'), ctx = canvas.getContext('2d');
let dots = [];
function resizeCanvas() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); dots = Array.from({ length: Math.min(42, Math.floor(innerWidth / 30)) }, () => ({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, r: Math.random()*1.5+.4, dx:(Math.random()-.5)*.22, dy:(Math.random()-.5)*.22 })); }
function animateCanvas() { ctx.clearRect(0,0,innerWidth,innerHeight); const dark = document.body.classList.contains('dark'); dots.forEach((dot, i) => { dot.x += dot.dx; dot.y += dot.dy; if(dot.x<0||dot.x>innerWidth) dot.dx*=-1; if(dot.y<0||dot.y>innerHeight) dot.dy*=-1; ctx.fillStyle = dark ? 'rgba(155,178,255,.32)' : 'rgba(49,94,251,.28)'; ctx.beginPath(); ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2); ctx.fill(); dots.slice(i+1).forEach(other => { const dx=dot.x-other.x,dy=dot.y-other.y,d=Math.hypot(dx,dy); if(d<125){ctx.strokeStyle=dark?'rgba(155,178,255,.07)':'rgba(49,94,251,.07)';ctx.beginPath();ctx.moveTo(dot.x,dot.y);ctx.lineTo(other.x,other.y);ctx.stroke();} }); }); requestAnimationFrame(animateCanvas); }
resizeCanvas(); animateCanvas(); addEventListener('resize', resizeCanvas);

fetch('https://api.github.com/users/aashishyadav-in').then(res => { if (!res.ok) throw Error('GitHub unavailable'); return res.json(); }).then(user => { $('#github-repos').textContent = user.public_repos; $('#github-followers').textContent = user.followers; $('#github-following').textContent = user.following; }).catch(() => { $$('.github-stats b').forEach(el => el.textContent = '—'); });

const contactForm = $('#contact-form'), contactStatus = $('#contact-status');
if (window.emailjs) {
  emailjs.init({ publicKey: 'vT6lCTujYvXAi3RID' });
  contactForm.addEventListener('submit', event => { event.preventDefault(); const button = $('button[type="submit"]', contactForm); button.disabled = true; button.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin"></i>'; contactStatus.textContent = 'Sending your message…'; emailjs.sendForm('service_puiu2f5', 'template_9ctllbk', contactForm).then(() => { contactForm.reset(); contactStatus.textContent = 'Message sent — thank you!'; }).catch(() => { contactStatus.textContent = 'Could not send right now. Please try again.'; }).finally(() => { button.disabled = false; button.innerHTML = 'Send message <i class="fa-solid fa-paper-plane"></i>'; }); });
} else contactStatus.textContent = 'Contact form is temporarily unavailable.';

const assistantToggle = $('#assistant-toggle'), assistantPanel = $('#assistant-panel'), assistantClose = $('#assistant-close'), assistantMessages = $('#assistant-messages');
function toggleAssistant(open) { assistantPanel.hidden = !open; assistantToggle.setAttribute('aria-expanded', open); }
assistantToggle.addEventListener('click', () => toggleAssistant(assistantPanel.hidden)); assistantClose.addEventListener('click', () => toggleAssistant(false));
const replies = { skills: 'Aashish works with HTML, CSS, JavaScript, Python, Java, Git/GitHub, Firebase, and cybersecurity tools such as Nmap and Wireshark.', projects: 'The featured work includes an AI Study Platform, this portfolio, and an in-progress Cyber Security Lab. Scroll to Selected work to explore them.', contact: 'Use the form below or connect through LinkedIn and GitHub. Aashish is open to internships and collaborations.' };
$$('[data-question]').forEach(button => button.addEventListener('click', () => { assistantMessages.insertAdjacentHTML('beforeend', `<p class="assistant-user">${button.textContent}</p><p class="assistant-bot">${replies[button.dataset.question]}</p>`); assistantMessages.scrollTop = assistantMessages.scrollHeight; }));
