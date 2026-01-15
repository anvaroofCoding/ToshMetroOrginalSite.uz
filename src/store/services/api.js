import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= BASE QUERY ================= */
const baseQuery = fetchBaseQuery({
  baseUrl: "http://88.88.150.151:8090/api",
  prepareHeaders: (headers) => {
    // 🔑 tokenni localStorage dan olish
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/* ================= AUTH CHECK (401 / 403) ================= */
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // tokenni o‘chiramiz
    localStorage.removeItem("token");

    // login sahifaga qaytaramiz
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

/* ================= API ================= */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    /* ---------- NEWS ---------- */
    getPopularNews: builder.query({
      query: ({ lang, search, page = 1, pageSize = 12 }) =>
        `/news/${lang}?search=${search}&page=${page}&page_size=${pageSize}`,
      providesTags: ["Post"],
    }),

    getPopularNewsDetails: builder.query({
      query: ({ lang, id }) => `/news/${lang}/${id}`,
      providesTags: ["Post"],
    }),

    getPopularNewss: builder.query({
      query: (lang) => `/news/${lang}/`,
      providesTags: ["Post"],
    }),

    /* ---------- USERS ---------- */
    getFoydalanuvchilar: builder.query({
      query: () => `/sayt_foydalanuvchilari/`,
      providesTags: ["Post"],
    }),

    /* ---------- MUROJAAT ---------- */
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

    /* ---------- AUTH ---------- */
    postRegister: builder.mutation({
      query: (formData) => ({
        url: "/simpleuser/register/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    RegisterOtp: builder.mutation({
      query: (code) => ({
        url: "/simpleuser/verify_code/",
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["Post"],
    }),

    Login: builder.mutation({
      query: (phone) => ({
        url: "/simpleuser/login_by_phone/",
        method: "POST",
        body: phone,
      }),
      invalidatesTags: ["Post"],
    }),

    Liked: builder.mutation({
      query: (id) => ({
        url: `/news/${id}/like/`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),

    Comment: builder.query({
      query: (id) => `/comments/${id}/`,
      providesTags: ["Post"],
    }),

    CommentPost: builder.mutation({
      query: (form) => ({
        url: "/comments/",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Post"],
    }),

    me: builder.query({
      query: () => `/simpleuser/me/`,
      providesTags: ["Post"],
    }),
  }),
});

/* ================= HOOKS ================= */
export const {
  useMeQuery,
  useCommentPostMutation,
  useCommentQuery,
  useLikedMutation,
  useLoginMutation,
  useRegisterOtpMutation,
  usePostRegisterMutation,
  useGetPopularNewsDetailsQuery,
  usePostMurojaatMutation,
  useGetMurojaatStatistikasiQuery,
  useGetFoydalanuvchilarQuery,
  useGetPopularNewsQuery,
  useGetPopularNewssQuery,
} = api;
