function Leaderboard({ onBack }) {
  const raw = JSON.parse(localStorage.getItem("fc_leaderboard") || "[]");

  // Best score per user per difficulty = fewest moves, then fastest time
  const seen = new Set();
  const board = raw
    .sort((a, b) => a.turns - b.turns || a.timeTaken - b.timeTaken)
    .filter(e => {
      const key = `${e.username}-${e.difficulty}`;
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });

  const byDiff = (d) => board.filter(e => e.difficulty === d);

  return (
    <div className="leaderboard">
      <div className="lb-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>🏆 Leaderboard</h2>
        <span />
      </div>

      {["Easy", "Medium", "Hard"].map(diff => (
        <div key={diff} className="lb-section">
          <h3 className={`lb-diff lb-${diff.toLowerCase()}`}>{diff}</h3>
          {byDiff(diff).length === 0 ? (
            <p className="lb-empty">No scores yet</p>
          ) : (
            <table className="lb-table">
              <thead>
                <tr><th>#</th><th>Player</th><th>Moves</th><th>Time</th><th>Score</th><th>Date</th></tr>
              </thead>
              <tbody>
                {byDiff(diff).slice(0, 5).map((e, i) => (
                  <tr key={i} className={i === 0 ? "lb-gold" : ""}>
                    <td>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
                    <td>{e.username}</td>
                    <td>{e.turns}</td>
                    <td>{e.timeTaken}s</td>
                    <td>{e.score}</td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;