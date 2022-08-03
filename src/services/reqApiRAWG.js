import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = "?key=bda281be14f1457c974da1e78f3cc6d5";

export const reqApiRAWG = createApi({
  reducerPath: "reqApiRAWG",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (builder) => ({
    listGenres: builder.query({
      query: () => `/genres${key}&ordering=name`,
    }),
    listAllGamesByOrder: builder.query({
      query: ({ order, page }) =>
        `/games${key}&ordering=${order}&page=${page}&page_size=10`,
    }),
    listGamesByParam: builder.query({
      query: ({ param, paramVal, order, page }) =>
        `/games${key}&${param}=${paramVal}&ordering=${order}&page=${page}&page_size=10`,
    }),
    detailsGame: builder.query({
      query: ({ id }) => `/games/${id}${key}`,
    }),
    screenshotsGame: builder.query({
      query: ({ id }) => `/games/${id}/screenshots${key}`,
    }),
  }),
});

export const {
  useListGenresQuery,
  useListAllGamesByOrderQuery,
  useListGamesByParamQuery,
  useDetailsGameQuery,
  useScreenshotsGameQuery,
} = reqApiRAWG;
