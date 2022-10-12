import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 0 10px 0;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

export const InputName = styled.span`
  margin: 10px 0;
`;

export const Input = styled.input<{ width?: number }>`
  padding: 10px;
  width: ${({ width }) => (width ? `${width}px` : "300px")};
  border: ${(props) => props.theme.border.normal};

  :focus,
  :hover {
    outline: none;
    border: ${(props) => props.theme.border.focus};
  }
`;

export const Button = styled.button`
  height: 38px;
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
