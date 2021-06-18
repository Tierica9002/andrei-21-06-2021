import React from "react";

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
