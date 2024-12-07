import { Routes, Route } from "react-router-dom";

import { Example, Home, Login, Register, Chat, UserProfile } from "../../pages";


import AddRecipe from "../../pages/AddRecipe";
import Recipe from "../../pages/Recipe";
import NotFound from "../../pages/NotFound";
import Layout from "../../componentes/layouts/Layout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/example" element={<Example />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
