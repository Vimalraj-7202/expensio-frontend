import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.thunk";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  users: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  data: any;
}

// Helper to get item from localStorage safely
const getLocalItem = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;

const initialState: AuthState = {
  user: getLocalItem("user") ? JSON.parse(getLocalItem("user") as string) : null,
  token: getLocalItem("token"),
  users: [],
  loading: false,
  error: null,
  isAuthenticated: !!getLocalItem("token"),
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Update only user info
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    // Set both user and token (for hydration or login)
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    // Logout clears everything
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // LOGIN USER
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // REGISTER USER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
