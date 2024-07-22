import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest().get("/post/" + params.id);
  console.log(res.data);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  
  const postPromise = apiRequest().get("/post?" + query);
  console.log(postPromise);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest().get("/users/profilePosts");
  const chatPromise = apiRequest().get("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
