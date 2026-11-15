/**
 * CASULO AMIGURUMI - INTERATIVIDADE & FUNCIONALIDADES
 * Número Oficial do WhatsApp: +55 1235001344
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryFilters();
  initLightbox();
  initBudgetSimulator();
  initCrossPromoButton();
});

/* ==========================================================================
   MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
      toggleBtn.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Fechar ao clicar em um link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        toggleBtn.innerHTML = '☰';
      });
    });
  }
}

/* ==========================================================================
   FILTROS DA GALERIA (ESTILO INSTAGRAM)
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   LIGHTBOX / MODAL DE DETALHES DA PEÇA
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalOrderBtn = document.getElementById('modalOrderBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!modal) return;

  document.querySelectorAll('.btn-open-lightbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.gallery-card');
      const imgSrc = card.querySelector('img').getAttribute('src');
      const title = card.querySelector('.gallery-card-title').textContent;
      const desc = card.querySelector('.gallery-card-desc').textContent;

      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Monta link direto pro WhatsApp com o nome da peça
      const msg = encodeURIComponent(`Olá! Vi no site o amigurumi "${title}" e gostaria de saber mais informações e valores para encomenda! 🧶✨`);
      modalOrderBtn.href = `https://wa.me/551235001344?text=${msg}`;

      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 20);
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   SIMULADOR DE ORÇAMENTO & ENCOMENDA DIRETA NO WHATSAPP
   ========================================================================== */
function initBudgetSimulator() {
  const form = document.getElementById('budgetForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const pieceType = document.querySelector('input[name="pieceType"]:checked')?.value || 'Amigurumi Personalizado';
    const pieceSize = document.querySelector('input[name="pieceSize"]:checked')?.value || 'Tamanho Padrão';
    const notes = document.getElementById('clientNotes').value.trim();

    // Formata a mensagem com carinho
    let whatsappText = `*Olá, Casulo Amigurumi! Gostaria de um orçamento:* 🧶✨\n\n`;
    whatsappText += `👤 *Nome:* ${name || 'Não informado'}\n`;
    if (phone) whatsappText += `📱 *Contato:* ${phone}\n`;
    whatsappText += `🧸 *Tipo de Peça:* ${pieceType}\n`;
    whatsappText += `📏 *Tamanho Desejado:* ${pieceSize}\n`;
    if (notes) whatsappText += `📝 *Detalhes & Personalização:* ${notes}\n\n`;
    whatsappText += `_Enviado pelo site Casulo Amigurumi_`;

    const encoded = encodeURIComponent(whatsappText);
    const waUrl = `https://wa.me/551235001344?text=${encoded}`;

    // Mostra toast de sucesso
    showToast('✨ Preparando seu orçamento... Redirecionando para o WhatsApp!', 'success');

    // Abre o WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  });
}

/* ==========================================================================
   BOTÃO DE OUTRO INSTAGRAM (CAMA, MESA, BANHO & VESTUÁRIO)
   "esse botão deve estar la mas não funcional por enquanto"
   ========================================================================== */
function initCrossPromoButton() {
  const disabledBtn = document.getElementById('btnCrossInstagram');
  if (!disabledBtn) return;

  disabledBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('🌸 Em breve! O link oficial do nosso ateliê de Roupas, Cama, Mesa e Banho será anunciado aqui.', 'info');
  });
}

/* ==========================================================================
   TOAST DE NOTIFICAÇÃO AMIGÁVEL
   ========================================================================== */
function showToast(message, type = 'info') {
  let toast = document.getElementById('customToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'customToast';
    toast.className = 'custom-toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '💌' : '🧵';
  toast.innerHTML = `<span style="font-size: 1.4rem;">${icon}</span> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

