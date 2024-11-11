import { createRoot } from "react-dom/client";
import "./global.css";
import { App } from "./App.tsx";
import { CardsProvider } from "./context/CardsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <CardsProvider>
    <App />
  </CardsProvider>
);
