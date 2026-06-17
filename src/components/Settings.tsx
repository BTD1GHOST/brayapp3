import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Download, Upload, Trash2, Shield, User, Sun, Moon, ChevronRight, LogOut } from 'lucide-react';
import { useStore } from '../store';

export default function Settings() {
  const store = useStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleExport = () => {
    const data = store.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascend-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
  };

  const handleImport = () => {
    if (store.importData(importText)) {
      showToast('Data imported successfully!');
      setShowImport(false);
      setImportText('');
    } else {
      showToast('Import failed. Invalid data.');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (store.importData(text)) {
        showToast('Data restored successfully!');
      } else {
        showToast('Restore failed. Invalid file.');
      }
    };
    reader.readAsText(file);
  };

  const [editWeight, setEditWeight] = useState(store.currentWeight.toString());
  const [editGoalWeight, setEditGoalWeight] = useState(store.goalWeight.toString());
  const [editHeight, setEditHeight] = useState(store.height.toString());
  const [editAge, setEditAge] = useState(store.age.toString());
  const [editGender, setEditGender] = useState(store.gender);
  const [editUnit, setEditUnit] = useState(store.unit);
  const [editCalorieGoal, setEditCalorieGoal] = useState(store.calorieGoal.toString());
  const [editWaterGoal, setEditWaterGoal] = useState(store.waterGoal.toString());
  const [editProteinGoal, setEditProteinGoal] = useState(store.proteinGoal.toString());
  const [editCarbsGoal, setEditCarbsGoal] = useState(store.carbsGoal.toString());
  const [editFatsGoal, setEditFatsGoal] = useState(store.fatsGoal.toString());

  const saveProfile = () => {
    store.setProfile({
      currentWeight: parseFloat(editWeight) || store.currentWeight,
      goalWeight: parseFloat(editGoalWeight) || store.goalWeight,
      height: parseFloat(editHeight) || store.height,
      age: parseInt(editAge) || store.age,
      gender: editGender as 'male' | 'female',
      unit: editUnit as 'lbs' | 'kg',
    });
    setShowProfile(false);
    showToast('Profile updated!');
  };

  const saveGoals = () => {
    store.setProfile({
      calorieGoal: parseInt(editCalorieGoal) || store.calorieGoal,
      waterGoal: parseInt(editWaterGoal) || store.waterGoal,
      proteinGoal: parseInt(editProteinGoal) || store.proteinGoal,
      carbsGoal: parseInt(editCarbsGoal) || store.carbsGoal,
      fatsGoal: parseInt(editFatsGoal) || store.fatsGoal,
    });
    setShowGoals(false);
    showToast('Goals updated!');
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Settings</h1>
          <p className="text-dark-300 text-sm">Customize your experience</p>
        </div>

        {/* Profile Card */}
        <div className="glass-gold rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center">
              <User size={20} className="text-gold-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Level {store.level} Ascender</p>
              <p className="text-dark-300 text-xs">{store.xp} XP • {store.achievements.filter(a => a.unlockedAt).length} achievements</p>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="glass rounded-2xl overflow-hidden">
          <button onClick={() => setShowProfile(!showProfile)}
            className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User size={16} className="text-gold-400" />
              <span className="text-white text-sm">Profile</span>
            </div>
            <ChevronRight size={14} className={`text-dark-300 transition-transform ${showProfile ? 'rotate-90' : ''}`} />
          </button>
          {showProfile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-dark-300 text-[10px]">Current Weight</label>
                  <input type="number" value={editWeight} onChange={e => setEditWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Goal Weight</label>
                  <input type="number" value={editGoalWeight} onChange={e => setEditGoalWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Height (inches)</label>
                  <input type="number" value={editHeight} onChange={e => setEditHeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Age</label>
                  <input type="number" value={editAge} onChange={e => setEditAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditGender('male')}
                  className={`flex-1 py-2 rounded-lg text-xs ${editGender === 'male' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>Male</button>
                <button onClick={() => setEditGender('female')}
                  className={`flex-1 py-2 rounded-lg text-xs ${editGender === 'female' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>Female</button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditUnit('lbs')}
                  className={`flex-1 py-2 rounded-lg text-xs ${editUnit === 'lbs' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>lbs</button>
                <button onClick={() => setEditUnit('kg')}
                  className={`flex-1 py-2 rounded-lg text-xs ${editUnit === 'kg' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>kg</button>
              </div>
              <button onClick={saveProfile}
                className="w-full py-2 rounded-lg text-sm font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>Save Profile</button>
            </motion.div>
          )}
        </div>

        {/* Goals Settings */}
        <div className="glass rounded-2xl overflow-hidden">
          <button onClick={() => setShowGoals(!showGoals)}
            className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SettingsIcon size={16} className="text-gold-400" />
              <span className="text-white text-sm">Goals</span>
            </div>
            <ChevronRight size={14} className={`text-dark-300 transition-transform ${showGoals ? 'rotate-90' : ''}`} />
          </button>
          {showGoals && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-dark-300 text-[10px]">Calorie Goal</label>
                  <input type="number" value={editCalorieGoal} onChange={e => setEditCalorieGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Water Goal (glasses)</label>
                  <input type="number" value={editWaterGoal} onChange={e => setEditWaterGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Protein (g)</label>
                  <input type="number" value={editProteinGoal} onChange={e => setEditProteinGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Carbs (g)</label>
                  <input type="number" value={editCarbsGoal} onChange={e => setEditCarbsGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
                <div>
                  <label className="text-dark-300 text-[10px]">Fats (g)</label>
                  <input type="number" value={editFatsGoal} onChange={e => setEditFatsGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass text-white text-sm" />
                </div>
              </div>
              <button onClick={saveGoals}
                className="w-full py-2 rounded-lg text-sm font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>Save Goals</button>
            </motion.div>
          )}
        </div>

        {/* Theme */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {store.theme === 'dark' ? <Moon size={16} className="text-purple-400" /> : <Sun size={16} className="text-yellow-400" />}
              <span className="text-white text-sm">Theme</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => store.setTheme('dark')}
                className={`px-3 py-1.5 rounded-lg text-xs ${store.theme === 'dark' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>Dark</button>
              <button onClick={() => store.setTheme('light')}
                className={`px-3 py-1.5 rounded-lg text-xs ${store.theme === 'light' ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>Light</button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass rounded-2xl p-4 space-y-2">
          <h3 className="text-sm font-semibold text-white mb-2">Data Management</h3>
          <button onClick={handleExport}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl glass text-left">
            <Download size={14} className="text-green-400" />
            <span className="text-dark-100 text-sm">Export Data</span>
          </button>
          <button onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl glass text-left">
            <Upload size={14} className="text-blue-400" />
            <span className="text-dark-100 text-sm">Restore from File</span>
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          <button onClick={() => setShowImport(!showImport)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl glass text-left">
            <Upload size={14} className="text-cyan-400" />
            <span className="text-dark-100 text-sm">Import from Text</span>
          </button>
          {showImport && (
            <div className="space-y-2">
              <textarea value={importText} onChange={e => setImportText(e.target.value)}
                placeholder="Paste JSON data here..."
                className="w-full h-24 px-3 py-2 rounded-xl glass text-white text-xs resize-none" />
              <button onClick={handleImport}
                className="w-full py-2 rounded-lg text-sm font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>Import</button>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={16} className="text-gold-400" />
            <span className="text-white text-sm font-semibold">Security</span>
          </div>
          <div className="space-y-1">
            <p className="text-dark-300 text-xs">✓ SHA-256 password hashing</p>
            <p className="text-dark-300 text-xs">✓ Rate limiting (5 attempts)</p>
            <p className="text-dark-300 text-xs">✓ 5-minute lockout</p>
            <p className="text-dark-300 text-xs">✓ Session management</p>
            <p className="text-dark-300 text-xs">✓ Local encrypted storage</p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={() => store.logout()}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-left">
          <LogOut size={16} className="text-red-400" />
          <span className="text-red-400 text-sm font-medium">Lock App</span>
        </button>

        {/* Danger Zone */}
        <div className="glass rounded-2xl overflow-hidden">
          <button onClick={() => setShowDanger(!showDanger)}
            className="w-full p-4 flex items-center gap-3">
            <Trash2 size={16} className="text-red-400" />
            <span className="text-red-400 text-sm font-medium">Reset All Data</span>
          </button>
          <AnimatePresence>
            {showDanger && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pb-4">
                <p className="text-dark-300 text-xs mb-2">This will permanently delete all your data. This cannot be undone.</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowDanger(false)}
                    className="flex-1 py-2 rounded-lg glass text-white text-xs font-medium">Cancel</button>
                  <button onClick={() => { store.resetAllData(); setShowDanger(false); showToast('All data reset!'); }}
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold">Delete Everything</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-dark-500 text-[10px]">Ascend v1.0.0 • Built with ❤️</p>
          <p className="text-dark-500 text-[10px]">Premium Self-Improvement Dashboard</p>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 glass-strong rounded-xl p-3 text-center z-50"
          >
            <p className="text-gold-400 text-sm font-medium">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
