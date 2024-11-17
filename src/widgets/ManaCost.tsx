import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Cards } from "../types";

interface DataItem {
  cost: string; 
  count: number;
}

interface ManaCostProps {
  cards: Cards;
}

export function ManaCost({ cards }: ManaCostProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const dataMap: { [key: string]: number } = {};

    cards.forEach((card) => {
      const cost = card.cmc > 7 ? "7+" : card.cmc.toString();
      dataMap[cost] = (dataMap[cost] || 0) + 1;
    });

    const data: DataItem[] = Object.keys(dataMap).map((key) => ({
      cost: key,
      count: dataMap[key],
    }));

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.cost))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)!])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.cost)!)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#69b3a2");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .text("MTG Deck Mana Cost Distribution");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .text("Number of Cards");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Mana Cost");
  }, [cards]);

  return (
    <div id="manaStats">
      <svg ref={svgRef} />
    </div>
  );
}
