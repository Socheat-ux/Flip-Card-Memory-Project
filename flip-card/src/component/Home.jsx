
const Home = ({onSelect}) => {
    const levels = [
       {name: "Easy", pairs: 8, emoji: "🟢", desc:"16 cards"},
       {name: "Medium", pairs: 12, emoji: "🟡", desc:"24 cards"},
       {name: "Hard", pairs: 16, emoji: "🔴", desc:"32 cards"},
    ];

    return(
        <div className="home">
            <h1>Flip Card Memory</h1>
            <p className="subtitle">Choose your difficulty</p>
            <div className="level-grid">
                {levels.map(level => (
                <button
                    key={level.name}
                    className={`level-btn ${level.name.toLowerCase()}`}
                    onClick={() => onSelect(level)}
                >
                    <span className="level-emoji">{level.emoji}</span>
                    <span className="level-name">{level.name}</span>
                    <span className="level-desc">{level.desc}</span>
                </button>
                ))}
            </div>
        </div>
    );
}

export default Home;