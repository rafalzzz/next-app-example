import { useAppDispatch, useAppSelector } from "hooks/.";
import { handleModal, selectModal } from "store/sign-up";
import { Modal, InputCode } from "components/.";
import * as Styled from "./index.styled";

export const PhoneVerificationModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpened = useAppSelector(selectModal);

  const onClose = () => {
    dispatch(handleModal(false));
  };

  const onClick = () => {
    console.log("request which check SMS code correctness");
  };

  return (
    <Modal
      isOpen={modalIsOpened}
      onClose={onClose}
      onClick={onClick}
      showConfirmButton={false}
    >
      <>
        <header>
          <Styled.Title>Confirm your phone number</Styled.Title>
        </header>
        <Styled.Main>
          <Styled.Text>Enter SMS code:</Styled.Text>
          <InputCode
            length={4}
            onComplete={(code) => {
              console.log({ code });
            }}
          />
        </Styled.Main>
      </>
    </Modal>
  );
};
