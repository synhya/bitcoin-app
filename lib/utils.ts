import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const lookupEN = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "B" },
  { value: 1e12, symbol: "T" },
];

const lookupKR = [
  { value: 1, symbol: "" },
  { value: 1e4, symbol: "만" },
  { value: 1e8, symbol: "억" },
  { value: 1e12, symbol: "조" },
];

const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;

export function nFormatter(
  num: number,
  digits: number,
  locale: "en" | "kr" = "en",
) {
  const item =
    locale === "kr"
      ? lookupKR.findLast((item) => num >= item.value)
      : lookupEN.findLast((item) => num >= item.value);

  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

export function nFormatterAll(
  num: number,
  level: number,
  locale: "en" | "kr" = "en",
) {
  const lookup = locale === "kr" ? lookupKR : lookupEN;
  let index =
    locale === "kr"
      ? lookupKR.findLastIndex((item) => num >= item.value)
      : lookupEN.findLastIndex((item) => num >= item.value);

  let remainder = num;
  let formatted = "";
  if (index >= 0) {
    while (num > 0 && remainder > 0 && index >= 0) {
      const item = lookup[index];
      num = Math.floor(remainder / item.value); // 이거안하면 자동으로 반올림 해버리네.
      remainder = remainder - num * item.value;
      formatted = formatted.concat(
        num.toFixed(0).replace(regexp, "").concat(item.symbol),
      );
      index--;
    }
    return formatted;
  }

  return num.toString();
}
