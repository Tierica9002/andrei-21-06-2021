import React from "react";

interface DropdownProps {
  options: string[];
  prefix?: string;
  onChange?: (val: string) => void;
  selectedOption: string;
}

const Dropdown = ({
  options,
  onChange,
  selectedOption,
  prefix = "",
}: DropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative z-50 inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {prefix}
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1 cursor-pointer" role="none">
            {options.map((option) => (
              <div
                key={option}
                className="text-white px-4 py-2 text-sm text-right"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => {
                  onChange && onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
