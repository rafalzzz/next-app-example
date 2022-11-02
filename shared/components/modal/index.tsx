import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "components/.";
import * as Styled from "./index.styled";

type ModalProps = {
  children: JSX.Element;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  onClick?: () => void;
  onCancel?: () => void;
};

export const Modal = ({
  children,
  onClick,
  onCancel,
  showConfirmButton = true,
  showCancelButton = true,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [mounted]);

  return mounted
    ? createPortal(
        <Styled.Container onClick={onCancel}>
          <Styled.Content onClick={(e) => e.stopPropagation()}>
            {children}
            {(showConfirmButton || showCancelButton) && <Styled.ContentLine />}
            <Styled.ButtonsContainer showConfirmButton>
              {showCancelButton && <Button onClick={onCancel} text="Close" />}
              {showConfirmButton && (
                <Button onClick={onClick} color="green" text="Confirm" />
              )}
            </Styled.ButtonsContainer>
          </Styled.Content>
        </Styled.Container>,
        document.body
      )
    : null;
};
