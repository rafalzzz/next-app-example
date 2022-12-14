import { Header } from "components/header";
import type { NextPage } from "next";
import Head from "next/head";

import { SignUpForm, Footer } from "sign-up/components";
import * as Styled from "./index.styled";

const Home: NextPage = () => {
  return (
    <Styled.Container>
      <Head>
        <title>Welcome to our app!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Styled.Main>
        <Header title="Sign in" />
        <SignUpForm />
        <Footer />
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
