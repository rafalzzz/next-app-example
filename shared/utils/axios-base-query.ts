import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      abortController?: AbortController;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, abortController }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        signal: abortController?.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      if (result.headers.authorization) {
        Cookies.set("token", result.headers.authorization.split(" ")[1]);
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
