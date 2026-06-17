import { useStore } from '../store';
import { BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const store = useStore();

  // Weight chart data
  const weightData = store.weightHistory.slice(-14).map(e => ({
    date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: e.weight,
  }));

  // Calorie chart data (last 7 days)
  const calorieData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayCalories = store.mealLog
      .filter(m => m.timestamp.startsWith(dateStr))
      .reduce((s, m) => s + m.calories, 0);
    return { date: dayName, calories: dayCalories };
  });

  // Habit completion data (last 7 days)
  const habitData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const completed = store.habits.filter(h => h.completedDates.includes(dateStr)).length;
    return { date: dayName, completed, total: store.habits.length };
  });

  // Sleep data
  const sleepData = store.sleepEntries.slice(-7).map(e => ({
    date: new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: e.duration,
    quality: e.quality * 20,
  }));

  // Task stats
  const tasksByPriority = [
    { name: 'High', value: store.tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: store.tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: store.tasks.filter(t => t.priority === 'low').length, color: '#22c55e' },
  ].filter(t => t.value > 0);

  // Journal entries per week
  const journalData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const entries = store.journalEntries.filter(e => e.date === dateStr).length;
    return { date: dayName, entries };
  });

  const tooltipStyle = {
    contentStyle: { background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, color: '#fff', fontSize: 12 },
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Analytics</h1>
          <p className="text-dark-300 text-sm">Your progress, visualized</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-white">{store.weightHistory.length}</p>
            <p className="text-dark-300 text-[9px]">Weight Entries</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-white">{store.mealLog.length}</p>
            <p className="text-dark-300 text-[9px]">Meals Logged</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-white">{store.journalEntries.length}</p>
            <p className="text-dark-300 text-[9px]">Journal Entries</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-white">{store.workouts.length}</p>
            <p className="text-dark-300 text-[9px]">Workouts</p>
          </div>
        </div>

        {/* Weight Trend */}
        {weightData.length > 1 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <BarChart3 size={14} className="text-gold-400" /> Weight Trend
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 9 }} domain={['auto', 'auto']} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="weight" stroke="#d4af37" strokeWidth={2} dot={{ fill: '#d4af37', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Calorie Chart */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Calories (7 Days)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieData}>
                <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 9 }} />
                <YAxis stroke="#555" tick={{ fontSize: 9 }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="calories" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Habit Completion */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Habit Completion</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitData}>
                <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 9 }} />
                <YAxis stroke="#555" tick={{ fontSize: 9 }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Chart */}
        {sleepData.length > 0 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Sleep Hours</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                  <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 9 }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Task Priority Pie */}
        {tasksByPriority.length > 0 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Task Priority</h3>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={tasksByPriority} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {tasksByPriority.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Journal Activity */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Journal Activity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={journalData}>
                <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 9 }} />
                <YAxis stroke="#555" tick={{ fontSize: 9 }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="entries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">All-Time Stats</h3>
          <div className="space-y-2">
            {[
              { label: 'Total Water Glasses', value: store.habits.find(h => h.id === 'h5')?.completedDates.length || 0 },
              { label: 'Total Workouts', value: store.workouts.length },
              { label: 'Total Journal Entries', value: store.journalEntries.length },
              { label: 'Total Tasks Created', value: store.tasks.length },
              { label: 'Tasks Completed', value: store.tasks.filter(t => t.completed).length },
              { label: 'Bible Bookmarks', value: store.bookmarks.length },
              { label: 'Achievements Unlocked', value: store.achievements.filter(a => a.unlockedAt).length },
              { label: 'Total XP Earned', value: store.xp },
              { label: 'Current Level', value: store.level },
              { label: 'Sleep Entries', value: store.sleepEntries.length },
            ].map(stat => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-dark-200 text-xs">{stat.label}</span>
                <span className="text-gold-400 text-xs font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
