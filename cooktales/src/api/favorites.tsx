export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
};

export const getFavorites = async (): Promise<FavoriteRecipe[]> => {

  return [
    {
      id: '1',
      title: 'Ukrainian Borscht',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '2',
      title: 'Vegan Salad',
      image: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    },
  ];
};