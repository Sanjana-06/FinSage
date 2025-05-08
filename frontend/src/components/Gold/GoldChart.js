import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GoldPriceChart = ({ karat, term, investmentAmount }) => {
  const ref = useRef();
  const [range, setRange] = useState(term);

  useEffect(() => {
    if (!range || !karat || !investmentAmount) return;

    fetch(
      `https://finsage.onrender.com/api/gold?range=${range}&karat=${karat}&investmentAmount=${investmentAmount}`
    )
      .then((res) => res.json())
      .then((data) => {
        drawChart(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching gold data:", err));
  }, [range, karat, investmentAmount]);
  console.log(karat);
  console.log("Range:", range);
  console.log(investmentAmount);

  const drawChart = (data) => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    // d3.select("body").selectAll(".gold-tooltip").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 70, left: 80 }; // Increased bottom and left margins for axis labels

    const today = new Date();
    const parseDate = d3.timeParse("%Y-%m-%d");

    const allData = [...data.historical, ...data.predicted].map((d) => ({
      date: parseDate(d.date),
      price: d.price,
    }));

    const historical = allData.filter((d) => d.date < today);
    const predicted = allData.filter((d) => d.date >= today);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(allData, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(allData, (d) => d.price) * 0.95,
        d3.max(allData, (d) => d.price) * 1.05,
      ])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.attr("width", width).attr("height", height);

    // Draw x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40) // Position below the x-axis
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Time Period");

    // Draw y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Add y-axis label
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left - 50) // Position to the left of the y-axis
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)") // Rotate text for vertical alignment
      .style("font-size", "14px")
      .text("Gold Price (in ₹) for 10g");

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price));

    // Historical data line
    svg
      .append("path")
      .datum(historical)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Predicted data line
    svg
      .append("path")
      .datum(predicted)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4")
      .attr("d", line);

    // "Today" marker
    svg
      .append("line")
      .attr("x1", xScale(today))
      .attr("x2", xScale(today))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4")
      .lower();

    svg
      .append("text")
      .attr("x", xScale(today))
      .attr("y", margin.top - 5)
      .attr("fill", "red")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Today");

    // Tooltip setup
    const tooltip = d3
      .select("body")
      .append("div")
      // .attr("class", "gold-tooltip")  // for cleanup
      .style("position", "absolute")
      .style("background", "#fff")
      .style("padding", "6px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("display", "none")
      .style("font-size", "12px");

    const focusDot = svg
      .append("circle")
      .style("fill", "black")
      .attr("r", 4)
      .style("display", "none");

    const focusLine = svg
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3")
      .style("display", "none");

    // Mouse interaction
    const bisectDate = d3.bisector((d) => d.date).left;

    svg
      .append("rect")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mousemove", function (event) {
        const mouse = d3.pointer(event, this);
        const x0 = xScale.invert(mouse[0] + margin.left);
        const i = bisectDate(allData, x0, 1);
        const d0 = allData[i - 1];
        const d1 = allData[i];
        const d = !d1 ? d0 : x0 - d0.date > d1.date - x0 ? d1 : d0;

        focusDot
          .attr("cx", xScale(d.date))
          .attr("cy", yScale(d.price))
          .style("display", "block");

        focusLine
          .attr("x1", xScale(d.date))
          .attr("x2", xScale(d.date))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
          .style("display", "block");

        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`)
          .style("display", "inline-block")
          .html(`Date: ${d.date.toLocaleDateString()}<br/>Price: ₹${d.price}`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
        focusDot.style("display", "none");
        focusLine.style("display", "none");
      });
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "20px" }}>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        {["1M", "3M", "6M", "1Y", "3Y", "5Y"].map((opt) => (
          <button
            key={opt}
            onClick={() => setRange(opt)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              backgroundColor: range === opt ? "#007bff" : "#f0f0f0",
              color: range === opt ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <svg ref={ref}></svg>
    </div>
  );
};

export default GoldPriceChart;
