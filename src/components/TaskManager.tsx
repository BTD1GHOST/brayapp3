import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Plus, Trash2, RotateCcw, X, Check } from 'lucide-react';
import { useStore } from '../store';
import type { Task } from '../types';

export default function TaskManager() {
  const store = useStore();
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [taskType, setTaskType] = useState<Task['type']>('daily');
  const [deadline, setDeadline] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['General', 'Health', 'Fitness', 'Faith', 'Work', 'Personal', 'Finance', 'Education'];

  const filteredTasks = filter === 'all'
    ? store.tasks
    : filter === 'completed'
      ? store.tasks.filter(t => t.completed)
      : filter === 'active'
        ? store.tasks.filter(t => !t.completed)
        : store.tasks.filter(t => t.category === filter);

  const completedCount = store.tasks.filter(t => t.completed).length;
  const totalCount = store.tasks.length;

  const handleAdd = () => {
    if (!title.trim()) return;
    store.addTask({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category,
      priority,
      deadline: deadline || undefined,
      type: taskType,
      createdAt: new Date().toISOString(),
    });
    setTitle(''); setDescription(''); setShowNew(false);
    store.addXP(10);
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gold-text">Task Manager</h1>
            <p className="text-dark-300 text-sm">{completedCount}/{totalCount} completed</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowReset(true)}
              className="glass rounded-xl p-2.5 text-dark-300">
              <RotateCcw size={14} />
            </motion.button>
          </div>
        </div>

        {/* Progress */}
        {totalCount > 0 && (
          <div className="glass rounded-2xl p-4">
            <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all"
                style={{ width: `${(completedCount / totalCount) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Add Task Button */}
        {!showNew && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowNew(true)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
            <Plus size={16} /> Add Task
          </motion.button>
        )}

        {/* New Task Form */}
        <AnimatePresence>
          {showNew && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">New Task</h3>
                <button onClick={() => setShowNew(false)}><X size={16} className="text-dark-300" /></button>
              </div>

              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title"
                className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />

              <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)"
                className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />

              <div>
                <p className="text-dark-300 text-[10px] mb-1.5 uppercase tracking-wider">Priority</p>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(p => (
                    <button key={p} onClick={() => setPriority(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${priority === p ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-dark-300 text-[10px] mb-1.5 uppercase tracking-wider">Type</p>
                <div className="flex gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map(t => (
                    <button key={t} onClick={() => setTaskType(t)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${taskType === t ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-dark-300 text-[10px] mb-1.5 uppercase tracking-wider">Category</p>
                <div className="flex gap-1.5 flex-wrap">
                  {categories.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${category === c ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass text-white text-sm" />

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d778)' }}>
                Add Task
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto scrollable">
          {['all', 'active', 'completed', ...categories].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${filter === f ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <motion.div key={task.id} layout
              className={`glass rounded-2xl p-3.5 ${task.completed ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => store.updateTask(task.id, { completed: !task.completed })}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    task.completed ? 'border-gold-400 bg-gold-400' : 'border-dark-300'
                  }`}>
                  {task.completed && <Check size={10} className="text-black" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? 'line-through text-dark-400' : 'text-white'}`}>
                    {task.title}
                  </p>
                  {task.description && <p className="text-dark-300 text-xs mt-0.5">{task.description}</p>}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{task.priority}</span>
                    <span className="text-dark-400 text-[9px]">{task.category}</span>
                    <span className="text-dark-400 text-[9px]">{task.type}</span>
                    {task.deadline && <span className="text-dark-400 text-[9px]">📅 {task.deadline}</span>}
                  </div>
                </div>
                <button onClick={() => store.deleteTask(task.id)} className="text-dark-400 hover:text-red-400 flex-shrink-0">
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8">
              <ClipboardList size={32} className="text-dark-500 mx-auto mb-2" />
              <p className="text-dark-400 text-sm">No tasks</p>
            </div>
          )}
        </div>

        {/* Reset Confirmation Modal */}
        <AnimatePresence>
          {showReset && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowReset(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="glass-strong rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <RotateCcw size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Reset All Tasks?</h3>
                    <p className="text-dark-300 text-xs">This will mark all tasks as incomplete</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowReset(false)}
                    className="flex-1 py-2.5 rounded-xl glass text-white text-sm font-medium">Cancel</button>
                  <button onClick={() => { store.resetCompletedTasks(); setShowReset(false); }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold">Reset</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
