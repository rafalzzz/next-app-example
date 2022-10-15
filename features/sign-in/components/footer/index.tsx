import { Hyperlink } from "components/hyperlink";
import { Routes } from "enums/routes";
import * as Styled from "./index.styled";

export const Footer = () => (
  <Styled.Footer>
    <Styled.FooterTitle>Don&apos;t you have an account yet?</Styled.FooterTitle>
    <Styled.FooterSubTitle>
      Go to <Hyperlink url={Routes.REGISTRATION} text="registration" />.
    </Styled.FooterSubTitle>
  </Styled.Footer>
);
