import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { selectSignUpRequestState, setSignUpRequestState } from "store/sign-up";
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
      router.push(Paths.SIGN_IN);
    }

    return () => {
      dispatch(setSignUpRequestState(RequestState.IDLE));
    };
  }, [dispatch, requestIsSuccess, router]);
};
