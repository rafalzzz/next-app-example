import { useEffect, useRef } from "react";

type UseSetIntervalProps = {
  callback: () => void;
  interval: number;
};

export const useSetInterval = ({ callback, interval }: UseSetIntervalProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(callback, interval);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [callback, interval]);

  return { intervalRef };
};
