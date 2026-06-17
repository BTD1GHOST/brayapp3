export interface BibleBook {
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'old' | 'new';
}

export const BIBLE_BOOKS: BibleBook[] = [
  { name: 'Genesis', abbrev: 'Gen', chapters: 50, testament: 'old' },
  { name: 'Exodus', abbrev: 'Exod', chapters: 40, testament: 'old' },
  { name: 'Leviticus', abbrev: 'Lev', chapters: 27, testament: 'old' },
  { name: 'Numbers', abbrev: 'Num', chapters: 36, testament: 'old' },
  { name: 'Deuteronomy', abbrev: 'Deut', chapters: 34, testament: 'old' },
  { name: 'Joshua', abbrev: 'Josh', chapters: 24, testament: 'old' },
  { name: 'Judges', abbrev: 'Judg', chapters: 21, testament: 'old' },
  { name: 'Ruth', abbrev: 'Ruth', chapters: 4, testament: 'old' },
  { name: '1 Samuel', abbrev: '1Sam', chapters: 31, testament: 'old' },
  { name: '2 Samuel', abbrev: '2Sam', chapters: 24, testament: 'old' },
  { name: '1 Kings', abbrev: '1Kgs', chapters: 22, testament: 'old' },
  { name: '2 Kings', abbrev: '2Kgs', chapters: 25, testament: 'old' },
  { name: '1 Chronicles', abbrev: '1Chr', chapters: 29, testament: 'old' },
  { name: '2 Chronicles', abbrev: '2Chr', chapters: 36, testament: 'old' },
  { name: 'Ezra', abbrev: 'Ezra', chapters: 10, testament: 'old' },
  { name: 'Nehemiah', abbrev: 'Neh', chapters: 13, testament: 'old' },
  { name: 'Esther', abbrev: 'Esth', chapters: 10, testament: 'old' },
  { name: 'Job', abbrev: 'Job', chapters: 42, testament: 'old' },
  { name: 'Psalms', abbrev: 'Ps', chapters: 150, testament: 'old' },
  { name: 'Proverbs', abbrev: 'Prov', chapters: 31, testament: 'old' },
  { name: 'Ecclesiastes', abbrev: 'Ecc', chapters: 12, testament: 'old' },
  { name: 'Song of Solomon', abbrev: 'Song', chapters: 8, testament: 'old' },
  { name: 'Isaiah', abbrev: 'Isa', chapters: 66, testament: 'old' },
  { name: 'Jeremiah', abbrev: 'Jer', chapters: 52, testament: 'old' },
  { name: 'Lamentations', abbrev: 'Lam', chapters: 5, testament: 'old' },
  { name: 'Ezekiel', abbrev: 'Ezek', chapters: 48, testament: 'old' },
  { name: 'Daniel', abbrev: 'Dan', chapters: 12, testament: 'old' },
  { name: 'Hosea', abbrev: 'Hos', chapters: 14, testament: 'old' },
  { name: 'Joel', abbrev: 'Joel', chapters: 3, testament: 'old' },
  { name: 'Amos', abbrev: 'Amos', chapters: 9, testament: 'old' },
  { name: 'Obadiah', abbrev: 'Obad', chapters: 1, testament: 'old' },
  { name: 'Jonah', abbrev: 'Jonah', chapters: 4, testament: 'old' },
  { name: 'Micah', abbrev: 'Mic', chapters: 7, testament: 'old' },
  { name: 'Nahum', abbrev: 'Nah', chapters: 3, testament: 'old' },
  { name: 'Habakkuk', abbrev: 'Hab', chapters: 3, testament: 'old' },
  { name: 'Zephaniah', abbrev: 'Zeph', chapters: 3, testament: 'old' },
  { name: 'Haggai', abbrev: 'Hag', chapters: 2, testament: 'old' },
  { name: 'Zechariah', abbrev: 'Zech', chapters: 14, testament: 'old' },
  { name: 'Malachi', abbrev: 'Mal', chapters: 4, testament: 'old' },
  { name: 'Matthew', abbrev: 'Matt', chapters: 28, testament: 'new' },
  { name: 'Mark', abbrev: 'Mark', chapters: 16, testament: 'new' },
  { name: 'Luke', abbrev: 'Luke', chapters: 24, testament: 'new' },
  { name: 'John', abbrev: 'John', chapters: 21, testament: 'new' },
  { name: 'Acts', abbrev: 'Acts', chapters: 28, testament: 'new' },
  { name: 'Romans', abbrev: 'Rom', chapters: 16, testament: 'new' },
  { name: '1 Corinthians', abbrev: '1Cor', chapters: 16, testament: 'new' },
  { name: '2 Corinthians', abbrev: '2Cor', chapters: 13, testament: 'new' },
  { name: 'Galatians', abbrev: 'Gal', chapters: 6, testament: 'new' },
  { name: 'Ephesians', abbrev: 'Eph', chapters: 6, testament: 'new' },
  { name: 'Philippians', abbrev: 'Phil', chapters: 4, testament: 'new' },
  { name: 'Colossians', abbrev: 'Col', chapters: 4, testament: 'new' },
  { name: '1 Thessalonians', abbrev: '1Thes', chapters: 5, testament: 'new' },
  { name: '2 Thessalonians', abbrev: '2Thes', chapters: 3, testament: 'new' },
  { name: '1 Timothy', abbrev: '1Tim', chapters: 6, testament: 'new' },
  { name: '2 Timothy', abbrev: '2Tim', chapters: 4, testament: 'new' },
  { name: 'Titus', abbrev: 'Titus', chapters: 3, testament: 'new' },
  { name: 'Philemon', abbrev: 'Phlm', chapters: 1, testament: 'new' },
  { name: 'Hebrews', abbrev: 'Heb', chapters: 13, testament: 'new' },
  { name: 'James', abbrev: 'Jas', chapters: 5, testament: 'new' },
  { name: '1 Peter', abbrev: '1Pet', chapters: 5, testament: 'new' },
  { name: '2 Peter', abbrev: '2Pet', chapters: 3, testament: 'new' },
  { name: '1 John', abbrev: '1John', chapters: 5, testament: 'new' },
  { name: '2 John', abbrev: '2John', chapters: 1, testament: 'new' },
  { name: '3 John', abbrev: '3John', chapters: 1, testament: 'new' },
  { name: 'Jude', abbrev: 'Jude', chapters: 1, testament: 'new' },
  { name: 'Revelation', abbrev: 'Rev', chapters: 22, testament: 'new' },
];

export const SAMPLE_VERSES: Record<string, string[]> = {
  'Genesis-1': [
    'In the beginning God created the heaven and the earth.',
    'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
    'And God said, Let there be light: and there was light.',
    'And God saw the light, that it was good: and God divided the light from the darkness.',
    'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.',
  ],
  'Psalms-23': [
    'The LORD is my shepherd; I shall not want.',
    'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
    'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.',
    'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
    'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
  ],
  'Psalms-91': [
    'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
    'I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
    'Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.',
    'He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.',
  ],
  'Proverbs-3': [
    'My son, forget not my law; but let thine heart keep my commandments:',
    'For length of days, and long life, and peace, shall they add to thee.',
    'Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:',
    'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
    'In all thy ways acknowledge him, and he shall direct thy paths.',
  ],
  'Proverbs-4': [
    'Hear, ye children, the instruction of a father, and attend to know understanding.',
    'For I give you good doctrine, forsake ye not my law.',
    'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.',
  ],
  'John-3': [
    'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:',
    'The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.',
    'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.',
    'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
  ],
  'John-1': [
    'In the beginning was the Word, and the Word was with God, and the Word was God.',
    'The same was in the beginning with God.',
    'All things were made by him; and without him was not any thing made that was made.',
    'In him was life; and the life was the light of men.',
    'And the light shineth in darkness; and the darkness comprehended it not.',
  ],
  'Romans-8': [
    'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.',
    'For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.',
    'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    'What shall we then say to these things? If God be for us, who can be against us?',
    'Nay, in all these things we are more than conquerors through him that loved us.',
  ],
  'Romans-12': [
    'I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.',
    'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
  ],
  'Philippians-4': [
    'Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved.',
    'Rejoice in the Lord alway: and again I say, Rejoice.',
    'Let your moderation be known unto all men. The Lord is at hand.',
    'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
    'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    'I can do all things through Christ which strengtheneth me.',
  ],
  'Isaiah-40': [
    'Comfort ye, comfort ye my people, saith your God.',
    'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
  ],
  'Isaiah-41': [
    'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
  ],
  'Joshua-1': [
    'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
  ],
  '2 Timothy-1': [
    'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
  ],
  'Matthew-6': [
    'Take heed that ye do not your alms before men, to be seen of them: otherwise ye have no reward of your Father which is in heaven.',
    'But when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret; and thy Father which seeth in secret shall reward thee openly.',
    'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
    'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
  ],
  'Matthew-5': [
    'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
    'Blessed are they that mourn: for they shall be comforted.',
    'Blessed are the meek: for they shall inherit the earth.',
    'Blessed are they which do hunger and thirst after righteousness: for they shall be filled.',
    'Blessed are the merciful: for they shall obtain mercy.',
    'Blessed are the pure in heart: for they shall see God.',
    'Blessed are the peacemakers: for they shall be called the children of God.',
  ],
  'Jeremiah-29': [
    'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    'Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.',
    'And ye shall seek me, and find me, when ye shall search for me with all your heart.',
  ],
  'Psalm-27': [
    'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    'Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.',
  ],
  'Psalm-46': [
    'God is our refuge and strength, a very present help in trouble.',
    'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
  ],
  'Deuteronomy-31': [
    'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.',
  ],
  'Ephesians-6': [
    'Finally, my brethren, be strong in the Lord, and in the power of his might.',
    'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.',
  ],
  '1 Corinthians-10': [
    'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.',
  ],
  '1 Corinthians-16': [
    'Watch ye, stand fast in the faith, quit you like men, be strong.',
  ],
  'Hebrews-12': [
    'Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.',
  ],
  'James-1': [
    'Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.',
    'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
  ],
  '1 Peter-5': [
    'Casting all your care upon him; for he careth for you.',
    'But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.',
  ],
  "Lamentations-3": [
    "It is of the LORD'S mercies that we are not consumed, because his compassions fail not.",
    "They are new every morning: great is thy faithfulness.",
  ],
  "Nehemiah-8": [
    "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our LORD: neither be ye sorry; for the joy of the LORD is your strength.",
  ],
  "Proverbs-27": [
    "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
  ],
  "Colossians-3": [
    "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;",
    "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",
  ],
  "Galatians-6": [
    "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
  ],
  "2 Corinthians-12": [
    "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.",
  ],
};

export function getVerses(book: string, chapter: number): string[] {
  const key = `${book}-${chapter}`;
  return SAMPLE_VERSES[key] || Array.from({ length: 20 }, (_, i) => `Verse ${i + 1} - ${book} Chapter ${chapter}`);
}
