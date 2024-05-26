import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

export const resetStreak = async (game: string) => {
  if (!auth.currentUser || game === "null") return;
  const userDocRef = doc(db, "users", auth.currentUser?.uid);
  if (game === "classic") {
    await updateDoc(userDocRef, {
      ["classicStreak"]: 0,
    });
  }
  if (game === "blurry") {
    await updateDoc(userDocRef, {
      ["blurryStreak"]: 0,
    });
  }
  if (game === "zoomed") {
    await updateDoc(userDocRef, {
      ["zoomedStreak"]: 0,
    });
  }
};
