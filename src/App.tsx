import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import TeamStats from "./pages/TeamStats/TeamStats";
import PlayerStats from "./pages/PlayerStats/PlayerStats";
import StatBarChart from "./pages/PlayerStats/StatBarChart";
import Matchday from "./pages/Matchday/Matchday";
import Glossary from "./pages/Glossary/Glossary";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NoPage from "./components/NoPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />
        <Routes>
          <Route
            path="/"
            element={<Home navOpen={navOpen} setNavOpen={setNavOpen} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/team-stats" element={<TeamStats />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/player-stats/:stat" element={<StatBarChart />} />
            <Route path="/matchday" element={<Matchday />} />
          </Route>
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
