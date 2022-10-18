import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { handleModal, selectModal } from "store/sign-up";
import { Modal } from "components/modal";
import * as Styled from "./index.styled";
import { InputCode } from "components/input-code";

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
    <Modal isOpen={modalIsOpened} onClose={onClose} onClick={onClick}>
      <>
        <header>
          <Styled.Title>Confirm your phone number</Styled.Title>
        </header>
        <Styled.Main>
          <Styled.Text>Enter SMS code:</Styled.Text>
          <InputCode
            length={4}
            loading={false}
            onComplete={(code) => {
              console.log({ code });
            }}
          />
        </Styled.Main>
      </>
    </Modal>
  );
};
