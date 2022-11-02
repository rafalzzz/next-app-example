import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { selectSignUpRequestState, setClearSignUpData } from "store/sign-up";
import { useAppSelector } from "hooks/redux-hooks";
import { Paths } from "enums/paths";
import { RequestState } from "enums/request-state";

export const useRedirectWhenUserSignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const signUpRequestState = useAppSelector(selectSignUpRequestState);
  const requestIsSuccess = signUpRequestState === RequestState.SUCCESS;

  useEffect(() => {
    if (requestIsSuccess) {
      dispatch(setClearSignUpData());
      router.push(Paths.SIGN_IN);
    }
  }, [dispatch, requestIsSuccess, router]);
};
