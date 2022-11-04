import { Footer, Header, Hyperlink } from "components/.";
import type { NextPage } from "next";
import {
  PageHead,
  PhoneVerificationModal,
  SignUpForm,
} from "sign-up/components";
import { useRedirectWhenUserSignUp } from "sign-up/hooks";
import { selectModalIsOpen } from "store/modal";
import { useAppSelector } from "hooks/redux-hooks";
import { Paths } from "enums/.";
import * as Styled from "../index.styled";

const SignUp: NextPage = () => {
  useRedirectWhenUserSignUp();

  const modalIsOpened = useAppSelector(selectModalIsOpen);

  return (
    <Styled.Container>
      <PageHead />
      <Styled.Main>
        <Header title="Sign-up to our app!" />
        <SignUpForm />
        <Footer
          title="Do you have an account?"
          child={<Hyperlink url={Paths.SIGN_IN} text="Sign in" />}
        />
      </Styled.Main>
      {modalIsOpened && <PhoneVerificationModal />}
    </Styled.Container>
  );
};

export default SignUp;
