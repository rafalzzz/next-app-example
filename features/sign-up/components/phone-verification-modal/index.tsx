import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/.";
import {
  handleModal,
  selectModal,
  selectPhoneNumber,
  selectVerifyPhoneNumberRequestState,
} from "store/sign-up";
import { useVerifyPhoneNumberMutation } from "api/sign-up";
import { Modal, InputCode } from "components/.";
import * as Styled from "./index.styled";
import { RequestState } from "enums/request-state";

export const PhoneVerificationModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpened = useAppSelector(selectModal);

  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();

  const phoneNumber = useAppSelector(selectPhoneNumber);
  const verifyPhoneNumberRequestState = useAppSelector(
    selectVerifyPhoneNumberRequestState
  );

  const requestIsNotPending =
    verifyPhoneNumberRequestState === RequestState.LOADING;

  const onCancel = useCallback(() => {
    if (!requestIsNotPending) {
      dispatch(handleModal(false));
    }
  }, [requestIsNotPending, dispatch]);

  const onCompleted = useCallback(
    (code: string) => {
      verifyPhoneNumber({ code, phone_number: phoneNumber });
    },
    [phoneNumber, verifyPhoneNumber]
  );

  return (
    <Modal isOpen={modalIsOpened} onCancel={onCancel} showConfirmButton={false}>
      <>
        <header>
          <Styled.Title>Confirm your phone number</Styled.Title>
        </header>
        <Styled.Main>
          <Styled.Text>Enter SMS code:</Styled.Text>
          <InputCode length={4} onComplete={onCompleted} />
        </Styled.Main>
      </>
    </Modal>
  );
};
