import { Header } from "components/header";
import type { NextPage } from "next";
import { Footer } from "components/footer";
import { SignUpForm, PageHead } from "features/sign-up/components";
import * as Styled from "../index.styled";
import { Routes } from "enums/routes";
import { Hyperlink } from "components/hyperlink";

const Home: NextPage = () => {
  return (
    <Styled.Container>
      <PageHead />
      <Styled.Main>
        <Header title="Sign-up to our app!" />
        <SignUpForm />
        <Footer
          title="Do you have an account?"
          child={<Hyperlink url={Routes.LANDING_PAGE} text="Sign in" />}
        />
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
