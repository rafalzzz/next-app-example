import Link from "next/link";

import { Routes } from "enums/routes";
import * as Styled from "./index.styled";

type HyperlinkProps = {
  url: Routes;
  text: string;
};

export const Hyperlink = ({ url, text }: HyperlinkProps) => (
  <Link href={url}>
    <Styled.Hyperlink>{text}</Styled.Hyperlink>
  </Link>
);
