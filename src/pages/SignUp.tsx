import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { signUpWithEmailPassword } from "../lib/constants";
import { useState } from "react";
import { auth, db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSignUpWithEmailPassword = async () => {
    try {
      await signUpWithEmailPassword(emailInput, passwordInput);
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          !docSnap.exists() &&
            (await setDoc(docRef, {
              blurryStreak: 0,
              classicStreak: 0,
              zoomedStreak: 0,
              blurryMax: 0,
              classicMax: 0,
              zoomedMax: 0,
              blurryDate: "null",
              classicDate: "null",
              zoomedDate: "null",
              userID: user.uid,
              classicTotalGuesses: 0,
              classicTotalWins: 0,
              blurryTotalGuesses: 0,
              blurryTotalWins: 0,
              zoomedTotalGuesses: 0,
              zoomedTotalWins: 0,
            }));
          navigate("/home");
        } else {
          console.log("There is no logged in user");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 m-0 flex flex-col justify-center items-center text-white p-0">
      <div className="h-96 w-64 md:h-96 md:w-72 rounded-2xl bg-slate-800 flex flex-col justify-around items-center p-0">
        <h1 className="text-3xl font-bold">Sign-Up</h1>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmailInput(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />

        <button
          onClick={handleSignUpWithEmailPassword}
          className="h-14 w-14 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default SignUp;
