import { db } from '../firebase';
import { auth } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";

export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullRecipe: string;
};

export async function getFavorites(): Promise<FavoriteRecipe[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    image: doc.data().image,
    shortDescription: doc.data().shortDescription,
    fullRecipe: doc.data().fullRecipe,
  }));
}

export async function addFavorite(recipe: FavoriteRecipe) {
  const user = auth.currentUser;
  if (!user) return;
  await addDoc(collection(db, "favorites"), {
    userId: user.uid,
    title: recipe.title,
    image: recipe.image,
    shortDescription: recipe.shortDescription,
    fullRecipe: recipe.fullRecipe,
  });
}

export async function removeFavorite(recipeId: string) {
  const user = auth.currentUser;
  if (!user) return;
  const q = query(
    collection(db, "favorites"),
    where("userId", "==", user.uid),
    where("title", "==", recipeId) 
  );
  const querySnapshot = await getDocs(q);
  for (const d of querySnapshot.docs) {
    await deleteDoc(doc(db, "favorites", d.id));
  }
}