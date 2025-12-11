// Stats Panel Component - Display pantry statistics and waste metrics

import { PantryStats } from '../lib/recommendation-engine';
import { TrendingDown, AlertCircle, Package, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsPanelProps {
  stats: PantryStats;
  totalWasteSaved: number;
}

export function StatsPanel({ stats, totalWasteSaved }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-5"
      >
        <div className="flex items-center justify-between mb-2">
          <Package className="w-8 h-8 text-blue-600" />
          <div className="text-3xl text-blue-600">{stats.totalItems}</div>
        </div>
        <div className="text-sm text-gray-600">Items in Pantry</div>
      </motion.div>

      {/* Expiring Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-5"
      >
        <div className="flex items-center justify-between mb-2">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <div className="text-3xl text-orange-600">{stats.expiringIn3Days}</div>
        </div>
        <div className="text-sm text-gray-600">Expiring in 3 Days</div>
      </motion.div>

      {/* This Week */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-5"
      >
        <div className="flex items-center justify-between mb-2">
          <Calendar className="w-8 h-8 text-yellow-600" />
          <div className="text-3xl text-yellow-600">{stats.expiringThisWeek}</div>
        </div>
        <div className="text-sm text-gray-600">Expiring This Week</div>
      </motion.div>

      {/* Waste Saved */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-5 text-white"
      >
        <div className="flex items-center justify-between mb-2">
          <TrendingDown className="w-8 h-8" />
          <div className="text-3xl">{totalWasteSaved}</div>
        </div>
        <div className="text-sm opacity-90">Potential Waste Saved</div>
        <div className="text-xs opacity-75 mt-1">by following recommendations</div>
      </motion.div>
    </div>
  );
}
