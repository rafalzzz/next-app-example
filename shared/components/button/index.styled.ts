import styled from "styled-components";

export const Button = styled.button<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  color: ${(props) => props.theme.color.primary};
  font-weight: 300;
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
