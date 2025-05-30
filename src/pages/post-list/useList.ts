import React, { useEffect } from "react";
import API from "../../config/api";
import { LS_POST_EDIT_DATA } from "../post";

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
        const data = _data.map((item: Data) => {
          const hasEditedPostsData = localStorage.getItem(LS_POST_EDIT_DATA);

          try {
            if (hasEditedPostsData) {
              const editedPosts = JSON.parse(hasEditedPostsData);
              const existingIndex = editedPosts.findIndex(
                (post: Data) => post.id == item.id,
              );

              if (existingIndex !== -1) {
                return editedPosts[existingIndex];
              } else {
                return item;
              }
            }
          } catch {}
        });

        setData(data);
        const lastVisitedPostId = localStorage.getItem("lastVisitedPostId");
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
            localStorage.removeItem("lastVisitedPostId");
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
