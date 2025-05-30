import React, { createContext, useContext } from "react";

import useList, { type Data } from "./useList";
import InputText from "../../components/input-text";
import Button from "../../components/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PageHeader from "../../components/page-header";
import { NavLink, useNavigate } from "react-router";
import Dropdown from "../../components/dropdown";
import { LS_EMAIL, LS_IS_LOGGED_IN } from "../login/useLogin";

const PostListContext = createContext<ReturnType<typeof useList>>({} as any);

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

const PostListHeader = () => {
  const navigate = useNavigate();

  return (
    <PageHeader
      title="Post List"
      rightContent={
        <div className="flex items-center gap-2">
          <ListSearch />
          <Dropdown
            square
            menu={[
              {
                children: `Welcome, ${localStorage.getItem(LS_EMAIL) || "Guest"}`,
              },
              {
                children: "Sign out",
                onClick: () => {
                  localStorage.removeItem(LS_IS_LOGGED_IN);
                  localStorage.removeItem(LS_EMAIL);
                  navigate("/");
                },
              },
            ]}
          >
            <svg
              className="w-5 text-gray-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
            </svg>
          </Dropdown>
        </div>
      }
    />
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
const PostsEmptyState = () => {
  const { data, isLoading, searchKeyword, setSearchKeyword } =
    useContext(PostListContext);

  if (isLoading) return null;

  if (data.length === 0 && searchKeyword) {
    return (
      <EmptyState
        title="No posts found"
        description="Try searching with different keywords."
        action={
          <Button onClick={() => setSearchKeyword("")}>Clear Search</Button>
        }
      />
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No posts available"
        description="There are currently no posts to display."
      />
    );
  }

  return null;
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

const EmptyState = (props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className="mt-16 text-center text-gray-500">
      <h3 className="text-gray-900 uppercase text-2xl">{props.title}</h3>
      {props.description && <p className="mt-2">{props.description}</p>}
      {props.action && (
        <div className="mt-4 flex items-center justify-center">
          {props.action}
        </div>
      )}
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
        localStorage.setItem("lastVisitedPostId", post.id.toString());
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

const ListSearch = () => {
  const { searchKeyword, setSearchKeyword } = useContext(PostListContext);

  return (
    <div>
      <InputText
        type="text"
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
        value={searchKeyword}
        onChange={(value) => setSearchKeyword(value)}
      />
    </div>
  );
};
