import React, { useEffect } from "react";
import API from "../../config/api";
import { LS_POST_OVERWRITTEN_DATA } from "../post";
import { LS_LAST_VISITED_POST_ID } from ".";

export type Data = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export default function useList() {
  const [data, setData] = React.useState<Data[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [searchKeyword, setSearchKeyword] = React.useState("");

  useEffect(() => {
    document.title = "List Page";

    setIsLoading(true);
    fetch(API.baseUrl + API.posts)
      .then((response) => response.json())
      .then((_data) => {
        const hasOverwrittenPostsData = localStorage.getItem(
          LS_POST_OVERWRITTEN_DATA,
        );
        const data = hasOverwrittenPostsData
          ? _data.map((item: Data) => {
              try {
                const editedPosts = JSON.parse(hasOverwrittenPostsData);
                const existingIndex = editedPosts.findIndex(
                  (post: Data) => post.id == item.id,
                );

                if (existingIndex !== -1) {
                  return editedPosts[existingIndex];
                } else {
                  return item;
                }
              } catch {}
            })
          : _data;

        setData(data);
        const lastVisitedPostId = localStorage.getItem(LS_LAST_VISITED_POST_ID);
        if (lastVisitedPostId) {
          const post = (data as Data[]).find(
            (item) => item.id === Number(lastVisitedPostId),
          );
          if (post) {
            requestAnimationFrame(() => {
              scrollTo({
                top: document.getElementById(`post-${post.id}`)?.offsetTop || 0,
                behavior: "smooth",
              });
            });
            localStorage.removeItem(LS_LAST_VISITED_POST_ID);
          }
        }
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    searchKeyword,
    setSearchKeyword,

    data: searchKeyword
      ? data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.body.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : data,
    error,
    isLoading,
  };
}
