import React from "react";

type ButtonProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | { color: string };

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={`bg-${props.color}-600 hover:bg-${props.color}-900 text-white py-2 px-4 rounded shadow-md`}
      {...props}
    />
  );
};

export default Button;
