import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserType } from "../lib/types";

const SignUp = ({
  setUser,
}: {
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpWithEmailPassword = async () => {
    try {
      console.log(input);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/users`,
        input
      );
      const user1 = res.data.user as UserType;
      console.log(res.data.user);
      setUser(user1);
      navigate("/home");
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 m-0 flex flex-col justify-center items-center text-white p-0">
      <div className="h-96 w-64 md:h-96 md:w-72 rounded-2xl bg-slate-800 flex flex-col justify-around items-center p-0">
        <h1 className="text-3xl font-bold">Sign-Up</h1>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => handleChange(e)}
          required
          name="email"
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => handleChange(e)}
          required
          name="password"
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />

        <button
          onClick={signUpWithEmailPassword}
          className="h-14 w-14 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>
      </div>
      <button
        onClick={() => navigate("/")}
        className="h-14 w-14 m-8 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black"
      >
        <ArrowBackIcon fontSize="large" />
      </button>
    </div>
  );
};

export default SignUp;
