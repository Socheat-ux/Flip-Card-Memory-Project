import { useEffect, useState, useRef } from "react";
import cardImg from "../card";
import Card from "./Card";

function shuffle(arr, pairs) {
  return [...arr.slice(0, pairs), ...arr.slice(0, pairs)]
    .map((card) => ({ ...card, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
}

function calculateScore({ pairs, timeLimit, timeLeft, turns, won }) {
  if (!won) return 0;

  const baseScores = { 8: 500, 12: 800, 16: 1200 };
  const multipliers = { 8: 1.0, 12: 1.5, 16: 2.0 };

  const base = baseScores[pairs] ?? 500;
  const multi = multipliers[pairs] ?? 1.0;
  const timeUsed = timeLimit - timeLeft;
  const movePenalty = turns * 5;
  const timePenalty = timeUsed * 2;

  return Math.max(0, Math.round(base * multi - movePenalty - timePenalty));
}

const saveResult = (username, result) => {
  const history = JSON.parse(localStorage.getItem("gameResults")) || [];

  localStorage.setItem(
    "gameResults",
    JSON.stringify([{ username, ...result }, ...history])
  );
};

function Game({ difficulty, onHome, user }) {
  const cols = difficulty.pairs === 16 ? 8 : 4;
  const timeLimit =
    difficulty.pairs === 8 ? 50 : difficulty.pairs === 12 ? 90 : 120;

  const [cards, setCards] = useState(() =>
    shuffle(cardImg, difficulty.pairs)
  );
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [lost, setLost] = useState(false);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (won || lost) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setLost(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [won, lost]);

  // Handle win → calculate score + save leaderboard
  useEffect(() => {
    if (won || lost) {
      const finalScore = calculateScore({
        pairs: difficulty.pairs,
        timeLimit,
        timeLeft,
        turns,
        won,
      });

      setScore(finalScore);

      const entry = {
        username: user?.username || "Guest",
        difficulty: difficulty.name,
        turns,
        timeTaken: timeLimit - timeLeft,
        score: won ? finalScore : 0,
        date: new Date().toLocaleDateString(),
      };

      const prev = JSON.parse(
        localStorage.getItem("fc_leaderboard") || "[]"
      );

      localStorage.setItem(
        "fc_leaderboard",
        JSON.stringify([entry, ...prev].slice(0, 50))
      );

      // Optional history save
      if (user?.username) {
        saveResult(user.username, {
          ...entry,
          won: true,
        });
      }
    }
  }, [won]);


  // Check match
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards((prev) =>
        prev.map((c) =>
          c.src === choiceOne.src ? { ...c, matched: true } : c
        )
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 600);
    }
  }, [choiceOne, choiceTwo]);

  // Check win condition
  useEffect(() => {
    if (!won && cards.length > 0 && cards.every((c) => c.matched)) {
      setWon(true);
    }
  }, [cards, won]);

  const handleChoice = (card) => {
    if (disabled || card.matched || lost || won) return;
    if (choiceOne?.id === card.id) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((t) => t + 1);
    setDisabled(false);
  };

  const reStartGame = () => {
    clearInterval(timerRef.current);
    setCards(shuffle(cardImg, difficulty.pairs));
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setWon(false);
    setLost(false);
    setDisabled(false);
    setTimeLeft(timeLimit);
    setScore(0);
  };

  const isFlipped = (card) =>
    card.matched ||
    choiceOne?.id === card.id ||
    choiceTwo?.id === card.id;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="game">
      <div className="game-header">
        <button className="back-btn" onClick={onHome}>
          ← Home
        </button>
        <h2>{difficulty.name} Mode</h2>
        <button className="restart-btn" onClick={reStartGame}>
          Restart
        </button>
      </div>

      <div className="game-stats">
        <p className="turns">
          Moves: <strong>{turns}</strong>
        </p>
        <p className={`timer ${timeLeft <= 10 ? "danger" : ""}`}>
          {formatTime(timeLeft)}
        </p>
      </div>

      {won && (
        <div className="win-banner">
          🎉 You Won in {turns} moves!
          <p>
            Score: <strong>{score}</strong>
          </p>
          <div className="win-actions">
            <button onClick={reStartGame}>Play Again</button>
            <button onClick={onHome}>Home</button>
          </div>
        </div>
      )}

      {lost && (
        <div className="lose-banner">
          ⏰ Time's Up!
          <p>
            Score: <strong>{score}</strong>
          </p>
          <div className="win-actions">
            <button onClick={reStartGame}>Try Again</button>
            <button onClick={onHome}>Home</button>
          </div>
        </div>
      )}

      <div
        className="card-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={isFlipped(card)}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;