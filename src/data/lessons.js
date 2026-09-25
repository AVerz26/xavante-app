// lessons.js - Trilha de Lições Gamificada Estilo Duolingo
// Cada unidade possui níveis com tipos variados de exercícios interativos

export const UNITS = [
  {
    id: 'unit_1',
    number: 1,
    title: 'Primeiras Palavras e Saudações',
    description: 'Aprenda como cumprimentar, agradecer e se despedir na aldeia A\'uwẽ.',
    color: '#D9381E', // Terracota Urucum
    accentColor: '#FF7043',
    icon: '🤝',
    levels: [
      {
        id: 'u1_l1',
        title: 'Como vai você?',
        subtitle: 'Tô ba? e Tô uptabi',
        xpReward: 15,
        questions: [
          {
            type: 'choice',
            prompt: 'Como se diz "Tudo bem? / Como vai?" em Xavante?',
            options: ['Tô ba?', 'Hã', 'Romhö', 'Aibö'],
            correctIndex: 0,
            phonetic: '[tõ ba]',
            culturalTip: 'No dia a dia da aldeia, "Tô ba?" é dito com um sorriso ao cruzar os caminhos circulares.'
          },
          {
            type: 'choice',
            prompt: 'Qual é o significado de "Tô uptabi"?',
            options: ['Boa noite', 'Muito bem! / Tudo ótimo!', 'Vá embora', 'Obrigado'],
            correctIndex: 1,
            phonetic: '[tõ up-ta-bi]',
            culturalTip: '"Uptabi" significa verdadeiro, perfeito, completo.'
          },
          {
            type: 'match',
            prompt: 'Combine os pares correspondentes:',
            pairs: [
              { xavante: 'Tô ba?', portuguese: 'Tudo bem?' },
              { xavante: 'Tô uptabi', portuguese: 'Muito bem!' },
              { xavante: 'Mo', portuguese: 'Vamos / Ir' },
              { xavante: 'Datsa\'a', portuguese: 'Obrigado' }
            ]
          },
          {
            type: 'sentence',
            prompt: 'Monte a resposta afirmativa:',
            targetTranslation: 'Muito bem, meu pai!',
            options: ['Tô', 'uptabi,', 'i-mama!', 'Hã', 'tsere'],
            correctOrder: ['Tô', 'uptabi,', 'i-mama!']
          },
          {
            type: 'phonetic',
            prompt: 'Ouça o ritmo e observe o apóstrofo (\') da parada glotal:',
            word: 'Datsa\'a',
            phonetic: '[da-tsa-ʔa]',
            meaning: 'Obrigado / Gratidão',
            options: ['Datsa\'a', 'Mo', 'Aibö'],
            correctIndex: 0,
            culturalTip: 'O saltillo (\') cria uma respiração rápida entre as sílabas, característica marcante do tronco Macro-Jê.'
          }
        ]
      },
      {
        id: 'u1_l2',
        title: 'Despedidas e Gratidão',
        subtitle: 'Datsa\'a e Morĩ wa\'aba',
        xpReward: 20,
        questions: [
          {
            type: 'choice',
            prompt: 'Como os Xavante dizem "Obrigado" ou manifestam gratidão?',
            options: ['Datsa\'a', 'Po\'o', 'Wahi', 'Bö'],
            correctIndex: 0,
            phonetic: '[da-tsa-ʔa]'
          },
          {
            type: 'choice',
            prompt: 'Qual expressão é usada para dizer "Vão em paz!" a quem sai em viagem?',
            options: ['Morĩ wa\'aba', 'Tô ba?', 'Tsa', 'Höri'],
            correctIndex: 0,
            phonetic: '[mõ-rĩ wa-a-ba]'
          },
          {
            type: 'sentence',
            prompt: 'Monte o convite para caminhar:',
            targetTranslation: 'Vamos em frente!',
            options: ['Mo', 'hã', 'wa!', 'Öwawe', 'Pi\'õ'],
            correctOrder: ['Mo', 'hã', 'wa!']
          },
          {
            type: 'match',
            prompt: 'Associe as saudações com sua tradução:',
            pairs: [
              { xavante: 'Datsa\'a', portuguese: 'Obrigado' },
              { xavante: 'Morĩ wa\'aba', portuguese: 'Vão em paz' },
              { xavante: 'Tô ba?', portuguese: 'Como vai?' },
              { xavante: 'Tô uptabi', portuguese: 'Tudo ótimo' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'unit_2',
    number: 2,
    title: 'Gente, Família e Aldeia',
    description: 'Conheça as pessoas da comunidade A\'uwẽ: pai, mãe, crianças e anciãos.',
    color: '#E65100', // Âmbar Intenso
    accentColor: '#FFB74D',
    icon: '👥',
    levels: [
      {
        id: 'u2_l1',
        title: 'Pessoas da Comunidade',
        subtitle: 'Aibö, Pi\'õ e A\'uwẽ',
        xpReward: 20,
        questions: [
          {
            type: 'choice',
            prompt: 'O que significa "Aibö"?',
            options: ['Homem', 'Peixe', 'Fogo', 'Lua'],
            correctIndex: 0,
            phonetic: '[aj-bə̃]'
          },
          {
            type: 'choice',
            prompt: 'Como se diz "Mulher" em Xavante?',
            options: ['Pi\'õ', 'Aba', 'Bö', 'Wahu'],
            correctIndex: 0,
            phonetic: '[pi-ʔõ]'
          },
          {
            type: 'choice',
            prompt: '"A\'uwẽ" é o nome sagrado que significa:',
            options: ['Povo verdadeiro / Gente', 'Água do rio', 'Gavião veloz', 'Noite escura'],
            correctIndex: 0,
            phonetic: '[a-ʔu-wẽ]',
            culturalTip: 'A\'uwẽ Uptabi é a identidade profunda deste povo que vive no Mato Grosso.'
          },
          {
            type: 'match',
            prompt: 'Ligue cada palavra ao seu significado:',
            pairs: [
              { xavante: 'Aibö', portuguese: 'Homem' },
              { xavante: 'Pi\'õ', portuguese: 'Mulher' },
              { xavante: 'Ba\'õtõ', portuguese: 'Criança' },
              { xavante: 'A\'uwẽ', portuguese: 'Povo / Gente' }
            ]
          }
        ]
      },
      {
        id: 'u2_l2',
        title: 'A Família Sagrada',
        subtitle: 'I-mama, I-no e Ba\'õtõ',
        xpReward: 25,
        questions: [
          {
            type: 'choice',
            prompt: 'Como você chama carinhosamente "Meu pai" em Xavante?',
            options: ['I-mama', 'I-no', 'Waradzu', 'Po\'re'],
            correctIndex: 0,
            phonetic: '[i-ma-ma]'
          },
          {
            type: 'choice',
            prompt: 'E como se diz "Minha mãe"?',
            options: ['I-no', 'I-mama', 'Tsere', 'Ri'],
            correctIndex: 0,
            phonetic: '[i-nõ]'
          },
          {
            type: 'sentence',
            prompt: 'Organize a frase em Xavante:',
            targetTranslation: 'Meu pai é um homem',
            options: ['I-mama', 'hã', 'aibö', 'uptabi', 'ö'],
            correctOrder: ['I-mama', 'hã', 'aibö']
          },
          {
            type: 'choice',
            prompt: 'Qual termo os Xavante usam para designar pessoas de fora da etnia?',
            options: ['Waradzu', 'A\'uwẽ', 'Ba\'õtõ', 'Höri'],
            correctIndex: 0,
            phonetic: '[wa-ra-dzu]',
            culturalTip: '"Waradzu" é o homem branco / não-indígena.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit_3',
    number: 3,
    title: 'O Cerrado e a Terra Sagrada',
    description: 'Descubra as palavras da terra, dos rios e das matas do Brasil central.',
    color: '#2E7D32', // Verde Cerrado
    accentColor: '#81C784',
    icon: '🌿',
    levels: [
      {
        id: 'u3_l1',
        title: 'Elementos da Natureza',
        subtitle: 'Hã, Bö e Ö',
        xpReward: 20,
        questions: [
          {
            type: 'choice',
            prompt: 'O que significa a palavra "Hã"?',
            options: ['Terra / Chão', 'Fogo', 'Céu', 'Peixe'],
            correctIndex: 0,
            phonetic: '[hã]'
          },
          {
            type: 'choice',
            prompt: 'Qual é a palavra Xavante para "Cerrado / Mata"?',
            options: ['Bö', 'Ö', 'Ri', 'Mo'],
            correctIndex: 0,
            phonetic: '[bə̃]'
          },
          {
            type: 'choice',
            prompt: 'Como se diz "Água"?',
            options: ['Ö', 'Po\'o', 'Wahi', 'Aibö'],
            correctIndex: 0,
            phonetic: '[ə̃]'
          },
          {
            type: 'match',
            prompt: 'Combine os elementos da natureza:',
            pairs: [
              { xavante: 'Hã', portuguese: 'Terra' },
              { xavante: 'Bö', portuguese: 'Cerrado' },
              { xavante: 'Ö', portuguese: 'Água' },
              { xavante: 'Po\'o', portuguese: 'Fogo' }
            ]
          }
        ]
      },
      {
        id: 'u3_l2',
        title: 'O Rio Sagrado e o Céu',
        subtitle: 'Öwawe, Wahu e A\'amo',
        xpReward: 25,
        questions: [
          {
            type: 'choice',
            prompt: '"Öwawe" significa Rio Grande e dá nome ao sagrado:',
            options: ['Rio das Mortes', 'Rio Amazonas', 'Rio Tietê', 'Rio São Francisco'],
            correctIndex: 0,
            phonetic: '[ə̃-wa-we]',
            culturalTip: 'O Rio das Mortes (Öwawe) é o coração das terras tradicionais A\'uwẽ.'
          },
          {
            type: 'choice',
            prompt: 'Como se chama o "Sol" ou o "Ano" em Xavante?',
            options: ['Wahu', 'A\'amo', 'Ri', 'Höri'],
            correctIndex: 0,
            phonetic: '[wa-hu]'
          },
          {
            type: 'choice',
            prompt: 'Qual palavra representa a "Lua"?',
            options: ['A\'amo', 'Wahu', 'Hã', 'Tsa'],
            correctIndex: 0,
            phonetic: '[a-ʔa-mõ]'
          },
          {
            type: 'sentence',
            prompt: 'Monte a frase em Xavante:',
            targetTranslation: 'Vamos para o cerrado',
            options: ['Mo', 'hã', 'bö', 'u!', 'Po\'o'],
            correctOrder: ['Mo', 'hã', 'bö', 'u!']
          }
        ]
      }
    ]
  },
  {
    id: 'unit_4',
    number: 4,
    title: 'Animais do Cerrado',
    description: 'Aprenda sobre a onça, o gavião, o peixe e os seres da floresta.',
    color: '#C2185B', // Magenta Rosa Urucum
    accentColor: '#F48FB1',
    icon: '🐆',
    levels: [
      {
        id: 'u4_l1',
        title: 'Mascotes da Aldeia',
        subtitle: 'Tsere e Romhö',
        xpReward: 25,
        questions: [
          {
            type: 'choice',
            prompt: 'Quem é "Tsere", o mascote veloz do nosso aplicativo?',
            options: ['Gavião / Pássaro', 'Onça-pintada', 'Tamanduá', 'Jacaré'],
            correctIndex: 0,
            phonetic: '[tse-re]',
            culturalTip: 'O gavião é admirado por sua visão penetrante e agilidade no voo.'
          },
          {
            type: 'choice',
            prompt: 'Como se diz "Onça-pintada" em Xavante?',
            options: ['Romhö', 'Wahi', 'Höri', 'Aba'],
            correctIndex: 0,
            phonetic: '[rõm-hə̃]',
            culturalTip: 'A onça é a rainha do Cerrado, respeitada em todas as aldeias.'
          },
          {
            type: 'match',
            prompt: 'Conecte cada animal ao seu nome em português:',
            pairs: [
              { xavante: 'Tsere', portuguese: 'Pássaro / Gavião' },
              { xavante: 'Romhö', portuguese: 'Onça' },
              { xavante: 'Wahi', portuguese: 'Cobra' },
              { xavante: 'Höri', portuguese: 'Peixe' }
            ]
          },
          {
            type: 'choice',
            prompt: 'O que é um "Höri"?',
            options: ['Peixe', 'Anta', 'Cobra', 'Arara'],
            correctIndex: 0,
            phonetic: '[hə̃-ri]'
          }
        ]
      },
      {
        id: 'u4_l2',
        title: 'Habitantes das Matas',
        subtitle: 'Wahi, Po\'re e Aba',
        xpReward: 25,
        questions: [
          {
            type: 'choice',
            prompt: 'Como se diz "Cobra" em Xavante?',
            options: ['Wahi', 'Tsere', 'Ri', 'Hã'],
            correctIndex: 0,
            phonetic: '[wa-hi]'
          },
          {
            type: 'choice',
            prompt: 'Qual é o nome da "Anta", o maior mamífero do Cerrado?',
            options: ['Po\'re', 'Aba', 'Romhö', 'Aibö'],
            correctIndex: 0,
            phonetic: '[põ-ʔre]'
          },
          {
            type: 'choice',
            prompt: 'E como se chama o veloz "Veado"?',
            options: ['Aba', 'Pi\'õ', 'Tô ba?', 'Wahu'],
            correctIndex: 0,
            phonetic: '[a-ba]'
          },
          {
            type: 'sentence',
            prompt: 'Monte a frase com o gavião:',
            targetTranslation: 'Veja o pássaro',
            options: ['Tsere', 'aina!', 'Romhö', 'te'],
            correctOrder: ['Tsere', 'aina!']
          }
        ]
      }
    ]
  },
  {
    id: 'unit_5',
    number: 5,
    title: 'Ações e Números A\'uwẽ',
    description: 'Comer, beber, ouvir e contar as coisas na comunidade.',
    color: '#00897B', // Verde Azulado
    accentColor: '#4DB6AC',
    icon: '🔢',
    levels: [
      {
        id: 'u5_l1',
        title: 'Ações do Dia a Dia',
        subtitle: 'Tsa, Öri e Wapari',
        xpReward: 30,
        questions: [
          {
            type: 'choice',
            prompt: 'Como se diz "Comer" em Xavante?',
            options: ['Tsa', 'Öri', 'Mo', 'Hã'],
            correctIndex: 0,
            phonetic: '[tsa]'
          },
          {
            type: 'choice',
            prompt: 'E como se diz "Beber água"?',
            options: ['Öri', 'Tsa', 'Wapari', 'Aina'],
            correctIndex: 0,
            phonetic: '[ə̃-ri]'
          },
          {
            type: 'choice',
            prompt: '"Wapari" é uma ação fundamental de sabedoria ancestral que significa:',
            options: ['Ouvir / Escutar', 'Correr', 'Dormir', 'Pintar'],
            correctIndex: 0,
            phonetic: '[wa-pa-ri]',
            culturalTip: 'Ouvir a sabedoria dos mais velhos é a base de todo o povo Xavante.'
          },
          {
            type: 'match',
            prompt: 'Associe os verbos:',
            pairs: [
              { xavante: 'Tsa', portuguese: 'Comer' },
              { xavante: 'Öri', portuguese: 'Beber' },
              { xavante: 'Wapari', portuguese: 'Ouvir' },
              { xavante: 'Aina', portuguese: 'Ver / Olhar' }
            ]
          }
        ]
      },
      {
        id: 'u5_l2',
        title: 'Contando no Cerrado',
        subtitle: 'Misi, Maptutu e Si\'ubdató',
        xpReward: 30,
        questions: [
          {
            type: 'choice',
            prompt: 'Como se diz o número "Um (1)"?',
            options: ['Misi', 'Maptutu', 'Si\'ubdató', 'Ahö'],
            correctIndex: 0,
            phonetic: '[mi-si]'
          },
          {
            type: 'choice',
            prompt: 'Como se diz "Dois (2)"?',
            options: ['Maptutu', 'Misi', 'Ahö', 'Bö'],
            correctIndex: 0,
            phonetic: '[map-tu-tu]'
          },
          {
            type: 'choice',
            prompt: 'E como se diz "Três (3)"?',
            options: ['Si\'ubdató', 'Maptutu', 'Misi', 'Aibö'],
            correctIndex: 0,
            phonetic: '[si-ʔub-da-tõ]'
          },
          {
            type: 'choice',
            prompt: 'Quando há muitas pessoas ou animais juntos, usamos a palavra:',
            options: ['Ahö', 'Misi', 'Ri', 'Ö'],
            correctIndex: 0,
            phonetic: '[a-hə̃]'
          },
          {
            type: 'sentence',
            prompt: 'Monte a contagem:',
            targetTranslation: 'Dois homens',
            options: ['Aibö', 'maptutu', 'misi', 'pi\'õ'],
            correctOrder: ['Aibö', 'maptutu']
          }
        ]
      }
    ]
  }
];

export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    title: 'Primeira Palavra',
    desc: 'Complete sua primeira lição em Xavante.',
    icon: '🌱',
    xpBonus: 50,
    check: (state) => Object.keys(state.completedLevels).length >= 1
  },
  {
    id: 'streak_3',
    title: 'Fogo do Cerrado',
    desc: 'Mantenha 3 dias de ofensiva de estudo.',
    icon: '🔥',
    xpBonus: 100,
    check: (state) => state.streak >= 3
  },
  {
    id: 'master_unit_1',
    title: 'Amigo da Aldeia',
    desc: 'Complete todos os níveis da Unidade 1 de Saudações.',
    icon: '🤝',
    xpBonus: 80,
    check: (state) => state.completedLevels['u1_l1'] && state.completedLevels['u1_l2']
  },
  {
    id: 'dictionary_explorer',
    title: 'Explorador da Língua',
    desc: 'Acesse o dicionário e explore 5 palavras.',
    icon: '📚',
    xpBonus: 60,
    check: (state) => (state.dictionaryExploredCount || 0) >= 5
  },
  {
    id: 'warrior_level',
    title: 'Guerreiro A\'uwẽ',
    desc: 'Acumule mais de 200 pontos de experiência (XP).',
    icon: '🦅',
    xpBonus: 150,
    check: (state) => state.xp >= 200
  }
];
