// Recipe Card Component - Display individual recipe with score details

import { Recipe } from '../lib/database';
import { RecipeScore } from '../lib/recommendation-engine';
import { Clock, ChefHat, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RecipeCardProps {
  recipeScore: RecipeScore;
  rank: number;
}

export function RecipeCard({ recipeScore, rank }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { recipe, score, usageRatio, matchedIngredients, missingIngredientsList, urgentIngredients, wasteSaved } = recipeScore;

  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
          #{rank}
        </div>
        <div className={`absolute top-3 right-3 ${getScoreBg(score)} px-3 py-1 rounded-full ${getScoreColor(score)}`}>
          {score.toFixed(0)} pts
        </div>
        {wasteSaved > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Saves {wasteSaved} expiring item{wasteSaved > 1 ? 's' : ''}!
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl mb-1">{recipe.title}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                {recipe.cuisine}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.cookTime} min
              </div>
            </div>
          </div>
        </div>

        {/* Match Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-blue-600">{Math.round(usageRatio * 100)}%</div>
            <div className="text-xs text-gray-600">Match</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-green-600">{matchedIngredients.length}</div>
            <div className="text-xs text-gray-600">Have</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-orange-600">{missingIngredientsList.length}</div>
            <div className="text-xs text-gray-600">Need</div>
          </div>
        </div>

        {/* Urgent Ingredients Alert */}
        {urgentIngredients.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-orange-700 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Uses expiring ingredients:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {urgentIngredients.map((ing, idx) => (
                <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs capitalize">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors text-sm"
        >
          {showDetails ? 'Hide Details' : 'View Recipe & Ingredients'}
        </button>

        {/* Expandable Details */}
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 space-y-3"
          >
            {/* Ingredients You Have */}
            {matchedIngredients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">You have these:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {matchedIngredients.map((ing, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm capitalize">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Ingredients */}
            {missingIngredientsList.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-orange-700 mb-2">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm">You'll need:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {missingIngredientsList.map((ing, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm capitalize">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Ingredient List */}
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Full Recipe Ingredients:</h4>
              <ul className="text-sm text-gray-600 space-y-1 pl-4">
                {recipe.rawIngredients.map((ing, idx) => (
                  <li key={idx} className="list-disc">{ing}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Instructions:</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
