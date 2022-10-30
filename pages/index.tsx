import { Footer, Header, Hyperlink } from "components/.";
import type { NextPage } from "next";
import { PageHead, SignInForm } from "sign-in/components";
import { Routes } from "enums/.";
import * as Styled from "./index.styled";

const Home: NextPage = () => {
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
              Go to <Hyperlink url={Routes.SIGN_UP} text="registration" />
            </>
          }
        />
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
