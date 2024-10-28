import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidObjectId = (id: string) => /^[a-fA-F0-9]{24}$/.test(id);

export const checkEmptyField = (fields: Record<string, FormDataEntryValue>) => {

  if (typeof fields !== 'object') throw new Error('fields must be an object');

  let err = "";
  Object.entries(fields).some(([key, value]) => {
    if (!value) {
      err = "Please enter the " + key;
      return true
    }
    return false
  })

  return err;
}