import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    border: {
      normal: string;
      focus: string;
    };

    color: {
      primary: string;
    };
  }
}
