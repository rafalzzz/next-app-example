import * as Styled from "./index.styled";

type FooterProps = { title: string; child: JSX.Element };

export const Footer = ({ title, child }: FooterProps) => (
  <Styled.Footer>
    <Styled.FooterTitle>{title}</Styled.FooterTitle>
    <Styled.FooterSubTitle>{child}</Styled.FooterSubTitle>
  </Styled.Footer>
);
