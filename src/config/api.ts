const API = {
  posts: "https://jsonplaceholder.typicode.com/posts",
  post: (postId: string) =>
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
};

export default API;
