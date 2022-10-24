import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "components/.";
import * as Styled from "./index.styled";

type ModalProps = {
  isOpen: boolean;
  children: JSX.Element;
  onCancel: () => void;
  showConfirmButton?: boolean;
  onClick?: () => void;
};

export const Modal = ({
  isOpen,
  children,
  onClick,
  onCancel,
  showConfirmButton = true,
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
        <Styled.Container isOpen={isOpen} onClick={onCancel}>
          <Styled.Content onClick={(e) => e.stopPropagation()}>
            {children}
            <Styled.ContentLine />
            <Styled.ButtonsContainer showConfirmButton>
              <Button onClick={onCancel} text="Close" />
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
