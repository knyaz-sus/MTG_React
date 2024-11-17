import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Cards } from "../types";

interface DataItem {
  color: string;
  count: number;
}

interface ColorStatsProps {
  cards: Cards;
}

export function ColorStats({ cards }: ColorStatsProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const colorMap: { [key: string]: string } = {
      W: "#F0E68C", // Белый (Khaki)
      U: "#4682B4", // Голубой (Steel Blue)
      B: "#2F4F4F", // Черный (Dark Slate Gray)
      R: "#B22222", // Красный (Firebrick)
      G: "#228B22", // Зеленый (Forest Green)
      C: "#A9A9A9", // Серый (Dark Gray)
    };

    const data: DataItem[] = cards.map((card) => {
      const colorHex =
        card.colors && card.colors[0]
          ? colorMap[card.colors[0]] || "#D3D3D3"
          : "#D3D3D3";
      return { color: colorHex, count: card.cmc };
    });

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const pie = d3
      .pie<DataItem>()
      .value((d) => d.count)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = svg
      .selectAll("g.arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [cards]);

  return (
    <div id="colorStats">
      <label className="colorLabel">Deck Mana Color Distribution</label>
      <svg ref={svgRef} />
    </div>
  );
}
