import styled from "styled-components";
import { PatternFormat } from "react-number-format";

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 0 10px 0;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`;

export const InputName = styled.span`
  margin: 10px 0;
`;

export const Error = styled.div<{ marginBottom?: number }>`
  font-size: 0.7rem;
  color: ${(props) => props.theme.color.error};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : 0)};
`;

export const Input = styled.input<{ width?: number }>`
  padding: 10px;
  width: ${({ width }) => (width ? `${width}px` : "300px")};
  border: ${(props) => props.theme.border.normal};

  :focus,
  :hover {
    outline: none;
    border: ${(props) => props.theme.border.hover};
  }
`;

export const NumberInputWithMask = styled(PatternFormat)<{ width?: number }>`
  padding: 10px;
  width: ${({ width }) => (width ? `${width}px` : "300px")};
  border: ${(props) => props.theme.border.normal};

  :focus,
  :hover {
    outline: none;
    border: ${(props) => props.theme.border.hover};
  }
`;

export const Button = styled.button`
  height: 37px;
  width: 50px;
  border-radius: 0 10px 10px 0;
  border: none;
  outline: none;

  :active {
    border: none;
  }

  :hover {
    cursor: pointer;
  }
`;
