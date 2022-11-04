import type { NextPage } from "next";
import { supabase } from "common/supabase";
import { useRedirectWhenUserSignIn } from "sign-in/hooks";
import { Paths } from "enums/paths";
import * as Styled from "./index.styled";

export const getServerSideProps = async () => {
  const { error } = await supabase.auth.getSession();

  if (error) {
    return {
      redirect: {
        destination: Paths.SIGN_IN,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  useRedirectWhenUserSignIn();

  return (
    <Styled.Container>
      <Styled.Main>
        <h1>Main page</h1>
      </Styled.Main>
    </Styled.Container>
  );
};

export default Home;
