import { logout } from "../lib/constants";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const links = ["Home", "Settings"];
const icons = [
  <HomeIcon fontSize="large" />,
  <SettingsIcon fontSize="large" />,
];

const NavBar = () => {
  const darkTheme = useContext(ThemeContext).darkTheme;
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`w-full top-0 h-10 md:h-14 ${
        darkTheme
          ? "bg-slate-200 text-slate-900"
          : "bg-slate-900 text-slate-200"
      }
    flex flex-col items-center justify-around md:flex-row md:justify-between`}
    >
      <div className="hidden md:flex">
        <h1 className="text-4xl ml-5 font-bold">Pokédol</h1>
        <div className="mx-3 h-full">
          <QueryStatsIcon fontSize="large" />
        </div>
      </div>
      <div className="flex text-md md:text-2xl xs:mt-3 md:m-0">
        {links.map((link, index) => (
          <Link to={`/${link.toLowerCase()}`} key={index}>
            {
              <h1
                className="mx-3 md:mx-6 transition duration-300 hover:scale-110 
              flex justify-around items-center text-lg md:text-2xl"
              >
                {icons[index]}
                <div className="ml-3">{link}</div>
              </h1>
            }
          </Link>
        ))}
        <button
          className="flex items-center justify-center transition duration-300 hover:scale-110"
          onClick={handleSignOut}
        >
          <LogoutIcon fontSize="large" />
          <h1 className="mx-0 md:mx-3 text-lg md:text-2xl ">Sign-Out</h1>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
