export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullRecipe: string;
};

export const getFavorites = async (): Promise<FavoriteRecipe[]> => {
  return [
    {
      id: '1',
      title: 'Ukrainian Borscht',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      shortDescription: 'Classic beetroot soup with meat and vegetables.',
      fullRecipe: `1. Prepare the broth: Boil beef with bones in a large pot for about 1 hour, skimming off any foam.
2. Add peeled and chopped potatoes to the broth and cook for 10 minutes.
3. In a separate pan, sauté onions, carrots, and beets in oil until soft. Add tomato paste and a splash of broth, simmer for 10 minutes.
4. Add sautéed vegetables to the pot, then add shredded cabbage and cook for another 10 minutes.
5. Season with salt, pepper, bay leaf, and a pinch of sugar. Add minced garlic and chopped dill.
6. Let the borscht rest for 15 minutes before serving.
7. Serve hot with a dollop of sour cream and fresh bread. Enjoy!`
    },
    {
      id: '2',
      title: 'Deruny (Potato Pancakes)',
      image: 'https://www.themealdb.com/images/media/meals/1550441882.jpg',
      shortDescription: 'Crispy Ukrainian potato pancakes served with sour cream.',
      fullRecipe: `1. Peel and grate potatoes and onion. Squeeze out excess liquid.
2. In a bowl, mix grated potatoes, onion, eggs, flour, salt, and pepper.
3. Heat oil in a frying pan over medium heat.
4. Spoon the potato mixture into the pan, flattening each pancake.
5. Fry until golden brown on both sides (about 3-4 minutes per side).
6. Drain on paper towels.
7. Serve hot with sour cream.`
    },
  ];
};