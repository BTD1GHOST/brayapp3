import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, TrendingDown, Calculator, Ruler, Camera, BookOpen, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function calculateTDEE(weight: number, height: number, age: number, gender: string, activity: number): number {
  const bmr = gender === 'male'
    ? 10 * weight / 2.205 + 6.25 * height * 2.54 - 5 * age + 5
    : 10 * weight / 2.205 + 6.25 * height * 2.54 - 5 * age - 161;
  return Math.round(bmr * activity);
}

const EDUCATION = [
  { title: 'Fat Loss Fundamentals', content: 'Fat loss requires a sustained caloric deficit. Aim for 300-500 calories below your TDEE for sustainable loss of 0.5-1 lb per week. Crash diets lead to muscle loss and metabolic adaptation.' },
  { title: 'Nutrition Basics', content: 'Prioritize protein (1g/lb bodyweight), eat plenty of vegetables, choose whole grains, and limit processed foods. Meal prep helps maintain consistency.' },
  { title: 'Calorie Deficit', content: 'A calorie deficit means consuming fewer calories than you burn. Track everything you eat, measure portions, and be honest about condiments and cooking oils.' },
  { title: 'Protein Intake', content: 'Higher protein diets preserve muscle during deficit, increase satiety, and have the highest thermic effect. Aim for 25-40g per meal spread across 4 meals.' },
  { title: 'Exercise Strategy', content: 'Combine resistance training (3-4x/week) with moderate cardio (2-3x/week). Strength training preserves muscle and increases metabolic rate.' },
  { title: 'Recovery & Sleep', content: 'Sleep 7-9 hours per night. Poor sleep increases hunger hormones (ghrelin) and decreases satiety hormones (leptin), making fat loss significantly harder.' },
  { title: 'Hydration', content: 'Drink at least 1 gallon of water daily. Water boosts metabolism by 3-5%, reduces hunger, and improves exercise performance. Often thirst is confused with hunger.' },
];

const ACTIVITY_LEVELS = [
  { label: 'Sedentary', value: 1.2 },
  { label: 'Lightly Active', value: 1.375 },
  { label: 'Moderately Active', value: 1.55 },
  { label: 'Very Active', value: 1.725 },
  { label: 'Extremely Active', value: 1.9 },
];

export default function WeightLoss() {
  const store = useStore();
  const [showCalc, setShowCalc] = useState(false);
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [newWeight, setNewWeight] = useState('');
  const [showEducation, setShowEducation] = useState<number | null>(null);

  const tdee = calculateTDEE(store.currentWeight, store.height, store.age, store.gender, activityLevel);
  const deficitCalories = tdee - 500;
  const weightDiff = store.currentWeight - store.goalWeight;

  const chartData = store.weightHistory.slice(-14).map(e => ({
    date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: e.weight,
  }));

  const handleLogWeight = () => {
    const w = parseFloat(newWeight);
    if (w > 0) {
      store.addWeightEntry({
        date: new Date().toISOString().split('T')[0],
        weight: w,
        unit: store.unit,
      });
      setNewWeight('');
      store.addXP(15);
    }
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Weight Loss Center</h1>
          <p className="text-dark-300 text-sm">Transform your body with science</p>
        </div>

        {/* Weight Overview */}
        <div className="glass-gold rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-dark-300 text-xs uppercase tracking-wider">Current Weight</p>
              <p className="text-3xl font-bold text-white">{store.currentWeight} <span className="text-sm text-dark-300">{store.unit}</span></p>
            </div>
            <div className="text-right">
              <p className="text-dark-300 text-xs uppercase tracking-wider">Goal</p>
              <p className="text-2xl font-bold text-gold-400">{store.goalWeight} <span className="text-sm text-dark-300">{store.unit}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={14} className="text-green-400" />
            <span className="text-dark-200 text-sm">{weightDiff > 0 ? `${weightDiff} ${store.unit} to lose` : 'Goal reached! 🎉'}</span>
          </div>
          <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all"
              style={{ width: `${Math.max(0, Math.min(100, ((store.currentWeight - store.goalWeight) / Math.max(store.currentWeight, 1)) * 100))}%` }} />
          </div>
        </div>

        {/* Log Weight */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Log Weight</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder={`Weight in ${store.unit}`}
              className="flex-1 px-4 py-2.5 rounded-xl glass text-white text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogWeight}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}
            >
              Log
            </motion.button>
          </div>
        </div>

        {/* Weight Chart */}
        {chartData.length > 1 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Weight Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, color: '#fff', fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#d4af37" strokeWidth={2} dot={{ fill: '#d4af37', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TDEE Calculator */}
        <div className="glass rounded-2xl overflow-hidden">
          <button onClick={() => setShowCalc(!showCalc)} className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator size={18} className="text-gold-400" />
              <span className="text-white font-semibold text-sm">TDEE Calculator</span>
            </div>
            <ChevronRight size={16} className={`text-dark-300 transition-transform ${showCalc ? 'rotate-90' : ''}`} />
          </button>
          {showCalc && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 space-y-3">
              <div className="space-y-2">
                {ACTIVITY_LEVELS.map(level => (
                  <button
                    key={level.value}
                    onClick={() => setActivityLevel(level.value)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                      activityLevel === level.value ? 'glass-gold text-gold-400' : 'glass text-dark-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
              <div className="glass-gold rounded-xl p-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-dark-200 text-xs">Maintenance (TDEE)</span>
                  <span className="text-white text-xs font-bold">{tdee} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-200 text-xs">Fat Loss (-500)</span>
                  <span className="text-green-400 text-xs font-bold">{deficitCalories} cal</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <Ruler size={14} className="text-blue-400 mb-2" />
            <p className="text-white font-bold text-lg">{store.height}"</p>
            <p className="text-dark-300 text-[10px]">Height</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <Scale size={14} className="text-purple-400 mb-2" />
            <p className="text-white font-bold text-lg">BMI: {((store.currentWeight / (store.height * store.height)) * 703).toFixed(1)}</p>
            <p className="text-dark-300 text-[10px]">Body Mass Index</p>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen size={14} className="text-gold-400" />
            Evidence-Based Education
          </h3>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowEducation(showEducation === i ? null : i)}
                className="w-full p-3.5 flex items-center justify-between text-left"
              >
                <span className="text-white text-sm font-medium">{edu.title}</span>
                <ChevronRight size={14} className={`text-dark-300 transition-transform ${showEducation === i ? 'rotate-90' : ''}`} />
              </button>
              {showEducation === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3.5 pb-3.5">
                  <p className="text-dark-200 text-xs leading-relaxed">{edu.content}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Photos */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Progress Photos</h3>
            <Camera size={14} className="text-dark-300" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {store.photos.filter(p => p.category === 'weight').slice(0, 6).map(photo => (
              <div key={photo.id} className="aspect-square rounded-xl bg-dark-600 overflow-hidden">
                <img src={photo.dataUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {store.photos.filter(p => p.category === 'weight').length === 0 && (
              <div className="col-span-3 text-center py-6">
                <Camera size={24} className="text-dark-500 mx-auto mb-2" />
                <p className="text-dark-400 text-xs">Add progress photos in Settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
