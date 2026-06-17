import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Plus, Search, Flame, Heart, X, Trash2 } from 'lucide-react';
import { useStore } from '../store';
import type { JournalEntry } from '../types';

const MOODS = [
  { value: 1 as const, emoji: '😢', label: 'Terrible' },
  { value: 2 as const, emoji: '😕', label: 'Bad' },
  { value: 3 as const, emoji: '😐', label: 'Okay' },
  { value: 4 as const, emoji: '😊', label: 'Good' },
  { value: 5 as const, emoji: '😄', label: 'Great' },
];

const PROMPTS = [
  'What are you grateful for today?',
  'What challenged you today and how did you respond?',
  'What would you do differently tomorrow?',
  'What was the best moment of your day?',
  'How did you grow today?',
  'What did you learn about yourself?',
  'Who made a positive impact on your day?',
  'What step did you take toward your goals?',
];

export default function Journal() {
  const store = useStore();
  const [showNew, setShowNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [gratitude, setGratitude] = useState('');
  const [reflection, setReflection] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const journalStreak = store.getJournalStreak();

  const filteredEntries = searchQuery
    ? store.journalEntries.filter(e =>
        e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.gratitude.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : store.journalEntries;

  const handleSave = () => {
    if (!content.trim()) return;
    if (editingId) {
      store.updateJournalEntry(editingId, { content, mood, gratitude, reflection });
      setEditingId(null);
    } else {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content,
        mood,
        gratitude,
        reflection,
        tags: [],
      };
      store.addJournalEntry(entry);
    }
    setContent(''); setGratitude(''); setReflection(''); setMood(3); setShowNew(false);
  };

  const getPrompt = () => {
    const today = new Date();
    const idx = (today.getDate() + today.getMonth()) % PROMPTS.length;
    return PROMPTS[idx];
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gold-text">Journal</h1>
            <p className="text-dark-300 text-sm">Reflect, grow, evolve</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Flame size={12} className="text-orange-400" />
              <span className="text-orange-400 text-xs font-bold">{journalStreak}d</span>
            </div>
          </div>
        </div>

        {/* New Entry Button */}
        {!showNew && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowNew(true)}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}
          >
            <Plus size={16} />
            New Entry
          </motion.button>
        )}

        {/* New Entry Form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">New Entry</h3>
                <button onClick={() => setShowNew(false)}><X size={16} className="text-dark-300" /></button>
              </div>

              {/* Mood */}
              <div>
                <p className="text-dark-300 text-xs mb-2">How are you feeling?</p>
                <div className="flex gap-2">
                  {MOODS.map(m => (
                    <button key={m.value} onClick={() => setMood(m.value)}
                      className={`flex-1 py-2 rounded-xl text-center transition-all ${mood === m.value ? 'glass-gold' : 'glass'}`}>
                      <span className="text-lg">{m.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="glass rounded-xl p-3">
                <button onClick={() => setShowPrompt(!showPrompt)} className="w-full text-left">
                  <p className="text-gold-400 text-xs font-medium">💡 Daily Prompt</p>
                  <p className="text-dark-200 text-xs mt-1">{getPrompt()}</p>
                </button>
              </div>

              {/* Content */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full h-32 px-3 py-2.5 rounded-xl glass text-white text-sm resize-none"
              />

              {/* Gratitude */}
              <input
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="What are you grateful for?"
                className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm"
              />

              {/* Reflection */}
              <input
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Today's reflection..."
                className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm"
              />

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}
              >
                Save Entry
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="w-full pl-8 pr-3 py-2.5 rounded-xl glass text-white text-sm"
          />
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {filteredEntries.slice(0, 20).map(entry => {
            const moodObj = MOODS.find(m => m.value === entry.mood);
            return (
              <div key={entry.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{moodObj?.emoji}</span>
                    <span className="text-dark-300 text-xs">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => store.deleteJournalEntry(entry.id)} className="text-dark-400 hover:text-red-400">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-dark-100 text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                {entry.gratitude && (
                  <div className="mt-2 flex items-start gap-2">
                    <Heart size={10} className="text-pink-400 mt-1 flex-shrink-0" />
                    <p className="text-dark-300 text-xs">{entry.gratitude}</p>
                  </div>
                )}
                {entry.reflection && (
                  <p className="mt-1 text-dark-400 text-xs italic">💭 {entry.reflection}</p>
                )}
              </div>
            );
          })}
          {filteredEntries.length === 0 && (
            <div className="text-center py-8">
              <PenLine size={32} className="text-dark-500 mx-auto mb-2" />
              <p className="text-dark-400 text-sm">No journal entries yet</p>
              <p className="text-dark-500 text-xs mt-1">Start writing to track your growth</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
