import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: true | false;
  token: string;
  email: string;
  password: string;
  phone: string;
}

const initialState: userState = {
  isLoggedIn: false,
  token: "",
  email: "",
  password: "",
  phone: "",
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
      state.token = "";
    },
    // 로그인 시 같이 호출해야함
    setUserInfo(
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        phone: string;
      }>
    ) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
    },
    setToken(
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
