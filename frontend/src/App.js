import React, { useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditUser from "./components/EditUser";
import UserList from "./pages/UserList";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";

import { AuthContext } from "./context/authContext";

import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
library.add(fas, faTwitter, faFontAwesome);

function App() {
  const { authenticated } = useContext(AuthContext);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/postari" element={<Posts />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/mylogin" element={<Login />} />

            <Route path="/myregister" element={<Register />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/edit-user/:id" element={<EditUser />} />

            <Route
              path="/admin/utilizatori"
              element={
                <ProtectedRoute user={authenticated}>
                  <UserList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/adauga-articol"
              element={
                <ProtectedRoute user={authenticated}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-post/:id"
              element={
                <ProtectedRoute user={authenticated}>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
