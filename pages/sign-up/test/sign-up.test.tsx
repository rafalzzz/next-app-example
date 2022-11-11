import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitFor } from "@testing-library/react";
import { setupStore } from "store";
import { mockedPushMethod, renderWithProviders } from "test-utils/.";
import { signUpApi } from "sign-up/api";
import * as C from "sign-up/consts/messages";
import { CORRECT_PHONE } from "sign-up/consts/mocked_sign-up_data";
import { SignUpFormKeys } from "sign-up/enums";
import { server } from "sign-up/test-utils/server";
import { initialState } from "store/sign-up";
import { Paths } from "enums/paths";
import { RequestState } from "enums/request-state";
import { INPUT_CODE_ID_COMMON_PART } from "consts/components-test-ids";
import { SIGN_UP } from "consts/form-test-ids";
import SignUp from "..";

const FIRST_NAME_INPUT_TEST_ID = `${SignUpFormKeys.FIRST_NAME}-input`;
const LAST_NAME_INPUT_TEST_ID = `${SignUpFormKeys.LAST_NAME}-input`;
const EMAIL_INPUT_TEST_ID = `${SignUpFormKeys.EMAIL}-input`;
const PHONE_NUMBER_INPUT_TEST_ID = `${SignUpFormKeys.PHONE_NUMBER}-input`;
const PASSWORD_INPUT_TEST_ID = `${SignUpFormKeys.PASSWORD}-input`;
const CONFIRM_PASSWORD_INPUT_TEST_ID = `${SignUpFormKeys.CONFIRM_PASSWORD}-input`;
const FORM_BUTTON_TEST_ID = `${SIGN_UP}-button`;
const FIRST_NAME_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.FIRST_NAME}-error`;
const LAST_NAME_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.LAST_NAME}-error`;
const EMAIL_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.EMAIL}-error`;
const PHONE_NUMBER_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.PHONE_NUMBER}-error`;
const PASSWORD_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.PASSWORD}-error`;
const CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID = `${SignUpFormKeys.CONFIRM_PASSWORD}-error`;
const INPUT_CODE_IDS = Array.from(Array(6).keys()).map(
  (value: number) => `${SIGN_UP}-${INPUT_CODE_ID_COMMON_PART}-${value}`
);

const preloadedState = {
  signUp: {
    ...initialState,
    _persist: { version: 1, rehydrated: false },
    sendVerificationCodeRequestState: RequestState.SUCCESS,
    signUpFormValues: {
      [SignUpFormKeys.FIRST_NAME]: "Test",
      [SignUpFormKeys.LAST_NAME]: "Test",
      [SignUpFormKeys.EMAIL]: "test@test.com",
      [SignUpFormKeys.PHONE_NUMBER]: "48111111111",
      [SignUpFormKeys.PASSWORD]: "test1234",
      [SignUpFormKeys.CONFIRM_PASSWORD]: "test1234",
    },
  },
  modal: {
    _persist: { version: 1, rehydrated: false },
    isOpen: true,
  },
};

const store = setupStore({});

describe("Sign-up page", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(signUpApi.util.resetApiState());
  });

  afterAll(() => {
    server.close();
  });

  it("should render SignUp form elements correctly", async () => {
    const { queryByTestId } = renderWithProviders(<SignUp />);

    const firstNameInput = queryByTestId(FIRST_NAME_INPUT_TEST_ID);
    const lastNameInput = queryByTestId(LAST_NAME_INPUT_TEST_ID);
    const emailInput = queryByTestId(EMAIL_INPUT_TEST_ID);
    const phoneNumberInput = queryByTestId(PHONE_NUMBER_INPUT_TEST_ID);
    const passwordInput = queryByTestId(PASSWORD_INPUT_TEST_ID);
    const confirmPasswordInput = queryByTestId(CONFIRM_PASSWORD_INPUT_TEST_ID);
    const formButton = queryByTestId(FORM_BUTTON_TEST_ID);
    const firstNameError = queryByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = queryByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = queryByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = queryByTestId(PHONE_NUMBER_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = queryByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    expect(formButton).toBeInTheDocument();
    expect(formButton).toBeEnabled();

    expect(firstNameError).not.toBeInTheDocument();
    expect(lastNameError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(phoneNumberError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
    expect(confirmPasswordError).not.toBeInTheDocument();
  });

  it("show errors when inputs are not filled and user submit form", async () => {
    const { findByTestId } = renderWithProviders(<SignUp />);

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    fireEvent.click(formButton);

    const firstNameError = await findByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = await findByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = await findByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = await findByTestId(
      PHONE_NUMBER_INPUT_ERROR_TEST_ID
    );
    const passwordError = await findByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = await findByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    expect(formButton).toBeEnabled();
    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(phoneNumberError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(confirmPasswordError).toBeInTheDocument();
  });

  it("display errors when input values are incorrect", async () => {
    const { findByTestId } = renderWithProviders(<SignUp />);

    const firstNameInput = await findByTestId(FIRST_NAME_INPUT_TEST_ID);
    const lastNameInput = await findByTestId(LAST_NAME_INPUT_TEST_ID);
    const emailInput = await findByTestId(EMAIL_INPUT_TEST_ID);
    const phoneNumberInput = await findByTestId(PHONE_NUMBER_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);
    const confirmPasswordInput = await findByTestId(
      CONFIRM_PASSWORD_INPUT_TEST_ID
    );

    fireEvent.change(firstNameInput, { target: { value: "#" } });
    fireEvent.change(lastNameInput, { target: { value: "#" } });
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(phoneNumberInput, { target: { value: "123" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "test1" } });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    fireEvent.click(formButton);

    const firstNameError = await findByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = await findByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = await findByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = await findByTestId(
      PHONE_NUMBER_INPUT_ERROR_TEST_ID
    );
    const passwordError = await findByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = await findByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    await waitFor(() => {
      expect(formButton).toBeEnabled();
      expect(firstNameError).toBeInTheDocument();
      expect(firstNameError).toHaveTextContent(C.INVALID_FIRST_NAME_MESSAGE);
      expect(lastNameError).toBeInTheDocument();
      expect(lastNameError).toHaveTextContent(C.INVALID_LAST_NAME_MESSAGE);
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent(C.INVALID_EMAIL_MESSAGE);
      expect(phoneNumberError).toBeInTheDocument();
      expect(phoneNumberError).toHaveTextContent(C.INVALID_PHONE_MESSAGE);
      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent(C.SHORT_PASSWORD_MESSAGE);
      expect(confirmPasswordError).toBeInTheDocument();
      expect(confirmPasswordError).toHaveTextContent(
        C.PASSWORD_DOES_NOT_MATCH_MESSAGE
      );
    });
  });

  it("disable submit button when sendVerificationCode request is pending", async () => {
    const { findByTestId, queryByTestId } = renderWithProviders(<SignUp />);

    const firstNameInput = await findByTestId(FIRST_NAME_INPUT_TEST_ID);
    const lastNameInput = await findByTestId(LAST_NAME_INPUT_TEST_ID);
    const emailInput = await findByTestId(EMAIL_INPUT_TEST_ID);
    const phoneNumberInput = await findByTestId(PHONE_NUMBER_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);
    const confirmPasswordInput = await findByTestId(
      CONFIRM_PASSWORD_INPUT_TEST_ID
    );

    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: "Test" } });
      fireEvent.change(lastNameInput, { target: { value: "Test" } });
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(phoneNumberInput, { target: { value: CORRECT_PHONE } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const firstNameError = queryByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = queryByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = queryByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = queryByTestId(PHONE_NUMBER_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = queryByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    await waitFor(
      () => {
        expect(formButton).toBeDisabled();
        expect(firstNameError).not.toBeInTheDocument();
        expect(lastNameError).not.toBeInTheDocument();
        expect(emailError).not.toBeInTheDocument();
        expect(phoneNumberError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
        expect(confirmPasswordError).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it("display toast with error when sendVerificationCode request is failed", async () => {
    const { findByTestId, findByText, queryByTestId } = renderWithProviders(
      <SignUp />
    );

    const firstNameInput = await findByTestId(FIRST_NAME_INPUT_TEST_ID);
    const lastNameInput = await findByTestId(LAST_NAME_INPUT_TEST_ID);
    const emailInput = await findByTestId(EMAIL_INPUT_TEST_ID);
    const phoneNumberInput = await findByTestId(PHONE_NUMBER_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);
    const confirmPasswordInput = await findByTestId(
      CONFIRM_PASSWORD_INPUT_TEST_ID
    );

    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: "Test" } });
      fireEvent.change(lastNameInput, { target: { value: "Test" } });
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(phoneNumberInput, {
        target: { value: "111111112" },
      });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const firstNameError = queryByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = queryByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = queryByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = queryByTestId(PHONE_NUMBER_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = queryByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    const toastError = await findByText(
      C.PHONE_NUMBER_IS_ALREADY_TAKEN_MESSAGE
    );

    await waitFor(() => {
      expect(firstNameError).not.toBeInTheDocument();
      expect(lastNameError).not.toBeInTheDocument();
      expect(emailError).not.toBeInTheDocument();
      expect(phoneNumberError).not.toBeInTheDocument();
      expect(passwordError).not.toBeInTheDocument();
      expect(confirmPasswordError).not.toBeInTheDocument();
      expect(toastError).toBeInTheDocument();
    });
  });

  it("display Modal when sendVerificationCode request is success", async () => {
    const { findByTestId, queryByTestId } = renderWithProviders(<SignUp />);

    const firstNameInput = await findByTestId(FIRST_NAME_INPUT_TEST_ID);
    const lastNameInput = await findByTestId(LAST_NAME_INPUT_TEST_ID);
    const emailInput = await findByTestId(EMAIL_INPUT_TEST_ID);
    const phoneNumberInput = await findByTestId(PHONE_NUMBER_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);
    const confirmPasswordInput = await findByTestId(
      CONFIRM_PASSWORD_INPUT_TEST_ID
    );

    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: "Test" } });
      fireEvent.change(lastNameInput, { target: { value: "Test" } });
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(phoneNumberInput, {
        target: { value: CORRECT_PHONE },
      });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const firstNameError = queryByTestId(FIRST_NAME_INPUT_ERROR_TEST_ID);
    const lastNameError = queryByTestId(LAST_NAME_INPUT_ERROR_TEST_ID);
    const emailError = queryByTestId(EMAIL_INPUT_ERROR_TEST_ID);
    const phoneNumberError = queryByTestId(PHONE_NUMBER_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);
    const confirmPasswordError = queryByTestId(
      CONFIRM_PASSWORD_INPUT_ERROR_TEST_ID
    );

    await waitFor(
      () => {
        const inputCode = queryByTestId(INPUT_CODE_IDS[0]);

        expect(inputCode).toBeInTheDocument();
        expect(firstNameError).not.toBeInTheDocument();
        expect(lastNameError).not.toBeInTheDocument();
        expect(emailError).not.toBeInTheDocument();
        expect(phoneNumberError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
        expect(confirmPasswordError).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });

  it("display toast with error message when user enter invalid code", async () => {
    const { findByTestId, findByText } = renderWithProviders(<SignUp />, {
      preloadedState,
    });

    const firstInputCode = await findByTestId(INPUT_CODE_IDS[0]);
    const secondInputCode = await findByTestId(INPUT_CODE_IDS[1]);
    const thirdInputCode = await findByTestId(INPUT_CODE_IDS[2]);
    const fourthInputCode = await findByTestId(INPUT_CODE_IDS[3]);
    const fifthInputCode = await findByTestId(INPUT_CODE_IDS[4]);
    const sixthInputCode = await findByTestId(INPUT_CODE_IDS[5]);

    await waitFor(() => {
      fireEvent.change(firstInputCode, { target: { value: "1" } });
      fireEvent.change(secondInputCode, { target: { value: "1" } });
      fireEvent.change(thirdInputCode, { target: { value: "1" } });
      fireEvent.change(fourthInputCode, {
        target: { value: "1" },
      });
      fireEvent.change(fifthInputCode, { target: { value: "1" } });
      fireEvent.change(sixthInputCode, { target: { value: "2" } });
    });

    const toastError = await findByText(C.INVALID_TOKEN);

    expect(toastError).toBeInTheDocument();
  });

  it("redirect user to sign-in page when account has been created successfully", async () => {
    const { findByTestId } = renderWithProviders(<SignUp />, {
      preloadedState,
    });

    const firstInputCode = await findByTestId(INPUT_CODE_IDS[0]);
    const secondInputCode = await findByTestId(INPUT_CODE_IDS[1]);
    const thirdInputCode = await findByTestId(INPUT_CODE_IDS[2]);
    const fourthInputCode = await findByTestId(INPUT_CODE_IDS[3]);
    const fifthInputCode = await findByTestId(INPUT_CODE_IDS[4]);
    const sixthInputCode = await findByTestId(INPUT_CODE_IDS[5]);

    await waitFor(() => {
      fireEvent.change(firstInputCode, { target: { value: "1" } });
      fireEvent.change(secondInputCode, { target: { value: "1" } });
      fireEvent.change(thirdInputCode, { target: { value: "1" } });
      fireEvent.change(fourthInputCode, {
        target: { value: "1" },
      });
      fireEvent.change(fifthInputCode, { target: { value: "1" } });
      fireEvent.change(sixthInputCode, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(mockedPushMethod).toBeCalledTimes(1);
      expect(mockedPushMethod).toBeCalledWith(Paths.SIGN_IN);
    });
  });
});
