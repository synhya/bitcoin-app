import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}