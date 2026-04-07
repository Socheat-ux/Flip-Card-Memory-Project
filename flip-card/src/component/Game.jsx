import { useEffect, useState } from "react";
import cardImg from "../card";

//Shuffle Card
function shuffle(arr, pairs) {
  return [...arr.slice(0, pairs), ...arr.slice(0, pairs)]
    .map(card => ({ ...card, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
}


function Game ({difficulty, onHome}) {

    const cols = difficulty.pairs === 16 ? 12 : 8;
    
    const [cards, setCards] = useState(() => shuffle(cardImg, difficulty.pairs));
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [turns, setTurns] = useState(0);
    const [won, setWon] = useState(false);

    useEffect(() => {
        if(!choiceOne || !choiceTwo) return;
        setDisabled(true);
        
        if (choiceOne.src === choiceTwo.src) {
            setCards(prev =>
                prev.map(c => c.src === choiceOne.src ? { ...c, matched: true } : c)
            );
            resetTurn();
        } else {
            setTimeout(resetTurn, 1000);
        }
    }, [choiceOne, choiceTwo]);
    
    useEffect(() => {
        if (cards.length > 0 && cards.every(c => c.matched)) setWon(true);
    }, [cards]);


    const handleChoice = (card) => {
        if (disabled || card.matched) return;
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
        setCards(shuffle(cardImg, difficulty.pairs));
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        setWon(false);
        setDisabled(false);
    }

    const isFlipped = (card) =>{
        card.matched || choiceOne?.id === card.id || choiceTwo?.id === card.id;
    }

    return (
    
        <div className="game">
            <div className="game-header">
                <button className="back-btn" onClick={onHome}>← Home</button>
                <h2>{difficulty.name} Mode</h2>
                <button className="restart-btn" onClick={reStartGame}>Restart</button>
            </div>

            <p className="turns">Turns: <strong>{turns}</strong></p>

            {won && (
                <div className="win-banner">
                🎉You Won in {turns} turns!
                <div className="win-actions">
                    <button onClick={reStartGame}>Play Again</button>
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
                            <div className="card-front">{card.src}</div>
                            <div className="card-back">?</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default Game;