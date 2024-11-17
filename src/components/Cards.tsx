import { ChangeEvent, useState } from "react";
import { Card } from "../types";
import { useCards } from "../hooks/useCards";
import { useSearch } from "../hooks/useSearch";
import { Loading } from "./Loading";
import useDebounce from "../hooks/useDebounce";

interface CardsProps {
  selectCard: (arg: Card) => void;
}

export function Cards({ selectCard }: CardsProps) {
  const { cards, isLoading } = useCards();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { searchCards, isSearchLoading } = useSearch(debouncedSearchValue);
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div id="menu" style={{width:"30%"}}>
      <h2>Cards</h2>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={handleValue}
      />
      {searchValue === "" ? (
        <Loading isLoading={isLoading}>
          <ul>
            {cards?.map((card, i) => (
              <li key={`${card?.id}-${i}`} onClick={() => selectCard(card)}>
                {card?.name}
              </li>
            ))}
          </ul>
        </Loading>
      ) : (
        <Loading isLoading={isSearchLoading}>
          <ul>
            {searchCards?.map((card, i) => (
              <li key={`${card?.id}-${i}`} onClick={() => selectCard(card)}>
                {card?.name}
              </li>
            ))}
          </ul>
        </Loading>
      )}
    </div>
  );
}
