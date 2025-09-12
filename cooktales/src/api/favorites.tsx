import { databases, account } from '../appwrite';
import { ID, Query } from 'appwrite';

const databaseId = '68c2f0a00000b8313818';
const collectionId = 'favorites'; 

export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullRecipe: string;
};

export async function getFavorites(): Promise<FavoriteRecipe[]> {
  const user = await account.get();
  const userId = user.$id;
  console.log('getFavorites userId:', userId);
  const res = await databases.listDocuments(databaseId, collectionId, [
    Query.equal('userId', userId)
  ]);
  return res.documents.map((doc: any) => ({
    id: doc.recipeId,
    title: doc.title,
    image: doc.image,
    shortDescription: doc.shortDescription,
    fullRecipe: doc.fullRecipe,
  }));
}

export async function addFavorite(recipe: FavoriteRecipe) {
  const user = await account.get();
  const userId = user.$id;
  console.log('addFavorite userId:', userId);
  await databases.createDocument(databaseId, collectionId, ID.unique(), {
    userId,
    recipeId: recipe.id,
    title: recipe.title,
    image: recipe.image,
    shortDescription: recipe.shortDescription,
    fullRecipe: recipe.fullRecipe,
  });
}

export async function removeFavorite(recipeId: string) {
  const user = await account.get();
  const userId = user.$id;
  console.log('removeFavorite userId:', userId);
  const res = await databases.listDocuments(databaseId, collectionId, [
    Query.equal('userId', userId),
    Query.equal('recipeId', recipeId)
  ]);
  if (res.documents.length > 0) {
    await databases.deleteDocument(databaseId, collectionId, res.documents[0].$id);
  }
}