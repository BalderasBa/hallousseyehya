import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
// i shold keep best scores

const cardImages = [
  { src: "/images/h-luffy-0.png", matched: false },
  { src: "/images/h-luffy-1.jpg", matched: false },
  { src: "/images/h-luffy-2.jpg", matched: false },
  { src: "/images/h-luffy-3.jpg", matched: false },
  { src: "/images/h-luffy-4.jpg", matched: false },
  { src: "/images/h-luffy-5.jpg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  // handle choices
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };
  // compare 2 selected cards
  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true);
      if (choice2.src === choice1.src) {
        setCards((prevC) => {
          return prevC.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        restTurn();
      } else {
        setTimeout(() => {
          restTurn();
        }, 500);
      }
    }
  }, [choice1, choice2]);

  // reset choices & increase turn
  const restTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((turns) => turns + 1);
    setDisabled(false);
  };
  // start auto a new game
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      {/* <h1>Cards</h1> */}
      <div className="settings">
        <button onClick={shuffleCards}>New Game</button>
        <button>Best Scors</button>
        <br />
        <h1>
          Turns: {turns < 10 && "0"}
          {turns}
        </h1>
      </div>

      <div className="settings">
        <select>
          <option value="easy" selected>
            Easy
          </option>
          <option value="midium">Midium</option>
          <option value="hard">Hard</option>
        </select>
        <select>
          <option value="luffy" selected>
            Luffy
          </option>
          <option value="ace">Ace</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choice1 || card === choice2 || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
