import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import TeamStats from './components/TeamStats';
import PlayerStats from "./components/PlayerStats";
import Matchday from "./components/Matchday";
import Glossary from "./components/Glossary";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import NoPage from "./components/NoPage";
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <AuthProvider>
    <BrowserRouter>
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <Routes>
        <Route exact path="/" element={<Home navOpen={navOpen} setNavOpen={setNavOpen}/>} />
        <Route exact element={<PrivateRoute/>}>
          <Route path="/team-stats" element={<TeamStats/>} />
          <Route path="/player-stats" element={<PlayerStats />} />
          <Route path="/matchday" element={<Matchday />} />
          <Route path="/glossary" element={<Glossary />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/reset-password" element={<ForgotPassword/>} />
        <Route path="*" element={<NoPage />} /> 
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

