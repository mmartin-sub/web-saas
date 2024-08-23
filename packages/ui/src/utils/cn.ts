import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge Tailwind CSS classes using `clsx` and `tailwind-merge`- twMerge.
 * ref: https://antematter.io/blogs/mastering-css-customization-with-tailwind-merge
 *
 * @param {...ClassValue[]} inputs - The Tailwind CSS classes to be merged.
 * @returns {string} - The merged Tailwind CSS classes.
 * @example
 * import { cn } from './utils';
 *
 * const buttonClasses = cn('bg-blue-500', 'text-white', 'p-2', 'rounded');
 * console.log(buttonClasses); // Output: "bg-blue-500 text-white p-2 rounded"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
