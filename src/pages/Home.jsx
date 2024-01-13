import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../store/searchSlice";

const Home = () => {
  const {
    blogList,
    setBlogList,
    loading,
    setLoading,
    editedData,
    setEditedData,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  //redux
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();
  //redux

  //load more

  const [page, setPage] = useState(1);

  /*const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    console.log(page);
  };*/

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  //load more

  const fetchListOfBLogs = async () => {
    //setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/blogs/?page=${page}`,
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
    } else {
      setBlogList([]);
      navigate();
    }
  };

  const handleDeleteBLog = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${id}`,
      {
        responseType: "json",
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is between 200 and 499
        },
      }
    );
    const result = await response.data;
    console.log(result, result.message);
    if (result?.message) {
      console.log("Calling Fetch");
      fetchListOfBLogs();
    }
  };
  const handleEdit = async (item) => {
    navigate("/add-blog", { state: { item } });
  };

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

  useEffect(() => {
    fetchListOfBLogs();
  }, [page]);

  return (
    <div className={classes.wrapper}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search Blog"
        onChange={(e) => handleSearch(e)}
      />
      <h1>BlogList</h1>
      {loading ? (
        <h1>Loading Blogs ! Please Wait</h1>
      ) : (
        <div className={classes.blogList}>
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

          {/* <button onClick={handleLoadMore}>Load More</button> */}

          <button className="button" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="button" onClick={handleNextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
