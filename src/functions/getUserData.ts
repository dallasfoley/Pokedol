import { auth, db } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { UserDataType } from "../lib/types";

const getUserData = async (game: string) => {
  if (!auth.currentUser || game === "null") return;
  const userDocRef = doc(db, "users", auth.currentUser?.uid);
  try {
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) return;
    if (game === "classic") {
      return userDoc.data() as UserDataType;
    }
    if (game === "blurry") {
      return userDoc.data() as UserDataType;
    }
    if (game === "zoomed") {
      return userDoc.data() as UserDataType;
    }
  } catch (e) {
    console.error(e);
  }
};

export default getUserData;
