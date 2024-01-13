import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/Add-Blog";
import Search from "./components/search/Search";

function App() {
  return (
    <div>
      <Header />
      <Search></Search>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path="/add-blog" element={<AddBlog></AddBlog>}></Route>
      </Routes>
    </div>
  );
}

export default App;
