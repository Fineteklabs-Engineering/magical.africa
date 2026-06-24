// dictionaryData.js
// Structure: tribe slug → { wordOfTheDay, words[] }
// words[]: { word, translation, pronunciation, partOfSpeech, example }

export const dictionaryData = {
  maasai: {
    wordOfTheDay: {
      word: 'Sopa',
      translation: 'Hello / Welcome (a respectful greeting)',
      pronunciation: 'SO-pah',
      partOfSpeech: 'interjection',
      example: 'Sopa, enkiama — Hello, friend.',
      videoUrl: '', // optional: embed URL
    },
    words: [
      { word: 'Sopa', translation: 'Hello / Welcome', pronunciation: 'SO-pah', partOfSpeech: 'interjection', example: 'Sopa, enkiama — Hello, friend.' },
      { word: 'Enkiama', translation: 'Friend', pronunciation: 'en-KIA-ma', partOfSpeech: 'noun', example: 'Enkiama lare — My friend is here.' },
      { word: 'Emuny', translation: 'Water', pronunciation: 'eh-MOON-yee', partOfSpeech: 'noun', example: 'Aijoki emuny — I am drinking water.' },
      { word: 'Entim', translation: 'Forest / Bush', pronunciation: 'EN-tim', partOfSpeech: 'noun', example: 'Enkiama aata entim — My friend went to the forest.' },
      { word: 'Sidai', translation: 'Good / Beautiful', pronunciation: 'see-DAH-ee', partOfSpeech: 'adjective', example: 'Enkiama sidai — A good friend.' },
      { word: 'Naibor', translation: 'White', pronunciation: 'nai-BOR', partOfSpeech: 'adjective', example: 'Enkare naibor — White milk.' },
    ],
  },

  luo: {
    wordOfTheDay: {
      word: 'Misawa',
      translation: 'Hello / How are you',
      pronunciation: 'mee-SAH-wah',
      partOfSpeech: 'interjection',
      example: 'Misawa ahinya — Hello, very much.',
      videoUrl: '',
    },
    words: [
      { word: 'Misawa', translation: 'Hello / How are you', pronunciation: 'mee-SAH-wah', partOfSpeech: 'interjection', example: 'Misawa ahinya — Hello, very much.' },
      { word: 'Nyuka', translation: 'Porridge', pronunciation: 'NYOO-kah', partOfSpeech: 'noun', example: 'Nyuka mar kal — Millet porridge.' },
      { word: 'Piny', translation: 'Land / Earth', pronunciation: 'PEEN-yee', partOfSpeech: 'noun', example: 'Piny Luo — Luo land.' },
      { word: 'Oganda', translation: 'Community / Clan', pronunciation: 'oh-GAN-dah', partOfSpeech: 'noun', example: 'Oganda wa — Our community.' },
    ],
  },

  kikuyu: {
    wordOfTheDay: {
      word: 'Ũhoro',
      translation: 'News / Greetings / Story',
      pronunciation: 'oo-HO-ro',
      partOfSpeech: 'noun',
      example: 'Ũhoro waku? — What is your news?',
      videoUrl: '',
    },
    words: [
      { word: 'Ũhoro', translation: 'News / Greetings', pronunciation: 'oo-HO-ro', partOfSpeech: 'noun', example: 'Ũhoro waku? — What is your news?' },
      { word: 'Mũtũngũ', translation: 'European / Foreigner', pronunciation: 'moo-TOON-goo', partOfSpeech: 'noun', example: 'Mũtũngũ ũyũ — This foreigner.' },
      { word: 'Ngũgũ', translation: 'Grandmother', pronunciation: 'ngoo-GOO', partOfSpeech: 'noun', example: 'Ngũgũ wakwa — My grandmother.' },
      { word: 'Mũndũ', translation: 'Person', pronunciation: 'MOON-doo', partOfSpeech: 'noun', example: 'Mũndũ mwega — A good person.' },
    ],
  },

  zulu: {
    wordOfTheDay: {
      word: 'Sawubona',
      translation: 'I see you (a greeting of deep respect)',
      pronunciation: 'sah-woo-BOH-nah',
      partOfSpeech: 'interjection',
      example: 'Sawubona, mfowethu — I see you, brother.',
      videoUrl: '',
    },
    words: [
      { word: 'Sawubona', translation: 'I see you (greeting)', pronunciation: 'sah-woo-BOH-nah', partOfSpeech: 'interjection', example: 'Sawubona, mfowethu — I see you, brother.' },
      { word: 'Ubuntu', translation: 'Humanity / Togetherness', pronunciation: 'oo-BOON-too', partOfSpeech: 'noun', example: 'Ubuntu ngumuntu ngabantu — A person is a person through other people.' },
      { word: 'Isizwe', translation: 'Nation / People', pronunciation: 'ee-see-ZWE', partOfSpeech: 'noun', example: 'Isizwe esikhulu — A great nation.' },
    ],
  },

  igbo: {
    wordOfTheDay: {
      word: 'Ndewo',
      translation: 'Hello / Greetings',
      pronunciation: 'n-DEH-woh',
      partOfSpeech: 'interjection',
      example: 'Ndewo, nna m — Hello, my father.',
      videoUrl: '',
    },
    words: [
      { word: 'Ndewo', translation: 'Hello / Greetings', pronunciation: 'n-DEH-woh', partOfSpeech: 'interjection', example: 'Ndewo, nna m — Hello, my father.' },
      { word: 'Mmiri', translation: 'Water', pronunciation: 'mm-EE-ree', partOfSpeech: 'noun', example: 'Nyem mmiri — Give me water.' },
      { word: 'Ọchịchọ', translation: 'Desire / Want', pronunciation: 'oh-CHEE-choh', partOfSpeech: 'noun', example: 'O nwere ọchịchọ — He has a desire.' },
    ],
  },

  yoruba: {
    wordOfTheDay: {
      word: 'Ẹ káàbọ̀',
      translation: 'Welcome',
      pronunciation: 'eh KAH-boh',
      partOfSpeech: 'interjection',
      example: 'Ẹ káàbọ̀ sí ilé wa — Welcome to our home.',
      videoUrl: '',
    },
    words: [
      { word: 'Ẹ káàbọ̀', translation: 'Welcome', pronunciation: 'eh KAH-boh', partOfSpeech: 'interjection', example: 'Ẹ káàbọ̀ sí ilé wa — Welcome to our home.' },
      { word: 'Omi', translation: 'Water', pronunciation: 'OH-mee', partOfSpeech: 'noun', example: 'Fún mi ní omi — Give me water.' },
      { word: 'Ilé', translation: 'Home / House', pronunciation: 'ee-LEH', partOfSpeech: 'noun', example: 'Ilé wa tóbi — Our house is big.' },
    ],
  },

  ashanti: {
    wordOfTheDay: {
      word: 'Akwaaba',
      translation: 'Welcome',
      pronunciation: 'ah-KWAH-bah',
      partOfSpeech: 'interjection',
      example: 'Akwaaba, ɔbarima — Welcome, young man.',
      videoUrl: '',
    },
    words: [
      { word: 'Akwaaba', translation: 'Welcome', pronunciation: 'ah-KWAH-bah', partOfSpeech: 'interjection', example: 'Akwaaba, ɔbarima — Welcome, young man.' },
      { word: 'Nsuo', translation: 'Water', pronunciation: 'n-SWOH', partOfSpeech: 'noun', example: 'Ma me nsuo — Give me water.' },
      { word: 'Okyena', translation: 'Tomorrow', pronunciation: 'oh-CHEH-nah', partOfSpeech: 'adverb', example: 'Okyena bra — Come tomorrow.' },
    ],
  },

  hausa: {
    wordOfTheDay: {
      word: 'Sannu',
      translation: 'Hello / Greetings',
      pronunciation: 'SAN-noo',
      partOfSpeech: 'interjection',
      example: 'Sannu da zuwa — Hello and welcome.',
      videoUrl: '',
    },
    words: [
      { word: 'Sannu', translation: 'Hello / Greetings', pronunciation: 'SAN-noo', partOfSpeech: 'interjection', example: 'Sannu da zuwa — Hello and welcome.' },
      { word: 'Ruwa', translation: 'Water', pronunciation: 'ROO-wah', partOfSpeech: 'noun', example: 'Ka kawo ruwa — Bring water.' },
      { word: 'Gida', translation: 'House / Home', pronunciation: 'GEE-dah', partOfSpeech: 'noun', example: 'Gidanmu — Our home.' },
    ],
  },

  amhara: {
    wordOfTheDay: {
      word: 'Selam',
      translation: 'Peace / Hello',
      pronunciation: 'seh-LAM',
      partOfSpeech: 'interjection',
      example: 'Selam nesh? — Are you at peace? (greeting)',
      videoUrl: '',
    },
    words: [
      { word: 'Selam', translation: 'Peace / Hello', pronunciation: 'seh-LAM', partOfSpeech: 'interjection', example: 'Selam nesh? — Are you at peace?' },
      { word: 'Wuha', translation: 'Water', pronunciation: 'WOO-hah', partOfSpeech: 'noun', example: 'Wuha sጠጣ — Drink water.' },
      { word: 'Bet', translation: 'House / Home', pronunciation: 'BET', partOfSpeech: 'noun', example: 'Betachin — Our house.' },
    ],
  },

  swahili: {
    wordOfTheDay: {
      word: 'Karibu',
      translation: 'Welcome / Come in',
      pronunciation: 'kah-REE-boo',
      partOfSpeech: 'interjection',
      example: 'Karibu nyumbani — Welcome home.',
      videoUrl: '',
    },
    words: [
      { word: 'Karibu', translation: 'Welcome / Come in', pronunciation: 'kah-REE-boo', partOfSpeech: 'interjection', example: 'Karibu nyumbani — Welcome home.' },
      { word: 'Maji', translation: 'Water', pronunciation: 'MAH-jee', partOfSpeech: 'noun', example: 'Nipe maji — Give me water.' },
      { word: 'Nyumba', translation: 'House / Home', pronunciation: 'NYOOM-bah', partOfSpeech: 'noun', example: 'Nyumba yangu — My house.' },
      { word: 'Asante', translation: 'Thank you', pronunciation: 'ah-SAN-teh', partOfSpeech: 'interjection', example: 'Asante sana — Thank you very much.' },
    ],
  },
};