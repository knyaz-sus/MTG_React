import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ColorStats = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [
      { color: "White", count: 15 },
      { color: "Blue", count: 12 },
      { color: "Black", count: 8 },
      { color: "Red", count: 10 },
      { color: "Green", count: 18 },
      { color: "Colorless", count: 7 },
    ];

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    // Цвета для круговой диаграммы
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.color))
      .range([
        "#F0E68C", // Светло-желтый
        "#4682B4", // Стальной синий
        "#2F4F4F", // Темно-зеленый
        "#B22222", // Огненно-красный
        "#228B22", // Лесной зеленый
        "#A9A9A9", // Темно-серый
      ]);

    // Создание объекта pie для построения диаграммы
    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    // Создание дуги для секторов
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // Выбираем SVG и добавляем в него группировку
    const svg = d3
      .select(svgRef.current) // Используем ссылку на SVG элемент
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Создаем и добавляем арки
    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Добавляем пути (сектора) на диаграмму
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.color));

    // Очистка при размонтировании компонента
    return () => {
      svg.selectAll("*").remove(); // Убираем старые элементы, если компонент перерендерится
    };
  }, []); // Пустой массив зависимостей, чтобы эффект сработал только при монтировании компонента

  return (
    <div id="colorStats">
      <label className="colorLabel">Deck Mana Color Distribution</label>
      <svg ref={svgRef}></svg> {/* Диаграмма будет отрисована в этот элемент */}
    </div>
  );
};

export default ColorStats;
