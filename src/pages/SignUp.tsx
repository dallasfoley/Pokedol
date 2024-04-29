import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { signUpWithEmailPassword } from "../lib/constants";
import { useState } from "react";
import { auth } from "../lib/firebase.config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSignUpWithEmailPassword = async () => {
    signUpWithEmailPassword(emailInput, passwordInput);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("This is the user: ", user);
        navigate("/home");
      } else {
        console.log("There is no logged in user");
      }
    });
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
        transition duration-300 hover:scale-110 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default SignUp;
