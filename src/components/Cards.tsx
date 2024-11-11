import { useCards } from "../context/useCards";

export function Cards() {
  const { cards, isLoading } = useCards();
  return (
    <div id="menu">
      <h2>Cards</h2>
      <ul>{!isLoading && cards?.map((card) => <li>{card.name}</li>)}</ul>
    </div>
  );
}
