import { Footer, Header, Hyperlink } from "components/.";
import type { NextPage } from "next";
import { SignInForm } from "sign-in/components";
import { useRedirectWhenUserSignIn } from "sign-in/hooks";
import { PageHead } from "sign-up/components";
import { Paths } from "enums/.";
import * as Styled from "../index.styled";

const SignIn: NextPage = () => {
  useRedirectWhenUserSignIn();

  return (
    <Styled.Container>
      <PageHead />
      <Styled.Main>
        <Header title="Sign in" />
        <SignInForm />
        <Footer
          title="Don't you have an account yet?"
          child={
            <>
              Go to <Hyperlink url={Paths.SIGN_UP} text="registration" />
            </>
          }
        />
      </Styled.Main>
    </Styled.Container>
  );
};

export default SignIn;
