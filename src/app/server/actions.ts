"use server";

import axios, { AxiosRequestConfig } from "axios";

export const fetchData = async (url: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url,
      params: {
        key: process.env.API_KEY,
        ...options.params,
      },
      ...options,
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
