// Database Layer - Simulates SQLAlchemy with TypeScript
// This acts as our SQLite/MySQL database

export interface Recipe {
  id: number;
  title: string;
  ingredients: string[]; // Normalized ingredient names
  rawIngredients: string[]; // Original with quantities
  instructions: string;
  image_url: string;
  cuisine: string;
  cookTime: number; // in minutes
}

export interface PantryItem {
  id: number;
  name: string; // Normalized name (lowercase, singular)
  quantity: string;
  expiryDate: Date;
  addedDate: Date;
}

// In-memory database simulation
class Database {
  private recipes: Recipe[] = [];
  private pantryItems: PantryItem[] = [];
  private recipeIdCounter = 1;
  private pantryIdCounter = 1;

  constructor() {
    this.loadFromStorage();
  }

  // Recipe Operations
  addRecipe(recipe: Omit<Recipe, 'id'>): Recipe {
    const newRecipe = { ...recipe, id: this.recipeIdCounter++ };
    this.recipes.push(newRecipe);
    this.saveToStorage();
    return newRecipe;
  }

  getAllRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  // Pantry Operations
  addPantryItem(item: Omit<PantryItem, 'id' | 'addedDate'>): PantryItem {
    const newItem = {
      ...item,
      id: this.pantryIdCounter++,
      addedDate: new Date()
    };
    this.pantryItems.push(newItem);
    this.saveToStorage();
    return newItem;
  }

  getAllPantryItems(): PantryItem[] {
    return [...this.pantryItems];
  }

  deletePantryItem(id: number): boolean {
    const index = this.pantryItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.pantryItems.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  updatePantryItem(id: number, updates: Partial<PantryItem>): PantryItem | undefined {
    const item = this.pantryItems.find(item => item.id === id);
    if (item) {
      Object.assign(item, updates);
      this.saveToStorage();
      return item;
    }
    return undefined;
  }

  clearPantry(): void {
    this.pantryItems = [];
    this.saveToStorage();
  }

  // Seed initial recipes
  seedRecipes(recipes: Omit<Recipe, 'id'>[]): void {
    this.recipes = [];
    this.recipeIdCounter = 1;
    recipes.forEach(recipe => this.addRecipe(recipe));
  }

  // Persistence
  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pantry_chef_recipes', JSON.stringify(this.recipes));
      localStorage.setItem('pantry_chef_pantry', JSON.stringify(this.pantryItems));
      localStorage.setItem('pantry_chef_counters', JSON.stringify({
        recipeId: this.recipeIdCounter,
        pantryId: this.pantryIdCounter
      }));
    }
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      const recipesData = localStorage.getItem('pantry_chef_recipes');
      const pantryData = localStorage.getItem('pantry_chef_pantry');
      const countersData = localStorage.getItem('pantry_chef_counters');

      if (recipesData) {
        this.recipes = JSON.parse(recipesData);
      }

      if (pantryData) {
        this.pantryItems = JSON.parse(pantryData).map((item: any) => ({
          ...item,
          expiryDate: new Date(item.expiryDate),
          addedDate: new Date(item.addedDate)
        }));
      }

      if (countersData) {
        const counters = JSON.parse(countersData);
        this.recipeIdCounter = counters.recipeId;
        this.pantryIdCounter = counters.pantryId;
      }
    }
  }
}

// Singleton instance
export const db = new Database();
