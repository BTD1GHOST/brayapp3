import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, Star, ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { MEALS, searchMeals, getMealsByCategory } from '../data/meals';
import type { MealEntry } from '../types';

export default function CalorieTracker() {
  const store = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customName, setCustomName] = useState('');
  const [customCal, setCustomCal] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFats, setCustomFats] = useState('');
  const [mealType, setMealType] = useState<MealEntry['category']>('lunch');

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = store.mealLog.filter(m => m.timestamp.startsWith(today));
  const todayCalories = todayEntries.reduce((s, m) => s + m.calories, 0);
  const todayProtein = todayEntries.reduce((s, m) => s + m.protein, 0);
  const todayCarbs = todayEntries.reduce((s, m) => s + m.carbs, 0);
  const todayFats = todayEntries.reduce((s, m) => s + m.fats, 0);

  const filteredMeals = searchQuery
    ? searchMeals(searchQuery)
    : selectedCategory === 'all'
      ? MEALS
      : getMealsByCategory(selectedCategory as any);

  const addCustomMeal = () => {
    const cal = parseFloat(customCal) || 0;
    if (cal <= 0) return;
    store.addMealLog({
      id: Date.now().toString(),
      name: customName || 'Custom Meal',
      calories: cal,
      protein: parseFloat(customProtein) || 0,
      carbs: parseFloat(customCarbs) || 0,
      fats: parseFloat(customFats) || 0,
      servings: 1,
      timestamp: new Date().toISOString(),
      category: mealType,
      isFavorite: false,
    });
    setCustomName(''); setCustomCal(''); setCustomProtein(''); setCustomCarbs(''); setCustomFats('');
    store.addXP(10);
  };

  const addFromDB = (meal: typeof MEALS[0]) => {
    store.addMealLog({
      id: Date.now().toString(),
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      servings: 1,
      timestamp: new Date().toISOString(),
      category: meal.category,
      isFavorite: false,
    });
    store.addXP(5);
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Calorie Tracker</h1>
          <p className="text-dark-300 text-sm">Fuel your transformation</p>
        </div>

        {/* Today's Summary */}
        <div className="glass-gold rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-dark-200 text-xs uppercase tracking-wider">Today's Intake</span>
            <span className="text-gold-400 text-xs font-bold">{store.calorieGoal - todayCalories} remaining</span>
          </div>
          <div className="flex items-end gap-4 mb-3">
            <div>
              <p className="text-3xl font-bold text-white">{todayCalories}</p>
              <p className="text-dark-300 text-[10px]">of {store.calorieGoal} cal</p>
            </div>
          </div>
          <div className="h-2 bg-dark-600 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all"
              style={{ width: `${Math.min((todayCalories / store.calorieGoal) * 100, 100)}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-red-400 text-sm font-bold">{todayProtein}g</p>
              <p className="text-dark-300 text-[9px]">Protein</p>
            </div>
            <div className="text-center">
              <p className="text-blue-400 text-sm font-bold">{todayCarbs}g</p>
              <p className="text-dark-300 text-[9px]">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-400 text-sm font-bold">{todayFats}g</p>
              <p className="text-dark-300 text-[9px]">Fats</p>
            </div>
          </div>
        </div>

        {/* Add Custom Meal */}
        <div className="glass rounded-2xl overflow-hidden">
          <button onClick={() => setShowAdd(!showAdd)} className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plus size={18} className="text-gold-400" />
              <span className="text-white font-semibold text-sm">Log Food</span>
            </div>
            <ChevronDown size={16} className={`text-dark-300 transition-transform ${showAdd ? 'rotate-180' : ''}`} />
          </button>
          {showAdd && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 space-y-2">
              <div className="flex gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(t => (
                  <button key={t} onClick={() => setMealType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mealType === t ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Food name" className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={customCal} onChange={e => setCustomCal(e.target.value)} placeholder="Calories" className="px-3 py-2.5 rounded-xl glass text-white text-sm" />
                <input type="number" value={customProtein} onChange={e => setCustomProtein(e.target.value)} placeholder="Protein (g)" className="px-3 py-2.5 rounded-xl glass text-white text-sm" />
                <input type="number" value={customCarbs} onChange={e => setCustomCarbs(e.target.value)} placeholder="Carbs (g)" className="px-3 py-2.5 rounded-xl glass text-white text-sm" />
                <input type="number" value={customFats} onChange={e => setCustomFats(e.target.value)} placeholder="Fats (g)" className="px-3 py-2.5 rounded-xl glass text-white text-sm" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={addCustomMeal}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
                Add Meal
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Today's Log */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Today's Log</h3>
          {todayEntries.length === 0 ? (
            <p className="text-dark-400 text-sm text-center py-4">No meals logged today</p>
          ) : (
            <div className="space-y-2">
              {todayEntries.map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{entry.name}</p>
                    <p className="text-dark-300 text-[10px]">{entry.protein}p • {entry.carbs}c • {entry.fats}f</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold-400 text-sm font-bold">{entry.calories}</span>
                    <button onClick={() => store.removeMealLog(entry.id)} className="text-dark-400 hover:text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meal Database Search */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Meal Database</h3>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search meals..." className="w-full pl-8 pr-3 py-2 rounded-xl glass text-white text-sm" />
            </div>
          </div>
          <div className="flex gap-1.5 mb-3 overflow-x-auto">
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${selectedCategory === cat ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto scrollable">
            {filteredMeals.slice(0, 20).map(meal => (
              <div key={meal.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/3">
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-white text-xs font-medium truncate">{meal.name}</p>
                  <p className="text-dark-300 text-[10px]">{meal.calories}cal • {meal.protein}p • {meal.carbs}c • {meal.fats}f</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => store.toggleFavoriteMeal(meal.id)}
                    className={store.favoriteMeals.includes(meal.id) ? 'text-gold-400' : 'text-dark-400'}>
                    <Star size={12} fill={store.favoriteMeals.includes(meal.id) ? 'currentColor' : 'none'} />
                  </button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => addFromDB(meal)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
                    + Add
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
