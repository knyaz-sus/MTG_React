import ColorStats from "../widgets/ColorStats";
import ManaCost from "../widgets/ManaCost";

export function Stats() {
  return (
    <div id="stats">
      <h2>Stats</h2>
      <div className="widgets">
        <ManaCost />
        <ColorStats />
      </div>
    </div>
  );
}
