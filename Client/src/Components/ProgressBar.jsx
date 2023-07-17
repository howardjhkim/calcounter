import { useEffect, useRef } from 'react';

const useProgressBar = (macroName, endValue, setMacroPercent) => {
  const prevEndValueRef = useRef(endValue);

  useEffect(() => {
    if (prevEndValueRef.current !== endValue) {
      let speed = 12;
      const progress = setInterval(() => {
        setMacroPercent((prevValue) => {
          const nextValue =
            prevValue[macroName] < endValue ? prevValue[macroName] + 1 : prevValue[macroName] - 1;
          if (nextValue === endValue) {
            clearInterval(progress);
          }
          return {
            ...prevValue,
            [macroName]: nextValue,
          };
        });
      }, speed);

      prevEndValueRef.current = endValue;

      return () => clearInterval(progress);
    }
  }, [endValue, macroName, setMacroPercent]);
};

export default useProgressBar;