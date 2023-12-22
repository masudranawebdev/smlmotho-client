import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //user signin
    userSignin: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

  }),
});

export const { useUserSigninMutation } = authApi;