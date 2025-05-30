import { useContext } from "react";
import InputText from "../../components/input-text";
import { PostListContext } from ".";

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

export default ListSearch;
