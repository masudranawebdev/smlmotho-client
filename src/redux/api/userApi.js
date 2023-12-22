import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //user signup
    userSignup: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/sign-up`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

  }),
});

export const { useUserSignupMutation } = authApi;