import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Settings from "./pages/Settings";
import { ThemeContext } from "./contexts/ThemeContext";
import Classic from "./pages/Classic";
import Blurry from "./pages/Blurry";
import Zoomed from "./pages/Zoomed";
import SignUp from "./pages/SignUp";
//import { UserContext } from "./contexts/UserContext";
import { yesterdayLocale } from "./lib/constants";
import { UserType } from "./lib/types";

function App() {
  // const { user, setUser } = useContext(UserContext);
  const [darkTheme, setDarkTheme] = useState(true);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
    password: "",
    darkTheme: true,
    blurryStreak: 0,
    classicStreak: 0,
    zoomedStreak: 0,
    blurryMax: 0,
    classicMax: 0,
    zoomedMax: 0,
    blurryDate: yesterdayLocale,
    classicDate: yesterdayLocale,
    zoomedDate: yesterdayLocale,
    classicGuesses: 0,
    classicWins: 0,
    blurryGuesses: 0,
    blurryWins: 0,
    zoomedGuesses: 0,
    zoomedWins: 0,
  });

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div
        className={`${
          darkTheme
            ? "bg-slate-900 text-slate-200"
            : "bg-slate-200 text-slate-900"
        } w-full min-h-screen`}
      >
        <Router>
          {user?.email.length > 4 && <NavBar setUser={setUser} />}
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/classic"
              element={<Classic user={user} setUser={setUser} />}
            />
            <Route
              path="/blurry"
              element={<Blurry user={user} setUser={setUser} />}
            />
            <Route
              path="/zoomed"
              element={<Zoomed user={user} setUser={setUser} />}
            />
            <Route
              path="/settings"
              element={<Settings user={user} setUser={setUser} />}
            />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
