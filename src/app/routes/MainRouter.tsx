import { Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "../../pages";
import AddRecipe from "../../pages/AddRecipe";
import Recipe from "../../pages/Recipe";
import Layout from "../../componentes/layouts/Layout";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </Routes>
  );
};

export default MainRouter;
