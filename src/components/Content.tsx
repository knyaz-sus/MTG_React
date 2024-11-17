import { Card, Cards } from "../types";

interface ContentProps {
  addCard: (arg: Card) => void;
  deleteCard: (id: string) => void;
  tableCards: Cards | null;
  selectedCard: Card | null;
}

export function Content({
  addCard,
  deleteCard,
  tableCards,
  selectedCard,
}: ContentProps) {
  return (
    <div className="content" style={{ width: "30%" }}>
      {!(selectedCard === null) && (
        <div style={{ marginBottom: "2em" }}>
          <img src={selectedCard?.imageUrl} />
          <div>{selectedCard.name}</div>
          <p>{selectedCard.rarity}</p>
          <button onClick={() => addCard(selectedCard)}>
            Добавить в колоду
          </button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        {tableCards?.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            style={{ flexGrow: 1, flexBasis: "25%" }}
          >
            <img style={{ maxHeight: "150px" }} src={card.imageUrl} />
            <div>{card.name}</div>
            <p>{card.rarity}</p>
            <button onClick={() => deleteCard(card.id)}>Удалить карту</button>
          </div>
        ))}
      </div>
    </div>
  );
}
