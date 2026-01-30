import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "stephen-next-user";

const getInitialUser = (): API.LoginUserVO => {
  if (typeof window === "undefined") {
    return {} as API.LoginUserVO;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse stored user:", error);
  }
  return {} as API.LoginUserVO;
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: getInitialUser(),
  reducers: {
    setLoginUser: (
      state,
      action: PayloadAction<API.LoginUserVO | undefined>,
    ) => {
      const user = action.payload || ({} as API.LoginUserVO);

      if (typeof window !== "undefined") {
        if (Object.keys(user).length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      return user;
    },
    clearLoginUser: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      return {} as API.LoginUserVO;
    },
  },
});

export const { setLoginUser, clearLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;
