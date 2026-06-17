import { motion } from 'framer-motion';
import { TrendingDown, Flame, Droplets, BookOpen, PenLine, Dumbbell, Moon, Crown, Target, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import ProgressRing from './ProgressRing';
import { getDailyQuote } from '../data/quotes';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getTodayDate(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function Dashboard() {
  const store = useStore();
  const todayCalories = store.getTodayCalories();
  const todayProtein = store.getTodayProtein();
  const todayWater = store.getTodayWater();
  const habitScore = store.getTodayHabitScore();
  const looksMaxScore = store.getLooksMaxScore();
  const journalStreak = store.getJournalStreak();
  const fitnessStreak = store.getFitnessStreak();
  const bibleStreak = store.getBibleStreak();
  const dailyQuote = getDailyQuote();
  
  const completedTasks = store.tasks.filter(t => t.completed).length;

  const lastSleep = store.sleepEntries.length > 0 ? store.sleepEntries[store.sleepEntries.length - 1] : null;
  const sleepScore = lastSleep ? lastSleep.quality * 20 : 0;

  const caloriesRemaining = store.calorieGoal - todayCalories;
  const waterProgress = Math.min((todayWater / store.waterGoal) * 100, 100);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full scrollable">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-4 pb-28 space-y-4"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mt-2">
          <div>
            <h1 className="text-xl font-bold text-white">{getGreeting()} 👑</h1>
            <p className="text-dark-300 text-sm">{getTodayDate()}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-gold rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles size={12} className="text-gold-400" />
              <span className="text-gold-400 text-xs font-bold">Lv.{store.level}</span>
            </div>
            <div className="glass rounded-full px-3 py-1.5">
              <span className="text-white text-xs font-semibold">{store.xp} XP</span>
            </div>
          </div>
        </motion.div>

        {/* Daily Verse Card */}
        <motion.div variants={item} className="glass-gold rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen size={14} className="text-gold-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-dark-100 text-xs italic leading-relaxed">"{dailyQuote.text}"</p>
              <p className="text-gold-400 text-[10px] mt-1 font-medium">— {dailyQuote.reference}</p>
            </div>
          </div>
        </motion.div>

        {/* Weight & Calories Row */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 card-shine">
            <div className="flex items-center justify-between mb-3">
              <TrendingDown size={14} className="text-gold-400" />
              <span className="text-dark-300 text-[10px] uppercase tracking-wider">Weight</span>
            </div>
            <p className="text-2xl font-bold text-white">{store.currentWeight}</p>
            <p className="text-dark-300 text-xs">Goal: {store.goalWeight} {store.unit}</p>
            <div className="mt-2 h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700"
                style={{ width: `${Math.min(((store.currentWeight - store.goalWeight) / (store.currentWeight - store.goalWeight + 1)) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-4 card-shine">
            <div className="flex items-center justify-between mb-3">
              <Flame size={14} className="text-orange-400" />
              <span className="text-dark-300 text-[10px] uppercase tracking-wider">Calories</span>
            </div>
            <p className="text-2xl font-bold text-white">{caloriesRemaining}</p>
            <p className="text-dark-300 text-xs">Remaining of {store.calorieGoal}</p>
            <div className="mt-2 h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-700"
                style={{ width: `${Math.min((todayCalories / store.calorieGoal) * 100, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Score Rings */}
        <motion.div variants={item} className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Today's Scores</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={habitScore} size={56} strokeWidth={5} color="#22c55e">
                <span className="text-xs font-bold text-white">{habitScore}</span>
              </ProgressRing>
              <span className="text-dark-300 text-[9px]">Habits</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={looksMaxScore} size={56} strokeWidth={5} color="#d4af37">
                <span className="text-xs font-bold text-white">{looksMaxScore}</span>
              </ProgressRing>
              <span className="text-dark-300 text-[9px]">LooksMax</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={waterProgress} size={56} strokeWidth={5} color="#06b6d4">
                <span className="text-xs font-bold text-white">{todayWater}</span>
              </ProgressRing>
              <span className="text-dark-300 text-[9px]">Water</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={sleepScore} size={56} strokeWidth={5} color="#8b5cf6">
                <span className="text-xs font-bold text-white">{sleepScore || '—'}</span>
              </ProgressRing>
              <span className="text-dark-300 text-[9px]">Sleep</span>
            </div>
          </div>
        </motion.div>

        {/* Streaks */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <div className="glass rounded-2xl p-3 flex flex-col items-center">
            <PenLine size={16} className="text-blue-400 mb-1.5" />
            <span className="text-lg font-bold text-white">{journalStreak}</span>
            <span className="text-dark-300 text-[9px]">Journal 🔥</span>
          </div>
          <div className="glass rounded-2xl p-3 flex flex-col items-center">
            <Dumbbell size={16} className="text-red-400 mb-1.5" />
            <span className="text-lg font-bold text-white">{fitnessStreak}</span>
            <span className="text-dark-300 text-[9px]">Fitness 🔥</span>
          </div>
          <div className="glass rounded-2xl p-3 flex flex-col items-center">
            <BookOpen size={16} className="text-gold-400 mb-1.5" />
            <span className="text-lg font-bold text-white">{bibleStreak}</span>
            <span className="text-dark-300 text-[9px]">Bible 🔥</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { icon: Droplets, label: 'Log Water', color: 'text-cyan-400', action: () => store.toggleHabit('h5', new Date().toISOString().split('T')[0]) },
              { icon: Target, label: 'View Tasks', color: 'text-green-400', action: () => store.setPage('tasks') },
              { icon: Crown, label: 'LooksMax Score', color: 'text-gold-400', action: () => store.setPage('looksmax') },
              { icon: Moon, label: 'Log Sleep', color: 'text-purple-400', action: () => store.setPage('sleep') },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={action.action}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors active:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={action.color} />
                    <span className="text-white text-sm">{action.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-dark-400" />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tasks Summary */}
        <motion.div variants={item} className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Tasks</h3>
            <span className="text-dark-300 text-xs">{completedTasks}/{store.tasks.length}</span>
          </div>
          {store.tasks.filter(t => !t.completed).slice(0, 3).map(task => (
            <div key={task.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-5 h-5 rounded-full border-2 border-dark-300 flex-shrink-0" />
              <span className="text-dark-100 text-sm truncate">{task.title}</span>
              <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${
                task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>{task.priority}</span>
            </div>
          ))}
          {store.tasks.length === 0 && (
            <p className="text-dark-400 text-sm text-center py-4">No tasks yet. Add some!</p>
          )}
        </motion.div>

        {/* Macros */}
        <motion.div variants={item} className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Today's Macros</h3>
          <div className="space-y-3">
            {[
              { label: 'Protein', current: todayProtein, goal: store.proteinGoal, color: 'from-red-500 to-pink-400' },
              { label: 'Carbs', current: store.getTodayCarbs(), goal: store.carbsGoal, color: 'from-blue-500 to-cyan-400' },
              { label: 'Fats', current: store.getTodayFats(), goal: store.fatsGoal, color: 'from-yellow-500 to-orange-400' },
            ].map(macro => (
              <div key={macro.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-dark-200">{macro.label}</span>
                  <span className="text-dark-300">{macro.current}g / {macro.goal}g</span>
                </div>
                <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${macro.color} transition-all duration-700`}
                    style={{ width: `${Math.min((macro.current / macro.goal) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
