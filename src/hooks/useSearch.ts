import { useEffect, useState } from "react";
import { Cards } from "../types";

const getCardByName = async (name: string): Promise<Cards | null> => {
  try {
    if (!name) return null;
    const data = await fetch(
      `https://api.magicthegathering.io/v1/cards?name=${name}`
    );
    const { cards }: { cards: Cards } = await data.json();
    return cards;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export function useSearch(name: string) {
  const [searchCards, setSearchCards] = useState<Cards | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    setIsSearchLoading(true);
    getCardByName(name)
      .then((card) => setSearchCards(card))
      .finally(() => setIsSearchLoading(false));
  }, [name]);
  return { searchCards, isSearchLoading };
}
