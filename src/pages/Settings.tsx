import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Settings = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen p-5`}>
      <h1 className="text-4xl md:text-6xl text-center my-5 md:my-10">
        Settings
      </h1>
      <div
        className={`flex flex-col items-center justify-start space-y-10 p-5 rounded-2xl
       ${
         darkTheme
           ? "bg-slate-400 text-slate-900"
           : "bg-slate-800 text-slate-200"
       } `}
      >
        <div className="flex w-full md:w-3/4 lg:w-1/2 justify-between items-center p-3">
          <h1 className="text-xl md:text-3xl">Toggle Dark/Light Theme</h1>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className={`w-14 h-14 rounded-2xl ${
              darkTheme
                ? "bg-slate-900 text-slate-200 hover:bg-slate-950"
                : "bg-slate-200 text-slate-900 hover:bg-slate-400"
            } text-white font-bold 
          transition duration-500 ease-in-out hover:scale-110`}
          >
            {darkTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </div>
        <div className="flex w-full md:w-3/4 lg:w-1/2 justify-between items-center p-3">
          <h1 className="text-xl md:text-3xl">Delete Account</h1>
          <button className="px-5 py-2 rounded-md bg-red-500 text-white font-bold transition duration-300 ease-in-out hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
