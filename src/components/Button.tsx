interface PropsButton {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ text, className, onClick, disabled }: PropsButton) => {
  return (
    <button
      type="submit"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
