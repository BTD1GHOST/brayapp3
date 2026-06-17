import { useState } from 'react';
import { Sparkles, RefreshCw, Star, Target, Zap, Heart } from 'lucide-react';
import { useStore } from '../store';
import { getRandomQuote } from '../data/quotes';

const SUCCESS_PRINCIPLES = [
  { title: 'Discipline Over Motivation', desc: 'Motivation fades; discipline endures. Build systems, not just goals.' },
  { title: 'The 1% Rule', desc: 'Improve by 1% every day. In a year, you\'ll be 37x better.' },
  { title: 'Deep Work', desc: 'Focus intensely on high-value tasks. Eliminate distractions ruthlessly.' },
  { title: 'Delayed Gratification', desc: 'Sacrifice short-term pleasure for long-term success. The pain of discipline weighs ounces; the pain of regret weighs tons.' },
  { title: 'Compound Growth', desc: 'Small consistent actions compound into massive results over time.' },
  { title: 'The 5-Second Rule', desc: 'When you feel the instinct to act, count 5-4-3-2-1 and move. Don\'t let your brain talk you out of it.' },
  { title: 'Identity-Based Habits', desc: 'Don\'t just change your actions — change who you believe you are.' },
  { title: 'The Two-Minute Rule', desc: 'If a task takes less than two minutes, do it now. Build momentum through small wins.' },
];

const DISCIPLINE_REMINDERS = [
  'Your future self is watching you through memories. Make them proud.',
  'Comfort zone is where dreams go to die.',
  'Every champion was once a contender that refused to give up.',
  'The only person you need to be better than is the person you were yesterday.',
  'Pain is temporary. Quitting lasts forever.',
  'You don\'t rise to the level of your goals. You fall to the level of your systems.',
  'Discipline is choosing between what you want now and what you want most.',
  'Success is not owned. It\'s leased, and rent is due every day.',
  'The hardest lift is lifting yourself off the couch.',
  'What you do every day matters more than what you do once in a while.',
];

const GOAL_AFFIRMATIONS = [
  'I am becoming the best version of myself.',
  'Every day, in every way, I am getting better.',
  'I have the discipline to achieve my goals.',
  'My potential is limitless.',
  'I am worthy of success and happiness.',
  'I choose progress over perfection.',
  'I am stronger than my excuses.',
  'Today I will outwork yesterday.',
  'I am building the life of my dreams.',
  'God has given me the strength to overcome any obstacle.',
];

export default function Motivation() {
  const store = useStore();
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [currentReminder, setCurrentReminder] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const refreshQuote = () => setCurrentQuote(getRandomQuote());
  const nextReminder = () => setCurrentReminder((currentReminder + 1) % DISCIPLINE_REMINDERS.length);
  const nextAffirmation = () => setCurrentAffirmation((currentAffirmation + 1) % GOAL_AFFIRMATIONS.length);

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Motivation</h1>
          <p className="text-dark-300 text-sm">Fuel your daily grind</p>
        </div>

        {/* Daily Quote */}
        <div className="glass-gold rounded-2xl p-5 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold-400" />
              <span className="text-gold-400 text-xs font-semibold">Daily Verse</span>
            </div>
            <button onClick={refreshQuote} className="text-dark-300">
              <RefreshCw size={14} />
            </button>
          </div>
          <p className="text-dark-100 text-sm italic leading-relaxed">"{currentQuote.text}"</p>
          <p className="text-gold-400 text-xs mt-2">— {currentQuote.reference}</p>
          <div className="flex items-center gap-2 mt-3">
            <button onClick={() => store.toggleFavoriteQuote(currentQuote.id)}
              className={store.favoriteQuotes.includes(currentQuote.id) ? 'text-gold-400' : 'text-dark-400'}>
              <Star size={14} fill={store.favoriteQuotes.includes(currentQuote.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Discipline Reminder */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-orange-400" />
              <span className="text-orange-400 text-xs font-semibold">Discipline Reminder</span>
            </div>
            <button onClick={nextReminder} className="text-dark-300 text-xs">Next →</button>
          </div>
          <p className="text-white text-sm font-medium leading-relaxed">{DISCIPLINE_REMINDERS[currentReminder]}</p>
        </div>

        {/* Affirmation */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-pink-400" />
              <span className="text-pink-400 text-xs font-semibold">Daily Affirmation</span>
            </div>
            <button onClick={nextAffirmation} className="text-dark-300 text-xs">Next →</button>
          </div>
          <p className="text-white text-sm italic leading-relaxed">"{GOAL_AFFIRMATIONS[currentAffirmation]}"</p>
        </div>

        {/* Success Principles */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Target size={14} className="text-gold-400" /> Success Principles
          </h3>
          <div className="space-y-3">
            {SUCCESS_PRINCIPLES.map((principle, i) => (
              <div key={i} className="glass rounded-xl p-3">
                <p className="text-white text-xs font-semibold mb-1">{principle.title}</p>
                <p className="text-dark-300 text-[11px] leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Visualization */}
        <div className="glass-gold rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            🎯 Goal Visualization
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-dark-200 text-xs">Current Weight</span>
              <span className="text-white text-xs font-bold">{store.currentWeight} {store.unit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-200 text-xs">Goal Weight</span>
              <span className="text-gold-400 text-xs font-bold">{store.goalWeight} {store.unit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-200 text-xs">Level</span>
              <span className="text-gold-400 text-xs font-bold">{store.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-200 text-xs">XP</span>
              <span className="text-gold-400 text-xs font-bold">{store.xp}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-dark-100 text-sm font-medium italic">
              "I will become who I am meant to be."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
