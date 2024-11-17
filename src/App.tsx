import { useState } from "react";
import { Cards } from "./components/Cards";
import { Content } from "./components/Content";
import { Card, Cards as CardsType } from "./types";
import { ManaCost } from "./widgets/ManaCost";
import { ColorStats } from "./widgets/ColorStats";

export function App() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [tableCards, setTableCards] = useState<CardsType | null>(null);

  const addCard = (card: Card) =>
    setTableCards((prev) => {
      if (!prev) return [{ ...card }];
      const amountOfCard = prev.filter(
        (prevCard) => card.id === prevCard.id
      ).length;
      if (amountOfCard < 4 || card.type === "Land") {
        return [...prev, { ...card }];
      } else {
        alert("Слишком много одинаковых карт!");
        return prev;
      }
    });
  const deleteCard = (id: string) => {
    setTableCards((prev) => {
      if (!prev) return null;
      const index = prev.findIndex((card) => card.id === id);
      if (index !== -1) {
        const updatedCards = [...prev];
        updatedCards.splice(index, 1);
        return updatedCards;
      }
      return prev;
    });
  };
  const selectCard = (card: Card) => setSelectedCard(card);

  return (
    <div>
      <header>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        <Cards selectCard={selectCard} />
        <Content
          tableCards={tableCards}
          addCard={addCard}
          deleteCard={deleteCard}
          selectedCard={selectedCard}
        />
        <div id="stats" style={{ width: "30%" }}>
          <h2>Stats</h2>
          {tableCards && tableCards?.length !== 0 ? (
            <div className="widgets">
              <ManaCost cards={tableCards} />
              <ColorStats cards={tableCards} />
            </div>
          ) : (
            <div>Нет карт на столе</div>
          )}
        </div>
      </main>
    </div>
  );
}
