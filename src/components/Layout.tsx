import { motion } from 'framer-motion';
import { Home, Crown, Dumbbell, BookOpen, ClipboardList, MoreHorizontal, Utensils, Droplets, PenLine, Target, Moon, Sparkles, Trophy, BarChart3, Settings } from 'lucide-react';
import { useStore } from '../store';

const MAIN_TABS = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'looksmax', icon: Crown, label: 'Looks' },
  { id: 'weightloss', icon: Dumbbell, label: 'Weight' },
  { id: 'bible', icon: BookOpen, label: 'Bible' },
  { id: 'more', icon: MoreHorizontal, label: 'More' },
];

const MORE_PAGES = [
  { id: 'calories', icon: Utensils, label: 'Calories', desc: 'Track your meals' },
  { id: 'water', icon: Droplets, label: 'Water', desc: 'Hydration tracker' },
  { id: 'journal', icon: PenLine, label: 'Journal', desc: 'Daily reflections' },
  { id: 'tasks', icon: ClipboardList, label: 'Tasks', desc: 'Get things done' },
  { id: 'habits', icon: Target, label: 'Habits', desc: 'Build routines' },
  { id: 'fitness', icon: Dumbbell, label: 'Fitness', desc: 'Workout tracker' },
  { id: 'sleep', icon: Moon, label: 'Sleep', desc: 'Rest & recovery' },
  { id: 'motivation', icon: Sparkles, label: 'Motivate', desc: 'Daily inspiration' },
  { id: 'gamification', icon: Trophy, label: 'Progress', desc: 'XP & achievements' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', desc: 'Your insights' },
  { id: 'settings', icon: Settings, label: 'Settings', desc: 'App settings' },
  { id: 'meals', icon: Utensils, label: 'Meals DB', desc: '700+ recipes' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentPage, setPage } = useStore();

  const showMore = currentPage === 'more';

  return (
    <div className="h-full flex flex-col bg-dark-900 relative">
      {/* Status bar area */}
      <div className="h-1 safe-top" />

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          {showMore ? (
            <div className="h-full scrollable p-4 pb-24">
              <h2 className="text-2xl font-bold gold-text mb-1 mt-2">More</h2>
              <p className="text-dark-300 text-sm mb-6">All your tools in one place</p>
              <div className="grid grid-cols-2 gap-3">
                {MORE_PAGES.map((page) => {
                  const Icon = page.icon;
                  return (
                    <motion.button
                      key={page.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPage(page.id)}
                      className="glass rounded-2xl p-4 flex flex-col gap-2 text-left active:bg-white/5"
                    >
                      <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center">
                        <Icon size={18} className="text-gold-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{page.label}</p>
                        <p className="text-dark-300 text-[11px]">{page.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            children
          )}
        </motion.div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="safe-bottom">
        <div className="glass-strong border-t border-white/5">
          <div className="flex items-center justify-around px-2 py-2">
            {MAIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPage(tab.id)}
                  className="flex flex-col items-center gap-0.5 py-1 px-3 min-w-[56px] relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute -top-1 w-8 h-0.5 rounded-full bg-gold-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${isActive ? 'text-gold-400' : 'text-dark-300'}`}
                  />
                  <span className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? 'text-gold-400' : 'text-dark-400'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
