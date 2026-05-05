import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jewelleryData } from '../components/Jewelery';
import { carvingsData } from '../components/Carvings';
import { artefactsData } from '../components/Artefacts';
import { toSlug } from '../components/ProductDetail';
import '../styles/tribe-page.css';
import PageSeo from '../components/PageSeo';
import { SEO_CONTENT } from '../utils/seoContent';

const getAllProducts = () => {
  const jewellery = Object.values(jewelleryData).flat().map((item) => ({
    ...item,
    imageUrl: item.image,
    category: 'jewellery',
  }));
  const carvings = Object.values(carvingsData).flat().map((item) => ({
    ...item,
    imageUrl: item.img,
    description: item.desc,
    category: 'carvings',
  }));
  const artefacts = Object.values(artefactsData).flatMap((cat) =>
    (cat.items || []).map((item) => ({
      ...item,
      imageUrl: item.img,
      description: item.desc,
      category: 'artefacts',
    }))
  );
  return [...jewellery, ...carvings, ...artefacts];
};

const allProducts = getAllProducts();

const getProductsForTribe = (tribeName) =>
  allProducts.filter((p) => p.tribe?.toLowerCase() === tribeName?.toLowerCase());


const tribeData = {
  maasai: {
    name: 'Maasai',
    region: 'East Africa',
    location: 'Kenya & Tanzania',
    population: '2 million+',
    heroImage: '/images/drums-latest.jpg',
    tagline: 'Warriors of the East African savannah, keepers of ancient tradition.',
    marketOverview: `The Maasai are renowned traders and craftspeople across East Africa. 
    Their open-air markets are vibrant gathering places where communities exchange livestock, 
    share news, and celebrate culture. Maasai artisans particularly women
    are celebrated internationally for their intricate beadwork, 
    which carries cultural symbolism in every colour and pattern.`,
    history: {
      overview: `The Maasai are a Nilotic ethnic group inhabiting the African Great Lakes region. 
      They arrived in the current territory through a long migration from the Nile Basin region. 
      By the 17th and 18th centuries, the Maasai had become one of the most dominant groups 
      in East Africa, known for their fierce warrior tradition and nomadic pastoralism. 
      Their identity is deeply tied to cattle, which they consider a gift from their god Enkai
      the source of all wealth, status, and spiritual life.`,
      timeline: [
        { year: '1500s', event: 'Maasai begin migrating southward from the Nile Basin region.' },
        { year: '1700s', event: 'Maasai reach their current territory in Kenya and Tanzania, becoming dominant across the Great Rift Valley.' },
        { year: '1890s', event: 'The Iloikop Wars and a devastating rinderpest epidemic dramatically reduce Maasai cattle and population.' },
        { year: '1904', event: 'British colonial government restricts Maasai land through the first Maasai Agreement, confining them to reserves.' },
        { year: '1960s', event: 'Kenya and Tanzania gain independence; Maasai begin modern land tenure negotiations with new governments.' },
        { year: 'Today', event: 'Maasai preserve cultural identity while adapting to modern Kenya and Tanzania, with growing presence in tourism and conservation.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `The Maasai observe many sacred taboos passed down through generations. It is forbidden to eat wildlife the Maasai are pastoralists and consuming game is considered beneath their dignity. Women are not permitted to own cattle, as livestock belongs exclusively to the men and the clan. Speaking ill of the elders is a serious transgression that can result in social exclusion and curses. A young warrior (moran) is not permitted to eat meat that has been seen by a married woman doing so is believed to weaken his strength and courage. Entering another man's home without permission is considered deeply disrespectful, as the home is a sacred space belonging to the wife who built it.` },
      myths: { title: 'Myths & Legends', content: `The Maasai believe that Enkai (God) gave all the cattle in the world to the Maasai people at the beginning of time. This myth serves as a spiritual justification for cattle raiding, which was historically practiced against neighbouring tribes the Maasai believed they were simply reclaiming what was rightfully theirs. The Maasai also tell of Leeyo, a father figure who bargained with death itself to bring back his son a story about love, sacrifice, and the fragile boundary between the living and the spirit world. The rainbow is seen as a divine bridge between heaven and earth, a sign that Enkai is watching. Lightning is feared as the Red God's anger, while gentle rain is the blessing of the Black God.` },
      food: { title: 'Food', content: `The traditional Maasai diet consists almost entirely of cattle products milk, meat, and blood. Fresh and fermented milk, known as kule naoto, is a daily staple consumed by all ages. Blood is drawn from live cattle by making a small incision in the jugular vein it is mixed with milk and consumed during ceremonies, illness recovery, and by warriors after long journeys. The cattle are rarely slaughtered for food alone; meat is reserved for celebrations, healing rituals, and rites of passage. Honey wine (mead) is brewed for special occasions. In modern times, ugali (maize porridge), rice, and vegetables have been adopted through contact with neighbouring Bantu communities and urban markets.` },
      housing: { title: 'Housing', content: `Maasai homes, known as inkajijik, are constructed entirely by women building the home is considered a woman's sacred responsibility and a mark of her skill and status. The structure uses a framework of interwoven branches and saplings plastered with a mixture of mud, grass, ash, and cow dung, which dries into a hard, weatherproof shell. The low, oval design is suited to the nomadic lifestyle it can be dismantled and rebuilt as the community moves to new grazing land. Inside, a central fire provides warmth and cooking heat, with smoke escaping through a small opening. A larger enclosure called an enkang surrounds a cluster of homes, fenced with sharp acacia branches to protect livestock from lions and hyenas at night.` },
      clothing: { title: 'Clothing & Adornment', content: `The Maasai are instantly recognisable by their striking red shuka a blanket-like cloth worn draped over the body. Red is sacred, symbolising courage, strength, and the blood of warriors. Elaborate beadwork is the heart of Maasai adornment women spend countless hours crafting intricate collars, bracelets, anklets, and earrings by hand. Each colour carries deep meaning: white represents purity and health, blue represents the sky and water, green represents the land and sustenance, orange represents warmth and friendship, red represents bravery and blood. Both men and women traditionally stretch their earlobes, adorned with beaded plugs and metal hoops.` },
      religion: { title: 'Religion', content: `The Maasai are monotheistic, worshipping a single deity called Enkai, who exists in two complementary forms. Enkai Narok the Black God is benevolent, associated with rain, green pastures, and abundance. Enkai Nanyokie the Red God is wrathful, associated with lightning, drought, and punishment for wrongdoing. The laibon, a hereditary spiritual leader and medicine man, serves as the intermediary between the community and Enkai performing healing rituals, offering prophecies, and blessing warriors before battle. Prayer is woven into daily life: before meals, at the birth of children, before long journeys.` },
      rites: { title: 'Rites of Passage', content: `The Maasai life cycle is structured around a series of profound rites of passage. Three months after birth, the Enkiama naming ceremony welcomes the child into the community. Boys progress through age-sets: junior warrior (moran), senior warrior, junior elder, and senior elder each transition marked by ceremony and new responsibilities. The most celebrated rite is Eunoto, the coming-of-age ceremony in which a warrior's long, ochre-dyed hair is shaved off by his mother, marking his transition to senior warrior status. For girls, ear-piercing and the wearing of beaded adornments mark entry into womanhood.` },
    },
    language: {
      name: 'Maa (Maasai)',
      family: 'Nilo-Saharan > Eastern Sudanic > Nilotic',
      speakers: 'Approximately 1.5 million speakers',
      overview: `Maa is the language of the Maasai people, spoken across Kenya and Tanzania. It belongs to the Nilotic branch of the Nilo-Saharan language family a group of languages stretching from Uganda to Sudan. Maa is a tonal language, meaning the pitch of a syllable can change a word's meaning entirely. It has a rich grammatical structure with noun classes, verb extensions, and complex tense systems. While Maa has no traditional writing system, it has been documented using the Latin alphabet by missionaries and linguists since the 19th century.`,
      phrases: [
        { phrase: 'Sopa', meaning: 'Hello (to one person)' },
        { phrase: 'Sopat', meaning: 'Hello (to a group)' },
        { phrase: 'Ero supa', meaning: 'I am well' },
        { phrase: 'Ashe', meaning: 'Thank you' },
        { phrase: 'Enkai aiyiook', meaning: 'God bless you' },
        { phrase: 'Keserian ingishu', meaning: 'How are your cattle?' },
      ],
    },
  },

  luo: {
  name: 'Luo',
  region: 'East Africa',
  location: 'Kenya, Tanzania, Uganda',
  population: '6 million+',
  heroImage: '/images/maasai-women-latest.jpg',
  tagline: 'A proud Nilotic people known for rich musical traditions, fishing heritage, and vibrant storytelling.',
  marketOverview: `Luo artisans are known for pottery, musical instruments, woven baskets, and beadwork. Many crafts are inspired by Lake Victoria and daily life as fishing communities. Handmade drums, jewellery, and carved wooden items remain culturally significant and widely traded.`,

  history: {
    overview: `The Luo are a Nilotic people who migrated from the Nile Valley region into East Africa several centuries ago. They eventually settled around Lake Victoria, where fishing, trade, and agriculture became central to their way of life. The Luo have played major roles in East African politics, education, and arts.`,

    timeline: [
      { year: '14–1500s', event: 'Luo migrations begin from the Nile Valley into East Africa.' },
      { year: '1700s', event: 'Luo communities settle around the Lake Victoria basin.' },
      { year: '1800s', event: 'Fishing and trade flourish along Lake Victoria.' },
      { year: '1900s', event: 'Missionary education spreads rapidly among Luo communities.' },
      { year: '1963', event: 'Kenya gains independence; Luo leaders play major roles in politics.' },
      { year: 'Present', event: 'Luo culture remains influential in music, politics, and academia.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Luo society places strong emphasis on respect for elders and ancestors. It is taboo to disrespect elders or refuse hospitality. Certain rituals must be observed after death before normal life resumes. Widow inheritance and mourning customs have historically been deeply respected traditions.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Luo mythology speaks of migration guided by ancestral spirits. Lake Victoria is central to many stories, believed to be protected by spiritual forces. Ancestors are thought to communicate with the living through dreams and signs.`
    },

    food: {
      title: 'Food',
      content: `Fish is the cornerstone of Luo cuisine due to proximity to Lake Victoria. Tilapia and Nile perch are commonly eaten. Ugali (maize meal) served with fish stew and sukuma wiki (greens) is a staple meal. Millet porridge is also widely consumed.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Luo homesteads are arranged in circular layouts symbolising family unity. Houses were built using mud walls, wooden poles, and thatched roofs. The cattle enclosure occupies an important position within the homestead.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Traditionally, Luo clothing included animal skins and later cotton garments. Bead necklaces, bracelets, and head ornaments are worn during ceremonies. Red, black, and white colours often symbolise identity and strength.`
    },

    religion: {
      title: 'Religion',
      content: `Traditional Luo religion centres on a supreme creator called Nyasaye. Ancestor veneration plays a major role in spiritual life. Today, Christianity is widespread, but many traditional beliefs remain influential.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Birth, marriage, and death are marked by elaborate ceremonies. Marriage traditionally involves bride price negotiations and community celebrations. Funeral ceremonies are especially important and can last several days as families honour the deceased.`
    },
  },

  language: {
    name: 'Dholuo',
    family: 'Nilo-Saharan > Nilotic',
    speakers: 'Approximately 5–6 million speakers',
    overview: `Dholuo is the language of the Luo people and belongs to the Nilotic branch of the Nilo-Saharan language family. It is widely spoken in western Kenya and parts of Tanzania and Uganda.`,
    phrases: [
      { phrase: 'Amosi', meaning: 'Hello' },
      { phrase: 'Idhi nade?', meaning: 'How are you?' },
      { phrase: 'Aheri', meaning: 'Thank you' },
      { phrase: 'Ber', meaning: 'Good / Fine' },
      { phrase: 'Wuonwa', meaning: 'My father' },
      { phrase: 'Nyasaye ogwedhi', meaning: 'God bless you' },
    ],
  },
},


swahili: {
  name: 'Swahili',
  region: 'East Africa',
  location: 'Kenya, Tanzania, Mozambique, Somalia',
  population: '16 million+',
  heroImage: '/images/maasai-women-latest.jpg',
  tagline: 'Coastal traders and cultural bridge between Africa, Arabia, and Asia.',
  marketOverview: `Swahili artisans are famous for intricate wood carving, jewellery, woven mats, and decorative household items. Coastal towns such as Lamu and Zanzibar have long been centres of craftsmanship influenced by African, Arab, Persian, and Indian cultures.`,

  history: {
    overview: `The Swahili people emerged along the East African coast through centuries of interaction between African communities and traders from Arabia, Persia, and India. From the 10th century onward, Swahili city-states became powerful trade hubs linking Africa to the wider Indian Ocean world.`,

    timeline: [
      { year: '800–1000', event: 'Early Swahili settlements develop along the East African coast.' },
      { year: '1000–1500', event: 'Rise of Swahili city-states such as Lamu, Mombasa, and Zanzibar.' },
      { year: '1498', event: 'Portuguese arrival disrupts Indian Ocean trade networks.' },
      { year: '1700s', event: 'Omani Arabs take control of the coast and expand trade.' },
      { year: '1800s', event: 'Zanzibar becomes a major trade centre in East Africa.' },
      { year: 'Present', event: 'Swahili culture spreads globally through language, trade, and tourism.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Swahili culture emphasises modesty, respect, and hospitality. Public displays of affection are discouraged. Guests must be welcomed warmly and offered food or tea as a sign of respect.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Swahili folklore includes stories of sea spirits, ancient sailors, and magical islands. Tales passed through poetry and oral storytelling remain central to coastal identity.`
    },

    food: {
      title: 'Food',
      content: `Swahili cuisine blends African, Arab, and Indian flavours. Coconut rice, biryani, pilau, samosas, and seafood dishes are staples. Spices such as cloves, cardamom, and cinnamon are widely used.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Swahili homes are made from coral stone with carved wooden doors and inner courtyards designed to keep homes cool in the coastal climate.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Swahili clothing reflects modesty and elegance. Women wear colourful kangas and buibui garments, while men often wear kanzu robes and kofia caps.`
    },

    religion: {
      title: 'Religion',
      content: `Islam plays a central role in Swahili life, influencing architecture, daily routines, festivals, and social customs along the coast.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Marriage ceremonies are elaborate and involve music, henna decoration, and community celebrations. Religious festivals such as Eid are major cultural events.`
    },
  },

  language: {
    name: 'Kiswahili',
    family: 'Niger-Congo > Bantu',
    speakers: '100+ million speakers',
    overview: `Kiswahili is one of Africa’s most widely spoken languages and serves as a lingua franca across East and Central Africa.`,
    phrases: [
      { phrase: 'Jambo', meaning: 'Hello' },
      { phrase: 'Habari?', meaning: 'How are you?' },
      { phrase: 'Asante', meaning: 'Thank you' },
      { phrase: 'Karibu', meaning: 'Welcome' },
      { phrase: 'Tutaonana', meaning: 'See you later' },
      { phrase: 'Mungu akubariki', meaning: 'God bless you' },
    ],
  },
},


igbo: {
  name: 'Igbo',
  region: 'West Africa',
  location: 'Nigeria (Southeast), Equatorial Guinea',
  population: '45 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'One of Africa’s most dynamic cultures, known for enterprise, art, and deep spiritual traditions.',

  marketOverview: `Igbo artisans are highly skilled in wood carving, bronze work, weaving, pottery, and bead-making. Markets (ahia) are central to Igbo life and commerce, often operated on a rotational system across communities.`,

  history: {
    overview: `The Igbo people are one of the largest ethnic groups in Africa, primarily located in southeastern Nigeria. They have a long history of independent city-states, trade networks, and strong cultural identity. The Igbo played a major role in pre-colonial trade and in the resistance and transformation during colonial and post-colonial Nigeria.`,

    timeline: [
      { year: 'Pre-1500', event: 'Early Igbo communities develop independent village systems and farming societies.' },
      { year: '1600s–1800s', event: 'Expansion of trade networks across West Africa, including palm oil trade.' },
      { year: '1900s', event: 'British colonial rule imposed across Igbo territories.' },
      { year: '1967–1970', event: 'Nigerian Civil War (Biafra War) heavily impacts Igbo region.' },
      { year: '1970–Present', event: 'Reconstruction and rapid growth in business, education, and global diaspora influence.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Igbo culture places strong importance on respect for elders and ancestors. It is taboo to disrespect elders or break sacred oaths. Certain animals and actions may be restricted depending on local customs and deities (chi and alusi traditions).`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Igbo mythology includes belief in Chukwu (the supreme God) and smaller spiritual beings known as alusi. The concept of chi (personal spirit) is central, believed to guide each individual's destiny.`
    },

    food: {
      title: 'Food',
      content: `Igbo cuisine includes dishes like fufu, egusi soup, oha soup, ofe onugbu (bitterleaf soup), and yam-based meals. Yam is especially important and celebrated as a symbol of wealth and harvest.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Igbo homes were built in compounds with multiple huts for extended families. Houses were made using mud, bamboo, and thatch, arranged around open courtyards for communal living.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Traditional Igbo clothing includes the isiagu (lion head patterned shirt for men), wrappers for women, and coral beads symbolizing status and heritage. Clothing is often worn during festivals and ceremonies.`
    },

    religion: {
      title: 'Religion',
      content: `Traditional Igbo religion centres on Chukwu, ancestral worship, and lesser deities (alusi). Many Igbo people today are Christian, but traditional beliefs still influence cultural practices.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Igbo rites include naming ceremonies on the 8th day after birth, elaborate marriage introductions (Igba Nkwu), and funeral celebrations that honour the dead with music, dance, and communal gatherings.`
    },
  },

  language: {
    name: 'Igbo',
    family: 'Niger-Congo > Volta-Niger',
    speakers: '40–45 million speakers',
    overview: `Igbo is a major language of Nigeria with many dialects but a standardized form used in education and media. It is tonal and rich in proverbs and oral storytelling traditions.`,
    phrases: [
      { phrase: 'Kedu?', meaning: 'How are you?' },
      { phrase: 'Ụtụtụ ọma', meaning: 'Good morning' },
      { phrase: 'Daalụ', meaning: 'Thank you' },
      { phrase: 'Nnọọ', meaning: 'Welcome' },
      { phrase: 'Ka ọ dị', meaning: 'Goodbye / stay well' },
      { phrase: 'Chukwu gozie gị', meaning: 'God bless you' },
    ],
  },
},


ashanti: {
  name: 'Ashanti (Asante)',
  region: 'West Africa',
  location: 'Ghana',
  population: '12 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'A powerful West African kingdom known for gold, royal traditions, and rich cultural heritage.',

  marketOverview: `Ashanti artisans are world-renowned for gold craftsmanship, kente cloth weaving, wood carving, and pottery. The Ashanti Empire was historically known as the "Gold Coast" due to its rich gold resources, which remain central to its cultural identity.`,

  history: {
    overview: `The Ashanti people are part of the Akan ethnic group in Ghana. They built one of the most powerful empires in West Africa, the Ashanti Empire, which became famous for its wealth, military strength, and sophisticated political system led by the Asantehene (king).`,

    timeline: [
      { year: '1600s', event: 'Formation of the Ashanti Empire under Osei Tutu.' },
      { year: '1700s', event: 'Expansion of the Ashanti Empire across modern-day Ghana.' },
      { year: '1800s', event: 'Conflicts with British colonial forces in the Anglo-Ashanti wars.' },
      { year: '1896', event: 'British exile the Asantehene and take control of the empire.' },
      { year: '1900', event: 'Yaa Asantewaa War — major resistance against British colonial rule.' },
      { year: '1957', event: 'Ghana gains independence; Ashanti culture remains central to national identity.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Ashanti culture places strong emphasis on respect for the Golden Stool, which symbolizes the soul of the nation. It is taboo to sit on or disrespect it. Disrespecting elders or ancestors is also considered a serious offence.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Ashanti mythology centres around Nyame (supreme God) and ancestral spirits. The Golden Stool (Sika Dwa Kofi) is believed to have descended from the heavens and contains the spirit of the Ashanti nation.`
    },

    food: {
      title: 'Food',
      content: `Ashanti cuisine includes fufu (cassava and plantain dough), light soup, banku, and rich stews made with fish, meat, and vegetables. Palm nut soup is a traditional delicacy.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Ashanti homes are built using mud, wood, and clay arranged around courtyards. The King’s palace in Kumasi is a symbol of Ashanti architectural and cultural heritage.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `The Ashanti are famous for kente cloth, a vibrant handwoven fabric with symbolic patterns and meanings. Gold jewellery is also worn to represent wealth, royalty, and status.`
    },

    religion: {
      title: 'Religion',
      content: `Traditional Ashanti religion involves worship of Nyame (God), reverence for ancestors, and spiritual forces known as abosom. Many Ashanti today are Christian, but traditional beliefs remain influential.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Naming ceremonies (outdooring), puberty rites, marriage celebrations, and elaborate funerals are important life events. Funerals are especially significant and involve large community gatherings.`
    },
  },

  language: {
    name: 'Twi (Asante Twi)',
    family: 'Niger-Congo > Kwa > Akan',
    speakers: '10–12 million speakers',
    overview: `Asante Twi is the main language of the Ashanti people and one of the most widely spoken languages in Ghana. It is part of the Akan language group and is used in daily communication, media, and education.`,
    phrases: [
      { phrase: 'Maakye', meaning: 'Good morning' },
      { phrase: 'Maaha', meaning: 'Good afternoon' },
      { phrase: 'Maadwo', meaning: 'Good evening' },
      { phrase: 'Medɔ wo', meaning: 'I love you' },
      { phrase: 'Medase', meaning: 'Thank you' },
      { phrase: 'Wo ho te sɛn?', meaning: 'How are you?' },
    ],
  },
},


hausa: {
  name: 'Hausa',
  region: 'West Africa',
  location: 'Nigeria, Niger, Ghana, Chad',
  population: '80 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'One of Africa’s largest ethnic groups, known for trade, scholarship, and Islamic heritage.',

  marketOverview: `Hausa artisans are widely known for leatherwork, weaving, metalwork, pottery, and embroidery. Traditional markets (kasuwanci) are central to Hausa life, especially in cities like Kano and Katsina, which have been major trading hubs for centuries.`,

  history: {
    overview: `The Hausa people are one of the largest ethnic groups in Africa, primarily located in northern Nigeria and southern Niger. They developed powerful city-states known as the Hausa Bakwai, which became important centres of trade, Islamic learning, and governance in West Africa.`,

    timeline: [
      { year: '1000s', event: 'Formation of early Hausa city-states such as Kano, Katsina, and Zaria.' },
      { year: '1400s', event: 'Spread of Islam through trans-Saharan trade routes.' },
      { year: '1804', event: 'Fulani Jihad leads to incorporation of Hausa states into the Sokoto Caliphate.' },
      { year: '1800s', event: 'Kano becomes a major centre of trade and Islamic scholarship.' },
      { year: '1903', event: 'British colonial rule established in northern Nigeria.' },
      { year: '1960', event: 'Nigeria gains independence; Hausa remain influential in politics and culture.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Hausa culture places strong emphasis on respect, modesty, and Islamic values. It is taboo to disrespect elders, ignore hospitality customs, or violate religious practices. Modesty in dress and behaviour is highly important.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Hausa folklore includes stories of spirits (iskoki), heroic warriors, and moral tales passed through oral tradition. Many legends are influenced by both indigenous beliefs and Islamic teachings.`
    },

    food: {
      title: 'Food',
      content: `Hausa cuisine includes tuwo (a thick grain-based dish), miyan kuka (baobab leaf soup), suya (spiced grilled meat), and rice dishes. Street food culture is very strong in Hausa regions.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Hausa homes are built from mud bricks with decorative patterns carved into walls. Houses are often arranged in compounds with inner courtyards for family life and privacy.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Hausa clothing is elegant and modest. Men wear babban riga (flowing robes) and caps, while women wear colorful wrappers and hijabs. Embroidery is a major artistic feature of Hausa fashion.`
    },

    religion: {
      title: 'Religion',
      content: `The Hausa people are predominantly Muslim. Islam strongly influences daily life, education, law, and cultural practices. Traditional beliefs also exist in some rural areas alongside Islam.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Hausa life events include naming ceremonies (suna), marriage celebrations (fatihah), and elaborate funerals. Islamic traditions play a central role in all rites of passage.`
    },
  },

  language: {
    name: 'Hausa',
    family: 'Afro-Asiatic > Chadic',
    speakers: '90+ million speakers',
    overview: `Hausa is one of the most widely spoken languages in Africa and serves as a lingua franca across West Africa. It is written in both Latin script (Boko) and Arabic script (Ajami).`,
    phrases: [
      { phrase: 'Sannu', meaning: 'Hello' },
      { phrase: 'Yaya kake?', meaning: 'How are you? (to male)' },
      { phrase: 'Yaya kike?', meaning: 'How are you? (to female)' },
      { phrase: 'Na gode', meaning: 'Thank you' },
      { phrase: 'Barka da zuwa', meaning: 'Welcome' },
      { phrase: 'Sai anjima', meaning: 'See you later' },
    ],
  },
},


amhara: {
  name: 'Amhara',
  region: 'East Africa',
  location: 'Ethiopia',
  population: '35 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'One of Ethiopia’s oldest ethnic groups, known for deep Christian heritage, highland culture, and ancient history.',

  marketOverview: `Amhara artisans are known for traditional weaving (shemma), metalwork, pottery, and religious icon painting. Local markets in cities like Gondar and Bahir Dar are vibrant centres of trade and craftsmanship.`,

  history: {
    overview: `The Amhara people are one of Ethiopia’s major ethnic groups with deep historical ties to the Ethiopian Empire. They played a central role in the development of Ethiopia’s monarchy, Orthodox Christianity, and written language tradition.`,

    timeline: [
      { year: '4th Century', event: 'Introduction of Christianity in the Aksumite Empire influences Amhara culture.' },
      { year: '900s–1200s', event: 'Rise of medieval Christian kingdoms in the Ethiopian highlands.' },
      { year: '1270', event: 'Establishment of the Solomonic Dynasty, shaping Ethiopian imperial rule.' },
      { year: '1800s', event: 'Regional kingdoms unify under Ethiopian Empire leadership.' },
      { year: '1935–1941', event: 'Italian invasion of Ethiopia resisted by Ethiopian forces.' },
      { year: '1974–Present', event: 'Monarchy ends; Ethiopia becomes a federal republic with continued cultural influence of Amhara people.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Respect for elders and religious traditions is very important. Disrespecting the church or clergy is considered highly offensive. Certain fasting rules during religious periods must be strictly observed.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Amhara folklore is deeply influenced by Ethiopian Orthodox Christianity, including stories of saints, angels, and King Solomon’s lineage through Ethiopia’s emperors.`
    },

    food: {
      title: 'Food',
      content: `Injera (fermented flatbread) is the staple food, eaten with stews like doro wat (spicy chicken stew), lentils, and vegetables. Coffee ceremonies are central to daily life.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Amhara homes in rural areas are circular huts made of stone, mud, and thatch roofs. In cities, architecture reflects Ethiopian Orthodox and modern influences.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Traditional clothing includes white cotton garments called shemma. During ceremonies, people wear embroidered shawls and crosses symbolising Christian faith.`
    },

    religion: {
      title: 'Religion',
      content: `The majority of Amhara people follow Ethiopian Orthodox Christianity, one of the oldest Christian traditions in the world. Religious festivals and fasting periods are central to life.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Baptism, church weddings, and religious naming ceremonies are important life events. Funerals are deeply spiritual and involve prayers and community gatherings.`
    },
  },

  language: {
    name: 'Amharic',
    family: 'Afro-Asiatic > Semitic',
    speakers: '30+ million speakers',
    overview: `Amharic is the official working language of Ethiopia and uses the Geʽez script. It is widely used in government, education, and media.`,
    phrases: [
      { phrase: 'Selam', meaning: 'Hello' },
      { phrase: 'Dehna neh?', meaning: 'How are you? (male)' },
      { phrase: 'Dehna nesh?', meaning: 'How are you? (female)' },
      { phrase: 'Ameseginalehu', meaning: 'Thank you' },
      { phrase: 'Betam konjo', meaning: 'Very beautiful' },
      { phrase: 'Chao', meaning: 'Goodbye' },
    ],
  },
},


berber: {
  name: 'Berber (Amazigh)',
  region: 'North Africa',
  location: 'Morocco, Algeria, Tunisia, Libya',
  population: '40 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'Indigenous people of North Africa with ancient traditions, language, and desert heritage.',

  marketOverview: `Amazigh artisans are famous for carpets, silver jewellery, leatherwork, pottery, and intricate geometric designs. Rural markets across the Atlas Mountains and Sahara regions are key cultural and economic hubs.`,

  history: {
    overview: `The Amazigh (Berber) people are indigenous to North Africa, with a history dating back thousands of years before Arab expansion. They have maintained distinct languages, culture, and identity despite historical influences from Phoenician, Roman, Arab, and French civilizations.`,

    timeline: [
      { year: 'Pre-1000 BC', event: 'Early Amazigh civilizations develop across North Africa.' },
      { year: '1000 BC–400 AD', event: 'Phoenician and Roman influence spreads across Berber regions.' },
      { year: '600s AD', event: 'Arab expansion introduces Islam and Arabic influence.' },
      { year: '1000–1500', event: 'Amazigh dynasties like Almoravids and Almohads rise to power.' },
      { year: '1800s–1900s', event: 'Colonial rule under France and Spain impacts Amazigh identity.' },
      { year: 'Present', event: 'Cultural revival of Amazigh language and identity across North Africa.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Respect for elders and community traditions is essential. Certain mountain and desert areas are considered sacred. Violating hospitality customs is strongly discouraged.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Amazigh mythology includes stories of mountain spirits, desert guardians, and ancient heroic ancestors. Oral storytelling is a key tradition preserving history and identity.`
    },

    food: {
      title: 'Food',
      content: `Couscous is the most famous Amazigh dish, often served with vegetables, meat, and spices. Tagine, flatbreads, and mint tea are also central to daily life.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Amazigh homes vary from stone houses in the Atlas Mountains to tent dwellings (Amazigh nomads) in the Sahara desert.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Amazigh clothing includes woven robes, colourful fabrics, and silver jewellery with symbolic geometric patterns representing identity and protection.`
    },

    religion: {
      title: 'Religion',
      content: `Most Amazigh people are Muslim today, but pre-Islamic beliefs still influence cultural traditions and seasonal rituals.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Birth, marriage, and harvest celebrations are marked with music, dance, and communal feasting. Weddings are especially large and symbolic events.`
    },
  },

  language: {
    name: 'Tamazight',
    family: 'Afro-Asiatic > Berber',
    speakers: '25–30 million speakers',
    overview: `Tamazight is a group of related Berber languages spoken across North Africa. It was officially recognised in Morocco and Algeria and uses the Tifinagh script.`,
    phrases: [
      { phrase: 'Azul', meaning: 'Hello' },
      { phrase: 'Manik-t?', meaning: 'How are you?' },
      { phrase: 'Tanemmirt', meaning: 'Thank you' },
      { phrase: 'Ar tufat', meaning: 'Goodbye' },
      { phrase: 'Amek?', meaning: 'How?' },
      { phrase: 'Ihed?', meaning: 'Yes' },
    ],
  },
},

fulani: {
  name: 'Fulani (Fulɓe)',
  region: 'West Africa',
  location: 'Nigeria, Niger, Senegal, Mali, Guinea, Cameroon',
  population: '40 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'One of Africa’s largest nomadic peoples, known for cattle herding, migration, and rich pastoral traditions.',

  marketOverview: `Fulani communities are widely known for cattle herding and dairy production. Traditional products include milk, butter, woven mats, leather goods, and handcrafted jewellery. Their markets often revolve around livestock trade and pastoral goods.`,

  history: {
    overview: `The Fulani are a widely dispersed ethnic group across West and Central Africa. Historically, many Fulani were nomadic pastoralists who migrated in search of grazing land. They also played a major role in Islamic expansion in West Africa through religious reform movements.`,

    timeline: [
      { year: '1000–1300', event: 'Early Fulani migrations across West Africa begin.' },
      { year: '1500s', event: 'Fulani communities spread across Sahel regions as pastoral herders.' },
      { year: '1804', event: 'Usman dan Fodio leads Fulani Jihad, establishing the Sokoto Caliphate.' },
      { year: '1800s', event: 'Fulani influence expands across northern Nigeria and surrounding regions.' },
      { year: '1900s', event: 'Colonial rule restructures Fulani political and pastoral systems.' },
      { year: 'Present', event: 'Fulani remain one of the largest pastoral communities in Africa, balancing tradition and modern life.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Respect for elders and cattle is extremely important in Fulani culture. It is taboo to mistreat animals, especially cows, which are considered sacred sources of life and wealth.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Fulani oral traditions include stories of migration guided by divine will and cattle as gifts from God. Many legends emphasise purity, discipline, and pastoral wisdom.`
    },

    food: {
      title: 'Food',
      content: `The Fulani diet is heavily based on milk, yogurt, butter, and meat from cattle. Millet porridge and rice dishes are also common, especially in settled communities.`
    },

    housing: {
      title: 'Housing',
      content: `Traditionally nomadic Fulani live in temporary huts made from grass and wood that can be easily assembled and dismantled during migration.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Fulani clothing is elegant and colourful. Women are known for intricate hairstyles decorated with beads and silver, while men wear flowing robes and caps suited for the Sahel climate.`
    },

    religion: {
      title: 'Religion',
      content: `Most Fulani are Muslim, and Islam plays a central role in their identity, education, and daily practices. Religious scholarship has historically been important in Fulani society.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Naming ceremonies, marriage traditions, and religious education milestones are important. Weddings often involve extended family negotiations and community celebrations.`
    },
  },

  language: {
    name: 'Fula (Fulfulde)',
    family: 'Niger-Congo > Atlantic',
    speakers: '30–40 million speakers',
    overview: `Fula (Fulfulde) is a widely spoken language across West and Central Africa, with many regional dialects. It is used both by nomadic and settled Fulani communities.`,
    phrases: [
      { phrase: 'Jam tan', meaning: 'Hello / Peace be with you' },
      { phrase: 'A jaaraama', meaning: 'Thank you' },
      { phrase: 'No ndiyam?', meaning: 'How are you?' },
      { phrase: 'Mi yidi maa', meaning: 'I love you' },
      { phrase: 'Woni jam', meaning: 'Goodbye / Stay in peace' },
      { phrase: 'On jaraama', meaning: 'Thank you all' },
    ],
  },
},


wolof: {
  name: 'Wolof',
  region: 'West Africa',
  location: 'Senegal, Gambia, Mauritania',
  population: '10 million+',
  heroImage: '/images/African-latest.jpg',
  tagline: 'A vibrant West African people known for rich oral tradition, music, and cultural influence across Senegal and beyond.',

  marketOverview: `Wolof artisans are known for textiles, leatherwork, bead jewellery, basket weaving, and vibrant fabric design. Markets in Dakar and other cities are lively centres of trade where fashion, crafts, and food are widely exchanged.`,

  history: {
    overview: `The Wolof people are one of the largest ethnic groups in Senegal and played a central role in the formation of the Jolof Empire. Over centuries, they became highly influential in trade, politics, and culture in West Africa, especially in Senegal and Gambia.`,

    timeline: [
      { year: '1200s–1300s', event: 'Formation of the Jolof Empire in present-day Senegal.' },
      { year: '1400s', event: 'Wolof kingdoms expand influence across coastal West Africa.' },
      { year: '1500s–1600s', event: 'Portuguese and European traders arrive along the Senegalese coast.' },
      { year: '1800s', event: 'French colonial expansion incorporates Wolof territories into French West Africa.' },
      { year: '1960', event: 'Senegal gains independence; Wolof becomes the dominant national language.' },
      { year: 'Present', event: 'Wolof culture continues to shape Senegalese music, fashion, and politics.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Wolof culture values respect, hospitality, and social harmony. It is taboo to disrespect elders or refuse hospitality. Public disrespect or breaking community trust is strongly frowned upon.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `Wolof oral tradition includes stories of ancestral kings, spirit beings, and moral tales passed through griots (oral historians). These stories preserve history and cultural identity.`
    },

    food: {
      title: 'Food',
      content: `Wolof cuisine includes thieboudienne (rice and fish), yassa (marinated chicken or fish with onions and lemon), and millet-based dishes. Meals are often shared communally.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Wolof homes vary from rural mud-brick houses to modern urban housing. In rural areas, homes are arranged in family compounds reflecting communal living.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Wolof clothing is colorful and elegant. Traditional boubou robes are worn by both men and women, often decorated with embroidery for special occasions.`
    },

    religion: {
      title: 'Religion',
      content: `Most Wolof people are Muslim, and Islam strongly influences daily life, festivals, and social customs. Sufi brotherhoods play an important cultural role in Senegal.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Naming ceremonies, weddings, and religious festivals are major life events. Weddings are especially festive, involving music, dance, and community gatherings.`
    },
  },

  language: {
    name: 'Wolof',
    family: 'Niger-Congo > Atlantic',
    speakers: '10–15 million speakers',
    overview: `Wolof is the most widely spoken language in Senegal and serves as a lingua franca across the country. It is used in daily communication, media, and music.`,
    phrases: [
      { phrase: 'Nanga def?', meaning: 'How are you?' },
      { phrase: 'Mangi fi rek', meaning: 'I am fine' },
      { phrase: 'Jërëjëf', meaning: 'Thank you' },
      { phrase: 'Dalal ak jamm', meaning: 'Welcome' },
      { phrase: 'Ba beneen yoon', meaning: 'See you next time' },
      { phrase: 'Naka nga def?', meaning: 'How are you doing?' },
    ],
  },
},


  kikuyu: {
  name: 'Kikuyu',
  region: 'East Africa',
  location: 'Kenya',
  population: '8 million+',
  heroImage: '/images/maasai-women-latest.jpg',
  tagline: 'Kenya’s largest ethnic group, deeply rooted in agriculture, land, and ancestral traditions.',
  marketOverview: `Kikuyu artisans are known for wood carving, basket weaving, pottery, and beadwork. Their crafts reflect a strong connection to land, farming, and family life. Handmade baskets (ciondo), stools, and gourds are widely used in daily life and ceremonies and are now popular across global markets.`,

  history: {
    overview: `The Kikuyu are the largest ethnic group in Kenya and have historically lived around the fertile highlands surrounding Mount Kenya. Their history is deeply connected to land ownership, agriculture, and resistance against colonial rule. During the 1950s, the Kikuyu played a central role in the Mau Mau uprising, a major resistance movement that contributed to Kenya’s independence.`,

    timeline: [
      { year: 'Pre-1700s', event: 'Kikuyu communities settle around Mount Kenya and develop farming-based societies.' },
      { year: '1800s', event: 'Trade and interaction increase between Kikuyu and neighbouring communities.' },
      { year: '1890s', event: 'British colonial rule begins; large portions of Kikuyu land are seized by settlers.' },
      { year: '1952–1960', event: 'The Mau Mau Uprising led largely by Kikuyu fighters resists colonial rule.' },
      { year: '1963', event: 'Kenya gains independence; Kikuyu leaders play major roles in the new government.' },
      { year: 'Present', event: 'Kikuyu culture remains influential in Kenya’s politics, economy, and arts.' },
    ],
  },

  culture: {
    taboos: {
      title: 'Taboos',
      content: `Kikuyu traditions strongly emphasise respect for elders and the sacredness of land. It is taboo to disrespect elders or speak rudely to parents. Whistling at night is believed to attract evil spirits. A married woman should avoid direct confrontation with her in-laws as a sign of respect. Land is considered sacred and should never be mistreated or sold carelessly.`
    },

    myths: {
      title: 'Myths & Legends',
      content: `According to Kikuyu mythology, the first man Gikuyu and his wife Mumbi were created by the creator Ngai and placed near Mount Kenya. Ngai gave them nine daughters who became the founders of the nine Kikuyu clans. Mount Kenya is considered the dwelling place of Ngai, and many traditional prayers are performed facing the mountain.`
    },

    food: {
      title: 'Food',
      content: `Kikuyu cuisine is based on farming produce. Githeri (boiled maize and beans) is a staple meal eaten daily. Mukimo mashed potatoes mixed with greens, maize, and beans is a famous traditional dish. Irio (mashed peas, potatoes, and corn) is served during celebrations. Fermented porridge and roasted goat meat are common at ceremonies.`
    },

    housing: {
      title: 'Housing',
      content: `Traditional Kikuyu homes were built in family homesteads surrounded by farmland. Houses were made from mud walls, wooden frames, and grass-thatched roofs. The homestead symbolised unity, with each wife in a polygamous family having her own hut arranged around the main house.`
    },

    clothing: {
      title: 'Clothing & Adornment',
      content: `Traditionally, Kikuyu people wore leather garments made from animal skins. Today, colourful beadwork and headpieces are worn during ceremonies. During weddings and initiation rites, special garments decorated with beads and metal ornaments symbolise identity and pride.`
    },

    religion: {
      title: 'Religion',
      content: `Traditional Kikuyu religion centres around Ngai, the supreme creator who lives on Mount Kenya. Ancestors are highly respected and believed to guide the living. Offerings and prayers were traditionally performed under sacred fig trees (mugumo trees), believed to be holy sites.`
    },

    rites: {
      title: 'Rites of Passage',
      content: `Initiation ceremonies are central to Kikuyu life. Circumcision marks the transition from childhood to adulthood for both boys and girls historically. Weddings involve dowry negotiations and community celebrations. Elders play a major role in guiding young people into adulthood and marriage.`
    },
  },

  language: {
    name: 'Gikuyu',
    family: 'Niger-Congo > Bantu',
    speakers: 'Approximately 8 million speakers',
    overview: `Gikuyu (Kikuyu language) is one of the most widely spoken languages in Kenya. It belongs to the Bantu language family and is closely related to Embu and Meru languages. The language carries deep cultural meaning and is widely used in storytelling, songs, and proverbs.`,
    phrases: [
      { phrase: 'Wî mwega?', meaning: 'How are you?' },
      { phrase: 'Nĩ ndî mwega', meaning: 'I am fine' },
      { phrase: 'Mũno', meaning: 'Thank you very much' },
      { phrase: 'Wîhĩtũ', meaning: 'Welcome' },
      { phrase: 'Tũonane', meaning: 'See you later' },
      { phrase: 'Ngai akũhe wega', meaning: 'God bless you' },
    ],
  },
},

  zulu: {
    name: 'Zulu',
    region: 'Southern Africa',
    location: 'South Africa',
    population: '10 million+',
    heroImage: '/images/maasai-women-latest.jpg',
    tagline: 'The largest ethnic group in South Africa, proud heirs of a warrior kingdom.',
    marketOverview: `Zulu craftspeople are renowned across southern Africa for the quality and cultural depth of their work. From intricately beaded items to hand-carved wooden objects and woven baskets, Zulu craft traditions have been passed down through generations of skilled artisans.`,
    history: {
      overview: `The Zulu people are the largest ethnic group in South Africa, with a history shaped by one of the most remarkable military expansions in African history. Under the leadership of Shaka Zulu in the early 19th century, a small clan was transformed into a formidable kingdom that reshaped the entire southern African region.`,
      timeline: [
        { year: '1709', event: 'The Zulu clan is founded by Zulu kaNtombhela in what is now KwaZulu-Natal.' },
        { year: '1816', event: 'Shaka Zulu seizes power and begins a revolutionary military transformation of the Zulu nation.' },
        { year: '1820s', event: 'The Mfecane a period of widespread warfare and migration triggered by Zulu expansion across southern Africa.' },
        { year: '1879', event: 'Anglo-Zulu War: the Zulu army defeats the British at the Battle of Isandlwana.' },
        { year: '1906', event: 'The Bambatha Rebellion the last armed Zulu uprising against colonial taxation and land seizure.' },
        { year: '1994', event: 'South Africa becomes a democracy; Zulu cultural heritage is recognised and protected under the new constitution.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `Zulu society is governed by a deep code of respect and spiritual awareness that shapes everyday behaviour. A daughter-in-law (makoti) must never speak the names of her father-in-law or his male relatives a practice called ukuhlonipha, meaning deep respect. It is forbidden to whistle at night, as it is believed to attract evil spirits and bad luck to the home. Pointing at a grave with your finger is considered an invitation for death to follow you. A pregnant woman must not attend a funeral, as it is believed the spirit of the deceased can enter the unborn child.` },
      myths: { title: 'Myths & Legends', content: `Zulu mythology is rich with stories of creation, ancestral spirits, and supernatural beings. The supreme creator is Unkulunkulu the Ancient One who emerged from a bed of reeds (uhlanga) and created all people, animals, and the natural world. The Tokoloshe is a feared mythological creature a small, mischievous water sprite sent by witches to cause illness, nightmares, and death. Many Zulu people sleep with their beds raised on bricks to keep the Tokoloshe from reaching them.` },
      food: { title: 'Food', content: `Traditional Zulu cuisine is hearty and deeply connected to the land. Uphuthu a crumbly maize meal is the staple food, eaten daily and served with amasi (fermented milk), beans, or meat stew. Umngqusho is a beloved dish of samp (crushed dried corn) and beans, slow-cooked until soft and rich. Umqombothi is the traditional Zulu beer, brewed from maize and sorghum it plays a central role in ceremonies, coming-of-age celebrations, and community gatherings.` },
      housing: { title: 'Housing', content: `The traditional Zulu homestead is called an umuzi a carefully arranged circular settlement that reflects the social structure of the family. The main house faces the cattle kraal (isibaya), which occupies the centre of the homestead. Traditional Zulu homes are beehive-shaped (iQhugwane), constructed from a dome of woven saplings covered in tightly packed grass thatch. The entrance is low, requiring visitors to bow a mark of respect upon entering.` },
      clothing: { title: 'Clothing & Adornment', content: `Zulu beadwork is one of the most sophisticated visual communication systems in the world. Beaded items necklaces, armbands, aprons, and headbands carry encoded messages about the wearer's age, marital status, and social standing. Colours have precise meanings: red represents love and strong emotion; black represents marriage and regeneration; white represents purity and spiritual connection. The isicholo a large, flat disc-shaped hat made of woven grass is worn by married women as a sign of their status.` },
      religion: { title: 'Religion', content: `Zulu spiritual life centres on the veneration of ancestral spirits, known as amadlozi or izithunywa. These spirits are believed to be the active guardians of the living they communicate through dreams, illness, and unusual events, guiding families and warning of danger. When misfortune strikes, a diviner (sangoma) is consulted to identify which ancestor is calling and what offering or ritual is required.` },
      rites: { title: 'Rites of Passage', content: `Zulu rites of passage mark every major transition of life with ceremony and community celebration. At birth, the umbilical cord is buried under the threshold of the home, binding the child to the family homestead forever. The umemulo ceremony celebrates a young woman's coming of age. Male initiation (ukusoka) involves circumcision and a period of seclusion in which boys learn the responsibilities of manhood under the guidance of elders.` },
    },
    language: {
      name: 'isiZulu',
      family: 'Niger-Congo > Bantu > Nguni',
      speakers: 'Approximately 12 million first-language speakers',
      overview: `isiZulu is the most widely spoken home language in South Africa, one of the country's eleven official languages. It belongs to the Nguni branch of the Bantu language family, making it closely related to isiXhosa, siSwati, and isiNdebele. isiZulu is a tonal, agglutinative language — meaning words are built by attaching prefixes and suffixes to root words.`,
      phrases: [
        { phrase: 'Sawubona', meaning: 'Hello (to one person) — literally "I see you"' },
        { phrase: 'Sanibonani', meaning: 'Hello (to a group)' },
        { phrase: 'Ngiyabonga', meaning: 'Thank you' },
        { phrase: 'Unjani?', meaning: 'How are you?' },
        { phrase: 'Ngikhona', meaning: 'I am well' },
        { phrase: 'Hamba kahle', meaning: 'Go well (farewell)' },
      ],
    },
  },

  yoruba: {
    name: 'Yoruba',
    region: 'West Africa',
    location: 'Nigeria, Benin & Togo',
    population: '40 million+',
    heroImage: '/images/African-latest.jpg',
    tagline: 'One of Africa\'s greatest civilisations masters of art, philosophy and spirituality.',
    marketOverview: `The Yoruba have been master traders for centuries their markets (ọjà) are among the oldest and most organised in Africa. Yoruba artisans produce some of the finest bronzes, textiles, and woodcarvings in the world, with traditions stretching back over a thousand years.`,
    history: {
      overview: `The Yoruba people are one of the largest and most influential ethnic groups in Africa, with a civilisation that stretches back over a thousand years. Their ancient city of Ile-Ife is considered the spiritual birthplace of the Yoruba people and all of humanity in Yoruba cosmology. Through the transatlantic slave trade, Yoruba culture spread to the Americas forming the foundation of religions like Candomblé, Santería, and Vodou.`,
      timeline: [
        { year: '500 AD', event: 'Early Yoruba settlements develop in the forest zone of what is now southwest Nigeria.' },
        { year: '800–1000', event: 'Ile-Ife emerges as the religious and political centre of Yoruba civilisation. The famous Ife bronzes are cast.' },
        { year: '1400s', event: 'The Oyo Empire rises in the northern savannah, becoming one of the most powerful states in West Africa.' },
        { year: '1700s', event: 'Oyo Empire reaches its peak, controlling trade routes and extracting tribute from neighbouring states.' },
        { year: '1800s', event: 'The Oyo Empire collapses under internal strife and Fulani jihad pressure. Yoruba city-states engage in devastating civil wars.' },
        { year: '1960', event: 'Nigeria gains independence. The Yoruba play a leading role in shaping the new nation\'s politics, culture, and economy.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `Yoruba society is governed by a rich set of taboos known as eewo, which vary by family lineage, deity (orisha), and community. Each family has its own set of forbidden foods and behaviours tied to their ancestral orisha. For example, devotees of Ogun (the god of iron) may not eat dog meat, while followers of Yemoja (goddess of water) avoid certain fish. Sweeping at night is taboo in many households, as it is believed to sweep away good fortune and invite poverty.` },
      myths: { title: 'Myths & Legends', content: `Yoruba mythology is one of the richest and most complex in the world. In the beginning, Olodumare the supreme creator sent the orisha Obatala to earth with a calabash of sand, a five-toed hen, and a chameleon. Obatala poured the sand into the primordial waters, and the hen scattered it to form land this land became Ile-Ife, the cradle of the world. The 401 orishas of the Yoruba pantheon each govern a different domain of human life, from love and rivers to war and smallpox.` },
      food: { title: 'Food', content: `Yoruba cuisine is rich, flavourful, and deeply communal. Pounded yam made by pounding boiled yam in a large wooden mortar until smooth and elastic is the most celebrated staple, eaten with soups like egusi (melon seed soup), efo riro (spinach stew), and okra soup rich with fish, crayfish, and palm oil. Jollof rice, now famous across West Africa and beyond, has its roots in the region's vibrant cooking tradition.` },
      housing: { title: 'Housing', content: `The traditional Yoruba compound (agbo-ile) is one of the most sophisticated housing arrangements in Africa. Multiple related families live together in a large rectangular compound organised around a central courtyard (aafin), where community life unfolds children play, women cook, and elders hold court. The entrance to a compound is marked by a large wooden door intricately carved with scenes from mythology and daily life.` },
      clothing: { title: 'Clothing & Adornment', content: `Yoruba clothing is a masterpiece of textile artistry. Aso-oke a hand-woven fabric made from cotton or silk on a horizontal loom is the most prestigious cloth, worn at weddings, funerals, and festivals. The agbada is a wide, flowing robe worn by men on formal occasions. Women wear the iro (a wrap-around skirt), buba (a loose blouse), and gele a tightly wound headwrap that is itself an art form, tied in elaborate sculptural shapes.` },
      religion: { title: 'Religion', content: `The Yoruba religious system, known as Ifa, is one of the most sophisticated indigenous spiritual traditions in the world recognised by UNESCO as an Intangible Cultural Heritage of Humanity. At its centre is Olodumare, the supreme, unknowable God who created the universe. Below Olodumare are the 401 orishas divine beings who govern every aspect of natural and human life.` },
      rites: { title: 'Rites of Passage', content: `Yoruba rites of passage are elaborate, communal, and spiritually charged. On the seventh day after birth, the Ìkómọjáde naming ceremony takes place — family and friends gather as elders touch the baby's lips with honey (for sweetness), water (for clarity), palm oil (for prosperity), and other sacred substances. The name given carries deep significance — it is believed to shape the child's destiny.` },
    },
    language: {
      name: 'Yoruba',
      family: 'Niger-Congo > Atlantic-Congo > Volta-Niger',
      speakers: 'Approximately 45 million speakers worldwide',
      overview: `Yoruba is one of Africa's major languages and one of the most widely spoken languages on the continent. It is a tonal language with three tones high, mid, and low that change the meaning of words entirely. Yoruba has a rich literary tradition in both oral and written form, with a sophisticated corpus of proverbs (owe), praise poetry (oriki), and divination verse (odu Ifa).`,
      phrases: [
        { phrase: 'Ẹ káàbọ̀', meaning: 'Welcome' },
        { phrase: 'Ẹ káàárọ̀', meaning: 'Good morning' },
        { phrase: 'Ẹ káàsán', meaning: 'Good afternoon' },
        { phrase: 'Ẹ sẹ́', meaning: 'Thank you' },
        { phrase: 'Báwo ni?', meaning: 'How are you?' },
        { phrase: 'Mo wà dáadáa', meaning: 'I am fine' },
      ],
    },
  },
};

const cultureKeys = [
  { key: 'taboos',   label: 'Taboos' },
  { key: 'myths',    label: 'Myths & Legends' },
  { key: 'food',     label: 'Food' },
  { key: 'housing',  label: 'Housing' },
  { key: 'clothing', label: 'Clothing & Adornment' },
  { key: 'religion', label: 'Religion' },
  { key: 'rites',    label: 'Rites of Passage' },
];

const TABS = ['history', 'culture', 'language', 'market'];
const TAB_LABELS = { history: 'History', culture: 'Culture', language: 'Language', market: 'Market' };
const DEFAULT_SECTION = 'taboos';

const TribePage = () => {
  const { tribeName, tab, section } = useParams();
  const navigate = useNavigate();

  const tribe = tribeData[tribeName?.toLowerCase()];
  const activeTab = TABS.includes(tab) ? tab : 'history';
  const activeAccordion = section || DEFAULT_SECTION;
  const tribeProducts = getProductsForTribe(tribeName);

  // Redirect to default tab if none in URL
  useEffect(() => {
    if (!tab) {
      navigate(`/tribes/${tribeName}/history`, { replace: true });
    }
  }, [tab, tribeName, navigate]);

  const handleTabClick = (t) => {
    if (t === 'culture') {
      navigate(`/tribes/${tribeName}/culture/${DEFAULT_SECTION}`);
    } else {
      navigate(`/tribes/${tribeName}/${t}`);
    }
  };




  // Inside TribePage, before the return, build dynamic SEO:
const tabTitles = {
  history: 'History',
  culture: 'Culture',
  language: 'Language',
  market: 'Market',
};

// Add this for culture sections
const cultureSectionTitles = {
  taboos:   'Taboos',
  myths:    'Myths & Legends',
  food:     'Food',
  housing:  'Housing',
  clothing: 'Clothing & Adornment',
  religion: 'Religion',
  rites:    'Rites of Passage',
};


const tribeSeo = SEO_CONTENT[tribeName?.toLowerCase()];

const dynamicSeo = tribeSeo ? {
  ...tribeSeo,
  title: activeTab === 'culture'
     ? `Tribes | ${tribe?.name} | Culture | ${cultureSectionTitles[activeAccordion] || 'Culture'}`
  : `Tribes | ${tribe?.name} | ${tabTitles[activeTab]}`,
  path: activeTab === 'culture'
    ? `/tribes/${tribeName}/culture/${activeAccordion}`
    : `/tribes/${tribeName}/${activeTab}`,
} : null;

  const handleAccordionClick = (key) => {
    navigate(`/tribes/${tribeName}/culture/${key}`);
  };

  if (!tribe) {
    return (
      <>
      {dynamicSeo && <PageSeo {...dynamicSeo} />}
        <Navbar />
        <div className="tp-not-found">
          <h1>Tribe not found</h1>
          <p>We don't have a page for "{tribeName}" yet.</p>
          <button onClick={() => navigate('/tribes')}>← Back to Tribes</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>

     {dynamicSeo && <PageSeo {...dynamicSeo} />}
      <div className="tp-page">
        <Navbar />

        {/* ── HERO ── */}
        <div className="tp-hero" style={{ backgroundImage: `url(${tribe.heroImage})` }}>
          <div className="tp-hero-overlay" />
          <div className="tp-hero-content">
            <div className="tp-breadcrumb">
              <span onClick={() => navigate('/')} className="tp-crumb">Home</span>
              <span className="tp-crumb-sep">›</span>
              <span onClick={() => navigate('/tribes')} className="tp-crumb">Tribes</span>
              <span className="tp-crumb-sep">›</span>
              <span className="tp-crumb tp-crumb-active">{tribe.name}</span>
            </div>
            <p className="tp-hero-region">{tribe.region}</p>
            <h1 className="tp-hero-title">{tribe.name}</h1>
            <p className="tp-hero-tagline">{tribe.tagline}</p>
            <div className="tp-hero-stats">
              <div className="tp-stat">
                <span className="tp-stat-label">Location</span>
                <span className="tp-stat-value">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="rgb(210,123,53)" strokeWidth="1.8" fill="none"/>
                    <circle cx="12" cy="9" r="2.5" stroke="rgb(210,123,53)" strokeWidth="1.8" fill="none"/>
                  </svg>
                  {tribe.location}
                </span>
              </div>
              <div className="tp-stat">
                <span className="tp-stat-label">Population</span>
                <span className="tp-stat-value">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="rgb(210,123,53)" strokeWidth="1.8"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  {tribe.population}
                </span>
              </div>
              <div className="tp-stat">
                <span className="tp-stat-label">Language</span>
                <span className="tp-stat-value">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {tribe.language.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="tp-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tp-tab ${activeTab === t ? 'tp-tab-active' : ''}`}
              onClick={() => handleTabClick(t)}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="tp-content">

          {/* HISTORY */}
          {activeTab === 'history' && (
            <div className="tp-history">
              <div className="tp-history-overview">
                <h2>Overview</h2>
                <p>{tribe.history.overview}</p>
              </div>
              <div className="tp-timeline">
                <h2>Timeline</h2>
                <div className="tp-timeline-list">
                  {tribe.history.timeline.map((item, i) => (
                    <div key={i} className="tp-timeline-item">
                      <div className="tp-timeline-year">{item.year}</div>
                      <div className="tp-timeline-dot" />
                      <div className="tp-timeline-event">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CULTURE */}
          {activeTab === 'culture' && (
            <div className="tp-culture">
              <div className="tp-culture-list">
                {cultureKeys.map((item) => (
                  <button
                    key={item.key}
                    className={`tp-culture-item ${activeAccordion === item.key ? 'active' : ''}`}
                    onClick={() => handleAccordionClick(item.key)}
                  >
                    <span className="tp-culture-arrow">
                      {activeAccordion === item.key ? '▼' : '▶'}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="tp-culture-content">
                <h2>{tribe.culture[activeAccordion]?.title}</h2>
                <p>{tribe.culture[activeAccordion]?.content}</p>
              </div>
            </div>
          )}

          {/* LANGUAGE */}
          {activeTab === 'language' && (
            <div className="tp-language">
              <div className="tp-language-overview">
                <h2>{tribe.language.name}</h2>
                <div className="tp-lang-meta">
                  <span><strong>Language Family:</strong> {tribe.language.family}</span>
                  <span><strong>Speakers:</strong> {tribe.language.speakers}</span>
                </div>
                <p>{tribe.language.overview}</p>
              </div>
              <div className="tp-phrases">
                <h3>Common Phrases</h3>
                <div className="tp-phrases-grid">
                  {tribe.language.phrases.map((p, i) => (
                    <div key={i} className="tp-phrase-card">
                      <span className="tp-phrase-word">{p.phrase}</span>
                      <span className="tp-phrase-meaning">{p.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MARKET */}
          {activeTab === 'market' && (
            <div className="tp-market">
              <div className="tp-market-overview">
                <h2>Marketplace</h2>
                <p>{tribe.marketOverview}</p>
              </div>
              {tribeProducts.length === 0 ? (
                <div className="tp-market-empty">
                  <p>No products listed for this tribe yet.</p>
                  <button onClick={() => navigate('/market')}>Browse the full marketplace →</button>
                </div>
              ) : (
                <div className="tp-market-grid">
                  {tribeProducts.map((product, i) => (
                    <div
                      key={i}
                      className="tp-product-card"
                      onClick={() => navigate(`/market/${product.category}/${toSlug(product.name)}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="tp-product-image">
                        <img src={product.imageUrl} alt={product.name} />
                      </div>
                      <div className="tp-product-body">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <div className="tp-product-footer">
                          <span className="tp-product-price">
                            {typeof product.price === 'number' ? `$${product.price}` : product.price}
                          </span>
                          <button className="tp-product-btn" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/market/${product.category}/${toSlug(product.name)}`);
                          }}>
                            View →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        <button className="tp-back" onClick={() => navigate('/tribes')}>
          ← Back to Tribes
        </button>
      </div>

      <Footer />
    </>
  );
};

export default TribePage;