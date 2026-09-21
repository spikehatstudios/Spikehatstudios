// ========= Mobile menu =========
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
const close = document.getElementById('mobileClose');

function toggleMenu(open){
    if (!menu) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
}
burger && burger.addEventListener('click', () => toggleMenu(true));
close && close.addEventListener('click', () => toggleMenu(false));
menu && menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ========= Reveal on scroll =========
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fold, .svc, .comm-card, .intro-copy, .section-head, .join-title, .counter-num').forEach(el => {
        el.classList.add('reveal');
        io.observe(el);
    });
}

// ========= Counter tick =========
const counter = document.getElementById('counter');
if (counter) {
    let n = 1428;
    const target = 1428 + Math.floor(Math.random() * 8);
    let current = 1380;
    const format = v => v.toString().padStart(5, '0').replace(/^(\d{2})(\d{3})$/, '$1,$2');
    counter.textContent = format(current);
    const tick = () => {
        if (current >= target) return;
        current += 1;
        counter.textContent = format(current);
        setTimeout(tick, 40);
    };
    // start ticking once counter enters viewport
    const cio = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { tick(); cio.unobserve(e.target); } });
    });
    cio.observe(counter);
}

// ========= Nav shadow on scroll =========
const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = window.scrollY > 20 ? '0 12px 40px rgba(0,0,0,.35)' : 'none';
    }, { passive: true });
}
