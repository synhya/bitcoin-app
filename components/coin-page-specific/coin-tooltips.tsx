"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircleIcon, HelpCircleIcon, LinkIcon } from "lucide-react";

export const DominanceTooltip = () => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={open}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        >
          <HelpCircleIcon className="text-accent-foreground/60 cursor-default" />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-pretty w-48 text-accent-foreground/90">
            도미넌스란
          </p>
          <p className="text-xs text-pretty w-48 text-accent-foreground/60">
            전체 가상화폐 시장 시가총액에서 코인의 총액이 몇 퍼센트인지 나타내는
            수치입니다
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const APITooltip = () => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={open}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        >
          <AlertCircleIcon className="text-accent-foreground/60 cursor-default" />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="w-48 ">
            <a
              target="_blank"
              href="https://coinmarketcap.com/api/"
              className="text-pretty text-accent-foreground/90 flex w-fit hover:text-primary transition-colors duration-500"
            >
              From CoinMarketCap <LinkIcon size={12} />
            </a>
            <p className="text-xs text-pretty w-48 text-accent-foreground/60">
              서버에 캐싱하고 1분마다 서버 캐시를 업데이트 합니다.
            </p>
            <p className="text-xs text-pretty w-48 text-accent-foreground/60">
              아래 테이블과 다른 API를 접근하기 때문에 값이 다를 수 있습니다.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
