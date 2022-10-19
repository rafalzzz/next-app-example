import Link from "next/link";
import { Routes } from "enums/.";
import * as Styled from "./index.styled";

type HyperlinkProps = {
  url: Routes;
  text: string;
  fontSize?: number;
};

export const Hyperlink = ({ url, text, fontSize = 1 }: HyperlinkProps) => (
  <Link href={url}>
    <Styled.Hyperlink fontSize={fontSize}>{text}</Styled.Hyperlink>
  </Link>
);
