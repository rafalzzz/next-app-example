import * as Styled from "./index.styled";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <header>
    <Styled.Title>{title}</Styled.Title>
  </header>
);
