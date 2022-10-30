import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { store } from "store";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/global-styles";
import { light } from "styles/themes/light";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
