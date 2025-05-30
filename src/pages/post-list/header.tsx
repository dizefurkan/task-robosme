import { useNavigate } from "react-router";
import Dropdown from "../../components/dropdown";
import PageHeader from "../../components/page-header";
import ListSearch from "./search";
import { LS_EMAIL, LS_IS_LOGGED_IN } from "../login/useLogin";

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
                children: "Go to Statistics",
                onClick: () => {
                  navigate("/statistics");
                },
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

export default PostListHeader;
