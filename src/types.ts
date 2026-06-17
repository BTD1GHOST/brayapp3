export interface WeightEntry {
  date: string;
  weight: number;
  unit: 'lbs' | 'kg';
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servings: number;
  timestamp: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isFavorite: boolean;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  imageTag: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 1 | 2 | 3 | 4 | 5;
  gratitude: string;
  reflection: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  type: 'daily' | 'weekly' | 'monthly';
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  completedDates: string[];
  color: string;
  isCustom?: boolean;
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility';
  duration: number;
  exercises: Exercise[];
  notes?: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface SleepEntry {
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: 1 | 2 | 3 | 4 | 5;
  duration: number;
}

export interface PhotoEntry {
  id: string;
  date: string;
  category: 'weight' | 'looksmax' | 'progress';
  note: string;
  dataUrl: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpReward: number;
}

export interface BibleBookmark {
  book: string;
  chapter: number;
  verse: number;
  note?: string;
  highlighted?: boolean;
  date: string;
}

export interface BodyMeasurement {
  date: string;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  neck?: number;
  shoulders?: number;
}

export type Page = 
  | 'dashboard' 
  | 'looksmax' 
  | 'weightloss' 
  | 'calories' 
  | 'water' 
  | 'journal' 
  | 'bible' 
  | 'tasks' 
  | 'habits' 
  | 'fitness' 
  | 'sleep' 
  | 'motivation' 
  | 'gamification' 
  | 'analytics' 
  | 'settings'
  | 'meals';
