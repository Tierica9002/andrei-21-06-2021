import React from "react";

interface ProgressBarContainerInterface {
  progress?: number;
  direction?: "rtl" | "ltr";
  color: "red" | "green";
  children: React.ReactNode;
}

const ProgressBarContainer = ({
  progress = 0,
  direction = "ltr",
  color,
  children,
}: ProgressBarContainerInterface): JSX.Element => {
  const container = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (container && container.current) {
      setWidth(container.current.offsetWidth * (progress / 100));
    } else {
      setWidth(0);
    }
  }, [container.current]);

  const cssDirection = direction === "ltr" ? "left-0" : "right-0";
  const cssColor = `bg-${color}-300`;

  return (
    <div ref={container} className="relative w-100 h-5">
      <div className="relative z-10">{children}</div>
      <div
        style={{
          width:
            container && container.current
              ? container.current.offsetWidth * (progress / 100)
              : 0,
        }}
        className={`${cssDirection} ${cssColor} absolute top-0 z-indez-0 w-0 h-5`}
      ></div>
    </div>
  );
};

export default ProgressBarContainer;

37648;
400152;
22959720;
37637;
23958;
22983678;
37632;
544944;
23528622;
37629.5;
434380;
23963002;
37626;
25115;
23988117;
37625.5;
358791;
24346908;
37622.5;
47999;
24394907;
37619;
47999;
24442906;
37614.5;
25123;
24468029;
37606;
696002;
25164031;
37605.5;
470063;
25634094;
37582;
696002;
26330096;
37581.5;
362860;
26692956;
37581;
25148;
26718104;
37580.5;
696002;
27414106;
37580;
450171;
