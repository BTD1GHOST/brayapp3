import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Plus, X, BedDouble } from 'lucide-react';
import { useStore } from '../store';
import ProgressRing from './ProgressRing';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SleepCenter() {
  const store = useStore();
  const [showLog, setShowLog] = useState(false);
  const [bedtime, setBedtime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('06:30');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(4);

  const lastSleep = store.sleepEntries.length > 0 ? store.sleepEntries[store.sleepEntries.length - 1] : null;
  const sleepScore = lastSleep ? lastSleep.quality * 20 : 0;

  const avgQuality = store.sleepEntries.length > 0
    ? store.sleepEntries.reduce((s, e) => s + e.quality, 0) / store.sleepEntries.length
    : 0;

  const avgDuration = store.sleepEntries.length > 0
    ? store.sleepEntries.reduce((s, e) => s + e.duration, 0) / store.sleepEntries.length
    : 0;

  const handleLog = () => {
    const bed = new Date(`2024-01-01T${bedtime}`);
    const wake = new Date(`2024-01-02T${wakeTime}`);
    let diff = (wake.getTime() - bed.getTime()) / (1000 * 60 * 60);
    if (diff < 0) diff += 24;

    store.addSleepEntry({
      date: new Date().toISOString().split('T')[0],
      bedtime,
      wakeTime,
      quality,
      duration: Math.round(diff * 10) / 10,
    });
    setShowLog(false);
    store.addXP(15);
  };

  const chartData = store.sleepEntries.slice(-7).map(e => ({
    date: new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: e.duration,
    quality: e.quality * 20,
  }));

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Sleep Center</h1>
          <p className="text-dark-300 text-sm">Optimize your recovery</p>
        </div>

        {/* Sleep Score */}
        <div className="glass-gold rounded-2xl p-6 flex items-center gap-6">
          <ProgressRing progress={sleepScore} size={100} strokeWidth={8} color="#8b5cf6">
            <div className="flex flex-col items-center">
              <Moon size={16} className="text-purple-400 mb-1" />
              <span className="text-xl font-bold text-white">{sleepScore || '—'}</span>
              <span className="text-[8px] text-dark-300">SCORE</span>
            </div>
          </ProgressRing>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-2">Last Night</h3>
            {lastSleep ? (
              <div className="space-y-1">
                <p className="text-dark-200 text-xs">🛏️ Bed: {lastSleep.bedtime}</p>
                <p className="text-dark-200 text-xs">⏰ Wake: {lastSleep.wakeTime}</p>
                <p className="text-dark-200 text-xs">⏱️ Duration: {lastSleep.duration}h</p>
              </div>
            ) : (
              <p className="text-dark-400 text-xs">No sleep data yet</p>
            )}
          </div>
        </div>

        {/* Averages */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{avgDuration.toFixed(1)}</p>
            <p className="text-dark-300 text-[10px]">Avg Hours</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{(avgQuality * 20).toFixed(0)}</p>
            <p className="text-dark-300 text-[10px]">Avg Score</p>
          </div>
        </div>

        {/* Log Sleep */}
        {!showLog ? (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowLog(true)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
            <Plus size={16} /> Log Sleep
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Log Sleep</h3>
              <button onClick={() => setShowLog(false)}><X size={16} className="text-dark-300" /></button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-dark-300 text-[10px]">Bedtime</label>
                <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />
              </div>
              <div>
                <label className="text-dark-300 text-[10px]">Wake Time</label>
                <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />
              </div>
            </div>

            <div>
              <p className="text-dark-300 text-[10px] mb-1.5">Sleep Quality</p>
              <div className="flex gap-2">
                {([1, 2, 3, 4, 5] as const).map(q => (
                  <button key={q} onClick={() => setQuality(q)}
                    className={`flex-1 py-2 rounded-xl text-sm ${quality === q ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                    {['😢', '😕', '😐', '😊', '😄'][q - 1]}
                  </button>
                ))}
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={handleLog}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
              Save
            </motion.button>
          </motion.div>
        )}

        {/* Sleep Chart */}
        {chartData.length > 1 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Sleep Analytics</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <BedDouble size={14} className="text-purple-400" /> Sleep Tips
          </h3>
          <div className="space-y-2">
            {[
              'Keep a consistent sleep schedule — even on weekends',
              'Room temperature should be 65-68°F (18-20°C)',
              'No screens 1 hour before bed',
              'Avoid caffeine after 2 PM',
              'Use blackout curtains and white noise',
              'Take magnesium glycinate before bed',
              'Create a relaxing bedtime routine',
              'Avoid large meals 2-3 hours before sleep',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <Moon size={10} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-200 text-xs">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
