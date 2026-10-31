# 🧶 Casulo Amigurumi - Landing Page de Alta Conversão

Landing page inovadora, interativa e altamente atrativa desenvolvida para atrair clientes, gerar orçamentos qualificados e impulsionar o perfil do Instagram [**@casulo.amigurumi**](https://www.instagram.com/casulo.amigurumi/).

---

## ✨ Destaques & Recursos Inovadores

1. **Simulador Interativo "Monte seu Casulo"**:
   - Permite que o cliente configure o seu amigurumi passo a passo (Categoria, Tamanho, Paleta de Cores e Toques Especiais como bordado do nome e caixa para presente sensorial).
   - Cálculo dinâmico em tempo real do prazo de confecção e estimativa de investimento.
   - Botão **"Enviar Pedido pelo WhatsApp"** que formata a mensagem com todos os itens escolhidos e abre o WhatsApp com um clique.
   - Botão **"Copiar e Enviar no Direct do Insta"** que copia o briefing montado e direciona o usuário para o Instagram `@casulo.amigurumi`.

2. **Galeria Interativa do Instagram (@casulo.amigurumi Experience)**:
   - Filtros de categorias em tempo real (*Maternidade & Berço*, *Pets Afetivos*, *Bonecas Personalizadas*, *Decoração*).
   - Botão de curtidas interativo com **efeito de explosão de corações flutuantes** e contador dinâmico.
   - Modal Lightbox com foto ampliada, ficha técnica dos materiais e botão de conversão rápida.

3. **Design Sensorial & Visual Quente (Warm Artisanal Luxury)**:
   - Paleta de cores acolhedora inspirada no artesanato afetivo (Terracota, Mel, Sálvia e Creme).
   - Tipografia nobre (*Playfair Display*, *Outfit* e *Plus Jakarta Sans*).
   - Micro-animações suaves e texturas de ponto de crochê.
   - **Sintetizador de Áudio Delicado (Web Audio API)**: Emite notas suaves de harpa/carrilhão ao interagir com opções (com botão liga/desliga som).

4. **Pilares de Confiança & Segurança Infantil**:
   - Destaque para **Fio 100% Algodão Hipoalergênico**.
   - **Travas internas anti-asfixia** em olhos e focinhos (Baby-Safe).
   - Unboxing sensorial com embalagem aromatizada e bilhete de afeto.

5. **Dock Flutuante de Ação Rápida (Sticky Bar)**:
   - Barra persistente inferior otimizada tanto para mobile quanto desktop, facilitando o acesso instantâneo ao Instagram e ao Simulador.

---

## 🚀 Como Visualizar a Landing Page

### Opção 1: Direto pelo Navegador (Sem Instalação)
Basta clicar duas vezes no arquivo `index.html` ou abri-lo em qualquer navegador (Google Chrome, Microsoft Edge, Safari, Firefox).

### Opção 2: Servidor Local Rápido (Opcional via Node.js)
Se preferir rodar com um servidor local:
```bash
# Na pasta do projeto:
npx serve .
# ou
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=req.url==='/'?'index.html':req.url.slice(1);let p=path.join(process.cwd(),f);if(fs.existsSync(p)){res.writeHead(200);fs.createReadStream(p).pipe(res);}else{res.writeHead(404);res.end();}}).listen(3000,()=>console.log('Online em http://localhost:3000'));"
```

---

## ⚙️ Personalização Simples

### Alterar o Número de WhatsApp:
No arquivo `js/app.js`, altere a linha 68:
```javascript
targetPhone: '5511999999999' // Substitua pelo DDD + Número do WhatsApp do Ateliê Casulo
```

### Alterar ou Adicionar Fotos:
As fotos do feed e da capa estão organizadas no array `instagramPosts` em `js/app.js` e podem ser substituídas por fotos reais do ateliê ou links diretos das postagens do Instagram.

---

## 🌐 Publicação Online Gratuita
Você pode colocar a landing page no ar em menos de 2 minutos utilizando:
- **Vercel** (`vercel deploy`)
- **Netlify** (basta arrastar a pasta `casulo-amigurumi` no painel do [netlify.com](https://www.netlify.com/))
- **GitHub Pages** (gratuito e permanente)

