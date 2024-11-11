import { Cards } from "./components/Cards";
import { Content } from "./components/Content";
import { Stats } from "./components/Stats";

export function App() {
  return (
    <div className="">
      <header>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        <Cards />
        <Content />
        <Stats />
      </main>
    </div>
  );
}
