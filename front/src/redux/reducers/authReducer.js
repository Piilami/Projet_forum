import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, checkAuth } from "../../services/authService";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const initializeAuthThunk = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    try {
      const user = await checkAuth();
      console.log("User fetched in initializeAuthThunk:", user);
      return user;
    } catch (error) {
      console.log("Error in initializeAuthThunk:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const user = await loginUser(userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeAuthThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(initializeAuthThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Une erreur est survenue";
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Une erreur est survenue";
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Une erreur est survenue";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
