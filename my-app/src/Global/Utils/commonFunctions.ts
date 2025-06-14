import { SetCookieParams } from "../../Auth/authTypes";

export const compareStringArrayVersions = (
  newItems: string[],
  oldItems: string[]
): { added: string[]; removed: string[] } => {
  const added: string[] = newItems.filter(
    (newItem) => !oldItems.some((oldItem) => newItem === oldItem)
  );

  const removed: string[] = oldItems.filter(
    (oldItem) => !newItems.some((newItem) => newItem === oldItem)
  );

  return { added, removed };
};

/** transforms milliseconds to minutes and seconds */
export const formatMilliseconds = (milliseconds: number): string => {
  if (milliseconds < 0) {
    throw new Error("Milliseconds should be a non-negative number");
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0 && seconds > 0) {
    return `${minutes} minutes and ${seconds} seconds`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

export const setCookie = (cookie: SetCookieParams) => {
  const { name, value, exp, path, sameSite, secure } = cookie;
  // convert from unix time to UTC string
  const expDate = new Date(exp * 1000);
  const expUtcString = expDate.toUTCString();

  const cookieSecure = secure ? " Secure;" : "";
  let cookieValue = `${name}=${encodeURIComponent(
    value
  )}; expires=${expUtcString}; path=${path || "/"};`;

  // for development on localHost
  if (!isLocalHostEnv()) {
    cookieValue += `${cookieSecure} SameSite=${sameSite};`;
  }

  document.cookie = cookieValue;
};
// Get the value of a cookie with a given name
export const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }

  return null;
};
// Set expiration date of the cookie to a past date
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Returns true if the app is running on LocalHost
export const isLocalHostEnv = (): boolean => {
  const isLocalHost =
    typeof window !== "undefined"
      ? Boolean(
          window?.location.hostname === "localhost" ||
            // [::1] is the IPv6 localhost address.
            window?.location.hostname === "[::1]" ||
            // 127.0.0.1/8 is considered localhost for IPv4.
            window?.location.hostname.match(
              /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        )
      : false;

  return isLocalHost;
};

export const removePxAndReturnNumber = (input: string | number): number => {
  // If the input is already a number, return it directly
  if (typeof input === "number") {
    return input;
  }

  const numericPart = input.substring(0, input.length - 2);
  const numericValue = parseFloat(numericPart);
  return numericValue;
};

export const underscoreCaseToTitleCase = (input: string): string => {
  // Split the input string by underscores to get an array of words
  let words = input.split("_");

  // Map over each word, capitalizing the first letter and making the rest lowercase
  words = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words with a space to form the final string
  return words.join(" ");
};

/**
 * Splits a camelCase string into separate words
 * and capitalizes the first word
 */
export const camelCaseToTitleCase = (input: string): string => {
  // Split the input string into words based on camelCase
  const words = input.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  // Capitalize the first word and join the rest of the words
  const titleCaseWords = words.map((word, index) => {
    if (index === 0) {
      // Capitalize the first word
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.toLowerCase();
    }
  });

  // Join the words back into a single string
  return titleCaseWords.join(" ");
};

/**
 * Reverse func for camelCaseToTitleCase() func
 * Returns a string into a camelCase version
 */
export const titleCaseToCamelCase = (input: string): string => {
  const words = input.split(" ");

  // If there's only one word, return it in lowercase as is
  if (words.length === 1) {
    return words[0].toLowerCase();
  }

  // Capitalize the first word and convert the rest to camelCase
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toLowerCase() + word.slice(1);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Join the words together to create camelCase
  return camelCaseWords.join("");
};

export function capitalizeFirstLetterOfEachWord(input: string): string {
  return input
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export const isObject = (value: any) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
export const isArray = (value: any) => {
  return value instanceof Array;
};

export const isTouchDevice = () => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    return (
      window.hasOwnProperty("ontouchstart") || navigator.maxTouchPoints > 0
    );
  }
  return false;
};

export const formatNumber = (
  numb: number | string | null,
  decimals?: boolean,
  points?: number | string | null,
  pointsIfIsDecimal?: boolean
): string | null | number => {
  if (numb === null || numb === undefined || numb === "") {
    return null;
  }

  // Convert the input to a number if it's a string
  let number: string | number =
    typeof numb === "string" ? parseFloat(numb) : numb;

  // Handle invalid numbers
  if (isNaN(number)) {
    return null;
  }

  // If numb is of type number and decimals is false, apply thousand separators but keep the original decimal values
  if (typeof numb === "number" && !decimals) {
    let [integerPart, decimalPart] = number.toString().split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  }

  // Check if the points logic should only apply to decimals
  if (pointsIfIsDecimal) {
    const isDecimal = number % 1 !== 0; // Check if the number has a decimal part
    if (!isDecimal) {
      // Return the number formatted without applying decimal points
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }

  // Determine the number of decimal points, limited to a maximum of 20
  let decimalPlaces = 0;
  if (typeof points === "number") {
    decimalPlaces = Math.min(points, 20);
  } else if (typeof points === "string") {
    decimalPlaces = Math.min(parseInt(points, 10), 20);
  } else if (decimals) {
    decimalPlaces = 2; // Default to 2 decimal places if decimals is true and points is not specified
  }

  // Format the number to the specified decimal places
  number = number.toFixed(decimalPlaces);

  // Split the number into integer and decimal parts
  let [integerPart, decimalPart] = number.split(".");

  // Format the integer part with spaces as thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Combine the formatted integer part with the decimal part (if it exists)
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
};

export const getLongestStringLength = (strings: string[]): number => {
  if (strings.length === 0) {
    return 0;
  }

  let maxLength = 0;

  for (const str of strings) {
    if (str.length > maxLength) {
      maxLength = str.length;
    }
  }

  return maxLength;
};

export const parseSecondsToHMS = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
};

const snakeCaseToCamelCase = (str: string) =>
  str.includes("_") || /[A-Z]/.test(str)
    ? str
        .replace(/_([0-9])/g, (_, number) => number) // премахва долни черти преди цифри
        .replace(/_([a-zA-Z])/g, (_, letter) => letter.toUpperCase()) // променя буквите след долната черта на главни
        .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase()) // за избягване на Id -> id
    : str;

export const convertObjectKeysToCamelCase = (obj: Object): Object => {
  if (Array.isArray(obj)) {
    return obj.map(convertObjectKeysToCamelCase);
  }

  if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
      // Пропускаме обектите с ключ "rows"
      if (key === "rows" || key === "configuration" || key === "columns") {
        acc[key] = value; // Записваме го директно без промяна.
        return acc;
      }

      const newKey = snakeCaseToCamelCase(key); // Преобразуваме ключа.
      acc[newKey] = convertObjectKeysToCamelCase(value); // Рекурсивно обхождаме стойността.
      return acc;
    }, {});
  }

  return obj; // Ако е примитив, връщаме го непроменен.
};

// export const removeNullProperties = <T extends Record<string, any>>(obj: T): Partial<T> =>
//   Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null)) as Partial<T>;

// export const removeNullProperties = (
//   obj: TableGridConfiguration | undefined
// ): Partial<TableGridConfiguration> => {
//   if (!obj) return {}; // Handle undefined case
//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, value]) => value !== null)
//   ) as Partial<TableGridConfiguration>;
// };
