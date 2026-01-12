import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://88.88.150.151:8090/api",
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
    getPopularNewsDetails: builder.query({
      query: ({ lang, id }) => `/news/${lang}/${id}`,
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPopularNewsDetailsQuery,
  usePostMurojaatMutation,
  useGetMurojaatStatistikasiQuery,
  useGetFoydalanuvchilarQuery,
  useGetPopularNewsQuery,
} = api;
