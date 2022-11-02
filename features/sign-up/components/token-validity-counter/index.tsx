import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { toggleModal } from "store/modal";
import {
  selectSignUpState,
  setClearSignUpData,
  setCountdownTokenValidityTime,
} from "store/sign-up";
import { useAppDispatch, useAppSelector, useSetInterval } from "hooks/.";

const ONE_SECOND_IN_MILIS = 1000;

export const TokenValidityCounter = () => {
  const dispatch = useAppDispatch();
  const { tokenValidityTime } = useAppSelector(selectSignUpState);

  const callback = useCallback(() => {
    if (tokenValidityTime) {
      dispatch(setCountdownTokenValidityTime());
    }
  }, [tokenValidityTime, dispatch]);

  useSetInterval({ callback, interval: ONE_SECOND_IN_MILIS });

  useEffect(() => {
    if (!tokenValidityTime) {
      dispatch(toggleModal());
      dispatch(setClearSignUpData());
      toast.info("Your token has been expired - please try again later");
    }
  }, [tokenValidityTime, dispatch]);

  return (
    <>
      Token expires in {tokenValidityTime}{" "}
      {tokenValidityTime > 2 ? "seconds." : "second."}
    </>
  );
};
