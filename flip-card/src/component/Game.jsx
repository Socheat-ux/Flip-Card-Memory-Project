import { useEffect, useState , useRef } from "react";
import cardImg from "../card";

//Shuffle Card
function shuffle(arr, pairs) {
  return [...arr.slice(0, pairs), ...arr.slice(0, pairs)]
    .map(card => ({ ...card, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
}


function Game ({difficulty, onHome}) {

    const cols = difficulty.pairs === 16 ? 8 
           : difficulty.pairs === 8  ? 4 
           : 4;

    // Set time based on difficulty
    const timeLimit = difficulty.pairs === 8  ? 40   // Easy  = 30 seconds
                  : difficulty.pairs === 12  ? 60  // Medium = 50s
                  : 90;   

    const [cards, setCards] = useState(() => shuffle(cardImg, difficulty.pairs));
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [turns, setTurns] = useState(0);
    const [won, setWon] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);  
    const [lost, setLost] = useState(false);              
    const timerRef = useRef(null);  
    

    // Timer countdown 
    useEffect(() => {
        if (won || lost) return; 

        timerRef.current = setInterval(() => {
        setTimeLeft(t => {
            if (t <= 1) {
            clearInterval(timerRef.current);
            setLost(true);  // time ran out!
            return 0;
            }
            return t - 1;
        });
        }, 1000);

        return () => clearInterval(timerRef.current);  // cleanup
    }, [won, lost]);

    // Use for convert from minute to second
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        if(!choiceOne || !choiceTwo) return;
        setDisabled(true);
        
        if (choiceOne.src === choiceTwo.src) {
            setCards(prev =>
                prev.map(c => c.src === choiceOne.src ? { ...c, matched: true } : c)
            );
            resetTurn();
        } else {
            setTimeout(resetTurn, 300);
        }
    }, [choiceOne, choiceTwo]);
    
    useEffect(() => {
        if (cards.length > 0 && cards.every(c => c.matched)) setWon(true);
    }, [cards]);


    const handleChoice = (card) => {
        if (disabled || card.matched || lost) return;
        if (choiceOne?.id === card.id) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(t => t + 1);
        setDisabled(false);
    }

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
    }

    const isFlipped = (card) =>{
        return card.matched || choiceOne?.id === card.id || choiceTwo?.id === card.id;
    }

    return (
    
        <div className="game">
            <div className="game-header">
                <button className="back-btn" onClick={onHome}>← Home</button>
                <h2>{difficulty.name} Mode</h2>
                <button className="restart-btn" onClick={reStartGame}>Restart</button>
            </div>

            {/* Timer + Turns */}
            <div className="game-stats">
                <p className="turns">Turns: <strong>{turns}</strong></p>
                <p className={`timer ${timeLeft <= 10 ? "danger" : ""}`}>
                 {formatTime(timeLeft)}
                </p>
            </div>

            {won && (
                <div className="win-banner">
                🎉You Won in {turns} turns!
                <div className="win-actions">
                    <button onClick={reStartGame}>Play Again</button>
                    <button onClick={onHome}>Change Level</button>
                </div>
                </div>
            )}

            {lost && (
                <div className="lose-banner">
                    Time's Up!
                    <div className="win-actions">
                        <button onClick={reStartGame}>Try Again</button>
                        <button onClick={onHome}>Change Level</button>
                    </div>
                    </div>
            )}

            <div className="card-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={`card ${isFlipped(card) ? "flipped" : ""}`}
                        onClick={() => handleChoice(card)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={card.src} alt="card" />
                            </div>
                            <div className="card-back">?</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default Game;