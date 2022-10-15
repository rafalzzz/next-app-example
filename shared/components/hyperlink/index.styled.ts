import styled from "styled-components";

export const Hyperlink = styled.a<{ fontSize: number }>`
  color: ${(props) => props.theme.color.hyperlink};
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  text-decoration: underline;

  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;
