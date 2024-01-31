"use client";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Sector,
  PieProps,
  PieLabelRenderProps,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";
import { Theme } from "@/lib/types";
import {
  ChartColors,
  CustomTooltipPie,
  renderActiveShape,
} from "@/components/coin-page-specific/coin-chart-utils";

export type CoinPieChartProps = {
  name: string;
  data: { name: string; value: number }[];
  activeIndex: number;
  legend?: string;
};

const CoinPieChart = ({ data, activeIndex, name }: CoinPieChartProps) => {
  const { theme, systemTheme } = useTheme();
  const activeTheme = theme !== Theme.system ? theme : systemTheme;

  return (
    <ResponsiveContainer debounce={3}>
      <PieChart>
        <Tooltip content={<CustomTooltipPie />} />
        <Pie
          dataKey="value"
          data={data}
          cx={"50%"}
          cy={"50%"}
          fill="#8884d8"
          innerRadius={50}
          outerRadius={100}
          startAngle={90}
          endAngle={450}
          labelLine={false}
          stroke={"hsl(var(--primary))"}
          strokeWidth={0}
          style={{
            outline: "none",
            outlineWidth: 0,
          }}
          // label={renderActiveShape}
          activeIndex={0}
          activeShape={renderActiveShape}
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index === activeIndex
                  ? "hsl(var(--primary))"
                  : activeTheme === Theme.dark
                    ? ChartColors.pieBgBlack
                    : ChartColors.pieBgWhite
              }
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const RADIAN = Math.PI / 180;

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: string;
};
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default CoinPieChart;
