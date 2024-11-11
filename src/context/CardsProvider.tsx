import { ReactNode, useEffect, useState } from "react";
import { loadCards } from "../loadCards";
import { Cards } from "../types";
import { CardsContext } from "./CardsContext";

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Cards | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    loadCards()
      .then((cards) => setCards(cards))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <CardsContext.Provider value={{ cards, isLoading }}>
      {children}
    </CardsContext.Provider>
  );
}
