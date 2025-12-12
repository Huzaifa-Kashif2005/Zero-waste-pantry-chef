import { useState, useEffect } from 'react';
import { db, PantryItem } from './lib/database';
import { SEED_RECIPES } from './lib/seed-data';
import { getTopRecommendations, getPantryStats, RecipeScore, getDaysUntilExpiry } from './lib/recommendation-engine';
import { PantryManager } from './components/PantryManager';
import { RecipeCard } from './components/RecipeCard';
import { StatsPanel } from './components/StatsPanel';
import { ChefHat, Sparkles, RefreshCw, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [pantryItems, setPantryItems] = useState(db.getAllPantryItems());
  const [recommendations, setRecommendations] = useState<RecipeScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(false);
  
  // State for servings and errors
  const [servings, setServings] = useState<number | string>(1);
  const [servingsError, setServingsError] = useState<string>("");
  
  // NEW: State to track expired items that block recommendations
  const [expiredItems, setExpiredItems] = useState<PantryItem[]>([]);

  // Seed database with recipes on first load
  useEffect(() => {
    const recipes = db.getAllRecipes();
    if (recipes.length === 0 || recipes.length !== SEED_RECIPES.length) {
      db.seedRecipes(SEED_RECIPES);
      setHasSeeded(true);
    }
  }, []);

  // Handle Servings Input Change
  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setServings(val);

    if (val === '') {
      setServingsError(""); 
    } else {
      const num = parseInt(val);
      if (num === 0) {
        setServingsError("Must be > 0");
      } else if (num < 0) {
        setServingsError("Must be positive");
      } else {
        setServingsError("");
      }
    }
  };

  // Get recommendations
  const handleGetRecommendations = () => {
    // 1. Safety check for servings
    const servingsNum = typeof servings === 'string' ? parseInt(servings) : servings;
    if (!servingsNum || servingsNum <= 0) return;

    // 2. Check for Expired Items
    const expired = pantryItems.filter(item => getDaysUntilExpiry(item.expiryDate) < 0);
    
    if (expired.length > 0) {
        // Block recommendations!
        setExpiredItems(expired);
        setRecommendations([]); // Clear any previous results
        return; 
    } else {
        // Clear warning if resolved
        setExpiredItems([]);
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const recipes = db.getAllRecipes();
      const topRecommendations = getTopRecommendations(recipes, pantryItems, 5, servingsNum); 
      setRecommendations(topRecommendations);
      setIsLoading(false);
    }, 800);
  };

  // Add item to pantry
  const handleAddItem = (name: string, quantity: string, expiryDate: Date) => {
    db.addPantryItem({ name, quantity, expiryDate });
    setPantryItems(db.getAllPantryItems());
    // We don't auto-refresh recommendations here to force user to check expiry again
  };

  // Update item in pantry
  const handleUpdateItem = (id: number, updates: Partial<PantryItem>) => {
    db.updatePantryItem(id, updates);
    setPantryItems(db.getAllPantryItems());
    
    // If we updated an item, maybe it fixed the expiry issue, so clear the warning temporarily
    setExpiredItems([]); 
  };

  // Delete item from pantry
  const handleDeleteItem = (id: number) => {
    db.deletePantryItem(id);
    setPantryItems(db.getAllPantryItems());
    
    // If we deleted an item, clear the expired warning to allow re-checking
    setExpiredItems([]);
  };

  // Calculate stats
  const stats = getPantryStats(pantryItems);
  const totalWasteSaved = recommendations.reduce((sum, rec) => sum + rec.wasteSaved, 0);

  const isFormValid = !servingsError && servings !== '' && (typeof servings === 'string' ? parseInt(servings) > 0 : servings > 0);

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
              onUpdateItem={handleUpdateItem}
            />
          </div>

          {/* Right Section - Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl">Recipe Recommendations</h2>
                </div>
                
                {/* Input and Button Group */}
                {pantryItems.length > 0 && (
                  <div className='flex flex-row items-start gap-3 w-full sm:w-auto h-[70px]'>
                    <div className='w-24 sm:w-32 flex-shrink-0 relative'>
                      <label htmlFor="servings-input" className="block text-sm text-gray-600 mb-1 whitespace-nowrap">
                        Servings
                      </label>
                      <input
                        id="servings-input"
                        type="number"
                        value={servings}
                        onChange={handleServingsChange}
                        min="1"
                        className={`w-full px-3 py-2 border ${servingsError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 focus:border-transparent outline-none text-center transition-colors`}
                      />
                      {servingsError && (
                        <div className="absolute top-full left-0 mt-1 flex items-center gap-1 text-xs text-red-600 font-medium whitespace-nowrap">
                          <AlertCircle className="w-3 h-3" />
                          {servingsError}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-[26px] flex-1 sm:flex-initial">
                      <motion.button
                        whileHover={isFormValid ? { scale: 1.05 } : {}}
                        whileTap={isFormValid ? { scale: 0.95 } : {}}
                        onClick={handleGetRecommendations}
                        disabled={isLoading || !isFormValid}
                        className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 h-[42px] rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap ${(!isFormValid || isLoading) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:from-purple-700 hover:to-blue-700'}`}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span className="hidden sm:inline">Finding...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Get Recipes</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>

              {/* WARNING BLOCKER FOR EXPIRED ITEMS */}
              {expiredItems.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-red-50 border border-red-200 rounded-xl p-6 text-center"
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="bg-red-100 p-3 rounded-full">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-red-700">Safety First!</h3>
                        <p className="text-gray-700 max-w-md mx-auto">
                            We found <strong>{expiredItems.length} expired item{expiredItems.length > 1 ? 's' : ''}</strong> in your pantry. 
                            Please remove them before cooking to ensure safe and delicious meals.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                            {expiredItems.map(item => (
                                <span key={item.id} className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1 shadow-sm">
                                    {item.name}
                                    <span className="text-xs opacity-75">
                                        (Expired {Math.abs(getDaysUntilExpiry(item.expiryDate))}d ago)
                                    </span>
                                </span>
                            ))}
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                            Delete these items using the list on the left to proceed.
                        </p>
                    </div>
                </motion.div>
              )}

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
              ) : (recommendations.length === 0 && expiredItems.length === 0) ? (
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
                      🎯 <span>Our AI considers:</span> What you have, what's expiring soon, and quantity needed.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Recipe Cards - Only show if NO expired items found */}
            {recommendations.length > 0 && expiredItems.length === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg text-gray-700">
                    Top {recommendations.length} Recipes for {servings} {parseInt(String(servings)) !== 1 ? 'People' : 'Person'}
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
                <h3 className="text-lg mb-2">Quantity Match</h3>
                <p className="text-blue-100 text-sm">
                  We check if you have *enough* of an ingredient for your desired number of servings.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🔄</div>
                <h3 className="text-lg mb-2">Ingredient Flexibility</h3>
                <p className="text-blue-100 text-sm">
                  The system recognizes basic substitutions, e.g., using `flour` if a recipe calls for `pizza dough`.
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