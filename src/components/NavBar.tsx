import { logout } from "../lib/constants";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const links = ["Home", "Settings"];
const icons = [<HomeIcon />, <SettingsIcon />];

const NavBar = () => {
  const darkTheme = useContext(ThemeContext).darkTheme;
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`w-full top-0 h-10 md:h-14 text-lg md:text-2xl ${
        darkTheme
          ? "bg-slate-200 text-slate-900"
          : "bg-slate-900 text-slate-200"
      }
    flex flex-col items-center justify-around md:flex-row md:justify-between`}
    >
      <div className="hidden md:flex items-center">
        <h1 className="text-4xl ml-5 font-bold">Pokédol</h1>
        <div className="mx-3 h-full">
          <CatchingPokemonIcon fontSize="large" />
        </div>
      </div>
      <div className="flex justify-between text-sm md:text-2xl xs:mt-3 md:m-0 ">
        {links.map((link, index) => (
          <Link
            className="transition duration-300 hover:scale-110 
          flex justify-around items-center m-3"
            to={`/${link.toLowerCase()}`}
            key={index}
          >
            {icons[index]}
            <div className="ml-2">{link}</div>
          </Link>
        ))}
        <button
          className="flex items-center justify-center transition duration-300 hover:scale-110 m-3"
          onClick={handleSignOut}
        >
          <LogoutIcon />
          <h1 className="ml-2">Sign-Out</h1>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
