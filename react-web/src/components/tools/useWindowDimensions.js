// Listens for window dimension updates

import { useEffect, useState } from "react";

const initialWindowDimensions = { width: undefined, height: undefined };

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    initialWindowDimensions
  );
  useEffect(() => {
    function handleUpdate() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleUpdate);
    handleUpdate();

    return () => window.removeEventListener("resize", handleUpdate);
  }, []);
  return windowDimensions;
}
