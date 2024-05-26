import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase.config";

const updateStreak = async (game: string, guesses: number) => {
  if (!auth.currentUser || game === "null") return;

  const userDocRef = doc(db, "users", auth.currentUser.uid);

  try {
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    console.log(userData);

    const incrementStreak = async (field: string) => {
      const date = new Date();
      const totalGuessesField = `${game}TotalGuesses`;
      const totalWinsField = `${game}TotalWins`;
      const dateField = `${game}Date`;
      const maxField = `${game}Max`;

      const currentStreak = userData[field] || 0;
      const currentTotalGuesses = userData[totalGuessesField] || 0;
      const currentTotalWins = userData[totalWinsField] || 0;

      await updateDoc(userDocRef, {
        [field]: currentStreak + 1,
        [totalGuessesField]: currentTotalGuesses + guesses,
        [totalWinsField]: currentTotalWins + 1,
        [dateField]: date.toLocaleDateString(),
      });

      if (currentStreak + 1 > (userData[maxField] || 0)) {
        await updateDoc(userDocRef, {
          [maxField]: currentStreak + 1,
        });
      }
    };
    const today = new Date();
    const todayString = today.toLocaleDateString();

    if (game === "classic" && userData["classicDate"] !== todayString)
      await incrementStreak("classicStreak");
    if (game === "blurry" && userData["blurryDate"] !== todayString)
      await incrementStreak("blurryStreak");
    if (game === "zoomed" && userData["zoomedDate"] !== todayString)
      await incrementStreak("zoomedStreak");
  } catch (e) {
    console.error(e);
  }
};

export default updateStreak;
