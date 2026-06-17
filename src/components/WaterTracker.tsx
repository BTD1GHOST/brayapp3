import { motion } from 'framer-motion';
import { Droplets, Plus, Minus } from 'lucide-react';
import { useStore } from '../store';
import ProgressRing from './ProgressRing';

export default function WaterTracker() {
  const store = useStore();
  const today = new Date().toISOString().split('T')[0];
  const waterHabit = store.habits.find(h => h.id === 'h5');
  const todayWater = waterHabit?.completedDates.filter(d => d === today).length || 0;
  const progress = Math.min((todayWater / store.waterGoal) * 100, 100);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const count = waterHabit?.completedDates.filter(dd => dd === dateStr).length || 0;
    return { dayName, count, date: dateStr, isToday: dateStr === today };
  });

  const addWater = () => {
    // Add today's date to water habit completedDates (allows multiple glasses)
    const habit = store.habits.find(h => h.id === 'h5');
    if (habit) {
      const updatedHabits = store.habits.map(h => 
        h.id === 'h5' ? { ...h, completedDates: [...h.completedDates, today] } : h
      );
      useStore.setState({ habits: updatedHabits });
      store.addXP(5);
    }
  };

  const removeWater = () => {
    const habit = store.habits.find(h => h.id === 'h5');
    if (habit && habit.completedDates.includes(today)) {
      const dates = [...habit.completedDates];
      const idx = dates.lastIndexOf(today);
      if (idx >= 0) {
        dates.splice(idx, 1);
        const updatedHabits = store.habits.map(h => 
          h.id === 'h5' ? { ...h, completedDates: dates } : h
        );
        useStore.setState({ habits: updatedHabits });
      }
    }
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Water Tracker</h1>
          <p className="text-dark-300 text-sm">Stay hydrated, stay sharp</p>
        </div>

        {/* Main Ring */}
        <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4">
          <ProgressRing progress={progress} size={160} strokeWidth={10} color="#06b6d4">
            <div className="flex flex-col items-center">
              <Droplets size={20} className="text-cyan-400 mb-1" />
              <span className="text-3xl font-bold text-white">{todayWater}</span>
              <span className="text-dark-300 text-[10px]">of {store.waterGoal} glasses</span>
            </div>
          </ProgressRing>

          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={removeWater}
              className="w-12 h-12 rounded-full glass flex items-center justify-center"
            >
              <Minus size={20} className="text-dark-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addWater}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}
            >
              <Plus size={24} className="text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { for (let i = 0; i < 2; i++) addWater(); }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center"
            >
              <span className="text-dark-300 text-sm font-bold">+2</span>
            </motion.button>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">This Week</h3>
          <div className="flex items-end justify-between gap-2">
            {weekDays.map(day => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-dark-600 rounded-full overflow-hidden" style={{ height: 80 }}>
                  <div className="w-full rounded-full transition-all duration-500"
                    style={{
                      height: `${Math.min((day.count / store.waterGoal) * 100, 100)}%`,
                      background: day.isToday ? 'linear-gradient(to top, #06b6d4, #22d3ee)' : 'rgba(6, 182, 212, 0.3)',
                      marginTop: 'auto',
                      minHeight: day.count > 0 ? '4px' : '0',
                    }} />
                </div>
                <span className={`text-[9px] ${day.isToday ? 'text-cyan-400 font-bold' : 'text-dark-400'}`}>
                  {day.dayName}
                </span>
                <span className="text-[8px] text-dark-400">{day.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Hydration Benefits</h3>
          <div className="space-y-2">
            {[
              'Boosts metabolism by 3-5%',
              'Improves skin elasticity and appearance',
              'Enhances exercise performance',
              'Reduces hunger and cravings',
              'Supports kidney function',
              'Improves cognitive function',
              'Aids in nutrient absorption',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <Droplets size={10} className="text-cyan-400 flex-shrink-0" />
                <span className="text-dark-200 text-xs">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
