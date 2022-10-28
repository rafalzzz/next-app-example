import { useCallback } from "react";
import { displayErrorMessage } from "helpers/display-error-message";
import { useAppDispatch, useAppSelector } from "hooks/.";
import {
  handleModal,
  selectModal,
  selectPhoneNumber,
  selectVerifyPhoneNumberRequestState,
  setVerifyPhoneNumberRequestState,
} from "store/sign-up";
import { toggleModal } from "store/modal";
import { useVerifyPhoneNumberMutation } from "api/sign-up";
import { Modal, InputCode } from "components/.";
import { RequestState } from "enums/request-state";
import * as Styled from "./index.styled";

export const PhoneVerificationModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpened = useAppSelector(selectModal);

  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();

  const phoneNumber = useAppSelector(selectPhoneNumber);
  const verifyPhoneNumberRequestState = useAppSelector(selectVerifyPhoneNumberRequestState);

  const requestIsNotPending = verifyPhoneNumberRequestState === RequestState.LOADING;

  const onCancel = useCallback(() => {
    if (!requestIsNotPending) {
      dispatch(handleModal(false));
    }
  }, [requestIsNotPending, dispatch]);

  const onCompleted = useCallback(
    (code: string) => {
      dispatch(setVerifyPhoneNumberRequestState(RequestState.LOADING));
      verifyPhoneNumber({ code, phone_number: phoneNumber })
        .unwrap()
        .then(({ message }) => {
          if (message) {
            dispatch(setVerifyPhoneNumberRequestState(RequestState.SUCCESS));
            dispatch(toggleModal());
          }
        })
        .catch((error) => {
          displayErrorMessage(error);
          dispatch(setVerifyPhoneNumberRequestState(RequestState.ERROR));
        });
    },
    [dispatch, phoneNumber, verifyPhoneNumber]
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
          {requestIsNotPending && <span>Loading ...</span>}
        </Styled.Main>
      </>
    </Modal>
  );
};
