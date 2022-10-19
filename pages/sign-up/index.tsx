import type { NextPage } from "next";
import {
  SignUpForm,
  PageHead,
  PhoneVerificationModal,
} from "sign-up/components";
import { Header, Footer, Hyperlink } from "components/.";
import { Routes } from "enums/routes";
import * as Styled from "../index.styled";

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
      <PhoneVerificationModal />
    </Styled.Container>
  );
};

export default Home;
