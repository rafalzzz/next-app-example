import { useCallback } from "react";
import { InputCode, Modal } from "components/.";
import { useSignUpMutation } from "sign-up/api";
import { selectModalIsOpen, toggleModal } from "store/modal";
import {
  selectSignUpFormValues,
  selectSignUpRequestState,
} from "store/sign-up";
import { useAppDispatch, useAppSelector } from "hooks/.";
import { RequestState } from "enums/request-state";
import * as Styled from "./index.styled";

export const PhoneVerificationModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpened = useAppSelector(selectModalIsOpen);

  const [signUp] = useSignUpMutation();

  const signUpFormValues = useAppSelector(selectSignUpFormValues);
  const signUpRequestState = useAppSelector(selectSignUpRequestState);

  const requestIsPending = signUpRequestState === RequestState.LOADING;

  const onCancel = useCallback(() => {
    if (!requestIsPending) {
      dispatch(toggleModal());
    }
  }, [requestIsPending, dispatch]);

  const onCompleted = useCallback(
    (code: string) => {
      if (code && signUpFormValues) {
        signUp({ user_data: signUpFormValues, code });
      }
    },
    [signUpFormValues, signUp]
  );

  return (
    <Modal onCancel={onCancel} showConfirmButton={false}>
      <>
        <header>
          <Styled.Title>Confirm your phone number</Styled.Title>
        </header>
        <Styled.Main>
          <Styled.Text>Enter SMS code:</Styled.Text>
          <InputCode
            length={6}
            loading={requestIsPending}
            focusOnFirstInput={modalIsOpened}
            onComplete={onCompleted}
          />
        </Styled.Main>
      </>
    </Modal>
  );
};
