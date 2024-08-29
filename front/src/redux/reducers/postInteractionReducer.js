import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk(
  "postInteraction/fetchPost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5172/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "postInteraction/addComment",
  async ({ postId, commentContent }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5172/posts/${postId}/comment`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const reportPost = createAsyncThunk(
  "postInteraction/reportPost",
  async ({ postId, context }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5172/admin/reportpost`,
        { postId, context },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postInteractionSlice = createSlice({
  name: "postInteraction",
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.post) {
          state.post.responses.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(reportPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reportPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default postInteractionSlice.reducer;
