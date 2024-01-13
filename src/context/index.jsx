import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        blogList,
        setBlogList,
        loading,
        setLoading,
        editedData,
        setEditedData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
