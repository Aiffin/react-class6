import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Menu from "./components/Menu";
import Home from "./components/Home";
import Create from "./components/Create";
import Pnf from "./components/Pnf";
import Update from "./components/Update";

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App(props){
  return(
    <BrowserRouter>
      <Menu/>
      <ToastContainer autoClose={5000} position={`top-center`}/>
        <Routes>
          <Route path={`/`} element={<Home/>} />
          <Route path={`/create`} element={<Create/>} />
          
          <Route path={`/update/:id`} element={<Update/>} />
          <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </BrowserRouter>
       
  )
}

export default App