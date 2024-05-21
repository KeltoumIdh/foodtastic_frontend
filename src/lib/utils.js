import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}


// Check if object empty
export const isObjNull = (obj) => {
    if (obj == undefined) return true;
    return Object.entries(obj).length === 0 && obj.constructor === Object;
};

// Check [String, Number, Object, Array] if it is empty or not
export const isNull = (value) => {
    if (!value) return true;

    if (value == "null") {
        return true;
    } else if (Array.isArray(value) || typeof value == "string") {
        return !value.length;
    } else if (typeof value == "object") {
        return isObjNull(value);
    } else if (value !== null) {
        return false;
    }
    return true;
};