import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "utils/axios-base-query";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.API_URL}/api`,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
