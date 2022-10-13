import type { NextPage } from "next";
import Head from "next/head";

import * as Styled from "./index.styled";

const NotFound: NextPage = () => {
  return (
    <Styled.Container>
      <Head>
        <title>Page not found</title>
      </Head>
      <Styled.Main>
        <h1>Page not found.</h1>
      </Styled.Main>
    </Styled.Container>
  );
};

export default NotFound;
