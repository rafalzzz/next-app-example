import styled from "styled-components";

export const Button = styled.button<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  min-width: 50px;
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => props.theme.border.normal};

  :active,
  :focus,
  :hover {
    outline: none;
    border: ${(props) => props.theme.border.hover};
    cursor: pointer;
  }
`;
