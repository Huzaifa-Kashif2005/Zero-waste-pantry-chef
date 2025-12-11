// Recommendation Engine - The "Brain" of the Application
// Implements the scoring algorithm: S = (W1 * U) + (W2 * E) - (W3 * M)

import { Recipe, PantryItem } from './database';

// Helper function for a simplistic quantity and unit extraction
// Note: This is a highly simplified parser and cannot handle all variations.
// A real-world app would use a specialized library for recipe NLP.
function parseQuantity(rawText: string): { quantity: number; unit: string } {
  const match = rawText.match(/(\d+(\.\d+)?)\s*([a-z]+)/i);
  if (match) {
    const quantity = parseFloat(match[1]);
    const unit = match[3].toLowerCase();
    return { quantity, unit };
  }
  
  // Default assumptions for un-parsed or single-item ingredients
  if (rawText.toLowerCase().includes('egg')) return { quantity: 1, unit: 'count' };
  if (rawText.toLowerCase().includes('bread')) return { quantity: 1, unit: 'slice' };
  if (rawText.toLowerCase().includes('tomato')) return { quantity: 1, unit: 'count' };
  if (rawText.toLowerCase().includes('onion')) return { quantity: 1, unit: 'count' };
  
  // Default to 1 for generic items
  return { quantity: 1, unit: 'unit' };
}

// A highly simplified function to compare quantities after parsing
// For this mock, we assume units are roughly compatible if they share a common base.
function isQuantitySufficient(
  recipeText: string,
  pantryText: string,
  servings: number,
  recipeIngredientName: string
): boolean {
  const recipe = parseQuantity(recipeText);
  const pantry = parseQuantity(pantryText);
  
  // Scale the required quantity by servings
  const requiredQuantity = recipe.quantity * servings;

  // Simplistic unit matching logic:
  // 1. If units are 'count', 'slice', or 'unit', compare directly.
  if (['count', 'slice', 'unit'].includes(recipe.unit) && ['count', 'slice', 'unit'].includes(pantry.unit)) {
    // Treat 1 "3 eggs" in recipe as 1 "unit" of egg, which is 3 eggs.
    // If the unit is 'count', the raw number is the number of items.
    if (requiredQuantity <= pantry.quantity) {
      return true;
    }
  }

  // 2. If it's a common ingredient like 'egg' or 'slice', use an explicit check
  if (recipeIngredientName.includes('egg') || recipeIngredientName.includes('bread')) {
    // Treat the number as the count for these normalized ingredients
    if (requiredQuantity <= pantry.quantity) {
      return true;
    }
  }

  // Fallback: Assume insufficient if any part of the quantity comparison fails, 
  // encouraging the user to check the recipe. The system will favor recipes
  // where the pantry item quantity is numerically greater than the required.
  return requiredQuantity <= pantry.quantity;
}


export interface RecipeScore {
  recipe: Recipe;
  score: number;
  usageRatio: number;
  expiryUrgency: number;
  missingItems: number;
  matchedIngredients: { name: string, isSufficient: boolean, pantryQuantity: string, recipeQuantity: string }[]; // Store sufficiency status
  missingIngredientsList: { name: string, neededQuantity: string }[];
  urgentIngredients: string[];
  wasteSaved: number; // How many expiring items this recipe uses
}

// Ingredient normalization utilities
export function normalizeIngredient(ingredient: string): string {
  let normalized = ingredient.toLowerCase().trim();
  
  // Remove quantities and measurements
  normalized = normalized.replace(/^\d+(\.\d+)?\s*(cups?|tbsp?|tsp?|oz|g|kg|lbs?|ml|l|slices?|cloves?|cans?|large|medium|small|whole|fresh|dried)?\s*/i, '');
  
  // Remove common words
  normalized = normalized.replace(/\b(of|the|a|an|chopped|diced|sliced|minced|grated|shredded|cooked|raw|fresh|frozen)\b/gi, '');
  
  // Remove special characters and extra spaces
  normalized = normalized.replace(/[^a-z\s]/g, '').trim();
  
  // Convert plural to singular (simple approach)
  if (normalized.endsWith('ies')) {
    normalized = normalized.slice(0, -3) + 'y';
  } else if (normalized.endsWith('es')) {
    normalized = normalized.slice(0, -2);
  } else if (normalized.endsWith('s') && !normalized.endsWith('ss')) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

// Check if two ingredients match (fuzzy matching)
function ingredientsMatch(ingredient1: string, ingredient2: string): boolean {
  const norm1 = normalizeIngredient(ingredient1);
  const norm2 = normalizeIngredient(ingredient2);
  
  // Exact match
  if (norm1 === norm2) return true;
  
  // Partial match (one contains the other)
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  // Common synonyms
  const synonyms: Record<string, string[]> = {
    'tomato': ['tomato', 'tomatoes'],
    'onion': ['onion', 'onions', 'scallion', 'green onion'],
    'pepper': ['pepper', 'bell pepper', 'chili', 'chile'],
    'cheese': ['cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta'],
    'oil': ['oil', 'olive oil', 'vegetable oil', 'sesame oil'],
    'broth': ['broth', 'stock', 'bouillon'],
    'bean': ['bean', 'black bean', 'kidney bean', 'chickpea'],
  };
  
  for (const [key, values] of Object.entries(synonyms)) {
    if (values.includes(norm1) && values.includes(norm2)) {
      return true;
    }
  }
  
  return false;
}

// Calculate days until expiry (unchanged)
function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate expiry urgency score for a single item (unchanged)
function calculateExpiryUrgencyScore(daysUntilExpiry: number): number {
  if (daysUntilExpiry < 0) return 0; // Already expired, don't use
  if (daysUntilExpiry === 0) return 100; // Expires today - VERY urgent
  if (daysUntilExpiry === 1) return 80; // Expires tomorrow - urgent
  if (daysUntilExpiry === 2) return 60; // 2 days - quite urgent
  if (daysUntilExpiry <= 3) return 40; // 3 days - moderately urgent
  if (daysUntilExpiry <= 5) return 20; // 4-5 days - somewhat urgent
  if (daysUntilExpiry <= 7) return 10; // 6-7 days - slightly urgent
  return 5; // More than a week - not very urgent
}

// Main recommendation algorithm
export function calculateRecipeScores(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  servings: number = 1, // NEW: servings parameter
  weights = { usage: 0.3, expiry: 0.5, missing: 0.2 } // W1, W2, W3
): RecipeScore[] {
  const scores: RecipeScore[] = [];

  for (const recipe of recipes) {
    const matchedIngredients: RecipeScore['matchedIngredients'] = [];
    const missingIngredientsList: RecipeScore['missingIngredientsList'] = [];
    const urgentIngredients: string[] = [];
    let expiryUrgencySum = 0;
    
    // Total ingredients for scoring will now be based on those whose *name* matches.
    const recipeIngredientNames = recipe.ingredients;
    const recipeRawIngredients = recipe.rawIngredients;
    const totalIngredients = recipeIngredientNames.length;
    let actualMatchedCount = 0;
    
    // Group pantry items by normalized name to easily check for quantity
    const pantryMap = new Map<string, PantryItem[]>();
    for (const item of pantryItems) {
        const normalizedName = normalizeIngredient(item.name);
        if (!pantryMap.has(normalizedName)) {
            pantryMap.set(normalizedName, []);
        }
        pantryMap.get(normalizedName)!.push(item);
    }
    
    // For each recipe ingredient (normalized name)
    recipeIngredientNames.forEach((recipeIngName, index) => {
      let foundInPantry = false;
      let isSufficient = false;
      const recipeRawIng = recipeRawIngredients[index] || recipeIngName;
      
      // Find a matching pantry item
      for (const [pantryNormName, pantryItems] of pantryMap.entries()) {
        if (ingredientsMatch(recipeIngName, pantryNormName)) {
          foundInPantry = true;
          actualMatchedCount++;

          // For simplicity, we'll check the first matching item's quantity.
          // In a real app, this would be more complex, summing up all matching items.
          const pantryItem = pantryItems[0]; 
          const isSufficientForServings = isQuantitySufficient(
            recipeRawIng, 
            pantryItem.quantity, 
            servings, 
            recipeIngName
          );

          if (isSufficientForServings) {
            isSufficient = true;

            // Calculate urgency for this item
            const daysUntilExpiry = getDaysUntilExpiry(pantryItem.expiryDate);
            const urgencyScore = calculateExpiryUrgencyScore(daysUntilExpiry);
            expiryUrgencySum += urgencyScore;

            // Track urgent ingredients (expiring within 3 days)
            if (daysUntilExpiry <= 3) {
              urgentIngredients.push(pantryItem.name);
            }
          }
          
          matchedIngredients.push({
            name: recipeIngName,
            isSufficient,
            pantryQuantity: pantryItem.quantity,
            recipeQuantity: recipeRawIng.replace(/^(.)/, (c) => c.toUpperCase())
          });
          
          break; // Move to the next recipe ingredient
        }
      }

      if (!foundInPantry || !isSufficient) {
        // If ingredient name is found but quantity is not sufficient,
        // OR the ingredient is not found at all, it's a "missing" item for our cooking purpose.
        
        // This is a subtle change: an ingredient might exist but be insufficient. 
        // For the purposes of the "missing" list, we treat both cases the same.
        
        // Scale the quantity needed for display
        const { quantity, unit } = parseQuantity(recipeRawIng);
        const needed = `${quantity * servings} ${unit}`;
        
        missingIngredientsList.push({
            name: recipeIngName,
            neededQuantity: needed
        });
      }
    });


    // Calculate metrics
    // The number of *sufficient* ingredients is crucial for a good recipe.
    const sufficientCount = matchedIngredients.filter(m => m.isSufficient).length;
    const totalIngredientsForMatch = totalIngredients; // Base is total recipe ingredients

    // U: Usage Ratio (0 to 1) - Now based on *sufficient* items
    const usageRatio = totalIngredientsForMatch > 0 ? sufficientCount / totalIngredientsForMatch : 0;
    
    // E: Expiry Urgency (normalized to 0-1 scale)
    // Average urgency score across *sufficient* matched ingredients
    const sufficientMatchedCount = matchedIngredients.filter(m => m.isSufficient).length;
    const expiryUrgency = sufficientMatchedCount > 0 ? expiryUrgencySum / (sufficientMatchedCount * 100) : 0;

    // M: Missing Items Penalty (0 to 1) - Based on remaining missing/insufficient items
    const missingCount = missingIngredientsList.length;
    const missingItemsPenalty = totalIngredientsForMatch > 0 ? missingCount / totalIngredientsForMatch : 1;

    // Calculate final score: S = (W1 * U) + (W2 * E) - (W3 * M)
    const score = 
      (weights.usage * usageRatio * 100) +
      (weights.expiry * expiryUrgency * 100) -
      (weights.missing * missingItemsPenalty * 100);

    // Waste saved metric (number of urgent items used)
    const wasteSaved = urgentIngredients.length;

    scores.push({
      recipe,
      score: Math.max(0, score), // Ensure non-negative
      usageRatio,
      expiryUrgency,
      missingItems: missingItemsPenalty,
      matchedIngredients,
      missingIngredientsList,
      urgentIngredients,
      wasteSaved
    });
  }

  // Sort by score (highest first)
  return scores.sort((a, b) => b.score - a.score);
}

// Get top N recommendations (unchanged)
export function getTopRecommendations(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  topN: number = 5,
  servings: number = 1 // NEW: servings parameter
): RecipeScore[] {
  const allScores = calculateRecipeScores(recipes, pantryItems, servings);
  
  // Filter out recipes with 0 *sufficient* matched ingredients
  const validScores = allScores.filter(score => score.matchedIngredients.some(m => m.isSufficient));
  
  return validScores.slice(0, topN);
}

// Get statistics about pantry (unchanged)
export interface PantryStats {
  totalItems: number;
  expiringToday: number;
  expiringIn3Days: number;
  expiringThisWeek: number;
  mostUrgentItem: PantryItem | null;
}

export function getPantryStats(pantryItems: PantryItem[]): PantryStats {
  const now = new Date();
  let expiringToday = 0;
  let expiringIn3Days = 0;
  let expiringThisWeek = 0;
  let mostUrgentItem: PantryItem | null = null;
  let minDays = Infinity;

  for (const item of pantryItems) {
    const days = getDaysUntilExpiry(item.expiryDate);
    
    if (days === 0) expiringToday++;
    if (days <= 3 && days >= 0) expiringIn3Days++;
    if (days <= 7 && days >= 0) expiringThisWeek++;

    if (days >= 0 && days < minDays) {
      minDays = days;
      mostUrgentItem = item;
    }
  }

  return {
    totalItems: pantryItems.length,
    expiringToday,
    expiringIn3Days,
    expiringThisWeek,
    mostUrgentItem
  };
}