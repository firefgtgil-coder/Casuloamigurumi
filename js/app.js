/**
 * Casulo Amigurumi - Interactive Experience Engine
 * Handles Customizer Simulator, Instagram Feed Filter, Like Particles, Audio Feedback & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initSoundEngine();
  initCustomizer();
  initInstagramFeed();
  initFaqAccordion();
  initMobileMenu();
  initHeroShowcase();
});

/* ==========================================================================
   1. Audio Synthesizer (Zero external audio files, pure Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSoundEngine() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

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

  window.playDelicateChime = function(pitch = 520, type = 'sine') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  if (toggleBtn && soundIcon) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
        `;
        playDelicateChime(640);
        showToast("Efeitos sonoros ativados ✨");
      } else {
        soundIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        `;
        showToast("Efeitos sonoros silenciados");
      }
    });
  }
}

/* ==========================================================================
   2. Interactive Customizer Simulator ("Monte seu Casulo")
   ========================================================================== */
const customizerState = {
  category: 'maternidade',
  size: 'medio',
  palette: 'terrosos',
  extras: ['nome', 'caixa'],
  targetPhone: '5511999999999' // Editable or placeholder WhatsApp
};

const categoryData = {
  maternidade: {
    title: 'Linha Maternidade & Bebê',
    preview: 'Bichinho de Apego / Naninha / Porta de Maternidade',
    desc: 'Peças com toque ultrassuave e olhos bordados ou com trava de segurança anti-asfixia. O primeiro companheiro de berço do bebê.',
    baseMin: 95,
    baseMax: 160,
    time: '7 a 10 dias úteis'
  },
  pets: {
    title: 'Pet Personalizado em Crochê',
    preview: 'Cachorrinho ou Gatinho com as manchas e cores do seu pet',
    desc: 'Homenagem emocionante reproduzida à mão a partir das fotos do seu animalzinho de estimação.',
    baseMin: 120,
    baseMax: 190,
    time: '10 a 14 dias úteis'
  },
  boneca: {
    title: 'Mini Mim & Boneca Afetiva',
    preview: 'Boneca com tom de pele, cabelo e roupinhas sob medida',
    desc: 'Bonecas articuladas e macias que refletem quem você ama, com direito a troca de roupinhas artesanais.',
    baseMin: 130,
    baseMax: 210,
    time: '10 a 15 dias úteis'
  },
  geek: {
    title: 'Personagens, Heróis & Contos',
    preview: 'Seu herói, desenho favorito ou santinha em amigurumi',
    desc: 'Criação fofa e estilizada dos seus ícones da cultura pop e contos infantis com acabamento rico em detalhes.',
    baseMin: 110,
    baseMax: 180,
    time: '8 a 12 dias úteis'
  },
  decor: {
    title: 'Decoração Afetiva & Vasinhos',
    preview: 'Cactos, suculentas e miniaturas florais que não murcham',
    desc: 'O charme artesanal para estantes, mesas de trabalho e cantinhos especiais da casa sem precisar regar.',
    baseMin: 65,
    baseMax: 110,
    time: '5 a 8 dias úteis'
  }
};

const sizeData = {
  mini: { label: 'Mini / Chaveiro (8 - 12 cm)', mult: 0.75, note: 'Ideal para lembrancinhas de batizado ou chaves' },
  medio: { label: 'Médio Clássico (18 - 22 cm)', mult: 1.0, note: 'Tamanho mais pedido para abraços e naninhas' },
  grande: { label: 'Destaque Decorativo (28 - 35 cm)', mult: 1.45, note: 'Impacto visual lindo para nichos e berços' }
};

const paletteData = {
  terrosos: { label: 'Tons Terrosos & Boho', tags: 'Terracota, mostarda, verde sálvia e linho cru' },
  pasteis: { label: 'Nuvem Suave (Pastéis)', tags: 'Rosa antigo, azul bebê, off-white e lavanda' },
  vivos: { label: 'Alegre & Divertido', tags: 'Cores vibrantes, amarelo sol, turquesa e coral' },
  neutros: { label: 'Minimalista & Neutro', tags: 'Cru, areia, cappuccino e toques dourados' }
};

const extrasData = {
  nome: { label: 'Bordar Nome Personalizado', price: 0, tag: 'Incluso no ateliê' },
  guizo: { label: 'Guizo Sonoro Suave Interno', price: 15, tag: '+ R$ 15' },
  caixa: { label: 'Embalagem de Presente Sensorial', price: 20, tag: '+ R$ 20' },
  cartao: { label: 'Cartão Caligrafado à Mão', price: 10, tag: '+ R$ 10' }
};

function initCustomizer() {
  const categoryCards = document.querySelectorAll('[data-custom-cat]');
  const sizeRadios = document.querySelectorAll('[data-custom-size]');
  const paletteChips = document.querySelectorAll('[data-custom-palette]');
  const extraCheckboxes = document.querySelectorAll('[data-custom-extra]');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      customizerState.category = card.getAttribute('data-custom-cat');
      playDelicateChime(580);
      updateSimulatorUI();
    });
  });

  sizeRadios.forEach(radio => {
    radio.addEventListener('click', () => {
      sizeRadios.forEach(r => r.classList.remove('active'));
      radio.classList.add('active');
      customizerState.size = radio.getAttribute('data-custom-size');
      playDelicateChime(620);
      updateSimulatorUI();
    });
  });

  paletteChips.forEach(chip => {
    chip.addEventListener('click', () => {
      paletteChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      customizerState.palette = chip.getAttribute('data-custom-palette');
      playDelicateChime(660);
      updateSimulatorUI();
    });
  });

  extraCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const extraVal = checkbox.getAttribute('data-custom-extra');
      if (checkbox.checked) {
        if (!customizerState.extras.includes(extraVal)) {
          customizerState.extras.push(extraVal);
        }
      } else {
        customizerState.extras = customizerState.extras.filter(item => item !== extraVal);
      }
      playDelicateChime(720);
      updateSimulatorUI();
    });
  });

  const whatsappBtn = document.getElementById('simSendWhatsappBtn');
  const copyBtn = document.getElementById('simCopySummaryBtn');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const message = generateOrderSummaryText();
      const encoded = encodeURIComponent(message);
      // Pre-fill WhatsApp URL (defaults to sending or opening app)
      const url = `https://api.whatsapp.com/send?phone=${customizerState.targetPhone}&text=${encoded}`;
      window.open(url, '_blank');
      showToast("Abrindo WhatsApp com seu pedido montado! 🧶");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const message = generateOrderSummaryText();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
          showToast("Resumo copiado! Redirecionando para o Instagram @casulo.amigurumi... ✨");
          setTimeout(() => {
            window.open('https://www.instagram.com/casulo.amigurumi/', '_blank');
          }, 1200);
        });
      } else {
        window.open('https://www.instagram.com/casulo.amigurumi/', '_blank');
      }
    });
  }

  updateSimulatorUI();
}

function updateSimulatorUI() {
  const catInfo = categoryData[customizerState.category];
  const sizeInfo = sizeData[customizerState.size];
  const palInfo = paletteData[customizerState.palette];

  // Calculate pricing
  let extrasTotal = 0;
  customizerState.extras.forEach(extraKey => {
    if (extrasData[extraKey]) {
      extrasTotal += extrasData[extraKey].price;
    }
  });

  const estMin = Math.round(catInfo.baseMin * sizeInfo.mult + extrasTotal);
  const estMax = Math.round(catInfo.baseMax * sizeInfo.mult + extrasTotal);

  // Update DOM elements
  const titleEl = document.getElementById('simPreviewTitle');
  const descEl = document.getElementById('simPreviewDesc');
  const sizeEl = document.getElementById('simPreviewSize');
  const paletteEl = document.getElementById('simPreviewPalette');
  const extrasEl = document.getElementById('simPreviewExtras');
  const timeEl = document.getElementById('simPreviewTime');
  const priceEl = document.getElementById('simPreviewPrice');

  if (titleEl) titleEl.innerText = catInfo.title;
  if (descEl) descEl.innerText = catInfo.preview;
  if (sizeEl) sizeEl.innerText = sizeInfo.label;
  if (paletteEl) paletteEl.innerText = palInfo.label;
  if (timeEl) timeEl.innerText = catInfo.time;
  if (priceEl) priceEl.innerText = `R$ ${estMin} a R$ ${estMax}`;

  if (extrasEl) {
    if (customizerState.extras.length === 0) {
      extrasEl.innerHTML = `<span class="text-stone-400 italic">Nenhum adicional selecionado</span>`;
    } else {
      extrasEl.innerHTML = customizerState.extras
        .map(key => `<span class="inline-block bg-amber-50 text-amber-900 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium mr-1.5 mb-1">${extrasData[key].label}</span>`)
        .join('');
    }
  }
}

function generateOrderSummaryText() {
  const cat = categoryData[customizerState.category].title;
  const size = sizeData[customizerState.size].label;
  const pal = paletteData[customizerState.palette].label;
  const extras = customizerState.extras.map(e => extrasData[e].label).join(', ') || 'Nenhum';

  return `✨ Olá Ateliê Casulo Amigurumi (@casulo.amigurumi)! 🧶\n` +
         `Acabei de montar uma simulação no site e quero consultar sua agenda de encomendas:\n\n` +
         `• Categoria: ${cat}\n` +
         `• Tamanho Desejado: ${size}\n` +
         `• Paleta de Cores: ${pal}\n` +
         `• Personalizações: ${extras}\n\n` +
         `Poderiam me informar a data mais próxima para entrega e os detalhes para pagamento? Muito obrigado(a)!`;
}

/* ==========================================================================
   3. Interactive Instagram Feed (@casulo.amigurumi Gallery)
   ========================================================================== */
const instagramPosts = [
  {
    id: 1,
    category: 'maternidade',
    title: 'Naninha Carneirinho Sonhador',
    subtitle: 'Companheiro perfeito para o sono seguro do bebê',
    likes: 342,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    tags: ['#Maternidade', '#AmigurumiAfetivo', '#BebêChegando'],
    description: 'Confeccionado com fio 100% algodão biológico antialérgico, com textura macia que traz aconchego e segurança sensorial aos primeiros meses de vida.',
    details: 'Tamanho: 22cm • Olhinhos bordados à mão • Lavável na máquina'
  },
  {
    id: 2,
    category: 'pets',
    title: 'Golden Retriever Afetivo',
    subtitle: 'Homenagem eterna feita a partir de fotos reais',
    likes: 518,
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80',
    tags: ['#PetAmigurumi', '#AmorDeQuatroPatas', '#FeitoAMão'],
    description: 'Cada manchinha, a cor dos olhos e o formato das orelhinhas foram estudados ponto a ponto para captar a alma e o carinho do cãozinho da família.',
    details: 'Tamanho: 20cm sentado • Fio acetinado nobre • Coleirinha com placa gravada'
  },
  {
    id: 3,
    category: 'bonecas',
    title: 'Boneca Sofia com Jardineira',
    subtitle: 'Personalizada com cachos castanhos e boina de linho',
    likes: 427,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    tags: ['#MiniMim', '#BonecaDeCroche', '#PresenteDeMenina'],
    description: 'Uma miniatura afetiva feita para a pequena Sofia. A jardineira pode ser retirada e trocada, estimulando o brincar lúdico e criativo.',
    details: 'Tamanho: 28cm • Roupinhas trocáveis • Enchimento siliconado antiácaro'
  },
  {
    id: 4,
    category: 'maternidade',
    title: 'Polvinho Calmante Terapêutico',
    subtitle: 'Tentáculos que simulam o cordão umbilical',
    likes: 619,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    tags: ['#PolvoAmigurumi', '#UTINeonatal', '#PartoHumanizado'],
    description: 'Baseado no famoso projeto escandinavo: os tentáculos enroladinhos lembram o útero materno, acalmando a frequência cardíaca do recém-nascido.',
    details: 'Tamanho: 18cm • Padrão de segurança estrito • Esterilizável'
  },
  {
    id: 5,
    category: 'decor',
    title: 'Jardim de Cactos e Suculentas',
    subtitle: 'Beleza botânica que permanece sempre florida',
    likes: 284,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    tags: ['#DecorAfetiva', '#CactoAmigurumi', '#PlantasDeCroche'],
    description: 'Plantinhas em vasinho rústico de cerâmica, com flores em tom mostarda e terracota. Perfeito para home office, estantes e presentes rápidos.',
    details: 'Tamanho: 14cm com vasinho • Não precisa regar • Toque aveludado'
  },
  {
    id: 6,
    category: 'maternidade',
    title: 'Guirlanda Enfeite de Porta Safari',
    subtitle: 'Boas-vindas calorosas para o quarto de maternidade',
    likes: 735,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    tags: ['#PortaMaternidade', '#QuartoDeBebê', '#SafariBaby'],
    description: 'Com leãozinho, girafinha e elefantinho em tons cáqui e folhagens secas, com o nome do bebê bordado em tricotin centralizado.',
    details: 'Diâmetro: 28cm • Base em madeira natural • Gancho embutido invisível'
  }
];

function initInstagramFeed() {
  const grid = document.getElementById('instagramPostsGrid');
  const filterButtons = document.querySelectorAll('[data-ig-filter]');

  if (!grid) return;

  function renderFeed(filter = 'todos') {
    const filtered = filter === 'todos' 
      ? instagramPosts 
      : instagramPosts.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(post => `
      <div class="ig-post-card group" data-post-id="${post.id}">
        <div class="relative overflow-hidden aspect-square bg-stone-100 cursor-pointer" onclick="openPostModal(${post.id})">
          <img 
            src="${post.image}" 
            alt="${post.title}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          >
          <div class="ig-overlay absolute inset-0 bg-stone-900/60 flex flex-col justify-between p-6 text-white">
            <div class="flex justify-between items-center">
              <span class="bg-white/20 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                ${post.tags[0]}
              </span>
              <span class="text-white/80 text-sm flex items-center gap-1">
                <svg class="w-4 h-4 fill-current text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                Destaque
              </span>
            </div>
            
            <div class="text-center">
              <p class="font-serif text-xl font-bold mb-1">${post.title}</p>
              <p class="text-xs text-stone-200 line-clamp-2">${post.subtitle}</p>
              <span class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 underline underline-offset-4">
                Toque para ver detalhes & foto ampliada
              </span>
            </div>

            <div class="flex justify-between items-center pt-2 border-t border-white/20 text-xs text-stone-200">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4 text-rose-400 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                ${post.likes} curtidas
              </span>
              <span>@casulo.amigurumi</span>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-stone-900 group-hover:text-amber-800 transition-colors text-base">${post.title}</h4>
            <button 
              class="like-btn text-stone-400 hover:text-rose-500 transition-colors flex items-center gap-1 text-sm font-medium" 
              onclick="handleLike(event, ${post.id})"
              title="Curtir esta criação"
            >
              <svg class="w-5 h-5 transition-transform active:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span class="like-count">${post.likes}</span>
            </button>
          </div>
          <p class="text-xs text-stone-600 line-clamp-2 mb-3">${post.description}</p>
          
          <div class="flex items-center justify-between pt-3 border-t border-stone-100">
            <span class="text-[11px] font-medium text-stone-400">${post.tags.slice(0, 2).join(' ')}</span>
            <a 
              href="https://www.instagram.com/casulo.amigurumi/" 
              target="_blank" 
              class="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
      });
      btn.classList.add('bg-stone-900', 'text-white');
      btn.classList.remove('bg-white', 'text-stone-700');

      const filter = btn.getAttribute('data-ig-filter');
      playDelicateChime(600);
      renderFeed(filter);
    });
  });

  renderFeed();
}

// Like Handler with Heart Burst Particles
window.handleLike = function(e, postId) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const countSpan = btn.querySelector('.like-count');
  const svg = btn.querySelector('svg');

  const post = instagramPosts.find(p => p.id === postId);
  if (!post) return;

  post.likes += 1;
  countSpan.innerText = post.likes;

  svg.classList.add('text-rose-500');
  svg.setAttribute('fill', 'currentColor');

  // Spawn heart burst animation
  const rect = btn.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.className = 'particle-heart';
  heart.innerHTML = '❤️';
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  document.body.appendChild(heart);

  playDelicateChime(780, 'triangle');

  setTimeout(() => {
    heart.remove();
  }, 1000);
};

// Modal Lightbox
window.openPostModal = function(postId) {
  const post = instagramPosts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('postLightboxModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalDetails = document.getElementById('modalDetails');
  const modalTags = document.getElementById('modalTags');
  const modalOrderBtn = document.getElementById('modalOrderBtn');

  if (modalImg) modalImg.src = post.image;
  if (modalTitle) modalTitle.innerText = post.title;
  if (modalSubtitle) modalSubtitle.innerText = post.subtitle;
  if (modalDesc) modalDesc.innerText = post.description;
  if (modalDetails) modalDetails.innerText = post.details;
  if (modalTags) modalTags.innerText = post.tags.join('  ');

  if (modalOrderBtn) {
    modalOrderBtn.onclick = () => {
      closePostModal();
      // Scroll smoothly to simulator or open whatsapp
      const msg = encodeURIComponent(`Olá Casulo Amigurumi! Amei a peça "${post.title}" que vi no site e gostaria de saber se é possível encomendar uma igualzinha.`);
      window.open(`https://api.whatsapp.com/send?phone=${customizerState.targetPhone}&text=${msg}`, '_blank');
    };
  }

  playDelicateChime(640);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePostModal = function() {
  const modal = document.getElementById('postLightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all
        faqItems.forEach(other => {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
          playDelicateChime(560);
        }
      });
    }
  });
}

/* ==========================================================================
   5. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    drawerBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    drawerBackdrop.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   6. Hero Showcase Micro-Interactions
   ========================================================================== */
function initHeroShowcase() {
  const heroTabs = document.querySelectorAll('[data-hero-tab]');
  const heroMainImg = document.getElementById('heroMainImg');
  const heroTagBadge = document.getElementById('heroTagBadge');

  const heroShowcaseData = {
    maternidade: {
      img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80',
      tag: 'Linha Maternidade & Ninho'
    },
    pets: {
      img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=900&q=80',
      tag: 'Pets Afetivos & Miniaturas'
    },
    bonecas: {
      img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
      tag: 'Bonecas Personalizadas'
    }
  };

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => {
        t.classList.remove('bg-amber-600', 'text-white', 'font-semibold');
        t.classList.add('bg-white/80', 'text-stone-700');
      });
      tab.classList.add('bg-amber-600', 'text-white', 'font-semibold');
      tab.classList.remove('bg-white/80', 'text-stone-700');

      const cat = tab.getAttribute('data-hero-tab');
      if (heroShowcaseData[cat] && heroMainImg) {
        heroMainImg.style.opacity = '0';
        setTimeout(() => {
          heroMainImg.src = heroShowcaseData[cat].img;
          if (heroTagBadge) heroTagBadge.innerText = heroShowcaseData[cat].tag;
          heroMainImg.style.opacity = '1';
        }, 150);
        playDelicateChime(620);
      }
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(text) {
  let toast = document.getElementById('casuloToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'casuloToast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-stone-900/90 backdrop-blur-md text-white text-sm px-5 py-3 rounded-full shadow-2xl transition-all duration-300 opacity-0 pointer-events-none transform translate-y-3';
    document.body.appendChild(toast);
  }

  toast.innerText = text;
  toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3200);
}

