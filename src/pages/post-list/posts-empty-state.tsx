import { useContext } from "react";
import { PostListContext } from ".";
import Button from "../../components/button";

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

export default PostsEmptyState;
