import { useState } from "react";
import React from "react";
import Game from "./component/Game";
import Home from "./component/Home";

function App() {

  const [difficulty, setDifficulty] = useState(null);

  return (
    <>
      <section className="App">
        {difficulty === null ? (
          <Home onSelect={setDifficulty} />
        ) : (
          <Game
            difficulty={difficulty}
            onHome={() => setDifficulty(null)}
          />
        )}
      </section>
    </>
  )
}

export default App
