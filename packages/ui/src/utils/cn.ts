import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// https://antematter.io/blogs/mastering-css-customization-with-tailwind-merge
/*
* cn replaces twMerge
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
