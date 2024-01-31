"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const LinePlot = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: {
  data: d3.NumberValue[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}) => {
  const gx = useRef(null);
  const gy = useRef(null);
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight],
  );
  d3.extent(data);
  const y = d3.scaleLinear(d3.extent(data) as Iterable<d3.NumberValue>, [
    height - marginBottom,
    marginTop,
  ]);
  const lines = d3.line((d, i) => x(i), y);

  useEffect(() => {
    if (gx.current && gy.current) {
      void d3.select(gx.current).call(d3.axisBottom(x) as any);
    }
  }, [gx, x]);

  d3.axisLeft(y);

  useEffect(() => {
    if (gx.current && gy.current) {
      void d3.select(gy.current).call(d3.axisLeft(y) as any);
    }
  }, [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={lines(data) ?? undefined}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
};

export default LinePlot;
