import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Trash2, Flame } from 'lucide-react';
import { useStore } from '../store';

const HABIT_ICONS = ['💪', '📚', '🙏', '📖', '💧', '😴', '✨', '🧘', '🚶', '🥗', '🏃', '🎨', '🎵', '💊', '🧹', '📝', '🧠', '☀️', '🎭', '💤'];
const HABIT_COLORS = ['#ef4444', '#3b82f6', '#a855f7', '#d4af37', '#06b6d4', '#6366f1', '#ec4899', '#14b8a6', '#22c55e', '#f59e0b'];

export default function HabitTracker() {
  const store = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('💪');
  const [newColor, setNewColor] = useState('#d4af37');
  const today = new Date().toISOString().split('T')[0];

  const habitScore = store.getTodayHabitScore();
  const completedToday = store.habits.filter(h => h.completedDates.includes(today)).length;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const addHabit = () => {
    if (!newName.trim()) return;
    store.addCustomHabit({
      id: 'custom_' + Date.now(),
      name: newName,
      icon: newIcon,
      completedDates: [],
      color: newColor,
      isCustom: true,
    });
    setNewName(''); setShowAdd(false);
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gold-text">Habit Tracker</h1>
            <p className="text-dark-300 text-sm">{completedToday}/{store.habits.length} completed today</p>
          </div>
          <div className="glass rounded-full px-3 py-1.5">
            <span className="text-gold-400 text-xs font-bold">{habitScore}%</span>
          </div>
        </div>

        {/* Progress */}
        <div className="glass rounded-2xl p-4">
          <div className="h-3 bg-dark-600 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${habitScore}%`, background: 'linear-gradient(135deg, #d4af37, #f5d778)' }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-dark-300 text-[10px]">{completedToday} done</span>
            <span className="text-dark-300 text-[10px]">{store.habits.length - completedToday} remaining</span>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">This Week</h3>
          <div className="space-y-2">
            {last7Days.map(date => {
              const d = new Date(date);
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const isToday = date === today;
              const completed = store.habits.filter(h => h.completedDates.includes(date)).length;
              const pct = store.habits.length > 0 ? (completed / store.habits.length) * 100 : 0;
              return (
                <div key={date} className="flex items-center gap-3">
                  <span className={`text-xs w-8 ${isToday ? 'text-gold-400 font-bold' : 'text-dark-400'}`}>{dayName}</span>
                  <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#d4af37' : '#ef4444' }} />
                  </div>
                  <span className="text-dark-300 text-[10px] w-8 text-right">{completed}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Habit */}
        {!showAdd ? (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowAdd(true)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
            <Plus size={16} /> Add Custom Habit
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">New Habit</h3>
              <button onClick={() => setShowAdd(false)}><X size={16} className="text-dark-300" /></button>
            </div>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Habit name"
              className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />
            <div>
              <p className="text-dark-300 text-[10px] mb-1.5">Icon</p>
              <div className="flex gap-1.5 flex-wrap">
                {HABIT_ICONS.map(icon => (
                  <button key={icon} onClick={() => setNewIcon(icon)}
                    className={`w-8 h-8 rounded-lg text-center text-sm ${newIcon === icon ? 'glass-gold' : 'glass'}`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-300 text-[10px] mb-1.5">Color</p>
              <div className="flex gap-1.5">
                {HABIT_COLORS.map(color => (
                  <button key={color} onClick={() => setNewColor(color)}
                    className={`w-8 h-8 rounded-lg ${newColor === color ? 'ring-2 ring-white/30' : ''}`}
                    style={{ background: color }} />
                ))}
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={addHabit}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
              Add Habit
            </motion.button>
          </motion.div>
        )}

        {/* Habits List */}
        <div className="space-y-2">
          {store.habits.map(habit => {
            const isDone = habit.completedDates.includes(today);
            const streak = (() => {
              let s = 0;
              for (let i = 0; i < 365; i++) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                if (habit.completedDates.includes(d.toISOString().split('T')[0])) s++;
                else break;
              }
              return s;
            })();

            return (
              <motion.div key={habit.id} layout
                className={`glass rounded-2xl p-3.5 ${isDone ? 'border-green-500/20' : ''}`}>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => store.toggleHabit(habit.id, today)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                      isDone ? 'ring-2' : 'glass'
                    }`}
                    style={isDone ? { background: habit.color + '20', borderColor: habit.color } : {}}
                  >
                    {habit.icon}
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDone ? 'text-green-400' : 'text-white'}`}>{habit.name}</p>
                    {streak > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Flame size={10} className="text-orange-400" />
                        <span className="text-orange-400 text-[10px]">{streak} day streak</span>
                      </div>
                    )}
                  </div>
                  {habit.isCustom && (
                    <button onClick={() => store.deleteHabit(habit.id)} className="text-dark-400">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
