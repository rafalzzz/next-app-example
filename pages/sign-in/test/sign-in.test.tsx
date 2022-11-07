import "@testing-library/jest-dom/extend-expect";
import { setupStore } from "store";
import { renderWithProviders } from "test-utils/.";
import { signInApi } from "sign-in/api";
import SignIn from "store/sign-in";
import { RequestState } from "enums/index";
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

  it("should render DictionaryPagination component with fetched data", async () => {
    //@ts-ignore
    const { getByTestId } = renderWithProviders(<SignIn />, {
      preloadedState: {
        signIn: {
          signInRequestState: RequestState.IDLE,
        },
      },
    });

    const form = getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  /* it("should display error message when occurs error during fetching data", async () => {
    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "Internal server error" })
        );
      })
    );

    const { findByTestId } = renderWithProviders(<DictionariesPagination />);

    const fetchErrorComponent = await findByTestId("fetch-dictionaries-error");

    await waitFor(() => {
      expect(fetchErrorComponent).toBeInTheDocument();
    });
  }); */
});
