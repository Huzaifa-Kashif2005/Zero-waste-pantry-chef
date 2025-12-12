// Recommendation Engine - The "Brain" of the Application
// Implements the scoring algorithm: S = (W1 * U) + (W2 * E) - (W3 * M)

import { Recipe, PantryItem } from './database';

// Helper function for a simplistic quantity and unit extraction
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
  if (['count', 'slice', 'unit'].includes(recipe.unit) && ['count', 'slice', 'unit'].includes(pantry.unit)) {
    if (requiredQuantity <= pantry.quantity) {
      return true;
    }
  }

  // Common ingredient explicit check
  if (recipeIngredientName.includes('egg') || recipeIngredientName.includes('bread')) {
    if (requiredQuantity <= pantry.quantity) {
      return true;
    }
  }

  // Fallback comparison: simple numeric check
  return requiredQuantity <= pantry.quantity;
}


export interface RecipeScore {
  recipe: Recipe;
  score: number;
  usageRatio: number;
  expiryUrgency: number;
  missingItems: number;
  matchedIngredients: { name: string, isSufficient: boolean, pantryQuantity: string, recipeQuantity: string }[];
  missingIngredientsList: { name: string, neededQuantity: string }[];
  urgentIngredients: string[];
  wasteSaved: number;
}

// Ingredient normalization utilities
export function normalizeIngredient(ingredient: string): string {
  let normalized = ingredient.toLowerCase().trim();
  
  // Remove quantities and measurements
  normalized = normalized.replace(/^\d+(\.\d+)?\s*(cups?|tbsp?|tsp?|oz|g|kg|lbs?|ml|l|slices?|cloves?|cans?|large|medium|small|whole|fresh|dried|packets?)?\s*/i, '');
  
  // Remove common words
  normalized = normalized.replace(/\b(of|the|a|an|chopped|diced|sliced|minced|grated|shredded|cooked|raw|fresh|frozen|cold|hot|warm)\b/gi, '');
  
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

// Check if two ingredients match (fuzzy matching and substitution)
function ingredientsMatch(ingredient1: string, ingredient2: string): boolean {
  const norm1 = normalizeIngredient(ingredient1);
  const norm2 = normalizeIngredient(ingredient2);
  
  // Direct match or partial match
  if (norm1 === norm2) return true;
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  const synonyms: Record<string, string[]> = {
    'tomato': ['tomato', 'tomatoes'],
    'onion': ['onion', 'onions', 'scallion', 'green onion'],
    'pepper': ['pepper', 'bell pepper', 'chili', 'chile'],
    'cheese': ['cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta'],
    'oil': ['oil', 'olive oil', 'vegetable oil', 'sesame oil'],
    'broth': ['broth', 'stock', 'bouillon'],
    'bean': ['bean', 'black bean', 'kidney bean', 'chickpea'],
  };
  
  // LOGIC ADDED: Ingredient Substitutions
  const substitutions: Record<string, string[]> = {
    'pizza dough': ['pizza dough', 'flour'], 
    'flour': ['flour', 'bread'], 
    'broth': ['stock', 'bouillon', 'water'],
    'rice': ['quinoa', 'couscous'],
    'milk': ['almond milk', 'soy milk', 'cream'],
    'butter': ['margarine', 'oil'],
    'sugar': ['honey', 'syrup'],
    'yogurt': ['greek yogurt', 'sour cream'],
  };

  const allSynonyms = { ...synonyms, ...substitutions };
  
  for (const [key, values] of Object.entries(allSynonyms)) {
    if (values.includes(norm1) && values.includes(norm2)) {
      return true;
    }
  }
  
  return false;
}

// Calculate days until expiry
function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate expiry urgency score for a single item
function calculateExpiryUrgencyScore(daysUntilExpiry: number): number {
  if (daysUntilExpiry < 0) return 0;
  if (daysUntilExpiry === 0) return 100;
  if (daysUntilExpiry === 1) return 80;
  if (daysUntilExpiry === 2) return 60;
  if (daysUntilExpiry <= 3) return 40;
  if (daysUntilExpiry <= 5) return 20;
  if (daysUntilExpiry <= 7) return 10;
  return 5; 
}

// Main recommendation algorithm
export function calculateRecipeScores(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  servings: number = 1, 
  weights = { usage: 0.3, expiry: 0.5, missing: 0.2 }
): RecipeScore[] {
  const scores: RecipeScore[] = [];

  for (const recipe of recipes) {
    const matchedIngredients: RecipeScore['matchedIngredients'] = [];
    const missingIngredientsList: RecipeScore['missingIngredientsList'] = [];
    const urgentIngredients: string[] = [];
    let expiryUrgencySum = 0;
    
    const recipeIngredientNames = recipe.ingredients;
    const recipeRawIngredients = recipe.rawIngredients;
    
    // LOGIC ADDED: Exclude salt from total count so missing it doesn't hurt score
    const totalIngredients = recipeIngredientNames.filter(n => !n.toLowerCase().includes('salt')).length;
    
    // Group pantry items by normalized name
    const pantryMap = new Map<string, PantryItem[]>();
    for (const item of pantryItems) {
        const normalizedName = normalizeIngredient(item.name);
        if (!pantryMap.has(normalizedName)) {
            pantryMap.set(normalizedName, []);
        }
        pantryMap.get(normalizedName)!.push(item);
    }
    
    // For each recipe ingredient
    recipeIngredientNames.forEach((recipeIngName, index) => {
      // LOGIC ADDED: Skip salt completely
      if (recipeIngName.toLowerCase().includes('salt')) {
        return;
      }

      let foundInPantry = false;
      let isSufficient = false;
      const recipeRawIng = recipeRawIngredients[index] || recipeIngName;
      
      // LOGIC ADDED: Calculate scaled quantity based on servings
      const { quantity, unit } = parseQuantity(recipeRawIng);
      const scaledQuantity = quantity * servings;
      // Format to avoid long decimals (e.g., "1.5 cups")
      const formattedQuantity = Number.isInteger(scaledQuantity) ? scaledQuantity.toString() : scaledQuantity.toFixed(1);
      const scaledRecipeString = `${formattedQuantity} ${unit}`;

      // Find a matching pantry item (checking substitutions too)
      for (const [pantryNormName, pantryItems] of pantryMap.entries()) {
        if (ingredientsMatch(recipeIngName, pantryNormName)) {
          foundInPantry = true;

          const pantryItem = pantryItems[0]; 
          // LOGIC ADDED: Check if pantry has ENOUGH for the requested servings
          const isSufficientForServings = isQuantitySufficient(
            recipeRawIng, 
            pantryItem.quantity, 
            servings, 
            recipeIngName
          );

          isSufficient = isSufficientForServings;
          
          if (isSufficientForServings) {
            const daysUntilExpiry = getDaysUntilExpiry(pantryItem.expiryDate);
            const urgencyScore = calculateExpiryUrgencyScore(daysUntilExpiry);
            expiryUrgencySum += urgencyScore;

            if (daysUntilExpiry <= 3) {
              urgentIngredients.push(pantryItem.name);
            }
          }
          
          matchedIngredients.push({
            name: pantryItem.name, 
            isSufficient,
            pantryQuantity: pantryItem.quantity,
            recipeQuantity: scaledRecipeString // Shows "Need: 4 tomatoes" instead of "2 tomatoes"
          });
          
          break; 
        }
      }

      if (!foundInPantry || !isSufficient) {
        // Only push to missing list if it's not already logged as an insufficient match
        if (!matchedIngredients.some(m => normalizeIngredient(m.name) === recipeIngName)) {
            missingIngredientsList.push({
                name: recipeIngName.replace(/^(.)/, (c) => c.toUpperCase()),
                neededQuantity: scaledRecipeString // Shows the scaled amount needed
            });
        }
      }
    });

    const sufficientCount = matchedIngredients.filter(m => m.isSufficient).length;
    const totalIngredientsForMatch = totalIngredients;

    const usageRatio = totalIngredientsForMatch > 0 ? sufficientCount / totalIngredientsForMatch : 0;
    
    const sufficientMatchedCount = matchedIngredients.filter(m => m.isSufficient).length;
    const expiryUrgency = sufficientMatchedCount > 0 ? expiryUrgencySum / (sufficientMatchedCount * 100) : 0;

    const missingCount = missingIngredientsList.length;
    const missingItemsPenalty = totalIngredientsForMatch > 0 ? missingCount / totalIngredientsForMatch : 1;

    const score = 
      (weights.usage * usageRatio * 100) +
      (weights.expiry * expiryUrgency * 100) -
      (weights.missing * missingItemsPenalty * 100);

    const wasteSaved = urgentIngredients.length;

    scores.push({
      recipe,
      score: Math.max(0, score), 
      usageRatio,
      expiryUrgency,
      missingItems: missingItemsPenalty,
      matchedIngredients,
      missingIngredientsList,
      urgentIngredients,
      wasteSaved
    });
  }

  return scores.sort((a, b) => b.score - a.score);
}

export function getTopRecommendations(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  topN: number = 5,
  servings: number = 1
): RecipeScore[] {
  const allScores = calculateRecipeScores(recipes, pantryItems, servings);
  // Only recommend recipes where you have at least ONE sufficient ingredient match
  const validScores = allScores.filter(score => score.matchedIngredients.some(m => m.isSufficient));
  return validScores.slice(0, topN);
}

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