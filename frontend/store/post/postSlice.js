import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  limit: 10,
  page:0,
};

// Create new post
export const createPost= createAsyncThunk(
  "post/add",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.addPost(postData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to add post";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Like post
export const likePost= createAsyncThunk(
  "post/like",
  async (likeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log(likeData)
      return await postService.postLike(likeData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to like post";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Comment post
export const commentPost= createAsyncThunk(
  "post/comment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log(commentData)
      return await postService.postComment(commentData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to like post";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// fetch posts
export const fetchPosts = createAsyncThunk("post/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const page = thunkAPI.getState().post.page;
    const limit = thunkAPI.getState().post.limit;
    return await postService.fetchPosts({page, limit},token);
  } catch (error) {
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


// export const addLivePost = createAsyncThunk


export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    addLivePost: (state, action) => {
      // console.log("slice is there")
      // console.log(action.payload)
      state.posts = [action.payload, ...state.posts]
    }
  },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...action.payload.post,
//       };
//     },
//   },
  // for backend request
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let tempPosts = state.posts
        tempPosts[action.payload.index] = action.payload.data
        // state.posts = [action.payload, ...state.posts];
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(commentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let tempPosts = state.posts
        tempPosts[action.payload.index] = action.payload.data
        // state.posts = [action.payload, ...state.posts];
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [...state.posts, ...action.payload];
        state.page = state.page + 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset, addLivePost } = postSlice.actions;
export default postSlice.reducer;
