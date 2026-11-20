/**
 * Casulo Amigurumi - Script de Experiência e Conversão
 * Conforme diretrizes da skill landing-page-design e taste-skill:
 * - Sem hífens dentro de frases e textos
 * - Tagline Reveal palavra por palavra via IntersectionObserver
 * - Revelações no scroll
 * - Menu móvel escalonado em 60ms
 * - Simulador com as peças reais e mensagem de WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initTaglineReveal();
  initScrollReveals();
  initCustomizer();
  initFaqAccordion();
  initMobileDrawer();
  initAudioFeedback();
  initLegalModals();
  initImageLightbox();
  initDollAlbum();
});

/* ==========================================================================
   1. B11. Tagline Reveal Section
   ========================================================================== */
function initTaglineReveal() {
  const words = document.querySelectorAll('.tagline-word');
  if (!words.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    words.forEach(w => w.classList.add('revealed'));
    return;
  }

  const wordObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        wordObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.1
  });

  words.forEach(word => wordObserver.observe(word));
}

/* ==========================================================================
   2. B7. Scroll Reveals para Seções
   ========================================================================== */
function initScrollReveals() {
  const sections = document.querySelectorAll('.scroll-reveal');
  if (!sections.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach(s => s.classList.add('visible'));
    return;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08
  });

  sections.forEach(sec => sectionObserver.observe(sec));
}

/* ==========================================================================
   3. Sintetizador de Áudio Delicado (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioFeedback() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  window.playSoftChime = function(pitch = 540) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.35, ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.31);
    } catch (e) {}
  };

  if (toggleBtn && soundLabel) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundLabel.textContent = soundEnabled ? 'Som' : 'Mudo';
      if (soundEnabled) {
        playSoftChime(640);
      }
    });
  }
}

/* ==========================================================================
   4. Simulador Interativo "Monte seu Casulo"
   ========================================================================== */
const simulatorState = {
  category: 'boneca',
  size: 'grande',
  palette: 'terrosos',
  extras: ['nome', 'caixa'],
  whatsappNumber: '5512935001344'
};

const simulatorCategories = {
  boneca: {
    title: 'Boneca Emília & Personagens Clássicos',
    desc: 'Boneca artesanal com vestido em retalhos, botões coloridos e cabelos de lã',
    baseMin: 140,
    baseMax: 220,
    time: '10 a 15 dias úteis'
  },
  personagens: {
    title: 'Linha Personagens (Hello Kitty, Kuromi, My Melody)',
    desc: 'Criação fofa dos ícones colecionáveis com touquinhas e laços detalhados',
    baseMin: 110,
    baseMax: 180,
    time: '8 a 12 dias úteis'
  },
  chaveiro: {
    title: 'Linha Mini & Chaveiros de Pelúcia (Pintinho Amigurumi)',
    desc: 'Peça compacta em fio pelúcia ultrassuave para bolsas, chaves ou lembranças',
    baseMin: 45,
    baseMax: 75,
    time: '4 a 7 dias úteis'
  },
  maternidade: {
    title: 'Linha Maternidade & Ninho do Bebê',
    desc: 'Naninha e bicho de apego com olhos reforçados para berço',
    baseMin: 95,
    baseMax: 160,
    time: '7 a 10 dias úteis'
  }
};

const simulatorSizes = {
  mini: { label: 'Mini ou Chaveiro (8 a 12 cm)', mult: 0.65 },
  medio: { label: 'Médio Clássico (18 a 22 cm)', mult: 1.0 },
  grande: { label: 'Grande Destaque (28 a 35 cm)', mult: 1.45 }
};

const simulatorPalettes = {
  terrosos: { label: 'Cores Tradicionais da Peça (Originais do Modelo)' },
  pasteis: { label: 'Tons Pastéis & Bebê (Rosa Chá, Azul Suave, Creme)' },
  vivos: { label: 'Alegre & Vibrante (Amarelo, Vermelho e Verde)' },
  personalizada: { label: 'Paleta Personalizada (Conforme o seu enxoval)' }
};

const simulatorExtras = {
  nome: { label: 'Bordado do Nome', price: 0, tag: 'Cortesia' },
  caixa: { label: 'Caixa de Presente Sensorial', price: 20, tag: '+ R$ 20' },
  guizo: { label: 'Guizo Sonoro Interno', price: 15, tag: '+ R$ 15' },
  cartao: { label: 'Cartão Caligrafado à Mão', price: 10, tag: '+ R$ 10' }
};

function initCustomizer() {
  const categoryOptions = document.querySelectorAll('[data-category-choice]');
  const sizeOptions = document.querySelectorAll('[data-size-choice]');
  const paletteOptions = document.querySelectorAll('[data-palette-choice]');
  const extraInputs = document.querySelectorAll('[data-extra-choice]');

  categoryOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      categoryOptions.forEach(c => c.classList.remove('active'));
      opt.classList.add('active');
      simulatorState.category = opt.getAttribute('data-category-choice');
      if (window.playSoftChime) playSoftChime(560);
      updateSimulatorSummary();
    });
  });

  sizeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      sizeOptions.forEach(s => s.classList.remove('active'));
      opt.classList.add('active');
      simulatorState.size = opt.getAttribute('data-size-choice');
      if (window.playSoftChime) playSoftChime(600);
      updateSimulatorSummary();
    });
  });

  paletteOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      paletteOptions.forEach(p => p.classList.remove('active'));
      opt.classList.add('active');
      simulatorState.palette = opt.getAttribute('data-palette-choice');
      if (window.playSoftChime) playSoftChime(640);
      updateSimulatorSummary();
    });
  });

  extraInputs.forEach(input => {
    input.addEventListener('change', () => {
      const val = input.getAttribute('data-extra-choice');
      if (input.checked) {
        if (!simulatorState.extras.includes(val)) {
          simulatorState.extras.push(val);
        }
      } else {
        simulatorState.extras = simulatorState.extras.filter(item => item !== val);
      }
      if (window.playSoftChime) playSoftChime(700);
      updateSimulatorSummary();
    });
  });

  const sendBtn = document.getElementById('simSendOrderBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const orderText = buildOrderText();
      const encoded = encodeURIComponent(orderText);
      const url = `https://api.whatsapp.com/send?phone=${simulatorState.whatsappNumber}&text=${encoded}`;
      window.open(url, '_blank');
    });
  }

  updateSimulatorSummary();
}

function updateSimulatorSummary() {
  const cat = simulatorCategories[simulatorState.category];
  const size = simulatorSizes[simulatorState.size];
  const pal = simulatorPalettes[simulatorState.palette];

  let extrasCost = 0;
  simulatorState.extras.forEach(key => {
    if (simulatorExtras[key]) {
      extrasCost += simulatorExtras[key].price;
    }
  });

  const finalMin = Math.round(cat.baseMin * size.mult + extrasCost);
  const finalMax = Math.round(cat.baseMax * size.mult + extrasCost);

  const titleEl = document.getElementById('summaryTitle');
  const descEl = document.getElementById('summaryDesc');
  const sizeEl = document.getElementById('summarySize');
  const palEl = document.getElementById('summaryPalette');
  const timeEl = document.getElementById('summaryTime');
  const priceEl = document.getElementById('summaryPrice');
  const extrasEl = document.getElementById('summaryExtras');

  if (titleEl) titleEl.textContent = cat.title;
  if (descEl) descEl.textContent = cat.desc;
  if (sizeEl) sizeEl.textContent = size.label;
  if (palEl) palEl.textContent = pal.label;
  if (timeEl) timeEl.textContent = cat.time;
  if (priceEl) priceEl.textContent = `R$ ${finalMin} a R$ ${finalMax}`;

  if (extrasEl) {
    extrasEl.innerHTML = '';
    if (simulatorState.extras.length === 0) {
      extrasEl.innerHTML = '<span class="caption-4 text-stone-500">Nenhum toque extra selecionado</span>';
    } else {
      simulatorState.extras.forEach(key => {
        const item = simulatorExtras[key];
        const span = document.createElement('span');
        span.className = 'caption-3 px-2 py-1 rounded bg-stone-100 text-stone-700 mr-1.5 mb-1 inline-block border border-stone-200';
        span.textContent = `${item.label} (${item.tag})`;
        extrasEl.appendChild(span);
      });
    }
  }
}

function buildOrderText() {
  const cat = simulatorCategories[simulatorState.category];
  const size = simulatorSizes[simulatorState.size];
  const pal = simulatorPalettes[simulatorState.palette];
  const priceEl = document.getElementById('summaryPrice');
  const priceStr = priceEl ? priceEl.textContent : '';
  const extrasList = simulatorState.extras.map(k => simulatorExtras[k].label).join(', ') || 'Nenhum';

  return `Olá Ateliê Casulo Amigurumi!
Montei meu pedido pelo site com os seguintes detalhes:

Peça: ${cat.title}
Tamanho: ${size.label}
Paleta: ${pal.label}
Toques Especiais: ${extrasList}
Prazo previsto: ${cat.time}
Estimativa base: ${priceStr}

Gostaria de confirmar a encomenda e enviar minhas referências. Muito obrigado!`;
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector('.faq-icon');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          const otherContent = other.nextElementSibling;
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (content) content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
        if (window.playSoftChime) playSoftChime(580);
      }
    });
  });
}

/* ==========================================================================
   6. Menu Móvel Escalonado (60ms Stagger)
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('openMobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.drawer-link-item');

  function openMenu() {
    if (!backdrop || !drawer) return;
    backdrop.classList.remove('hidden');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('open');

    links.forEach((link, idx) => {
      link.style.transitionDelay = `${idx * 60}ms`;
    });
  }

  function closeMenu() {
    if (!backdrop || !drawer) return;
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('open');
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 300);

    links.forEach(link => {
      link.style.transitionDelay = '0ms';
    });
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  links.forEach(l => {
    l.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   7. Modais Legais (Privacidade e Termos)
   ========================================================================== */
function initLegalModals() {
  const modal = document.getElementById('legalModal');
  const modalTitle = document.getElementById('legalModalTitle');
  const modalBody = document.getElementById('legalModalBody');
  const closeBtn = document.getElementById('closeLegalModalBtn');
  const backdrop = document.getElementById('legalModalBackdrop');

  window.openLegalModal = function(type) {
    if (!modal || !modalTitle || !modalBody) return;
    if (type === 'privacidade') {
      modalTitle.textContent = 'Política de Privacidade';
      modalBody.innerHTML = `
        <p class="body-5 text-stone-700 mb-3">No Ateliê Casulo Amigurumi, respeitamos a sua privacidade. Os dados informados pelo simulador (como nome, modelo escolhido e contato via WhatsApp) são utilizados exclusivamente para a confecção artesanal e o envio seguro da sua encomenda.</p>
        <p class="body-5 text-stone-700 mb-3">Não compartilhamos informações com terceiros nem realizamos cobranças automáticas. Toda a conversa ocorre de forma transparente e direta com a artesã.</p>
      `;
    } else {
      modalTitle.textContent = 'Termos de Encomenda e Entrega';
      modalBody.innerHTML = `
        <p class="body-5 text-stone-700 mb-3">Cada amigurumi é confeccionado manualmente com fio 100% algodão hipoalergênico e travas de segurança reforçadas.</p>
        <p class="body-5 text-stone-700 mb-3">Antes de despachar o pacote nos Correios, enviamos fotos e vídeos em alta resolução para a sua validação. A postagem só é feita após a sua aprovação total.</p>
      `;
    }
    modal.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
  };

  function closeModal() {
    if (modal) modal.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}

/* ==========================================================================
   8. Lightbox para Fotos Reais em Alta Resolução
   ========================================================================== */
function initImageLightbox() {
  const lightbox = document.getElementById('imageLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const backdrop = document.getElementById('lightboxBackdrop');

  window.openLightbox = function(src, title) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Peça Artesanal Casulo Amigurumi';
    lightbox.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
    if (window.playSoftChime) playSoftChime(620);
  };

  function closeLightbox() {
    if (lightbox) lightbox.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
}

/* ==========================================================================
   9. Álbum Digital de Bonecas do Ateliê (38 Peças)
   ========================================================================== */
let currentAlbumIndex = 0;

function initDollAlbum() {
  const modal = document.getElementById('dollAlbumModal');
  const backdrop = document.getElementById('albumBackdrop');
  const thumbsContainer = document.getElementById('albumThumbnailsContainer');
  
  if (!window.dollsCatalog || !window.dollsCatalog.length) {
    console.warn('Catálogo de bonecas não encontrado.');
    return;
  }

  const catalog = window.dollsCatalog;

  // Renderizar miniaturas na barra inferior
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    catalog.forEach((doll, idx) => {
      const thumb = document.createElement('button');
      thumb.className = `album-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.setAttribute('aria-label', `Ir para ${doll.nome}`);
      thumb.setAttribute('title', `${doll.id}. ${doll.nome}`);
      thumb.onclick = () => {
        currentAlbumIndex = idx;
        renderAlbumPage(currentAlbumIndex);
      };

      const img = document.createElement('img');
      img.src = doll.foto;
      img.alt = doll.nome;
      img.loading = 'lazy';

      thumb.appendChild(img);
      thumbsContainer.appendChild(thumb);
    });
  }

  // Navegação por teclado (Setas Esquerda e Direita e Esc)
  window.addEventListener('keydown', (e) => {
    if (!modal || modal.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextAlbumPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prevAlbumPage();
    } else if (e.key === 'Escape') {
      closeDollAlbum();
    }
  });

  // Suporte a deslize no celular (Touch Swipe)
  let touchStartX = 0;
  let touchEndX = 0;
  const pageStage = document.getElementById('albumPageContent');

  if (pageStage) {
    pageStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pageStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance < -45) {
      nextAlbumPage();
    } else if (swipeDistance > 45) {
      prevAlbumPage();
    }
  }

  window.openDollAlbum = function(index = 0) {
    if (!modal) return;
    currentAlbumIndex = Math.max(0, Math.min(catalog.length - 1, index));
    renderAlbumPage(currentAlbumIndex);

    modal.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (window.playSoftChime) playSoftChime(580);
  };

  window.closeDollAlbum = function() {
    if (!modal) return;
    modal.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  window.renderAlbumPage = function(index) {
    const doll = catalog[index];
    if (!doll) return;

    const pageCurrent = document.getElementById('albumPageCurrent');
    const pageTotal = document.getElementById('albumPageTotal');
    const progressBar = document.getElementById('albumProgressBar');
    const dollImg = document.getElementById('albumDollImage');
    const dollBadge = document.getElementById('albumDollBadge');
    const dollName = document.getElementById('albumDollName');
    const dollDesc = document.getElementById('albumDollDesc');
    const dollHeight = document.getElementById('albumDollHeight');
    const dollYarn = document.getElementById('albumDollYarn');
    const dollPrice = document.getElementById('albumDollPrice');
    const pageContent = document.getElementById('albumPageContent');

    if (pageCurrent) pageCurrent.textContent = String(doll.id);
    if (pageTotal) pageTotal.textContent = String(catalog.length);
    if (progressBar) progressBar.style.width = `${((doll.id) / catalog.length) * 100}%`;

    if (dollImg) {
      dollImg.src = doll.foto;
      dollImg.alt = doll.nome;
    }
    if (dollBadge) dollBadge.textContent = `Peça #${String(doll.id).padStart(2, '0')}`;
    if (dollName) dollName.textContent = doll.nome;
    if (dollDesc) dollDesc.textContent = doll.caracteristicas;
    if (dollHeight) dollHeight.textContent = doll.altura;
    if (dollYarn) dollYarn.textContent = doll.tipoLinha;
    if (dollPrice) dollPrice.textContent = doll.valorAproximado;

    // Atualizar miniaturas ativas
    if (thumbsContainer) {
      const thumbs = thumbsContainer.querySelectorAll('.album-thumb-item');
      thumbs.forEach((t, i) => {
        if (i === index) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });
    }

    // Efeito sutil de virar de página
    if (pageContent) {
      pageContent.classList.remove('page-flip-anim');
      void pageContent.offsetWidth; // Forçar reflow para reiniciar animação
      pageContent.classList.add('page-flip-anim');
    }
  };

  window.nextAlbumPage = function() {
    currentAlbumIndex = (currentAlbumIndex + 1) % catalog.length;
    renderAlbumPage(currentAlbumIndex);
    if (window.playSoftChime) playSoftChime(640);
  };

  window.prevAlbumPage = function() {
    currentAlbumIndex = (currentAlbumIndex - 1 + catalog.length) % catalog.length;
    renderAlbumPage(currentAlbumIndex);
    if (window.playSoftChime) playSoftChime(520);
  };

  window.orderCurrentDollViaWhatsapp = function() {
    const doll = catalog[currentAlbumIndex];
    if (!doll) return;

    const mensagem =
      `Olá Ateliê Casulo Amigurumi! Amei a *${doll.nome}* que vi no Álbum Digital (Página ${doll.id} de ${catalog.length}).\n\n` +
      `• Altura: ${doll.altura}\n` +
      `• Linha: ${doll.tipoLinha}\n` +
      `• Características: ${doll.caracteristicas}\n` +
      `• Faixa estimada: ${doll.valorAproximado}\n\n` +
      `Gostaria de verificar a confecção sob medida! Como podemos combinar os detalhes da encomenda?`;

    const url = `https://wa.me/5512935001344?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  window.customizeCurrentDollInSimulator = function() {
    closeDollAlbum();
    const simSection = document.getElementById('simulador');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.openLightboxFromAlbum = function() {
    const doll = catalog[currentAlbumIndex];
    if (doll && window.openLightbox) {
      window.openLightbox(doll.foto, `${doll.nome} • ${doll.altura}`);
    }
  };
}

