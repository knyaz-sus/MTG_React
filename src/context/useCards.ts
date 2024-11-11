import { useContext } from "react";
import { CardsContext } from "./CardsContext";

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) throw new Error("Cant read cards context");
  return context;
};
