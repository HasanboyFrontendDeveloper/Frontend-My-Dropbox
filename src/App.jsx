import React, { useEffect, useState } from "react";
import { Home, Loader, Login, Register } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import "./firebase/firebase";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

import './App.css'
import { ref, uploadString } from "firebase/storage";
import { fileDB } from "./firebase/firebase";

const App = () => {
  const [isLoggin, setIsLoggin] = useState(false)
  const auth = getAuth()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggin(true)
        setIsLoading(false)
      } else {
        setIsLoggin(false)
        setIsLoading(false)
      }
    })
    return findOut
  }, [auth])

  
  const createUserFolder = async (email) => {
    const newDir = ref(fileDB, `${email}/`);
    const ghostFile = ref(newDir, ".ghostfile");
    await uploadString(ghostFile, "");
  };


  return (
    <div>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/*" element={isLoggin ? <Home /> : <Login />} />
        <Route path="/login" element={isLoggin ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggin ? <Navigate to="/" replace /> : <Register createUserFolder={createUserFolder} />} />
      </Routes>
    </div>
  );
};

export default App;
