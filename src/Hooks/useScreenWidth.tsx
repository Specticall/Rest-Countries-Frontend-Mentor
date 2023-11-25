import { useEffect, useState } from "react";

/**
 * Adds an event listener to "subscribe" screen size change events (resize)
 * @returns A value which represents the current viewport width.
 */
export function useScreenWidth(): number {
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  const onResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return screenWidth;
}
