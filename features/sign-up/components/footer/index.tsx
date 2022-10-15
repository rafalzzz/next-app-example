import { Hyperlink } from "components/hyperlink";
import { Routes } from "enums/routes";
import * as Styled from "./index.styled";

export const Footer = () => (
  <Styled.Footer>
    <Styled.FooterTitle>Do you have an account?</Styled.FooterTitle>
    <Styled.FooterSubTitle>
      <Hyperlink url={Routes.LANDING_PAGE} text="Sign in" />!
    </Styled.FooterSubTitle>
  </Styled.Footer>
);
