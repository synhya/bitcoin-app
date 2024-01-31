import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const parseBoolean = (x: string | null, unset: boolean) => {
  if (x === null) return unset;
  if (unset) return "false" !== x.toLowerCase();
  return "true" === x.toLowerCase();
};

const parseNumber = (x: string | null, unset: number) => {
  if (x === null) return unset;
  const n = Number(x);
  if (isNaN(n)) return unset;
  return n;
};

/**
 * Keeps a key's state synchronized with the search params
 * @param name key in search params
 * @param unset value to use if the name is unset in the search params
 * @param options.format function for encoding the value into the search params (default is x.toString())
 * @param options.parse function for decoding the value from the search params (default handles number|boolean|string)
 * @returns [value, setValue] like useState()
 */
const useSearchState = <U = string | undefined>(
  name: string,
  unset?: U,
  {
    format,
    parse,
  }: { format?: (x: U) => string; parse?: (s: string | null) => U } = {},
): [U, (x: U) => void] => {
  if (!parse) {
    switch (typeof unset) {
      case "number":
        parse = (x: string | null) => parseNumber(x, unset) as U;
        break;
      case "boolean":
        parse = (x: string | null) => parseBoolean(x, unset) as U;
        break;
      case "undefined":
      default:
        parse = (x: string | null) => (x === null ? unset : x) as U;
        break;
    }
  }

  const searchParams = useSearchParams();
  const v = searchParams.get(name);
  const [value, setValue] = useState<U>(parse(v));

  useEffect(() => {
    if (!parse) return;
    const newValue = parse(v);
    if (value !== newValue) setValue(newValue);
  }, [parse, v, value]);

  const setValueWrapper = useCallback(
    (v: any) => {
      const searchParams = new URL(window.location.href.replace("/#/", "/"))
        .searchParams;

      if (v === unset || v === undefined) searchParams.delete(name);
      else {
        const s = format ? format(v) : v.toString();
        searchParams.set(name, s);
      }
      setValue(v as U);
    },
    [format, name, unset],
  );
  return [value, setValueWrapper];
};

export default useSearchState;
