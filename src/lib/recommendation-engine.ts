// Recommendation Engine - The "Brain" of the Application
// Implements the scoring algorithm: S = (W1 * U) + (W2 * E) - (W3 * M)

import { Recipe, PantryItem } from './database';

// --- UNIT CONVERSION LOGIC ---

const UNIT_ALIASES: Record<string, string> = {
  'kgs': 'kg', 'kilogram': 'kg', 'kilograms': 'kg',
  'gms': 'g', 'gram': 'g', 'grams': 'g',
  'lbs': 'lb', 'pound': 'lb', 'pounds': 'lb',
  'ounce': 'oz', 'ounces': 'oz',
  'liter': 'l', 'liters': 'l', 'litre': 'l',
  'milliliter': 'ml', 'milliliters': 'ml',
  'tablespoon': 'tbsp', 'tablespoons': 'tbsp',
  'teaspoon': 'tsp', 'teaspoons': 'tsp',
  'unit': 'count', 'piece': 'count', 'pcs': 'count'
};

function normalizeUnit(unit: string): string {
  const lower = unit.toLowerCase().replace(/s$/, ''); // Basic plural removal
  return UNIT_ALIASES[lower] || UNIT_ALIASES[unit.toLowerCase()] || lower;
}

// Convert everything to a base unit (g for weight, ml for volume, raw for count)
// For simplicity in this app, we will treat 1 g ~= 1 ml for cross-domain comparisons (like water/milk)
function getBaseQuantity(quantity: number, unit: string): { value: number; type: 'mass' | 'vol' | 'count' } {
  const norm = normalizeUnit(unit);

  // Weight -> convert to grams
  if (norm === 'kg') return { value: quantity * 1000, type: 'mass' };
  if (norm === 'g') return { value: quantity, type: 'mass' };
  if (norm === 'lb') return { value: quantity * 453.59, type: 'mass' };
  if (norm === 'oz') return { value: quantity * 28.35, type: 'mass' };

  // Volume -> convert to ml
  if (norm === 'l') return { value: quantity * 1000, type: 'vol' };
  if (norm === 'ml') return { value: quantity, type: 'vol' };
  if (norm === 'cup' || norm === 'cups') return { value: quantity * 236.59, type: 'vol' }; // US Cup
  if (norm === 'tbsp') return { value: quantity * 14.79, type: 'vol' };
  if (norm === 'tsp') return { value: quantity * 4.93, type: 'vol' };

  // Count/Default
  return { value: quantity, type: 'count' };
}

function parseQuantity(rawText: string): { quantity: number; unit: string } {
  // Regex to match "1.5 kg", "200g", "1/2 cup"
  // Handles fractions like 1/2
  const fractionMatch = rawText.match(/(\d+)\/(\d+)\s*([a-z]+)/i);
  if (fractionMatch) {
    return { quantity: parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]), unit: fractionMatch[3].toLowerCase() };
  }

  const match = rawText.match(/(\d+(\.\d+)?)\s*([a-z]+)/i);
  if (match) {
    return { quantity: parseFloat(match[1]), unit: match[3].toLowerCase() };
  }
  
  // Implicit counts
  if (rawText.toLowerCase().includes('egg')) return { quantity: 1, unit: 'count' };
  if (rawText.toLowerCase().includes('bread')) return { quantity: 1, unit: 'slice' };
  if (rawText.toLowerCase().includes('tomato')) return { quantity: 1, unit: 'count' };
  if (rawText.toLowerCase().includes('onion')) return { quantity: 1, unit: 'count' };
  
  return { quantity: 1, unit: 'count' };
}

function isQuantitySufficient(
  recipeText: string,
  pantryText: string,
  servings: number,
  recipeIngredientName: string
): boolean {
  const recipe = parseQuantity(recipeText);
  const pantry = parseQuantity(pantryText);
  
  // Recipe needs scale
  const requiredRaw = recipe.quantity * servings;
  
  const recipeBase = getBaseQuantity(requiredRaw, recipe.unit);
  const pantryBase = getBaseQuantity(pantry.quantity, pantry.unit);

  // 1. Same Type Check (Mass vs Mass, Vol vs Vol)
  if (recipeBase.type === pantryBase.type) {
    return pantryBase.value >= recipeBase.value;
  }

  // 2. Cross-Domain Check (Mass vs Vol) - Rough Approximation (1g ~= 1ml)
  // This allows "1kg" of flour to match "2 cups" (approx 240g) without failing immediately
  if ((recipeBase.type === 'mass' && pantryBase.type === 'vol') || 
      (recipeBase.type === 'vol' && pantryBase.type === 'mass')) {
      // Very rough check: treat values as equal
      return pantryBase.value >= recipeBase.value;
  }

  // 3. Fallback for counts/mismatched units
  return pantry.quantity >= requiredRaw;
}

// --- END UNIT CONVERSION LOGIC ---


export interface RecipeScore {
  recipe: Recipe;
  score: number;
  usageRatio: number;
  expiryUrgency: number;
  missingItems: number;
  matchedIngredients: { name: string, isSufficient: boolean, pantryQuantity: string, recipeQuantity: string }[];
  missingIngredientsList: { name: string, neededQuantity: string }[];
  expiredIngredients: { name: string, pantryQuantity: string, recipeQuantity: string }[];
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
  
  // STRICT CHECK: Distinguish "cheese" from "cheese slice"
  // This prevents generic cheese from matching cheese slices and vice versa
  if ((norm1 === 'cheese' && norm2.includes('slice')) || 
      (norm2 === 'cheese' && norm1.includes('slice'))) {
    return false;
  }

  if (norm1 === norm2) return true;
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  const synonyms: Record<string, string[]> = {
    'tomato': ['tomato', 'tomatoes'],
    'onion': ['onion', 'onions', 'scallion', 'green onion'],
    'pepper': ['pepper', 'bell pepper', 'chili', 'chile'],
    'cheese': ['cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta'],
    'cheese slice': ['cheese slice', 'american cheese', 'processed cheese', 'cheddar slice'],
    'oil': ['oil', 'olive oil', 'vegetable oil', 'sesame oil'],
    'broth': ['broth', 'stock', 'bouillon'],
    'bean': ['bean', 'black bean', 'kidney bean', 'chickpea'],
  };
  
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

// Calculate days until expiry (EXPORTED)
export function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate expiry urgency score for a single item
function calculateExpiryUrgencyScore(daysUntilExpiry: number): number {
  if (daysUntilExpiry < 0) return 0; // Already expired, don't use
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
    const expiredIngredients: RecipeScore['expiredIngredients'] = [];
    const urgentIngredients: string[] = [];
    let expiryUrgencySum = 0;
    
    const recipeIngredientNames = recipe.ingredients;
    const recipeRawIngredients = recipe.rawIngredients;
    
    // Group ALL pantry items by normalized name
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
      // Skip salt
      if (recipeIngName.toLowerCase().includes('salt')) {
        return;
      }

      let matchStatus: 'sufficient' | 'insufficient' | 'expired' | 'missing' = 'missing';
      let matchData = null;
      const recipeRawIng = recipeRawIngredients[index] || recipeIngName;
      
      const { quantity, unit } = parseQuantity(recipeRawIng);
      const scaledQuantity = quantity * servings;
      const formattedQuantity = Number.isInteger(scaledQuantity) ? scaledQuantity.toString() : scaledQuantity.toFixed(1);
      const scaledRecipeString = `${formattedQuantity} ${unit}`;

      // Find a matching pantry item
      for (const [pantryNormName, items] of pantryMap.entries()) {
        if (ingredientsMatch(recipeIngName, pantryNormName)) {
          
          // Split items into Fresh and Spoiled
          const freshItems = items.filter(i => getDaysUntilExpiry(i.expiryDate) >= 0);
          const spoiledItems = items.filter(i => getDaysUntilExpiry(i.expiryDate) < 0);

          if (freshItems.length > 0) {
            // Priority 1: We have fresh items
            const primaryItem = freshItems[0];
            const isSufficient = isQuantitySufficient(recipeRawIng, primaryItem.quantity, servings, recipeIngName);
            
            matchStatus = isSufficient ? 'sufficient' : 'insufficient';
            matchData = {
              name: primaryItem.name,
              pantryQuantity: primaryItem.quantity,
              recipeQuantity: scaledRecipeString
            };

            // Calculate urgency based on FRESH items only
            const daysUntilExpiry = getDaysUntilExpiry(primaryItem.expiryDate);
            const urgencyScore = calculateExpiryUrgencyScore(daysUntilExpiry);
            expiryUrgencySum += urgencyScore;

            if (daysUntilExpiry <= 3) {
              urgentIngredients.push(primaryItem.name);
            }

          } else if (spoiledItems.length > 0) {
            // Priority 2: We ONLY have expired items
            matchStatus = 'expired';
            const primaryItem = spoiledItems[0];
            matchData = {
              name: primaryItem.name,
              pantryQuantity: primaryItem.quantity,
              recipeQuantity: scaledRecipeString
            };
          }
          
          if (matchStatus !== 'missing') break;
        }
      }

      if (matchStatus === 'sufficient') {
        matchedIngredients.push({ ...matchData!, isSufficient: true });
      } else if (matchStatus === 'insufficient') {
        matchedIngredients.push({ ...matchData!, isSufficient: false });
      } else if (matchStatus === 'expired') {
        expiredIngredients.push({ ...matchData! });
      } else {
        // Missing entirely
        const nameMatches = (n: string) => normalizeIngredient(n) === recipeIngName;
        const alreadyMatched = matchedIngredients.some(m => nameMatches(m.name));
        const alreadyExpired = expiredIngredients.some(e => nameMatches(e.name));

        if (!alreadyMatched && !alreadyExpired) {
            missingIngredientsList.push({
                name: recipeIngName.replace(/^(.)/, (c) => c.toUpperCase()),
                neededQuantity: scaledRecipeString 
            });
        }
      }
    });

    const sufficientCount = matchedIngredients.filter(m => m.isSufficient).length;
    const totalIngredientsForMatch = recipeIngredientNames.filter(n => !n.toLowerCase().includes('salt')).length;

    const usageRatio = totalIngredientsForMatch > 0 ? sufficientCount / totalIngredientsForMatch : 0;
    
    const sufficientMatchedCount = matchedIngredients.filter(m => m.isSufficient).length;
    const expiryUrgency = sufficientMatchedCount > 0 ? expiryUrgencySum / (sufficientMatchedCount * 100) : 0;

    const missingCount = missingIngredientsList.length + expiredIngredients.length;
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
      expiredIngredients,
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