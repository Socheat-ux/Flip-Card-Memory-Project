import { useState } from "react";
import Game from "./component/Game";
import Home from "./component/Home";
import Header from "./component/Header";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login");

  const handleLogin = (u) => { setUser(u); setScreen("home"); };
  const handleLogout = () => { setUser(null); setScreen("login"); setDifficulty(null); };
  const handleNavigate = (s) => { setScreen(s); setDifficulty(null); };
  const handleSelectDifficulty = (d) => {
    setDifficulty(d);
  };

  const handleStartGame = () => {
    if (!difficulty) return;
    setScreen("game");
  };

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <section className="App">
        {screen === "login"  && <Login onLogin={handleLogin} onSwitch={() => setScreen("signup")} />}
        {screen === "signup" && <SignUp onSignUp={handleLogin} onSwitch={() => setScreen("login")} />}
        {screen === "home" && (<Home onSelect={handleSelectDifficulty} onStartGame={handleStartGame}/>)}
        {screen === "game"   && <Game difficulty={difficulty} onHome={() => handleNavigate("home")} />}
      </section>
    </>
  );
}

export default App;