import { useStore } from './store';
import LockScreen from './components/LockScreen';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LooksMax from './components/LooksMax';
import WeightLoss from './components/WeightLoss';
import CalorieTracker from './components/CalorieTracker';
import WaterTracker from './components/WaterTracker';
import Journal from './components/Journal';
import BibleCenter from './components/BibleCenter';
import TaskManager from './components/TaskManager';
import HabitTracker from './components/HabitTracker';
import Fitness from './components/Fitness';
import SleepCenter from './components/SleepCenter';
import Motivation from './components/Motivation';
import Gamification from './components/Gamification';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function PageRenderer({ page }: { page: string }) {
  switch (page) {
    case 'dashboard': return <Dashboard />;
    case 'looksmax': return <LooksMax />;
    case 'weightloss': return <WeightLoss />;
    case 'calories': return <CalorieTracker />;
    case 'meals': return <CalorieTracker />;
    case 'water': return <WaterTracker />;
    case 'journal': return <Journal />;
    case 'bible': return <BibleCenter />;
    case 'tasks': return <TaskManager />;
    case 'habits': return <HabitTracker />;
    case 'fitness': return <Fitness />;
    case 'sleep': return <SleepCenter />;
    case 'motivation': return <Motivation />;
    case 'gamification': return <Gamification />;
    case 'analytics': return <Analytics />;
    case 'settings': return <Settings />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const { isAuthenticated, currentPage, theme } = useStore();

  if (!isAuthenticated) {
    return <LockScreen />;
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="h-dvh w-screen overflow-hidden" style={{ background: theme === 'dark' ? '#050505' : '#f5f5f5' }}>
        <Layout>
          <PageRenderer page={currentPage} />
        </Layout>
      </div>
    </div>
  );
}
