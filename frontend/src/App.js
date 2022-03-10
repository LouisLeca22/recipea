import { useState } from 'react';
import './App.css';
import MenuButton from './components/MenuButton';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/home/Home"
import Create from "./pages/create/Create"
import Recipe from "./pages/recipe/Recipe"
import Search from "./pages/search/Search"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import SearchBar from './components/SearchBar';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from "react-redux"
import Edit from './pages/edit/Edit';


function App() {
  const [open, setOpen] = useState(false);
  const {user}  = useSelector(state => state.auth)

  return (
    <>

    <Router>
      <div className={open ? 'App show-nav' : 'App'}>
        <MenuButton setOpen={setOpen} />
        <SearchBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/create" element={user ? <Create /> : <Navigate to="/login"/>}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/recipes/:recipeId" element={<Recipe />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/edit/:recipeId" element={user ? <Edit /> : <Navigate to="/login" /> }/>
            <Route path="/register" element={<Register />}/>
          </Routes>
      </div>
      <Navbar setOpen={setOpen} />
    </Router>
     <ToastContainer />
     </>
  );
}

export default App;
