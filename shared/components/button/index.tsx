import * as Styled from "./index.styled";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  text,
  onClick,
  color = "#6B6B6B",
  type = "button",
}: ButtonProps) => (
  <Styled.Button type={type} color={color} onClick={onClick}>
    {text}
  </Styled.Button>
);
