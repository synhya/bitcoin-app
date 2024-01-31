"use client";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartColors,
  CustomTooltipPrice,
} from "@/components/coin-page-specific/coin-chart-utils";

export type CoinBarChartProps = {
  data: { name: string; value: number }[];
};
const CoinPriceChart = ({ data }: CoinBarChartProps) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <ResponsiveContainer>
      <LineChart
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 20,
        }}
      >
        <Tooltip content={<CustomTooltipPrice data={chartData} />} />
        <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        <Line
          dataKey="value"
          data={chartData}
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
          type="monotone"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoinPriceChart;
