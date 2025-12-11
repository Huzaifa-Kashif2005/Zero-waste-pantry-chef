import { useState, useEffect } from 'react';
import { db } from './lib/database';
import { SEED_RECIPES } from './lib/seed-data';
import { getTopRecommendations, getPantryStats, RecipeScore } from './lib/recommendation-engine';
import { PantryManager } from './components/PantryManager';
import { RecipeCard } from './components/RecipeCard';
import { StatsPanel } from './components/StatsPanel';
import { ChefHat, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [pantryItems, setPantryItems] = useState(db.getAllPantryItems());
  const [recommendations, setRecommendations] = useState<RecipeScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(false);
  // NEW: State for number of servings
  const [servings, setServings] = useState(1);

  // Seed database with recipes on first load
  useEffect(() => {
    const recipes = db.getAllRecipes();
    if (recipes.length === 0) {
      db.seedRecipes(SEED_RECIPES);
      setHasSeeded(true);
    }
  }, []);

  // Get recommendations
  const handleGetRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      const recipes = db.getAllRecipes();
      // NEW: Pass servings to the recommendation engine
      const topRecommendations = getTopRecommendations(recipes, pantryItems, 5, servings);
      setRecommendations(topRecommendations);
      setIsLoading(false);
    }, 800);
  };

  // Add item to pantry
  const handleAddItem = (name: string, quantity: string, expiryDate: Date) => {
    db.addPantryItem({ name, quantity, expiryDate });
    setPantryItems(db.getAllPantryItems());
    
    // Auto-refresh recommendations if there are any
    if (recommendations.length > 0) {
      handleGetRecommendations();
    }
  };

  // Delete item from pantry
  const handleDeleteItem = (id: number) => {
    db.deletePantryItem(id);
    setPantryItems(db.getAllPantryItems());
    
    // Auto-refresh recommendations if there are any
    if (recommendations.length > 0) {
      handleGetRecommendations();
    }
  };

  // Calculate stats
  const stats = getPantryStats(pantryItems);
  const totalWasteSaved = recommendations.reduce((sum, rec) => sum + rec.wasteSaved, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-2xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-gray-900">Zero-Waste Pantry Chef</h1>
              <p className="text-gray-600">Smart recipes that save food & money</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Panel */}
        <StatsPanel stats={stats} totalWasteSaved={totalWasteSaved} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Pantry Manager */}
          <div className="lg:col-span-1">
            <PantryManager
              pantryItems={pantryItems}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>

          {/* Right Section - Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl">Recipe Recommendations</h2>
                </div>
              </div>
              
              {/* NEW: Servings Input and Recommendation Button Group */}
              <div className='flex flex-col sm:flex-row gap-3 items-end mb-6'>
                <div className='flex-1 w-full'>
                  <label htmlFor="servings-input" className="block text-sm text-gray-600 mb-1">
                    Number of Servings
                  </label>
                  <input
                    id="servings-input"
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                {pantryItems.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetRecommendations}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Finding recipes...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Get Recommendations
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {pantryItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-gray-700 mb-2">Ready to cook smart?</h3>
                  <p className="text-gray-600 mb-4">
                    Add items to your pantry to get personalized recipe recommendations
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-blue-800">
                      💡 <span>Tip:</span> Items closer to expiry will get higher priority in recommendations!
                    </p>
                  </div>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl text-gray-700 mb-2">What's for dinner?</h3>
                  <p className="text-gray-600 mb-4">
                    Click the button above to discover recipes you can make with your ingredients!
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-purple-800">
                      🎯 <span>Our AI considers:</span> What you have, what's expiring soon, and what you're missing
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Recipe Cards */}
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg text-gray-700">
                    Top {recommendations.length} Recipes for {servings} {servings > 1 ? 'People' : 'Person'}
                  </h3>
                  {totalWasteSaved > 0 && (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      🎉 Can save {totalWasteSaved} expiring item{totalWasteSaved > 1 ? 's' : ''}!
                    </div>
                  )}
                </div>
                
                {recommendations.map((recipeScore, index) => (
                  <RecipeCard
                    key={recipeScore.recipe.id}
                    recipeScore={recipeScore}
                    rank={index + 1}
                  />
                ))}

                {/* Refresh Button at Bottom */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetRecommendations}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Recommendations
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        {hasSeeded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <h2 className="text-2xl mb-4">🧠 How Our Smart Algorithm Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-lg mb-2">Ingredient Matching</h3>
                <p className="text-blue-100 text-sm">
                  We analyze your pantry and match it against {SEED_RECIPES.length}+ recipes to find the best fits
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">⏰</div>
                <h3 className="text-lg mb-2">Expiry Priority</h3>
                <p className="text-blue-100 text-sm">
                  Items expiring soon get higher priority, helping you reduce food waste
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🧮</div>
                <h3 className="text-lg mb-2">Smart Scoring</h3>
                <p className="text-blue-100 text-sm">
                  Each recipe gets a score based on: (Quantity-Checked Match %) + (Expiry Urgency) - (Missing/Insufficient Items)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>Zero-Waste Pantry Chef • Reduce food waste, save money, eat better</p>
          <p className="mt-1 text-xs text-gray-500">
            Data persists in your browser using LocalStorage • {SEED_RECIPES.length} recipes loaded
          </p>
        </div>
      </footer>
    </div>
  );
}