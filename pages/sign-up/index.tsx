import { Footer, Header, Hyperlink } from "components/.";
import type { NextPage } from "next";
import {
  PageHead,
  PhoneVerificationModal,
  SignUpForm,
} from "sign-up/components";
import { Routes } from "enums/.";
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
