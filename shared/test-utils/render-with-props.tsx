import React, { JSXElementConstructor, ReactElement } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { render } from "@testing-library/react";
import { setupStore } from "store";
import { ThemeProvider } from "styled-components";
import { light } from "styles/themes/light";

export function renderWithProviders(
  ui: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: JSX.Element }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ToastContainer />
          {children}
        </ThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
