import React from "react";
import { getMetadata, getQuotes } from "@/lib/apis/coin-api";
import CoinPieChart, {
  CoinPieChartProps,
} from "@/components/coin-page-specific/coin-pie-chart";
import {
  AlertCircleIcon,
  ExternalLinkIcon,
  GithubIcon,
  HelpCircleIcon,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { cn, nFormatter, nFormatterAll } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CoinPriceChart from "@/components/coin-page-specific/coin-price-chart";
import CoinPriceCard from "@/components/coin-page-specific/coin-price-card";
import {
  APITooltip,
  DominanceTooltip,
} from "@/components/coin-page-specific/coin-tooltips";

const CoinDescriptionContainer = async ({ symbol }: { symbol: string }) => {
  const [quotesData, metadata] = await Promise.all([
    getQuotes({ symbol: symbol, convert: "KRW" }),
    getMetadata({ symbol: symbol }),
  ]);

  const priceData = quotesData.quote["KRW"];
  const date = new Date(
    Date.parse(metadata.date_launched ?? metadata.date_added),
  );
  const passed = Math.round(
    Math.abs((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const dominanceData = [
    {
      name: "도미넌스",
      value: priceData.market_cap_dominance,
    },
    {
      name: "그외",
      value: 100 - priceData.market_cap_dominance,
    },
  ];

  const totalSupply = quotesData.infinite_supply
    ? -1
    : quotesData.max_supply ?? quotesData.total_supply;
  const supplyData = [
    {
      name: "채굴량",
      value: quotesData.circulating_supply,
    },
    {
      name: "남은량",
      value:
        totalSupply === -1 ? 0 : totalSupply - quotesData.circulating_supply,
    },
  ];

  const priceChartData = [
    {
      name: "90일",
      value: priceData.percent_change_90d,
    },
    {
      name: "60일",
      value: priceData.percent_change_60d,
    },
    {
      name: "30일",
      value: priceData.percent_change_30d,
    },
    {
      name: "7일",
      value: priceData.percent_change_7d,
    },
    {
      name: "1일",
      value: priceData.percent_change_24h,
    },
    {
      name: "1시간",
      value: priceData.percent_change_1h,
    },
    {
      name: "현재",
      value: 0,
    },
  ].map((d) => ({
    ...d,
    value: priceData.price * (1 + 0.01 * d.value),
  }));

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center">
        <div className="mb-1 w-fit text-2xl font-semibold underline underline-offset-4 cursor-pointer hover:-translate-y-1.5 hover:underline-offset-2 hover:text-amber-300 transition-all duration-500">
          <a target="_blank" href={metadata.urls.website[0]}>
            {metadata.name}
          </a>
        </div>
        {/*<div className="text-lg lg:hidden">*/}
        {/*  {priceData.price > 100 ? priceData.price.toFixed(0) : priceData.price}*/}
        {/*</div>*/}
      </div>
      <div className="flex w-full gap-2">
        <div className="relative w-full flex h-[200px] py-4 px-0 min-[400px]:px-8 border rounded-md hover:border-amber-300 transition-colors duration-500">
          <CoinPriceChart data={priceChartData} />
          <div className="absolute top-4 right-4">
            <APITooltip />
          </div>
        </div>
        {/*<div className="hidden lg:flex lg:flex-col lg:w-1/3 border rounded-md px-4 py-4 hover:border-amber-300 transition-colors duration-500">*/}
        {/*  <CoinPriceCard priceData={priceData} />*/}
        {/*</div>*/}
      </div>
      <div className="pt-4 px-4 grid grid-cols-1 md:grid-cols-2 border rounded-md w-full hover:border-amber-300 transition-colors duration-500">
        <div className="relative h-[280px]">
          <CoinPieChart name="공급량" data={supplyData} activeIndex={0} />
          <p className="text-sm text-accent-foreground/70 absolute bottom-1 right-0 cursor-default">
            {quotesData.infinite_supply ? "수량제한이 없습니다" : ""}
          </p>
        </div>
        <div className="relative h-[280px]">
          <CoinPieChart name="도미넌스" data={dominanceData} activeIndex={0} />
          <div className="absolute top-0 right-0">
            <DominanceTooltip />
          </div>
        </div>
      </div>
      <div className="relative py-4 px-4 border rounded-md w-full flex flex-col gap-2 hover:border-amber-300 transition-colors duration-500">
        <div className="flex flex-col">
          <p>{`첫 발행후 ${Math.floor(passed / 365)}년 ${passed % 365}일이 지났습니다.`}</p>
          <p className="truncate">
            {`지금까지 ${nFormatterAll(quotesData.circulating_supply, 2, "kr")}개의 코인이 채굴되었습니다.`}
          </p>
          <p className="text-pretty">
            {`총 채굴가능 수량(${totalSupply === -1 ? "제한없음" : nFormatterAll(totalSupply, 2, "kr")})을 고려한 시가총액은`}
            {` ${nFormatterAll(priceData.fully_diluted_market_cap, 2, "kr")}원 입니다.`}
          </p>
        </div>
        <div className="justify-end items-end flex gap-2">
          <a
            className="hover:text-amber-300 hover:-translate-y-1.5  transition-all duration-500"
            target="_blank"
            href={metadata.urls.website[0]}
          >
            <ExternalLinkIcon size={24} />
          </a>
          <a
            className="hover:text-amber-300 hover:-translate-y-1.5  transition-all duration-500"
            target="_blank"
            href={metadata.urls.source_code[0]}
          >
            <GithubIcon size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoinDescriptionContainer;
