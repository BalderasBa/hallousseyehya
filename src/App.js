import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { cardImages } from "./Context";

// i should keep best scores

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [level, setLevel] = useState(500);
  const [category, setCategory] = useState("luffy");

  const [best, setBest] = useState(null);

  useEffect(() => {
    setCards(level);
    setCategory(category);
    shuffleCards();
  }, [level, category]);

  // shuffle cards
  const shuffleCards = () => {
    // const shuffledCards = [...cardImages, ...cardImages];
    const shuffledCards = [
      ...cardImages.filter((cart) => cart.cat == category),
      ...cardImages.filter((cart) => cart.cat == category),
    ]
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
        }, level);
      }
    }
  }, [choice1, choice2]);

  // reset choices & increase turn
  const restTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((turns) => turns + 1);
    setDisabled(false);
    // if (cards.every((card) => card.matched == true)) {
    //   score()
    // }
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

        {/* <button>Best Scors</button> */}
        <h1>
          Turns: {turns < 10 && "0"}
          {turns}
        </h1>
      </div>

      <div className="settings">
        <label htmlFor="level">Level (speed) :</label>
        <select id="level" onChange={(e) => setLevel(e.target.value)}>
          <option value="750">Easy</option>
          <option value="550">Midium</option>
          <option value="350">Hard</option>
        </select>
        <label htmlFor="category">Category :</label>
        <select id="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="luffy">Luffy</option>
          <option value="ace">Ace</option>
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
      <h4 className="help">
        Help ! if you need to restart the game with different settings just edit
        speed or category, <br />
        if not click on start new game button to restart with the selected
        settings
      </h4>
    </div>
  );
}

export default App;
