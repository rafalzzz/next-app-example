import Link from "next/link";
import { Paths } from "enums/.";
import * as Styled from "./index.styled";

type HyperlinkProps = {
  url: Paths;
  text: string;
  fontSize?: number;
  testId?: string;
};

export const Hyperlink = ({
  url,
  text,
  fontSize = 1,
  testId = "",
}: HyperlinkProps) => (
  <Link href={url} data-testid={`${testId}-hyperlink`}>
    <Styled.Hyperlink fontSize={fontSize}>{text}</Styled.Hyperlink>
  </Link>
);
