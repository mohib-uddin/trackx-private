import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { errorType } from "@/_utils/types";

export function viewError(err: errorType) {
  if (Array.isArray(err.message)) {
    return err.message[0];
  } else {
    return err.message;
  }
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeAfterSpace(inputString: string) {
  // Split the input string into words
  const words = inputString.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Ensure the word is not empty
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return ""; // Handle consecutive spaces
  });

  // Join the capitalized words back together with spaces
  const resultString = capitalizedWords.join(" ");

  // Add a period at the end
  return `${resultString}.`;
}
export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type);
}
