import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: true | false;
  token: string;
}

const initialState: userState = {
  isLoggedIn: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    },
    // 로그인 시 같이 호출해야함
    setUserInfo(
      state,
      action: PayloadAction<{
        token: string;
      }>
    ) {
      state.token = action.payload.token;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
