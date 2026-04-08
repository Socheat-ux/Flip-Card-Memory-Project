function Profile({ user, onBack }) {
  const all = JSON.parse(localStorage.getItem("fc_leaderboard") || "[]");
  const mine = all.filter(e => e.username === user.username);

  const stat = (diff) => {
    const games = mine.filter(e => e.difficulty === diff);
    if (!games.length) return null;
    const best = games.reduce((a, b) => a.turns < b.turns ? a : b);
    return { played: games.length, bestMoves: best.turns, bestTime: best.timeTaken };
  };

  return (
    <div className="profile-page">
      <div className="lb-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>👤 My Profile</h2>
        <span />
      </div>

      <div className="profile-card">
        <div className="profile-avatar large">{user.username.slice(0, 2).toUpperCase()}</div>
        <h3>{user.username}</h3>
        <p className="profile-email">{user.email}</p>
        <p className="profile-total">Total games played: <strong>{mine.length}</strong></p>
      </div>

      <div className="profile-stats">
        {["Easy", "Medium", "Hard"].map(diff => {
          const s = stat(diff);
          return (
            <div key={diff} className={`stat-card stat-${diff.toLowerCase()}`}>
              <h4>{diff}</h4>
              {s ? (
                <>
                  <p>Games: <strong>{s.played}</strong></p>
                  <p>Best Moves: <strong>{s.bestMoves}</strong></p>
                  <p>Best Time: <strong>{s.bestTime}s</strong></p>
                </>
              ) : <p className="lb-empty">No games yet</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;