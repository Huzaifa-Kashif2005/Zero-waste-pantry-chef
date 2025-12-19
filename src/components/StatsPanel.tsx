// StatsPanel.tsx - Prioritized Layout

import { PantryStats } from '../lib/recommendation-engine';
import { TrendingDown, AlertTriangle, Activity, UtensilsCrossed } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsPanelProps {
  stats: PantryStats;
  totalWasteSaved: number;
  urgentItemRecipeCount: number;
}

export function StatsPanel({ stats, totalWasteSaved, urgentItemRecipeCount }: StatsPanelProps) {
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const healthColorClass = getHealthColor(stats.pantryHealthScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. RECIPES FOR URGENT ITEM (MAIN FOCUS) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-blue-500"
      >
        <div className="flex items-center justify-between mb-2">
           <div className="bg-blue-100 p-2 rounded-full">
            <UtensilsCrossed className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl text-blue-600 font-bold">
            {urgentItemRecipeCount}
          </div>
        </div>
        <div className="text-sm text-gray-600">Dishes saving urgent item</div>
        {stats.mostUrgentItem ? (
          <div className="text-xs text-blue-500 mt-1 font-medium truncate">
            Using <span className="capitalize font-bold">{stats.mostUrgentItem.name}</span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 mt-1">No urgent items</div>
        )}
      </motion.div>

      {/* 2. Most Urgent Item Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-2">
           <div className="bg-orange-100 p-2 rounded-full">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl text-orange-600 font-bold">
            {stats.expiringSoon}
          </div>
        </div>
        <div className="text-sm text-gray-600">Total Expiring Soon</div>
        {stats.mostUrgentItem && (
          <div className="text-xs text-orange-500 mt-1 font-medium truncate">
            Critical: <span className="capitalize">{stats.mostUrgentItem.name}</span>
          </div>
        )}
      </motion.div>

      {/* 3. Potential Savings (Unique Count) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-5 text-white"
      >
        <div className="flex items-center justify-between mb-2">
          <TrendingDown className="w-8 h-8 opacity-80" />
          <div className="text-3xl font-bold">{totalWasteSaved}</div>
        </div>
        <div className="text-sm font-medium opacity-90">Unique Items Saved</div>
        <div className="text-xs opacity-75 mt-1">
          by cooking recommendations
        </div>
      </motion.div>

      {/* 4. Pantry Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-2xl shadow-lg p-5 border ${healthColorClass} relative overflow-hidden`}
      >
        <div className="flex items-center justify-between mb-2">
          <Activity className="w-8 h-8" />
          <div className="text-4xl font-bold">{stats.pantryHealthScore}</div>
        </div>
        <div className="text-sm font-medium opacity-90">Pantry Health Score</div>
        <div className="text-xs opacity-75 mt-1">
          {stats.pantryHealthScore >= 80 ? 'Pantry is healthy' : 'Action needed'}
        </div>
      </motion.div>

    </div>
  );
}