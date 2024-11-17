import { Cards } from "../types";
import { API_URL } from "../url";
import { useEffect, useState } from "react";

const loadCards = async (): Promise<Cards | null> => {
  try {
    const res = await fetch(`${API_URL}/cards`);
    if (!res.ok) return null;
    const { cards }: { cards: Cards } = await res.json();
    return cards;
  } catch (e) {
    console.log("Не удалось загрузить карты", e);
    return null;
  }
};
export function useCards() {
  const [cards, setCards] = useState<Cards | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    loadCards()
      .then((cards) => setCards(cards))
      .finally(() => setIsLoading(false));
  }, []);
  return { cards, isLoading };
}
