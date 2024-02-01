import { Sector } from "recharts";
import React from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { cn, nFormatter, nFormatterAll } from "@/lib/utils";

export const ChartColors = {
  primaryWhite: "#ffe00d",
  primaryBlack: "#ffe00c",
  pieBgBlack: "#2d2d2d",
  pieBgWhite: "#f1f1f1",
  bgBlack: "#0c0a09",
  bgWhite: "#ffffff",
  positive: "#30ff10",
  negative: "#ff1010",
};

export const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  // midAngle < startAngle + 45 ? midAngle :
  const labelAngle = Math.min(startAngle + 20, midAngle);
  const sin = Math.sin(-RADIAN * labelAngle);
  const cos = Math.cos(-RADIAN * labelAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <text
              className="text-lg font-semibold hover:text-white"
              x={cx}
              y={cy}
              dy={8}
              textAnchor="middle"
              fill={fill}
            >
              {payload.name}
            </text>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />{" "}
      <g className="hidden min-[400px]:flex">
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 6}
          y={ey}
          dy={5}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`${(percent * 100).toFixed(3)}%`}
        </text>
      </g>
    </g>
  );
};

export const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="d-flex justify-content-end">
      {payload.map((entry: any, index: number) => (
        <>
          <span className="mx-2" key={`item-${index}`}>
            {entry.value}
          </span>
        </>
      ))}
    </div>
  );
};

export const CustomTooltipPie = (props: any) => {
  const { active, payload, label } = props;
  if (active && payload?.length) {
    return (
      <div
        className={
          "flex flex-col bg-background rounded-lg border border-border py-1.5 px-3"
        }
      >
        <p className="font-semibold text-accent-foreground/70">
          {`${
            payload[0].value < 100
              ? payload[0].value.toFixed(2)
              : nFormatterAll(payload[0].value, 2, "kr")
          }`}
        </p>
        {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
        <p className="text-sm text-accent-foreground/60">{`${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

export const CustomTooltipPrice = (props: any) => {
  const { active, payload, label, data, index } = props;
  if (active && payload?.length) {
    return (
      <div
        className={
          "flex flex-col bg-background rounded-lg border border-border py-1.5 px-3"
        }
      >
        <p className={"font-semibold text-accent-foreground/70"}>
          {`${nFormatterAll(payload[0].value, 2, "kr")}원`}
        </p>
        <p className="text-sm text-accent-foreground/60">
          {`${data[label].name}${label !== data.length - 1 ? "전" : ""} 가격`}
        </p>
      </div>
    );
  }
  return null;
};
