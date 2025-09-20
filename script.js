let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Abre e fecha o menu mobile
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Detecta o scroll e muda a navbar
window.onscroll = () => {
    let top = window.scrollY;
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (top >= sectionTop && top < sectionTop + sectionHeight) {
            currentSection = sectionId;

            // Ativa o link no menu
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(sectionId)) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Muda a cor da navbar com base na seção visível
    switch (currentSection) {
        case 'home':
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-home');
            break;
        case 'sobre':
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-sobre');
            break;
        case 'missao':
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-missao');
            break;
        case 'eventos':
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-eventos');
            break;
        case 'contato':
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-contato');
            break;
        default:
            header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-home');
    }

    // Sticky
    header.classList.toggle('sticky', top > 100);
};

// ScrollReveal
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

// === ACESSIBILIDADE: LEITURA EM VOZ ALTA ===
let synth = window.speechSynthesis;
let lendo = false;

document.getElementById("audioBtn").addEventListener("click", () => {
  if (!lendo) {
    let texto = document.body.innerText; // Pega todo o texto visível do site
    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    synth.speak(fala);
    lendo = true;
    document.getElementById("audioBtn").innerText = "⏹ Parar Áudio";
  } else {
    synth.cancel();
    lendo = false;
    document.getElementById("audioBtn").innerText = "🔊 Áudio";
  }
});

