import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser, deleteUser } from "../../services/userService";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getUser(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Erreur lors de la récupération de l'utilisateur"
      );
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la mise à jour de l'utilisateur"
      );
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la suppression de l'utilisateur"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
