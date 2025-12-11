// Recommendation Engine - The "Brain" of the Application
// Implements the scoring algorithm: S = (W1 * U) + (W2 * E) - (W3 * M)

import { Recipe, PantryItem } from './database';

export interface RecipeScore {
  recipe: Recipe;
  score: number;
  usageRatio: number;
  expiryUrgency: number;
  missingItems: number;
  matchedIngredients: string[];
  missingIngredientsList: string[];
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

// Calculate days until expiry
function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate expiry urgency score for a single item
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
  weights = { usage: 0.3, expiry: 0.5, missing: 0.2 } // W1, W2, W3
): RecipeScore[] {
  const scores: RecipeScore[] = [];

  for (const recipe of recipes) {
    const matchedIngredients: string[] = [];
    const missingIngredientsList: string[] = [];
    const urgentIngredients: string[] = [];
    let expiryUrgencySum = 0;

    // Check each recipe ingredient against pantry
    for (const recipeIngredient of recipe.ingredients) {
      let found = false;

      for (const pantryItem of pantryItems) {
        if (ingredientsMatch(recipeIngredient, pantryItem.name)) {
          matchedIngredients.push(recipeIngredient);
          
          // Calculate urgency for this ingredient
          const daysUntilExpiry = getDaysUntilExpiry(pantryItem.expiryDate);
          const urgencyScore = calculateExpiryUrgencyScore(daysUntilExpiry);
          expiryUrgencySum += urgencyScore;

          // Track urgent ingredients (expiring within 3 days)
          if (daysUntilExpiry <= 3) {
            urgentIngredients.push(pantryItem.name);
          }

          found = true;
          break;
        }
      }

      if (!found) {
        missingIngredientsList.push(recipeIngredient);
      }
    }

    // Calculate metrics
    const totalIngredients = recipe.ingredients.length;
    const matchedCount = matchedIngredients.length;
    const missingCount = missingIngredientsList.length;

    // U: Usage Ratio (0 to 1)
    const usageRatio = totalIngredients > 0 ? matchedCount / totalIngredients : 0;

    // E: Expiry Urgency (normalized to 0-1 scale)
    // Average urgency score across matched ingredients
    const expiryUrgency = matchedCount > 0 ? expiryUrgencySum / (matchedCount * 100) : 0;

    // M: Missing Items Penalty (0 to 1)
    const missingItemsPenalty = totalIngredients > 0 ? missingCount / totalIngredients : 1;

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

// Get top N recommendations
export function getTopRecommendations(
  recipes: Recipe[],
  pantryItems: PantryItem[],
  topN: number = 5
): RecipeScore[] {
  const allScores = calculateRecipeScores(recipes, pantryItems);
  
  // Filter out recipes with 0 matched ingredients
  const validScores = allScores.filter(score => score.matchedIngredients.length > 0);
  
  return validScores.slice(0, topN);
}

// Get statistics about pantry
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
