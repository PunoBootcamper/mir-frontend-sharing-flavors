import { Routes, Route } from "react-router-dom";
import { Example, Home, Login, Register } from "../../pages";
import AddRecipe from "../../pages/AddRecipe";
import Recipe from "../../pages/Recipe";
import NotFound from "../../pages/NotFound";
import Layout from "../../componentes/layouts/Layout";
import ProtectedRoute from "./ProtectedRoute";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/example" element={<Example />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
