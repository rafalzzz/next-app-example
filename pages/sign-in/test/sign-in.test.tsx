import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { setupStore } from "store";
import { renderWithProviders } from "test-utils/.";
import { signInApi } from "sign-in/api";
import { SignInFormKeys } from "sign-in/enums";
import { SIGN_IN } from "consts/form-test-ids";
import SignIn from "..";
import { server } from "./server";

const store = setupStore({});

describe("DictionariesPagination", () => {
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
    const { queryByTestId } = renderWithProviders(<SignIn />);

    const loginInput = queryByTestId(`${SignInFormKeys.EMAIL}-input`);
    const passwordInput = queryByTestId(`${SignInFormKeys.PASSWORD}-input`);
    const formButton = queryByTestId(`${SIGN_IN}-button`);
    const inputError = queryByTestId(`${SignInFormKeys.PASSWORD}-error`);
    const passwordError = queryByTestId(`${SignInFormKeys.PASSWORD}-error`);

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
    expect(inputError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
  });

  it("show errors when inputs are not filled and user submit form", async () => {
    const { findByTestId } = renderWithProviders(<SignIn />);

    const formButton = await findByTestId(`${SIGN_IN}-button`);

    fireEvent.click(formButton);

    const inputError = await findByTestId(`${SignInFormKeys.PASSWORD}-error`);
    const passwordError = await findByTestId(
      `${SignInFormKeys.PASSWORD}-error`
    );

    expect(inputError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
