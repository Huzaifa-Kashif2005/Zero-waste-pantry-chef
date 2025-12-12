// Seed Data - 100+ Diverse Recipes
// This populates our database with realistic recipes

import { Recipe } from './database';

export const SEED_RECIPES: Omit<Recipe, 'id'>[] = [
  // --- Original 25 Recipes ---
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
  },
  // --- Additional 80 Recipes Restored ---
  {
    title: "Hummus and Veggie Wrap",
    rawIngredients: ["2 whole wheat tortillas", "1/4 cup hummus", "1/2 cucumber, sliced", "1 carrot, shredded", "1 cup spinach"],
    ingredients: ["tortilla", "hummus", "cucumber", "carrot", "spinach"],
    instructions: "Spread hummus on tortillas. Layer with cucumber, carrot, and spinach. Roll up tightly and slice in half.",
    image_url: "https://images.unsplash.com/photo-1549880196-036136be44d1?w=800",
    cuisine: "Mediterranean",
    cookTime: 5
  },
  {
    title: "Black Bean Soup",
    rawIngredients: ["1 can black beans", "1 onion", "2 cloves garlic", "4 cups chicken broth", "1 tsp cumin", "lime"],
    ingredients: ["black bean", "onion", "garlic", "broth", "cumin", "lime"],
    instructions: "Sauté onion and garlic. Add beans, broth, and cumin. Simmer for 15 minutes. Mash some beans to thicken. Serve with a squeeze of lime.",
    image_url: "https://images.unsplash.com/photo-1588166524941-6902269c84e1?w=800",
    cuisine: "Mexican",
    cookTime: 20
  },
  {
    title: "Tuna Melt Sandwich",
    rawIngredients: ["2 slices bread", "1 can tuna", "2 tbsp mayonnaise", "1 slice cheddar cheese", "butter"],
    ingredients: ["bread", "tuna", "mayonnaise", "cheddar", "butter"],
    instructions: "Mix tuna with mayonnaise. Layer on bread, top with cheese. Butter outside. Grill until cheese is melted and bread is golden.",
    image_url: "https://images.unsplash.com/photo-1545894179-873099905273?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Easy Tomato Pasta",
    rawIngredients: ["300g pasta", "1 can crushed tomatoes", "2 cloves garlic", "1/4 cup olive oil", "basil", "parmesan"],
    ingredients: ["pasta", "tomato", "garlic", "olive oil", "basil", "parmesan"],
    instructions: "Cook pasta. Sauté garlic in oil. Add crushed tomatoes, simmer. Toss with pasta, top with basil and parmesan.",
    image_url: "https://images.unsplash.com/photo-1594924610444-2458428236d3?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Chicken Noodle Soup",
    rawIngredients: ["2 cups chicken broth", "1/2 cup cooked chicken", "1/2 cup egg noodles", "1 carrot", "1 celery stalk"],
    ingredients: ["broth", "chicken", "noodle", "carrot", "celery"],
    instructions: "Combine all ingredients in a pot. Simmer until vegetables are tender and noodles are cooked through.",
    image_url: "https://images.unsplash.com/photo-1627964417066-646f2509b552?w=800",
    cuisine: "American",
    cookTime: 25
  },
  {
    title: "Garlic Breadsticks",
    rawIngredients: ["1 loaf french bread", "1/4 cup butter", "2 cloves garlic", "1 tsp dried parsley", "parmesan"],
    ingredients: ["bread", "butter", "garlic", "parsley", "parmesan"],
    instructions: "Slice bread. Mix soft butter, minced garlic, and parsley. Spread on bread. Bake until golden. Sprinkle with parmesan.",
    image_url: "https://images.unsplash.com/photo-1563242693-b67f4c549646?w=800",
    cuisine: "Italian",
    cookTime: 15
  },
  {
    title: "Potato and Egg Hash",
    rawIngredients: ["2 potatoes, diced", "2 eggs", "1/2 onion, chopped", "vegetable oil", "salt", "pepper"],
    ingredients: ["potato", "egg", "onion", "oil", "salt", "pepper"],
    instructions: "Fry potatoes until soft. Add onion, cook. Make wells, crack eggs, cover and cook until eggs are set.",
    image_url: "https://images.unsplash.com/photo-1562967911-3965d836336e?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Simple Coleslaw",
    rawIngredients: ["1/2 head cabbage, shredded", "1 carrot, shredded", "1/4 cup mayonnaise", "1 tbsp vinegar", "sugar", "salt"],
    ingredients: ["cabbage", "carrot", "mayonnaise", "vinegar", "sugar", "salt"],
    instructions: "Whisk mayonnaise, vinegar, sugar, and salt. Toss dressing with shredded cabbage and carrot. Chill before serving.",
    image_url: "https://images.unsplash.com/photo-1594520937666-c95861b5f63d?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Tofu Scramble",
    rawIngredients: ["1 block firm tofu", "1/2 onion", "1 bell pepper", "turmeric", "nutritional yeast", "olive oil"],
    ingredients: ["tofu", "onion", "bell pepper", "turmeric", "yeast", "olive oil"],
    instructions: "Crumble tofu. Sauté onion and pepper. Add tofu, turmeric for color, and nutritional yeast for flavor. Scramble until heated through.",
    image_url: "https://images.unsplash.com/photo-1511232822971-4a4b10b0b5d9?w=800",
    cuisine: "Vegan",
    cookTime: 15
  },
  {
    title: "Quesadilla",
    rawIngredients: ["2 tortillas", "1 cup shredded cheese", "1/4 cup diced chicken", "butter"],
    ingredients: ["tortilla", "cheese", "chicken", "butter"],
    instructions: "Butter one side of tortilla. Place butter-side down in pan. Layer cheese and chicken. Top with second tortilla. Flip and cook until golden.",
    image_url: "https://images.unsplash.com/photo-1565299624942-4386810c71a0?w=800",
    cuisine: "Mexican",
    cookTime: 10
  },
  {
    title: "Pasta Carbonara (Simplified)",
    rawIngredients: ["300g spaghetti", "2 egg yolks", "1/2 cup parmesan cheese", "bacon or ham", "black pepper"],
    ingredients: ["spaghetti", "egg", "parmesan", "bacon", "pepper"],
    instructions: "Cook spaghetti. Fry bacon until crispy. Mix egg yolks and parmesan. Toss pasta, bacon, and egg mixture quickly off heat.",
    image_url: "https://images.unsplash.com/photo-1616712135047-b903080ff0b5?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Tuna Pasta Salad",
    rawIngredients: ["300g shell pasta", "1 can tuna", "1/4 cup mayonnaise", "1 celery stalk", "1/4 cup peas", "salt", "pepper"],
    ingredients: ["pasta", "tuna", "mayonnaise", "celery", "pea", "salt", "pepper"],
    instructions: "Cook and cool pasta. Mix tuna, mayo, diced celery, and peas. Combine with pasta and season.",
    image_url: "https://images.unsplash.com/photo-1579621970563-ed1bebb68aa9?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Potato Leek Soup",
    rawIngredients: ["3 large potatoes", "2 leeks", "4 cups vegetable broth", "1/2 cup cream", "butter", "salt", "pepper"],
    ingredients: ["potato", "leek", "broth", "cream", "butter", "salt", "pepper"],
    instructions: "Sauté leeks in butter. Add diced potatoes and broth. Simmer until potatoes are tender. Blend until creamy. Stir in cream.",
    image_url: "https://images.unsplash.com/photo-1563721382346-601934c9c2a6?w=800",
    cuisine: "French",
    cookTime: 35
  },
  {
    title: "Chicken and Rice Skillet",
    rawIngredients: ["2 chicken breasts", "1 cup rice", "2 cups chicken broth", "1 onion", "garlic powder", "vegetable oil"],
    ingredients: ["chicken", "rice", "broth", "onion", "garlic powder", "oil"],
    instructions: "Brown chicken in oil, remove. Sauté onion. Add rice and broth. Place chicken back on top. Cover and simmer until rice is cooked.",
    image_url: "https://images.unsplash.com/photo-1620963339176-7eddd8b292e3?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Cucumber Yogurt Dip (Tzatziki)",
    rawIngredients: ["1 cup greek yogurt", "1 cucumber, grated", "2 cloves garlic", "1 tbsp olive oil", "lemon juice", "salt"],
    ingredients: ["yogurt", "cucumber", "garlic", "olive oil", "lemon", "salt"],
    instructions: "Squeeze excess water from grated cucumber. Mix with yogurt, minced garlic, olive oil, lemon juice, and salt. Chill well.",
    image_url: "https://images.unsplash.com/photo-1589302168051-1f9e2d3122c5?w=800",
    cuisine: "Greek",
    cookTime: 10
  },
  {
    title: "Baked Potato with Sour Cream",
    rawIngredients: ["2 large potatoes", "butter", "sour cream", "chives", "salt", "pepper"],
    ingredients: ["potato", "butter", "sour cream", "chive", "salt", "pepper"],
    instructions: "Bake potatoes until soft. Cut open, fluff flesh. Top with butter, sour cream, chives, salt, and pepper.",
    image_url: "https://images.unsplash.com/photo-1567117565369-ac96df3f48a1?w=800",
    cuisine: "American",
    cookTime: 60
  },
  {
    title: "Chicken Salad Sandwich",
    rawIngredients: ["2 slices bread", "1/2 cup cooked chicken", "2 tbsp mayonnaise", "1 celery stalk", "mustard", "salt", "pepper"],
    ingredients: ["bread", "chicken", "mayonnaise", "celery", "mustard", "salt", "pepper"],
    instructions: "Shred chicken. Mix with mayo, diced celery, mustard, salt, and pepper. Spread on bread.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Hot Chocolate",
    rawIngredients: ["1 cup milk", "2 tbsp cocoa powder", "2 tbsp sugar", "pinch of salt", "vanilla extract"],
    ingredients: ["milk", "cocoa powder", "sugar", "salt", "vanilla"],
    instructions: "Heat milk in a saucepan. Whisk in cocoa powder, sugar, and salt until dissolved. Stir in vanilla. Serve hot.",
    image_url: "https://images.unsplash.com/photo-1542385437-02434855928a?w=800",
    cuisine: "Beverage",
    cookTime: 5
  },
  {
    title: "Vegetable Omelette",
    rawIngredients: ["3 eggs", "1/4 cup milk", "1/4 cup diced onion", "1/4 cup diced bell pepper", "cheese", "butter"],
    ingredients: ["egg", "milk", "onion", "bell pepper", "cheese", "butter"],
    instructions: "Beat eggs and milk. Sauté onion and pepper. Pour eggs over vegetables. Cook until set. Add cheese and fold.",
    image_url: "https://images.unsplash.com/photo-1590747087679-d125439446d3?w=800",
    cuisine: "French",
    cookTime: 15
  },
  {
    title: "Peanut Butter Noodles",
    rawIngredients: ["200g spaghetti", "1/4 cup peanut butter", "2 tbsp soy sauce", "1 tbsp honey", "ginger"],
    ingredients: ["spaghetti", "peanut butter", "soy sauce", "honey", "ginger"],
    instructions: "Cook spaghetti. Whisk peanut butter, soy sauce, honey, and minced ginger for sauce. Toss warm pasta with sauce.",
    image_url: "https://images.unsplash.com/photo-1555913220-4328d5d4d3c3?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Black Bean Chili (Quick)",
    rawIngredients: ["1 can black beans", "1 can diced tomatoes", "1/2 onion", "chili powder", "cumin", "vegetable broth"],
    ingredients: ["black bean", "tomato", "onion", "chili powder", "cumin", "broth"],
    instructions: "Sauté onion. Add beans, tomatoes, broth, and seasonings. Simmer 15 minutes. Serve with cheese or sour cream.",
    image_url: "https://images.unsplash.com/photo-1551062635-c35d9471168f?w=800",
    cuisine: "Mexican",
    cookTime: 25
  },
  {
    title: "Cinnamon Sugar Toast",
    rawIngredients: ["2 slices bread", "2 tbsp butter", "1 tbsp sugar", "1 tsp cinnamon"],
    ingredients: ["bread", "butter", "sugar", "cinnamon"],
    instructions: "Toast bread. Mix sugar and cinnamon. Spread butter on toast, sprinkle with cinnamon sugar.",
    image_url: "https://images.unsplash.com/photo-1518012643806-258385a69146?w=800",
    cuisine: "Dessert",
    cookTime: 5
  },
  {
    title: "Garlic Butter Shrimp",
    rawIngredients: ["500g shrimp", "4 tbsp butter", "4 cloves garlic", "lemon juice", "parsley"],
    ingredients: ["shrimp", "butter", "garlic", "lemon", "parsley"],
    instructions: "Melt butter, sauté garlic. Add shrimp, cook until pink. Finish with lemon juice and parsley.",
    image_url: "https://images.unsplash.com/photo-1512132412856-02e071e72151?w=800",
    cuisine: "Seafood",
    cookTime: 15
  },
  {
    title: "Oatmeal with Berries",
    rawIngredients: ["1/2 cup rolled oats", "1 cup milk or water", "sugar or honey", "1/2 cup mixed berries"],
    ingredients: ["oat", "milk", "sugar", "berry"],
    instructions: "Cook oats with milk/water until creamy. Stir in sweetener. Top with fresh or frozen berries.",
    image_url: "https://images.unsplash.com/photo-1588661771147-380d368e7d8c?w=800",
    cuisine: "Breakfast",
    cookTime: 10
  },
  {
    title: "Simple Tomato Sauce",
    rawIngredients: ["1 large can crushed tomatoes", "1 onion", "2 cloves garlic", "olive oil", "oregano", "salt", "pepper"],
    ingredients: ["tomato", "onion", "garlic", "olive oil", "oregano", "salt", "pepper"],
    instructions: "Sauté diced onion and garlic in oil. Add crushed tomatoes and seasonings. Simmer for 30 minutes.",
    image_url: "https://images.unsplash.com/photo-1551062635-c35d9471168f?w=800",
    cuisine: "Italian",
    cookTime: 40
  },
  {
    title: "Tofu Banh Mi Sandwich",
    rawIngredients: ["1 french baguette", "tofu, sliced", "mayonnaise", "siracha", "carrot, pickled", "cilantro"],
    ingredients: ["bread", "tofu", "mayonnaise", "siracha", "carrot", "cilantro"],
    instructions: "Slice baguette, spread mayo/siracha mix. Layer fried tofu slices, pickled carrot, and fresh cilantro.",
    image_url: "https://images.unsplash.com/photo-1583337920406-932d2c184013?w=800",
    cuisine: "Vietnamese",
    cookTime: 20
  },
  {
    title: "Minestrone Soup",
    rawIngredients: ["1 can diced tomatoes", "1 can kidney beans", "1/2 cup pasta", "2 carrots", "2 celery stalks", "vegetable broth"],
    ingredients: ["tomato", "kidney bean", "pasta", "carrot", "celery", "broth"],
    instructions: "Sauté carrots and celery. Add tomatoes, beans, and broth. Bring to boil, add pasta. Simmer until pasta is tender.",
    image_url: "https://images.unsplash.com/photo-1549880196-036136be44d1?w=800",
    cuisine: "Italian",
    cookTime: 30
  },
  {
    title: "Chipotle Chicken Bowl",
    rawIngredients: ["1 cup rice", "cooked chicken", "black beans", "corn", "salsa", "sour cream", "cheese"],
    ingredients: ["rice", "chicken", "black bean", "corn", "salsa", "sour cream", "cheese"],
    instructions: "Cook rice. Assemble bowl with rice, black beans, corn, chopped chicken, salsa, sour cream, and cheese.",
    image_url: "https://images.unsplash.com/photo-1502302305374-68a44b8b60b8?w=800",
    cuisine: "Mexican",
    cookTime: 25
  },
  {
    title: "Sausage and Pepper Pasta",
    rawIngredients: ["300g pasta", "2 sausages", "2 bell peppers", "1 onion", "tomato sauce", "garlic"],
    ingredients: ["pasta", "sausage", "bell pepper", "onion", "tomato sauce", "garlic"],
    instructions: "Cook pasta. Fry sausage. Sauté peppers, onion, and garlic. Mix all together with tomato sauce.",
    image_url: "https://images.unsplash.com/photo-1563379926-ae8346101f30?w=800",
    cuisine: "Italian",
    cookTime: 25
  },
  {
    title: "Waffles with Syrup",
    rawIngredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tbsp sugar", "2 tsp baking powder", "butter", "maple syrup"],
    ingredients: ["flour", "egg", "milk", "sugar", "baking powder", "butter", "syrup"],
    instructions: "Mix batter. Cook in waffle iron until golden brown. Serve with butter and maple syrup.",
    image_url: "https://images.unsplash.com/photo-1567117565369-ac96df3f48a1?w=800",
    cuisine: "Breakfast",
    cookTime: 15
  },
  {
    title: "Classic Beef Burger",
    rawIngredients: ["500g ground beef", "2 burger buns", "lettuce", "tomato", "onion", "cheese slice", "mayonnaise"],
    ingredients: ["beef", "bun", "lettuce", "tomato", "onion", "cheese", "mayonnaise"],
    instructions: "Form beef into patties and grill. Toast buns. Assemble burger with cheese, toppings, and mayo.",
    image_url: "https://images.unsplash.com/photo-1565299624942-4386810c71a0?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Spicy Peanut Sauce Stir Fry",
    rawIngredients: ["300g chicken", "1 cup broccoli", "1 bell pepper", "peanut butter", "soy sauce", "ginger", "garlic"],
    ingredients: ["chicken", "broccoli", "bell pepper", "peanut butter", "soy sauce", "ginger", "garlic"],
    instructions: "Stir fry chicken. Add vegetables. Whisk peanut butter, soy sauce, and seasonings for sauce. Toss all together.",
    image_url: "https://images.unsplash.com/photo-1603073091291-de2cc6e7c488?w=800",
    cuisine: "Asian",
    cookTime: 25
  },
  {
    title: "Ham and Cheese Crêpes",
    rawIngredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "ham slices", "cheddar cheese"],
    ingredients: ["flour", "egg", "milk", "ham", "cheddar"],
    instructions: "Mix thin crêpe batter. Cook crêpes. Fill with ham and cheese. Fold and serve warm.",
    image_url: "https://images.unsplash.com/photo-1551062635-c35d9471168f?w=800",
    cuisine: "French",
    cookTime: 20
  },
  {
    title: "Broccoli and Cheese Soup",
    rawIngredients: ["1 head broccoli", "4 cups vegetable broth", "1 cup milk", "1 cup shredded cheddar", "butter", "flour"],
    ingredients: ["broccoli", "broth", "milk", "cheddar", "butter", "flour"],
    instructions: "Make a roux with butter and flour. Gradually whisk in milk and broth. Add chopped broccoli. Simmer until tender. Stir in cheese until melted.",
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Falafel Wrap",
    rawIngredients: ["4 pita bread", "8 falafel balls", "hummus", "tomato", "cucumber", "tahini dressing"],
    ingredients: ["bread", "falafel", "hummus", "tomato", "cucumber", "tahini"],
    instructions: "Warm pita. Spread hummus. Fill with falafel, diced tomato, cucumber, and tahini sauce.",
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    cuisine: "Middle Eastern",
    cookTime: 15
  },
  {
    title: "Sweet Potato Fries",
    rawIngredients: ["2 sweet potatoes", "olive oil", "salt", "paprika"],
    ingredients: ["sweet potato", "olive oil", "salt", "paprika"],
    instructions: "Cut potatoes into fries. Toss with olive oil, salt, and paprika. Bake at 425°F until crispy.",
    image_url: "https://images.unsplash.com/photo-1563721382346-601934c9c2a6?w=800",
    cuisine: "Side Dish",
    cookTime: 30
  },
  {
    title: "Egg Fried Rice",
    rawIngredients: ["3 cups cooked rice", "3 eggs", "1/2 cup peas", "2 tbsp soy sauce", "sesame oil", "onion"],
    ingredients: ["rice", "egg", "pea", "soy sauce", "sesame oil", "onion"],
    instructions: "Scramble eggs, remove. Stir fry onion and peas. Add rice, soy sauce, and sesame oil. Mix in eggs.",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Penne alla Vodka (Simplified)",
    rawIngredients: ["300g penne pasta", "1 can tomato sauce", "1/2 cup heavy cream", "vodka (optional)", "parmesan"],
    ingredients: ["pasta", "tomato sauce", "cream", "vodka", "parmesan"],
    instructions: "Cook pasta. Heat sauce and cream. Add a splash of vodka if desired. Toss with pasta and parmesan.",
    image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    cuisine: "Italian",
    cookTime: 20
  },
  {
    title: "Shepherd's Pie (Mini)",
    rawIngredients: ["500g ground beef", "2 potatoes", "1/2 cup frozen peas and carrots", "beef broth", "milk", "butter"],
    ingredients: ["beef", "potato", "pea", "carrot", "broth", "milk", "butter"],
    instructions: "Make mashed potatoes with milk and butter. Brown beef, add peas/carrots and broth. Layer beef mix in a dish, top with mash. Bake.",
    image_url: "https://images.unsplash.com/photo-1563242693-b67f4c549646?w=800",
    cuisine: "British",
    cookTime: 45
  },
  {
    title: "Pita and Hummus Snack",
    rawIngredients: ["2 pita bread", "1/4 cup hummus", "olive oil", "paprika"],
    ingredients: ["bread", "hummus", "olive oil", "paprika"],
    instructions: "Toast pita bread. Cut into wedges. Serve with hummus drizzled with olive oil and a dash of paprika.",
    image_url: "https://images.unsplash.com/photo-1589302168051-1f9e2d3122c5?w=800",
    cuisine: "Mediterranean",
    cookTime: 5
  },
  {
    title: "Tofu Katsu Curry",
    rawIngredients: ["tofu block", "bread crumbs", "flour", "egg", "curry sauce packet", "rice"],
    ingredients: ["tofu", "bread crumb", "flour", "egg", "curry", "rice"],
    instructions: "Coat tofu in flour, egg, and bread crumbs. Fry until golden. Heat curry sauce. Serve tofu over rice with curry.",
    image_url: "https://images.unsplash.com/photo-1563379926-ae8346101f30?w=800",
    cuisine: "Japanese",
    cookTime: 30
  },
  {
    title: "Cream of Mushroom Soup",
    rawIngredients: ["500g mushrooms", "1 onion", "4 cups vegetable broth", "1 cup heavy cream", "butter", "thyme"],
    ingredients: ["mushroom", "onion", "broth", "cream", "butter", "thyme"],
    instructions: "Sauté mushrooms and onion in butter. Add broth and thyme. Simmer, then blend partially. Stir in cream.",
    image_url: "https://images.unsplash.com/photo-1562967911-3965d836336e?w=800",
    cuisine: "French",
    cookTime: 30
  },
  {
    title: "Simple Green Salad",
    rawIngredients: ["2 cups mixed greens", "1/2 cucumber, sliced", "2 tbsp vinaigrette dressing", "salt", "pepper"],
    ingredients: ["green", "cucumber", "dressing", "salt", "pepper"],
    instructions: "Combine greens and cucumber. Toss lightly with vinaigrette. Season to taste.",
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    cuisine: "Healthy",
    cookTime: 5
  },
  {
    title: "Chicken Burrito",
    rawIngredients: ["4 tortillas", "cooked chicken", "rice", "black beans", "salsa", "cheese"],
    ingredients: ["tortilla", "chicken", "rice", "black bean", "salsa", "cheese"],
    instructions: "Warm tortillas. Fill with rice, chicken, beans, salsa, and cheese. Roll into a burrito.",
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    cuisine: "Mexican",
    cookTime: 15
  },
  {
    title: "Tuna Croquettes",
    rawIngredients: ["1 can tuna", "2 potatoes, mashed", "1 egg", "bread crumbs", "parsley", "oil for frying"],
    ingredients: ["tuna", "potato", "egg", "bread crumb", "parsley", "oil"],
    instructions: "Mix tuna, mashed potato, egg, and parsley. Form into patties, coat in bread crumbs. Fry until golden brown.",
    image_url: "https://images.unsplash.com/photo-1579621970563-ed1bebb68aa9?w=800",
    cuisine: "Seafood",
    cookTime: 25
  },
  {
    title: "Zucchini Noodles with Pesto",
    rawIngredients: ["2 zucchini", "1/2 cup basil pesto", "cherry tomatoes", "parmesan"],
    ingredients: ["zucchini", "pesto", "tomato", "parmesan"],
    instructions: "Spiralize zucchini into noodles. Toss with pesto. Top with halved cherry tomatoes and parmesan.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    cuisine: "Healthy",
    cookTime: 10
  },
  {
    title: "Ham and Egg Fried Rice",
    rawIngredients: ["3 cups cooked rice", "2 eggs", "1/2 cup diced ham", "2 tbsp soy sauce", "sesame oil", "onion"],
    ingredients: ["rice", "egg", "ham", "soy sauce", "sesame oil", "onion"],
    instructions: "Scramble eggs, remove. Stir fry onion and ham. Add rice, soy sauce, and sesame oil. Mix in eggs.",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Hot Dogs on Buns",
    rawIngredients: ["4 hot dogs", "4 hot dog buns", "ketchup", "mustard"],
    ingredients: ["hot dog", "bun", "ketchup", "mustard"],
    instructions: "Cook hot dogs by grilling or boiling. Place in buns. Top with ketchup and mustard.",
    image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Canned Soup Upgrade",
    rawIngredients: ["1 can tomato soup", "1/2 cup milk or cream", "black pepper", "croutons"],
    ingredients: ["tomato soup", "milk", "cream", "pepper", "crouton"],
    instructions: "Heat soup, stir in milk/cream. Season with pepper. Serve hot with croutons.",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    cuisine: "Quick Meal",
    cookTime: 5
  },
  {
    title: "Quick Yogurt Parfait",
    rawIngredients: ["1 cup greek yogurt", "1/4 cup granola", "1/2 cup berries", "honey"],
    ingredients: ["yogurt", "granola", "berry", "honey"],
    instructions: "Layer yogurt, granola, and berries in a glass. Drizzle with honey.",
    image_url: "https://images.unsplash.com/photo-1588661771147-380d368e7d8c?w=800",
    cuisine: "Breakfast",
    cookTime: 5
  },
  {
    title: "Butter Noodles",
    rawIngredients: ["200g egg noodles", "2 tbsp butter", "parmesan cheese", "salt", "pepper"],
    ingredients: ["noodle", "butter", "parmesan", "salt", "pepper"],
    instructions: "Cook noodles. Drain, toss immediately with butter, parmesan, salt, and pepper.",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    cuisine: "Simple",
    cookTime: 15
  },
  {
    title: "Chicken Fajitas",
    rawIngredients: ["500g chicken strips", "2 bell peppers", "1 onion", "fajita seasoning", "4 tortillas", "sour cream"],
    ingredients: ["chicken", "bell pepper", "onion", "seasoning", "tortilla", "sour cream"],
    instructions: "Cook chicken with seasoning. Sauté peppers and onions. Serve hot in tortillas with sour cream.",
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    cuisine: "Mexican",
    cookTime: 25
  },
  {
    title: "Breakfast Smoothie",
    rawIngredients: ["1 cup milk", "1 banana", "1/2 cup frozen berries", "1 tbsp honey", "spinach (optional)"],
    ingredients: ["milk", "banana", "berry", "honey", "spinach"],
    instructions: "Combine all ingredients in a blender. Blend until smooth.",
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    cuisine: "Beverage",
    cookTime: 5
  },
  {
    title: "Egg Salad Sandwich",
    rawIngredients: ["4 boiled eggs", "2 slices bread", "2 tbsp mayonnaise", "mustard", "salt", "pepper"],
    ingredients: ["egg", "bread", "mayonnaise", "mustard", "salt", "pepper"],
    instructions: "Mash eggs. Mix with mayo, mustard, salt, and pepper. Spread on bread.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Baked Beans on Toast",
    rawIngredients: ["2 slices bread", "1 can baked beans", "butter", "salt", "pepper"],
    ingredients: ["bread", "bean", "butter", "salt", "pepper"],
    instructions: "Toast bread, butter. Heat baked beans. Pour beans over toast. Season.",
    image_url: "https://images.unsplash.com/photo-1562967911-3965d836336e?w=800",
    cuisine: "British",
    cookTime: 10
  },
  {
    title: "Stuffed Bell Peppers",
    rawIngredients: ["2 bell peppers", "1 cup cooked rice", "500g ground beef", "1 can tomato sauce", "onion", "garlic"],
    ingredients: ["bell pepper", "rice", "beef", "tomato sauce", "onion", "garlic"],
    instructions: "Cut peppers in half. Brown beef with onion and garlic. Mix with rice and sauce. Stuff peppers and bake.",
    image_url: "https://images.unsplash.com/photo-1563721382346-601934c9c2a6?w=800",
    cuisine: "American",
    cookTime: 45
  },
  {
    title: "Mashed Potatoes",
    rawIngredients: ["4 large potatoes", "1/2 cup milk", "4 tbsp butter", "salt", "pepper"],
    ingredients: ["potato", "milk", "butter", "salt", "pepper"],
    instructions: "Boil potatoes until tender. Drain, mash with milk and butter. Season well.",
    image_url: "https://images.unsplash.com/photo-1549880196-036136be44d1?w=800",
    cuisine: "Side Dish",
    cookTime: 25
  },
  {
    title: "Easy Chicken Tenders",
    rawIngredients: ["500g chicken breast", "1 egg", "1 cup bread crumbs", "vegetable oil", "salt", "pepper"],
    ingredients: ["chicken", "egg", "bread crumb", "oil", "salt", "pepper"],
    instructions: "Cut chicken into strips. Dip in egg, then coat in bread crumbs. Fry in oil or bake.",
    image_url: "https://images.unsplash.com/photo-1565299624942-4386810c71a0?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Avocado Chicken Salad",
    rawIngredients: ["1/2 cup cooked chicken", "1 avocado, mashed", "1/4 cup chopped celery", "salt", "pepper", "lemon juice"],
    ingredients: ["chicken", "avocado", "celery", "salt", "pepper", "lemon"],
    instructions: "Mix shredded chicken, mashed avocado, and celery. Season with salt, pepper, and lemon juice.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    cuisine: "Healthy",
    cookTime: 10
  },
  {
    title: "One-Pan Roasted Carrots",
    rawIngredients: ["1 lb carrots", "2 tbsp olive oil", "1 tsp thyme", "salt", "pepper"],
    ingredients: ["carrot", "olive oil", "thyme", "salt", "pepper"],
    instructions: "Toss carrots with oil, thyme, salt, and pepper. Roast at 400°F until tender and caramelized.",
    image_url: "https://images.unsplash.com/photo-1627964417066-646f2509b552?w=800",
    cuisine: "Side Dish",
    cookTime: 30
  },
  {
    title: "Quick Tomato Bruschetta",
    rawIngredients: ["4 slices bread", "2 tomatoes, diced", "2 cloves garlic", "1 tbsp olive oil", "fresh basil"],
    ingredients: ["bread", "tomato", "garlic", "olive oil", "basil"],
    instructions: "Toast bread. Rub with garlic. Top with diced tomatoes, olive oil, and chopped basil.",
    image_url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800",
    cuisine: "Italian",
    cookTime: 10
  },
  {
    title: "Banana Pancakes",
    rawIngredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tbsp sugar", "2 tsp baking powder", "1 banana"],
    ingredients: ["flour", "egg", "milk", "sugar", "baking powder", "banana"],
    instructions: "Mix batter. Fold in mashed banana. Cook on a griddle until golden brown.",
    image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    cuisine: "Breakfast",
    cookTime: 15
  },
  {
    title: "Chicken Quesadilla",
    rawIngredients: ["2 tortillas", "1 cup shredded cheese", "1/4 cup diced chicken", "salsa", "sour cream"],
    ingredients: ["tortilla", "cheese", "chicken", "salsa", "sour cream"],
    instructions: "Heat tortilla, sprinkle cheese and chicken. Fold, cook until cheese melts. Serve with salsa and sour cream.",
    image_url: "https://images.unsplash.com/photo-1565299624942-4386810c71a0?w=800",
    cuisine: "Mexican",
    cookTime: 10
  },
  {
    title: "Garlic Butter Steak",
    rawIngredients: ["2 sirloin steaks", "4 tbsp butter", "4 cloves garlic", "thyme", "salt", "pepper"],
    ingredients: ["steak", "butter", "garlic", "thyme", "salt", "pepper"],
    instructions: "Season steak. Cook in butter. Add garlic and thyme, baste steak with the butter. Slice and serve.",
    image_url: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Hot and Sour Soup (Quick)",
    rawIngredients: ["4 cups chicken broth", "1 tbsp soy sauce", "1 tbsp vinegar", "chili paste", "1 egg", "tofu"],
    ingredients: ["broth", "soy sauce", "vinegar", "chili paste", "egg", "tofu"],
    instructions: "Bring broth to boil, stir in soy sauce, vinegar, and chili paste. Stir in whisked egg, then add diced tofu.",
    image_url: "https://images.unsplash.com/photo-1627964417066-646f2509b552?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Milk and Cookies",
    rawIngredients: ["1 cup milk", "4 chocolate chip cookies"],
    ingredients: ["milk", "cookie"],
    instructions: "Pour milk into a glass. Enjoy with cookies.",
    image_url: "https://images.unsplash.com/photo-1542385437-02434855928a?w=800",
    cuisine: "Dessert",
    cookTime: 2
  },
  {
    title: "Apple Slices with Peanut Butter",
    rawIngredients: ["1 apple", "2 tbsp peanut butter", "cinnamon"],
    ingredients: ["apple", "peanut butter", "cinnamon"],
    instructions: "Slice apple. Dip slices in peanut butter. Sprinkle with cinnamon.",
    image_url: "https://images.unsplash.com/photo-1588661771147-380d368e7d8c?w=800",
    cuisine: "Snack",
    cookTime: 5
  },
  {
    title: "Cheese and Crackers",
    rawIngredients: ["4 oz cheddar cheese", "1 box crackers"],
    ingredients: ["cheddar", "cracker"],
    instructions: "Slice cheese. Arrange cheese and crackers on a plate.",
    image_url: "https://images.unsplash.com/photo-1545894179-873099905273?w=800",
    cuisine: "Snack",
    cookTime: 2
  },
  {
    title: "Ham and Cheese Sandwich",
    rawIngredients: ["2 slices bread", "2 slices ham", "1 slice cheese", "mayonnaise", "mustard"],
    ingredients: ["bread", "ham", "cheese", "mayonnaise", "mustard"],
    instructions: "Spread mayo and mustard on bread. Layer with ham and cheese.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 5
  },
  {
    title: "Cereal with Milk",
    rawIngredients: ["1 cup cereal", "1 cup milk", "sugar (optional)"],
    ingredients: ["cereal", "milk", "sugar"],
    instructions: "Pour cereal into bowl. Add milk. Add sugar if desired.",
    image_url: "https://images.unsplash.com/photo-1563242693-b67f4c549646?w=800",
    cuisine: "Breakfast",
    cookTime: 2
  },
  {
    title: "Tofu Scramble with Spinach",
    rawIngredients: ["1 block firm tofu", "1 cup spinach", "turmeric", "nutritional yeast", "olive oil"],
    ingredients: ["tofu", "spinach", "turmeric", "yeast", "olive oil"],
    instructions: "Crumble tofu. Sauté spinach. Add tofu, turmeric, and nutritional yeast. Scramble until heated through.",
    image_url: "https://images.unsplash.com/photo-1511232822971-4a4b10b0b5d9?w=800",
    cuisine: "Vegan",
    cookTime: 15
  },
  {
    title: "Chicken Wrap (Simple)",
    rawIngredients: ["1 tortilla", "cooked chicken", "lettuce", "mayonnaise"],
    ingredients: ["tortilla", "chicken", "lettuce", "mayonnaise"],
    instructions: "Spread mayo on tortilla. Layer with chicken and lettuce. Roll up.",
    image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
    cuisine: "Quick Meal",
    cookTime: 5
  },
  {
    title: "Baked Sweet Potato",
    rawIngredients: ["2 sweet potatoes", "butter", "cinnamon"],
    ingredients: ["sweet potato", "butter", "cinnamon"],
    instructions: "Bake sweet potatoes until soft. Split open, top with butter and cinnamon.",
    image_url: "https://images.unsplash.com/photo-1567117565369-ac96df3f48a1?w=800",
    cuisine: "Side Dish",
    cookTime: 45
  },
  {
    title: "Pasta with Butter and Garlic",
    rawIngredients: ["300g pasta", "3 tbsp butter", "2 cloves garlic", "parsley"],
    ingredients: ["pasta", "butter", "garlic", "parsley"],
    instructions: "Cook pasta. Melt butter, sauté garlic. Toss with pasta and parsley.",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    cuisine: "Italian",
    cookTime: 15
  },
  {
    title: "Quick Cucumber Salad",
    rawIngredients: ["2 cucumbers", "1/4 cup vinegar", "1 tbsp sugar", "salt", "dill"],
    ingredients: ["cucumber", "vinegar", "sugar", "salt", "dill"],
    instructions: "Slice cucumbers thinly. Mix vinegar, sugar, and salt. Pour over cucumbers. Garnish with dill.",
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    cuisine: "Side Dish",
    cookTime: 10
  },
  {
    title: "Lemon Pepper Salmon",
    rawIngredients: ["2 salmon fillets", "1 lemon", "black pepper", "olive oil"],
    ingredients: ["salmon", "lemon", "pepper", "olive oil"],
    instructions: "Season salmon with lemon juice, pepper, and oil. Bake or pan-fry until cooked through.",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    cuisine: "Healthy",
    cookTime: 15
  },
  {
    title: "Microwave Popcorn",
    rawIngredients: ["1 packet microwave popcorn", "butter (optional)", "salt (optional)"],
    ingredients: ["popcorn", "butter", "salt"],
    instructions: "Microwave popcorn according to package instructions. Add melted butter and salt if desired.",
    image_url: "https://images.unsplash.com/photo-1542385437-02434855928a?w=800",
    cuisine: "Snack",
    cookTime: 5
  },
  {
    title: "Simple Toast with Jam",
    rawIngredients: ["2 slices bread", "butter", "jam or jelly"],
    ingredients: ["bread", "butter", "jam"],
    instructions: "Toast bread. Spread butter and jam.",
    image_url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
    cuisine: "Breakfast",
    cookTime: 5
  },
  {
    title: "Cream Cheese Bagel",
    rawIngredients: ["1 bagel", "cream cheese", "everything bagel seasoning"],
    ingredients: ["bagel", "cream cheese", "seasoning"],
    instructions: "Toast bagel. Spread with cream cheese. Sprinkle with seasoning.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    cuisine: "Breakfast",
    cookTime: 5
  },
  {
    title: "Chicken and Broccoli",
    rawIngredients: ["500g chicken breast", "2 cups broccoli", "soy sauce", "garlic powder", "vegetable oil"],
    ingredients: ["chicken", "broccoli", "soy sauce", "garlic powder", "oil"],
    instructions: "Cut chicken into pieces and cook in oil with garlic powder. Add broccoli and a splash of soy sauce. Steam until broccoli is tender-crisp.",
    image_url: "https://images.unsplash.com/photo-1620963339176-7eddd8b292e3?w=800",
    cuisine: "Healthy",
    cookTime: 20
  },
  {
    title: "Breakfast Burrito",
    rawIngredients: ["2 tortillas", "2 eggs", "cheese", "salsa", "black beans", "onion"],
    ingredients: ["tortilla", "egg", "cheese", "salsa", "black bean", "onion"],
    instructions: "Scramble eggs. Warm tortillas. Fill with scrambled eggs, cheese, salsa, beans, and sautéed onion. Roll up.",
    image_url: "https://images.unsplash.com/photo-1616712135047-b903080ff0b5?w=800",
    cuisine: "Mexican",
    cookTime: 15
  },
  {
    title: "Garlic Parmesan Spaghetti",
    rawIngredients: ["400g spaghetti", "4 tbsp butter", "4 cloves garlic", "1/2 cup parmesan cheese", "parsley"],
    ingredients: ["spaghetti", "butter", "garlic", "parmesan", "parsley"],
    instructions: "Cook spaghetti. Melt butter and sauté garlic. Toss with pasta, parmesan, and parsley.",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    cuisine: "Italian",
    cookTime: 15
  },
  {
    title: "Tuna Salad Lettuce Wraps",
    rawIngredients: ["1 can tuna", "2 tbsp mayonnaise", "1 celery stalk", "lettuce leaves", "mustard"],
    ingredients: ["tuna", "mayonnaise", "celery", "lettuce", "mustard"],
    instructions: "Mix tuna, mayo, diced celery, and mustard. Spoon mixture into lettuce leaves for wraps.",
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    cuisine: "Healthy",
    cookTime: 10
  },
  {
    title: "Sweet Potato Hash",
    rawIngredients: ["2 sweet potatoes", "1 onion", "2 eggs", "vegetable oil", "salt", "pepper"],
    ingredients: ["sweet potato", "onion", "egg", "oil", "salt", "pepper"],
    instructions: "Dice sweet potatoes and onion. Fry in oil until tender. Make wells and crack eggs into them. Cook until eggs are set.",
    image_url: "https://images.unsplash.com/photo-1562967911-3965d836336e?w=800",
    cuisine: "American",
    cookTime: 20
  },
  {
    title: "Simple Chocolate Cake",
    rawIngredients: ["2 cups flour", "1 cup sugar", "1/2 cup cocoa powder", "1 cup milk", "1/2 cup oil", "1 egg", "baking powder"],
    ingredients: ["flour", "sugar", "cocoa powder", "milk", "oil", "egg", "baking powder"],
    instructions: "Mix dry ingredients. Mix wet ingredients. Combine and bake in a pan at 350F.",
    image_url: "https://images.unsplash.com/photo-1563242693-b67f4c549646?w=800",
    cuisine: "Dessert",
    cookTime: 40
  },
  {
    title: "Roasted Chicken Thighs",
    rawIngredients: ["4 chicken thighs", "2 tbsp olive oil", "1 tsp paprika", "salt", "pepper", "garlic powder"],
    ingredients: ["chicken", "olive oil", "paprika", "salt", "pepper", "garlic powder"],
    instructions: "Toss chicken with oil, lemon juice, and herbs. Bake or grill until cooked through.",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    cuisine: "American",
    cookTime: 35
  },
  {
    title: "Baked Apple with Cinnamon",
    rawIngredients: ["2 apples", "2 tbsp butter", "1 tbsp sugar", "cinnamon"],
    ingredients: ["apple", "butter", "sugar", "cinnamon"],
    instructions: "Core apples. Fill center with butter, sugar, and cinnamon. Bake until soft.",
    image_url: "https://images.unsplash.com/photo-1518012643806-258385a69146?w=800",
    cuisine: "Dessert",
    cookTime: 30
  },
  {
    title: "Garlic Butter Green Beans",
    rawIngredients: ["1 lb green beans", "2 tbsp butter", "2 cloves garlic", "salt", "pepper"],
    ingredients: ["green bean", "butter", "garlic", "salt", "pepper"],
    instructions: "Steam green beans. Toss with melted butter, minced garlic, salt, and pepper.",
    image_url: "https://images.unsplash.com/photo-1627964417066-646f2509b552?w=800",
    cuisine: "Side Dish",
    cookTime: 15
  },
  {
    title: "Creamy Tomato Soup with Grilled Cheese",
    rawIngredients: ["1 can crushed tomatoes", "1 cup milk", "1 onion", "2 slices bread", "2 slices cheese"],
    ingredients: ["tomato", "milk", "onion", "bread", "cheese"],
    instructions: "Make creamy tomato soup by simmering tomatoes, milk, and sautéed onion. Prepare grilled cheese on the side.",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Peanut Butter Banana Smoothie",
    rawIngredients: ["1 cup milk", "1 banana", "2 tbsp peanut butter", "honey (optional)"],
    ingredients: ["milk", "banana", "peanut butter", "honey"],
    instructions: "Blend all ingredients until smooth.",
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    cuisine: "Beverage",
    cookTime: 5
  },
  {
    title: "Spaghetti with Meat Sauce",
    rawIngredients: ["400g spaghetti", "500g ground beef", "1 can crushed tomatoes", "1 onion", "garlic"],
    ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
    instructions: "Cook spaghetti. Brown beef. Sauté onion and garlic. Add crushed tomatoes and simmer. Toss with pasta.",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    cuisine: "Italian",
    cookTime: 35
  },
  {
    title: "Waffle Sandwich",
    rawIngredients: ["2 frozen waffles", "2 slices ham", "1 slice cheese", "butter"],
    ingredients: ["waffle", "ham", "cheese", "butter"],
    instructions: "Toast waffles. Place ham and cheese between them. Grill lightly in butter until cheese melts.",
    image_url: "https://images.unsplash.com/photo-1567117565369-ac96df3f48a1?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Vegetable Soup (Quick)",
    rawIngredients: ["4 cups vegetable broth", "1 can diced tomatoes", "1 cup frozen mixed vegetables", "salt", "pepper"],
    ingredients: ["broth", "tomato", "vegetable", "salt", "pepper"],
    instructions: "Combine all ingredients in a pot. Bring to a boil, then simmer until vegetables are tender.",
    image_url: "https://images.unsplash.com/photo-1549880196-036136be44d1?w=800",
    cuisine: "Quick Meal",
    cookTime: 15
  },
  {
    title: "Tofu Scramble Burrito",
    rawIngredients: ["2 tortillas", "tofu block", "black beans", "salsa", "onion", "bell pepper"],
    ingredients: ["tortilla", "tofu", "black bean", "salsa", "onion", "bell pepper"],
    instructions: "Scramble tofu with turmeric and spices. Sauté onion and pepper. Fill tortillas with tofu, beans, and salsa. Roll up.",
    image_url: "https://images.unsplash.com/photo-1511232822971-4a4b10b0b5d9?w=800",
    cuisine: "Mexican",
    cookTime: 20
  },
  {
    title: "Chocolate Milk",
    rawIngredients: ["1 cup milk", "2 tbsp chocolate syrup"],
    ingredients: ["milk", "chocolate syrup"],
    instructions: "Stir chocolate syrup into cold milk.",
    image_url: "https://images.unsplash.com/photo-1542385437-02434855928a?w=800",
    cuisine: "Beverage",
    cookTime: 2
  },
  {
    title: "Chicken and Pesto Flatbread",
    rawIngredients: ["1 flatbread or pizza dough", "1/4 cup basil pesto", "cooked chicken", "mozzarella cheese"],
    ingredients: ["flatbread", "pizza dough", "pesto", "chicken", "mozzarella"],
    instructions: "Spread pesto on dough/flatbread. Top with chicken and mozzarella. Bake until cheese melts.",
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    cuisine: "Italian",
    cookTime: 15
  },
  {
    title: "Yogurt with Granola",
    rawIngredients: ["1 cup greek yogurt", "1/2 cup granola", "honey (optional)"],
    ingredients: ["yogurt", "granola", "honey"],
    instructions: "Combine yogurt and granola. Drizzle with honey.",
    image_url: "https://images.unsplash.com/photo-1588661771147-380d368e7d8c?w=800",
    cuisine: "Breakfast",
    cookTime: 5
  },
  {
    title: "Cheesy Baked Potatoes",
    rawIngredients: ["2 potatoes", "butter", "shredded cheese", "sour cream", "bacon bits (optional)"],
    ingredients: ["potato", "butter", "cheese", "sour cream", "bacon"],
    instructions: "Bake potatoes until tender. Split open, add butter, cheese, and sour cream.",
    image_url: "https://images.unsplash.com/photo-1567117565369-ac96df3f48a1?w=800",
    cuisine: "Side Dish",
    cookTime: 60
  },
  {
    title: "Simple Tuna Sandwich",
    rawIngredients: ["2 slices bread", "1 can tuna", "2 tbsp mayonnaise", "salt", "pepper"],
    ingredients: ["bread", "tuna", "mayonnaise", "salt", "pepper"],
    instructions: "Mix tuna with mayo, salt, and pepper. Spread on bread.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 5
  },
  {
    title: "Steak and Potatoes",
    rawIngredients: ["2 sirloin steaks", "2 potatoes", "olive oil", "salt", "pepper"],
    ingredients: ["steak", "potato", "olive oil", "salt", "pepper"],
    instructions: "Sear steak on both sides, then bake. Roast potatoes with oil, salt, and pepper.",
    image_url: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Spicy Beef and Bean Chili",
    rawIngredients: ["500g ground beef", "1 can black beans", "1 can diced tomatoes", "chili powder", "onion"],
    ingredients: ["beef", "black bean", "tomato", "chili powder", "onion"],
    instructions: "Brown beef, drain. Sauté onion. Add beef, beans, tomatoes, and chili powder. Simmer for 30 minutes.",
    image_url: "https://images.unsplash.com/photo-1551062635-c35d9471168f?w=800",
    cuisine: "Mexican",
    cookTime: 40
  },
  {
    title: "Quick Stir-Fry Noodles",
    rawIngredients: ["200g egg noodles", "1 cup frozen mixed vegetables", "3 tbsp soy sauce", "sesame oil"],
    ingredients: ["noodle", "vegetable", "soy sauce", "sesame oil"],
    instructions: "Cook noodles. Stir-fry vegetables. Add noodles and soy/sesame oil. Toss to coat.",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    cuisine: "Asian",
    cookTime: 15
  },
  {
    title: "Lemon Herb Chicken",
    rawIngredients: ["500g chicken breast", "1 lemon", "2 tbsp olive oil", "thyme", "rosemary", "salt", "pepper"],
    ingredients: ["chicken", "lemon", "olive oil", "thyme", "rosemary", "salt", "pepper"],
    instructions: "Coat chicken with oil, lemon juice, and herbs. Bake or grill until cooked through.",
    image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
    cuisine: "Healthy",
    cookTime: 25
  },
  {
    title: "Black Bean Tostadas",
    rawIngredients: ["4 tortillas", "1 can black beans", "shredded cheese", "salsa", "sour cream"],
    ingredients: ["tortilla", "black bean", "cheese", "salsa", "sour cream"],
    instructions: "Crisp tortillas in oven. Mash and season black beans. Spread beans on tostadas. Top with cheese, salsa, and sour cream.",
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    cuisine: "Mexican",
    cookTime: 20
  },
  {
    title: "Tofu Scramble with Tomato",
    rawIngredients: ["1 block firm tofu", "1 tomato", "1/2 onion", "turmeric", "nutritional yeast", "olive oil"],
    ingredients: ["tofu", "tomato", "onion", "turmeric", "yeast", "olive oil"],
    instructions: "Sauté onion and diced tomato. Crumble tofu, add to pan with turmeric and yeast. Scramble until heated through.",
    image_url: "https://images.unsplash.com/photo-1511232822971-4a4b10b0b5d9?w=800",
    cuisine: "Vegan",
    cookTime: 15
  },
  {
    title: "Simple Tuna Casserole",
    rawIngredients: ["200g egg noodles", "1 can tuna", "1 can cream of mushroom soup", "1/2 cup milk", "cheese"],
    ingredients: ["noodle", "tuna", "mushroom soup", "milk", "cheese"],
    instructions: "Cook noodles. Mix with tuna, soup, milk, and cheese. Bake in a casserole dish until bubbly.",
    image_url: "https://images.unsplash.com/photo-1579621970563-ed1bebb68aa9?w=800",
    cuisine: "American",
    cookTime: 30
  },
  {
    title: "Spicy Quinoa Salad",
    rawIngredients: ["1 cup quinoa", "1 can black beans", "corn", "salsa", "lime juice", "cilantro"],
    ingredients: ["quinoa", "black bean", "corn", "salsa", "lime", "cilantro"],
    instructions: "Cook quinoa. Mix with beans, corn, salsa, and lime juice. Garnish with cilantro.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    cuisine: "Healthy",
    cookTime: 25
  },
  {
    title: "Sausage and Eggs",
    rawIngredients: ["2 sausages", "2 eggs", "butter", "salt", "pepper"],
    ingredients: ["sausage", "egg", "butter", "salt", "pepper"],
    instructions: "Cook sausages. Fry eggs in butter. Serve together.",
    image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
    cuisine: "American",
    cookTime: 10
  },
  {
    title: "Vegetable Skewers",
    rawIngredients: ["1 bell pepper", "1 onion", "cherry tomatoes", "zucchini", "olive oil", "salt", "pepper"],
    ingredients: ["bell pepper", "onion", "tomato", "zucchini", "olive oil", "salt", "pepper"],
    instructions: "Cut vegetables into pieces. Thread onto skewers. Brush with oil and spices. Grill or roast.",
    image_url: "https://images.unsplash.com/photo-1549880196-036136be44d1?w=800",
    cuisine: "Side Dish",
    cookTime: 20
  },
  {
    title: "Peanut Butter & Jelly Sandwich",
    rawIngredients: ["2 slices bread", "peanut butter", "jam or jelly"],
    ingredients: ["bread", "peanut butter", "jam"],
    instructions: "Spread peanut butter on one slice and jam on the other. Combine.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    cuisine: "American",
    cookTime: 2
  },
  {
    title: "Watermelon and Feta Salad",
    rawIngredients: ["2 cups watermelon, cubed", "1/2 cup feta cheese", "mint leaves", "lime juice"],
    ingredients: ["watermelon", "feta", "mint", "lime"],
    instructions: "Combine cubed watermelon and feta. Drizzle with lime juice and garnish with mint.",
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    cuisine: "Healthy",
    cookTime: 5
  },
  {
    title: "Egg Drop Soup",
    rawIngredients: ["4 cups chicken broth", "2 eggs", "soy sauce", "sesame oil", "green onion"],
    ingredients: ["broth", "egg", "soy sauce", "sesame oil", "onion"],
    instructions: "Bring broth to a boil. Drizzle in whisked eggs while stirring gently. Season with soy sauce and sesame oil. Garnish with green onion.",
    image_url: "https://images.unsplash.com/photo-1627964417066-646f2509b552?w=800",
    cuisine: "Asian",
    cookTime: 10
  }
];