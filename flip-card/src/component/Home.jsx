import React from "react";

const Home = ({ onSelect, onStartGame }) => {
  const levels = [
    { name: "Easy", desc: "16 cards", pairs: 8 },
    { name: "Medium", desc: "24 cards", pairs: 12 },
    { name: "Hard", desc: "32 cards", pairs: 16 },
  ];    

  const [selectedLevel, setSelectedLevel] = React.useState(null);

  const handleSelect = (level) => {
    setSelectedLevel(level.name);
    if (onSelect) onSelect(level);
  };

    return(
    <div className="home">
    <h1>Flip Card Memory Game</h1>
    <hr/>
    <p className="subtitle">Select difficulty:</p>

    <div className="level-grid">
        {levels.map(level => (
        <button
            key={level.name}
            className={`level-btn ${level.name.toLowerCase()} ${
                selectedLevel === level.name ? "active" : ""
            }`}
            onClick={() => handleSelect(level)}
        >
            <span className="level-name">{level.name}</span>
            <span className="level-desc">{level.desc}</span>
        </button>
        ))}
    </div>

    <hr/>
    <button className="start-btn" onClick={onStartGame}>
        START GAME!
    </button>

    </div>
    );
}

export default Home;