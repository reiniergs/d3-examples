import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Svg } from "./styled";
import { data } from "./data";

const width = 800;
const height = 500;
const paddingTop = 50;
const paddingBottom = 50;
const paddingLeft = 35;
const paddingRight = 20;
const percentilLabels = [
    "Lower Earners",
    "Mid Lower Earners",
    "Middle Earners",
    "Mid Height Earners",
    "Hight Earners",
];
const perccentilColors = [
    "rgba(163, 168, 169, 0.9)",
    "rgba(159, 208, 151, 0.4)",
    "rgba(159, 208, 151, 0.6)",
    "rgba(159, 208, 151, 0.9)",
    "rgba(141, 194, 132, 1)",
];

const currencyFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', notation: "compact" }).format;

const SrpMarketClusters = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const xDomain = [
            0, 
            d3.max(data.clusters, item => item.max) as number, 
        ];
        const yDomain = d3.extent(data.clusters, item => item.houses) as [number, number]
        const yScale = d3.scaleLinear()
            .domain([0, yDomain[1] + yDomain[1] / 5])
            .range([0, height - paddingTop - paddingBottom]);
        const xScale = d3.scaleLinear().domain(
            xDomain
        ).range([0, width - paddingRight - paddingLeft]);
        const xTickValues = [
            0, 
            xDomain[1]/5, 
            xDomain[1]/5 * 2, 
            xDomain[1]/5 * 3,
            xDomain[1]/5 * 4,
            xDomain[1],
        ];
        
        // render bars
        svg
            .append("g")
            .attr("transform", `translate(${paddingLeft},${paddingTop})`)
            .call(
                (g) => g.selectAll("rect")
                    .data(data.clusters)
                    .join("rect")
                    .attr("x", d => xScale(d.min))
                    .attr("width", d => xScale(d.max) - xScale(d.min))
                    .attr("y", d => height - paddingTop - paddingBottom - yScale(d.houses))
                    .attr("height", d => yScale(d.houses))
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("stroke-with", "1px")
                    .attr("stroke", "#fff")
                    .attr("fill", d => {
                        let pos = 0;
                        while (d.min >= xTickValues[pos]) {
                            pos += 1;
                        }
                        if (xTickValues[pos] < d.max && xTickValues[pos] - d.min < d.max - xTickValues[pos]) {
                            return perccentilColors[pos];
                        }
                        return perccentilColors[pos - 1]
                    })
            )
        // labels
        svg
            .append("g")
            .attr("transform", `translate(${paddingLeft},${paddingTop})`)
            .call(
                (g) => g.selectAll("text")
                    .data(data.clusters)
                    .join("text")
                    .attr("x", d => (xScale(d.min) + xScale(d.max)) / 2)
                    .attr("text-anchor", "middle")
                    .attr("y",  d => height - paddingTop - paddingBottom - yScale(d.houses) - 10)
                    .classed("label", true)
                    .text(d => d.houses)
            );

        // axis
        const axisBottom = d3.axisBottom(xScale).tickValues(xTickValues).tickFormat(d => currencyFormatter(d as number));
        svg
            .append("g")
            .call(axisBottom)
            .call((g) => {
                g.attr("transform", `translate(${paddingLeft}, ${height - paddingBottom})`)
            })
            .call((g) => {
                g.selectAll(".tick line")
                    .clone().attr("y2", -height + paddingTop + paddingBottom).attr("stroke-opacity", 0.1).attr("stroke-dasharray", "10,10");
            })
            .call(g => g.selectAll(".tick text").classed("label", true))
        svg.append("g")
            .call(
                (g) => {
                    g.selectAll("text").data(xTickValues.slice(1)).join("text")
                        .attr("x", (d, i)  => {
                            const dist =  (xScale(d) - xScale(xTickValues[i])) / 2;
                            return xScale(d) - dist + paddingLeft;
                        })
                        .attr("y", paddingTop - 15)
                        .attr("text-anchor", "middle")
                        .classed("section-label", true)
                        .text((_, i) => percentilLabels[i])

                }
            )
        const axisLeft = d3
            .axisLeft(yScale.range([height - paddingTop - paddingBottom, 0]))
            .ticks((height - paddingTop - paddingBottom) / 50);
        svg.append("g")
            .call(axisLeft).call((g) => {
                g.attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
            })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").remove())
            .call(g => g.selectAll(".tick text").classed("label", true));

        // prediction    
        svg.append("g").call(
            (g) => {
                g.append("line")
                    .attr("x1", xScale(data.prediction.min) + paddingLeft)
                    .attr("y1", paddingTop)
                    .attr("x2", xScale(data.prediction.min) + paddingLeft)
                    .attr("y2", height - paddingTop)
                    .attr("stroke", "#F5BF45")
                    .attr("stroke-width", 2);

                g.append("line")
                    .attr("x1", xScale(data.prediction.max) + paddingLeft)
                    .attr("y1", paddingTop)
                    .attr("x2", xScale(data.prediction.max) + paddingLeft)
                    .attr("y2", height - paddingTop)
                    .attr("stroke", "#F5BF45")
                    .attr("stroke-width", 2); 

                g.append("rect")
                    .attr("x", xScale(data.prediction.min) + paddingLeft)
                    .attr("y", paddingTop)
                    .attr("width", xScale(data.prediction.max) - xScale(data.prediction.min))
                    .attr("height", height - paddingTop - paddingBottom)
                    .attr("fill", "#F5BF45")
                    .attr("fill-opacity", 0.3);

                g.append("text")
                    .classed("label prediction", true)
                    .attr("x", xScale(data.prediction.min) + paddingLeft - 5)
                    .attr("y", paddingTop + 20)
                    .attr("text-anchor", "end")
                    .text(currencyFormatter(data.prediction.min));    

                g.append("text")
                    .classed("label prediction", true)
                    .attr("x", xScale(data.prediction.max) + paddingLeft + 5)
                    .attr("y", paddingTop + 20)
                    .attr("text-anchor", "start")
                    .text(currencyFormatter(data.prediction.max));       
            }
        );       
    }, []);
    return (
        <Svg viewBox="0 0 800 500" ref={svgRef}>
        </Svg>
    )
}

export default SrpMarketClusters;


