import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Camera, Star, Flame, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';
import ProgressRing from './ProgressRing';

interface LooksCategory {
  id: string;
  title: string;
  icon: string;
  tips: string[];
  dailyTip: string;
  weeklyChallenge: string;
}

const LOOKS_CATEGORIES: LooksCategory[] = [
  {
    id: 'skin', title: 'Skin Care', icon: '✨',
    tips: [
      'Cleanse twice daily with a gentle cleanser',
      'Use SPF 30+ sunscreen every morning',
      'Apply moisturizer while skin is damp',
      'Exfoliate 2-3 times per week',
      'Use retinol at night for anti-aging',
      'Stay hydrated — drink 8+ glasses of water',
      'Get 7-9 hours of sleep for skin repair',
      'Avoid touching your face throughout the day',
      'Change pillowcases every 2-3 days',
      'Use vitamin C serum in the morning',
    ],
    dailyTip: 'Apply sunscreen even on cloudy days — UV rays penetrate clouds.',
    weeklyChallenge: 'Complete a full skincare routine every morning and night for 7 days.',
  },
  {
    id: 'acne', title: 'Acne Reduction', icon: '🎯',
    tips: [
      'Use salicylic acid (2%) for unclogging pores',
      'Benzoyl peroxide (2.5-5%) kills acne bacteria',
      'Never pop or pick at pimples',
      'Use non-comedogenic products only',
      'Wash face no more than twice daily',
      'Apply acne treatment to entire prone areas, not just spots',
      'Change pillowcases every 2 days',
      'Reduce dairy and high-glycemic foods',
      'Use niacinamide to reduce inflammation',
      'Consult a dermatologist for persistent acne',
    ],
    dailyTip: 'Patch test new products on your jawline for 24 hours before full application.',
    weeklyChallenge: 'Follow a consistent morning and night acne-fighting routine.',
  },
  {
    id: 'grooming', title: 'Facial Grooming', icon: '💇',
    tips: [
      'Shape eyebrows to frame your face',
      'Trim nose and ear hair weekly',
      'Keep facial hair neatly trimmed',
      'Use a quality razor and shaving cream',
      'Moisturize after shaving to prevent irritation',
      'Consider your face shape for beard style',
      'Keep nails clean and trimmed',
      'Use lip balm with SPF',
      'Define your jawline with proper grooming',
      'Invest in quality grooming tools',
    ],
    dailyTip: 'Cold water after shaving reduces inflammation and closes pores.',
    weeklyChallenge: 'Complete a full grooming session including trim, shape, and skincare.',
  },
  {
    id: 'hair', title: 'Hair Care', icon: '💇‍♂️',
    tips: [
      'Wash hair 2-3 times per week, not daily',
      'Use conditioner every wash',
      'Avoid hot water on hair',
      'Get regular trims every 6-8 weeks',
      'Find a hairstyle that suits your face shape',
      'Use heat protectant before styling',
      'Massage scalp to promote blood flow',
      'Consider hair oils (argan, jojoba)',
      'Avoid over-brushing wet hair',
      'Use a silk pillowcase to reduce breakage',
    ],
    dailyTip: 'A scalp massage for 2 minutes daily can promote hair growth.',
    weeklyChallenge: 'Try a deep conditioning treatment and experiment with a new style.',
  },
  {
    id: 'beard', title: 'Beard Optimization', icon: '🧔',
    tips: [
      'Let it grow for 4 weeks before shaping',
      'Use beard oil daily to moisturize',
      'Comb or brush your beard daily',
      'Trim neckline at the Adam\'s apple',
      'Keep cheek line natural and clean',
      'Use beard balm for styling and hold',
      'Wash beard with dedicated beard wash',
      'Train whiskers to grow in desired direction',
      'Consider minoxidil for patchy areas (consult doctor)',
      'Match beard style to face shape',
    ],
    dailyTip: 'Apply beard oil while slightly damp for best absorption.',
    weeklyChallenge: 'Maintain a consistent beard care routine all week.',
  },
  {
    id: 'posture', title: 'Posture Improvement', icon: '🧍',
    tips: [
      'Keep shoulders back and down',
      'Align ears over shoulders',
      'Engage core muscles while standing',
      'Sit with back flat against chair',
      'Keep screens at eye level',
      'Do doorway stretches daily',
      'Strengthen upper back with rows',
      'Practice wall angels daily',
      'Set hourly posture check reminders',
      'Consider a standing desk',
    ],
    dailyTip: 'Stand with your back against a wall — heels, glutes, shoulders, and head should touch.',
    weeklyChallenge: 'Do 10 minutes of posture exercises every day.',
  },
  {
    id: 'sleep', title: 'Sleep Optimization', icon: '😴',
    tips: [
      'Aim for 7-9 hours of sleep nightly',
      'Keep a consistent sleep schedule',
      'Room temperature: 65-68°F (18-20°C)',
      'Block all light with blackout curtains',
      'No screens 1 hour before bed',
      'Use white noise if needed',
      'Avoid caffeine after 2 PM',
      'Take magnesium before bed',
      'Create a relaxing bedtime routine',
      'Invest in a quality mattress and pillows',
    ],
    dailyTip: 'Exposure to morning sunlight helps regulate your circadian rhythm.',
    weeklyChallenge: 'Go to bed and wake up at the same time for 7 days straight.',
  },
  {
    id: 'fashion', title: 'Fashion Advice', icon: '👔',
    tips: [
      'Fit is more important than brand',
      'Build a capsule wardrobe with versatile pieces',
      'Invest in quality basics: white tee, dark jeans, navy blazer',
      'Match your belt and shoes',
      'Avoid logos and busy patterns',
      'Know your color palette (seasonal color analysis)',
      'Tailored clothes always look better',
      'Keep shoes clean and polished',
      'One statement piece per outfit',
      'Dress for the occasion, slightly elevated',
    ],
    dailyTip: 'When in doubt, go with a monochromatic outfit in navy, black, or gray.',
    weeklyChallenge: 'Plan and photograph 7 complete outfits for the week.',
  },
  {
    id: 'fragrance', title: 'Fragrance Guide', icon: '🌸',
    tips: [
      'Apply to pulse points: wrists, neck, behind ears',
      'Less is more — 2-3 sprays maximum',
      'Don\'t rub your wrists together after applying',
      'Store fragrances in a cool, dark place',
      'Have a day scent (fresh) and night scent (woody/spicy)',
      'Test on your skin — fragrances smell different on everyone',
      'Consider seasonal rotation: fresh for summer, warm for winter',
      'Eau de toilette vs parfum — know the difference',
      'Reapply only after 6-8 hours',
      'Signature scent builds your personal brand',
    ],
    dailyTip: 'Apply fragrance right after a shower when pores are open for better absorption.',
    weeklyChallenge: 'Sample a new fragrance and wear it for 3 days to test.',
  },
  {
    id: 'confidence', title: 'Confidence Building', icon: '💪',
    tips: [
      'Maintain eye contact in conversations',
      'Speak slowly and clearly',
      'Stand tall with open body language',
      'Practice power poses for 2 minutes daily',
      'Set and achieve small goals regularly',
      'Step outside your comfort zone daily',
      'Celebrate your wins, no matter how small',
      'Prepare thoroughly for important situations',
      'Accept compliments gracefully',
      'Develop expertise in areas you\'re passionate about',
    ],
    dailyTip: 'Before any social interaction, take 3 deep breaths and remind yourself of your worth.',
    weeklyChallenge: 'Start a conversation with someone new every day this week.',
  },
  {
    id: 'social', title: 'Social Skills', icon: '🤝',
    tips: [
      'Listen more than you speak',
      'Ask open-ended questions',
      'Remember and use people\'s names',
      'Show genuine interest in others',
      'Practice active listening techniques',
      'Give sincere compliments',
      'Learn to read body language',
      'Develop your sense of humor',
      'Be comfortable with silence',
      'Follow up on previous conversations',
    ],
    dailyTip: 'The FORD technique: Ask about Family, Occupation, Recreation, Dreams.',
    weeklyChallenge: 'Practice active listening in every conversation this week.',
  },
  {
    id: 'body', title: 'Body Composition', icon: '🏋️',
    tips: [
      'Aim for 1g protein per pound of bodyweight',
      'Lift weights 3-5 times per week',
      'Progressive overload is key to growth',
      'Track your calories and macros',
      'Do cardio 2-3 times weekly for heart health',
      'Focus on compound movements',
      'Get enough sleep for recovery',
      'Stay hydrated throughout the day',
      'Be patient — body recomposition takes time',
      'Take progress photos monthly',
    ],
    dailyTip: 'Hit your protein target early in the day to stay on track.',
    weeklyChallenge: 'Complete 4 workouts this week with progressive overload.',
  },
  {
    id: 'muscle', title: 'Muscle Building', icon: '💪',
    tips: [
      'Train each muscle group 2x per week',
      'Use a mix of rep ranges: 5-8 for strength, 8-12 for size',
      'Rest 2-3 minutes between heavy sets',
      'Eat in a slight caloric surplus (200-300 cal)',
      'Prioritize compound lifts: squat, deadlift, bench, OHP, rows',
      'Track your lifts and aim to increase weekly',
      'Consume protein within 2 hours post-workout',
      'Get 8+ hours of sleep for optimal recovery',
      'Consider creatine monohydrate (5g/day)',
      'Don\'t skip leg day — it boosts overall hormones',
    ],
    dailyTip: 'Focus on the mind-muscle connection — squeeze at the top of every rep.',
    weeklyChallenge: 'Set a new personal record on one of your main lifts.',
  },
  {
    id: 'dental', title: 'Dental Hygiene', icon: '🦷',
    tips: [
      'Brush twice daily for 2 minutes',
      'Floss once daily before brushing',
      'Use a soft-bristled toothbrush',
      'Replace toothbrush every 3 months',
      'Use fluoride toothpaste',
      'Consider an electric toothbrush',
      'Scrape your tongue daily',
      'Limit sugary and acidic foods',
      'Visit dentist every 6 months',
      'Use mouthwash as an addition, not replacement',
    ],
    dailyTip: 'Wait 30 minutes after eating before brushing to protect enamel.',
    weeklyChallenge: 'Floss every single day this week.',
  },
  {
    id: 'teeth', title: 'Teeth Whitening', icon: '😁',
    tips: [
      'Professional whitening gives best results',
      'Whitening strips are effective for at-home use',
      'Avoid coffee, tea, and red wine post-whitening',
      'Baking soda can help remove surface stains',
      'Use a straw for staining beverages',
      'Hydrogen peroxide rinses can help (diluted)',
      'Don\'t over-whiten — it damages enamel',
      'Oil pulling may help with surface stains',
      'Whitening toothpaste maintains results',
      'Consult dentist before any whitening treatment',
    ],
    dailyTip: 'Rinse with water immediately after consuming staining foods or drinks.',
    weeklyChallenge: 'Use whitening strips daily and avoid all staining beverages.',
  },
  {
    id: 'eyes', title: 'Eye Health', icon: '👁️',
    tips: [
      'Follow the 20-20-20 rule for screen time',
      'Get annual eye exams',
      'Wear sunglasses with UV protection',
      'Eat foods rich in omega-3 and lutein',
      'Stay hydrated for tear production',
      'Reduce blue light exposure at night',
      'Get enough sleep to prevent eye strain',
      'Use artificial tears for dry eyes',
      'Maintain proper distance from screens',
      'Do eye exercises to reduce strain',
    ],
    dailyTip: 'Every 20 minutes, look at something 20 feet away for 20 seconds.',
    weeklyChallenge: 'Follow the 20-20-20 rule consistently all week.',
  },
  {
    id: 'stress', title: 'Stress Management', icon: '🧘',
    tips: [
      'Practice deep breathing exercises daily',
      'Meditate for 10 minutes each morning',
      'Exercise regularly to reduce cortisol',
      'Journal your thoughts and feelings',
      'Set boundaries and learn to say no',
      'Prioritize and delegate tasks',
      'Take breaks throughout the day',
      'Spend time in nature',
      'Connect with supportive people',
      'Pray and cast your cares on God',
    ],
    dailyTip: 'When overwhelmed, try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.',
    weeklyChallenge: 'Meditate for at least 10 minutes every day this week.',
  },
  {
    id: 'productivity', title: 'Productivity', icon: '⚡',
    tips: [
      'Use the Pomodoro Technique (25 min work, 5 min break)',
      'Plan your day the night before',
      'Eat the frog — tackle hardest task first',
      'Eliminate distractions during deep work',
      'Batch similar tasks together',
      'Use the 2-minute rule for small tasks',
      'Review and adjust goals weekly',
      'Use time-blocking for your calendar',
      'Limit social media to specific times',
      'Celebrate completing major milestones',
    ],
    dailyTip: 'Start your day with the most important task before checking messages.',
    weeklyChallenge: 'Use time-blocking for your entire workday for 5 days.',
  },
];

export default function LooksMax() {
  const store = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const looksMaxScore = store.getLooksMaxScore();
  const today = new Date().toISOString().split('T')[0];

  const completedCategories = LOOKS_CATEGORIES.filter(cat => {
    const habitMap: Record<string, string> = {
      skin: 'h7', sleep: 'h6', body: 'h1', stress: 'h8',
    };
    const habitId = habitMap[cat.id];
    if (habitId) {
      const habit = store.habits.find(h => h.id === habitId);
      return habit?.completedDates.includes(today);
    }
    return false;
  }).length;

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        {/* Header */}
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">LooksMax</h1>
          <p className="text-dark-300 text-sm">Elevate your appearance & confidence</p>
        </div>

        {/* Score Card */}
        <div className="glass-gold rounded-2xl p-5 flex items-center gap-5">
          <ProgressRing progress={looksMaxScore} size={90} strokeWidth={8} color="#d4af37">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white">{looksMaxScore}</span>
              <span className="text-[9px] text-dark-300">SCORE</span>
            </div>
          </ProgressRing>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Your LooksMax Score</h3>
            <p className="text-dark-300 text-xs mb-3">Based on your daily habits, skincare, sleep, exercise, and nutrition.</p>
            <div className="flex items-center gap-2">
              <Star size={12} className="text-gold-400" />
              <span className="text-gold-400 text-xs font-medium">{completedCategories}/{LOOKS_CATEGORIES.length} categories active</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {LOOKS_CATEGORIES.map((category) => {
            const isExpanded = expandedId === category.id;
            return (
              <motion.div
                key={category.id}
                layout
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : category.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{category.title}</h4>
                    <p className="text-dark-300 text-[11px]">{category.tips.length} tips</p>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-dark-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        {/* Daily Tip */}
                        <div className="glass-gold rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Star size={12} className="text-gold-400" />
                            <span className="text-gold-400 text-xs font-semibold">Daily Tip</span>
                          </div>
                          <p className="text-dark-100 text-xs">{category.dailyTip}</p>
                        </div>

                        {/* Weekly Challenge */}
                        <div className="glass rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Flame size={12} className="text-orange-400" />
                            <span className="text-orange-400 text-xs font-semibold">Weekly Challenge</span>
                          </div>
                          <p className="text-dark-100 text-xs">{category.weeklyChallenge}</p>
                        </div>

                        {/* Tips List */}
                        <div className="space-y-2">
                          {category.tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={12} className="text-dark-400 mt-0.5 flex-shrink-0" />
                              <p className="text-dark-200 text-xs leading-relaxed">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Photo Vault */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Photo Vault</h3>
            <Camera size={14} className="text-dark-300" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {store.photos.filter(p => p.category === 'looksmax').slice(0, 6).map(photo => (
              <div key={photo.id} className="aspect-square rounded-xl bg-dark-600 overflow-hidden">
                <img src={photo.dataUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {store.photos.filter(p => p.category === 'looksmax').length === 0 && (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-dark-600 flex items-center justify-center">
                  <Camera size={16} className="text-dark-500" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
