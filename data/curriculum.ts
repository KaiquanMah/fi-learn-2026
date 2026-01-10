import { Level, Topic } from '../types';

export const curriculumLevels: Level[] = [
  // Level 0 (Existing)
  {
    id: 'level-0',
    title: 'Level 0: The Absolute Basics',
    description: 'Familiarization with sounds, alphabet, and immediate survival phrases.',
    topics: [
      {
        id: 'alphabet',
        title: 'Alphabet & Pronunciation',
        description: 'Master the sounds of Finnish. Remember: Stress is always on the first syllable!',
        vocab: [
          { fi: 'Sata', en: 'Hundred', context: 'Compare "A" sound vs "Ä"' },
          { fi: 'Säätä', en: 'Weather (partitive)', context: 'Compare "Ä" sound' },
          { fi: 'Kuka', en: 'Who', context: 'Short "K"' },
          { fi: 'Kukka', en: 'Flower', context: 'Double "KK" - pause slightly' },
          { fi: 'Työ', en: 'Work', context: 'Diphthong "Yö"' },
          { fi: 'Yö', en: 'Night', context: 'Diphthong "Yö"' },
          { fi: 'Juna', en: 'Train', context: 'J is pronounced like Y in Yes' },
          { fi: 'Rauha', en: 'Peace', context: 'Rolled R' },
          { fi: 'Puhua', en: 'To speak', context: 'H is always pronounced' }
        ],
        sentences: [
            { fi: 'Minä olen...', en: 'I am...' }
        ]
      },
      {
        id: 'greetings',
        title: 'Greetings & Politeness',
        description: 'Essential phrases for daily interaction.',
        vocab: [
          { fi: 'Moi', en: 'Hi', context: 'Informal' },
          { fi: 'Hei', en: 'Hello', context: 'Standard' },
          { fi: 'Hyvää huomenta', en: 'Good morning', context: 'Morning only' },
          { fi: 'Hyvää päivää', en: 'Good day', context: 'Formal' },
          { fi: 'Hyvää iltaa', en: 'Good evening', context: 'Evening' },
          { fi: 'Hyvää yötä', en: 'Good night', context: 'Before bed' },
          { fi: 'Kiitos', en: 'Thank you', context: 'General' },
          { fi: 'Anteeksi', en: 'Sorry', context: 'Apology' },
          { fi: 'Näkemiin', en: 'Goodbye', context: 'Formal' }
        ],
        sentences: [
          { fi: 'Mitä kuuluu?', en: 'How are you?' },
          { fi: 'Hauska tutustua.', en: 'Nice to meet you.' },
          { fi: 'Nähdään!', en: 'See you!' }
        ]
      },
      {
        id: 'numbers-0-10',
        title: 'Numbers 0–10',
        description: 'Counting your first ten items.',
        vocab: [
          { fi: 'Nolla', en: 'Zero', context: '0' },
          { fi: 'Yksi', en: 'One', context: '1' },
          { fi: 'Kaksi', en: 'Two', context: '2' },
          { fi: 'Kolme', en: 'Three', context: '3' },
          { fi: 'Neljä', en: 'Four', context: '4' },
          { fi: 'Viisi', en: 'Five', context: '5' },
          { fi: 'Kuusi', en: 'Six', context: '6' },
          { fi: 'Seitsemän', en: 'Seven', context: '7' },
          { fi: 'Kahdeksan', en: 'Eight', context: '8' },
          { fi: 'Yhdeksän', en: 'Nine', context: '9' },
          { fi: 'Kymmenen', en: 'Ten', context: '10' }
        ],
        sentences: [
          { fi: 'Yksi kahvi, kiitos.', en: 'One coffee, please.' },
          { fi: 'Kaksi lippua.', en: 'Two tickets.' }
        ]
      }
    ]
  },
  // Level A1.1 (Existing)
  {
    id: 'level-a1-1',
    title: 'Level A1.1: Basics',
    description: 'Introductions, common verbs, and countries.',
    topics: [
      {
        id: 'introductions',
        title: 'Introductions',
        description: 'Talking about yourself and where you are from.',
        vocab: [
            { fi: 'Nimi', en: 'Name', context: 'General' },
            { fi: 'Kotoisin', en: 'From (origin)', context: 'Used with "olla"' },
            { fi: 'Asua', en: 'To live', context: 'Verb' }
        ],
        sentences: [
          { fi: 'Mikä sinun nimesi on?', en: 'What is your name?' },
          { fi: 'Minun nimeni on Anna.', en: 'My name is Anna.' },
          { fi: 'Mistä olet kotoisin?', en: 'Where are you from?' },
          { fi: 'Minä asun Helsingissä.', en: 'I live in Helsinki.' }
        ]
      },
      {
        id: 'common-verbs',
        title: 'Common Verbs (Type 1)',
        description: 'Action words you need every day.',
        vocab: [
          { fi: 'Puhua', en: 'To speak', context: 'Type 1 verb' },
          { fi: 'Sanoa', en: 'To say', context: 'Type 1 verb' },
          { fi: 'Ostaa', en: 'To buy', context: 'Type 1 verb' },
          { fi: 'Maksaa', en: 'To cost/pay', context: 'Type 1 verb' },
          { fi: 'Kysyä', en: 'To ask', context: 'Type 1 verb' },
          { fi: 'Etsiä', en: 'To look for', context: 'Type 1 verb' }
        ],
        sentences: [
          { fi: 'Puhutko suomea?', en: 'Do you speak Finnish?' },
          { fi: 'En puhu suomea.', en: 'I do not speak Finnish.' },
          { fi: 'Paljonko tämä maksaa?', en: 'How much does this cost?' }
        ]
      },
      {
        id: 'countries',
        title: 'Countries & Nationalities',
        description: 'Where are you from?',
        vocab: [
          { fi: 'Suomi', en: 'Finland', context: 'Country' },
          { fi: 'Englanti', en: 'England', context: 'Country' },
          { fi: 'Ruotsi', en: 'Sweden', context: 'Country' },
          { fi: 'Viro', en: 'Estonia', context: 'Country' },
          { fi: 'Saksa', en: 'Germany', context: 'Country' }
        ],
        sentences: [
          { fi: 'Olen suomalainen.', en: 'I am Finnish.' },
          { fi: 'Puhun englantia.', en: 'I speak English.' }
        ]
      },
      {
        id: 'days-time',
        title: 'Days & Time',
        description: 'Days of the week.',
        vocab: [
            { fi: 'Maanantai', en: 'Monday', context: 'Day' },
            { fi: 'Tiistai', en: 'Tuesday', context: 'Day' },
            { fi: 'Keskiviikko', en: 'Wednesday', context: 'Day' },
            { fi: 'Torstai', en: 'Thursday', context: 'Day' },
            { fi: 'Perjantai', en: 'Friday', context: 'Day' },
            { fi: 'Lauantai', en: 'Saturday', context: 'Day' },
            { fi: 'Sunnuntai', en: 'Sunday', context: 'Day' },
            { fi: 'Tänään', en: 'Today', context: 'Time' },
            { fi: 'Huomenna', en: 'Tomorrow', context: 'Time' }
        ],
        sentences: [
            { fi: 'Tänään on maanantai.', en: 'Today is Monday.' },
            { fi: 'Nähdään huomenna.', en: 'See you tomorrow.' }
        ]
      }
    ]
  },
  // A1.2
  {
    id: 'level-a1-2',
    title: 'Level A1.2: Simple Interactions',
    description: 'Numbers 11-100, family, shopping, and weather.',
    topics: [
        {
            id: 'numbers-11-100',
            title: 'Numbers 11-100 & Prices',
            description: 'Handling money and larger numbers.',
            vocab: [
                { fi: 'Yksitoista', en: 'Eleven', context: '11' },
                { fi: 'Kaksitoista', en: 'Twelve', context: '12' },
                { fi: 'Kaksikymmentä', en: 'Twenty', context: '20' },
                { fi: 'Viisikymmentä', en: 'Fifty', context: '50' },
                { fi: 'Sata', en: 'Hundred', context: '100' },
                { fi: 'Euro', en: 'Euro', context: 'Currency' }
            ],
            sentences: [
                { fi: 'Kaksi euroa viisikymmentä.', en: '2.50 Euros.' },
                { fi: 'Se maksaa sata euroa.', en: 'It costs 100 euros.' }
            ]
        },
        {
            id: 'family',
            title: 'Family',
            description: 'Talking about your family.',
            vocab: [
                { fi: 'Perhe', en: 'Family', context: 'General' },
                { fi: 'Äiti', en: 'Mother', context: 'Parent' },
                { fi: 'Isä', en: 'Father', context: 'Parent' },
                { fi: 'Sisko', en: 'Sister', context: 'Sibling' },
                { fi: 'Veli', en: 'Brother', context: 'Sibling' },
                { fi: 'Lapsi', en: 'Child', context: 'Offspring' }
            ],
            sentences: [
                { fi: 'Minulla on iso perhe.', en: 'I have a big family.' },
                { fi: 'Onko sinulla lapsia?', en: 'Do you have children?' }
            ]
        },
        {
            id: 'food-shopping',
            title: 'Food & Grocery Shopping',
            description: 'Essential food items.',
            vocab: [
                { fi: 'Ruoka', en: 'Food', context: 'General' },
                { fi: 'Leipä', en: 'Bread', context: 'Bakery' },
                { fi: 'Vesi', en: 'Water', context: 'Drink' },
                { fi: 'Maito', en: 'Milk', context: 'Dairy' },
                { fi: 'Kahvi', en: 'Coffee', context: 'Drink' },
                { fi: 'Omena', en: 'Apple', context: 'Fruit' },
                { fi: 'Kana', en: 'Chicken', context: 'Meat' },
                { fi: 'Kala', en: 'Fish', context: 'Seafood' }
            ],
            sentences: [
                { fi: 'Minä syön leipää.', en: 'I eat bread.' },
                { fi: 'Minä juon kahvia.', en: 'I drink coffee.' }
            ]
        },
        {
            id: 'weather',
            title: 'Weather',
            description: 'Talking about the weather.',
            vocab: [
                { fi: 'Aurinko', en: 'Sun', context: 'Nature' },
                { fi: 'Sade', en: 'Rain', context: 'Weather' },
                { fi: 'Lumi', en: 'Snow', context: 'Weather' },
                { fi: 'Kylmä', en: 'Cold', context: 'Temperature' },
                { fi: 'Kuuma', en: 'Hot', context: 'Temperature' }
            ],
            sentences: [
                { fi: 'Aurinko paistaa.', en: 'The sun is shining.' },
                { fi: 'Sataa vettä.', en: 'It is raining.' },
                { fi: 'On kylmä.', en: 'It is cold.' }
            ]
        }
    ]
  },
  // A1.3
  {
    id: 'level-a1-3',
    title: 'Level A1.3: Routines & City',
    description: 'Daily life, time, and getting around.',
    topics: [
        {
            id: 'daily-routine',
            title: 'Daily Routine',
            description: 'What you do every day.',
            vocab: [
                { fi: 'Herätä', en: 'To wake up', context: 'Verb' },
                { fi: 'Syödä', en: 'To eat', context: 'Verb' },
                { fi: 'Mennä töihin', en: 'To go to work', context: 'Phrase' },
                { fi: 'Tulla kotiin', en: 'To come home', context: 'Phrase' },
                { fi: 'Nukkua', en: 'To sleep', context: 'Verb' }
            ],
            sentences: [
                { fi: 'Minä herään.', en: 'I wake up.' },
                { fi: 'Minä menen töihin.', en: 'I go to work.' }
            ]
        },
        {
            id: 'telling-time',
            title: 'Telling Time',
            description: 'Clock and times of day.',
            vocab: [
                { fi: 'Kello', en: 'Clock/Time', context: 'General' },
                { fi: 'Aamu', en: 'Morning', context: 'Time of day' },
                { fi: 'Ilta', en: 'Evening', context: 'Time of day' },
                { fi: 'Puoli', en: 'Half', context: 'Time' }
            ],
            sentences: [
                { fi: 'Paljonko kello on?', en: 'What time is it?' },
                { fi: 'Kello on kolme.', en: 'It is 3 o\'clock.' },
                { fi: 'Kello on puoli neljä.', en: 'It is half past three (3:30).' }
            ]
        },
        {
            id: 'directions',
            title: 'Directions',
            description: 'Finding your way.',
            vocab: [
                { fi: 'Oikea', en: 'Right', context: 'Direction' },
                { fi: 'Vasen', en: 'Left', context: 'Direction' },
                { fi: 'Suoraan', en: 'Straight', context: 'Direction' },
                { fi: 'Katu', en: 'Street', context: 'City' }
            ],
            sentences: [
                { fi: 'Missä on keskusta?', en: 'Where is the city center?' },
                { fi: 'Käänny oikealle.', en: 'Turn right.' }
            ]
        },
        {
            id: 'transport',
            title: 'Transport',
            description: 'Getting around Helsinki.',
            vocab: [
                { fi: 'Bussi', en: 'Bus', context: 'Transport' },
                { fi: 'Juna', en: 'Train', context: 'Transport' },
                { fi: 'Metro', en: 'Subway', context: 'Transport' },
                { fi: 'Lippu', en: 'Ticket', context: 'Travel' }
            ],
            sentences: [
                { fi: 'Yksi lippu, kiitos.', en: 'One ticket, please.' },
                { fi: 'Bussi myöhässä.', en: 'Bus is delayed.' }
            ]
        }
    ]
  },
  // A2.1
  {
    id: 'level-a2-1',
    title: 'Level A2.1: Service Situations',
    description: 'Health, clothing, housing, and hobbies.',
    topics: [
        {
            id: 'health',
            title: 'Health & Illness',
            description: 'Talking to a doctor.',
            vocab: [
                { fi: 'Lääkäri', en: 'Doctor', context: 'Person' },
                { fi: 'Sairas', en: 'Sick', context: 'Adjective' },
                { fi: 'Päänsärky', en: 'Headache', context: 'Symptom' },
                { fi: 'Kuume', en: 'Fever', context: 'Symptom' }
            ],
            sentences: [
                { fi: 'Minä olen sairas.', en: 'I am sick.' },
                { fi: 'Minulla on päänsärky.', en: 'I have a headache.' }
            ]
        },
        {
            id: 'clothing',
            title: 'Clothing & Colors',
            description: 'Shopping for clothes.',
            vocab: [
                { fi: 'Takki', en: 'Jacket', context: 'Clothes' },
                { fi: 'Housut', en: 'Trousers', context: 'Clothes' },
                { fi: 'Musta', en: 'Black', context: 'Color' },
                { fi: 'Sininen', en: 'Blue', context: 'Color' },
                { fi: 'Punainen', en: 'Red', context: 'Color' }
            ],
            sentences: [
                { fi: 'Minulla on punainen takki.', en: 'I have a red jacket.' }
            ]
        },
        {
            id: 'housing',
            title: 'Housing',
            description: 'Describing your home.',
            vocab: [
                { fi: 'Talo', en: 'House', context: 'Building' },
                { fi: 'Keittiö', en: 'Kitchen', context: 'Room' },
                { fi: 'Sauna', en: 'Sauna', context: 'Essential' },
                { fi: 'Sänky', en: 'Bed', context: 'Furniture' }
            ],
            sentences: [
                { fi: 'Minun talossani on sauna.', en: 'My house has a sauna.' }
            ]
        },
        {
            id: 'hobbies',
            title: 'Hobbies',
            description: 'What you do for fun.',
            vocab: [
                { fi: 'Harrastus', en: 'Hobby', context: 'General' },
                { fi: 'Lukea', en: 'To read', context: 'Verb' },
                { fi: 'Urheilu', en: 'Sports', context: 'Activity' },
                { fi: 'Musiikki', en: 'Music', context: 'Activity' }
            ],
            sentences: [
                { fi: 'Tykkään lukea.', en: 'I like to read.' },
                { fi: 'Pelaan jalkapalloa.', en: 'I play football.' }
            ]
        }
    ]
  },
  // A2.2
  {
    id: 'level-a2-2',
    title: 'Level A2.2: Opinions & Work',
    description: 'Travel, work, nature, and deeper conversations.',
    topics: [
        {
            id: 'travel',
            title: 'Travel',
            description: 'Going places.',
            vocab: [
                { fi: 'Matkustaa', en: 'To travel', context: 'Verb' },
                { fi: 'Lentokenttä', en: 'Airport', context: 'Place' },
                { fi: 'Passi', en: 'Passport', context: 'Document' },
                { fi: 'Hotelli', en: 'Hotel', context: 'Place' }
            ],
            sentences: [
                { fi: 'Missä on passisi?', en: 'Where is your passport?' }
            ]
        },
        {
            id: 'work',
            title: 'Work Life',
            description: 'Jobs and office.',
            vocab: [
                { fi: 'Työ', en: 'Work', context: 'General' },
                { fi: 'Pomo', en: 'Boss', context: 'Person' },
                { fi: 'Kokous', en: 'Meeting', context: 'Event' },
                { fi: 'Opettaja', en: 'Teacher', context: 'Profession' }
            ],
            sentences: [
                { fi: 'Minulla on kokous.', en: 'I have a meeting.' }
            ]
        },
        {
            id: 'nature',
            title: 'Nature',
            description: 'Finnish nature.',
            vocab: [
                { fi: 'Metsä', en: 'Forest', context: 'Nature' },
                { fi: 'Järvi', en: 'Lake', context: 'Nature' },
                { fi: 'Lumi', en: 'Snow', context: 'Nature' },
                { fi: 'Jää', en: 'Ice', context: 'Nature' }
            ],
            sentences: [
                { fi: 'Suomessa on paljon metsää.', en: 'Finland has a lot of forest.' }
            ]
        },
        {
            id: 'opinions',
            title: 'Opinions',
            description: 'Saying what you think.',
            vocab: [
                { fi: 'Mielestäni', en: 'In my opinion', context: 'Phrase' },
                { fi: 'Tärkeä', en: 'Important', context: 'Adjective' },
                { fi: 'Samaa mieltä', en: 'Agree', context: 'Phrase' },
                { fi: 'Eri mieltä', en: 'Disagree', context: 'Phrase' }
            ],
            sentences: [
                { fi: 'Olen samaa mieltä.', en: 'I agree.' },
                { fi: 'Se on totta.', en: 'That is true.' }
            ]
        }
    ]
  }
];

export const getTopicById = (id: string): Topic | undefined => {
  for (const level of curriculumLevels) {
    const topic = level.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return undefined;
};