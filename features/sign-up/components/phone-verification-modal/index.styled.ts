import styled from "styled-components";

export const Container = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(6px);
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.text.primary};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.text.primary};
`;
