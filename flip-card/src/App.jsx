import { useState } from "react";
import Game from "./component/Game";
import Home from "./component/Home";
import Header from "./component/Header";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Leaderboard from "./component/LeaderBoard.jsx";
import Profile from "./component/Profile";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("home");

  const handleLogin    = (u) => { setUser(u); setScreen("home"); };
  const handleLogout   = () => { setUser(null); setScreen("home"); setDifficulty(null); };
  const handleNavigate = (s) => { setScreen(s); setDifficulty(null); };

  const handleStartGame = () => { if (difficulty) setScreen("game"); };

  return (
    <>
      <Header user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      <section className="App">
        {screen === "login"       && <Login onLogin={handleLogin} onSwitch={() => setScreen("signup")} />}
        {screen === "signup"      && <SignUp onSignUp={handleLogin} onSwitch={() => setScreen("login")} />}
        {screen === "home"        && <Home onSelect={setDifficulty} onStartGame={handleStartGame} />}
        {screen === "game"        && <Game difficulty={difficulty} onHome={() => handleNavigate("home")} user={user} />}
        {screen === "leaderboard" && <Leaderboard onBack={() => handleNavigate("home")} />}
        {screen === "profile"     && user && <Profile user={user} onBack={() => handleNavigate("home")} />}
      </section>
    </>
  );
}

export default App;