const API = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  users: "/users",
  posts: "/posts",
  post: (postId: string) => `/posts/${postId}`,
};

export default API;
