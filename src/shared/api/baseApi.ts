import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});

export default baseApi;
