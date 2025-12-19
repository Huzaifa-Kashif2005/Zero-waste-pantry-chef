// Recipe Card Component - Display individual recipe with score details

import { Recipe } from '../lib/database';
import { RecipeScore } from '../lib/recommendation-engine';
import { Clock, ChefHat, CheckCircle, XCircle, AlertTriangle, TrendingUp, MinusCircle, Trash2, Youtube, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeCardProps {
  recipeScore: RecipeScore;
  rank: number;
}

export function RecipeCard({ recipeScore, rank }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { recipe, score, usageRatio, matchedIngredients, missingIngredientsList, expiredIngredients, urgentIngredients, wasteSaved } = recipeScore;
  
  const sufficientIngredients = matchedIngredients.filter(m => m.isSufficient);
  const insufficientIngredients = matchedIngredients.filter(m => !m.isSufficient);
  // Total 'bad' items = Missing + Insufficient + Expired
  const missingOrInsufficientCount = missingIngredientsList.length + insufficientIngredients.length + (expiredIngredients?.length || 0);

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

  // Generate a YouTube search link if no direct video_url is provided
  const videoLink = recipe.video_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.title + " recipe")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
          #{rank}
        </div>
        <div className={`absolute top-3 right-3 ${getScoreBg(score)} px-3 py-1 rounded-full ${getScoreColor(score)} font-bold`}>
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

        {/* Match Statistics - Updated to 4 columns to include Score */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {/* Recommendation Score Box */}
          <div className={`${getScoreBg(score)} rounded-lg p-2 text-center`}>
            <div className={`text-2xl font-bold ${getScoreColor(score)} flex items-center justify-center gap-1`}>
               {score.toFixed(0)}
            </div>
            <div className="text-xs text-gray-600">Rec. Score</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-blue-600">{Math.round(usageRatio * 100)}%</div>
            <div className="text-xs text-gray-600">Match %</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-green-600">{sufficientIngredients.length}</div>
            <div className="text-xs text-gray-600">Have Enough</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-2xl text-orange-600">{missingOrInsufficientCount}</div>
            <div className="text-xs text-gray-600">Need More</div>
          </div>
        </div>

        {/* Urgent Ingredients Alert (Fresh but expiring soon) */}
        {urgentIngredients.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Uses expiring items:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {urgentIngredients.map((ing, idx) => (
                <span key={idx} className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded text-xs capitalize">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* EXPIRED INGREDIENTS ALERT (Spoiled) */}
        {expiredIngredients && expiredIngredients.length > 0 && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-gray-700 mb-1">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Expired - Remove from Pantry:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {expiredIngredients.map((ing, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs capitalize line-through">
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Insufficient Ingredients Alert */}
        {insufficientIngredients.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-yellow-600 mb-1">
              <MinusCircle className="w-4 h-4" />
              <span className="text-sm">Quantity Insufficient:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {insufficientIngredients.map((ing, idx) => (
                <span key={idx} className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded text-xs capitalize">
                  {ing.name} (Need: {ing.recipeQuantity})
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
            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <a 
                href={videoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Youtube className="w-4 h-4" />
                {recipe.video_url ? 'Watch Video' : 'Search Video'}
              </a>
            </div>

            {/* Ingredients You Have (Sufficient) */}
            {sufficientIngredients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Sufficient Quantity:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {sufficientIngredients.map((ing, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm capitalize">
                      {ing.name} (Have: {ing.pantryQuantity})
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ingredients with Insufficient Quantity */}
            {insufficientIngredients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <MinusCircle className="w-4 h-4" />
                  <span className="text-sm">Insufficient Quantity:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {insufficientIngredients.map((ing, idx) => (
                    <span key={idx} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm capitalize">
                      {ing.name} (Need: {ing.recipeQuantity})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Expired Ingredients Detail */}
            {expiredIngredients && expiredIngredients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Expired Items (Buy Fresh):</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {expiredIngredients.map((ing, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm capitalize border border-gray-300">
                      {ing.name} (Expired)
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
                  <span className="text-sm">Missing from Pantry:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {missingIngredientsList.map((ing, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm capitalize">
                      {ing.name} (Need: {ing.neededQuantity})
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