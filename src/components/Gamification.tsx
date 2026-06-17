import { Trophy, Star, Flame, Lock, Unlock, Zap } from 'lucide-react';
import { useStore } from '../store';
import ProgressRing from './ProgressRing';

const LEVEL_TITLES: Record<number, string> = {
  1: 'Novice',
  2: 'Apprentice',
  3: 'Initiate',
  4: 'Adept',
  5: 'Rising Star',
  6: 'Warrior',
  7: 'Elite',
  8: 'Champion',
  9: 'Legend',
  10: 'Ascended',
};

export default function Gamification() {
  const store = useStore();
  const unlockedAchievements = store.achievements.filter(a => a.unlockedAt);
  const lockedAchievements = store.achievements.filter(a => !a.unlockedAt);
  const xpForNextLevel = store.level * 500;
  const xpProgress = ((store.xp % 500) / 500) * 100;
  const levelTitle = LEVEL_TITLES[Math.min(store.level, 10)] || 'Ascended';

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Progress</h1>
          <p className="text-dark-300 text-sm">Level up your life</p>
        </div>

        {/* Level Card */}
        <div className="glass-gold rounded-2xl p-5 flex items-center gap-5">
          <ProgressRing progress={xpProgress} size={90} strokeWidth={8} color="#d4af37">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white">{store.level}</span>
              <span className="text-[8px] text-dark-300">LEVEL</span>
            </div>
          </ProgressRing>
          <div className="flex-1">
            <h3 className="gold-text font-bold text-lg">{levelTitle}</h3>
            <p className="text-dark-300 text-xs mb-2">{store.xp} / {xpForNextLevel} XP</p>
            <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all"
                style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 text-center">
            <Flame size={20} className="text-orange-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{store.loginStreak}</p>
            <p className="text-dark-300 text-[9px]">Login Streak</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Trophy size={20} className="text-gold-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{unlockedAchievements.length}</p>
            <p className="text-dark-300 text-[9px]">Achievements</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Zap size={20} className="text-yellow-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{store.xp}</p>
            <p className="text-dark-300 text-[9px]">Total XP</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Star size={20} className="text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{store.getLooksMaxScore()}</p>
            <p className="text-dark-300 text-[9px]">LooksMax Score</p>
          </div>
        </div>

        {/* Streak Badges */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Flame size={14} className="text-orange-400" /> Active Streaks
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Journal', streak: store.getJournalStreak(), icon: '📝', color: '#3b82f6' },
              { name: 'Fitness', streak: store.getFitnessStreak(), icon: '💪', color: '#ef4444' },
              { name: 'Bible Reading', streak: store.getBibleStreak(), icon: '📖', color: '#d4af37' },
              { name: 'Login', streak: store.loginStreak, icon: '🔥', color: '#f59e0b' },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-lg">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-xs">{s.name}</span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.streak} days</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((s.streak / 30) * 100, 100)}%`, background: s.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked Achievements */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Unlock size={14} className="text-green-400" /> Unlocked ({unlockedAchievements.length})
          </h3>
          <div className="space-y-2">
            {unlockedAchievements.map(a => (
              <div key={a.id} className="glass-gold rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">{a.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-xs font-semibold">{a.name}</p>
                  <p className="text-dark-300 text-[10px]">{a.description}</p>
                </div>
                <span className="text-gold-400 text-[10px] font-bold">+{a.xpReward} XP</span>
              </div>
            ))}
            {unlockedAchievements.length === 0 && (
              <p className="text-dark-400 text-sm text-center py-4">Start completing activities to unlock achievements!</p>
            )}
          </div>
        </div>

        {/* Locked Achievements */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Lock size={14} className="text-dark-300" /> Locked ({lockedAchievements.length})
          </h3>
          <div className="space-y-2">
            {lockedAchievements.map(a => (
              <div key={a.id} className="glass rounded-xl p-3 flex items-center gap-3 opacity-50">
                <span className="text-2xl grayscale">{a.icon}</span>
                <div className="flex-1">
                  <p className="text-dark-200 text-xs font-semibold">{a.name}</p>
                  <p className="text-dark-400 text-[10px]">{a.description}</p>
                </div>
                <span className="text-dark-400 text-[10px]">+{a.xpReward} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level Progression */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Level Progression</h3>
          <div className="space-y-1.5">
            {Object.entries(LEVEL_TITLES).map(([lvl, title]) => {
              const level = parseInt(lvl);
              const isActive = store.level === level;
              const isUnlocked = store.level >= level;
              return (
                <div key={lvl} className={`flex items-center gap-2 p-2 rounded-lg ${isActive ? 'glass-gold' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isUnlocked ? 'bg-gold-400 text-black' : 'bg-dark-600 text-dark-400'
                  }`}>
                    {lvl}
                  </div>
                  <span className={`text-xs ${isActive ? 'text-gold-400 font-bold' : isUnlocked ? 'text-dark-200' : 'text-dark-400'}`}>
                    {title}
                  </span>
                  {isActive && <span className="ml-auto text-gold-400 text-[9px]">← You are here</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
