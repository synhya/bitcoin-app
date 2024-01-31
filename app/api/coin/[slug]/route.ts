import { NextResponse } from "next/server";
import { getMetadata, getQuotes } from "@/lib/apis/coin-api";
import { CoinMetadata, CoinResponseData } from "@/lib/apis/query-types";

// export const dynamic = "force-dynamic"; // defaults to auto
export const revalidate = 300;
// same as unstable_noStore()

export type Coin = {
  quote: CoinResponseData;
  metadata: CoinMetadata;
};

export async function GET(request: Request): Promise<NextResponse<Coin>> {
  const symbol = request.url.split("/").at(-1) ?? "";

  const [quotesData, metadata] = await Promise.all([
    getQuotes({ symbol: symbol }),
    getMetadata({ symbol: symbol }),
  ]);

  return NextResponse.json({
    quote: quotesData,
    metadata: metadata,
  });
}
