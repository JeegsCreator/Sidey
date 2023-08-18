import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIdFromParams(slug: string) {
  return slug.split("-")[1];
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
