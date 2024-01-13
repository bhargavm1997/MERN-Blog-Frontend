import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddBlog = () => {
  const { formData, setFormData, setEditedData, editedData } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveBlog = async () => {
    console.log(editedData, "EDITED____");
    const response = editedData
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.item._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    if (response) {
      console.log(response);
      setEditedData(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { item } = location.state;
      setEditedData(true);
      setFormData({
        title: item.title,
        description: item.description,
      });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>{editedData ? "Update Blog" : "Add BLog"}</h1>
      <div className={classes.formWrapper}>
        <input
          placeholder="Enter Blog Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></input>
        <textarea
          placeholder="Enter Blog Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <button onClick={handleSaveBlog}>
          {editedData ? "Update BLog" : "Add New Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
