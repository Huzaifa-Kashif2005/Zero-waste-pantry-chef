import { useState, useEffect } from 'react';
import { db, PantryItem } from './lib/database';
import { SEED_RECIPES } from './lib/seed-data';
import { getTopRecommendations, getPantryStats, RecipeScore, getDaysUntilExpiry, normalizeIngredient } from './lib/recommendation-engine';
import { PantryManager } from './components/PantryManager';
import { RecipeCard } from './components/RecipeCard';
import { StatsPanel } from './components/StatsPanel';
import { ChefHat, Sparkles, RefreshCw, AlertCircle, Trash2, ArrowDown, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [pantryItems, setPantryItems] = useState(db.getAllPantryItems());
  const [recommendations, setRecommendations] = useState<RecipeScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [servings, setServings] = useState<number | string>(1);
  const [servingsError, setServingsError] = useState<string>("");
  const [expiredItems, setExpiredItems] = useState<PantryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const recipes = db.getAllRecipes();
    if (recipes.length === 0 || recipes.length !== SEED_RECIPES.length) {
      db.seedRecipes(SEED_RECIPES);
    }
  }, []);

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setServings(val);
    if (val === '') {
      setServingsError(""); 
    } else {
      const num = parseInt(val);
      if (num <= 0) setServingsError("Must be > 0");
      else setServingsError("");
    }
  };

  const handleGetRecommendations = () => {
    const servingsNum = typeof servings === 'string' ? parseInt(servings) : servings;
    if (!servingsNum || servingsNum <= 0) return;

    const expired = pantryItems.filter(item => getDaysUntilExpiry(item.expiryDate) < 0);
    
    if (expired.length > 0) {
        setExpiredItems(expired);
        setRecommendations([]); 
        return; 
    } else {
        setExpiredItems([]);
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const recipes = db.getAllRecipes();
      const topRecommendations = getTopRecommendations(recipes, pantryItems, 50, servingsNum); 
      setRecommendations(topRecommendations);
      setVisibleCount(5); 
      setIsLoading(false);
    }, 800);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleAddItem = (name: string, quantity: string, expiryDate: Date) => {
    db.addPantryItem({ name, quantity, expiryDate });
    setPantryItems(db.getAllPantryItems());
  };

  const handleUpdateItem = (id: number, updates: Partial<PantryItem>) => {
    db.updatePantryItem(id, updates);
    setPantryItems(db.getAllPantryItems());
    setExpiredItems([]); 
  };

  const handleDeleteItem = (id: number) => {
    db.deletePantryItem(id);
    setPantryItems(db.getAllPantryItems());
    setExpiredItems([]);
  };

  const stats = getPantryStats(pantryItems);
  
  const uniqueSavedIngredients = new Set<string>();
  recommendations.forEach(rec => {
    rec.urgentIngredients.forEach(ing => uniqueSavedIngredients.add(ing));
  });
  const totalWasteSaved = uniqueSavedIngredients.size;

  let urgentItemRecipeCount = 0;
  if (stats.mostUrgentItem) {
    const urgentName = normalizeIngredient(stats.mostUrgentItem.name);
    urgentItemRecipeCount = recommendations.filter(rec => 
      rec.urgentIngredients.some(ing => normalizeIngredient(ing) === urgentName)
    ).length;
  }

  const isFormValid = !servingsError && servings !== '' && (typeof servings === 'string' ? parseInt(servings) > 0 : servings > 0);
  const visibleRecipes = recommendations.slice(0, visibleCount);
  const hasMoreRecipes = visibleCount < recommendations.length;

  return (
    <div className="font-sans text-gray-800 relative">
      
      {/* ======================================================= */}
      {/* 1. HERO SECTION (Video + Centered Content) */}
      {/* ======================================================= */}
      <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-center px-4">
        
        {/* Fixed Video Background */}
        <div className="absolute top-0 left-0 w-full h-full fixed">
            <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            >
            <source src="/background.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* The Content (Clean & Centered) */}
        <div className="relative z-10 animate-fade-in-up max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-black/20 backdrop-blur-sm p-8 rounded-[3rem] border border-white/10 shadow-2xl"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-block mb-6 p-5 bg-white/10 rounded-full border border-white/20 shadow-lg"
                >
                    <ChefHat className="w-16 h-16 text-white drop-shadow-md" />
                </motion.div>
                
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg"
                >
                    Zero-Waste Pantry Chef
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-lg md:text-xl font-light text-white/90 drop-shadow leading-relaxed"
                >
                    Turn your pantry into delicious meals.<br/>Save food. Save money.
                </motion.p>
            </motion.div>
        </div>

      </div>


      {/* ======================================================= */}
      {/* 2. MAIN APP SECTION (White Background) */}
      {/* ======================================================= */}
      <div className="bg-gray-50 min-h-screen border-t border-gray-200">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* STATS PANEL - Floating slightly up into the hero area */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 -mt-24 relative z-20"
            >
                <StatsPanel 
                    stats={stats} 
                    totalWasteSaved={totalWasteSaved} 
                    urgentItemRecipeCount={urgentItemRecipeCount} 
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT: PANTRY CARD */}
            <div className="lg:col-span-1 lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <PantryManager
                        pantryItems={pantryItems}
                        onAddItem={handleAddItem}
                        onDeleteItem={handleDeleteItem}
                        onUpdateItem={handleUpdateItem}
                    />
                </div>
            </div>

            {/* RIGHT: RECIPES CARD */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 min-h-[400px]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-purple-600" />
                            <h2 className="text-xl font-bold text-gray-800">Recommendations</h2>
                        </div>
                        
                        {/* Controls */}
                        {pantryItems.length > 0 && (
                            <div className='flex items-center gap-3 w-full sm:w-auto'>
                                <div className='w-24 relative'>
                                    <input
                                        id="servings-input"
                                        type="number"
                                        value={servings}
                                        onChange={handleServingsChange}
                                        min="1"
                                        placeholder="Servings"
                                        className={`w-full px-3 py-2 border ${servingsError ? 'border-red-500' : 'border-gray-300'} rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center bg-gray-50`}
                                    />
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleGetRecommendations}
                                    disabled={isLoading || !isFormValid}
                                    className={`flex-1 sm:flex-initial bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2 ${(!isFormValid || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg transition-all'}`}
                                >
                                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    <span className="whitespace-nowrap">Get Recipes</span>
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* CONTENT AREA */}
                    
                    {/* Expiry Warning */}
                    {expiredItems.length > 0 && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                            <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-red-700">Safety Check Required</h3>
                            <p className="text-gray-600 mb-3">
                                You have <strong>{expiredItems.length} expired items</strong>. Please remove them to see recipes.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {expiredItems.map(i => (
                                    <span key={i.id} className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                        {i.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty States */}
                    {pantryItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <ChefHat className="w-12 h-12 mb-3 opacity-20" />
                            <p className="font-medium">Add items to your pantry to start</p>
                        </div>
                    )}

                    {pantryItems.length > 0 && recommendations.length === 0 && expiredItems.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <Sparkles className="w-12 h-12 mb-3 opacity-20" />
                            <p className="font-medium">Click "Get Recipes" to generate ideas</p>
                        </div>
                    )}

                    {/* Recipe List */}
                    {recommendations.length > 0 && expiredItems.length === 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Top {visibleRecipes.length} Matches
                                </h3>
                                {totalWasteSaved > 0 && (
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold shadow-sm">
                                        {totalWasteSaved} Saved
                                    </span>
                                )}
                            </div>
                            
                            {visibleRecipes.map((recipeScore, index) => (
                                <RecipeCard
                                    key={recipeScore.recipe.id}
                                    recipeScore={recipeScore}
                                    rank={index + 1}
                                />
                            ))}

                            {hasMoreRecipes && (
                                <div className="pt-4 border-t border-gray-100">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={handleLoadMore}
                                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 py-4 rounded-xl font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                        Load More Recipes
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 py-8 text-center text-gray-400 text-sm">
            <p className="font-medium text-gray-600">Zero-Waste Pantry Chef</p>
            <p className="text-xs mt-1">Reduce food waste • Save money • Eat better</p>
            </footer>
        </main>
      </div>
    </div>
  );
}