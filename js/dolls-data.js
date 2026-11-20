/**
 * Casulo Amigurumi - Catálogo de Bonecas do Álbum Oficial
 * 38 Peças Artesanais com Ficha Técnica Completa
 * Diretrizes: Sem hífens dentro de textos corridos
 */

const dollsCatalog = [
  {
    id: 1,
    foto: "images/bonecas/boneca-01.jpg",
    nome: "Boneca Emília do Sítio",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Vestidinho tradicional em retalhos com botões coloridos costurados, cabelos em lã e olhos com trava de pressão anti asfixia.",
    valorAproximado: "R$ 150 a R$ 190"
  },
  {
    id: 2,
    foto: "images/bonecas/boneca-02.jpg",
    nome: "Boneca Bailarina Aurora",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Saia rodada em crochê delicado, sapatilhas com fitas de amarrar, coque decorado e enchimento siliconado virgem.",
    valorAproximado: "R$ 140 a R$ 180"
  },
  {
    id: 3,
    foto: "images/bonecas/boneca-03.jpg",
    nome: "Boneca Cecília Jardineira",
    altura: "28 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Jardineira em tom mostarda com bolsinho frontal funcional, chapeuzinho artesanal e sapatinhos removíveis.",
    valorAproximado: "R$ 145 a R$ 185"
  },
  {
    id: 4,
    foto: "images/bonecas/boneca-04.jpg",
    nome: "Boneca Heloísa com Vestido Floral",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Penteado",
    caracteristicas: "Vestido com delicadas florzinhas bordadas ponto a ponto, laço de cabelo em fita de algodão e bochechas coradas.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 5,
    foto: "images/bonecas/boneca-05.jpg",
    nome: "Boneca Serena Romântica",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Vestido evasê em tom terracota suave, gola com acabamento em bico de crochê e olhos com travas internas reforçadas.",
    valorAproximado: "R$ 155 a R$ 200"
  },
  {
    id: 6,
    foto: "images/bonecas/boneca-06.jpg",
    nome: "Boneca Sophie Boho",
    altura: "35 cm",
    tipoLinha: "Fio Algodão Penteado e Fibras Naturais",
    caracteristicas: "Visual boho chic com casaquinho felpudo em crochê, botinhas cano médio e tranças longas modeladas à mão.",
    valorAproximado: "R$ 165 a R$ 220"
  },
  {
    id: 7,
    foto: "images/bonecas/boneca-07.jpg",
    nome: "Boneca Florista Mel",
    altura: "28 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Acompanha mini cestinha com florzinhas de crochê, avental removível e tiara floral de acabamento impecável.",
    valorAproximado: "R$ 140 a R$ 180"
  },
  {
    id: 8,
    foto: "images/bonecas/boneca-08.jpg",
    nome: "Boneca Lavanda Encantada",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Tons suaves de lilás e lavanda, manguinhas bufantes, sapatinhos com botãozinho lateral e fibra antiácaro.",
    valorAproximado: "R$ 145 a R$ 190"
  },
  {
    id: 9,
    foto: "images/bonecas/boneca-09.jpg",
    nome: "Boneca Maya com Trancinhas",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Cabelos tecidos com tranças africanas em lã escura, vestidinho amarelo sol e laçarotes duplos.",
    valorAproximado: "R$ 160 a R$ 210"
  },
  {
    id: 10,
    foto: "images/bonecas/boneca-10.jpg",
    nome: "Boneca Bella Cacheada",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Cachos volumosos definidos fio a fio, macacãozinho curto em tom salmão e olhos bordados seguros para bebês.",
    valorAproximado: "R$ 155 a R$ 200"
  },
  {
    id: 11,
    foto: "images/bonecas/boneca-11.jpg",
    nome: "Boneca Nina com Touquinha de Lã",
    altura: "26 cm",
    tipoLinha: "Fio Algodão Penteado Macio",
    caracteristicas: "Touquinha removível com orelhinhas fofas, cachecol macio com franjas e estrutura ideal para abraços de berço.",
    valorAproximado: "R$ 135 a R$ 175"
  },
  {
    id: 12,
    foto: "images/bonecas/boneca-12.jpg",
    nome: "Boneca Valentina Doçura",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Vestido rosa antigo em ponto concha, bolsinha tiracolo e cabelinhos presos em maria chiquinha com lacinhos.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 13,
    foto: "images/bonecas/boneca-13.jpg",
    nome: "Boneca Antonella Vintage",
    altura: "34 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Inspirada no estilo retrô com mangas princesa, botões de madeira natural e barra bordada artesanalmente.",
    valorAproximado: "R$ 165 a R$ 215"
  },
  {
    id: 14,
    foto: "images/bonecas/boneca-14.jpg",
    nome: "Boneca Melissa Jardim de Primavera",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Vestido estampado em verde menta e margaridas em relevo, laço no topo da cabeça e sapatilhas de boneca.",
    valorAproximado: "R$ 145 a R$ 190"
  },
  {
    id: 15,
    foto: "images/bonecas/boneca-15.jpg",
    nome: "Boneca Clara Estrelinha",
    altura: "28 cm",
    tipoLinha: "Fio 100% Algodão Penteado",
    caracteristicas: "Vestidinho azul bebê com estrelinhas bordadas com fio acetinado, enchimento macio que não deforma.",
    valorAproximado: "R$ 140 a R$ 180"
  },
  {
    id: 16,
    foto: "images/bonecas/boneca-16.jpg",
    nome: "Boneca Laura com Vestido Amarelo",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Vestido rodado amarelo canário, faixa de cintura em tom cru e cabelos volumosos em mechas douradas.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 17,
    foto: "images/bonecas/boneca-17.jpg",
    nome: "Boneca Marina com Laço Duplo",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Saia com babados duplos em dois tons, sapatinhos com laço de cetim e travas de pressão seguras para crianças.",
    valorAproximado: "R$ 145 a R$ 190"
  },
  {
    id: 18,
    foto: "images/bonecas/boneca-18.jpg",
    nome: "Boneca Olívia Sonhadora",
    altura: "35 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Cabelos ondulados longos até a cintura, vestido longo em linho cru e casaco felpudo de sobreposição.",
    valorAproximado: "R$ 170 a R$ 225"
  },
  {
    id: 19,
    foto: "images/bonecas/boneca-19.jpg",
    nome: "Boneca Maitê com Casaquinho",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Casaquinho removível com capuz, sapatilhas de cano médio e trança lateral com flor de acabamento.",
    valorAproximado: "R$ 155 a R$ 205"
  },
  {
    id: 20,
    foto: "images/bonecas/boneca-20.jpg",
    nome: "Boneca Rebeca Carinho",
    altura: "28 cm",
    tipoLinha: "Fio Algodão Penteado Macio",
    caracteristicas: "Corpinho flexível para sentar na prateleira ou no berço, vestido rosa blush e expressão facial doce.",
    valorAproximado: "R$ 140 a R$ 180"
  },
  {
    id: 21,
    foto: "images/bonecas/boneca-21.jpg",
    nome: "Boneca Alice no País das Maravilhas",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Vestido azul clássico com avental branco pregueado, tiara preta com laço e meias listradas artesanais.",
    valorAproximado: "R$ 165 a R$ 215"
  },
  {
    id: 22,
    foto: "images/bonecas/boneca-22.jpg",
    nome: "Boneca Princesa Sophia Encantada",
    altura: "35 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Vestido de gala em tom lavanda com brilho suave, coroa em crochê dourado e mangas com babadinhos.",
    valorAproximado: "R$ 175 a R$ 230"
  },
  {
    id: 23,
    foto: "images/bonecas/boneca-23.jpg",
    nome: "Boneca Luna Estelar",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Cabelos azul noite com detalhes prateados, vestido com motivo de constelações e botões de madrepérola.",
    valorAproximado: "R$ 160 a R$ 210"
  },
  {
    id: 24,
    foto: "images/bonecas/boneca-24.jpg",
    nome: "Boneca Dandara Afro Encanto",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado",
    caracteristicas: "Cabelos crespos afro tecidos em relevo, turbante colorido em tecido africano e vestido terracota vibrante.",
    valorAproximado: "R$ 165 a R$ 215"
  },
  {
    id: 25,
    foto: "images/bonecas/boneca-25.jpg",
    nome: "Boneca Maria Flor Campestre",
    altura: "28 cm",
    tipoLinha: "Fio Algodão Penteado Macio",
    caracteristicas: "Vestido com estampado xadrez em crochê, tranças duplas com fitas e chapéu camponesa com laço.",
    valorAproximado: "R$ 145 a R$ 185"
  },
  {
    id: 26,
    foto: "images/bonecas/boneca-26.jpg",
    nome: "Boneca Júlia com Bolsinha de Mão",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Conjuntinho de saia e blusa com casaquinho, bolsinha de mão que abre e sapatinhos removíveis.",
    valorAproximado: "R$ 155 a R$ 200"
  },
  {
    id: 27,
    foto: "images/bonecas/boneca-27.jpg",
    nome: "Boneca Helô com Boina Francesa",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Boina charmosa inclinada, vestido tubinho listrado preto e branco e cachecol vermelho em destaque.",
    valorAproximado: "R$ 160 a R$ 210"
  },
  {
    id: 28,
    foto: "images/bonecas/boneca-28.jpg",
    nome: "Boneca Bia Borboleta",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Asas delicadas de borboleta costuradas nas costas, vestido em degradê rosa e verde suave e tiara com anteninhas.",
    valorAproximado: "R$ 165 a R$ 220"
  },
  {
    id: 29,
    foto: "images/bonecas/boneca-29.jpg",
    nome: "Boneca Manuella Primavera",
    altura: "28 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Vestido verde água com flores aplicadas na barra, meias 3/4 e coque duplo com laços de gorgurão.",
    valorAproximado: "R$ 140 a R$ 185"
  },
  {
    id: 30,
    foto: "images/bonecas/boneca-30.jpg",
    nome: "Boneca Lorena Encanto de Outono",
    altura: "34 cm",
    tipoLinha: "Fio Algodão Penteado e Fibras Naturais",
    caracteristicas: "Paleta quente de mostarda e caramelo, casaco com gola de pele sintética em crochê e botinhas forradas.",
    valorAproximado: "R$ 170 a R$ 225"
  },
  {
    id: 31,
    foto: "images/bonecas/boneca-31.jpg",
    nome: "Boneca Isis Princesinha Moderna",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Saia com camadas sobrepostas, tiara brilhante em relevo e botõezinhos nas costas para facilitar trocas.",
    valorAproximado: "R$ 155 a R$ 205"
  },
  {
    id: 32,
    foto: "images/bonecas/boneca-32.jpg",
    nome: "Boneca Beatriz Sonho de Algodão",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Hipoalergênico",
    caracteristicas: "Corpo super macio para nanar, camisolinha rendada em ponto aberto e touca de dormir com pompom.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 33,
    foto: "images/bonecas/boneca-33.jpg",
    nome: "Boneca Manuela com Sapatinhos Vermelhos",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Sapatinhos de verniz em crochê vermelho vivo, vestido azul marinho com gola boneca branca.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 34,
    foto: "images/bonecas/boneca-34.jpg",
    nome: "Boneca Catarina com Botões Coloridos",
    altura: "35 cm",
    tipoLinha: "Fio 100% Algodão Penteado",
    caracteristicas: "Trabalho primoroso com botões decorativos costurados com ponto invisível, saia ampla e chapéu panamá.",
    valorAproximado: "R$ 175 a R$ 230"
  },
  {
    id: 35,
    foto: "images/bonecas/boneca-35.jpg",
    nome: "Boneca Teresa Retrô Floral",
    altura: "30 cm",
    tipoLinha: "Fio 100% Algodão Mercerizado",
    caracteristicas: "Gola rufo clássica em ponto leque, estampa floral bordada e cabelos em coque vintage.",
    valorAproximado: "R$ 150 a R$ 195"
  },
  {
    id: 36,
    foto: "images/bonecas/boneca-36.jpg",
    nome: "Boneca Amélie Doce Francesinha",
    altura: "28 cm",
    tipoLinha: "Fio Algodão Penteado Macio",
    caracteristicas: "Estilo parisiense com vestido plissado em crochê, lenço de pescoço e cabelinhos curtos ondulados.",
    valorAproximado: "R$ 145 a R$ 190"
  },
  {
    id: 37,
    foto: "images/bonecas/boneca-37.jpg",
    nome: "Boneca Olívia Candy Color",
    altura: "32 cm",
    tipoLinha: "Fio 100% Algodão Penteado Biológico",
    caracteristicas: "Paleta delicada em tons pastel mesclados (rosa, baunilha e hortelã), botões de coração e tiara com laço.",
    valorAproximado: "R$ 160 a R$ 210"
  },
  {
    id: 38,
    foto: "images/bonecas/boneca-38.jpg",
    nome: "Boneca Casulo Afeto Especial",
    altura: "35 cm",
    tipoLinha: "Fio 100% Algodão Nobre Mercerizado",
    caracteristicas: "Edição comemorativa especial do ateliê Casulo: vestidinho bordado com a borboleta da marca, cabelos sedosos e estojo de presente.",
    valorAproximado: "R$ 180 a R$ 240"
  }
];

if (typeof window !== 'undefined') {
  window.dollsCatalog = dollsCatalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dollsCatalog;
}

