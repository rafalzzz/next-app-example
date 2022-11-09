import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitFor } from "@testing-library/react";
import { setupStore } from "store";
import { renderWithProviders } from "test-utils/.";
import { mockedPushMethod } from "test-utils/mocked-use-router-methods";
import { signInApi } from "sign-in/api";
import { CORRECT_EMAIL } from "sign-in/consts/emails";
import * as C from "sign-in/consts/errors";
import { SignInFormKeys } from "sign-in/enums";
import { server } from "sign-in/test-utils/server";
import { Paths } from "enums/paths";
import { SIGN_IN } from "consts/form-test-ids";
import SignIn from "..";

const LOGIN_INPUT_TEST_ID = `${SignInFormKeys.EMAIL}-input`;
const PASSWORD_INPUT_TEST_ID = `${SignInFormKeys.PASSWORD}-input`;
const FORM_BUTTON_TEST_ID = `${SIGN_IN}-button`;
const LOGIN_INPUT_ERROR_TEST_ID = `${SignInFormKeys.PASSWORD}-error`;
const PASSWORD_INPUT_ERROR_TEST_ID = `${SignInFormKeys.PASSWORD}-error`;

const store = setupStore({});

describe("DictionariesPagination", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(signInApi.util.resetApiState());
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it("should render SignUp form elements correctly", async () => {
    const { queryByTestId } = renderWithProviders(<SignIn />);

    const loginInput = queryByTestId(LOGIN_INPUT_TEST_ID);
    const passwordInput = queryByTestId(PASSWORD_INPUT_TEST_ID);
    const formButton = queryByTestId(FORM_BUTTON_TEST_ID);
    const loginError = queryByTestId(LOGIN_INPUT_ERROR_TEST_ID);
    const passwordError = queryByTestId(PASSWORD_INPUT_ERROR_TEST_ID);

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
    expect(formButton).toBeEnabled();
    expect(loginError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
  });

  it("show errors when inputs are not filled and user submit form", async () => {
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
  });
});
