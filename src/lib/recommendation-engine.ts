import { Recipe, PantryItem } from './database';

// --- Types & Interfaces ---

export interface RecipeScore {
  recipe: Recipe;
  score: number;
  usageRatio: number;
  expiryUrgency: number;
  missingItems: number;
  matchedIngredients: { 
    name: string; 
    isSufficient: boolean; 
    pantryQuantity: string; 
    recipeQuantity: string; 
  }[];
  missingIngredientsList: { name: string; neededQuantity: string }[];
  expiredIngredients: { name: string; pantryQuantity: string; recipeQuantity: string }[];
  urgentIngredients: string[];
  wasteSaved: number;
}

export interface PantryStats {
  totalItems: number;
  freshItems: number;
  expiringSoon: number;      // <= 3 days
  expiringThisWeek: number;  // <= 7 days
  expiredItems: number;      // < 0 days
  mostUrgentItem: PantryItem | null;
  pantryHealthScore: number; // 0-100
}

// --- Unit Conversion Utilities ---

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

const normalizeUnit = (unit: string): string => {
  const lower = unit.toLowerCase().replace(/s$/, '');
  return UNIT_ALIASES[lower] || UNIT_ALIASES[unit.toLowerCase()] || lower;
};

const getBaseQuantity = (quantity: number, unit: string): { value: number; type: 'mass' | 'vol' | 'count' } => {
  const norm = normalizeUnit(unit);

  // Mass conversions (to grams)
  if (norm === 'kg') return { value: quantity * 1000, type: 'mass' };
  if (norm === 'g') return { value: quantity, type: 'mass' };
  if (norm === 'lb') return { value: quantity * 453.59, type: 'mass' };
  if (norm === 'oz') return { value: quantity * 28.35, type: 'mass' };

  // Volume conversions (to ml)
  if (norm === 'l') return { value: quantity * 1000, type: 'vol' };
  if (norm === 'ml') return { value: quantity, type: 'vol' };
  if (norm === 'cup') return { value: quantity * 236.59, type: 'vol' };
  if (norm === 'tbsp') return { value: quantity * 14.79, type: 'vol' };
  if (norm === 'tsp') return { value: quantity * 4.93, type: 'vol' };

  return { value: quantity, type: 'count' };
};

const parseQuantity = (rawText: string): { quantity: number; unit: string } => {
  // Handle fractions like "1/2 cup"
  const fractionMatch = rawText.match(/(\d+)\/(\d+)\s*([a-z]+)/i);
  if (fractionMatch) {
    return { 
      quantity: parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]), 
      unit: fractionMatch[3].toLowerCase() 
    };
  }

  // Handle decimals/integers like "1.5 kg"
  const match = rawText.match(/(\d+(\.\d+)?)\s*([a-z]+)/i);
  if (match) {
    return { quantity: parseFloat(match[1]), unit: match[3].toLowerCase() };
  }
  
  // Implicit count handling for common items
  const lowerText = rawText.toLowerCase();
  if (lowerText.includes('egg') || lowerText.includes('tomato') || lowerText.includes('onion')) {
    return { quantity: 1, unit: 'count' };
  }
  if (lowerText.includes('bread')) {
    return { quantity: 1, unit: 'slice' };
  }
  
  return { quantity: 1, unit: 'count' };
};

const isQuantitySufficient = (
  recipeText: string,
  pantryText: string,
  servings: number,
): boolean => {
  const recipe = parseQuantity(recipeText);
  const pantry = parseQuantity(pantryText);
  
  const requiredRaw = recipe.quantity * servings;
  
  const recipeBase = getBaseQuantity(requiredRaw, recipe.unit);
  const pantryBase = getBaseQuantity(pantry.quantity, pantry.unit);

  // Direct unit match or compatible types
  if (recipeBase.type === pantryBase.type) {
    return pantryBase.value >= recipeBase.value;
  }

  // Allow cross-type comparison if reasonable (e.g. volume vs mass for water-like substances)
  // This is a rough heuristic
  if ((recipeBase.type === 'mass' && pantryBase.type === 'vol') || 
      (recipeBase.type === 'vol' && pantryBase.type === 'mass')) {
      return pantryBase.value >= recipeBase.value;
  }

  return pantry.quantity >= requiredRaw;
};

// --- String & Date Utilities ---

export const normalizeIngredient = (ingredient: string): string => {
  let normalized = ingredient.toLowerCase().trim();
  
  // Remove quantities and units from start of string
  normalized = normalized.replace(/^\d+(\.\d+)?\s*(cups?|tbsp?|tsp?|oz|g|kg|lbs?|ml|l|slices?|cloves?|cans?|large|medium|small|whole|fresh|dried|packets?)?\s*/i, '');
  
  // Remove common adjectives
  normalized = normalized.replace(/\b(of|the|a|an|chopped|diced|sliced|minced|grated|shredded|cooked|raw|fresh|frozen|cold|hot|warm)\b/gi, '');
  
  // Clean special chars
  normalized = normalized.replace(/[^a-z\s]/g, '').trim();
  
  // Pluralization handling
  if (normalized.endsWith('ies')) return normalized.slice(0, -3) + 'y';
  if (normalized.endsWith('es')) return normalized.slice(0, -2);
  if (normalized.endsWith('s') && !normalized.endsWith('ss')) return normalized.slice(0, -1);
  
  return normalized;
};

export const getDaysUntilExpiry = (expiryDate: Date): number => {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateExpiryUrgencyScore = (daysUntilExpiry: number): number => {
  if (daysUntilExpiry < 0) return 0; 
  if (daysUntilExpiry === 0) return 100;
  if (daysUntilExpiry === 1) return 80;
  if (daysUntilExpiry === 2) return 60;
  if (daysUntilExpiry <= 3) return 40;
  if (daysUntilExpiry <= 5) return 20;
  if (daysUntilExpiry <= 7) return 10;
  return 5; 
};

// --- Matching Logic ---

const ingredientsMatch = (ingredient1: string, ingredient2: string): boolean => {
  const norm1 = normalizeIngredient(ingredient1);
  const norm2 = normalizeIngredient(ingredient2);
  
  // Edge case: Cheese vs Slices
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
    'bean': ['bean', 'black bean', 'kidney bean', 'chickpea'],
  };
  
  const substitutions: Record<string, string[]> = {
    'pizza dough': ['pizza dough', 'flour'], 
    'flour': ['flour', 'bread'], 
    'broth': ['broth', 'stock', 'bouillon', 'water'],
    'rice': ['quinoa', 'couscous'],
    'milk': ['almond milk', 'soy milk', 'cream'],
    'butter': ['margarine', 'oil'],
    'sugar': ['honey', 'syrup'],
    'yogurt': ['greek yogurt', 'sour cream'],
  };

  const allSynonyms = { ...synonyms, ...substitutions };
  
  for (const values of Object.values(allSynonyms)) {
    if (values.includes(norm1) && values.includes(norm2)) return true;
  }
  
  return false;
};

// --- Scoring Engine ---

export function calculateRecipeScores(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  servings: number = 1, 
  weights = { usage: 0.20, expiry: 0.65, missing: 0.15 }
): RecipeScore[] {
  const scores: RecipeScore[] = [];

  // Identify most critical item to boost recipes that use it
  let minPantryDays = Infinity;
  pantryItems.forEach(item => {
    const d = getDaysUntilExpiry(item.expiryDate);
    if (d >= 0 && d < minPantryDays) minPantryDays = d;
  });

  for (const recipe of recipes) {
    const matchedIngredients: RecipeScore['matchedIngredients'] = [];
    const missingIngredientsList: RecipeScore['missingIngredientsList'] = [];
    const expiredIngredients: RecipeScore['expiredIngredients'] = [];
    const urgentIngredients: string[] = [];
    let expiryUrgencySum = 0;
    let usesCriticalItem = false;
    
    // Group pantry items for faster lookup
    const pantryMap = new Map<string, PantryItem[]>();
    for (const item of pantryItems) {
        const normalizedName = normalizeIngredient(item.name);
        if (!pantryMap.has(normalizedName)) pantryMap.set(normalizedName, []);
        pantryMap.get(normalizedName)!.push(item);
    }
    
    recipe.ingredients.forEach((recipeIngName, index) => {
      // Skip staples like salt
      if (recipeIngName.toLowerCase().includes('salt')) return;

      let matchStatus: 'sufficient' | 'insufficient' | 'expired' | 'missing' = 'missing';
      let matchData = null;
      const recipeRawIng = recipe.rawIngredients[index] || recipeIngName;
      
      const { quantity, unit } = parseQuantity(recipeRawIng);
      const scaledQuantity = quantity * servings;
      const formattedQuantity = Number.isInteger(scaledQuantity) ? scaledQuantity.toString() : scaledQuantity.toFixed(1);
      const scaledRecipeString = `${formattedQuantity} ${unit}`;

      // Check pantry for matches
      for (const [pantryNormName, items] of pantryMap.entries()) {
        if (ingredientsMatch(recipeIngName, pantryNormName)) {
          
          const freshItems = items.filter(i => getDaysUntilExpiry(i.expiryDate) >= 0);
          const spoiledItems = items.filter(i => getDaysUntilExpiry(i.expiryDate) < 0);

          if (freshItems.length > 0) {
            const primaryItem = freshItems[0];
            const isSufficient = isQuantitySufficient(recipeRawIng, primaryItem.quantity, servings);
            
            matchStatus = isSufficient ? 'sufficient' : 'insufficient';
            matchData = {
              name: primaryItem.name,
              pantryQuantity: primaryItem.quantity,
              recipeQuantity: scaledRecipeString
            };

            const daysUntilExpiry = getDaysUntilExpiry(primaryItem.expiryDate);
            expiryUrgencySum += calculateExpiryUrgencyScore(daysUntilExpiry);

            if (daysUntilExpiry <= 3) urgentIngredients.push(primaryItem.name);
            if (daysUntilExpiry <= minPantryDays) usesCriticalItem = true;

          } else if (spoiledItems.length > 0) {
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

      // Record match results
      if (matchStatus === 'sufficient' || matchStatus === 'insufficient') {
        matchedIngredients.push({ ...matchData!, isSufficient: matchStatus === 'sufficient' });
      } else if (matchStatus === 'expired') {
        expiredIngredients.push({ ...matchData! });
      } else {
        // Only mark missing if we haven't already matched it via synonym
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

    // Calculate final scores
    const totalIngredientsForMatch = recipe.ingredients.filter(n => !n.toLowerCase().includes('salt')).length;
    const sufficientMatchedCount = matchedIngredients.filter(m => m.isSufficient).length;
    
    const usageRatio = totalIngredientsForMatch > 0 ? sufficientMatchedCount / totalIngredientsForMatch : 0;
    const expiryUrgency = sufficientMatchedCount > 0 ? expiryUrgencySum / (sufficientMatchedCount * 100) : 0;

    const missingCount = missingIngredientsList.length + expiredIngredients.length;
    const missingItemsPenalty = totalIngredientsForMatch > 0 ? missingCount / totalIngredientsForMatch : 1;

    let score = 
      (weights.usage * usageRatio * 100) +
      (weights.expiry * expiryUrgency * 100) -
      (weights.missing * missingItemsPenalty * 100);

    if (usesCriticalItem) score += 20;

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
      wasteSaved: urgentIngredients.length
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
  // Filter out recipes where we don't have *any* sufficient ingredients
  const validScores = allScores.filter(score => score.matchedIngredients.some(m => m.isSufficient));
  return validScores.slice(0, topN);
}

export function getPantryStats(pantryItems: PantryItem[]): PantryStats {
  let expiringSoon = 0; 
  let expiringThisWeek = 0; 
  let expiredItems = 0;
  let freshItems = 0;
  let mostUrgentItem: PantryItem | null = null;
  let minDays = Infinity;
  
  for (const item of pantryItems) {
    const days = getDaysUntilExpiry(item.expiryDate);
    
    if (days < 0) {
      expiredItems++;
    } else {
      if (days <= 3) expiringSoon++;
      if (days <= 7) expiringThisWeek++;
      if (days > 7) freshItems++;

      if (days < minDays) {
        minDays = days;
        mostUrgentItem = item;
      }
    }
  }

  const healthScore = pantryItems.length > 0
    ? Math.max(0, 100 - ((expiredItems / pantryItems.length) * 200) - ((expiringSoon / pantryItems.length) * 50))
    : 100;

  return {
    totalItems: pantryItems.length,
    freshItems,
    expiringSoon,
    expiringThisWeek,
    expiredItems,
    mostUrgentItem,
    pantryHealthScore: Math.round(healthScore)
  };
}