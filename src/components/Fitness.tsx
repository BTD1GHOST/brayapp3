import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, TrendingUp } from 'lucide-react';
import { useStore } from '../store';
import type { Workout, Exercise } from '../types';
const WORKOUT_TEMPLATES = [
  { name: 'Push Day', exercises: [{ name: 'Bench Press', sets: 4, reps: 8 }, { name: 'Overhead Press', sets: 3, reps: 10 }, { name: 'Incline DB Press', sets: 3, reps: 10 }, { name: 'Lateral Raises', sets: 3, reps: 12 }, { name: 'Tricep Pushdowns', sets: 3, reps: 12 }] },
  { name: 'Pull Day', exercises: [{ name: 'Deadlift', sets: 4, reps: 5 }, { name: 'Pull-ups', sets: 3, reps: 8 }, { name: 'Barbell Rows', sets: 4, reps: 8 }, { name: 'Face Pulls', sets: 3, reps: 15 }, { name: 'Bicep Curls', sets: 3, reps: 12 }] },
  { name: 'Leg Day', exercises: [{ name: 'Squat', sets: 4, reps: 8 }, { name: 'Romanian Deadlift', sets: 3, reps: 10 }, { name: 'Leg Press', sets: 3, reps: 12 }, { name: 'Leg Curls', sets: 3, reps: 12 }, { name: 'Calf Raises', sets: 4, reps: 15 }] },
  { name: 'Upper Body', exercises: [{ name: 'Bench Press', sets: 4, reps: 8 }, { name: 'Barbell Rows', sets: 4, reps: 8 }, { name: 'Overhead Press', sets: 3, reps: 10 }, { name: 'Pull-ups', sets: 3, reps: 8 }, { name: 'Curls', sets: 3, reps: 12 }] },
  { name: 'Full Body', exercises: [{ name: 'Squat', sets: 4, reps: 8 }, { name: 'Bench Press', sets: 4, reps: 8 }, { name: 'Barbell Rows', sets: 3, reps: 10 }, { name: 'Overhead Press', sets: 3, reps: 10 }] },
];

export default function Fitness() {
  const store = useStore();
  const [showNew, setShowNew] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutType, setWorkoutType] = useState<Workout['type']>('strength');
  const [duration, setDuration] = useState('60');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exName, setExName] = useState('');
  const [exSets, setExSets] = useState('3');
  const [exReps, setExReps] = useState('10');
  const [exWeight, setExWeight] = useState('');

  const fitnessStreak = store.getFitnessStreak();

  const addExercise = () => {
    if (!exName.trim()) return;
    setExercises([...exercises, {
      name: exName,
      sets: parseInt(exSets) || 3,
      reps: parseInt(exReps) || 10,
      weight: parseFloat(exWeight) || undefined,
    }]);
    setExName(''); setExSets('3'); setExReps('10'); setExWeight('');
  };

  const handleSave = () => {
    if (!workoutName.trim()) return;
    store.addWorkout({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      name: workoutName,
      type: workoutType,
      duration: parseInt(duration) || 60,
      exercises,
    });
    setWorkoutName(''); setExercises([]); setShowNew(false);
  };

  const useTemplate = (template: typeof WORKOUT_TEMPLATES[0]) => {
    setWorkoutName(template.name);
    setExercises(template.exercises.map(e => ({ ...e })));
  };

  // Get PR tracking
  const allExercises = store.workouts.flatMap(w => w.exercises);
  const prs: Record<string, { weight: number; date: string }> = {};
  allExercises.forEach(ex => {
    if (ex.weight && (!prs[ex.name] || ex.weight > prs[ex.name].weight)) {
      prs[ex.name] = { weight: ex.weight, date: '' };
    }
  });

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Fitness</h1>
          <p className="text-dark-300 text-sm">Build your best physique</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xl font-bold text-white">{store.workouts.length}</p>
            <p className="text-dark-300 text-[9px]">Workouts</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xl font-bold text-white">{fitnessStreak}</p>
            <p className="text-dark-300 text-[9px]">Streak 🔥</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xl font-bold text-white">{Object.keys(prs).length}</p>
            <p className="text-dark-300 text-[9px]">PRs</p>
          </div>
        </div>

        {/* New Workout Button */}
        {!showNew ? (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowNew(true)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
            <Plus size={16} /> Log Workout
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">New Workout</h3>
              <button onClick={() => setShowNew(false)}><X size={16} className="text-dark-300" /></button>
            </div>

            <input value={workoutName} onChange={e => setWorkoutName(e.target.value)} placeholder="Workout name"
              className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />

            <div className="flex gap-2">
              {(['strength', 'cardio', 'flexibility'] as const).map(t => (
                <button key={t} onClick={() => setWorkoutType(t)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${workoutType === t ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (min)"
              className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />

            {/* Templates */}
            <div>
              <p className="text-dark-300 text-[10px] mb-1.5 uppercase tracking-wider">Templates</p>
              <div className="flex gap-1.5 overflow-x-auto scrollable">
                {WORKOUT_TEMPLATES.map(t => (
                  <button key={t.name} onClick={() => useTemplate(t)}
                    className="px-3 py-1.5 rounded-lg glass text-dark-200 text-xs whitespace-nowrap">
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Exercise */}
            <div className="glass rounded-xl p-3 space-y-2">
              <p className="text-dark-300 text-[10px] uppercase tracking-wider">Add Exercise</p>
              <input value={exName} onChange={e => setExName(e.target.value)} placeholder="Exercise name"
                className="w-full px-3 py-2 rounded-lg glass text-white text-xs" />
              <div className="grid grid-cols-3 gap-2">
                <input type="number" value={exSets} onChange={e => setExSets(e.target.value)} placeholder="Sets"
                  className="px-3 py-2 rounded-lg glass text-white text-xs" />
                <input type="number" value={exReps} onChange={e => setExReps(e.target.value)} placeholder="Reps"
                  className="px-3 py-2 rounded-lg glass text-white text-xs" />
                <input type="number" value={exWeight} onChange={e => setExWeight(e.target.value)} placeholder="Weight"
                  className="px-3 py-2 rounded-lg glass text-white text-xs" />
              </div>
              <button onClick={addExercise} className="w-full py-1.5 rounded-lg glass text-gold-400 text-xs font-medium">+ Add Exercise</button>
            </div>

            {/* Exercise List */}
            {exercises.length > 0 && (
              <div className="space-y-1">
                {exercises.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between glass rounded-lg px-3 py-2">
                    <div>
                      <p className="text-white text-xs">{ex.name}</p>
                      <p className="text-dark-300 text-[10px]">{ex.sets}x{ex.reps} {ex.weight ? `@ ${exWeight}lbs` : ''}</p>
                    </div>
                    <button onClick={() => setExercises(exercises.filter((_, j) => j !== i))} className="text-dark-400">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
              Save Workout
            </motion.button>
          </motion.div>
        )}

        {/* PR Tracker */}
        {Object.keys(prs).length > 0 && (
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-gold-400" /> Personal Records
            </h3>
            <div className="space-y-2">
              {Object.entries(prs).slice(0, 8).map(([name, data]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-dark-200 text-xs">{name}</span>
                  <span className="text-gold-400 text-xs font-bold">{data.weight} lbs</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workout History */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Workout History</h3>
          {store.workouts.length === 0 ? (
            <p className="text-dark-400 text-sm text-center py-4">No workouts logged yet</p>
          ) : (
            <div className="space-y-2">
              {store.workouts.slice(0, 10).map(workout => (
                <div key={workout.id} className="glass rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-sm font-medium">{workout.name}</p>
                    <span className="text-dark-300 text-[10px]">{workout.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300 text-[10px]">
                    <span>{workout.type}</span>
                    <span>{workout.duration} min</span>
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
