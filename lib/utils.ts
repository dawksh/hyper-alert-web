import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const abbreviateNumber = (num: number) =>
  Math.abs(num) >= 1e9
    ? (num / 1e9).toFixed(2).replace(/\.00$/, "") + "b"
    : Math.abs(num) >= 1e6
    ? (num / 1e6).toFixed(2).replace(/\.00$/, "") + "m"
    : Math.abs(num) >= 1e3
    ? (num / 1e3).toFixed(2).replace(/\.00$/, "") + "k"
    : num.toString()
