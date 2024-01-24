'use client';
import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

const CustomTooltip = ({ active, payload, label } : TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className={'flex flex-col bg-background rounded-lg border border-border py-1.5 px-3'}>
        <p className='font-semibold'>{`${payload[0].value}`}</p>
        {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
        <p className='text-sm text-accent-foreground/70'>Date</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;