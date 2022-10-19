import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "utils/axios-base-query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.API_URL}/api`,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
