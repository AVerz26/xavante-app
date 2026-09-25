// dictionary.js - Dicionário Bilíngue Xavante (A'uwẽ Mreme) <-> Português
// 100% Offline com transcrição fonética, dicas de pronúncia para voz e contexto cultural

export const DICTIONARY = [
  // Saudações e Expressões
  {
    id: 'to_ba',
    xavante: 'Tô ba?',
    portuguese: 'Tudo bem? / Como vai?',
    phonetic: '[tõ ba]',
    ttsHint: 'Tô ba',
    category: 'saudacoes',
    categoryName: 'Saudações',
    example: 'Tô ba, i-mama? (Tudo bem, meu pai?)',
    note: 'Saudação comum e afetuosa usada no cotidiano das aldeias A\'uwẽ.'
  },
  {
    id: 'to_uptabi',
    xavante: 'Tô uptabi',
    portuguese: 'Muito bem! / Tudo ótimo!',
    phonetic: '[tõ up-ta-bi]',
    ttsHint: 'Tô uptabí',
    category: 'saudacoes',
    categoryName: 'Saudações',
    example: 'Tô uptabi wa! (Estou muito bem!)',
    note: '"Uptabi" significa autêntico, verdadeiro, completo. A\'uwẽ Uptabi é como os Xavante se autodenominam: os verdadeiros seres humanos.'
  },
  {
    id: 'mo',
    xavante: 'Mo',
    portuguese: 'Ir / Vamos!',
    phonetic: '[mõ]',
    ttsHint: 'Mô',
    category: 'saudacoes',
    categoryName: 'Saudações',
    example: 'Mo hã bö wa! (Vamos ao cerrado!)',
    note: 'Expressão de movimento e convite direto para caminhar ou partir.'
  },
  {
    id: 'mori_waaba',
    xavante: 'Morĩ wa\'aba',
    portuguese: 'Vão em paz! / Boa viagem!',
    phonetic: '[mõ-rĩ wa-a-ba]',
    ttsHint: 'Morĩ, ua ába',
    category: 'saudacoes',
    categoryName: 'Saudações',
    example: 'Morĩ wa\'aba! (Despedida aos que partem da aldeia)',
    note: 'Forma respeitosa de despedir-se de quem está saindo em caminhada ou viagem.'
  },
  {
    id: 'datsaa',
    xavante: 'Datsa\'a',
    portuguese: 'Obrigado / Gratidão',
    phonetic: '[da-tsa-ʔa]',
    ttsHint: 'Datsá, á',
    category: 'saudacoes',
    categoryName: 'Saudações',
    example: 'Datsa\'a uptabi! (Muito obrigado!)',
    note: 'O apóstrofo (\') representa a parada glotal (saltillo), uma breve pausa na garganta antes da próxima vogal.'
  },

  // Pessoas e Sociedade
  {
    id: 'auwe',
    xavante: 'A\'uwẽ',
    portuguese: 'Gente / Pessoa / Xavante',
    phonetic: '[a-ʔu-wẽ]',
    ttsHint: 'A, u-uẽ',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'Wa hã A\'uwẽ! (Eu sou Xavante!)',
    note: 'Autodenominação do povo Xavante. Significa "pessoas" ou "povo verdadeiro".'
  },
  {
    id: 'aibo',
    xavante: 'Aibö',
    portuguese: 'Homem / Adulto',
    phonetic: '[aj-bə̃]',
    ttsHint: 'Aibõ',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'Aibö hã morĩ. (O homem foi.)',
    note: 'Na sociedade Xavante, os homens participam ativamente do Etenhiritipa (conselho central da aldeia).'
  },
  {
    id: 'pio',
    xavante: 'Pi\'õ',
    portuguese: 'Mulher',
    phonetic: '[pi-ʔõ]',
    ttsHint: 'Pí, õ',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'Pi\'õ nhimi tsada. (A mulher colhe raízes.)',
    note: 'As mulheres A\'uwẽ são as guardiãs dos cantos tradicionais, do cultivo e da preparação dos alimentos sagrados.'
  },
  {
    id: 'baoto',
    xavante: 'Ba\'õtõ',
    portuguese: 'Criança / Menino',
    phonetic: '[ba-ʔõ-tõ]',
    ttsHint: 'Ba, õntõ',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'Ba\'õtõ si\'ubdató. (Três crianças brincam.)',
    note: 'As crianças crescem livres pela aldeia, aprendendo pelo exemplo e pela convivência coletiva.'
  },
  {
    id: 'i_mama',
    xavante: 'I-mama',
    portuguese: 'Meu pai',
    phonetic: '[i-ma-ma]',
    ttsHint: 'I-mama',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'I-mama hã aibö uptabi. (Meu pai é um grande homem.)',
    note: 'O prefixo "i-" indica posse de primeira pessoa ("meu/minha").'
  },
  {
    id: 'i_no',
    xavante: 'I-no',
    portuguese: 'Minha mãe',
    phonetic: '[i-nõ]',
    ttsHint: 'I-no',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'I-no hã ö tsawa. (Minha mãe trouxe água.)',
    note: 'A relação matrilinear é muito forte e central na organização familiar Xavante.'
  },
  {
    id: 'waradzu',
    xavante: 'Waradzu',
    portuguese: 'O não-indígena / O homem branco',
    phonetic: '[wa-ra-dzu]',
    ttsHint: 'Uaradzú',
    category: 'pessoas',
    categoryName: 'Pessoas e Aldeia',
    example: 'Waradzu mreme. (A língua do não-indígena / Português)',
    note: 'Termo tradicional para designar pessoas de fora da etnia indígena.'
  },

  // Natureza e Meio Ambiente (Cerrado)
  {
    id: 'ha',
    xavante: 'Hã',
    portuguese: 'Terra / Chão',
    phonetic: '[hã]',
    ttsHint: 'Hã',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Hã uptabi. (Nossa terra sagrada.)',
    note: 'O Cerrado é visto como um ser vivo que provê todo sustento e espiritualidade.'
  },
  {
    id: 'bo',
    xavante: 'Bö',
    portuguese: 'Cerrado / Mata',
    phonetic: '[bə̃]',
    ttsHint: 'Bõ',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Mo hã bö u! (Vamos para a mata!)',
    note: 'O bioma Cerrado com suas árvores retorcidas e rica biodiversidade de frutos como pequi e buriti.'
  },
  {
    id: 'o',
    xavante: 'Ö',
    portuguese: 'Água',
    phonetic: '[ə̃]',
    ttsHint: 'E',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Ö te öri. (Ele bebe água.)',
    note: 'Vogal central fechada que se pronuncia com os lábios relaxados.'
  },
  {
    id: 'owawe',
    xavante: 'Öwawe',
    portuguese: 'Rio grande / Rio das Mortes',
    phonetic: '[ə̃-wa-we]',
    ttsHint: 'E-uauê',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Öwawe hã höri ahö. (No rio há muitos peixes.)',
    note: 'Ö (água) + wawe (grande). O Rio das Mortes é a artéria vital histórica do território Xavante.'
  },
  {
    id: 'poo',
    xavante: 'Po\'o',
    portuguese: 'Fogo',
    phonetic: '[põ-ʔõ]',
    ttsHint: 'Pô, ó',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Po\'o hã rowatsuza. (O fogo ilumina e aquece.)',
    note: 'O manejo tradicional do fogo no Cerrado é feito com sabedoria ancestral.'
  },
  {
    id: 'ri',
    xavante: 'Ri',
    portuguese: 'Casa tradicional',
    phonetic: '[ri]',
    ttsHint: 'Rri',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Ri para. (A aldeia é formada por casas em semicírculo.)',
    note: 'As casas tradicionais Xavante são feitas de estrutura de madeira e cobertas com palha de palmeira babaçu ou buriti.'
  },
  {
    id: 'wahu',
    xavante: 'Wahu',
    portuguese: 'Sol / Ano / Época da seca',
    phonetic: '[wa-hu]',
    ttsHint: 'Uahú',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'Wahu tsada te mo. (O sol caminha no céu.)',
    note: 'A passagem do tempo é medida pelos ciclos do sol e da seca no planalto central.'
  },
  {
    id: 'aamo',
    xavante: 'A\'amo',
    portuguese: 'Lua',
    phonetic: '[a-ʔa-mõ]',
    ttsHint: 'A, amô',
    category: 'natureza',
    categoryName: 'Natureza e Cerrado',
    example: 'A\'amo hã rowatsuza. (A lua brilha na noite.)',
    note: 'A lua orienta rituais noturnos e a pesca no rio.'
  },

  // Animais Sagrados do Cerrado
  {
    id: 'tsere',
    xavante: 'Tsere',
    portuguese: 'Pássaro / Gavião',
    phonetic: '[tse-re]',
    ttsHint: 'Tseré',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Tsere te waihutu. (O pássaro voa alto.)',
    note: 'Mascote do nosso aplicativo! O gavião simboliza a coragem, visão clara e agilidade dos jovens guerreiros.'
  },
  {
    id: 'romho',
    xavante: 'Romhö',
    portuguese: 'Onça-pintada',
    phonetic: '[rõm-hə̃]',
    ttsHint: 'Rõn-hõ',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Romhö hã bö u nemorĩ. (A onça anda na mata.)',
    note: 'O maior felino do Cerrado, respeitado pela força, furtividade e imponência espiritual.'
  },
  {
    id: 'wahi',
    xavante: 'Wahi',
    portuguese: 'Cobra / Serpente',
    phonetic: '[wa-hi]',
    ttsHint: 'Uahí',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Wahi hã bö u. (A cobra está no cerrado.)',
    note: 'Várias espécies de cobras habitam o cerrado, como a cascavel e a jiboia.'
  },
  {
    id: 'hori',
    xavante: 'Höri',
    portuguese: 'Peixe',
    phonetic: '[hə̃-ri]',
    ttsHint: 'Hõri',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Höri hã ö u te wapté. (O peixe nada na água.)',
    note: 'A pesca com timbó e flechas nos rios do Mato Grosso é fonte essencial de proteína.'
  },
  {
    id: 'pore',
    xavante: 'Po\'re',
    portuguese: 'Anta',
    phonetic: '[põ-ʔre]',
    ttsHint: 'Pô-ré',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Po\'re hã bö ba te romhuri. (A anta vive na mata densa.)',
    note: 'O maior mamífero terrestre da América do Sul e dispersora vital de sementes.'
  },
  {
    id: 'aba',
    xavante: 'Aba',
    portuguese: 'Veado / Cervo',
    phonetic: '[a-ba]',
    ttsHint: 'Abá',
    category: 'animais',
    categoryName: 'Animais do Cerrado',
    example: 'Aba hã te waro. (O veado corre veloz.)',
    note: 'Animal ágil e símbolo de leveza nas narrativas orais.'
  },

  // Ações e Verbos do Dia a Dia
  {
    id: 'tsa',
    xavante: 'Tsa',
    portuguese: 'Comer',
    phonetic: '[tsa]',
    ttsHint: 'Tsá',
    category: 'acoes',
    categoryName: 'Ações e Verbos',
    example: 'Wa hã te tsa. (Eu como.)',
    note: 'Refere-se ao ato de se alimentar, compartilhado de forma comunitária.'
  },
  {
    id: 'ori',
    xavante: 'Öri',
    portuguese: 'Beber',
    phonetic: '[ə̃-ri]',
    ttsHint: 'E-ri',
    category: 'acoes',
    categoryName: 'Ações e Verbos',
    example: 'Ö te öri. (Bebe água.)',
    note: 'Ligado diretamente à palavra Ö (água).'
  },
  {
    id: 'wapari',
    xavante: 'Wapari',
    portuguese: 'Ouvir / Escutar',
    phonetic: '[wa-pa-ri]',
    ttsHint: 'Uaparí',
    category: 'acoes',
    categoryName: 'Ações e Verbos',
    example: 'Mreme wapari! (Ouça a palavra falada!)',
    note: 'Ouvir os anciãos é o pilar central da transmissão de conhecimento A\'uwẽ.'
  },
  {
    id: 'aina',
    xavante: 'Aina',
    portuguese: 'Ver / Olhar / Contemplar',
    phonetic: '[aj-na]',
    ttsHint: 'Ainá',
    category: 'acoes',
    categoryName: 'Ações e Verbos',
    example: 'Tsere aina! (Olhe o pássaro!)',
    note: 'Usado para observar sinais da natureza e dos rastros no cerrado.'
  },

  // Números e Quantidades
  {
    id: 'misi',
    xavante: 'Misi',
    portuguese: 'Um (1)',
    phonetic: '[mi-si]',
    ttsHint: 'Mísi',
    category: 'numeros',
    categoryName: 'Números e Cores',
    example: 'Aibö misi. (Um homem.)',
    note: 'O sistema numérico tradicional Xavante é conciso, focando na precisão das relações e agrupamentos.'
  },
  {
    id: 'maptutu',
    xavante: 'Maptutu',
    portuguese: 'Dois (2)',
    phonetic: '[map-tu-tu]',
    ttsHint: 'Maptutú',
    category: 'numeros',
    categoryName: 'Números e Cores',
    example: 'Pi\'õ maptutu. (Duas mulheres.)',
    note: 'O número 2 reflete a dualidade e os dois clãs da aldeia (Öwawẽ e Poridza\'õno).'
  },
  {
    id: 'siubdato',
    xavante: 'Si\'ubdató',
    portuguese: 'Três (3)',
    phonetic: '[si-ʔub-da-tõ]',
    ttsHint: 'Si, ubdâtó',
    category: 'numeros',
    categoryName: 'Números e Cores',
    example: 'Tsere si\'ubdató. (Três pássaros.)',
    note: 'Contagem que marca pequenos bandos ou grupos.'
  },
  {
    id: 'aho',
    xavante: 'Ahö',
    portuguese: 'Muitos / Grande quantidade',
    phonetic: '[a-hə̃]',
    ttsHint: 'Ahõ',
    category: 'numeros',
    categoryName: 'Números e Cores',
    example: 'A\'uwẽ ahö! (Muitas pessoas reunidas!)',
    note: 'Usado para expressar abundância, grandes festas e caçadas coletivas.'
  }
];

export const CATEGORIES = [
  { id: 'todas', name: 'Todas', icon: '🌟' },
  { id: 'saudacoes', name: 'Saudações', icon: '🤝' },
  { id: 'pessoas', name: 'Pessoas', icon: '👥' },
  { id: 'natureza', name: 'Natureza', icon: '🌿' },
  { id: 'animais', name: 'Animais', icon: '🐆' },
  { id: 'acoes', name: 'Ações', icon: '🏃' },
  { id: 'numeros', name: 'Números', icon: '🔢' }
];
