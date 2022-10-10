import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Data } from "..";
import { Dimensions } from "../useChartDimensions";
import { paddingTop, paddingLeft, paddingBottom, paddingRight, percentileColors } from "../config";

interface Props {
    dimensions: Dimensions;
    data: Data;
}

const Histogram = (props: Props) => {
    const { data, dimensions } = props;
    const { height, width } = dimensions;
    const ref = useRef<SVGSVGElement>(null);
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
    const labels = data.clusters.map((d) => {
        return (
            <text 
                x={(xScale(d.min) + xScale(d.max)) / 2}
                y={height - paddingTop - paddingBottom - yScale(d.houses) - 10}
                className="label"
                text-anchor="middle"
            >
                    {d.houses}
            </text>
        )
    });
    const bars = data.clusters.map((d) => {
        let fill;
        let pos = 0;
        while (d.min >= xTickValues[pos]) {
            pos += 1;
        }
        if (xTickValues[pos] < d.max && xTickValues[pos] - d.min < d.max - xTickValues[pos]) {
            fill = percentileColors[pos];
        }
        fill = percentileColors[pos - 1]
        return (
            <rect 
                x={xScale(d.min)}
                width={xScale(d.max) - xScale(d.min)}
                y={height - paddingTop - paddingBottom - yScale(d.houses)}
                height={yScale(d.houses)}
                rx={4}
                ry={4}
                stroke-with={1}
                stroke="white"
                fill={fill}
            />
        )
    })
    return (
        <svg ref={ref}>
            <g transform={`translate(${paddingLeft},${paddingTop})`}>
                {bars}
            </g>
            <g transform={`translate(${paddingLeft},${paddingTop})`}>
                {labels}
            </g>
        </svg>
    );
}

export default Histogram;