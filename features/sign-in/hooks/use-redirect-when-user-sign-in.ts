import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { selectSignInRequestState, setSignInRequestState } from "store/sign-in";
import { useAppSelector } from "hooks/redux-hooks";
import { Paths } from "enums/paths";
import { RequestState } from "enums/request-state";

export const useRedirectWhenUserSignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const signInRequestState = useAppSelector(selectSignInRequestState);
  const requestIsSuccess = signInRequestState === RequestState.SUCCESS;

  useEffect(() => {
    if (requestIsSuccess) {
      router.push(Paths.MAIN);
      dispatch(setSignInRequestState(RequestState.IDLE));
    }
  }, [dispatch, requestIsSuccess, router]);
};
