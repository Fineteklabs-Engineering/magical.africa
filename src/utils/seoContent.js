export const SEO_CONTENT = {
  home: {
    title: 'Magical Africa | African Culture, Languages, and Heritage',
    description: 'Explore African culture, languages, tribes, marketplace experiences, and academy learning on Magical Africa.',
    keywords: 'Magical Africa, African culture, African languages, African heritage, African tribes, African marketplace, African academy',
    path: '/',
    image: '/images/Igbo2.jpg',
    schemaType: 'WebSite',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Magical Africa',
        url: 'https://magical.africa',
        logo: 'https://magical.africa/images/magical-colored-fav.png',
        sameAs: []
      }
    ]
  },

  about: {
    title: 'About Magical Africa | Our Story and Mission',
    description: 'Learn about Magical Africa and its mission to preserve African languages, culture, knowledge, and heritage.',
    keywords: 'About Magical Africa, African culture preservation, African languages, African heritage, pan-African platform',
    path: '/about',
    image: '/images/pyramids2.jpg'
  },

  tribes: {
    title: 'African Tribes & Communities | Magical Africa',
    description: 'Discover African tribes and communities — their traditions, languages, customs, and rich cultural heritage. Explore the Maasai, Zulu, Yoruba, Ashanti, Igbo, Kikuyu and more.',
    keywords: 'African tribes, African communities, Maasai tribe, Zulu culture, Yoruba people, Ashanti traditions, Igbo heritage, Kikuyu Kenya, African culture, African heritage, East Africa, West Africa, Southern Africa',
    path: '/tribes',
    image: '/images/maasai-women2.jpg',
    schemaType: 'CollectionPage',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'African Tribes & Communities | Magical Africa',
        description: 'Explore African tribes and communities across East, West, North and Southern Africa.',
        url: 'https://magical.africa/tribes',
        image: 'https://magical.africa/images/maasai-women2.jpg',
        publisher: {
          '@type': 'Organization',
          name: 'Magical Africa',
          url: 'https://magical.africa',
          logo: 'https://magical.africa/images/magical-colored-fav.png'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'African Communities on Magical Africa',
        itemListElement: [
          { '@type': 'ListItem', position: 1,  name: 'Maasai',  url: 'https://magical.africa/tribes/maasai' },
          { '@type': 'ListItem', position: 2,  name: 'Ashanti', url: 'https://magical.africa/tribes/ashanti' },
          { '@type': 'ListItem', position: 3,  name: 'Hausa',   url: 'https://magical.africa/tribes/hausa' },
          { '@type': 'ListItem', position: 4,  name: 'Zulu',    url: 'https://magical.africa/tribes/zulu' },
          { '@type': 'ListItem', position: 5,  name: 'Yoruba',  url: 'https://magical.africa/tribes/yoruba' },
          { '@type': 'ListItem', position: 6,  name: 'Kikuyu',  url: 'https://magical.africa/tribes/kikuyu' },
          { '@type': 'ListItem', position: 7,  name: 'Igbo',    url: 'https://magical.africa/tribes/igbo' },
          { '@type': 'ListItem', position: 8,  name: 'Amhara',  url: 'https://magical.africa/tribes/amhara' },
          { '@type': 'ListItem', position: 9,  name: 'Berber',  url: 'https://magical.africa/tribes/berber' },
          { '@type': 'ListItem', position: 10, name: 'Swahili', url: 'https://magical.africa/tribes/swahili' },
          { '@type': 'ListItem', position: 11, name: 'Wolof',   url: 'https://magical.africa/tribes/wolof' },
          { '@type': 'ListItem', position: 12, name: 'Fulani',  url: 'https://magical.africa/tribes/fulani' },
        ]
      }
    ]
  },

  // ── INDIVIDUAL TRIBE PAGES ──
  maasai: {
    title: 'Maasai Tribe | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Maasai people of East Africa — their history, warrior culture, beadwork traditions, Maa language, and marketplace crafts.',
    keywords: 'Maasai tribe, Maasai culture, Maasai history, Maasai language, Maa language, Maasai beadwork, East Africa tribes',
    path: '/tribes/maasai',
    image: '/images/maasai-women2.jpg',
  },
  zulu: {
    title: 'Zulu People | History, Culture & Traditions | Magical Africa',
    description: 'Discover the Zulu people of South Africa — their history, warrior kingdom, beadwork, isiZulu language, and rich cultural heritage.',
    keywords: 'Zulu tribe, Zulu culture, Zulu history, isiZulu language, Zulu beadwork, Southern Africa tribes, Shaka Zulu',
    path: '/tribes/zulu',
    image: '/images/maasai-women-latest.jpg',
  },
  yoruba: {
    title: 'Yoruba People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Yoruba people of West Africa — their ancient civilisation, Ifa religion, art, language, and cultural traditions.',
    keywords: 'Yoruba tribe, Yoruba culture, Yoruba history, Yoruba language, Ifa religion, West Africa tribes, Oyo Empire',
    path: '/tribes/yoruba',
    image: '/images/African-latest.jpg',
  },
  
luo: {
  title: 'Luo People | History, Culture & Traditions | Magical Africa',
  description: 'Explore the Luo people of East Africa — their Nilotic origins, Lake Victoria heritage, fishing traditions, music, language, and cultural practices.',
  keywords: 'Luo tribe, Luo culture, Luo history, Dholuo language, Nilotic tribes, Lake Victoria communities, East African tribes',
  path: '/tribes/luo',
  image: '/images/African-latest.jpg',
},


ashanti: {
    title: 'Ashanti People | History, Culture & Traditions | Magical Africa',
    description: 'Discover the Ashanti people of Ghana — their golden stool, kente cloth, rich history, and Twi language.',
    keywords: 'Ashanti tribe, Ashanti culture, Ashanti history, Twi language, kente cloth, Ghana tribes, Ashanti kingdom',
    path: '/tribes/ashanti',
    image: '/images/maasai-women2.jpg',
  },
  hausa: {
    title: 'Hausa People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Hausa people of West Africa — one of the largest ethnic groups in Africa, their trade history, and Hausa language.',
    keywords: 'Hausa tribe, Hausa culture, Hausa history, Hausa language, West Africa tribes, Nigeria tribes, Niger tribes',
    path: '/tribes/hausa',
    image: '/images/maasai-women2.jpg',
  },
  kikuyu: {
    title: 'Kikuyu People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Kikuyu people of Kenya — the largest ethnic group in Kenya, their history, culture, and Gikuyu language.',
    keywords: 'Kikuyu tribe, Kikuyu culture, Kikuyu history, Gikuyu language, Kenya tribes, East Africa tribes, Mount Kenya',
    path: '/tribes/kikuyu',
    image: '/images/maasai-women2.jpg',
  },
  igbo: {
    title: 'Igbo People | History, Culture & Traditions | Magical Africa',
    description: 'Discover the Igbo people of Nigeria — their masquerades, Igbo language, art traditions, and rich cultural heritage.',
    keywords: 'Igbo tribe, Igbo culture, Igbo history, Igbo language, Nigeria tribes, West Africa tribes, Igbo masquerade',
    path: '/tribes/igbo',
    image: '/images/maasai-women2.jpg',
  },
  amhara: {
    title: 'Amhara People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Amhara people of Ethiopia — their ancient history, Orthodox Christianity, Amharic language, and cultural traditions.',
    keywords: 'Amhara tribe, Amhara culture, Amhara history, Amharic language, Ethiopia tribes, East Africa tribes, Ethiopian Orthodox',
    path: '/tribes/amhara',
    image: '/images/maasai-women2.jpg',
  },
  berber: {
    title: 'Berber People | History, Culture & Traditions | Magical Africa',
    description: 'Discover the Berber (Amazigh) people of North Africa — the indigenous people of the Maghreb, their Tamazight language and ancient culture.',
    keywords: 'Berber tribe, Amazigh people, Berber culture, Berber history, Tamazight language, North Africa tribes, Morocco tribes, Algeria tribes',
    path: '/tribes/berber',
    image: '/images/maasai-women2.jpg',
  },
  swahili: {
    title: 'Swahili People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Swahili people of East Africa — their coastal trading history, Swahili language, and blend of African and Arab cultures.',
    keywords: 'Swahili tribe, Swahili culture, Swahili history, Swahili language, East Africa tribes, Tanzania tribes, coastal Africa',
    path: '/tribes/swahili',
    image: '/images/maasai-women2.jpg',
  },
  wolof: {
    title: 'Wolof People | History, Culture & Traditions | Magical Africa',
    description: 'Discover the Wolof people of Senegal and Gambia — their griot tradition, Wolof language, and vibrant West African culture.',
    keywords: 'Wolof tribe, Wolof culture, Wolof history, Wolof language, Senegal tribes, West Africa tribes, griot tradition',
    path: '/tribes/wolof',
    image: '/images/maasai-women2.jpg',
  },
  fulani: {
    title: 'Fulani People | History, Culture & Traditions | Magical Africa',
    description: 'Explore the Fulani people — one of the largest nomadic groups in the world, spread across West and Central Africa.',
    keywords: 'Fulani tribe, Fulani culture, Fulani history, Fula language, West Africa tribes, nomadic Africa, Sahel tribes',
    path: '/tribes/fulani',
    image: '/images/maasai-women2.jpg',
  },

  // ── OTHER PAGES ──
  events: {
    title: 'African Cultural Events | Magical Africa',
    description: 'Discover African cultural events featuring music, ceremonies, food, art, and film.',
    keywords: 'African events, African cultural events, African festivals, African music events, African dance',
    path: '/events',
    image: '/images/drums2-latest.jpg'
  },
  market: {
    title: 'Marketplace - Original African Art For Sale',
    description: 'Shop African jewellery, carvings, pottery, textiles, spices, and other handcrafted products on Magical Africa.',
    keywords: 'African marketplace, buy African products, authentic African crafts, African artisans, African jewelry, African clothing',
    path: '/market',
    image: '/images/side-view-people-garage-sale2.jpg',
    schemaType: 'CollectionPage'
  },
  academy: {
    title: 'Magical Africa Academy | Learn African Languages and Skills',
    description: 'Browse Magical Africa Academy courses in language, music, crafts, cooking, and cultural learning.',
    keywords: 'Magical Africa Academy, African courses, learn African languages, African arts, African culture courses',
    path: '/academy',
    image: '/images/photorealistic-portrait-african-woman.jpg',
    schemaType: 'CollectionPage'
  },
  blogs: {
    title: 'Magical Africa Blog | Stories, Culture, and Heritage',
    description: 'Read blog content about African languages, heritage, crafts, food, travel, and culture on Magical Africa.',
    keywords: 'Magical Africa blog, African culture blog, African languages, African history, African travel, African art',
    path: '/blogs',
    image: '/images/African-storytelling2.jpg',
    schemaType: 'Blog'
  },
  music: {
    title: 'African Music | Genres, Instruments, and Artists',
    description: 'Explore African music through genres, instruments, artists, and cultural sounds from across the continent.',
    keywords: 'African music, Afrobeats, African instruments, Djembe, Kora, Mbira, African artists',
    path: '/music',
    image: '/images/drums2-latest.jpg'
  },
  technology: {
    title: 'African Technology and AI | Magical Africa',
    description: 'Explore how Magical Africa uses technology and AI for speech, transcription, indexing, and cultural preservation.',
    keywords: 'African technology, AI for African languages, language preservation, African digital heritage',
    path: '/technology',
    image: '/images/AI-woman.png'
  },
  academyLogin: {
    title: 'Login | Magical Africa',
    description: 'Sign in to your Magical Africa Academy account to access your learner or tutor dashboard.',
    keywords: 'Magical Africa login, academy sign in, learner login, tutor login',
    path: '/academy-signIn',
    image: '/images/magivcal-logo2-removebg-preview.png',
    noIndex: true
  },
  academySignup: {
    title: 'Create Account | Magical Africa',
    description: 'Create a Magical Africa Academy account to join as a learner or educator.',
    keywords: 'Magical Africa Academy signup, create account, African courses, African learning platform',
    path: '/academy-signUp',
    image: '/images/photorealistic-portrait-african-woman.jpg',
    noIndex: true
  },
  creators: {
  title: 'African Creators & Artisans | Magical Africa',
  description: 'Meet the artisans, weavers, carvers, and fashion designers behind Magical Africa — each telling their community\'s story through handcrafted work.',
  keywords: 'African artisans, African creators, African craftspeople, handmade African art, African weavers, African carvers',
  path: '/creators',
  image: '/images/artisan-gloria.jpeg',
  schemaType: 'CollectionPage',
},
}

export const SEO_ROUTE_LIST = [
  SEO_CONTENT.home,
  SEO_CONTENT.about,
  SEO_CONTENT.tribes,
  SEO_CONTENT.maasai,
  SEO_CONTENT.zulu,
  SEO_CONTENT.yoruba,
  SEO_CONTENT.ashanti,
  SEO_CONTENT.hausa,
  SEO_CONTENT.kikuyu,
  SEO_CONTENT.igbo,
  SEO_CONTENT.amhara,
  SEO_CONTENT.berber,
  SEO_CONTENT.swahili,
  SEO_CONTENT.wolof,
  SEO_CONTENT.fulani,
  SEO_CONTENT.events,
  SEO_CONTENT.market,
  SEO_CONTENT.academy,
  SEO_CONTENT.blogs,
  SEO_CONTENT.music,
  SEO_CONTENT.technology,
  SEO_CONTENT.academyLogin,
  SEO_CONTENT.academySignup,
  SEO_CONTENT.creators,
]