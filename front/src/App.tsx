import './App.css';
import AppBarr from "./components/AppBar";
import {Route, Routes} from "react-router-dom";
import Register from "./features/Users/Register";
import Login from "./features/Users/Login";
import Posts from "./features/Posts/Posts";
import PostsForm from "./features/Posts/postForm";
import Comments from "./features/Comments/Comments";

function App() {

  return (
    <>
    <header>
      <AppBarr />
    </header>
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/new' element={<PostsForm />} />
        <Route path='/post/:id' element={<Comments />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </>
  )
}

export default App
