export interface CategorizedQuote {
  id: string;
  text: string;
  reference: string;
  category: string;
}

export const QUOTES: CategorizedQuote[] = [
  // MOTIVATION
  { id: 'q1', text: 'I can do all things through Christ which strengtheneth me.', reference: 'Philippians 4:13', category: 'motivation' },
  { id: 'q2', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', reference: '2 Timothy 1:7', category: 'motivation' },
  { id: 'q3', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', reference: 'Isaiah 40:31', category: 'motivation' },
  { id: 'q4', text: 'Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', reference: 'Joshua 1:9', category: 'motivation' },
  { id: 'q5', text: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.', reference: 'Galatians 6:9', category: 'motivation' },
  { id: 'q6', text: 'Commit thy works unto the LORD, and thy thoughts shall be established.', reference: 'Proverbs 16:3', category: 'motivation' },
  { id: 'q7', text: 'The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.', reference: 'Psalm 28:7', category: 'motivation' },
  { id: 'q8', text: 'Nay, in all these things we are more than conquerors through him that loved us.', reference: 'Romans 8:37', category: 'motivation' },

  // STRENGTH
  { id: 'q10', text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?', reference: 'Psalm 27:1', category: 'strength' },
  { id: 'q11', text: 'God is our refuge and strength, a very present help in trouble.', reference: 'Psalm 46:1', category: 'strength' },
  { id: 'q12', text: 'He giveth power to the faint; and to them that have no might he increaseth strength.', reference: 'Isaiah 40:29', category: 'strength' },
  { id: 'q13', text: 'The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust.', reference: 'Psalm 18:2', category: 'strength' },
  { id: 'q14', text: 'Be strong and courageous, be not afraid nor dismayed for the king of Assyria, nor for all the multitude that is with him: for there be more with us than with him.', reference: '2 Chronicles 32:7', category: 'strength' },
  { id: 'q15', text: 'Finally, my brethren, be strong in the Lord, and in the power of his might.', reference: 'Ephesians 6:10', category: 'strength' },

  // DISCIPLINE
  { id: 'q20', text: 'No chastening for the present seemeth to be joyous, but grievous: nevertheless afterward it yieldeth the peaceable fruit of righteousness unto them which are exercised thereby.', reference: 'Hebrews 12:11', category: 'discipline' },
  { id: 'q21', text: 'He that hath no rule over his own spirit is like a city that is broken down, and without walls.', reference: 'Proverbs 25:28', category: 'discipline' },
  { id: 'q22', text: 'But I keep under my body, and bring it into subjection: lest that by any means, when I have preached to others, I myself should be a castaway.', reference: '1 Corinthians 9:27', category: 'discipline' },
  { id: 'q23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', reference: 'Colossians 3:23', category: 'discipline' },
  { id: 'q24', text: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.', reference: 'Proverbs 27:17', category: 'discipline' },
  { id: 'q25', text: 'Go to the ant, thou sluggard; consider her ways, and be wise.', reference: 'Proverbs 6:6', category: 'discipline' },

  // FAITH
  { id: 'q30', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', reference: 'Hebrews 11:1', category: 'faith' },
  { id: 'q31', text: 'For we walk by faith, not by sight.', reference: '2 Corinthians 5:7', category: 'faith' },
  { id: 'q32', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', reference: 'Proverbs 3:5-6', category: 'faith' },
  { id: 'q33', text: 'And Jesus said unto them, Because of your unbelief: for verily I say unto you, If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you.', reference: 'Matthew 17:20', category: 'faith' },
  { id: 'q34', text: 'But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.', reference: 'Hebrews 11:6', category: 'faith' },
  { id: 'q35', text: 'The just shall live by faith.', reference: 'Romans 1:17', category: 'faith' },

  // WISDOM
  { id: 'q40', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', reference: 'James 1:5', category: 'wisdom' },
  { id: 'q41', text: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.', reference: 'Proverbs 4:7', category: 'wisdom' },
  { id: 'q42', text: 'The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.', reference: 'Proverbs 9:10', category: 'wisdom' },
  { id: 'q43', text: 'How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver!', reference: 'Proverbs 16:16', category: 'wisdom' },
  { id: 'q44', text: 'A wise man is strong; yea, a man of knowledge increaseth strength.', reference: 'Proverbs 24:5', category: 'wisdom' },

  // ANXIETY
  { id: 'q50', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', reference: 'Philippians 4:6-7', category: 'anxiety' },
  { id: 'q51', text: 'Casting all your care upon him; for he careth for you.', reference: '1 Peter 5:7', category: 'anxiety' },
  { id: 'q52', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', reference: 'Isaiah 41:10', category: 'anxiety' },
  { id: 'q53', text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', reference: 'John 14:27', category: 'anxiety' },
  { id: 'q54', text: 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.', reference: 'Psalm 23:1-3', category: 'anxiety' },
  { id: 'q55', text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', reference: 'Psalm 23:4', category: 'anxiety' },

  // HOPE
  { id: 'q60', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', reference: 'Jeremiah 29:11', category: 'hope' },
  { id: 'q61', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', reference: 'Isaiah 40:31', category: 'hope' },
  { id: 'q62', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', reference: 'Romans 8:28', category: 'hope' },
  { id: 'q63', text: 'It is of the LORD\'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', reference: 'Lamentations 3:22-23', category: 'hope' },
  { id: 'q64', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', reference: 'John 3:16', category: 'hope' },
  { id: 'q65', text: 'Blessed be the God and Father of our Lord Jesus Christ, which according to his abundant mercy hath begotten us again unto a lively hope by the resurrection of Jesus Christ from the dead.', reference: '1 Peter 1:3', category: 'hope' },

  // SUCCESS
  { id: 'q70', text: 'This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.', reference: 'Joshua 1:8', category: 'success' },
  { id: 'q71', text: 'Commit thy works unto the LORD, and thy thoughts shall be established.', reference: 'Proverbs 16:3', category: 'success' },
  { id: 'q72', text: 'The hand of the diligent shall bear rule: but the slothful shall be under tribute.', reference: 'Proverbs 12:24', category: 'success' },
  { id: 'q73', text: 'Seest thou a man diligent in his business? he shall stand before kings; he shall not stand before mean men.', reference: 'Proverbs 22:29', category: 'success' },
  { id: 'q74', text: 'In all thy ways acknowledge him, and he shall direct thy paths.', reference: 'Proverbs 3:6', category: 'success' },

  // LEADERSHIP
  { id: 'q80', text: 'But he that is greatest among you shall be your servant.', reference: 'Matthew 23:11', category: 'leadership' },
  { id: 'q81', text: 'Where there is no vision, the people perish: but he that keepeth the law, happy is he.', reference: 'Proverbs 29:18', category: 'leadership' },
  { id: 'q82', text: 'And the LORD make you to increase and abound in love one toward another, and toward all men.', reference: '1 Thessalonians 3:12', category: 'leadership' },
  { id: 'q83', text: 'Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.', reference: '1 Timothy 4:12', category: 'leadership' },
  { id: 'q84', text: 'Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.', reference: 'Hebrews 10:25', category: 'leadership' },
];

export const QUOTE_CATEGORIES = ['motivation', 'strength', 'discipline', 'faith', 'wisdom', 'anxiety', 'hope', 'success', 'leadership'];

export function getQuotesByCategory(category: string): CategorizedQuote[] {
  return QUOTES.filter(q => q.category === category);
}

export function getRandomQuote(): CategorizedQuote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export function getDailyQuote(): CategorizedQuote {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
}

export function searchQuotes(query: string): CategorizedQuote[] {
  const q = query.toLowerCase();
  return QUOTES.filter(quote => 
    quote.text.toLowerCase().includes(q) || 
    quote.reference.toLowerCase().includes(q) ||
    quote.category.toLowerCase().includes(q)
  );
}
