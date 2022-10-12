import styled from "styled-components";

export const Hyperlink = styled.a`
  color: ${(props) => props.theme.color.hyperlink};
  text-decoration: underline;

  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;
