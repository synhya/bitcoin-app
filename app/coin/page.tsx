import React from "react";
import { Button } from "@/components/ui/button";
import Example from "@/components/simple-line-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIdMap } from '@/lib/apis/coin-api'
import { MapQueryParam } from '@/lib/types'
import CoinDataPanel from '@/components/coin-page/coin-data-panel'

const Page = async () => {
  const queryParam: MapQueryParam = {
    symbol: 'BTC'
  }
  // const data = await getIdMap(queryParam);
  // console.log(data);
  return (
    <div className={"justify-center flex flex-col items-center"}>
      <Button className={'mb-2'}>Test</Button>
      <CoinDataPanel />
    </div>
  );
};

export default Page;
