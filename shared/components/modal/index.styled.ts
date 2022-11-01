import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(6px);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0px 3px 6px #00000029;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
  border-radius: 10px;
`;

export const ContentLine = styled.hr`
  width: 100%;
  color: ${(props) => props.theme.border.normal};
`;

export const ButtonsContainer = styled.div<{ showConfirmButton: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${({ showConfirmButton }) =>
    showConfirmButton ? "space-between" : "flex-start"};
`;
