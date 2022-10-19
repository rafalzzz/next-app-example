import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "components/button";
import * as Styled from "./index.styled";

type ModalProps = {
  isOpen: boolean;
  children: JSX.Element;
  onClick: () => void;
  onClose: () => void;
  showConfirmButton?: boolean;
};

export const Modal = ({
  isOpen,
  children,
  onClick,
  onClose,
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
        <Styled.Container isOpen={isOpen} onClick={onClose}>
          <Styled.Content onClick={(e) => e.stopPropagation()}>
            {children}
            <Styled.ContentLine />
            <Styled.ButtonsContainer showConfirmButton>
              <Button onClick={onClose} text="Close" />
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
