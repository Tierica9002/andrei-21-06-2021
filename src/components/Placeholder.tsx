interface PlaceHolderProps {
  className?: string;
  text: string;
}

const PlaceHolder = ({
  className = "",
  text,
}: PlaceHolderProps): JSX.Element => {
  return (
    <div
      className={`flex justify-center items-center text-white ${
        className ? className : ""
      }`}
    >
      <p>{text}</p>
    </div>
  );
};

export default PlaceHolder;
