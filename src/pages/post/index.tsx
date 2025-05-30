import ArrowRoundBack from "../../assets/svg/arrow-round-back";

import PageHeader from "../../components/page-header";
import Button from "../../components/button";
import { PostSkaleton } from "../post-list";
import InputText from "../../components/input-text";
import Form from "../../components/form";
import Textarea from "../../components/textarea";
import usePost from "./usePost";
import { useNavigate } from "react-router";

export const LS_POST_EDIT_DATA = "postEditData";
export const LS_POST_BACKUP_DATA = "postBackupData";

function Post() {
  const navigate = useNavigate();
  const {
    isLoading,
    isEditMode,
    isEditedPost,
    postId,
    post,
    postEditData,
    handleCancelEditButtonClick,
    handleTitleChange,
    handleResetChanges,
    handleBodyChange,
    handleSave,
  } = usePost();

  return (
    <section className="container mx-auto p-4">
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            <Button type="secondary" onClick={() => navigate("/list")}>
              <ArrowRoundBack className="text-xl" /> Back
            </Button>
          </div>
        }
        rightContent={
          <button
            className="text-indigo-700 cursor-pointer"
            onClick={handleCancelEditButtonClick}
          >
            {isEditMode ? "cancel" : "edit this post"}
          </button>
        }
      />
      <div className="container">
        <div className="mb-8">Post Page | {postId}</div>
        {isEditMode ? (
          <Form.FormItem label="Title">
            <InputText
              value={postEditData?.title}
              onChange={handleTitleChange}
            />
          </Form.FormItem>
        ) : (
          <div className="text-3xl">{post?.title}</div>
        )}

        {isEditMode ? (
          <Form.FormItem label="Body">
            <Textarea
              type="textarea"
              value={postEditData?.body}
              onChange={handleBodyChange}
            />
          </Form.FormItem>
        ) : (
          <p className="mt-4">{post?.body}</p>
        )}

        {isEditMode && (
          <div className="mt-4 flex gap-4 justify-end">
            {isEditedPost && (
              <Button type="secondary" onClick={handleResetChanges}>
                Reset Changes
              </Button>
            )}
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}

        {isLoading && <PostSkaleton />}
      </div>
    </section>
  );
}

export default Post;
