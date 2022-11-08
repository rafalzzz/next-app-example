import * as Styled from "./index.styled";

type ButtonProps = {
  text: string;
  color?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  testId?: string;
};

export const Button = ({
  text,
  color = "#6B6B6B",
  type = "button",
  disabled = false,
  testId = "",
  onClick,
}: ButtonProps) => (
  <Styled.Button
    type={type}
    color={color}
    disabled={disabled}
    onClick={onClick}
    data-testid={`${testId}-button`}
  >
    {text}
  </Styled.Button>
);
