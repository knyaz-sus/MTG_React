import { ApiCards, Cards } from "./types";
import { API_URL } from "./url";

export const loadCards = async (): Promise<Cards | null> => {
  try {
    const res = await fetch(`${API_URL}/cards`);
    if (!res.ok) return null;
    const { cards }: ApiCards = await res.json();
    return cards;
  } catch (e) {
    console.log("Не удалось загрузить карты", e);
    return null;
  }
};
