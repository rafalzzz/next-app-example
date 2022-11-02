import { useCallback } from "react";
import { InputCode, Modal } from "components/.";
import { useSignUpMutation } from "sign-up/api";
import { selectModalIsOpen } from "store/modal";
import { selectSignUpState } from "store/sign-up";
import { useAppSelector } from "hooks/.";
import { RequestState } from "enums/request-state";
import { TokenValidityCounter } from "../token-validity-counter";
import * as Styled from "./index.styled";

export const PhoneVerificationModal = () => {
  const modalIsOpened = useAppSelector(selectModalIsOpen);
  const { signUpFormValues, signUpRequestState } =
    useAppSelector(selectSignUpState);

  const requestIsPending = signUpRequestState === RequestState.LOADING;

  const [signUp] = useSignUpMutation();

  const onCompleted = useCallback(
    (token: string) => {
      if (token && signUpFormValues) {
        const { first_name, last_name, phone, password } = signUpFormValues;
        signUp({
          user_data: {
            first_name,
            last_name,
            phone,
            password,
          },
          token,
        });
      }
    },
    [signUpFormValues, signUp]
  );

  return (
    <Modal showCancelButton={false} showConfirmButton={false}>
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
          <TokenValidityCounter />
        </Styled.Main>
      </>
    </Modal>
  );
};
