import React, { JSXElementConstructor, ReactElement } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { render } from "@testing-library/react";
import { setupStore } from "store";

export function renderWithProviders(
  ui: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: JSX.Element }) {
    return (
      <Provider store={store}>
        <ToastContainer />
        {children}
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}