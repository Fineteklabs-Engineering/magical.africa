// ── TRIBE DATA ──
// Import this in TribePage.jsx and any other component that needs tribe info

export const tribeData = {

  maasai: {
    name: 'Maasai',
    region: 'East Africa',
    location: 'Kenya & Tanzania',
    population: '2 million+',
    heroImage: '/images/drums-latest.jpg',
    tagline: 'Warriors of the East African savannah, keepers of ancient tradition.',
    marketOverview: `The Maasai are renowned traders and craftspeople across East Africa. Their open-air markets are vibrant gathering places where communities exchange livestock, share news, and celebrate culture. Maasai artisans — particularly women — are celebrated internationally for their intricate beadwork, which carries cultural symbolism in every colour and pattern.`,
    history: {
      overview: `The Maasai are a Nilotic ethnic group inhabiting the African Great Lakes region. They arrived in the current territory through a long migration from the Nile Basin region. By the 17th and 18th centuries, the Maasai had become one of the most dominant groups in East Africa, known for their fierce warrior tradition and nomadic pastoralism. Their identity is deeply tied to cattle, which they consider a gift from their god Enkai — the source of all wealth, status, and spiritual life.`,
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
      taboos: { title: 'Taboos', content: `The Maasai observe many sacred taboos passed down through generations. It is forbidden to eat wildlife — the Maasai are pastoralists and consuming game is considered beneath their dignity. Women are not permitted to own cattle, as livestock belongs exclusively to the men and the clan. Speaking ill of the elders is a serious transgression that can result in social exclusion and curses. A young warrior (moran) is not permitted to eat meat that has been seen by a married woman — doing so is believed to weaken his strength and courage. Entering another man's home without permission is considered deeply disrespectful, as the home is a sacred space belonging to the wife who built it.` },
      myths: { title: 'Myths & Legends', content: `The Maasai believe that Enkai (God) gave all the cattle in the world to the Maasai people at the beginning of time. This myth serves as a spiritual justification for cattle raiding, which was historically practiced against neighbouring tribes — the Maasai believed they were simply reclaiming what was rightfully theirs. The Maasai also tell of Leeyo, a father figure who bargained with death itself to bring back his son — a story about love, sacrifice, and the fragile boundary between the living and the spirit world. The rainbow is seen as a divine bridge between heaven and earth, a sign that Enkai is watching. Lightning is feared as the Red God's anger, while gentle rain is the blessing of the Black God.` },
      food: { title: 'Food', content: `The traditional Maasai diet consists almost entirely of cattle products — milk, meat, and blood. Fresh and fermented milk, known as kule naoto, is a daily staple consumed by all ages. Blood is drawn from live cattle by making a small incision in the jugular vein — it is mixed with milk and consumed during ceremonies, illness recovery, and by warriors after long journeys. The cattle are rarely slaughtered for food alone; meat is reserved for celebrations, healing rituals, and rites of passage. Honey wine (mead) is brewed for special occasions. In modern times, ugali (maize porridge), rice, and vegetables have been adopted through contact with neighbouring Bantu communities and urban markets.` },
      housing: { title: 'Housing', content: `Maasai homes, known as inkajijik, are constructed entirely by women — building the home is considered a woman's sacred responsibility and a mark of her skill and status. The structure uses a framework of interwoven branches and saplings plastered with a mixture of mud, grass, ash, and cow dung, which dries into a hard, weatherproof shell. The low, oval design is suited to the nomadic lifestyle — it can be dismantled and rebuilt as the community moves to new grazing land. Inside, a central fire provides warmth and cooking heat, with smoke escaping through a small opening. A larger enclosure called an enkang surrounds a cluster of homes, fenced with sharp acacia branches to protect livestock from lions and hyenas at night.` },
      clothing: { title: 'Clothing & Adornment', content: `The Maasai are instantly recognisable by their striking red shuka — a blanket-like cloth worn draped over the body. Red is sacred, symbolising courage, strength, and the blood of warriors. Elaborate beadwork is the heart of Maasai adornment — women spend countless hours crafting intricate collars, bracelets, anklets, and earrings by hand. Each colour carries deep meaning: white represents purity and health, blue represents the sky and water, green represents the land and sustenance, orange represents warmth and friendship, red represents bravery and blood.` },
      religion: { title: 'Religion', content: `The Maasai are monotheistic, worshipping a single deity called Enkai, who exists in two complementary forms. Enkai Narok — the Black God — is benevolent, associated with rain, green pastures, and abundance. Enkai Nanyokie — the Red God — is wrathful, associated with lightning, drought, and punishment for wrongdoing. The laibon, a hereditary spiritual leader and medicine man, serves as the intermediary between the community and Enkai — performing healing rituals, offering prophecies, and blessing warriors before battle.` },
      rites: { title: 'Rites of Passage', content: `The Maasai life cycle is structured around a series of profound rites of passage. Three months after birth, the Enkiama naming ceremony welcomes the child into the community. Boys progress through age-sets: junior warrior (moran), senior warrior, junior elder, and senior elder — each transition marked by ceremony and new responsibilities. The most celebrated rite is Eunoto, the coming-of-age ceremony in which a warrior's long, ochre-dyed hair is shaved off by his mother, marking his transition to senior warrior status.` },
    },
    language: {
      name: 'Maa (Maasai)',
      family: 'Nilo-Saharan > Eastern Sudanic > Nilotic',
      speakers: 'Approximately 1.5 million speakers',
      overview: `Maa is the language of the Maasai people, spoken across Kenya and Tanzania. It belongs to the Nilotic branch of the Nilo-Saharan language family — a group of languages stretching from Uganda to Sudan. Maa is a tonal language, meaning the pitch of a syllable can change a word's meaning entirely.`,
      phrases: [
        { phrase: 'Sopa', meaning: 'Hello (to one person)' },
        { phrase: 'Sopat', meaning: 'Hello (to a group)' },
        { phrase: 'Ero supa', meaning: 'I am well' },
        { phrase: 'Ashe', meaning: 'Thank you' },
        { phrase: 'Enkai aiyiook', meaning: 'God bless you' },
        { phrase: 'Keserian ingishu', meaning: 'How are your cattle?' },
      ],
    },
    leaders: [
      { name: 'Laibon Mbatian', role: 'Supreme Laibon (Spiritual Leader)', years: 'c. 1820 – 1890', image: '/images/kitenge-latest.jpg', description: 'The most revered laibon in Maasai history, Mbatian united the Maasai clans during the devastating rinderpest epidemic and colonial expansion. His prophecies are still recounted today, warning of the "iron snake" (the railway) and the coming of Europeans.', legacy: 'Spiritual unifier' },
      { name: 'Ole Lenana', role: 'Paramount Laibon', years: '1870 – 1911', image: '/images/kora.jpg', description: 'Son of Mbatian, Ole Lenana negotiated with British colonial authorities during a period of immense hardship following the rinderpest epidemic.', legacy: 'Diplomat & peacekeeper' },
      { name: 'Mekatilili wa Menza', role: 'Resistance Leader & Orator', years: '1840 – 1924', image: '/images/maasai-wear2.jpg', description: 'A fierce orator and organiser who mobilised her people against forced labour and colonial rule across East Africa.', legacy: 'Freedom fighter' },
      { name: 'Joseph ole Tipis', role: 'Politician & Cultural Advocate', years: '1927 – 2003', image: '/images/maasai-women2.jpg', description: 'One of Kenya\'s first Maasai politicians who fought throughout his career to protect Maasai land rights and preserve cultural traditions.', legacy: 'Political pioneer' },
    ],
  },

  luo: {
    name: 'Luo',
    region: 'East Africa',
    location: 'Western Kenya & Northern Tanzania',
    population: '5 million+',
    heroImage: '/images/African-latest.jpg',
    tagline: 'People of the lake — fishermen, scholars, and guardians of oral tradition.',
    marketOverview: `The Luo are known across East Africa for their skill in fishing, ironwork, and music. The shores of Lake Victoria have been their trading hub for centuries, and their craft traditions — including hand-carved wooden instruments, woven fishing traps, and beaded ornaments — are celebrated throughout the region.`,
    history: {
      overview: `The Luo are a Nilotic people who migrated from the Nile Valley region of present-day Sudan and South Sudan, arriving at the shores of Lake Victoria around the 15th and 16th centuries. They settled along the lake's northeastern shores in what is now western Kenya, integrating with Bantu peoples already in the region.`,
      timeline: [
        { year: '1400–1500s', event: 'Luo people begin migrating southward from the Nile Valley, following the western branch of the Nilotic expansion.' },
        { year: '1600s', event: 'Luo settle on the shores of Lake Victoria, establishing fishing communities and integrating with Bantu neighbours.' },
        { year: '1800s', event: 'Luo kingdoms consolidate; the Ramogi lineage emerges as a founding ancestral line claimed by many Luo clans.' },
        { year: '1890s', event: 'British colonial administration establishes control; Luo land and fishing rights come under colonial jurisdiction.' },
        { year: '1960s', event: 'Oginga Odinga, a Luo elder statesman, becomes Kenya\'s first Vice President and a leading voice for independence and democracy.' },
        { year: '1961', event: 'Barack Obama Sr., a Luo economist, travels to Hawaii — his son Barack Obama Jr. later becomes the 44th US President.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `The Luo observe a rich set of cultural taboos known as kwer, which govern social behaviour and spiritual purity. A son-in-law must never enter the bedroom of his mother-in-law — this boundary is considered sacred. It is forbidden for a woman to whistle, as it is believed to invite evil spirits into the home. A pregnant woman must not step over a rope or a broom, as this is said to complicate childbirth.` },
      myths: { title: 'Myths & Legends', content: `The Luo trace their origins to a founding ancestor called Ramogi, who led the first Luo people southward from the Nile Valley following a divine vision. The Luo believe in the existence of tipo — the spirits of the dead — who remain near the homestead and must be honoured through ritual. The hippo is a sacred animal to many Luo clans, believed to be an ancestor spirit that guards the lake and its people.` },
      food: { title: 'Food', content: `Fish is the cornerstone of Luo cuisine — tilapia and Nile perch from Lake Victoria are prepared in numerous ways: grilled over open fire, dried in the sun, or cooked in rich stews. Ugali — a stiff maize meal porridge — is eaten with virtually every meal, served alongside fried fish, sukuma wiki (collard greens), or meat.` },
      housing: { title: 'Housing', content: `The traditional Luo homestead (dala) is a carefully arranged compound of round mud-walled, thatched-roof houses organised around a central communal space. The simba — the house of an unmarried young man — stands at the entrance of the compound, serving as a guesthouse.` },
      clothing: { title: 'Clothing & Adornment', content: `Historically, the Luo dressed in animal skins and woven bark cloth. Men of status wore elaborate headdresses of ostrich feathers during ceremonies. The removal of six lower front teeth (a practice called nak) was a traditional mark of Luo identity — both men and women underwent this as a rite of beauty and belonging.` },
      religion: { title: 'Religion', content: `The Luo traditionally believed in Nyasaye — the supreme God who created the universe and governs all life. Below Nyasaye are the jochiende — the spirits of the ancestors — who remain present among the living and must be respected through proper burial, ritual libations, and remembrance.` },
      rites: { title: 'Rites of Passage', content: `Among the Luo, death and burial rites are among the most elaborate and socially significant ceremonies in their culture. A proper burial is not just a cultural obligation — it is believed to determine whether the deceased's spirit rests peacefully or becomes a troublesome presence for the living.` },
    },
    language: {
      name: 'Dholuo',
      family: 'Nilo-Saharan > Eastern Sudanic > Nilotic > Western Nilotic',
      speakers: 'Approximately 4.2 million speakers',
      overview: `Dholuo is the language of the Luo people, spoken primarily in western Kenya and northern Tanzania. It belongs to the Western Nilotic branch of the Nilo-Saharan language family. Dholuo is a tonal language with a distinctive rhythm and cadence — it is known for its rich proverbs (ngero), praise names, and oral poetry.`,
      phrases: [
        { phrase: 'Misawa ahinya', meaning: 'Hello / Good day' },
        { phrase: 'Ang\'o ma nyingi?', meaning: 'What is your name?' },
        { phrase: 'Nyinga en...', meaning: 'My name is...' },
        { phrase: 'Erokamano', meaning: 'Thank you' },
        { phrase: 'Idhi nade?', meaning: 'How are you?' },
        { phrase: 'Adhi maber', meaning: 'I am well' },
      ],
    },
    leaders: [
      { name: 'Jaramogi Oginga Odinga', role: 'Independence Leader & Vice President', years: '1911 – 1994', image: '/images/African-latest.jpg', description: 'One of Kenya\'s founding fathers and its first Vice President, Oginga Odinga was a towering figure in the independence movement and became the opposition\'s most prominent voice.', legacy: 'Father of opposition politics' },
      { name: 'Tom Mboya', role: 'Politician & Pan-Africanist', years: '1930 – 1969', image: '/images/maasai-women-latest.jpg', description: 'A brilliant trade unionist and politician who organised the famous "airlift" bringing hundreds of Kenyan students to study in the United States. His assassination in 1969 shocked East Africa.', legacy: 'Pan-Africanist visionary' },
      { name: 'Barack Obama Sr.', role: 'Economist & Scholar', years: '1936 – 1982', image: '/images/African-storytelling2.jpg', description: 'Father of the 44th President of the United States, Barack Obama Sr. was one of Kenya\'s first Harvard-educated economists whose life and story brought global attention to the Luo people.', legacy: 'International bridge' },
    ],
  },

  kikuyu: {
    name: 'Kikuyu',
    region: 'East Africa',
    location: 'Central Kenya',
    population: '8 million+',
    heroImage: '/images/African-storytelling2.jpg',
    tagline: 'The largest ethnic group in Kenya — farmers, traders, and architects of independence.',
    marketOverview: `The Kikuyu have been industrious traders and farmers for centuries, with thriving markets at the foot of Mount Kenya. They are known for their finely woven baskets, pottery, and ironwork, as well as their role in shaping Kenya's modern economy and political landscape.`,
    history: {
      overview: `The Kikuyu are the largest ethnic group in Kenya, numbering over 8 million people. They are a Bantu people who settled in the fertile highlands around Mount Kenya, which they call Kirinyaga — the dwelling place of their god Ngai. The Kikuyu were among the most organised and economically sophisticated societies in pre-colonial East Africa. They played a central role in the Mau Mau Uprising against British colonial rule, which ultimately led to Kenya's independence in 1963.`,
      timeline: [
        { year: '1400–1500s', event: 'Kikuyu people settle the fertile highlands around Mount Kenya, clearing forest for cultivation.' },
        { year: '1800s', event: 'Kikuyu establish sophisticated land tenure systems (githaka) and expand trade networks with neighbouring peoples.' },
        { year: '1895', event: 'British East Africa Protectorate declared; Kikuyu land is increasingly seized for European settlement.' },
        { year: '1920s–30s', event: 'Jomo Kenyatta and the Kikuyu Central Association begin organised political resistance to colonial rule.' },
        { year: '1952–60', event: 'The Mau Mau Uprising — Kikuyu-led armed resistance against British colonialism — reshapes Kenya\'s political future.' },
        { year: '1963', event: 'Kenya gains independence; Jomo Kenyatta, a Kikuyu, becomes the first Prime Minister and later President.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `Among the Kikuyu, disrespecting elders is one of the gravest social offences — it is believed to bring nguruki (misfortune) upon the entire family. A man must never eat food prepared by a woman who is in her menstrual cycle, as it is considered ritually impure. It is forbidden to point at a person's homestead with a finger — one uses the chin to gesture instead, a sign of respect.` },
      myths: { title: 'Myths & Legends', content: `Kikuyu cosmology centres on Ngai — the supreme creator and ruler of all things — who lives on Kirinyaga (Mount Kenya), the sacred mountain that anchors the world. According to the origin myth, Ngai created the first man, Gikuyu, and led him to the top of Kirinyaga to survey the land below. He then created Mumbi as Gikuyu's companion, and together they had nine daughters who became the mothers of the nine clans of the Kikuyu people.` },
      food: { title: 'Food', content: `The Kikuyu are primarily agriculturalists, and their cuisine reflects a deep relationship with the land. Irio — a nourishing mash of green peas, potatoes, and corn — is the most beloved traditional dish. Githeri, a simple boil of maize and beans, is a daily staple. Mutura is a traditional sausage made from goat intestines stuffed with minced meat, blood, and spices, roasted over an open fire.` },
      housing: { title: 'Housing', content: `Traditional Kikuyu homesteads (mucii) are carefully arranged around a central area where cattle and goats are kept at night. The main house (nyumba) is a circular structure with mud walls and a thatched roof, built by the family together. Each wife in a polygamous household has her own house, arranged in order of seniority around the compound.` },
      clothing: { title: 'Clothing & Adornment', content: `Historically, the Kikuyu dressed in animal skins — goat and sheep hides were softened, cut, and worn as cloaks and skirts. Both men and women adorned themselves with copper and iron wire coiled around their arms, legs, and neck — a sign of wealth and social standing.` },
      religion: { title: 'Religion', content: `The Kikuyu are monotheistic, worshipping Ngai — the supreme God who resides on Mount Kenya and in the sky. Sacrifices of animals — particularly sheep and cattle — were made under the sacred mugumo fig tree during times of drought, illness, or community crisis. The mundu mugo (medicine man or woman) was the spiritual and medical authority.` },
      rites: { title: 'Rites of Passage', content: `The most important Kikuyu rite of passage is irua — the circumcision ceremony for both boys and girls, which marks the transition from childhood to adulthood and full membership in the community. The ceremony traditionally takes place during specific seasons and involves elaborate preparation, feasting, and instruction by elders.` },
    },
    language: {
      name: 'Gĩkũyũ (Kikuyu)',
      family: 'Niger-Congo > Bantu > Northeast Bantu',
      speakers: 'Approximately 8 million speakers',
      overview: `Gĩkũyũ is a Bantu language spoken by the Kikuyu people of central Kenya. It is the most widely spoken indigenous language in Kenya, closely related to Embu and Meru. Gĩkũyũ is a tonal language with a rich system of noun classes and verb extensions. The language has a strong oral literary tradition — proverbs (thimo), riddles (ndaĩ), and oral poetry are central to Kikuyu cultural expression.`,
      phrases: [
        { phrase: 'Wĩ mwega?', meaning: 'How are you?' },
        { phrase: 'Ndĩ mwega', meaning: 'I am well' },
        { phrase: 'Nĩ wega mũno', meaning: 'Thank you very much' },
        { phrase: 'Ũkũ nĩ kũ?', meaning: 'Where are you going?' },
        { phrase: 'Ngai agũthaithie', meaning: 'May God bless you' },
        { phrase: 'Rũciũ rũega', meaning: 'Good morning' },
      ],
    },
    leaders: [
      { name: 'Jomo Kenyatta', role: 'First President of Kenya', years: '1897 – 1978', image: '/images/Oromo2.jpg', description: 'The father of the Kenyan nation and its first president, Kenyatta was imprisoned by the British during the Mau Mau uprising and emerged to lead Kenya to independence in 1963.', legacy: 'Father of the nation' },
      { name: 'Dedan Kimathi', role: 'Mau Mau Field Marshal', years: '1920 – 1957', image: '/images/African-storytelling2.jpg', description: 'The supreme commander of the Mau Mau Land and Freedom Army, Kimathi led guerrilla resistance against British colonial rule from the forests of Mount Kenya. Captured and hanged by the British, he remains a national hero.', legacy: 'Freedom fighter' },
      { name: 'Wangari Maathai', role: 'Nobel Peace Prize Laureate', years: '1940 – 2011', image: '/images/maasai-women2.jpg', description: 'The first African woman to win the Nobel Peace Prize, Wangari Maathai founded the Green Belt Movement which planted over 51 million trees across Kenya.', legacy: 'Environmental champion' },
      { name: 'Ngũgĩ wa Thiong\'o', role: 'Author & Intellectual', years: '1938 – Present', image: '/images/maasai2.jpg', description: 'One of Africa\'s greatest living writers, Ngũgĩ gave up writing in English to write exclusively in Gikuyu — a powerful act of cultural reclamation.', legacy: 'Literary giant' },
    ],
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
        { year: '1820s', event: 'The Mfecane — a period of widespread warfare and migration triggered by Zulu expansion across southern Africa.' },
        { year: '1879', event: 'Anglo-Zulu War: the Zulu army defeats the British at the Battle of Isandlwana.' },
        { year: '1906', event: 'The Bambatha Rebellion — the last armed Zulu uprising against colonial taxation and land seizure.' },
        { year: '1994', event: 'South Africa becomes a democracy; Zulu cultural heritage is recognised and protected under the new constitution.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `Zulu society is governed by a deep code of respect and spiritual awareness that shapes everyday behaviour. A daughter-in-law (makoti) must never speak the names of her father-in-law or his male relatives — a practice called ukuhlonipha, meaning deep respect. It is forbidden to whistle at night, as it is believed to attract evil spirits and bad luck to the home.` },
      myths: { title: 'Myths & Legends', content: `Zulu mythology is rich with stories of creation, ancestral spirits, and supernatural beings. The supreme creator is Unkulunkulu — the Ancient One — who emerged from a bed of reeds (uhlanga) and created all people, animals, and the natural world. The Tokoloshe is a feared mythological creature — a small, mischievous water sprite sent by witches to cause illness, nightmares, and death.` },
      food: { title: 'Food', content: `Traditional Zulu cuisine is hearty and deeply connected to the land. Uphuthu — a crumbly maize meal — is the staple food, eaten daily and served with amasi (fermented milk), beans, or meat stew. Umqombothi is the traditional Zulu beer, brewed from maize and sorghum — it plays a central role in ceremonies.` },
      housing: { title: 'Housing', content: `The traditional Zulu homestead is called an umuzi — a carefully arranged circular settlement that reflects the social structure of the family. Traditional Zulu homes are beehive-shaped (iQhugwane), constructed from a dome of woven saplings covered in tightly packed grass thatch.` },
      clothing: { title: 'Clothing & Adornment', content: `Zulu beadwork is one of the most sophisticated visual communication systems in the world. Beaded items — necklaces, armbands, aprons, and headbands — carry encoded messages about the wearer's age, marital status, and social standing. The isicholo — a large, flat disc-shaped hat made of woven grass — is worn by married women as a sign of their status.` },
      religion: { title: 'Religion', content: `Zulu spiritual life centres on the veneration of ancestral spirits, known as amadlozi or izithunywa. These spirits are believed to be the active guardians of the living — they communicate through dreams, illness, and unusual events, guiding families and warning of danger. When misfortune strikes, a diviner (sangoma) is consulted.` },
      rites: { title: 'Rites of Passage', content: `Zulu rites of passage mark every major transition of life with ceremony and community celebration. At birth, the umbilical cord is buried under the threshold of the home, binding the child to the family homestead forever. The umemulo ceremony celebrates a young woman's coming of age.` },
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
    leaders: [
      { name: 'Shaka Zulu', role: 'King & Military Innovator', years: 'c. 1787 – 1828', image: '/images/maasai-women-latest.jpg', description: 'One of the most influential leaders in African history, Shaka transformed the Zulu from a minor clan into a mighty kingdom through radical military innovation.', legacy: 'Military genius' },
      { name: 'Nandi', role: 'Queen Mother of the Zulu Nation', years: 'c. 1760 – 1827', image: '/images/maasai-women2.jpg', description: 'The mother of Shaka Zulu, Nandi endured exile and hardship before her son rose to power. She became the most powerful woman in the Zulu kingdom.', legacy: 'Mother of the nation' },
      { name: 'Cetshwayo kaMpande', role: 'Last King of Independent Zululand', years: '1826 – 1884', image: '/images/maasai-livestock2.jpg', description: 'The last king of an independent Zulu state, Cetshwayo led his army to a stunning victory over British forces at Isandlwana in 1879 — the worst defeat the British army suffered in the colonial era.', legacy: 'Defender of the kingdom' },
    ],
  },

  yoruba: {
    name: 'Yoruba',
    region: 'West Africa',
    location: 'Nigeria, Benin & Togo',
    population: '40 million+',
    heroImage: '/images/African-latest.jpg',
    tagline: 'One of Africa\'s greatest civilisations — masters of art, philosophy and spirituality.',
    marketOverview: `The Yoruba have been master traders for centuries — their markets (ọjà) are among the oldest and most organised in Africa. Yoruba artisans produce some of the finest bronzes, textiles, and woodcarvings in the world, with traditions stretching back over a thousand years.`,
    history: {
      overview: `The Yoruba people are one of the largest and most influential ethnic groups in Africa, with a civilisation that stretches back over a thousand years. Their ancient city of Ile-Ife is considered the spiritual birthplace of the Yoruba people and all of humanity in Yoruba cosmology. Through the transatlantic slave trade, Yoruba culture spread to the Americas — forming the foundation of religions like Candomblé, Santería, and Vodou.`,
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
      taboos: { title: 'Taboos', content: `Yoruba society is governed by a rich set of taboos known as eewo, which vary by family lineage, deity (orisha), and community. Each family has its own set of forbidden foods and behaviours tied to their ancestral orisha. Sweeping at night is taboo in many households, as it is believed to sweep away good fortune and invite poverty.` },
      myths: { title: 'Myths & Legends', content: `Yoruba mythology is one of the richest and most complex in the world. In the beginning, Olodumare — the supreme creator — sent the orisha Obatala to earth with a calabash of sand, a five-toed hen, and a chameleon. Obatala poured the sand into the primordial waters, and the hen scattered it to form land — this land became Ile-Ife, the cradle of the world.` },
      food: { title: 'Food', content: `Yoruba cuisine is rich, flavourful, and deeply communal. Pounded yam — made by pounding boiled yam in a large wooden mortar until smooth and elastic — is the most celebrated staple, eaten with soups like egusi (melon seed soup), efo riro (spinach stew), and okra soup rich with fish, crayfish, and palm oil.` },
      housing: { title: 'Housing', content: `The traditional Yoruba compound (agbo-ile) is one of the most sophisticated housing arrangements in Africa. Multiple related families live together in a large rectangular compound organised around a central courtyard (aafin), where community life unfolds — children play, women cook, and elders hold court.` },
      clothing: { title: 'Clothing & Adornment', content: `Yoruba clothing is a masterpiece of textile artistry. Aso-oke — a hand-woven fabric made from cotton or silk on a horizontal loom — is the most prestigious cloth, worn at weddings, funerals, and festivals. Women wear the iro, buba, and gele — a tightly wound headwrap that is itself an art form.` },
      religion: { title: 'Religion', content: `The Yoruba religious system, known as Ifa, is one of the most sophisticated indigenous spiritual traditions in the world — recognised by UNESCO as an Intangible Cultural Heritage of Humanity. At its centre is Olodumare, the supreme, unknowable God who created the universe.` },
      rites: { title: 'Rites of Passage', content: `Yoruba rites of passage are elaborate, communal, and spiritually charged. On the seventh day after birth, the Ìkómọjáde naming ceremony takes place — family and friends gather as elders touch the baby's lips with honey (for sweetness), water (for clarity), palm oil (for prosperity), and other sacred substances.` },
    },
    language: {
      name: 'Yoruba',
      family: 'Niger-Congo > Atlantic-Congo > Volta-Niger',
      speakers: 'Approximately 45 million speakers worldwide',
      overview: `Yoruba is one of Africa's major languages and one of the most widely spoken languages on the continent. It is a tonal language with three tones — high, mid, and low — that change the meaning of words entirely.`,
      phrases: [
        { phrase: 'Ẹ káàbọ̀', meaning: 'Welcome' },
        { phrase: 'Ẹ káàárọ̀', meaning: 'Good morning' },
        { phrase: 'Ẹ káàsán', meaning: 'Good afternoon' },
        { phrase: 'Ẹ sẹ́', meaning: 'Thank you' },
        { phrase: 'Báwo ni?', meaning: 'How are you?' },
        { phrase: 'Mo wà dáadáa', meaning: 'I am fine' },
      ],
    },
    leaders: [
      { name: 'Wole Soyinka', role: 'Nobel Laureate in Literature', years: '1934 – Present', image: '/images/African-latest.jpg', description: 'The first African to win the Nobel Prize in Literature, Wole Soyinka is a playwright, poet, and fierce political voice whose works blend Yoruba mythology with sharp critiques of colonialism.', legacy: 'Voice of African literature' },
      { name: 'Fela Kuti', role: 'Musician & Political Activist', years: '1938 – 1997', image: '/images/drums-latest.jpg', description: 'Creator of Afrobeat music and one of Africa\'s most defiant voices against government corruption, Fela Kuti turned his Lagos compound into a republic called "Kalakuta."', legacy: 'Afrobeat pioneer' },
      { name: 'Moremi Ajasoro', role: 'Legendary Queen & Freedom Fighter', years: 'c. 12th Century', image: '/images/African-storytelling2.jpg', description: 'One of the most celebrated figures in Yoruba history, Queen Moremi sacrificed everything to free her people from the Igbo raiders. Her courage is commemorated annually at the Edi festival in Ile-Ife.', legacy: 'Symbol of sacrifice & freedom' },
      { name: 'Obafemi Awolowo', role: 'Statesman & Social Reformer', years: '1909 – 1987', image: '/images/maasai-women-latest.jpg', description: 'One of Nigeria\'s greatest statesmen, Awolowo introduced free primary education and free healthcare in Western Nigeria decades before these became national policies.', legacy: 'Champion of education' },
    ],
  },

  ashanti: {
    name: 'Ashanti',
    region: 'West Africa',
    location: 'Ghana',
    population: '9 million+',
    heroImage: '/images/Oromo2.jpg',
    tagline: 'The golden kingdom — masters of gold, cloth, and the art of governance.',
    marketOverview: `The Ashanti kingdom was built on gold, and their markets have been centres of wealth and artisanship for centuries. Ashanti craftspeople are celebrated for their kente cloth, lost-wax cast gold and brass ornaments, carved wooden stools, and Adinkra-stamped fabrics.`,
    history: {
      overview: `The Ashanti people of central Ghana built one of the most powerful and sophisticated kingdoms in African history. The Ashanti Kingdom, founded in the late 17th century under Osei Tutu and his spiritual advisor Okomfo Anokye, became a major power in West Africa — controlling gold trade routes, commanding a formidable army, and developing a complex constitutional monarchy centred on the sacred Golden Stool.`,
      timeline: [
        { year: '1670s', event: 'Osei Tutu unites the Ashanti clans and founds the Ashanti Kingdom, with Kumasi as its capital.' },
        { year: '1701', event: 'Okomfo Anokye conjures the Golden Stool from the sky, uniting all Ashanti clans under one sacred symbol of sovereignty.' },
        { year: '1700s–1800s', event: 'The Ashanti Kingdom expands, dominating the gold trade and establishing one of the wealthiest states in West Africa.' },
        { year: '1824–1900', event: 'Four Anglo-Ashanti Wars — the Ashanti repeatedly defeat or hold off British forces, becoming a symbol of African resistance.' },
        { year: '1900', event: 'The "War of the Golden Stool" — the Ashanti rise up after the British governor demands to sit on the sacred stool.' },
        { year: '1957', event: 'Ghana becomes the first sub-Saharan African country to gain independence; Ashanti culture is central to the new nation\'s identity.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `The Ashanti have a rich system of taboos (akyiwadeɛ) tied to their clan system, royal customs, and spiritual beliefs. No one may sit on or touch the Golden Stool — even the Asantehene (king) does not sit directly on it. Each Ashanti clan (abusua) has its own set of totemic animals that members may not eat or harm.` },
      myths: { title: 'Myths & Legends', content: `The founding myth of the Ashanti kingdom centres on the miraculous appearance of the Golden Stool (Sika Dwa Kofi). The great priest Okomfo Anokye called the Golden Stool down from the heavens amid thunder and lightning, causing it to descend and land on the lap of Osei Tutu — the first Asantehene. The stool embodies the sunsum (spirit/soul) of the entire Ashanti nation.` },
      food: { title: 'Food', content: `Ashanti cuisine is rich, hearty, and built around starchy staples paired with complex, flavourful soups and stews. Fufu — made by pounding boiled cassava and plantain together until smooth and elastic — is the most celebrated Ashanti dish, eaten by hand and dipped into light soup, groundnut soup (nkatenkwan), or palm nut soup (abenkwan).` },
      housing: { title: 'Housing', content: `Traditional Ashanti homes are remarkable examples of earthen architecture adapted to the tropical forest environment. The classic Ashanti compound (aban) is a rectangular structure built around a central courtyard (adampan) open to the sky, allowing light and air to circulate.` },
      clothing: { title: 'Clothing & Adornment', content: `Kente cloth is the most iconic textile in Africa — a hand-woven silk and cotton fabric of dazzling geometric patterns, each with a name and meaning. Originally reserved exclusively for royalty and worn only by Ashanti kings and chiefs on ceremonial occasions, kente has become a symbol of African identity worldwide.` },
      religion: { title: 'Religion', content: `Ashanti religion centres on the worship of Nyame — the supreme sky god who created all things — and a rich pantheon of lesser deities (abosom) who inhabit natural features. The okomfo (priest/priestess) enters trance states to communicate with the abosom, delivering messages, healing illness, and resolving community disputes.` },
      rites: { title: 'Rites of Passage', content: `The Ashanti observe elaborate rites of passage tied to their matrilineal clan system. At birth, the baby undergoes the outdooring ceremony (Din To) on the eighth day — the child is presented to the community, named, and a libation is poured to the ancestors. Female puberty (bragoro) is celebrated with a community ceremony marking a girl's transition to womanhood.` },
    },
    language: {
      name: 'Twi (Akan)',
      family: 'Niger-Congo > Atlantic-Congo > Kwa',
      speakers: 'Approximately 9 million Ashanti Twi speakers; 20 million Akan speakers total',
      overview: `Twi is the dialect of the Akan language spoken by the Ashanti people. It is the most widely spoken language in Ghana, used as a lingua franca across the country alongside English. The language is tonal, with a rich system of proverbs (ɛbɛ) that form the backbone of Ashanti philosophical and moral teaching.`,
      phrases: [
        { phrase: 'Maakye', meaning: 'Good morning' },
        { phrase: 'Maaha', meaning: 'Good afternoon' },
        { phrase: 'Maadwo', meaning: 'Good evening' },
        { phrase: 'Meda wo ase', meaning: 'Thank you' },
        { phrase: 'Wo ho te sɛn?', meaning: 'How are you?' },
        { phrase: 'Me ho yɛ', meaning: 'I am fine' },
      ],
    },
    leaders: [
      { name: 'Osei Tutu I', role: 'Founder of the Ashanti Empire', years: 'c. 1660 – 1717', image: '/images/Oromo2.jpg', description: 'With the help of the great priest Okomfo Anokye, Osei Tutu united the Ashanti clans into a single powerful empire. He established Kumasi as the capital and created the constitution of the Ashanti nation.', legacy: 'Empire builder' },
      { name: 'Yaa Asantewaa', role: 'Queen Mother & War Leader', years: '1840 – 1921', image: '/images/maasai-women2.jpg', description: 'When the British demanded the sacred Golden Stool in 1900, Yaa Asantewaa shamed the chiefs who wavered and led the last major Ashanti war against British colonial rule.', legacy: 'Warrior queen' },
      { name: 'Kofi Annan', role: 'UN Secretary-General', years: '1938 – 2018', image: '/images/African-storytelling2.jpg', description: 'The seventh Secretary-General of the United Nations and the first from Sub-Saharan Africa, Kofi Annan won the Nobel Peace Prize in 2001.', legacy: 'Global statesman' },
      { name: 'Kwame Nkrumah', role: 'First President of Ghana', years: '1909 – 1972', image: '/images/African-latest.jpg', description: 'The father of Ghanaian independence and one of the greatest Pan-Africanist thinkers of the 20th century, Nkrumah led Ghana to become the first Sub-Saharan African country to gain independence in 1957.', legacy: 'Pan-Africanist pioneer' },
    ],
  },

  hausa: {
    name: 'Hausa',
    region: 'West Africa',
    location: 'Northern Nigeria & Niger',
    population: '70 million+',
    heroImage: '/images/kitenge-latest.jpg',
    tagline: 'The great merchants of the Sahel — traders, scholars, and builders of empires.',
    marketOverview: `The Hausa have been the dominant traders of the West African Sahel for over a thousand years. Their markets — particularly the ancient market cities of Kano and Zaria — connected sub-Saharan Africa to North Africa and the Mediterranean through trans-Saharan trade routes.`,
    history: {
      overview: `The Hausa are one of the largest ethnic groups in Africa, numbering over 70 million people across northern Nigeria, Niger, and the diaspora. They established the legendary Hausa Bakwai — seven original city-states including Kano, Zazzau, Katsina, Daura, Gobir, Biram, and Rano — each with its own king (sarki) and sophisticated urban culture.`,
      timeline: [
        { year: '999 AD', event: 'According to tradition, Bagauda becomes the first king of Kano, marking the foundation of the Hausa city-states.' },
        { year: '1300s', event: 'Islam is adopted by Hausa ruling classes; Islamic scholarship and trans-Saharan trade flourish in Kano and Katsina.' },
        { year: '1500–1700s', event: 'Hausa city-states reach their peak as commercial and intellectual centres, trading gold, salt, leather, and cloth across the Sahara.' },
        { year: '1804', event: 'Usman dan Fodio launches the Sokoto Jihad; Hausa kingdoms are transformed into Islamic Emirates under the Sokoto Caliphate.' },
        { year: '1903', event: 'British forces defeat the Sokoto Caliphate and establish colonial rule over northern Nigeria.' },
        { year: '1960', event: 'Nigeria gains independence; the Hausa-Fulani become a dominant political force in the new nation.' },
      ],
    },
    culture: {
      taboos: { title: 'Taboos', content: `Hausa society is deeply shaped by Islamic values alongside pre-Islamic Hausa traditions. It is strictly forbidden (haram) to consume pork or alcohol, following Islamic law. Women in traditional Hausa society — particularly in purdah (kulle) — are not permitted to leave the home without a male relative escort in conservative northern communities.` },
      myths: { title: 'Myths & Legends', content: `Hausa mythology weaves together pre-Islamic spirit beliefs with Islamic traditions. The Bori spirit possession cult predates Islam and remains a living tradition among some Hausa communities — practitioners (yan bori) enter trance states to communicate with iskoki (spirits) that cause illness and misfortune.` },
      food: { title: 'Food', content: `Hausa cuisine is rich, aromatic, and heavily influenced by the Islamic prohibition on pork and alcohol. Tuwo shinkafa — a soft rice pudding — is the most celebrated dish in the north, served with groundnut soup (miyan taushe) or vegetable soup. Suya — seasoned strips of beef or chicken grilled over an open fire — is arguably the most famous Hausa food contribution to the world.` },
      housing: { title: 'Housing', content: `The traditional Hausa compound (gida) is a masterpiece of earthen architecture — high mud walls enclosing multiple rooms, courtyards, and separate quarters for wives. The facades of elaborate Hausa homes are decorated with intricate geometric relief patterns applied in wet plaster — a tradition unique to Hausa architecture known as lalle plasterwork.` },
      clothing: { title: 'Clothing & Adornment', content: `Hausa dress is among the most elegant in West Africa. Men wear the babariga — an extraordinarily wide, flowing robe with intricate embroidery around the chest opening — at formal occasions and during Islamic festivals (Sallah). The Hausa are master dyers — their indigo-dyed cloth (called shuni) is one of the most prized fabrics in West Africa.` },
      religion: { title: 'Religion', content: `The Hausa adopted Islam as early as the 14th century, and today virtually all Hausa people are Muslim. Islam pervades every aspect of Hausa life — from the call to prayer that structures daily time, to the Islamic schools (makarantun allo) where children learn the Quran, to the legal framework of the emirate system based on Islamic law (sharia).` },
      rites: { title: 'Rites of Passage', content: `Hausa rites of passage are framed by Islamic practice. At birth, the naming ceremony (Suna) takes place on the seventh day — family gathers as the father whispers the child's name in its ear, a sheep is slaughtered, and the baby's head is shaved. Marriage is the most elaborate social institution — the multi-day wedding (bikin aure) involves elaborate gift exchanges, music, feasting, and the ceremonial moving of the bride to her husband's compound.` },
    },
    language: {
      name: 'Hausa',
      family: 'Afro-Asiatic > Chadic',
      speakers: 'Approximately 70–100 million speakers worldwide',
      overview: `Hausa is the most widely spoken language in West Africa and one of the major languages of the African continent. It belongs to the Chadic branch of the Afro-Asiatic language family. Hausa served as the lingua franca of the trans-Saharan trade routes for centuries, and today it is spoken as a first or second language from Senegal to Sudan.`,
      phrases: [
        { phrase: 'Sannu', meaning: 'Hello / Greetings' },
        { phrase: 'Lafiya lau', meaning: 'I am very well' },
        { phrase: 'Yaya lafiyar ka?', meaning: 'How is your health? (to a male)' },
        { phrase: 'Na gode', meaning: 'Thank you' },
        { phrase: 'Ina kwana?', meaning: 'Good morning (lit. how did you sleep?)' },
        { phrase: 'Sai anjima', meaning: 'See you later / Farewell' },
      ],
    },
    leaders: [
      { name: 'Usman dan Fodio', role: 'Islamic Scholar & Revolutionary', years: '1754 – 1817', image: '/images/kitenge-latest.jpg', description: 'The founder of the Sokoto Caliphate and one of the most important Islamic reformers in West African history, Usman dan Fodio launched a jihad that reshaped the entire Sahel region.', legacy: 'Religious reformer' },
      { name: 'Amina of Zazzau', role: 'Warrior Queen', years: 'c. 1533 – 1610', image: '/images/maasai-women2.jpg', description: 'Queen Amina of Zaria built a military empire and led her cavalry on campaigns across the region, expanding Hausa trade routes far into what is now Niger and Mali. She is commemorated on Nigeria\'s currency.', legacy: 'Warrior queen & pioneer' },
      { name: 'Ahmadu Bello', role: 'Premier of Northern Nigeria', years: '1910 – 1966', image: '/images/African-storytelling2.jpg', description: 'A great-grandson of Usman dan Fodio, the Sardauna of Sokoto was the first and only Premier of Northern Nigeria. He prioritised education, modernisation, and unity.', legacy: 'Northern statesman' },
    ],
  },

};


// ── FOLKLORE DATA ──
// Import this in FolklorePage.jsx

export const folkloreData = {
  maasai: {
    tribeName: 'Maasai',
    heroImage: '/images/drums-latest.jpg',
    originStory: {
      title: 'How Enkai Gave Cattle to the Maasai',
      image: '/images/maasai-land2.jpg',
      theme: 'Creation & Divine Gift',
      readTime: '4 min read',
      story: `In the beginning, when the world was still young and the sky hung close to the earth, Enkai the great god who exists in both the black clouds of rain and the red of lightning looked down upon all the people of the world. He saw them scattered across the land, hungry and uncertain.

Enkai called the Maasai to him and said: "I give you a sacred gift all the cattle that roam upon this earth. They are yours to tend, to drink from, to cherish. In caring for them, you shall never hunger, and in their abundance, you shall know my blessing."

And so it was that the cattle descended from heaven on a long rope of bark, stepping one by one onto the red earth of the savannah. The Maasai received them with song and dance, and from that day forward, their lives were inseparable from their herds.

To take a Maasai's cattle was to take his very soul and this is why, when warriors rode against neighbouring peoples to reclaim stolen cattle, they did not see it as theft. They believed they were simply reclaiming what Enkai had given them at the dawn of time.

This belief runs so deep that it shaped Maasai law, Maasai warfare, and Maasai identity for centuries. The moran, the warrior class, trained not for conquest but for the sacred duty of protecting the herd. Every ceremony, every rite of passage, every prayer was offered in the presence of cattle. Their blood was drunk. Their milk sustained generations. Their numbers measured a man's worth and a family's status.

Even today, when a Maasai child is born, a cow is slaughtered in celebration. When elders gather to make important decisions, they do so surrounded by the sound of cattle. The rope of bark down which the first herd descended is long gone but the covenant it represented has never broken. The Maasai and their cattle remain, as Enkai intended, inseparable.`,
    },
    stories: [
      {
        title: 'The Boy Who Bargained with Death',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Love & Sacrifice',
        excerpt: 'A father named Leeyo, grief-stricken at the death of his beloved son, followed death\'s shadow into the spirit world and made a bargain no mortal had ever dared — returning with his child at great personal cost.',
      },
      {
        title: 'The Rainbow Bridge',
        image: '/images/maasai-migration.jpg',
        theme: 'Life & Afterlife',
        excerpt: 'When the first Maasai elder died, Enkai stretched a great rainbow across the sky — a bridge between the living and the ancestors — promising that all who lived righteously would walk it at the end of their days.',
      },
      {
        title: 'The Moran and the Lion',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Courage & Initiation',
        excerpt: 'A young warrior facing his first lion hunt alone was visited in a dream by an elder ancestor who taught him that true courage is not the absence of fear, but the decision to protect those you love despite it.',
      },
    ],
    culturalContext: `The story of Enkai's gift is not merely a creation myth — it is the foundation of Maasai law, identity, and cosmology. Cattle are never simply livestock among the Maasai. They are living symbols of the divine covenant, and their care is a spiritual act.`,
    narrator: 'Passed down through elders (ilaibon) across generations in Kenya and Tanzania',
  },

  luo: {
    tribeName: 'Luo',
    heroImage: '/images/maasai-women-latest.jpg',
    originStory: {
      title: 'Ramogi and the First Luo',
      image: '/images/maasai-migration.jpg',
      theme: 'Migration & Destiny',
      readTime: '4 min read',
      story: `Long before the great lake shimmered under the African sun, the ancestral father Ramogi led his people on a great journey southward from the Nile basin. Nyasaye, the supreme God, appeared to Ramogi in a dream and told him: "Follow the river south, past the mountains, until you reach a lake so vast it seems like the sea. There, your children will multiply like the stars."

For generations they walked — through forests, across rivers, past kingdoms that rose and fell. Ramogi was patient when the young were impatient. He was steady when the elders doubted. He carried with him a sacred spear given to him by the ancestors, and wherever the spear pointed in his dreams, the people followed.

They encountered other peoples along the way — some welcoming, some hostile. Ramogi always sought peace first. He would send a young woman to an unfamiliar village carrying a gourd of milk, for milk was the sign of a peaceful people, a pastoral people, a people who meant no harm.

When at last they saw the gleaming waters of what would become Lake Victoria, the people wept with joy. Children ran ahead and touched the water and screamed with laughter. Old women who had walked for decades knelt and let the lake lap their hands.

Ramogi planted his staff in the earth at the lake's edge and declared: "Here we rest. Here we belong." He lifted his face to the sky and said simply: "Nyasaye, we have arrived."

The lake provided fish in abundance, the land gave rich soil for sorghum and millet, and the ancestral spirits settled with them, making their home in the deep waters. The fish that the Luo would come to cherish — the tilapia, the Nile perch — were said to be gifts sent by the ancestors from beneath the surface.

To this day, the Luo say that the lake is alive — that its waters hold the memory of every ancestor who has ever fished its depths. When the water is calm, the old people say: "The ancestors are sleeping." When the lake is rough with storm, they say: "The ancestors are restless. Something must be made right."`,
    },
    stories: [
      {
        title: 'The Spirit of Lake Victoria',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Ancestral Protection',
        excerpt: 'Fishermen who venture onto the lake at night speak of a luminous spirit that guides lost boats home — said to be the ghost of Ramogi himself.',
      },
      {
        title: 'The Talking Drum',
        image: '/images/drums-latest.jpg',
        theme: 'Music & Heritage',
        excerpt: 'A master drummer once played a rhythm so perfect that the ancestors descended from the sky to dance and left behind the gift of music.',
      },
      {
        title: 'Why the Hippo Lives in Water',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Wisdom & Pride',
        excerpt: 'A proud hippo who once ruled the savannah was outwitted by a clever hare in a bet — and waded into the lake to hide his shame forever.',
      },
    ],
    culturalContext: `The story of Ramogi is central to Luo identity because it explains not just where the Luo came from, but why they belong where they are. Lake Victoria is not simply a geographical feature — it is the fulfilment of a divine promise.`,
    narrator: 'Preserved in oral tradition by elders and storytellers across western Kenya, Uganda, and Tanzania',
  },

  yoruba: {
    tribeName: 'Yoruba',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'Obatala and the Creation of the World',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Creation & Divinity',
      readTime: '5 min read',
      story: `In the time before time, there was only the sky above and the endless primordial sea below. Olodumare, the supreme creator of all things, looked upon the formless waters and decided it was time to make the world.

He called his son Obatala — the orisha of purity, creation, and all things white — and gave him a calabash filled with sand, a five-toed hen, and a length of iron chain. "Climb down," Olodumare commanded, "and make dry land."

But before Obatala descended, the other orishas warned him: "Do not drink palm wine on this journey. The task is sacred." Obatala listened, set off, and descended from the heavens on the chain.

Halfway down, he grew thirsty. He saw palm wine sitting in a gourd and drank — once, twice, three times. By the time he reached the end of the chain, he was drowsy. He poured the sand carelessly, and the hen scratched unevenly, and the land that formed was rough and imperfect in places.

Oduduwa, another orisha who had been watching, took the calabash from the sleeping Obatala, poured the remaining sand into the waters with precision, and released the hen. The hen scratched perfectly, and the land spread in all directions. This first land was called Ile-Ife — the Sacred Ground, the Source.

When Obatala woke, he was ashamed. From that day, he swore never to drink palm wine again, and he dedicated himself to one sacred task: shaping the bodies of human beings out of clay before Olodumare breathed life into them.

This is why people born with physical differences — albinos, the hunchbacked, the blind — are considered sacred to Obatala. They are his special creations, made with particular intention, and harming them is the gravest taboo a Yoruba person can commit.

Olodumare breathed life into the clay figures Obatala shaped, and human beings opened their eyes for the first time on the shores of Ile-Ife. They looked at one another, at the trees, at the sky, at the great sea behind them, and they knew: this was home. They were Yoruba. They were the first.

This is why the Yoruba say: "Ile-Ife ni ile wa" — Ile-Ife is our home. All roads lead back to Ile-Ife. It is the source of us all, and of all humanity.`,
    },
    stories: [
      {
        title: 'Sango and the Thunder Storms',
        image: '/images/drums-latest.jpg',
        theme: 'Power & Consequence',
        excerpt: 'Sango, the fourth king of Oyo, could call down lightning. When he accidentally destroyed his own palace, he hanged himself — but death could not hold him.',
      },
      {
        title: 'Yemoja, Mother of Waters',
        image: '/images/maasai-women-latest.jpg',
        theme: 'Motherhood & Diaspora',
        excerpt: 'Yemoja wept so deeply for her children that her tears became the first great river. She is worshipped from Nigeria to Brazil.',
      },
      {
        title: 'Anansi the Trickster',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Wisdom & Trickery',
        excerpt: 'Anansi outwitted a sky god to steal all the world\'s stories for humanity — proving that cleverness beats strength.',
      },
    ],
    culturalContext: `The creation story of Ile-Ife is the cornerstone of Yoruba cosmology. It explains the origin of the world, the origin of human imperfection, and the sacred responsibility of Obatala. It has also shaped Yoruba approaches to disability and difference across centuries.`,
    narrator: 'Preserved in the Ifa divination corpus and oral tradition across Nigeria, Benin, and the Yoruba diaspora worldwide',
  },

  zulu: {
    tribeName: 'Zulu',
    heroImage: '/images/maasai-women-latest.jpg',
    originStory: {
      title: 'Unkulunkulu and the Coming of Death',
      image: '/images/maasai-migration.jpg',
      theme: 'Creation & Mortality',
      readTime: '5 min read',
      story: `In the beginning, there was only the great uhlanga — a vast bed of reeds stretching across the earth, taller than any man could see over, rustling in a wind that had no direction. There was no sun yet. No moon. Only the reeds, and within the reeds, the stirring of something ancient.

From the deepest part of the reed bed broke the first being: Unkulunkulu, the Ancient One, the Great Great One, the Creator. He did not come gently. He broke from the reeds with the force of a tree splitting — and as he broke free, other things broke with him. Men broke from the reeds. Women broke from the reeds. Cattle stepped out. Antelope leapt out. Rivers poured out. Mountains rose where the reeds fell. Fish swam. Birds flew. Everything that exists came from that first breaking.

Unkulunkulu walked among his creations and was moved. He wished for his people to live forever — to know no end, no darkness, no final parting.

He called the chameleon, the most ancient of the small creatures, and said: "Go to the people and tell them — uqobo lwabantu alubi — the nature of people is not to die. They shall not die. Go."

The chameleon set off. But the chameleon moves as it has always moved — with infinite, maddening slowness, stopping to change colour as the leaves change around it, pausing to catch flies, resting on warm rocks in the afternoon sun. The message sat in its throat, undelivered.

Then Unkulunkulu changed his mind. Or perhaps he never changed it. Perhaps it was always the plan. He called the blue-headed lizard — quick, darting, impatient — and said: "Tell the people they shall die."

The lizard sprinted. It arrived in the village before the chameleon had covered half the distance. It delivered the message: people would die. The people heard it, and the knowledge settled into them like a stone sinking in still water. By the time the chameleon arrived, panting with its slow effort, it was too late. Death had already entered the world. The people had already felt its cold certainty.

"But I had a different message!" the chameleon cried. The people looked at it with sadness, not anger. They understood: death had not been given to them out of cruelty. It had arrived through a failure of slowness — through the dallying of good intentions and the speed of a darker truth.

This is why, to this day, the Zulu people do not blame God for death. Death is an accident of timing, a race won by the wrong messenger. And the chameleon, forever ashamed, changes its colour constantly — still searching, some say, for a way to carry the right message home.`,
    },
    stories: [
      {
        title: 'The Tokoloshe',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Fear & Protection',
        excerpt: 'A small hairy water creature conjured by witches enters homes at night to torment the sleeping. Zulu families raise their beds on bricks to this day.',
      },
      {
        title: 'Shaka\'s Last Dream',
        image: '/images/drums-latest.jpg',
        theme: 'Prophecy & Fate',
        excerpt: 'On the night before his assassination, Shaka dreamed of a great black bird circling his kraal — the spirit of his mother Nandi, come to take him home.',
      },
      {
        title: 'The Girl Who Married the Snake King',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Kindness & Reward',
        excerpt: 'A woman who showed kindness to a serpent was led underground to a kingdom of riches, emerging with knowledge of medicine she shared with her village.',
      },
    ],
    culturalContext: `The story of Unkulunkulu explains one of the most profound questions any culture faces: why do people die? The Zulu answer is neither punishment nor design — it is accident, timing, and the tragic speed of a small lizard. This shapes a distinctly Zulu attitude to mortality: grief without bitterness.`,
    narrator: 'Preserved in oral tradition by izimbongi (praise poets) and elders across KwaZulu-Natal, South Africa',
  },

  kikuyu: {
    tribeName: 'Kikuyu',
    heroImage: '/images/maasai-women-latest.jpg',
    originStory: {
      title: 'Gikuyu, Mumbi, and the Nine Clans',
      image: '/images/maasai-women2.jpg',
      theme: 'Creation & Belonging',
      readTime: '5 min read',
      story: `Before there were people on the slopes of Kirinyaga — the Mountain of Brightness, the Mountain of God — there was only forest stretching in every direction, and above the forest, always and everywhere, the presence of Ngai.

Ngai is the creator of all things, the divider of the universe, the owner of all land. He does not have a form that eyes can see. He is in the mountain and above it. He is in the rain and sends it. He is in the thunder and speaks through it. And it was Ngai who, at the beginning of things, decided that the beautiful slopes of Kirinyaga should not be empty.

Ngai created a man — the first man, the father of a people — and called him Gikuyu, which means The Creator. He brought Gikuyu to the very summit of Mount Kenya and from there showed him everything: the great forests stepping down the mountainside, the red earth of the valleys below, the rivers glinting in the sun like threads of silver, the plains stretching to the horizon.

"All of this," Ngai said, "is yours. Go down and build your homestead where you find the mugumo tree — the sacred fig — growing in the valley. There you will find everything you need."

Gikuyu walked down from the summit. The forest was so dense and old that the light barely reached the ground. Birds he had never seen before watched him from the canopy. And then he found the mugumo tree — enormous, ancient, its roots reaching so deep they seemed to grip the heart of the mountain itself.

And beneath the mugumo tree stood a woman.

She was extraordinary. Her eyes were calm and knowing, as though she had been waiting not just for Gikuyu, but for the whole world. Her name was Mumbi — the Moulder, the Creator.

Together, Gikuyu and Mumbi built their homestead beneath the sacred tree. Ngai watched over them and blessed their union. And from their union came daughters — not one, not two, but nine. Each daughter was distinct, with her own gifts, her own temperament, her own destiny.

These nine daughters became the mothers of the nine great clans of the Kikuyu: Achera and Agachiku, Airîthi and Aithîrîndû, Ambûi and Angari, Anjiru and Angûi, and Aitherîndû. Every Kikuyu person alive today can trace their lineage to one of these nine women, one of these nine daughters of Gikuyu and Mumbi.

The mugumo tree still grows across Kikuyu land. It is never cut. Never harmed. When a mugumo falls naturally, it is a sign — something is shifting in the world. Elders gather to pray beneath it, to ask Ngai what is coming and what must be made right.

Mount Kenya still stands at the heart of Kikuyu life. Homes are built facing it. Prayers are spoken toward it. And when a Kikuyu person says they belong to the land — they do not mean it loosely. They mean it in the oldest sense: the land was given to Gikuyu by Ngai, the mugumo tree witnessed it, and Mumbi's daughters made it permanent.`,
    },
    stories: [
      {
        title: 'Wacu and the Giant',
        image: '/images/kitenge-latest.jpg',
        theme: 'Bravery & Cleverness',
        excerpt: 'A clever woman named Wacu outwitted a terrible giant who terrorised her village using only her wits and her songs — becoming the first Kikuyu warrior-woman.',
      },
      {
        title: 'The Sacred Mugumo Tree',
        image: '/images/maasai-women2.jpg',
        theme: 'Sacred Duty & Consequence',
        excerpt: 'A man who cut down a mugumo tree found everything he planted turned to ash — until he made public restitution to the ancestral spirits.',
      },
      {
        title: 'Ngai and the First Rain',
        image: '/images/kora.jpg',
        theme: 'Faith & Perseverance',
        excerpt: 'In a year of terrible drought, an elder climbed to the peak of Mount Kenya alone and prayed for three days — and on the fourth day, rain fell so heavily the rivers overflowed.',
      },
    ],
    culturalContext: `The story of Gikuyu and Mumbi is not simply a creation myth — it is a land title. For the Kikuyu, this story explains precisely why the fertile highlands around Mount Kenya belong to them, why the mugumo tree must never be cut, and why nine is a sacred number in Kikuyu counting, ceremony, and clan structure.`,
    narrator: 'Preserved in oral tradition by elders and through the writings of Jomo Kenyatta in "Facing Mount Kenya" (1938)',
  },

  igbo: {
    tribeName: 'Igbo',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'Chukwu and the Gift of Chi',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Destiny & Free Will',
      readTime: '4 min read',
      story: `Before the Igbo people walked the earth, before the first yam was planted or the first market held, Chukwu — the Great God, the Highest, the source of all that is — sat in contemplation.

He had decided to people the world. But here is where Chukwu showed his greatness: he did not wish to people the world with servants. He did not want puppets who moved because he pulled the strings. He wanted souls who would choose, and err, and strive, and rise.

So Chukwu devised something extraordinary. Before each soul descended to the earth, he gave it a chi — a personal spirit, a divine double, a guardian and counterpart assigned to that soul alone. Your chi is not your enemy. Your chi is not your master. Your chi is you, in another form, existing in the spirit realm, negotiating your fate at the table of heaven while you live out your days on earth.

A person with a strong, agreeable chi prospers — their paths open, their harvests are good, their children thrive. A person wrestling with a difficult chi finds the road harder — bends where others find straightways, loss where others find gain.

But here is the great Igbo wisdom, the thing that sets this teaching apart from simple fatalism: even a stubborn chi can be moved. The elders say — and this saying has shaped Igbo character for generations — "Onye kwe, chi ya ekwe." When a person agrees, their chi agrees.

This means: your chi will not go further than you are willing to go. If you sit in defeat, your chi sits with you. But if you rise, if you push, if you refuse to accept what has been handed to you — your chi, watching from the spirit world, nods and makes way. Destiny is not a locked door. It is a negotiation.

This is why the Igbo people are known across West Africa for their enterprise, their restlessness, their refusal to accept limitation. It is not stubbornness. It is theology. Every Igbo person who builds a business from nothing, who travels far to seek education, who refuses to be defined by circumstance — they are working with their chi, honouring the gift Chukwu gave them before they were born.

When an Igbo person achieves something great, they do not say "I did this alone." They say: "Chukwu na chi m nyere m aka" — God and my chi helped me. The chi is always there, always present, always watching, always ready to agree.`,
    },
    stories: [
      {
        title: 'The Tortoise and the Sky Feast',
        image: '/images/drums-latest.jpg',
        theme: 'Trickery & Consequences',
        excerpt: 'The trickster tortoise convinced birds to lend him feathers to fly to a sky feast — then claimed the feast for himself alone. The birds took back their feathers, and tortoise shells are cracked to this day.',
      },
      {
        title: 'Ogbuike and the Python Oracle',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Sacred Law & Humility',
        excerpt: 'A warrior who disrespected the sacred python — messenger of the earth goddess Ala — was struck with illness. Only public restitution healed him.',
      },
      {
        title: 'Why the Sun and Moon Live Apart',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Cosmic Origins',
        excerpt: 'Once the Sun and Moon lived together as husband and wife on earth. Their floods overwhelmed their host — and they were asked to move to the sky forever.',
      },
    ],
    culturalContext: `The concept of chi is one of the most sophisticated philosophical ideas in African indigenous thought. It sits at the intersection of fate and free will — acknowledging that humans are not the sole authors of their destiny, yet insisting they are active participants in shaping it.`,
    narrator: 'Preserved in Igbo oral tradition and explored in the literature of Chinua Achebe, particularly in "Things Fall Apart" and "Arrow of God"',
  },

  ashanti: {
    tribeName: 'Ashanti (Asante)',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'The Golden Stool Descends from Heaven',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Unity & Sacred Power',
      readTime: '4 min read',
      story: `In the time of the great priest Okomfo Anokye — a man whose powers were said to come directly from the sky god Nyame — the Ashanti were a fragmented people. There were many clans, many chiefs, many wars between cousins. The Ashanti had strength in numbers but no unity of soul.

Okomfo Anokye travelled from clan to clan, village to village, calling the chiefs to gather on a great open plain near what is now Kumasi. Some came willingly. Some came skeptically. Some came only because they had heard enough of this priest to be curious. But they came.

On the appointed day, the chiefs sat in their regalia, skeptical and proud, their linguists and warriors ranged behind them. Okomfo Anokye stood before them and said nothing for a long time. Then he raised his arms toward the sky.

Thunder rolled across a cloudless sky.

Lightning flashed from nowhere.

And then — slowly, impossibly, in full daylight and in the sight of every man and woman present — a golden stool descended from the clouds. It spun gently as it came. It caught the light and threw it back in every direction. It made no sound. It touched no one. It came to rest, with infinite gentleness, on the lap of Osei Tutu.

The crowd was silent. Then one of the elders began to sob. Then another. Then everyone was crying — warriors, chiefs, mothers, children — all weeping at the sight of something so far beyond the ordinary world that language had no word for it.

"This stool," Okomfo Anokye declared, his voice carrying across the plain, "contains the sunsum — the soul — of every Ashanti person who has ever lived, and every Ashanti person who is yet to be born. As long as it is safe, the Ashanti nation is safe. It must never be sat upon by any human being. Never be touched by an enemy hand. Never be allowed to touch the bare ground."

And so the Ashanti were united — not by conquest, not by treaty, but by a shared soul made visible. The chiefs laid down their individual grievances before the stool that afternoon, because to war against each other now was to war against themselves.

The Golden Stool is still kept in Kumasi today. It is never placed on bare ground — it sits on its own mat, on its own throne. It is never sat upon. When the British colonial governor demanded it in 1900, the female chiefs and Queen Mother Yaa Asantewaa rose in arms rather than surrender it. The stool was never handed over.

It never will be.`,
    },
    stories: [
      {
        title: 'Anansi and the Sky God\'s Stories',
        image: '/images/drums-latest.jpg',
        theme: 'Wisdom & Trickery',
        excerpt: 'Anansi the spider paid an impossible price — a python, hornets, a leopard, a fairy — to buy all the world\'s stories from Nyame. And stories have belonged to everyone ever since.',
      },
      {
        title: 'Yaa Asantewaa\'s War Cry',
        image: '/images/maasai-women-latest.jpg',
        theme: 'Courage & Resistance',
        excerpt: 'When male chiefs fell silent before British demands for the Golden Stool, Queen Mother Yaa Asantewaa stood: "If you men will not go forward, then we women will."',
      },
      {
        title: 'The Adinkra Symbols',
        image: '/images/kitenge-latest.jpg',
        theme: 'Wisdom & Legacy',
        excerpt: 'A dying king wanted his wisdom preserved forever. The symbols on his final robe became the entire philosophical language of the Ashanti — still used today.',
      },
    ],
    culturalContext: `The Golden Stool is unique in African history — a physical object believed to contain the collective soul of an entire nation. Its descent from heaven in the sight of gathered chiefs transformed the political landscape of West Africa, creating one of the most cohesive and powerful empires on the continent.`,
    narrator: 'Preserved in royal oral tradition by the Asantehene\'s court in Kumasi, Ghana, and recorded in colonial-era ethnographies',
  },

  hausa: {
    tribeName: 'Hausa',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'Bayajidda and the Founding of the Hausa States',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Heroism & Nation-Building',
      readTime: '5 min read',
      story: `Long ago, in a time when the great kingdoms of the Sahel were young and the trade routes had not yet been worn smooth by a thousand years of caravans, a prince named Bayajidda fled from his homeland in the east.

The reason for his flight differs in the telling — some say a quarrel with his father the king, others say a conspiracy of brothers, others say simply that fate was calling him west and he was wise enough to follow. Whatever the reason, Bayajidda rode with a small retinue of loyal men across the desert and the scrubland, seeking a new life.

He came first to the kingdom of Bornu, in the country east of Lake Chad, and there he married a princess named Magaram. They had a son. But the king of Bornu grew jealous of Bayajidda's growing popularity and scheming, and Bayajidda was forced to flee again — this time leaving his wife and son behind, taking only his horse and riding west.

He rode until the land flattened and the heat rose and the only shade was thrown by acacias. He rode until he reached the city of Daura.

Daura was ruled by a queen — a long line of queens, in fact, for Daura was a matrilineal kingdom. The queen at the time was called Magajiya Daurama. She was wise and practical and had governed her city well for many years.

But Daura had a problem. In the city's central well lived a terrible serpent — enormous, ancient, its scales the colour of iron, its eyes like lamps. The serpent's name was Sarki, and it had claimed the well as its own. It allowed water to be drawn only on Fridays. The rest of the week, the people of Daura thirsted. They had learned to collect rainwater and store it in clay pots, but it was never enough. The well stood full and cool and unreachable in the centre of their city, six days out of every seven.

Bayajidda arrived on a day that was not Friday. He was thirsty. He saw the well. No one stopped him — the stories say that the people watched silently from behind their walls, waiting to see what this stranger would do.

He went to the well alone. In the dark of the night, he drew water and drank and watered his horse. And when the serpent Sarki rose from the depths to challenge him — vast and terrible, filling the mouth of the well with its bulk — Bayajidda drew his sword and cut off its head with a single stroke.

He took the head and put it in a bag. He went to sleep.

In the morning, the people found the serpent dead. Bayajidda presented the head to Queen Daurama. She looked at this stranger — dusty from the road, calm about what he had done — and offered him half her kingdom. He said he wanted only a woman to marry. She gave him her handmaiden, Bagwariya, and the two were married.

But the story was not finished. Daurama herself later married Bayajidda, and from these unions came children — and those children became the founders of the seven original Hausa states: Daura, Kano, Zazzau, Gobir, Katsina, Rano, and Biram. These seven are the Hausa Bakwai — the True Seven — the foundation of one of the greatest civilisations in West African history.

Every Hausa person can trace themselves back to this story. The well in Daura still exists. It is still called Bayajidda's Well.`,
    },
    stories: [
      {
        title: 'The Iskoki and the Well',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Kindness & Hospitality',
        excerpt: 'A young woman who showed kindness to a spirit disguised as a beggar was rewarded with fertility and protection — while her proud neighbour suffered greatly.',
      },
      {
        title: 'The Scholar of Kano',
        image: '/images/drums-latest.jpg',
        theme: 'Education & Perseverance',
        excerpt: 'A barefoot boy who walked daily to hear scholars at the great mosque became the greatest jurist in the Sokoto Caliphate — proof that knowledge respects only effort.',
      },
      {
        title: 'Sarikin Aljan',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Spirit World & Respect',
        excerpt: 'The King of Spirits holds court beneath baobab trees at night. The respectful may be granted a wish. The rude are never seen again.',
      },
    ],
    culturalContext: `The legend of Bayajidda is the founding myth of the Hausa people and explains the origin of the seven original Hausa city-states. It is remarkable for its practical, heroic quality — a stranger earns his place not through birth or divine appointment, but through courage and action.`,
    narrator: 'Preserved in royal court traditions across northern Nigeria and Niger, and recorded by colonial historians in the early 20th century',
  },

  swahili: {
    tribeName: 'Swahili',
    heroImage: '/images/maasai-women-latest.jpg',
    originStory: {
      title: 'The Swahili Coast and the Spirit of the Sea',
      image: '/images/maasai-migration.jpg',
      theme: 'Trade & Cultural Fusion',
      readTime: '4 min read',
      story: `Long before the great dhow ships first appeared on the horizon — before the smell of cloves mixed with ocean air on Zanzibar, before the carved coral houses of Lamu rose from the mangrove swamp — the coastal people lived in harmony with the sea.

The sea was not merely water to them. It was a living being. It breathed in the mornings, sending the land breeze out over its face. It breathed in the evenings, pulling the sea breeze back across the shore. The elders called it the soul of the trade winds, and they said that those who listened closely enough could hear it thinking.

The story goes that the first Swahili fisherman — a man of the Bantu people who had come to the coast following the rivers down from the interior — was sitting on the shore one evening when the sea spoke to him.

Not in words. In the way the sea always speaks — in the rhythm of the waves, in the sound a shell makes when you hold it to your ear, in the pull of the tide on your ankles when you stand at the water's edge. He understood.

The sea said: I will give you fish. I will fill your nets. I will smooth my surface for your canoe. But in return, you must give something back. Not much. Just a portion. A recognition. A thanks.

The fisherman agreed. He returned a portion of every catch to the waters — a few fish released back into the sea, a handful of grain scattered on the surface, a prayer spoken facing the horizon. And the sea kept its promise.

And then, with each tide, new things appeared on the horizon. Sails. Unfamiliar sails, bearing unfamiliar shapes. Ships from Oman, broad and heavy with trade goods. Ships from Persia, their captains reading the stars. Ships from India, their hulls smelling of spices. Later, ships from China, their crews astonished by the size of the African fish.

Each ship brought things. Porcelain and silk. Glass beads and cotton cloth. Dates and incense. And each ship took things back. Ivory and gold. Mangrove wood for building. Ambergris from the deep sea. And human beings, in the dark years of the slave trade — a wound in the story that the sea has never stopped grieving.

Over generations, the coastal people did not simply trade goods. They traded words, and prayers, and recipes, and blood. They married into these distant lands. They took Arabic names alongside Bantu names. They built mosques from coral stone and prayed toward Mecca while still listening to the voice of the sea. They cooked biryani in pots that had once held millet. They wrote Swahili in Arabic script.

This is how the Swahili became who they are. Not one people, but the meeting point of many peoples, woven together by the ocean that never stopped giving. The pact the first fisherman made with the sea is still honoured. When a Swahili fisherman launches his ngalawa into the morning tide, he still speaks a prayer — still sends something back to the water.

The sea still listens.`,
    },
    stories: [
      {
        title: 'The Jinn of Lamu',
        image: '/images/drums-latest.jpg',
        theme: 'Spirit World & Protection',
        excerpt: 'A jinn inhabits the oldest well in Lamu and protects the island from storms. Fishermen leave offerings of dates and incense each year before the long-distance fishing season.',
      },
      {
        title: 'The Poet Queen of Pate',
        image: '/images/maasai-women-latest.jpg',
        theme: 'Art & Power',
        excerpt: 'A 15th century queen composed taarab poems so powerful that her enemies lowered their weapons when she sang before battle.',
      },
      {
        title: 'The Ship That Returned from the Edge',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Exploration & Wonder',
        excerpt: 'A Swahili captain saved by a great whale returned speaking of islands of ice and birds that could not fly. No one believed him until Chinese maps confirmed the account.',
      },
    ],
    culturalContext: `The Swahili origin story is unique in African oral tradition because it does not speak of a single ancestral figure or a divine act of creation. It speaks instead of a relationship — between a people and a sea — and of the transformation that comes from sustained encounter with the wider world.`,
    narrator: 'Preserved in taarab song traditions, coastal oral histories, and the chronicles of Swahili city-states along the East African coast',
  },

  amhara: {
    tribeName: 'Amhara',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'The Queen of Sheba and King Solomon',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Royal Lineage & Divine Covenant',
      readTime: '6 min read',
      story: `In the age of great kings, when the world was still young enough that the divine and the human could meet face to face, there ruled in the ancient land of Axum a queen of extraordinary wisdom and beauty.

Her people called her Makeda. The Hebrew scriptures would call her the Queen of Sheba. History would call her the mother of a dynasty that lasted three thousand years.

Makeda had heard stories of King Solomon of Jerusalem — a king so wise that his judgements resolved disputes that had festered for generations, a king whose understanding of the natural world was so deep that he could speak to birds, a king who had built a temple so magnificent that people said God himself had descended to inhabit it.

Makeda was not easily impressed. She had governed Axum with a wisdom that was entirely her own — managing trade routes across the Red Sea, negotiating with the Pharaohs of Egypt, maintaining alliances with the kingdoms of Arabia. She needed no man's counsel. But she was genuinely curious, and curiosity is its own kind of courage.

She gathered her caravan. It was, by all accounts, enormous — hundreds of camels bearing gold in quantities that strained the imagination, precious stones from the mines of her highland kingdom, spices and incense that the ancient world coveted above almost everything else. She brought gifts worthy of a great queen visiting a great king.

The journey from Axum to Jerusalem took months. Makeda arrived to find Solomon exactly as described: brilliant, searching, restless with intelligence. He welcomed her into his court and they began what the Ethiopian tradition calls a meeting of minds unlike any before or since.

She tested him with riddles — riddles so intricate that his court held their breath with each one. He answered every one. He tested her in return with the subtleties of mathematics and astronomy and law. She answered them. They talked from morning to evening, day after day, week after week. She stayed for six months.

In those six months, Makeda absorbed everything. She asked questions that no one else thought to ask. She recorded everything in her memory and in the writings of her scribes. She learned governance, philosophy, agriculture, architecture — and she shared, in return, her own deep knowledge of the trade routes, of the stars as seen from the southern hemisphere, of the medicines that grew in her highland forests.

On the last night before her departure, Solomon gave a great feast. The table was laden with the most flavoured foods — spiced and salted, designed to make the guest thirsty. Makeda ate and was delighted. But later that night, thirst woke her, and she reached for a cup of water.

Solomon appeared. "You agreed to take nothing from my palace without permission."

It was a jest, half-serious. He asked for nothing more than what he had already had — her company, her presence, her intelligence. From that night came a child.

Makeda returned to Axum and gave birth to a son: Menelik. He grew into a man of extraordinary gifts — his mother's wisdom, his father's brilliance, and something all his own: a gravity, a certainty, a sense of belonging to something larger than himself.

When Menelik was old enough, he travelled to Jerusalem to meet his father. Solomon wept when he saw him — recognised himself in the boy's bearing. He wanted to keep him, to name him his heir, to make him king of Israel.

But Menelik had heard the voice of his own kingdom calling him home. "My people are in Axum," he told his father. "I belong there."

He returned to Ethiopia — and, it is said, he did not return empty-handed. The sacred Ark of the Covenant, the holiest object in the Hebrew tradition, the chest that contained the tablets of God's law given to Moses — Menelik brought it to Ethiopia.

It rests, the Ethiopian Orthodox Church declares with absolute conviction, in the chapel of St. Mary of Zion in Axum, to this very day. A guardian monk is appointed to keep it. No one else is allowed to see it.

From Makeda and Menelik's lineage descended every Emperor of Ethiopia — a dynasty that traced itself to King Solomon, to the line of David, and through David to the earliest patriarchs of scripture. The last Emperor, Haile Selassie, was the 225th in that line.

Three thousand years. One story.`,
    },
    stories: [
      {
        title: 'The Nine Saints',
        image: '/images/drums-latest.jpg',
        theme: 'Faith & Miracles',
        excerpt: 'Nine missionaries spread Christianity across the Ethiopian highlands in the 5th century, each performing miracles. Their churches are still pilgrimage sites today.',
      },
      {
        title: 'Emperor Lalibela\'s Dream',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Divine Vision & Creation',
        excerpt: 'A 12th century emperor dreamed of a heavenly Jerusalem and was instructed to recreate it on earth — carving eleven churches from solid rock that still stand today.',
      },
      {
        title: 'The Coffee Discovery',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Discovery & Legacy',
        excerpt: 'A goatherd named Kaldi noticed his goats dancing after eating red berries. Monks made a drink from them to stay awake during night prayers — and coffee was born.',
      },
    ],
    culturalContext: `The story of the Queen of Sheba and King Solomon is not merely mythology for the Amhara — it is the foundation of the Ethiopian state. The Kebra Nagast, a 14th century Ethiopian text, records this story in full and served as the constitutional basis for the legitimacy of Ethiopia's emperors for centuries.`,
    narrator: 'Preserved in the Kebra Nagast (Glory of Kings), Ethiopian Orthodox Church tradition, and royal oral histories dating back over a thousand years',
  },

  berber: {
    tribeName: 'Berber (Amazigh)',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'Tin Hinan, Mother of the Tuareg',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Ancestral Journey & Founding',
      readTime: '5 min read',
      story: `In the age before the great Sahara was a desert — when its lakes still shimmered and its grasslands still sang with the calls of animals that no longer exist — there lived a queen of extraordinary bearing in the highlands of the Tafilalt region in what is now Morocco.

Her name was Tin Hinan. She was said to be descended from the mountains themselves — tall, self-contained, moving through the world with the kind of authority that does not need to announce itself. She was a noblewoman of the Amazigh people, born into a lineage of queens, familiar with the stars and the seasons and the ancient routes across the highland.

But drought came. The kind of drought that is not merely a lack of rain — it is a rupture in the order of things, a sign that the land can no longer sustain what it has always sustained. The wells dropped. The livestock grew thin. The old men looked at one another with the particular expression of people who understand that something fundamental has ended.

Tin Hinan did not wait for permission. She gathered her handmaiden, a loyal woman named Takamat, and she set out south across the sands.

They had very little. A camel — or perhaps two. A basket of dates. Tin Hinan's knowledge of the stars. Takamat's knowledge of where to find water by reading the ground. Between them, they had everything necessary.

For weeks they walked. The dates ran out. The heat during the day was a physical weight. At night the cold was brutal and the stars were enormous. There were days when the horizon offered nothing — just sand, and more sand, and the occasional black rock like a bad tooth.

Then one morning Takamat noticed something: a column of ants moving with purpose across the sand, each one carrying a grain. Where there are ants carrying grain, there is grain. Where there is grain, there is life. They followed the ants and found a small store of millet seeds buried by some creature beneath a flat rock. They ate. They continued.

At last, after a journey that the stories do not put a definite number of weeks to, Tin Hinan came to the Hoggar Mountains — a vast plateau of volcanic rock rising from the Algerian Sahara, dramatic and ancient, the kind of landscape that makes you feel simultaneously small and permanent.

She stood at the edge of this plateau and looked out over the landscape that would become her people's home. She declared it so. No ceremony, no witnesses. Just a woman with the authority to claim what the land was offering her.

She settled there. She gathered around her the scattered peoples of the desert who had been wandering without a centre, without a mother-figure, without a home. She became their queen: lawgiver, healer, guardian, mother.

She lived a long life in the Hoggar. When she died, she was buried in royal fashion — in a great tomb on the plateau, her arm laden with gold and silver bracelets, her body arranged for eternity.

The tomb sat undisturbed for centuries. Then in 1925, archaeologists excavated it. They found a woman, exactly as the stories described: tall, laid in state, her arm heavy with bracelets. The Tuareg people, hearing of the discovery, came from every corner of the desert to say what their grandparents' grandparents had always said: "She is our grandmother. She is real."

She was.

The Tuareg today — the blue-robed people of the Sahara, the last great desert nomads, the keepers of the ancient caravan routes — trace their matrilineal descent to Tin Hinan. They call her Tamenoukalt: the Queen. In Tamazight, the Amazigh language, there is a phrase: "We are all children of Tin Hinan." It is not metaphor. It is genealogy.`,
    },
    stories: [
      {
        title: 'The Tifinagh Script',
        image: '/images/kitenge-latest.jpg',
        theme: 'Knowledge & Identity',
        excerpt: 'The ancient Amazigh script was said to have been taught by the star Amanar (Orion). Each symbol carries the shape of the land: mountains, water, roads.',
      },
      {
        title: 'The Desert Guardian',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Ancestral Protection',
        excerpt: 'Tuareg caravans crossing treacherous stretches of the Sahara speak of a luminous figure on the horizon — the spirit of Tin Hinan, still watching over her children.',
      },
      {
        title: 'The Carpet Weaver\'s Prayer',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Art & Love',
        excerpt: 'An Amazigh grandmother encoded every protective symbol she knew into a carpet for her son going to war. He returned safely. The carpet now hangs in a Moroccan museum.',
      },
    ],
    culturalContext: `Tin Hinan is unique among African founding ancestors because she is not a mythological figure — she is an archaeological reality. Her tomb exists and has been excavated. This convergence of legend and physical evidence gives her story an unusual power: it cannot be dismissed as "merely" myth.`,
    narrator: 'Preserved in Tuareg oral tradition across Algeria, Mali, and Niger, and verified by the 1925 archaeological excavation of her tomb in the Hoggar Mountains',
  },

  fulani: {
    tribeName: 'Fulani (Fulɓe)',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'The First Cow and the Fulani',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Divine Gift & Pastoral Covenant',
      readTime: '4 min read',
      story: `In the time when the world was new and the Sahara still green — when rain came every season and the rivers ran wide and the grasses grew as tall as a standing man — God looked down upon the earth and surveyed what he had made.

He saw much that pleased him. But he saw one thing that did not: a man standing alone in a vast plain, with no family and no food. The man was thin in the way that speaks not of illness but of long endurance — the thinness of a person who has been waiting for something they cannot name, patient across years, facing the rising sun each morning with open hands.

God was moved. Not by the man's need alone — God has seen need everywhere since the beginning — but by the man's patience. By the open hands.

He sent from heaven a gift. A great red cow — the most beautiful animal ever created, with horns that curved like the new moon and eyes that were deep and still and knowing. The cow descended gently. The man reached out his hand and the cow put her head into his palm, and that was that.

God spoke: "This cow is your family. Care for her, drink from her, protect her, and she will provide for you all your days. But you must keep moving. The earth is wide, and you must be worthy of it. Stay nowhere too long. The grass needs time to grow back."

The man became the first Fulani.

He walked with his cow through the green Sahara, and the cow gave him milk every morning. Other men saw him and were drawn to him — there was something in the way he walked with the animal, something in the covenant that was visible even to strangers. They asked if they could join him. He said yes, as long as they understood: the cattle came first. Not the man. Not his comfort. The cattle.

His children and their children multiplied. Their cattle multiplied. They walked the great belt of West Africa from Senegal to Sudan, following the rain, reading the grass, always moving. The Hausa city-states grew up along their routes. The Sahel became the Fulani world.

The Fulani say: "A man without cattle is not yet complete." They do not mean this as cruelty toward the poor. They mean it as a statement about the nature of the Fulani person — that to be fully who you are, you must be in relationship with something larger than yourself. The cattle are that relationship. They represent the original covenant, the open hand, the gift from a God who was moved by patience.

When a Fulani elder dies, his favourite cow is brought to stand at the grave — because everything good in his life, she was part of. And somewhere in the spirit world, the first Fulani is watching, open-handed, grateful, still walking.`,
    },
    stories: [
      {
        title: 'The Sharo Initiation',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Courage & Manhood',
        excerpt: 'Young Fulani men are publicly flogged and must not flinch in the Sharo ceremony. A man who once wept so hard accidentally made a river still called by his name.',
      },
      {
        title: 'The Pulaaku Code',
        image: '/images/drums-latest.jpg',
        theme: 'Honour & Patience',
        excerpt: 'God tested a Fulani elder with forty years of hardship. The elder never complained — and was rewarded with the most fertile grazing land in all of West Africa.',
      },
      {
        title: 'The River That Listened',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Nature & Connection',
        excerpt: 'A herder crossing the flooding Niger River sang a cattle-calming song — and the river slowed just enough for the herd to cross. Herders still sing over turbulent waters.',
      },
    ],
    culturalContext: `The Fulani origin story is fundamentally a story about relationship — between people and animals, between humans and God, between patience and reward. It explains not just where the Fulani came from, but why they move, and why the treatment of cattle is a moral, not merely a practical, matter.`,
    narrator: 'Preserved in Fula (Fulfulde) oral tradition across West and Central Africa, particularly in the pastoral communities of the Sahel',
  },

  wolof: {
    tribeName: 'Wolof',
    heroImage: '/images/African-latest.jpg',
    originStory: {
      title: 'Ndiadiane Ndiaye and the Founding of the Jolof Empire',
      image: '/images/maasai-women-latest.jpg',
      theme: 'Miraculous Leadership & Unity',
      readTime: '4 min read',
      story: `The Jolof Empire was born from a miracle in water.

The legend tells of a morning on the banks of the Senegal River when the ordinary course of events was interrupted by the impossible. A man appeared from the depths of the river — not drowned, not gasping, not struggling, but walking calmly across the surface of the water as though it were dry ground. He stepped out of the river and onto the bank as one steps from a doorway into a room.

His name was Ndiadiane Ndiaye.

No one knew his family. He had arrived from nowhere — or from the spirit world beneath the river, which for the Wolof is not a metaphor but a geography, a real place where the ancestors live and occasionally send messengers to the world of the living.

He sat with the people of the riverbank and began to talk. And this is what astonished them most: not the miracle of the water, but the quality of his speech. He spoke of disputes that had been burning between neighbouring clans for years — disputes that had produced raids and counter-raids and deaths and vendettas — and he offered solutions that were so obviously right, so clearly just, that the disputants agreed before they had time to resent agreeing.

He healed a child who had been sick for weeks. He predicted where the rains would fall that season and was right. He told an elder the name of his dead wife's mother, whom no one living could have known.

The people began to say: this man is not entirely of this world. They said it without fear. They said it the way you say something about the weather — as an observation about reality.

The chiefs gathered. This was not a simple matter: the Wolof chiefs did not give up power easily, and they had no tradition of subordinating themselves to a single leader. But they had also never seen anything like this. They offered Ndiadiane Ndiaye the chieftaincy — unanimously, without negotiation, which was itself a kind of miracle.

He accepted. He became the first Buur ba Jolof — the Lord of the Jolof, the king. Under his guidance, the scattered Wolof communities became one nation. He created the administrative system, the hierarchy of nobles and griots and artisans and commoners. He established the law. He made the Jolof Empire the dominant power in the Senegambia region for two centuries.

And then, one evening, as his people watched from the riverbank, Ndiadiane Ndiaye walked back into the river. He did not say goodbye. He walked until the water was at his ankles, then his knees, then his waist, then his chest, and then he was gone.

No one wept. They understood: the spirits give what they give, and reclaim what was always theirs. The gift he had given them — the empire, the law, the unity — remained. And the river where he arrived and departed is still, to this day, a place where the Wolof go to think about things that matter most.`,
    },
    stories: [
      {
        title: 'The Griot\'s Memory',
        image: '/images/drums-latest.jpg',
        theme: 'Memory & Heritage',
        excerpt: 'A griot who could remember nothing as a child was touched on the tongue by an ancestor in a dream — and woke knowing every song and genealogy of the Wolof people.',
      },
      {
        title: 'The Lion and the Griot',
        image: '/images/maasai-livestock2.jpg',
        theme: 'Art & Power',
        excerpt: 'A fearless griot sang praise-songs directly to a pride of lions. The lions lay down peacefully. Praise is a weapon more powerful than any spear.',
      },
      {
        title: 'Why the Baobab Faces Down',
        image: '/images/maasai-necklaces2.jpg',
        theme: 'Humility & Resilience',
        excerpt: 'The proudest tree refused to be humble when God asked. God replanted it upside down — roots in the air. The baobab became the Tree of Life anyway.',
      },
    ],
    culturalContext: `The legend of Ndiadiane Ndiaye is central to Wolof political identity. The fact that the first Buur ba Jolof came from outside — from the river, from the spirit world — makes the institution of kingship itself something beyond human politics. It was divine in origin, and therefore legitimate in a way that mere conquest could never be.`,
    narrator: 'Preserved by Wolof griots (gewël) across Senegal and the Gambia, and recorded by colonial-era scholars and post-independence Senegalese historians',
  },
};