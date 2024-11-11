import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ManaCost = () => {
  const svgRef = useRef(null); // Реф для SVG элемента

  useEffect(() => {
    const data = [
      { cost: 0, count: 2 },
      { cost: 1, count: 8 },
      { cost: 2, count: 12 },
      { cost: 3, count: 15 },
      { cost: 4, count: 10 },
      { cost: 5, count: 6 },
      { cost: 6, count: 4 },
      { cost: "7+", count: 3 },
    ];

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Убираем старые элементы SVG, если они существуют
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X ось
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

    // Y ось
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Создаем столбцы
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.cost))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#69b3a2");

    // Заголовок диаграммы
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .text("MTG Deck Mana Cost Distribution");

    // Подпись оси Y
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .text("Number of Cards");

    // Подпись оси X
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Mana Cost");
  }, []); // Пустой массив зависимостей, чтобы эффект сработал только при монтировании

  return (
    <div id="manaStats">
      <svg ref={svgRef}></svg> {/* Диаграмма будет отрисована в этот элемент */}
    </div>
  );
};

export default ManaCost;
