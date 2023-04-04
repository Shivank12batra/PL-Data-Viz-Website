import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import TeamStats from './components/TeamStats';
import PlayerStats from "./components/PlayerStats";
import Matchday from "./components/Matchday";
import Glossary from "./components/Glossary";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/team-stats" element={<TeamStats />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/matchday" element={<Matchday />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

