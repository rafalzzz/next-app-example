import type { NextPage } from "next";

import { SignInForm, Footer, PageHead } from "features/sign-in/components";
import { Header } from "components/header";
import { Hyperlink } from "components/hyperlink";
import { Routes } from "enums/routes";
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
