import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

// Add To Post
const addPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  console.log(response.data);

  return response.data;
};

// Add Like to Post
const postLike = async (likeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(likeData)

  const response = await axios.post(API_URL+"addLike", likeData, config);

  console.log(response.data);

  return response.data;
};

// Add Like to Post
const postComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(commentData)

  const response = await axios.post(API_URL+"addComment", commentData, config);

  console.log(response.data);

  return response.data;
};

// Fetch Posts
const fetchPosts = async (fetchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL+"/fetchPosts", fetchData, config);

  // console.log(response.data);

  return response.data;
};


const postService = {
  addPost,
  postLike,
  postComment,
  fetchPosts
};

export default postService;
