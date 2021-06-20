import React from "react";

type ButtonProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | { color: string };

// For this project I decided to give tailwind.css a try. Unfortunatelly, by the end of the project
// when I enabled the purge option (to remove any unused css classes) I realised that it can't handle dynamic classes
// As a "temporary fix" I statically added the css classes to the component so that PurgeCSS can see them.
const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${
        props.color === "red" ? "bg-red-600" : "bg-purple-600"
      } hover:bg-${props.color}-900 text-white py-2 px-4 m-4 rounded shadow-md`}
      {...props}
    />
  );
};

export default Button;
