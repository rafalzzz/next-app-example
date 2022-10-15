import { Header } from "components/header";
import type { NextPage } from "next";

import { SignUpForm, Footer, PageHead } from "features/sign-up/components";
import * as Styled from "../index.styled";

const Home: NextPage = () => {
  return (
    <Styled.Container>
      <PageHead />
      <Styled.Main>
        <Header title="Sign-up to our app!" />
        <SignUpForm />
        <Footer />
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
