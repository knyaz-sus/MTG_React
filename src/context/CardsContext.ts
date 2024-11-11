import { createContext } from "react";
import { Cards } from "../types";

interface ICardsContext {
  cards: Cards | null;
  isLoading: boolean;
}

export const CardsContext = createContext<ICardsContext | null>(null);
