"use client";
import React, { useState } from "react";
import { PriceData } from "@/lib/apis/query-types";

const CoinPriceCard = ({ priceData }: { priceData: PriceData }) => {
  const [timer, setTimer] = useState(0);
  // 마지막 업데이트부터 시간 찍어주자.

  return (
    <>
      <p>{priceData.price}</p>
      <p>{priceData.last_updated}</p>
      <p>test</p>
    </>
  );
};

export default CoinPriceCard;
