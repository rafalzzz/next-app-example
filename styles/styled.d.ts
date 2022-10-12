import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    border: {
      normal: string;
      hover: string;
    };

    color: {
      primary: string;
      hyperlink: string;
    };
  }
}
