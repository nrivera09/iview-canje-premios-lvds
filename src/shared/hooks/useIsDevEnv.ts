import { useMemo } from "react";

export const useIsDevEnv = (): boolean => {
  return useMemo(() => {
    if (typeof window === "undefined") return false;

    const isLocal =
      process.env.NODE_ENV === "development" ||
      ["localhost", "127.0.0.1"].includes(window.location.hostname);

    const isNetlify = window.location.hostname.includes(".netlify");

    return isLocal || isNetlify;
  }, []);
};
