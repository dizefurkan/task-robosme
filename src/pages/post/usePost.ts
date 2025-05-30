import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import API from "../../config/api";

import type { Data } from "../post-list/useList";
import { LS_POST_BACKUP_DATA, LS_POST_OVERWRITTEN_DATA } from ".";

export default function usePost() {
  const { postId } = useParams();
  const [post, setPost] = React.useState<Data>();
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const [postEditData, setPostEditData] = React.useState<Data | null>(null);
  const [isEditMode, setEditMode] = React.useState(false);
  const [isEditedPost, setIsEditedPost] = React.useState(false);

  useEffect(() => {
    document.title = "Post Page | " + postId;

    setIsLoading(true);
    fetch(API.baseUrl + API.post("" + postId))
      .then((response) => response.json())
      .then((_data) => {
        let data = _data as Data;

        const hasOverwrittenPostsData = localStorage.getItem(
          LS_POST_OVERWRITTEN_DATA,
        );
        if (hasOverwrittenPostsData) {
          const overwrittenPosts = JSON.parse(hasOverwrittenPostsData);
          const existingIndex = overwrittenPosts.findIndex(
            (post: Data) => post.id === data.id,
          );
          if (existingIndex !== -1) {
            data = overwrittenPosts[existingIndex];
            setIsEditedPost(true);
          }
        }

        setPost(data);
        setPostEditData(data);

        if (!data || !Object.keys(data).length) {
          throw new Error("No data found");
        }
      })
      .catch(() => {
        navigate("/list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    isEditMode,
    isEditedPost,

    postId,
    post,
    postEditData,

    handleSave,
    handleBodyChange,
    handleResetChanges,
    handleCancelEditButtonClick,
    handleTitleChange,
  };

  function handleCancelEditButtonClick() {
    setEditMode((prev) => {
      if (prev && post) {
        setPostEditData(post);
      }
      return !prev;
    });
  }

  function handleBodyChange(value: string) {
    if (postEditData) {
      setPostEditData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          body: value,
        };
      });
    }
  }

  function handleTitleChange(value: string) {
    if (postEditData) {
      setPostEditData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          title: value,
        };
      });
    }
  }

  function handleSave() {
    if (postEditData) {
      const overwrittenPostsData = localStorage.getItem(
        LS_POST_OVERWRITTEN_DATA,
      );
      let overwrittenPosts = overwrittenPostsData
        ? JSON.parse(overwrittenPostsData)
        : [];
      const existingIndex = overwrittenPosts.findIndex(
        (post: Data) => post.id === postEditData.id,
      );

      if (existingIndex !== -1) {
        overwrittenPosts[existingIndex] = postEditData;
      } else {
        overwrittenPosts.push(postEditData);
      }

      const backupPostsData = localStorage.getItem(LS_POST_BACKUP_DATA);
      const backupPosts = backupPostsData ? JSON.parse(backupPostsData) : [];
      const backupPostIndex = backupPosts.findIndex(
        (post: Data) => post.id === postEditData.id,
      );

      const isChanged =
        post?.title !== postEditData.title || post.body !== postEditData.body;
      if (isChanged) {
        if (backupPostIndex === -1) {
          backupPosts.push(post);
          localStorage.setItem(
            LS_POST_BACKUP_DATA,
            JSON.stringify(backupPosts),
          );
        }
        localStorage.setItem(
          LS_POST_OVERWRITTEN_DATA,
          JSON.stringify(overwrittenPosts),
        );
      }
      setIsEditedPost(isChanged);
      setEditMode(false);
      setPost(postEditData);
    }
  }

  function handleResetChanges() {
    const backupPostsData = localStorage.getItem(LS_POST_BACKUP_DATA);
    if (!backupPostsData) return;

    const posts = JSON.parse(backupPostsData);
    const existingIndex = posts.findIndex((post: Data) => post.id === post?.id);
    if (existingIndex !== -1) {
      setPost(posts[existingIndex]);
      setPostEditData(posts[existingIndex]);
      setEditMode(false);
      setIsEditedPost(false);

      posts.splice(existingIndex, 1);
      localStorage.setItem(LS_POST_BACKUP_DATA, JSON.stringify(posts));

      const overwrittenPostsData = localStorage.getItem(
        LS_POST_OVERWRITTEN_DATA,
      );
      const overwrittenPosts = JSON.parse(overwrittenPostsData || "[]");
      const overwrittenPostIndex = overwrittenPosts.findIndex(
        (overwrittenPost: Data) => overwrittenPost.id === post?.id,
      );
      if (overwrittenPostIndex !== -1) {
        overwrittenPosts.splice(overwrittenPostIndex, 1);
        localStorage.setItem(
          LS_POST_OVERWRITTEN_DATA,
          JSON.stringify(overwrittenPosts),
        );
      }
    }
  }
}
