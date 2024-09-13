import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  session: null,
  profile: null,
  loading: true,
  isAdmin: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      // set session
      state.session = action.payload.session;
      // get profile should I do it here or try to pass it on from the function?
      state.profile = action.payload.profile;
      state.loading = false;

      state.isAdmin = state.profile?.group === "ADMIN";
    },
    register(state, action) {
      state.session = action.payload.session;
      state.profile = action.payload.profile;
      state.loading = false;

      state.isAdmin = state.profile?.group === "ADMIN";
    },
    signout(state) {
      state.loading = false;
      state.session = null;
    }
  }
});

export const { login, register, signout } = authSlice.actions;

export default authSlice.reducer;
