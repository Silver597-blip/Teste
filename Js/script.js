// Sistema de Menu Mobile Robusto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Menu mobile carregando...');
    
    // Aguardar um pouco para garantir que tudo está carregado
    setTimeout(() => {
        inicializarMenuMobile();
    }, 100);
});

function inicializarMenuMobile() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('📱 Inicializando menu mobile');
    console.log('Hamburger encontrado:', hamburger);
    console.log('NavMenu encontrado:', navMenu);
    
    if (!hamburger || !navMenu) {
        console.error('❌ Elementos do menu não encontrados');
        return;
    }
    
    // Remover classes antigas
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Evento touch para mobile
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        console.log('📱 Touch detectado no hamburger');
        toggleMenu();
    });
    
    // Evento click para desktop
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🖱️ Click detectado no hamburger');
        toggleMenu();
    });
    
    // Função para alternar menu
    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        console.log('Menu estado anterior:', isActive ? 'aberto' : 'fechado');
        
        if (isActive) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('✅ Menu fechado');
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            document.body.classList.add('menu-open');
            console.log('✅ Menu aberto');
        }
    }
    
    // Fechar menu ao clicar em links
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Link clicado, fechando menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        const isMenuOpen = navMenu.classList.contains('active');
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
            console.log('🖱️ Click fora do menu, fechando');
            toggleMenu();
        }
    });
    
    // Prevenir scroll quando menu está aberto
    let scrollPosition = 0;
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('active')) {
                scrollPosition = window.pageYOffset;
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollPosition}px`;
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollPosition);
            }
        });
    });
    
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
    
    console.log('✅ Menu mobile configurado com sucesso!');
}

// Adicionar estados de debug visuais
if (window.location.hostname.includes('github.io')) {
    console.log('🌐 Site rodando no GitHub Pages');
    
    // Adicionar indicador visual de debug
    const debugIndicator = document.createElement('div');
    debugIndicator.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #ff0000;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 9999;
    `;
    debugIndicator.textContent = 'DEBUG MODE';
    document.body.appendChild(debugIndicator);
}

// Validação e envio do formulário de contato
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obter dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Aqui você pode adicionar o código para enviar os dados
    console.log("Dados do formulário de contato:", data);

    // Simular envio bem-sucedido
    alert("Obrigado pelo contato! Responderemos em breve.");
    this.reset();
  });
}

// Validação e envio do formulário de medidas
const measurementForm = document.getElementById("measurementForm");
if (measurementForm) {
  measurementForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obter dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Aqui você pode adicionar o código para enviar os dados
    console.log("Dados das medidas:", data);

    // Simular envio bem-sucedido
    alert(
      "Medidas enviadas com sucesso! Entraremos em contato para confirmar o pedido."
    );
    this.reset();
  });
}

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação ao scroll (fade in)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animação da galeria
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

galleryItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  galleryObserver.observe(item);
});

// Observar elementos para animação
document
  .querySelectorAll(".feature-card, .service-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Máscara de telefone
function applyPhoneMask(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 10) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/(\d{0,2})/, "($1");
  }

  input.value = value;
}

// Aplicar máscara nos campos de telefone
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("input", () => applyPhoneMask(input));
});

// Validação de e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Adicionar validação em tempo real
document.querySelectorAll('input[type="email"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      this.style.borderColor = "var(--danger)";
      this.setCustomValidity("Por favor, insira um e-mail válido");
    } else {
      this.style.borderColor = "";
      this.setCustomValidity("");
    }
  });
});

// Botão voltar ao topo
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = "back-to-top";
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

// Mostrar/ocultar botão ao scrollar
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
});

// Voltar ao topo ao clicar
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Efeito hover nos cards
document
  .querySelectorAll(".feature-card, .service-card, .testimonial-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });

// Loading state para formulários
function setLoadingState(button, loading = true) {
  if (loading) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;
  } else {
    button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
    button.disabled = false;
  }
}

// Adicionar loading nos formulários
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const submitButton = this.querySelector('button[type="submit"]');
    setLoadingState(submitButton, true);

    // Simular envio
    setTimeout(() => {
      setLoadingState(submitButton, false);
      alert("Obrigado pelo contato! Responderemos em breve.");
      this.reset();
    }, 2000);
  });
}

if (measurementForm) {
  measurementForm.addEventListener("submit", function (e) {
    const submitButton = this.querySelector('button[type="submit"]');
    setLoadingState(submitButton, true);

    // Simular envio
    setTimeout(() => {
      setLoadingState(submitButton, false);
      alert(
        "Medidas enviadas com sucesso! Entraremos em contato para confirmar o pedido."
      );
      this.reset();
    }, 2000);
  });
}

// Console log de boas-vindas
console.log(
  "%c🧵 Alfaiataria Elegante - Site desenvolvido com ❤️",
  "color: #d4af37; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c📧 Contato: contato@alfaiatariaelegante.com.br",
  "color: #2c3e50;"
);

