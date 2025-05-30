import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import API from "../../config/api";

import type { Data } from "../post-list/useList";
import { LS_POST_BACKUP_DATA, LS_POST_EDIT_DATA } from ".";

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

        const hasEditedPostsData = localStorage.getItem(LS_POST_EDIT_DATA);
        if (hasEditedPostsData) {
          const editedPosts = JSON.parse(hasEditedPostsData);
          const existingIndex = editedPosts.findIndex(
            (post: Data) => post.id === data.id,
          );
          if (existingIndex !== -1) {
            data = editedPosts[existingIndex];
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
      const editedPostsData = localStorage.getItem(LS_POST_EDIT_DATA);
      let editedPosts = editedPostsData ? JSON.parse(editedPostsData) : [];
      const existingIndex = editedPosts.findIndex(
        (post: Data) => post.id === postEditData.id,
      );
      if (existingIndex !== -1) {
        editedPosts[existingIndex] = postEditData;
      } else {
        editedPosts.push(postEditData);
      }

      const backupPostsData = localStorage.getItem(LS_POST_BACKUP_DATA);
      let backupPosts = backupPostsData ? JSON.parse(backupPostsData) : [];

      localStorage.setItem(
        LS_POST_BACKUP_DATA,
        JSON.stringify(backupPosts.concat(post)),
      );
      localStorage.setItem(LS_POST_EDIT_DATA, JSON.stringify(editedPosts));
      setEditMode(false);
      setIsEditedPost(
        post?.title !== postEditData.title || post.body !== postEditData.body,
      );
      setPost(postEditData);
    }
  }

  function handleResetChanges() {
    const backupPostsData = localStorage.getItem(LS_POST_BACKUP_DATA);
    if (backupPostsData) {
      const posts = JSON.parse(backupPostsData);
      const existingIndex = posts.findIndex(
        (post: Data) => post.id === post?.id,
      );
      if (existingIndex !== -1) {
        setPost(posts[existingIndex]);
        setPostEditData(posts[existingIndex]);
        setEditMode(false);
        setIsEditedPost(false);

        posts.splice(existingIndex, 1);
        localStorage.setItem(LS_POST_BACKUP_DATA, JSON.stringify(posts));

        const editedPostsData = localStorage.getItem(LS_POST_EDIT_DATA);
        const editedPosts = JSON.parse(editedPostsData || "[]");
        const editedIndex = editedPosts.findIndex(
          (post: Data) => post.id === post?.id,
        );
        if (editedIndex !== -1) {
          editedPosts.splice(editedIndex, 1);
          localStorage.setItem(LS_POST_EDIT_DATA, JSON.stringify(editedPosts));
        }
      }
    }
  }
}
