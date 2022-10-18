import * as Styled from "./index.styled";

type ButtonProps = {
  text: string;
  onClick: () => void;
  color?: string;
};

export const Button = ({ text, color = "#6B6B6B", onClick }: ButtonProps) => (
  <Styled.Button type="button" color={color} onClick={onClick}>
    {text}
  </Styled.Button>
);
