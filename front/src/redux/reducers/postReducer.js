import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  votePost,
  commentOnPost,
} from "../../services/postService";
import {
  reportPost as reportPostService,
  reportUser as reportUserService,
} from "../../services/moderationService";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPosts();
      console.log("Fetched posts:", data);
      return data;
    } catch (error) {
      console.error("Fetch Posts Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    console.log("Thunk fetchPostById called with ID:", postId);
    try {
      const data = await getPostById(postId);
      console.log("Fetched post data in thunk:", data);
      return data;
    } catch (error) {
      console.error("Error in thunk fetchPostById:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const data = await createPost(postData, token);
      console.log("Added post:", data);
      return data;
    } catch (error) {
      console.error("Add Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const updatePostById = createAsyncThunk(
  "posts/updatePostById",
  async ({ postId, postData }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const data = await updatePost(postId, postData, token);
      console.log("Updated post:", data);
      return data;
    } catch (error) {
      console.error("Update Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (postId, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      await deletePost(postId, token);
      console.log("Deleted post ID:", postId);
      return postId;
    } catch (error) {
      console.error("Delete Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const voteOnPost = createAsyncThunk(
  "posts/voteOnPost",
  async ({ postId, voteType }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const data = await votePost(postId, voteType, token);
      console.log("Voted on post:", data);
      return data;
    } catch (error) {
      console.error("Vote Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const commentOnPostById = createAsyncThunk(
  "posts/commentOnPostById",
  async ({ postId, commentData }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const data = await commentOnPost(postId, commentData, token);
      console.log("Commented on post:", data);
      return data;
    } catch (error) {
      console.error("Comment Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const reportPost = createAsyncThunk(
  "posts/reportPost",
  async ({ postId, context }, { rejectWithValue }) => {
    try {
      const data = await reportPostService(postId, context);
      console.log("Reported post:", data);
      return data;
    } catch (error) {
      console.error("Report Post Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching posts - pending");
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts || [];
        console.log("Posts loaded:", state.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch Posts Error:", state.error);
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching post by ID - pending");
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
        console.log("Selected Post loaded:", state.selectedPost);
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch Post Error:", state.error);
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        console.log("Post added:", action.payload);
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (
          state.selectedPost &&
          state.selectedPost._id === action.payload._id
        ) {
          state.selectedPost = action.payload;
        }
        console.log("Post updated:", action.payload);
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        if (state.selectedPost && state.selectedPost._id === action.payload) {
          state.selectedPost = null;
        }
        console.log("Post deleted ID:", action.payload);
      })
      .addCase(voteOnPost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
        if (
          state.selectedPost &&
          state.selectedPost._id === action.payload._id
        ) {
          state.selectedPost = action.payload;
        }
        console.log("Post voted:", action.payload);
      })
      .addCase(commentOnPostById.fulfilled, (state, action) => {
        if (state.selectedPost) {
          state.selectedPost.responses.push(action.payload);
        }
        console.log("Comment added:", action.payload);
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        console.log("Post reported:", action.payload);
      });
  },
});

export default postSlice.reducer;
