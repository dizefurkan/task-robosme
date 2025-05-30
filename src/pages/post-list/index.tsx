import { createContext, useContext } from "react";

import useList, { type Data } from "./useList";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NavLink, useNavigate } from "react-router";
import PostListHeader from "./header";
import PostsEmptyState from "./posts-empty-state";

// Local storage key for the last visited post ID
export const LS_LAST_VISITED_POST_ID = "lastVisitedPostId";

export const PostListContext = createContext<ReturnType<typeof useList>>(
  {} as any,
);

function PostList() {
  const useListData = useList();

  return (
    <PostListContext.Provider value={useListData}>
      <section className="container mx-auto p-4">
        <PostListHeader />
        <Posts />
        {!!useListData.data.length && <TotalPostListed />}
      </section>
    </PostListContext.Provider>
  );
}

export default PostList;

const Posts = () => {
  const [animationParent] = useAutoAnimate();
  const { data, isLoading } = useContext(PostListContext);

  return (
    <div ref={animationParent}>
      <PostsSkaleton isLoading={isLoading} />
      {data.length > 0 && (
        <ul className="mt-8 post-list list-none p-0 gap-4 grid grid-cols-12">
          {data.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      )}
      <PostsEmptyState />
    </div>
  );
};

const PostsSkaleton = (props: { isLoading: boolean }) => {
  if (!props.isLoading) return null;

  return (
    <ul className="mt-8 post-list list-none p-0 gap-4 grid grid-cols-12">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          className="shadow-sm p-4 lg:col-span-4 xl:col-span-3 md:col-span-6 col-span-12 mb-2"
          key={index}
        >
          <PostSkaleton />
        </li>
      ))}
    </ul>
  );
};

export const PostSkaleton = () => {
  return (
    <div className="post-item">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

const Post = (props: { post: Data }) => {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <li
      id={`post-${post.id}`}
      className="post-item lg:col-span-4 xl:col-span-3 md:col-span-6 col-span-12 shadow-sm p-4 mb-2"
      onClick={() => {
        localStorage.setItem(LS_LAST_VISITED_POST_ID, post.id.toString());
        navigate(`/post/${post.id}`);
      }}
    >
      <NavLink to={`/post/${post.id}`} className="  rounded ">
        <h2 className="mb-1">{post.title}</h2>
        <p className="text-sm text-gray-500">{post.body}</p>
      </NavLink>
    </li>
  );
};

const TotalPostListed = () => {
  const { data } = useContext(PostListContext);
  return (
    <div className="text-right text-sm text-gray-500 mt-4">
      Total {data.length} Post Showing
    </div>
  );
};
