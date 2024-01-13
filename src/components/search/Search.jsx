import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/searchSlice";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/index";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
const Search = () => {
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    blogList,
    setBlogList,
    loading,
    setLoading,
    editedData,
    setEditedData,
  } = useContext(GlobalContext);
  console.log(search, "Search val");

  const handleSearch = async (e) => {
    console.log(e.target.value);
    dispatch(setSearchTerm(e.target.value));
    const response = await axios.get(
      `http://localhost:5000/api/blogs/?q=${e.target.value}`,
      {
        responseType: "json",
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is between 200 and 499
        },
      }
    );
    const result = await response.data;
    console.log(result);
    if (result && result.blogList.length > 0) {
      console.log("In the Fetch");
      setBlogList(result.blogList);
      //   setLoading(false);
    }
  };
  <>
    <input
      type="text"
      placeholder="Search Blog"
      onChange={(e) => handleSearch(e)}
    />

    {/*
        <div className="">
          {blogList && blogList.length ? (
            blogList.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <FaEdit size={25} onClick={() => handleEdit(item)} />
                <FaRegTrashCan
                  size={25}
                  onClick={() => handleDeleteBLog(item._id)}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Found</h3>
          )}
        </div>
          */}
  </>;
};

export default Search;
