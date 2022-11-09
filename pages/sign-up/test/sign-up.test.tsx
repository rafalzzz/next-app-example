import "@testing-library/jest-dom/extend-expect";
import { setupStore } from "store";
import { renderWithProviders } from "test-utils/.";
import { signInApi } from "sign-in/api";
import { server } from "sign-in/test-utils/server";
import { SignUpFormKeys } from "sign-up/enums";
import { SIGN_UP } from "consts/form-test-ids";
import SignUP from "..";

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

const store = setupStore({});

describe("Sign-up page", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(signInApi.util.resetApiState());
  });

  afterAll(() => {
    server.close();
  });

  it("should render SignUp form elements correctly", async () => {
    const { queryByTestId } = renderWithProviders(<SignUP />);

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

  /*  it("show errors when inputs are not filled and user submit form", async () => {
    const { findByTestId } = renderWithProviders(<SignIn />);

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    fireEvent.click(formButton);

    const loginError = await findByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = await findByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    expect(formButton).toBeEnabled();
    expect(loginError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it("display errors when input values are incorrect", async () => {
    const { findByTestId } = renderWithProviders(<SignIn />);

    const loginInput = await findByTestId(LOGIN_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);

    fireEvent.change(loginInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    fireEvent.click(formButton);

    const loginError = await findByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = await findByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    await waitFor(() => {
      expect(formButton).toBeEnabled();
      expect(loginError).toBeInTheDocument();
      expect(loginError).toHaveTextContent(C.INVALID_EMAIL_MESSAGE);
      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent(C.SHORT_PASSWORD_MESSAGE);
    });
  });

  it("disable submit button when request is pending", async () => {
    const { findByTestId, queryByTestId } = renderWithProviders(<SignIn />);

    const loginInput = await findByTestId(LOGIN_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);

    await waitFor(() => {
      fireEvent.change(loginInput, { target: { value: CORRECT_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const loginError = queryByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    await waitFor(
      () => {
        expect(formButton).toBeDisabled();
        expect(loginError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it("redirect to Dashboard when user sign-in", async () => {
    const { findByTestId, queryByTestId } = renderWithProviders(<SignIn />);

    const loginInput = await findByTestId(LOGIN_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);

    await waitFor(() => {
      fireEvent.change(loginInput, { target: { value: CORRECT_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const loginError = queryByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    await waitFor(
      () => {
        expect(formButton).toBeEnabled();
        expect(loginError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
        expect(mockedPushMethod).toBeCalledTimes(1);
        expect(mockedPushMethod).toBeCalledWith(Paths.DASHBOARD);
      },
      { timeout: 2500 }
    );
  });

  it("display toast error with error from response", async () => {
    const { findByTestId, queryByTestId, findByText } = renderWithProviders(
      <SignIn />
    );

    const loginInput = await findByTestId(LOGIN_INPUT_TEST_ID);
    const passwordInput = await findByTestId(PASSWORD_INPUT_TEST_ID);

    await waitFor(() => {
      fireEvent.change(loginInput, { target: { value: "test1234@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
    });

    const formButton = await findByTestId(FORM_BUTTON_TEST_ID);

    await waitFor(() => {
      fireEvent.click(formButton);
    });

    const loginError = queryByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    const toastError = await findByText(C.USER_DOES_NOT_EXIST_MESSAGE);

    await waitFor(() => {
      expect(formButton).toBeEnabled();
      expect(loginError).not.toBeInTheDocument();
      expect(passwordError).not.toBeInTheDocument();
      expect(toastError).toBeInTheDocument();
      expect(mockedPushMethod).not.toBeCalled();
    });
  }); */
});
