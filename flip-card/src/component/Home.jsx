import React from "react";

const Home = ({ onSelect, onStartGame }) => {
  const levels = [
    { name: "Easy", desc: "16 cards" },
    { name: "Medium", desc: "24 cards" },
    { name: "Hard", desc: "32 cards" },
  ];

  const [selectedLevel, setSelectedLevel] = React.useState(null);

  const handleSelect = (level) => {
    setSelectedLevel(level.name);
    onSelect(level);
  };

    return(
    <div className="home">
    <h1>Flip Card Memory</h1>
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