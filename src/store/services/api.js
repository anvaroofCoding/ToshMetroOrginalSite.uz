import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://abbos.uzmetro.uz/api",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", "UZMETRO_SECRET_2026");
      return headers;
    },
  }),

  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPopularNews: builder.query({
      query: (lang) => `/news/${lang}`,
      providesTags: ["Post"],
    }),
    getFoydalanuvchilar: builder.query({
      query: () => `/sayt_foydalanuvchilari/`,
      providesTags: ["Post"],
    }),
    getMurojaatStatistikasi: builder.query({
      query: () => `/lost-items/`,
      providesTags: ["Post"],
    }),
    postMurojaat: builder.mutation({
      query: (finalData) => ({
        url: "/lost-items/",
        method: "POST",
        body: finalData,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  usePostMurojaatMutation,
  useGetMurojaatStatistikasiQuery,
  useGetFoydalanuvchilarQuery,
  useGetPopularNewsQuery,
} = api;
