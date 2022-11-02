import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSignInMutation } from "sign-in/api";
import { SignInFormKeys } from "sign-in/enums";
import { SignInRequest } from "sign-in/types";
import { setSignInRequestState } from "store/sign-in";
import {
  capitalizeFirstLetter,
  displayErrorMessage,
  generateMessageFieldIsRequired,
  removeUnderscore,
} from "helpers/.";
import { InputTypes, Paths, RequestState } from "enums/.";

const DEFAULT_VALUES = {
  [SignInFormKeys.LOGIN]: "",
  [SignInFormKeys.PASSWORD]: "",
};

export const useSignInFormData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({ defaultValues: DEFAULT_VALUES });

  const router = useRouter();
  const dispatch = useDispatch();

  const [signIn] = useSignInMutation();

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignInFormKeys.LOGIN,
      label: capitalizeFirstLetter(SignInFormKeys.LOGIN),
      placeholder: removeUnderscore(SignInFormKeys.LOGIN),
      register: register(SignInFormKeys.LOGIN, {
        required: generateMessageFieldIsRequired(SignInFormKeys.LOGIN),
      }),
      isValueIncorrect: !!errors[SignInFormKeys.LOGIN],
      error: errors[SignInFormKeys.LOGIN]?.message,
    },
    {
      type: InputTypes.PASSWORD,
      key: SignInFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignInFormKeys.PASSWORD),
      placeholder: removeUnderscore(SignInFormKeys.PASSWORD),
      register: register(SignInFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
      }),
      isValueIncorrect: !!errors[SignInFormKeys.PASSWORD],
      error: errors[SignInFormKeys.PASSWORD]?.message,
      passwordFieldProps: {
        showHyperlink: true,
      },
    },
  ];

  const onSubmit = async (formData: SignInRequest) => {
    dispatch(setSignInRequestState(RequestState.LOADING));
    signIn(formData)
      .unwrap()
      .then(({ message }) => {
        if (message) {
          dispatch(setSignInRequestState(RequestState.SUCCESS));
          router.push(Paths.MAIN);
        }
      })
      .catch((error) => {
        displayErrorMessage(error);
        dispatch(setSignInRequestState(RequestState.ERROR));
      });
  };

  return {
    formFields: FORM_FIELDS,
    onSubmit: handleSubmit(onSubmit),
  };
};
