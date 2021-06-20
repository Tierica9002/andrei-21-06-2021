import React from "react";
import { debounce } from "utils/index";

export const useSafeDispatch = (dispatch: any) => {
  const mounted = React.useRef(false);
  React.useLayoutEffect((): (() => void) => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);
  return React.useCallback(
    (...args: unknown[]) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
};

const MAX_MOBILE_WIDTH = 767;

export const useResize = (): boolean => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const resizeHandler = debounce(() => {
      if (window.innerWidth < MAX_MOBILE_WIDTH) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 200);

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return isMobile;
};
