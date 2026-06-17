import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeightEntry, MealEntry, JournalEntry, Task, Habit, Workout, SleepEntry, PhotoEntry, Achievement, BibleBookmark, BodyMeasurement } from './types';

const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', name: 'Exercise', icon: '💪', completedDates: [], color: '#ef4444' },
  { id: 'h2', name: 'Reading', icon: '📚', completedDates: [], color: '#3b82f6' },
  { id: 'h3', name: 'Prayer', icon: '🙏', completedDates: [], color: '#a855f7' },
  { id: 'h4', name: 'Bible Reading', icon: '📖', completedDates: [], color: '#d4af37' },
  { id: 'h5', name: 'Water Intake', icon: '💧', completedDates: [], color: '#06b6d4' },
  { id: 'h6', name: 'Sleep 8hrs', icon: '😴', completedDates: [], color: '#6366f1' },
  { id: 'h7', name: 'Skin Care', icon: '✨', completedDates: [], color: '#ec4899' },
  { id: 'h8', name: 'Meditation', icon: '🧘', completedDates: [], color: '#14b8a6' },
  { id: 'h9', name: 'Walking', icon: '🚶', completedDates: [], color: '#22c55e' },
  { id: 'h10', name: 'Healthy Eating', icon: '🥗', completedDates: [], color: '#f59e0b' },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', name: 'First Login', description: 'Welcome to Ascend!', icon: '🏆', xpReward: 50 },
  { id: 'a2', name: 'Week Warrior', description: '7-day login streak', icon: '🔥', xpReward: 100 },
  { id: 'a3', name: 'Journal Starter', description: 'Write your first journal entry', icon: '📝', xpReward: 50 },
  { id: 'a4', name: 'Hydration Hero', description: 'Hit water goal 7 days in a row', icon: '💧', xpReward: 100 },
  { id: 'a5', name: 'Task Master', description: 'Complete 50 tasks', icon: '✅', xpReward: 150 },
  { id: 'a6', name: 'Bible Scholar', description: 'Read 30 chapters', icon: '📖', xpReward: 200 },
  { id: 'a7', name: 'Fitness Freak', description: 'Log 20 workouts', icon: '💪', xpReward: 150 },
  { id: 'a8', name: 'Early Bird', description: 'Wake up before 6 AM 5 times', icon: '🌅', xpReward: 100 },
  { id: 'a9', name: 'LooksMax Level 5', description: 'Reach LooksMax score of 75+', icon: '👑', xpReward: 200 },
  { id: 'a10', name: 'Iron Will', description: '30-day habit streak', icon: '⚡', xpReward: 300 },
  { id: 'a11', name: 'Weight Milestone', description: 'Lose your first 5 lbs', icon: '⚖️', xpReward: 150 },
  { id: 'a12', name: 'Calorie Conscience', description: 'Log calories for 14 days straight', icon: '🎯', xpReward: 150 },
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_ascend_salt_2024');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const STORED_HASH = 'a3f8c2e1b7d4960f5e3a8c1d2b4f7e9a0c3d5e8f1a4b7c0d3e6f9a2b5c8d1e4';

interface AppState {
  isAuthenticated: boolean;
  loginAttempts: number;
  lockoutUntil: number | null;
  passwordHash: string | null;
  hasSetupPassword: boolean;

  currentWeight: number;
  goalWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  unit: 'lbs' | 'kg';

  calorieGoal: number;
  waterGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;

  weightHistory: WeightEntry[];
  mealLog: MealEntry[];
  journalEntries: JournalEntry[];
  tasks: Task[];
  habits: Habit[];
  workouts: Workout[];
  sleepEntries: SleepEntry[];
  photos: PhotoEntry[];
  achievements: Achievement[];
  bookmarks: BibleBookmark[];
  bodyMeasurements: BodyMeasurement[];
  favoriteMeals: string[];
  favoriteQuotes: string[];

  xp: number;
  level: number;
  loginStreak: number;
  lastLoginDate: string | null;

  currentPage: string;
  theme: 'dark' | 'light';

  login: (password: string) => Promise<boolean>;
  logout: () => void;
  setupPassword: (password: string) => Promise<void>;
  
  setProfile: (data: Partial<Pick<AppState, 'currentWeight' | 'goalWeight' | 'height' | 'age' | 'gender' | 'unit' | 'calorieGoal' | 'waterGoal' | 'proteinGoal' | 'carbsGoal' | 'fatsGoal'>>) => void;
  
  addWeightEntry: (entry: WeightEntry) => void;
  addMealLog: (entry: MealEntry) => void;
  removeMealLog: (id: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  resetCompletedTasks: () => void;
  
  toggleHabit: (habitId: string, date: string) => void;
  addCustomHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  
  addSleepEntry: (entry: SleepEntry) => void;
  
  addPhoto: (photo: PhotoEntry) => void;
  deletePhoto: (id: string) => void;
  
  unlockAchievement: (id: string) => void;
  addXP: (amount: number) => void;
  
  addBookmark: (bookmark: BibleBookmark) => void;
  removeBookmark: (book: string, chapter: number, verse: number) => void;
  
  addBodyMeasurement: (measurement: BodyMeasurement) => void;
  
  toggleFavoriteMeal: (mealId: string) => void;
  toggleFavoriteQuote: (quoteId: string) => void;
  
  setPage: (page: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  
  getTodayCalories: () => number;
  getTodayProtein: () => number;
  getTodayCarbs: () => number;
  getTodayFats: () => number;
  getTodayWater: () => number;
  getTodayHabitScore: () => number;
  getLooksMaxScore: () => number;
  getJournalStreak: () => number;
  getFitnessStreak: () => number;
  getBibleStreak: () => number;
  
  exportData: () => string;
  importData: (json: string) => boolean;
  resetAllData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loginAttempts: 0,
      lockoutUntil: null,
      passwordHash: null,
      hasSetupPassword: false,

      currentWeight: 180,
      goalWeight: 165,
      height: 70,
      age: 25,
      gender: 'male',
      unit: 'lbs',

      calorieGoal: 2200,
      waterGoal: 8,
      proteinGoal: 180,
      carbsGoal: 220,
      fatsGoal: 70,

      weightHistory: [],
      mealLog: [],
      journalEntries: [],
      tasks: [],
      habits: DEFAULT_HABITS,
      workouts: [],
      sleepEntries: [],
      photos: [],
      achievements: ACHIEVEMENTS,
      bookmarks: [],
      bodyMeasurements: [],
      favoriteMeals: [],
      favoriteQuotes: [],

      xp: 0,
      level: 1,
      loginStreak: 0,
      lastLoginDate: null,

      currentPage: 'dashboard',
      theme: 'dark',

      login: async (password: string): Promise<boolean> => {
        const state = get();
        if (state.lockoutUntil && Date.now() < state.lockoutUntil) return false;
        
        const hash = await hashPassword(password);
        const storedHash = state.passwordHash || STORED_HASH;
        
        if (hash === storedHash) {
          const today = getToday();
          const lastLogin = state.lastLoginDate;
          let streak = state.loginStreak;
          
          if (lastLogin) {
            const lastDate = new Date(lastLogin);
            const todayDate = new Date(today);
            const diff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diff === 1) streak++;
            else if (diff > 1) streak = 1;
          } else {
            streak = 1;
          }
          
          set({ 
            isAuthenticated: true, 
            loginAttempts: 0, 
            lockoutUntil: null,
            loginStreak: streak,
            lastLoginDate: today,
            xp: state.xp + 10,
          });
          get().addXP(10);
          if (streak >= 7 && !state.achievements.find(a => a.id === 'a2')?.unlockedAt) {
            get().unlockAchievement('a2');
          }
          return true;
        } else {
          const attempts = state.loginAttempts + 1;
          const lockoutUntil = attempts >= 5 ? Date.now() + 5 * 60 * 1000 : null;
          set({ loginAttempts: attempts, lockoutUntil });
          return false;
        }
      },

      logout: () => set({ isAuthenticated: false }),

      setupPassword: async (password: string) => {
        const hash = await hashPassword(password);
        set({ passwordHash: hash, hasSetupPassword: true });
      },

      setProfile: (data) => set((state) => ({ ...state, ...data })),

      addWeightEntry: (entry) => set((state) => {
        const existing = state.weightHistory.findIndex(e => e.date === entry.date);
        const newHistory = [...state.weightHistory];
        if (existing >= 0) newHistory[existing] = entry;
        else newHistory.push(entry);
        newHistory.sort((a, b) => a.date.localeCompare(b.date));
        return { weightHistory: newHistory, currentWeight: entry.weight };
      }),

      addMealLog: (entry) => set((state) => ({ mealLog: [...state.mealLog, entry] })),
      removeMealLog: (id) => set((state) => ({ mealLog: state.mealLog.filter(e => e.id !== id) })),

      addJournalEntry: (entry) => {
        set((state) => ({ journalEntries: [entry, ...state.journalEntries] }));
        get().addXP(25);
        if (get().journalEntries.length === 1) get().unlockAchievement('a3');
      },

      updateJournalEntry: (id, updates) => set((state) => ({
        journalEntries: state.journalEntries.map(e => e.id === id ? { ...e, ...updates } : e)
      })),

      deleteJournalEntry: (id) => set((state) => ({
        journalEntries: state.journalEntries.filter(e => e.id !== id)
      })),

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      
      updateTask: (id, updates) => set((state) => {
        const tasks = state.tasks.map(t => t.id === id ? { ...t, ...updates } : t);
        const completedCount = tasks.filter(t => t.completed).length;
        if (completedCount >= 50) get().unlockAchievement('a5');
        return { tasks };
      }),

      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),
      
      resetCompletedTasks: () => set((state) => ({
        tasks: state.tasks.map(t => ({ ...t, completed: false }))
      })),

      toggleHabit: (habitId, date) => set((state) => ({
        habits: state.habits.map(h => {
          if (h.id !== habitId) return h;
          const dates = h.completedDates.includes(date)
            ? h.completedDates.filter(d => d !== date)
            : [...h.completedDates, date];
          return { ...h, completedDates: dates };
        })
      })),

      addCustomHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
      deleteHabit: (id) => set((state) => ({ habits: state.habits.filter(h => h.id !== id) })),

      addWorkout: (workout) => {
        set((state) => ({ workouts: [workout, ...state.workouts] }));
        get().addXP(30);
        if (get().workouts.length >= 20) get().unlockAchievement('a7');
      },
      deleteWorkout: (id) => set((state) => ({ workouts: state.workouts.filter(w => w.id !== id) })),

      addSleepEntry: (entry) => set((state) => {
        const existing = state.sleepEntries.findIndex(e => e.date === entry.date);
        const newEntries = [...state.sleepEntries];
        if (existing >= 0) newEntries[existing] = entry;
        else newEntries.push(entry);
        return { sleepEntries: newEntries };
      }),

      addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
      deletePhoto: (id) => set((state) => ({ photos: state.photos.filter(p => p.id !== id) })),

      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(a => 
          a.id === id && !a.unlockedAt ? { ...a, unlockedAt: new Date().toISOString() } : a
        )
      })),

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        return { xp: newXP, level: newLevel };
      }),

      addBookmark: (bookmark) => set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
      removeBookmark: (book, chapter, verse) => set((state) => ({
        bookmarks: state.bookmarks.filter(b => !(b.book === book && b.chapter === chapter && b.verse === verse))
      })),

      addBodyMeasurement: (measurement) => set((state) => {
        const existing = state.bodyMeasurements.findIndex(m => m.date === measurement.date);
        const newMeasurements = [...state.bodyMeasurements];
        if (existing >= 0) newMeasurements[existing] = measurement;
        else newMeasurements.push(measurement);
        return { bodyMeasurements: newMeasurements };
      }),

      toggleFavoriteMeal: (mealId) => set((state) => ({
        favoriteMeals: state.favoriteMeals.includes(mealId)
          ? state.favoriteMeals.filter(id => id !== mealId)
          : [...state.favoriteMeals, mealId]
      })),

      toggleFavoriteQuote: (quoteId) => set((state) => ({
        favoriteQuotes: state.favoriteQuotes.includes(quoteId)
          ? state.favoriteQuotes.filter(id => id !== quoteId)
          : [...state.favoriteQuotes, quoteId]
      })),

      setPage: (page) => set({ currentPage: page }),
      setTheme: (theme) => set({ theme }),

      getTodayCalories: () => {
        const today = getToday();
        return get().mealLog.filter(m => m.timestamp.startsWith(today)).reduce((sum, m) => sum + m.calories, 0);
      },

      getTodayProtein: () => {
        const today = getToday();
        return get().mealLog.filter(m => m.timestamp.startsWith(today)).reduce((sum, m) => sum + m.protein, 0);
      },

      getTodayCarbs: () => {
        const today = getToday();
        return get().mealLog.filter(m => m.timestamp.startsWith(today)).reduce((sum, m) => sum + m.carbs, 0);
      },

      getTodayFats: () => {
        const today = getToday();
        return get().mealLog.filter(m => m.timestamp.startsWith(today)).reduce((sum, m) => sum + m.fats, 0);
      },

      getTodayWater: () => {
        const today = getToday();
        const waterHabit = get().habits.find(h => h.id === 'h5');
        return waterHabit?.completedDates.filter(d => d === today).length || 0;
      },

      getTodayHabitScore: () => {
        const today = getToday();
        const habits = get().habits;
        const completed = habits.filter(h => h.completedDates.includes(today)).length;
        return habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
      },

      getLooksMaxScore: () => {
        const state = get();
        const today = getToday();
        let score = 40;
        
        const skinCareDone = state.habits.find(h => h.id === 'h7')?.completedDates.includes(today);
        if (skinCareDone) score += 8;
        
        const sleepDone = state.habits.find(h => h.id === 'h6')?.completedDates.includes(today);
        if (sleepDone) score += 7;
        
        const exerciseDone = state.habits.find(h => h.id === 'h1')?.completedDates.includes(today);
        if (exerciseDone) score += 8;
        
        const waterDone = state.habits.find(h => h.id === 'h5')?.completedDates.includes(today);
        if (waterDone) score += 5;
        
        const healthyEating = state.habits.find(h => h.id === 'h10')?.completedDates.includes(today);
        if (healthyEating) score += 7;
        
        if (state.getTodayCalories() > 0 && state.getTodayCalories() <= state.calorieGoal) score += 5;
        
        const lastSleep = state.sleepEntries[state.sleepEntries.length - 1];
        if (lastSleep && lastSleep.quality >= 4) score += 5;
        
        const workoutToday = state.workouts.some(w => w.date === today);
        if (workoutToday) score += 7;
        
        return Math.min(100, score);
      },

      getJournalStreak: () => {
        const entries = get().journalEntries;
        if (entries.length === 0) return 0;
        let streak = 0;
        const dates = [...new Set(entries.map(e => e.date))].sort().reverse();
        const today = getToday();
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (dates[0] !== today && dates[0] !== yesterday) return 0;
        
        for (let i = 0; i < dates.length; i++) {
          const expected = new Date(dates[0]);
          expected.setDate(expected.getDate() - i);
          if (dates[i] === expected.toISOString().split('T')[0]) streak++;
          else break;
        }
        return streak;
      },

      getFitnessStreak: () => {
        const workouts = get().workouts;
        if (workouts.length === 0) return 0;
        let streak = 0;
        const dates = [...new Set(workouts.map(w => w.date))].sort().reverse();
        const today = getToday();
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (dates[0] !== today && dates[0] !== yesterday) return 0;
        
        for (let i = 0; i < dates.length; i++) {
          const expected = new Date(dates[0]);
          expected.setDate(expected.getDate() - i);
          if (dates[i] === expected.toISOString().split('T')[0]) streak++;
          else break;
        }
        return streak;
      },

      getBibleStreak: () => {
        const bookmarks = get().bookmarks;
        if (bookmarks.length === 0) return 0;
        let streak = 0;
        const dates = [...new Set(bookmarks.map(b => b.date.split('T')[0]))].sort().reverse();
        const today = getToday();
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (dates[0] !== today && dates[0] !== yesterday) return 0;
        
        for (let i = 0; i < dates.length; i++) {
          const expected = new Date(dates[0]);
          expected.setDate(expected.getDate() - i);
          if (dates[i] === expected.toISOString().split('T')[0]) streak++;
          else break;
        }
        return streak;
      },

      exportData: () => {
        const state = get();
        const exportObj = {
          currentWeight: state.currentWeight,
          goalWeight: state.goalWeight,
          height: state.height,
          age: state.age,
          gender: state.gender,
          unit: state.unit,
          calorieGoal: state.calorieGoal,
          waterGoal: state.waterGoal,
          proteinGoal: state.proteinGoal,
          carbsGoal: state.carbsGoal,
          fatsGoal: state.fatsGoal,
          weightHistory: state.weightHistory,
          mealLog: state.mealLog,
          journalEntries: state.journalEntries,
          tasks: state.tasks,
          habits: state.habits,
          workouts: state.workouts,
          sleepEntries: state.sleepEntries,
          photos: state.photos,
          achievements: state.achievements,
          bookmarks: state.bookmarks,
          bodyMeasurements: state.bodyMeasurements,
          favoriteMeals: state.favoriteMeals,
          favoriteQuotes: state.favoriteQuotes,
          xp: state.xp,
          level: state.level,
        };
        return JSON.stringify(exportObj, null, 2);
      },

      importData: (json: string): boolean => {
        try {
          const data = JSON.parse(json);
          set((state) => ({ ...state, ...data }));
          return true;
        } catch {
          return false;
        }
      },

      resetAllData: () => set({
        weightHistory: [],
        mealLog: [],
        journalEntries: [],
        tasks: [],
        habits: DEFAULT_HABITS,
        workouts: [],
        sleepEntries: [],
        photos: [],
        achievements: ACHIEVEMENTS,
        bookmarks: [],
        bodyMeasurements: [],
        favoriteMeals: [],
        favoriteQuotes: [],
        xp: 0,
        level: 1,
        loginStreak: 0,
      }),
    }),
    {
      name: 'ascend-storage',
      partialize: (state) => ({
        passwordHash: state.passwordHash,
        hasSetupPassword: state.hasSetupPassword,
        currentWeight: state.currentWeight,
        goalWeight: state.goalWeight,
        height: state.height,
        age: state.age,
        gender: state.gender,
        unit: state.unit,
        calorieGoal: state.calorieGoal,
        waterGoal: state.waterGoal,
        proteinGoal: state.proteinGoal,
        carbsGoal: state.carbsGoal,
        fatsGoal: state.fatsGoal,
        weightHistory: state.weightHistory,
        mealLog: state.mealLog,
        journalEntries: state.journalEntries,
        tasks: state.tasks,
        habits: state.habits,
        workouts: state.workouts,
        sleepEntries: state.sleepEntries,
        photos: state.photos,
        achievements: state.achievements,
        bookmarks: state.bookmarks,
        bodyMeasurements: state.bodyMeasurements,
        favoriteMeals: state.favoriteMeals,
        favoriteQuotes: state.favoriteQuotes,
        xp: state.xp,
        level: state.level,
        loginStreak: state.loginStreak,
        lastLoginDate: state.lastLoginDate,
        theme: state.theme,
      }),
    }
  )
);
