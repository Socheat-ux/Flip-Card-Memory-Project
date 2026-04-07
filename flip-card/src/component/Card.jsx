
function Card({ card, isFlipped, handleChoice, disabled }) {
    return (
        <div
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={() => !disabled && handleChoice(card)}
        >
            <div className="card-inner">
                <div className="card-front">
                    <img src={card.src} alt="card" />
                </div>
                <div className="card-back">?</div>
            </div>
        </div>
    );
}

export default Card;