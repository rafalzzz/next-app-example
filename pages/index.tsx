import { Header } from "components/header";
import type { NextPage } from "next";

import { SignInForm, Footer, PageHead } from "features/sign-in/components";
import * as Styled from "./index.styled";

const Home: NextPage = () => {
  return (
    <Styled.Container>
      <PageHead />
      <Styled.Main>
        <Header title="Sign in" />
        <SignInForm />
        <Footer />
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
