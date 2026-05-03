import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/tribe-page.css';

const tribeData = {
  maasai: {
    name: 'Maasai',
    region: 'East Africa',
    location: 'Kenya & Tanzania',
    population: '2 million+',
    heroImage: '/images/drums-latest.jpg',
    tagline: 'Warriors of the East African savannah, keepers of ancient tradition.',

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
      taboos: {
        title: 'Taboos',
        content: `The Maasai observe many sacred taboos passed down through generations. 
        It is forbidden to eat wildlife the Maasai are pastoralists and consuming game is considered beneath their dignity. 
        Women are not permitted to own cattle, as livestock belongs exclusively to the men and the clan. 
        Speaking ill of the elders is a serious transgression that can result in social exclusion and curses. 
        A young warrior (moran) is not permitted to eat meat that has been seen by a married woman 
        doing so is believed to weaken his strength and courage. 
        Entering another man's home without permission is considered deeply disrespectful, 
        as the home is a sacred space belonging to the wife who built it.`,
      },
      myths: {
        title: 'Myths & Legends',
        content: `The Maasai believe that Enkai (God) gave all the cattle in the world to the Maasai people at the beginning of time. 
        This myth serves as a spiritual justification for cattle raiding, which was historically practiced against neighbouring tribes
        the Maasai believed they were simply reclaiming what was rightfully theirs. 
        The Maasai also tell of Leeyo, a father figure who bargained with death itself to bring back his son
        a story about love, sacrifice, and the fragile boundary between the living and the spirit world. 
        The rainbow is seen as a divine bridge between heaven and earth, a sign that Enkai is watching. 
        Lightning is feared as the Red God's anger, while gentle rain is the blessing of the Black God.`,
      },
      food: {
        title: 'Food',
        content: `The traditional Maasai diet consists almost entirely of cattle products milk, meat, and blood. 
        Fresh and fermented milk, known as kule naoto, is a daily staple consumed by all ages. 
        Blood is drawn from live cattle by making a small incision in the jugular vein — it is mixed 
        with milk and consumed during ceremonies, illness recovery, and by warriors after long journeys. 
        The cattle are rarely slaughtered for food alone; meat is reserved for celebrations, healing rituals, 
        and rites of passage. Honey wine (mead) is brewed for special occasions. 
        In modern times, ugali (maize porridge), rice, and vegetables have been adopted through contact 
        with neighbouring Bantu communities and urban markets.`,
      },
      housing: {
        title: 'Housing',
        content: `Maasai homes, known as inkajijik, are constructed entirely by women building the home is 
        considered a woman's sacred responsibility and a mark of her skill and status. 
        The structure uses a framework of interwoven branches and saplings plastered with a mixture 
        of mud, grass, ash, and cow dung, which dries into a hard, weatherproof shell. 
        The low, oval design is suited to the nomadic lifestyle it can be dismantled and rebuilt as the 
        community moves to new grazing land. Inside, a central fire provides warmth and cooking heat, 
        with smoke escaping through a small opening. A larger enclosure called an enkang surrounds 
        a cluster of homes, fenced with sharp acacia branches to protect livestock from lions and hyenas at night.`,
      },
      clothing: {
        title: 'Clothing & Adornment',
        content: `The Maasai are instantly recognisable by their striking red shuka a blanket-like cloth 
        worn draped over the body. Red is sacred, symbolising courage, strength, and the blood of warriors. 
        Elaborate beadwork is the heart of Maasai adornment women spend countless hours crafting 
        intricate collars, bracelets, anklets, and earrings by hand. Each colour carries deep meaning: 
        white represents purity and health, blue represents the sky and water, green represents the land 
        and sustenance, orange represents warmth and friendship, red represents bravery and blood. 
        Both men and women traditionally stretch their earlobes, adorned with beaded plugs and metal hoops. 
        Junior warriors grow their hair long and dye it red with ochre mixed with animal fat, 
        while elders shave their heads as a mark of wisdom and authority.`,
      },
      religion: {
        title: 'Religion',
        content: `The Maasai are monotheistic, worshipping a single deity called Enkai, 
        who exists in two complementary forms. Enkai Narok the Black God is benevolent, 
        associated with rain, green pastures, and abundance. Enkai Nanyokie the Red God 
        is wrathful, associated with lightning, drought, and punishment for wrongdoing. 
        The laibon, a hereditary spiritual leader and medicine man, serves as the 
        intermediary between the community and Enkai performing healing rituals, 
        offering prophecies, and blessing warriors before battle. 
        Prayer is woven into daily life: before meals, at the birth of children, before long journeys. 
        Sacred trees particularly the African wild olive are gathering places for prayer and ceremony, 
        believed to be dwelling places of ancestral spirits.`,
      },
      rites: {
        title: 'Rites of Passage',
        content: `The Maasai life cycle is structured around a series of profound rites of passage. 
        Three months after birth, the Enkiama naming ceremony welcomes the child into the community. 
        Boys progress through age-sets: junior warrior (moran), senior warrior, junior elder, and senior elder
        each transition marked by ceremony and new responsibilities. 
        The most celebrated rite is Eunoto, the coming-of-age ceremony in which a warrior's long, 
        ochre-dyed hair is shaved off by his mother, marking his transition to senior warrior status. 
        He then adopts black clothing and takes on community leadership duties. 
        For girls, ear-piercing and the wearing of beaded adornments mark entry into womanhood. 
        Marriage involves the payment of bride price in cattle, negotiated by elders from both families. 
        Elders are the most honoured members of society their age is their authority, 
        and their blessing is sought at every major community decision.`,
      },
    },

    language: {
      name: 'Maa (Maasai)',
      family: 'Nilo-Saharan > Eastern Sudanic > Nilotic',
      speakers: 'Approximately 1.5 million speakers',
      overview: `Maa is the language of the Maasai people, spoken across Kenya and Tanzania. 
      It belongs to the Nilotic branch of the Nilo-Saharan language family
      a group of languages stretching from Uganda to Sudan. 
      Maa is a tonal language, meaning the pitch of a syllable can change a word's meaning entirely. 
      It has a rich grammatical structure with noun classes, verb extensions, and complex tense systems. 
      While Maa has no traditional writing system, it has been documented using the Latin alphabet 
      by missionaries and linguists since the 19th century. 
      Today it is spoken alongside Swahili and English, and efforts are underway to preserve it 
      through community schools and oral tradition recordings.`,
      phrases: [
        { phrase: 'Sopa', meaning: 'Hello (to one person)' },
        { phrase: 'Sopat', meaning: 'Hello (to a group)' },
        { phrase: 'Ero supa', meaning: 'I am well' },
        { phrase: 'Ashe', meaning: 'Thank you' },
        { phrase: 'Enkai aiyiook', meaning: 'God bless you' },
        { phrase: 'Keserian ingishu', meaning: 'How are your cattle?' },
      ],
    },

    market: {
      overview: `The Maasai are renowned traders and craftspeople across East Africa. 
      Their open-air markets are vibrant gathering places where communities exchange livestock, 
      share news, and celebrate culture. Maasai artisans particularly women
      are celebrated internationally for their intricate beadwork, 
      which carries cultural symbolism in every colour and pattern.`,
      products: [
        { name: 'Beaded Collar', price: '$45', description: 'Multi-layered ceremonial collar handwoven by Maasai women using glass beads.' },
        { name: 'Red Shuka', price: '$35', description: 'Traditional Maasai blanket in the iconic red and black plaid pattern.' },
        { name: 'Wrist Coil Bracelet', price: '$25', description: 'Tightly coiled glass bead bracelet, a symbol of friendship and social bond.' },
        { name: 'Carved Rungu', price: '$60', description: 'Traditional Maasai throwing club carved from hardwood, carried by warriors and elders.' },
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

    history: {
      overview: `The Zulu people are the largest ethnic group in South Africa, with a history shaped by 
      one of the most remarkable military expansions in African history. Under the leadership of Shaka Zulu 
      in the early 19th century, a small clan was transformed into a formidable kingdom that reshaped 
      the entire southern African region. The Zulu fought fiercely against British colonialism, 
      achieving victories that shocked the world, before ultimately being incorporated into the 
      colonial state. Today, Zulu culture remains a living, vibrant force in South African society.`,
      timeline: [
        { year: '1709', event: 'The Zulu clan is founded by Zulu kaNtombhela in what is now KwaZulu-Natal.' },
        { year: '1816', event: 'Shaka Zulu seizes power and begins a revolutionary military transformation of the Zulu nation.' },
        { year: '1820s', event: 'The Mfecane — a period of widespread warfare and migration triggered by Zulu expansion across southern Africa.' },
        { year: '1879', event: 'Anglo-Zulu War: the Zulu army defeats the British at the Battle of Isandlwana — one of Britain\'s worst colonial defeats.' },
        { year: '1906', event: 'The Bambatha Rebellion — the last armed Zulu uprising against colonial taxation and land seizure.' },
        { year: '1994', event: 'South Africa becomes a democracy; Zulu cultural heritage is recognised and protected under the new constitution.' },
      ],
    },

    culture: {
      taboos: {
        title: 'Taboos',
        content: `Zulu society is governed by a deep code of respect and spiritual awareness that shapes everyday behaviour. 
        A daughter-in-law (makoti) must never speak the names of her father-in-law or his male relatives
        a practice called ukuhlonipha, meaning deep respect. She must cover her head and shoulders in their presence. 
        It is forbidden to whistle at night, as it is believed to attract evil spirits and bad luck to the home. 
        Pointing at a grave with your finger is considered an invitation for death to follow you. 
        A pregnant woman must not attend a funeral, as it is believed the spirit of the deceased 
        can enter the unborn child. Crossing over a sleeping person is forbidden
        it is said to stunt their growth or bring illness.`,
      },
      myths: {
        title: 'Myths & Legends',
        content: `Zulu mythology is rich with stories of creation, ancestral spirits, and supernatural beings. 
        The supreme creator is Unkulunkulu the Ancient One who emerged from a bed of reeds (uhlanga) 
        and created all people, animals, and the natural world. He taught humans how to make fire, 
        grow food, and live together. The Tokoloshe is a feared mythological creature 
        a small, mischievous water sprite sent by witches to cause illness, nightmares, and death. 
        Many Zulu people sleep with their beds raised on bricks to keep the Tokoloshe from reaching them. 
        The Inkanyamba is a massive serpent said to live in waterfalls and rivers, 
        causing violent storms when angered. Ancestral spirits, known as amadlozi, 
        are ever-present they guide, protect, and sometimes punish the living.`,
      },
      food: {
        title: 'Food',
        content: `Traditional Zulu cuisine is hearty and deeply connected to the land. 
        Uphuthu a crumbly maize meal is the staple food, eaten daily and served with 
        amasi (fermented milk), beans, or meat stew. Umngqusho is a beloved dish of 
        samp (crushed dried corn) and beans, slow-cooked until soft and rich. 
        Meat especially beef, goat, and chicken is central to celebrations and ritual feasts. 
        During ceremonies, an animal is slaughtered and its blood offered to the ancestral spirits 
        before the feast begins. Umqombothi is the traditional Zulu beer, brewed from maize and sorghum
        it plays a central role in ceremonies, coming-of-age celebrations, and community gatherings. 
        Wild spinach (imfino) and pumpkin are common vegetables, often cooked with peanuts.`,
      },
      housing: {
        title: 'Housing',
        content: `The traditional Zulu homestead is called an umuzi a carefully arranged 
        circular settlement that reflects the social structure of the family. 
        The main house faces the cattle kraal (isibaya), which occupies the centre of the homestead
        cattle are the heart of Zulu wealth and spiritual life, and their enclosure is sacred. 
        Traditional Zulu homes are beehive-shaped (iQhugwane), constructed from a dome of woven saplings 
        covered in tightly packed grass thatch. The entrance is low, requiring visitors to bow
        a mark of respect upon entering. The interior is divided into sleeping and cooking areas, 
        with a central hearth. Today, many Zulu families live in modern homes, but ceremonial 
        and rural homesteads still follow traditional layouts.`,
      },
      clothing: {
        title: 'Clothing & Adornment',
        content: `Zulu beadwork is one of the most sophisticated visual communication systems in the world. 
        Beaded items necklaces, armbands, aprons, and headbands carry encoded messages about 
        the wearer's age, marital status, and social standing. Colours have precise meanings: 
        red represents love and strong emotion; black represents marriage and regeneration; 
        white represents purity and spiritual connection. 
        Traditional male clothing includes animal skin skirts (ibheshu) and headbands during ceremonies. 
        Warriors historically wore full battle regalia cowhide shields, animal skin headbands, 
        and bundles of ostrich feathers. Women wear beaded skirts and elaborate chest adornments. 
        The isicholo a large, flat disc-shaped hat made of woven grass — is worn by married women 
        as a sign of their status.`,
      },
      religion: {
        title: 'Religion',
        content: `Zulu spiritual life centres on the veneration of ancestral spirits, known as amadlozi or izithunywa. 
        These spirits are believed to be the active guardians of the living
        they communicate through dreams, illness, and unusual events, guiding families and warning of danger. 
        When misfortune strikes, a diviner (sangoma) is consulted to identify which ancestor is calling 
        and what offering or ritual is required. The sangoma undergoes years of intensive training, 
        including periods of seclusion and spiritual initiation. 
        Animal sacrifice particularly of cattle and goats is a central act of worship, 
        connecting the living to the ancestors through shared feasting. 
        The supreme creator, Unkulunkulu, is acknowledged but considered too remote for direct prayer 
        it is through the amadlozi that the living reach the divine.`,
      },
      rites: {
        title: 'Rites of Passage',
        content: `Zulu rites of passage mark every major transition of life with ceremony and community celebration. 
        At birth, the umbilical cord is buried under the threshold of the home, binding the child 
        to the family homestead forever. The umemulo ceremony celebrates a young woman's coming of age
        she is dressed in full traditional regalia and presented to the community as a woman of honour. 
        Male initiation (ukusoka) involves circumcision and a period of seclusion in which boys 
        learn the responsibilities of manhood under the guidance of elders. 
        Zulu weddings are multi-day celebrations the umabo ceremony involves the bride's family 
        bringing gifts to the groom's homestead, while the lobola (bride price) negotiation, 
        conducted in cattle or its modern equivalent, formalises the union between families. 
        At death, the body is washed, wrapped, and buried facing east — toward the rising sun and new life.`,
      },
    },

    language: {
      name: 'isiZulu',
      family: 'Niger-Congo > Bantu > Nguni',
      speakers: 'Approximately 12 million first-language speakers',
      overview: `isiZulu is the most widely spoken home language in South Africa, 
      one of the country's eleven official languages. It belongs to the Nguni branch of the Bantu 
      language family, making it closely related to isiXhosa, siSwati, and isiNdebele. 
      isiZulu is a tonal, agglutinative language — meaning words are built by attaching prefixes 
      and suffixes to root words, producing long, complex words from simple building blocks. 
      The language is famous for its click consonants, borrowed from neighbouring Khoisan peoples. 
      isiZulu has a rich oral literary tradition, including praise poetry (izibongo) which 
      has been performed at royal courts for centuries and remains a living art form today.`,
      phrases: [
        { phrase: 'Sawubona', meaning: 'Hello (to one person) — literally "I see you"' },
        { phrase: 'Sanibonani', meaning: 'Hello (to a group)' },
        { phrase: 'Ngiyabonga', meaning: 'Thank you' },
        { phrase: 'Unjani?', meaning: 'How are you?' },
        { phrase: 'Ngikhona', meaning: 'I am well' },
        { phrase: 'Hamba kahle', meaning: 'Go well (farewell)' },
      ],
    },

    market: {
      overview: `Zulu craftspeople are renowned across southern Africa for the quality and 
      cultural depth of their work. From intricately beaded items to hand-carved wooden objects 
      and woven baskets, Zulu craft traditions have been passed down through generations of 
      skilled artisans. The markets of KwaZulu-Natal are vibrant centres of cultural exchange, 
      where traditional goods meet modern buyers from around the world.`,
      products: [
        { name: 'Beaded Love Letter', price: '$20', description: 'A beaded panel in which each colour combination carries a coded romantic message, traditionally given by young women to suitors.' },
        { name: 'Zulu Ceremonial Shield', price: '$95', description: 'Full-size cowhide shield in the black-and-white pattern of the Zulu royal regiment, used in ceremonies and dance.' },
        { name: 'Isicholo Hat', price: '$55', description: 'The iconic flat-disc hat worn by married Zulu women, woven from grass and dyed in traditional colours.' },
        { name: 'Carved Knobkerrie', price: '$70', description: 'A traditional hardwood club with a rounded head, carried as both a weapon and a symbol of male authority.' },
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

    history: {
      overview: `The Yoruba people are one of the largest and most influential ethnic groups in Africa, 
      with a civilisation that stretches back over a thousand years. Their ancient city of Ile-Ife 
      is considered the spiritual birthplace of the Yoruba people and all of humanity in Yoruba cosmology. 
      The Yoruba built powerful city-states and empires, developed sophisticated art traditions 
      that astonished European scholars, and created one of the world's most complex religious systems. 
      Through the transatlantic slave trade, Yoruba culture spread to the Americas
      forming the foundation of religions like Candomblé, Santería, and Vodou.`,
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
      taboos: {
        title: 'Taboos',
        content: `Yoruba society is governed by a rich set of taboos known as eewo, 
        which vary by family lineage, deity (orisha), and community. 
        Each family has its own set of forbidden foods and behaviours tied to their ancestral orisha. 
        For example, devotees of Ogun (the god of iron) may not eat dog meat, 
        while followers of Yemoja (goddess of water) avoid certain fish. 
        It is forbidden to call certain elders by their first name
        respectful titles must always be used. Sweeping at night is taboo in many households, 
        as it is believed to sweep away good fortune and invite poverty. 
        A pregnant woman must not attend certain masquerade (Egungun) festivals, 
        as the powerful ancestral spirits present are believed to affect the unborn child. 
        Crossing over a sleeping elder is deeply disrespectful and believed to bring misfortune.`,
      },
      myths: {
        title: 'Myths & Legends',
        content: `Yoruba mythology is one of the richest and most complex in the world. 
        In the beginning, Olodumare the supreme creator sent the orisha Obatala to earth 
        with a calabash of sand, a five-toed hen, and a chameleon. Obatala poured the sand into 
        the primordial waters, and the hen scattered it to form land
        this land became Ile-Ife, the cradle of the world. 
        Sango, the fourth king of the Oyo Empire, became the orisha of thunder after ascending to the sky
        his double-headed axe symbolises the power of lightning. 
        Anansi-like trickster stories feature Ijapa the tortoise, 
        who uses wit to outwit stronger animals teaching lessons about intelligence over brute force. 
        The 401 orishas of the Yoruba pantheon each govern a different domain of human life, 
        from love and rivers to war and smallpox.`,
      },
      food: {
        title: 'Food',
        content: `Yoruba cuisine is rich, flavourful, and deeply communal. 
        Pounded yam made by pounding boiled yam in a large wooden mortar until smooth and elastic
        is the most celebrated staple, eaten with soups like egusi (melon seed soup), 
        efo riro (spinach stew), and okra soup rich with fish, crayfish, and palm oil. 
        Jollof rice, now famous across West Africa and beyond, has its roots in the region's 
        vibrant cooking tradition. Akara (black-eyed pea fritters) are a beloved street food, 
        eaten for breakfast across Yorubaland. Ogi (fermented corn porridge) is the traditional 
        weaning food for babies and a comfort food for adults. Festivals and ceremonies are 
        marked by elaborate feasts no Yoruba celebration is complete without communal cooking 
        and the sharing of food as an act of blessing and community.`,
      },
      housing: {
        title: 'Housing',
        content: `The traditional Yoruba compound (agbo-ile) is one of the most sophisticated 
        housing arrangements in Africa. Multiple related families live together in a large rectangular 
        compound organised around a central courtyard (aafin), where community life unfolds
        children play, women cook, and elders hold court. Each family unit has its own rooms 
        opening onto the shared courtyard, creating a balance between private family life 
        and communal living. The entrance to a compound is marked by a large wooden door 
        intricately carved with scenes from mythology and daily life a statement of family identity. 
        The oldest male of the compound is its head and spiritual guardian. 
        The shrine of the family's orisha occupies a dedicated room, tended by designated family members. 
        Today, these compound structures survive in historic cities like Ibadan, Abeokuta, and Ile-Ife.`,
      },
      clothing: {
        title: 'Clothing & Adornment',
        content: `Yoruba clothing is a masterpiece of textile artistry. 
        Aso-oke a hand-woven fabric made from cotton or silk on a horizontal loom
        is the most prestigious cloth, worn at weddings, funerals, and festivals. 
        The agbada is a wide, flowing robe worn by men on formal occasions, 
        often embroidered at the neck and chest with elaborate patterns. 
        Women wear the iro (a wrap-around skirt), buba (a loose blouse), and gele
        a tightly wound headwrap that is itself an art form, tied in elaborate sculptural shapes. 
        Indigo-dyed adire cloth is a traditional Yoruba textile, 
        made using a resist-dyeing technique with intricate geometric patterns. 
        Coral beads hold sacred significance worn by royalty and high priests, 
        coral is believed to connect the wearer to Olokun, the orisha of the deep sea and wealth.`,
      },
      religion: {
        title: 'Religion',
        content: `The Yoruba religious system, known as Ifa, is one of the most sophisticated 
        indigenous spiritual traditions in the world recognised by UNESCO as an Intangible Cultural Heritage of Humanity. 
        At its centre is Olodumare, the supreme, unknowable God who created the universe. 
        Below Olodumare are the 401 orishas divine beings who govern every aspect of natural and human life. 
        Ifa divination, performed by a trained babalawo (priest), uses a system of 256 literary 
        chapters called odu to diagnose problems and prescribe solutions through verse, ritual, and sacrifice. 
        The Egungun masquerade represents the collective power of ancestral spirits visiting the living
        costumed performers channel these spirits during festivals, delivering blessings and warnings. 
        Through the transatlantic slave trade, Yoruba religion spread to Cuba (Santería/Lucumí), 
        Brazil (Candomblé), and Haiti (Vodou), where it continues to be practised by millions.`,
      },
      rites: {
        title: 'Rites of Passage',
        content: `Yoruba rites of passage are elaborate, communal, and spiritually charged. 
        On the seventh day after birth (or the ninth day for a girl), 
        the Ìkómọjáde naming ceremony takes place family and friends gather as elders 
        touch the baby's lips with honey (for sweetness), water (for clarity), 
        palm oil (for prosperity), and other sacred substances. 
        The name given carries deep significance it is believed to shape the child's destiny. 
        Initiation into the Ogboni society or Oro cult marks entry into adult community leadership. 
        Yoruba weddings are lavish multi-day events the introduction ceremony (introduction), 
        traditional engagement (eru iyawo), and the white wedding each serve distinct social functions. 
        Funeral rites are elaborate a life well-lived is celebrated with music, feasting, and dance. 
        The dead are buried within the family compound, remaining close to their descendants forever.`,
      },
    },

    language: {
      name: 'Yoruba',
      family: 'Niger-Congo > Atlantic-Congo > Volta-Niger',
      speakers: 'Approximately 45 million speakers worldwide',
      overview: `Yoruba is one of Africa's major languages and one of the most widely spoken 
      languages on the continent. It is a tonal language with three tones — high, mid, and low — 
      that change the meaning of words entirely. Yoruba has a rich literary tradition in both 
      oral and written form, with a sophisticated corpus of proverbs (owe), praise poetry (oriki), 
      and divination verse (odu Ifa). The language is spoken across Nigeria, Benin, and Togo, 
      and through the diaspora, versions of Yoruba survive in Cuba (Lucumí/Anago), 
      Brazil (Nagô), and Trinidad. Yoruba was one of the first African languages to have the 
      Bible translated into it, in 1850, by Bishop Samuel Ajayi Crowther — 
      himself a formerly enslaved Yoruba man who became a pioneering linguist.`,
      phrases: [
        { phrase: 'Ẹ káàbọ̀', meaning: 'Welcome' },
        { phrase: 'Ẹ káàárọ̀', meaning: 'Good morning' },
        { phrase: 'Ẹ káàsán', meaning: 'Good afternoon' },
        { phrase: 'Ẹ sẹ́', meaning: 'Thank you' },
        { phrase: 'Báwo ni?', meaning: 'How are you?' },
        { phrase: 'Mo wà dáadáa', meaning: 'I am fine' },
      ],
    },

    market: {
      overview: `The Yoruba have been master traders for centuries 
      their markets (ọjà) are among the oldest and most organised in Africa. 
      The Oja Oba (King's Market) in Ibadan and the markets of Lagos have been 
      commercial hubs connecting West Africa to trans-Saharan and Atlantic trade routes for generations. 
      Yoruba artisans produce some of the finest bronzes, textiles, and woodcarvings in the world.`,
      products: [
        { name: 'Aso-oke Fabric', price: '$90', description: 'Hand-woven ceremonial cloth in gold, navy, and burgundy, worn at Yoruba weddings and festivals.' },
        { name: 'Ife Bronze Head', price: '$180', description: 'A reproduction of the famous 12th-century Ile-Ife naturalistic bronze portrait heads, cast using the lost-wax method.' },
        { name: 'Adire Cloth', price: '$55', description: 'Indigo-resist dyed cloth with geometric patterns, a signature Yoruba textile tradition from Abeokuta.' },
        { name: 'Gele Headwrap', price: '$40', description: 'A premium aso-oke headwrap for women, pre-shaped into the sculptural styles worn at Yoruba ceremonies.' },
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

const TABS = ['History', 'Culture', 'Language', 'Market'];

const TribePage = () => {
  const { tribeName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('History');
  const [activeAccordion, setActiveAccordion] = useState('taboos');

  const tribe = tribeData[tribeName?.toLowerCase()];

  if (!tribe) {
    return (
      <>
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
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tp-tab ${activeTab === tab ? 'tp-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="tp-content">

          {activeTab === 'History' && (
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

          {activeTab === 'Culture' && (
            <div className="tp-culture">
              <div className="tp-culture-list">
                {cultureKeys.map((item) => (
                  <button
                    key={item.key}
                    className={`tp-culture-item ${activeAccordion === item.key ? 'active' : ''}`}
                    onClick={() => setActiveAccordion(item.key)}
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

          {activeTab === 'Language' && (
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

          {activeTab === 'Market' && (
            <div className="tp-market">
              <div className="tp-market-overview">
                <h2>Marketplace</h2>
                <p>{tribe.market.overview}</p>
              </div>
              <div className="tp-market-grid">
                {tribe.market.products.map((product, i) => (
                  <div key={i} className="tp-product-card">
                    <div className="tp-product-image" />
                    <div className="tp-product-body">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <div className="tp-product-footer">
                        <span className="tp-product-price">{product.price}</span>
                        <button className="tp-product-btn">View →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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