import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AccountResponse } from "../../types";

// interface AccountResponse {
//   user: {
//     id: string;
//     email: string;
//     username: string;
//     is_active: boolean;
//     created: Date;
//     updated: Date;
//   };
//   access: string;
//   refresh: string;
// }
// type State = {
//   token: string | null;
//   refreshToken: string | null;
//   account: AccountResponse | null;
// };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    refreshToken: null,
    account: null,
    status: 'idle'
  },
  reducers: {
    setAuthTokens: ( state, action ) => ({
      // state.refreshToken = action.payload.refreshToken;
      // state.token = action.payload.token;
      ...state,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
    }),
    setAccount: ( state, action ) => ({
      // state.account = action.payload;
      ...state,
      account: action.payload,
    }),
    setLogout: ( state, action ) => ({
      // state.account = null;
      // state.refreshToken = null;
      // state.token = null;
      ...state,
      token: null,
      refreshToken: null,
      account: null
    }),
  },
});

export default authSlice;