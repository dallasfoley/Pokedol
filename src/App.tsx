import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { auth } from "./config/firebase.config";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Settings from "./pages/Settings";
import { ThemeContext } from "./contexts/ThemeContext";
import Classic from "./pages/Classic";
import Blurry from "./pages/Blurry";
import Zoomed from "./pages/Zoomed";
import SignUp from "./pages/SignUp";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    return savedTheme === "true" ? true : false;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme.toString());
  }, [darkTheme]);

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
          {user && <NavBar />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/classic" element={<Classic />} />
            <Route path="/blurry" element={<Blurry />} />
            <Route path="/zoomed" element={<Zoomed />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
