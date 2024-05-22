import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('id') ||  false,
  isLoggedIn: localStorage.getItem('id') ? true : false,
  darkMode: localStorage.getItem('theme') === 'dark' ||  false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('id');
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      toast.success("You have successfully logged out");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      const theme = state.darkMode ? "dark" : "light";
      document.querySelector('html').setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;