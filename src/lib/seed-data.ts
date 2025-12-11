// Seed Data - 20+ Diverse Recipes
// This populates our database with realistic recipes

import { Recipe } from './database';

export const SEED_RECIPES: Omit<Recipe, 'id'>[] = [
  {
    title: "Classic Scrambled Eggs",
    rawIngredients: ["3 eggs", "2 tbsp milk", "1 tbsp butter", "salt", "pepper"],
    ingredients: ["egg", "milk", "butter", "salt", "pepper"],
    instructions: "Beat eggs with milk. Melt butter in pan over medium heat. Add eggs and gently stir until soft curds form. Season with salt and pepper.",
    image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Caprese Salad",
    rawIngredients: ["2 large tomatoes", "8 oz mozzarella", "fresh basil", "2 tbsp olive oil", "balsamic vinegar"],
    ingredients: ["tomato", "mozzarella", "basil", "olive oil", "vinegar"],
    instructions: "Slice tomatoes and mozzarella. Arrange alternating slices on a plate. Top with fresh basil leaves. Drizzle with olive oil and balsamic vinegar.",
    image_url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800",
    cuisine: "Italian",
    cookTime: 5
  },
  {
    title: "Spaghetti Aglio e Olio",
    rawIngredients: ["400g spaghetti", "6 cloves garlic", "1/2 cup olive oil", "red pepper flakes", "parsley", "parmesan"],
    ingredients: ["spaghetti", "garlic", "olive oil", "pepper", "parsley", "parmesan"],
    instructions: "Cook spaghetti. In a pan, heat olive oil and sauté sliced garlic until golden. Add red pepper flakes. Toss cooked pasta in the garlic oil. Garnish with parsley and parmesan.",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Chicken Stir Fry",
    rawIngredients: ["500g chicken breast", "2 bell peppers", "1 onion", "3 cloves garlic", "soy sauce", "ginger", "vegetable oil"],
    ingredients: ["chicken", "bell pepper", "onion", "garlic", "soy sauce", "ginger", "oil"],
    instructions: "Cut chicken into strips. Heat oil in wok. Cook chicken until done, remove. Stir fry vegetables with garlic and ginger. Add chicken back, pour soy sauce, toss together.",
    image_url: "https://images.unsplash.com/photo-1603073091291-de2cc6e7c488?w=800",
    cuisine: "Asian",
    cookTime: 25
  },
  {
    title: "Greek Salad",
    rawIngredients: ["3 tomatoes", "1 cucumber", "1 red onion", "200g feta cheese", "kalamata olives", "olive oil", "lemon juice"],
    ingredients: ["tomato", "cucumber", "onion", "feta", "olive", "olive oil", "lemon"],
    instructions: "Chop tomatoes, cucumber, and onion. Combine in bowl. Add olives and crumbled feta. Dress with olive oil and lemon juice. Toss gently.",
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    cuisine: "Greek",
    cookTime: 10
  },
  {
    title: "Mushroom Risotto",
    rawIngredients: ["300g arborio rice", "500g mushrooms", "1 onion", "1 cup white wine", "1L vegetable broth", "parmesan", "butter"],
    ingredients: ["rice", "mushroom", "onion", "wine", "broth", "parmesan", "butter"],
    instructions: "Sauté onions in butter. Add rice, toast briefly. Add wine, let absorb. Gradually add hot broth, stirring constantly. Add sautéed mushrooms. Finish with parmesan and butter.",
    image_url: "https://images.unsplash.com/photo-1476124369491-4ea26a4b8f5b?w=800",
    cuisine: "Italian",
    cookTime: 35
  },
  {
    title: "Avocado Toast",
    rawIngredients: ["2 slices bread", "1 avocado", "1 egg", "cherry tomatoes", "salt", "pepper", "chili flakes"],
    ingredients: ["bread", "avocado", "egg", "tomato", "salt", "pepper", "chili"],
    instructions: "Toast bread. Mash avocado with salt and pepper. Spread on toast. Top with fried egg and halved cherry tomatoes. Sprinkle chili flakes.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    cuisine: "Modern",
    cookTime: 10
  },
  {
    title: "Beef Tacos",
    rawIngredients: ["500g ground beef", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "taco seasoning"],
    ingredients: ["beef", "taco shell", "lettuce", "tomato", "cheese", "sour cream", "seasoning"],
    instructions: "Brown ground beef with taco seasoning. Warm taco shells. Fill shells with beef, shredded lettuce, diced tomatoes, cheese, and sour cream.",
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    cuisine: "Mexican",
    cookTime: 20
  },
  {
    title: "Vegetable Curry",
    rawIngredients: ["2 potatoes", "1 cauliflower", "2 carrots", "1 can coconut milk", "curry paste", "onion", "garlic", "ginger"],
    ingredients: ["potato", "cauliflower", "carrot", "coconut milk", "curry paste", "onion", "garlic", "ginger"],
    instructions: "Sauté onion, garlic, ginger. Add curry paste. Add chopped vegetables and coconut milk. Simmer until vegetables are tender. Serve with rice.",
    image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    cuisine: "Indian",
    cookTime: 30
  },
  {
    title: "Caesar Salad",
    rawIngredients: ["1 romaine lettuce", "croutons", "parmesan", "caesar dressing", "lemon", "anchovies"],
    ingredients: ["lettuce", "crouton", "parmesan", "dressing", "lemon", "anchovy"],
    instructions: "Chop romaine lettuce. Toss with Caesar dressing. Add croutons and shaved parmesan. Squeeze fresh lemon juice. Top with anchovies if desired.",
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    cuisine: "American",
    cookTime: 8
  },
  {
    title: "Pancakes",
    rawIngredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tbsp sugar", "2 tsp baking powder", "butter", "maple syrup"],
    ingredients: ["flour", "egg", "milk", "sugar", "baking powder", "butter", "syrup"],
    instructions: "Mix dry ingredients. Whisk eggs and milk, combine with dry mixture. Heat butter in pan. Pour batter, cook until bubbles form, flip. Serve with maple syrup.",
    image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    cuisine: "American",
    cookTime: 15
  },
  {
    title: "Tomato Basil Soup",
    rawIngredients: ["1kg tomatoes", "1 onion", "4 cloves garlic", "fresh basil", "2 cups vegetable broth", "cream", "olive oil"],
    ingredients: ["tomato", "onion", "garlic", "basil", "broth", "cream", "olive oil"],
    instructions: "Sauté onion and garlic in olive oil. Add chopped tomatoes and broth. Simmer 20 minutes. Blend until smooth. Stir in cream and fresh basil.",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Chicken Caesar Wrap",
    rawIngredients: ["2 chicken breasts", "4 tortillas", "romaine lettuce", "parmesan", "caesar dressing", "tomato"],
    ingredients: ["chicken", "tortilla", "lettuce", "parmesan", "dressing", "tomato"],
    instructions: "Grill seasoned chicken, slice. Lay tortilla, add lettuce, chicken, parmesan, diced tomato, and Caesar dressing. Roll tightly and cut in half.",
    image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Fried Rice",
    rawIngredients: ["3 cups cooked rice", "2 eggs", "1 cup mixed vegetables", "3 tbsp soy sauce", "2 cloves garlic", "green onion", "sesame oil"],
    ingredients: ["rice", "egg", "vegetable", "soy sauce", "garlic", "onion", "sesame oil"],
    instructions: "Heat oil in wok. Scramble eggs, remove. Stir fry garlic and vegetables. Add rice, break up clumps. Add soy sauce and sesame oil. Mix in eggs and green onions.",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Margherita Pizza",
    rawIngredients: ["pizza dough", "tomato sauce", "fresh mozzarella", "fresh basil", "olive oil", "salt"],
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil", "salt"],
    instructions: "Roll out pizza dough. Spread tomato sauce. Add sliced mozzarella. Bake at 450°F for 12-15 min. Top with fresh basil and drizzle olive oil.",
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Spinach Omelette",
    rawIngredients: ["3 eggs", "1 cup spinach", "1/4 cup cheese", "1 tbsp butter", "salt", "pepper"],
    ingredients: ["egg", "spinach", "cheese", "butter", "salt", "pepper"],
    instructions: "Beat eggs with salt and pepper. Melt butter in pan. Pour eggs, let set slightly. Add spinach and cheese to one half. Fold omelette and cook until done.",
    image_url: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800",
    cuisine: "French",
    cookTime: 10
  },
  {
    title: "Pesto Pasta",
    rawIngredients: ["400g pasta", "1 cup basil pesto", "cherry tomatoes", "parmesan", "pine nuts", "olive oil"],
    ingredients: ["pasta", "pesto", "tomato", "parmesan", "pine nut", "olive oil"],
    instructions: "Cook pasta according to package. Drain, reserving pasta water. Toss pasta with pesto, add pasta water to thin. Top with halved cherry tomatoes, parmesan, and toasted pine nuts.",
    image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    cuisine: "Italian",
    cookTime: 15
  },
  {
    title: "Grilled Cheese Sandwich",
    rawIngredients: ["4 slices bread", "4 slices cheese", "2 tbsp butter", "tomato"],
    ingredients: ["bread", "cheese", "butter", "tomato"],
    instructions: "Butter one side of each bread slice. Place cheese and tomato slices between bread, buttered sides out. Grill in pan over medium heat until golden and cheese melts.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Lentil Soup",
    rawIngredients: ["1.5 cups lentils", "2 carrots", "2 celery stalks", "1 onion", "3 cloves garlic", "6 cups vegetable broth", "cumin", "olive oil"],
    ingredients: ["lentil", "carrot", "celery", "onion", "garlic", "broth", "cumin", "olive oil"],
    instructions: "Sauté onion, carrots, celery, and garlic in olive oil. Add lentils, broth, and cumin. Simmer 30-35 minutes until lentils are tender. Season to taste.",
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    cuisine: "Middle Eastern",
    cookTime: 40
  },
  {
    title: "Salmon with Vegetables",
    rawIngredients: ["2 salmon fillets", "2 cups broccoli", "1 lemon", "2 cloves garlic", "olive oil", "salt", "pepper"],
    ingredients: ["salmon", "broccoli", "lemon", "garlic", "olive oil", "salt", "pepper"],
    instructions: "Season salmon with salt, pepper, and lemon juice. Bake at 400°F for 12-15 min. Steam or roast broccoli with garlic and olive oil. Serve together.",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    cuisine: "Healthy",
    cookTime: 20
  },
  {
    title: "French Toast",
    rawIngredients: ["4 slices bread", "2 eggs", "1/2 cup milk", "1 tsp cinnamon", "1 tsp vanilla", "butter", "maple syrup"],
    ingredients: ["bread", "egg", "milk", "cinnamon", "vanilla", "butter", "syrup"],
    instructions: "Whisk eggs, milk, cinnamon, and vanilla. Dip bread slices in mixture. Cook in buttered pan until golden on both sides. Serve with maple syrup.",
    image_url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
    cuisine: "American",
    cookTime: 15
  },
  {
    title: "Quinoa Buddha Bowl",
    rawIngredients: ["1 cup quinoa", "1 avocado", "chickpeas", "kale", "sweet potato", "tahini", "lemon"],
    ingredients: ["quinoa", "avocado", "chickpea", "kale", "sweet potato", "tahini", "lemon"],
    instructions: "Cook quinoa. Roast chickpeas and sweet potato cubes. Massage kale with lemon. Arrange quinoa, vegetables, and avocado in bowl. Drizzle tahini dressing.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    cuisine: "Healthy",
    cookTime: 30
  },
  {
    title: "Beef Stew",
    rawIngredients: ["500g beef chuck", "3 potatoes", "3 carrots", "1 onion", "2 cups beef broth", "tomato paste", "thyme"],
    ingredients: ["beef", "potato", "carrot", "onion", "broth", "tomato paste", "thyme"],
    instructions: "Brown beef chunks. Remove and sauté onions. Return beef, add vegetables, broth, tomato paste, and thyme. Simmer 1.5-2 hours until tender.",
    image_url: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800",
    cuisine: "American",
    cookTime: 120
  },
  {
    title: "Shrimp Scampi",
    rawIngredients: ["500g shrimp", "4 cloves garlic", "1/2 cup white wine", "lemon", "parsley", "butter", "pasta"],
    ingredients: ["shrimp", "garlic", "wine", "lemon", "parsley", "butter", "pasta"],
    instructions: "Cook pasta. Sauté garlic in butter. Add shrimp, cook until pink. Add white wine and lemon juice. Toss with pasta and fresh parsley.",
    image_url: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Veggie Burger",
    rawIngredients: ["black beans", "1 carrot", "bread crumbs", "1 egg", "cumin", "burger buns", "lettuce", "tomato"],
    ingredients: ["black bean", "carrot", "bread crumb", "egg", "cumin", "bun", "lettuce", "tomato"],
    instructions: "Mash black beans. Mix with grated carrot, bread crumbs, egg, and cumin. Form patties. Pan fry until crispy. Serve on buns with lettuce and tomato.",
    image_url: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800",
    cuisine: "American",
    cookTime: 25
  }
];
